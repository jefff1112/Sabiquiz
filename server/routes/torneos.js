const express = require('express');
const router = express.Router();
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const { pool } = require('../config/database');
const { sendNotification } = require('../utils/notifications');
const { sendTournamentEmail, sendTournamentReminderEmail } = require('../config/email-torneos');
const { updateTournamentStates, calcularRankingTorneo } = require('../utils/torneos');

// ============================================
// RUTAS PÚBLICAS (con auth)
// ============================================

// GET /api/torneos - Lista de torneos
router.get('/', authMiddleware, async (req, res) => {
    try {
        await updateTournamentStates();
        
        const [torneos] = await pool.query(`
            SELECT 
                t.*,
                m.nombre as materia_nombre,
                (SELECT COUNT(*) FROM inscripciones_torneo WHERE torneo_id = t.id) as inscritos
            FROM torneos t
            JOIN materias m ON t.materia_id = m.id
            ORDER BY 
                CASE t.estado 
                    WHEN 'inscripcion_abierta' THEN 1
                    WHEN 'en_curso' THEN 2
                    WHEN 'proximo' THEN 3
                    WHEN 'finalizado' THEN 4
                END,
                t.fecha_inicio ASC
        `);

        // Verificar si el usuario está inscrito en cada torneo
        const usuarioId = req.usuarioId;
        const [misInscripciones] = await pool.query(`
            SELECT torneo_id FROM inscripciones_torneo WHERE usuario_id = ?
        `, [usuarioId]);
        const misTorneosIds = new Set(misInscripciones.map(i => i.torneo_id));

        const torneosConEstado = torneos.map(t => ({
            ...t,
            inscrito: misTorneosIds.has(t.id),
            puedeInscribirse: t.estado === 'inscripcion_abierta' && t.inscritos < t.max_usuarios && !misTorneosIds.has(t.id)
        }));

        res.json({ success: true, torneos: torneosConEstado });
    } catch (error) {
        console.error('Error obteniendo torneos:', error);
        res.status(500).json({ success: false, error: 'Error al cargar torneos' });
    }
});

// GET /api/torneos/:id - Detalle de un torneo
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const [torneos] = await pool.query(`
            SELECT 
                t.*,
                m.nombre as materia_nombre,
                (SELECT COUNT(*) FROM inscripciones_torneo WHERE torneo_id = t.id) as inscritos
            FROM torneos t
            JOIN materias m ON t.materia_id = m.id
            WHERE t.id = ?
        `, [req.params.id]);

        if (torneos.length === 0) {
            return res.status(404).json({ success: false, error: 'Torneo no encontrado' });
        }

        const torneo = torneos[0];
        
        // Verificar inscripción del usuario
        const [inscripcion] = await pool.query(`
            SELECT * FROM inscripciones_torneo WHERE torneo_id = ? AND usuario_id = ?
        `, [torneo.id, req.usuarioId]);

        // Obtener ranking en vivo
        const [ranking] = await pool.query(`
            SELECT 
                rt.posicion,
                rt.puntaje_final,
                u.username,
                u.avatar_url
            FROM ranking_torneo rt
            JOIN usuarios u ON rt.usuario_id = u.id
            WHERE rt.torneo_id = ?
            ORDER BY rt.posicion
        `, [torneo.id]);

        // Si está en curso, obtener ranking provisional de inscripciones
        let rankingEnVivo = ranking;
        if (torneo.estado === 'en_curso' && ranking.length === 0) {
            const [provisional] = await pool.query(`
                SELECT 
                    ROW_NUMBER() OVER (ORDER BY it.puntaje DESC, it.fecha_inscripcion ASC) as posicion,
                    it.puntaje as puntaje_final,
                    u.username,
                    u.avatar_url
                FROM inscripciones_torneo it
                JOIN usuarios u ON it.usuario_id = u.id
                WHERE it.torneo_id = ?
            `, [torneo.id]);
            rankingEnVivo = provisional;
        }

        res.json({
            success: true,
            torneo: {
                ...torneo,
                inscrito: !!inscripcion,
                miInscripcion: inscripcion[0] || null,
                ranking: rankingEnVivo
            }
        });
    } catch (error) {
        console.error('Error obteniendo detalle de torneo:', error);
        res.status(500).json({ success: false, error: 'Error al cargar torneo' });
    }
});

