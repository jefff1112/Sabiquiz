const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const { pool } = require('../config/database');

// ============================================
// RUTA: CREAR UNA NUEVA PARTIDA 1VS1
// ============================================
router.post('/create', authMiddleware, async (req, res) => {
    const { materiaId, tipoJuego = 'normal', modoJuego = '1vs1' } = req.body;
    const usuarioId = req.usuarioId;

    try {
        const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        
        const [result] = await pool.query(
            `INSERT INTO partidas 
             (anfitrion_id, room_code, tipo_juego, modo_juego, estado, fecha_inicio)
             VALUES (?, ?, ?, ?, 'esperando', NOW())`,
            [usuarioId, roomCode, tipoJuego, modoJuego]
        );

        res.status(201).json({
            success: true,
            roomCode,
            partidaId: result.insertId
        });
    } catch (error) {
        console.error('Error al crear partida:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Error al crear la partida' 
        });
    }
});

// ============================================
// RUTA: UNIRSE A UNA PARTIDA 1VS1
// ============================================
router.post('/join/:roomCode', authMiddleware, async (req, res) => {
    const { roomCode } = req.params;
    const usuarioId = req.usuarioId;

    try {
        const [partida] = await pool.query(
            `SELECT * FROM partidas 
             WHERE room_code = ? AND estado = 'esperando'`,
            [roomCode]
        );

        if (partida.length === 0) {
            return res.status(404).json({ 
                success: false, 
                error: 'Sala no encontrada o ya iniciada' 
            });
        }

        if (partida[0].anfitrion_id === usuarioId) {
            return res.status(400).json({ 
                success: false, 
                error: 'No puedes unirte a tu propia sala' 
            });
        }

        await pool.query(
            `UPDATE partidas 
             SET oponente_id = ?, estado = 'en_curso'
             WHERE room_code = ?`,
            [usuarioId, roomCode]
        );

        res.json({
            success: true,
            message: 'Te has unido a la partida',
            partidaId: partida[0].id
        });
    } catch (error) {
        console.error('Error al unirse a partida:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Error al unirse a la partida' 
        });
    }
});

// ============================================
// RUTA: OBTENER ESTADO DE UNA PARTIDA
// ============================================
router.get('/status/:roomCode', authMiddleware, async (req, res) => {
    const { roomCode } = req.params;

    try {
        const [partida] = await pool.query(
            `SELECT p.*, 
                    u1.username as anfitrion_nombre,
                    u2.username as oponente_nombre
             FROM partidas p
             LEFT JOIN usuarios u1 ON p.anfitrion_id = u1.id
             LEFT JOIN usuarios u2 ON p.oponente_id = u2.id
             WHERE p.room_code = ?`,
            [roomCode]
        );

        if (partida.length === 0) {
            return res.status(404).json({ 
                success: false, 
                error: 'Sala no encontrada' 
            });
        }

        res.json({
            success: true,
            partida: partida[0]
        });
    } catch (error) {
        console.error('Error al obtener estado de partida:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Error al obtener estado de la partida' 
        });
    }
});

// ============================================
// RUTA: FINALIZAR PARTIDA
// ============================================
// Antes cualquier usuario autenticado podía cerrar CUALQUIER partida y nombrar
// ganador a quien quisiera (IDOR). Ahora se comprueba que la partida exista,
// que el usuario sea uno de los dos jugadores, que siga abierta y que el
// ganador sea uno de los participantes.
router.post('/finish/:partidaId', authMiddleware, async (req, res) => {
    const { partidaId } = req.params;
    const { ganadorId } = req.body;
    const usuarioId = req.usuarioId;

    try {
        const [rows] = await pool.query(
            'SELECT id, anfitrion_id, oponente_id, estado FROM partidas WHERE id = ?', [partidaId]);
        if (!rows.length) {
            return res.status(404).json({ success: false, error: 'Partida no encontrada' });
        }
        const partida = rows[0];

        const participantes = [partida.anfitrion_id, partida.oponente_id];
        if (!participantes.includes(usuarioId)) {
            return res.status(403).json({ success: false, error: 'No participas en esta partida' });
        }
        if (partida.estado === 'finalizada') {
            return res.status(400).json({ success: false, error: 'La partida ya estaba finalizada' });
        }
        if (ganadorId && !participantes.includes(ganadorId)) {
            return res.status(400).json({ success: false, error: 'El ganador debe ser uno de los jugadores' });
        }

        await pool.query(
            `UPDATE partidas
             SET estado = 'finalizada', fecha_fin = NOW(), ganador_id = ?
             WHERE id = ?`,
            [ganadorId || null, partidaId]
        );

        res.json({ success: true, message: 'Partida finalizada' });
    } catch (error) {
        console.error('Error al finalizar partida:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Error al finalizar la partida' 
        });
    }
});

module.exports = router;