// POST /api/torneos/:id/inscribirse - Inscribirse a un torneo
router.post('/:id/inscribirse', authMiddleware, async (req, res) => {
    try {
        const torneoId = req.params.id;
        const usuarioId = req.usuarioId;

        const [torneos] = await pool.query(`
            SELECT * FROM torneos WHERE id = ?
        `, [torneoId]);

        if (torneos.length === 0) {
            return res.status(404).json({ success: false, error: 'Torneo no encontrado' });
        }

        const torneo = torneos[0];

        // Verificar estado
        if (torneo.estado !== 'inscripcion_abierta') {
            return res.status(400).json({ 
                success: false, 
                error: torneo.estado === 'proximo' 
                    ? 'Las inscripciones abren 1 hora antes del inicio' 
                    : 'El torneo ya no acepta inscripciones'
            });
        }

        // Verificar cupo
        const [inscritos] = await pool.query(`
            SELECT COUNT(*) as total FROM inscripciones_torneo WHERE torneo_id = ?
        `, [torneoId]);

        if (inscritos[0].total >= torneo.max_usuarios) {
            return res.status(400).json({ success: false, error: 'Torneo lleno' });
        }

        // Verificar si ya está inscrito
        const [existente] = await pool.query(`
            SELECT * FROM inscripciones_torneo WHERE torneo_id = ? AND usuario_id = ?
        `, [torneoId, usuarioId]);

        if (existente.length > 0) {
            return res.status(400).json({ success: false, error: 'Ya estás inscrito' });
        }

        // Obtener datos del usuario
        const [usuarios] = await pool.query('SELECT email, username FROM usuarios WHERE id = ?', [usuarioId]);
        const user = usuarios[0];

        // Inscribir
        await pool.query(`
            INSERT INTO inscripciones_torneo (torneo_id, usuario_id) VALUES (?, ?)
        `, [torneoId, usuarioId]);

        // Crear notificación
        await pool.query(`
            INSERT INTO notificaciones (usuario_id, tipo, titulo, mensaje, data)
            VALUES (?, 'torneo_inscripcion', '✅ Inscripción confirmada', ?, ?)
        `, [usuarioId, `Te has inscrito en "${torneo.nombre}". El torneo comienza el ${new Date(torneo.fecha_inicio).toLocaleString()}.`, JSON.stringify({ torneo_id: torneoId })]);

        // Enviar notificación en tiempo real
        try {
            sendNotification(usuarioId, 'torneo_inscripcion', {
                torneo_id: torneoId,
                mensaje: `✅ Inscripción confirmada en "${torneo.nombre}"`
            });
        } catch (e) { console.log('No se pudo enviar notificación en tiempo real'); }

        // Enviar correo
        try {
            await sendTournamentEmail(user.email, user.username, torneo);
        } catch (e) { console.log('No se pudo enviar correo de confirmación'); }

        res.json({ success: true, message: 'Inscripción confirmada', torneo });
    } catch (error) {
        console.error('Error inscribiéndose:', error);
        res.status(500).json({ success: false, error: 'Error al inscribirse' });
    }
});

// GET /api/torneos/:id/ranking - Ranking en vivo
router.get('/:id/ranking', authMiddleware, async (req, res) => {
    try {
        const [ranking] = await pool.query(`
            SELECT 
                rt.posicion,
                rt.puntaje_final,
                u.username,
                u.avatar_url,
                CASE WHEN u.id = ? THEN true ELSE false END as soy_yo
            FROM ranking_torneo rt
            JOIN usuarios u ON rt.usuario_id = u.id
            WHERE rt.torneo_id = ?
            ORDER BY rt.posicion
        `, [req.usuarioId, req.params.id]);

        // Si no hay ranking oficial y el torneo está en curso, mostrar provisional
        if (ranking.length === 0) {
            const [provisional] = await pool.query(`
                SELECT 
                    ROW_NUMBER() OVER (ORDER BY it.puntaje DESC, it.fecha_inscripcion ASC) as posicion,
                    it.puntaje as puntaje_final,
                    u.username,
                    u.avatar_url,
                    CASE WHEN u.id = ? THEN true ELSE false END as soy_yo
                FROM inscripciones_torneo it
                JOIN usuarios u ON it.usuario_id = u.id
                WHERE it.torneo_id = ?
            `, [req.usuarioId, req.params.id]);
            return res.json({ success: true, ranking: provisional, provisional: true });
        }

        res.json({ success: true, ranking, provisional: false });
    } catch (error) {
        console.error('Error obteniendo ranking:', error);
        res.status(500).json({ success: false, error: 'Error al cargar ranking' });
    }
});

// POST /api/torneos/:id/jugar - Enviar puntaje de una partida
router.post('/:id/jugar', authMiddleware, async (req, res) => {
    try {
        const torneoId = req.params.id;
        const usuarioId = req.usuarioId;
        const { puntaje } = req.body;

        if (!Number.isInteger(puntaje) || puntaje < 0) {
            return res.status(400).json({ success: false, error: 'Puntaje inválido' });
        }

        const [torneos] = await pool.query(`
            SELECT * FROM torneos WHERE id = ? AND estado = 'en_curso'
        `, [torneoId]);

        if (torneos.length === 0) {
            return res.status(400).json({ success: false, error: 'El torneo no está en curso' });
        }

        // Verificar inscripción
        const [inscripcion] = await pool.query(`
            SELECT * FROM inscripciones_torneo WHERE torneo_id = ? AND usuario_id = ?
        `, [torneoId, usuarioId]);

        if (inscripcion.length === 0) {
            return res.status(400).json({ success: false, error: 'No estás inscrito en este torneo' });
        }

        const torneo = torneos[0];
        const maxPartidas = 5; // 5 partidas por torneo

        if (inscripcion[0].partidas_jugadas >= maxPartidas) {
            return res.status(400).json({ success: false, error: 'Ya jugaste todas las partidas' });
        }

        // Actualizar puntaje y partidas jugadas
        await pool.query(`
            UPDATE inscripciones_torneo 
            SET puntaje = puntaje + ?, partidas_jugadas = partidas_jugadas + 1
            WHERE torneo_id = ? AND usuario_id = ?
        `, [puntaje, torneoId, usuarioId]);

        // Obtener nuevo total
        const [actualizado] = await pool.query(`
            SELECT puntaje, partidas_jugadas FROM inscripciones_torneo WHERE torneo_id = ? AND usuario_id = ?
        `, [torneoId, usuarioId]);

        res.json({ 
            success: true, 
            puntajeTotal: actualizado[0].puntaje,
            partidasJugadas: actualizado[0].partidas_jugadas,
            maxPartidas
        });
    } catch (error) {
        console.error('Error guardando partida:', error);
        res.status(500).json({ success: false, error: 'Error al guardar partida' });
    }
});

// ============================================
// RUTAS ADMIN
// ============================================

// POST /api/torneos (crear torneo) - Solo admin
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const { nombre, materia_id, fecha_inicio, fecha_fin, duracion_minutos, max_usuarios, modo } = req.body;

        if (!nombre || !materia_id || !fecha_inicio || !fecha_fin) {
            return res.status(400).json({ success: false, error: 'Faltan campos obligatorios' });
        }

        const [result] = await pool.query(`
            INSERT INTO torneos (nombre, materia_id, fecha_inicio, fecha_fin, duracion_minutos, max_usuarios, modo)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [nombre, materia_id, fecha_inicio, fecha_fin, duracion_minutos || 15, max_usuarios || 8, modo || 'acumulativo']);

        res.json({ success: true, torneo: { id: result.insertId, ...req.body } });
    } catch (error) {
        console.error('Error creando torneo:', error);
        res.status(500).json({ success: false, error: 'Error al crear torneo' });
    }
});

// PUT /api/torneos/:id (actualizar torneo) - Solo admin
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const { nombre, materia_id, fecha_inicio, fecha_fin, duracion_minutos, max_usuarios, modo, estado } = req.body;
        const id = req.params.id;

        // Verificar que el torneo existe
        const [existing] = await pool.query('SELECT * FROM torneos WHERE id = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({ success: false, error: 'Torneo no encontrado' });
        }

        const updates = [];
        const params = [];

        if (nombre !== undefined) { updates.push('nombre = ?'); params.push(nombre); }
        if (materia_id !== undefined) { updates.push('materia_id = ?'); params.push(materia_id); }
        if (fecha_inicio !== undefined) { updates.push('fecha_inicio = ?'); params.push(fecha_inicio); }
        if (fecha_fin !== undefined) { updates.push('fecha_fin = ?'); params.push(fecha_fin); }
        if (duracion_minutos !== undefined) { updates.push('duracion_minutos = ?'); params.push(duracion_minutos); }
        if (max_usuarios !== undefined) { updates.push('max_usuarios = ?'); params.push(max_usuarios); }
        if (modo !== undefined) { updates.push('modo = ?'); params.push(modo); }
        if (estado !== undefined) { updates.push('estado = ?'); params.push(estado); }

        if (updates.length === 0) {
            return res.status(400).json({ success: false, error: 'No hay campos para actualizar' });
        }

        params.push(id);
        await pool.query(`UPDATE torneos SET ${updates.join(', ')} WHERE id = ?`, params);

        res.json({ success: true, message: 'Torneo actualizado' });
    } catch (error) {
        console.error('Error actualizando torneo:', error);
        res.status(500).json({ success: false, error: 'Error al actualizar torneo' });
    }
});

// POST /api/torneos/:id/finalizar - Finalizar torneo manualmente
router.post('/:id/finalizar', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        await pool.query(`UPDATE torneos SET estado = 'finalizado' WHERE id = ?`, [req.params.id]);
        await calcularRankingTorneo(req.params.id);
        res.json({ success: true, message: 'Torneo finalizado y ranking calculado' });
    } catch (error) {
        console.error('Error finalizando torneo:', error);
        res.status(500).json({ success: false, error: 'Error al finalizar torneo' });
    }
});

// DELETE /api/torneos/:id - Eliminar torneo (solo admin)
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const id = req.params.id;
        
        // Verificar que el torneo existe
        const [existing] = await pool.query('SELECT * FROM torneos WHERE id = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({ success: false, error: 'Torneo no encontrado' });
        }
        
        // Eliminar torneo (las inscripciones y ranking se borran en cascada por FK)
        await pool.query(`DELETE FROM torneos WHERE id = ?`, [id]);
        
        res.json({ success: true, message: 'Torneo eliminado correctamente' });
    } catch (error) {
        console.error('Error eliminando torneo:', error);
        res.status(500).json({ success: false, error: 'Error al eliminar torneo' });
    }
});

module.exports = router;