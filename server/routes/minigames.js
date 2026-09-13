const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const Logro = require('../models/Logro');
const { pool } = require('../config/database');

// ============================================
// RUTAS DE MINIJUEGOS
// Los minijuegos guardan su progreso en la tabla
// progreso_minijuego (usuario_id, minijuego, nivel, estrellas, completado).
// Esto los mantiene aislados de los quizzes y evita conflictos de IDs.
// ============================================

// OBTENER PROGRESO DE MINIJUEGOS DEL USUARIO
router.get('/progreso', authMiddleware, async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT minijuego, nivel, estrellas, completado
             FROM progreso_minijuego
             WHERE usuario_id = ?
             ORDER BY minijuego, nivel`,
            [req.usuarioId]
        );

        // Agrupar por minijuego -> nivel -> { estrellas, completado }
        const grouped = {};
        rows.forEach(r => {
            if (!grouped[r.minijuego]) grouped[r.minijuego] = {};
            grouped[r.minijuego][r.nivel] = {
                estrellas: r.estrellas,
                completado: !!r.completado
            };
        });

        res.json({ success: true, progreso: grouped });
    } catch (error) {
        console.error('Error obteniendo progreso de minijuegos:', error);
        res.status(500).json({ success: false, error: 'Error al cargar progreso de minijuegos' });
    }
});

// GUARDAR PROGRESO DE UN NIVEL DE MINIJUEGO
router.post('/submit', authMiddleware, async (req, res) => {
    const { minijuego, nivel, estrellas, completado } = req.body;

    if (!minijuego || !nivel) {
        return res.status(400).json({ success: false, error: 'Datos incompletos (minijuego y nivel son obligatorios)' });
    }

    try {
        await pool.query(
            `INSERT INTO progreso_minijuego (usuario_id, minijuego, nivel, estrellas, completado, fecha_completado)
             VALUES (?, ?, ?, ?, ?, NOW())
             ON DUPLICATE KEY UPDATE
             estrellas = GREATEST(estrellas, VALUES(estrellas)),
             completado = (completado OR VALUES(completado)),
             fecha_completado = IF(VALUES(completado) = 1, NOW(), fecha_completado)`,
            [req.usuarioId, minijuego, nivel, estrellas || 0, completado ? 1 : 0]
        );

        // Verificar y desbloquear logros de minijuegos
        let nuevosLogros = [];
        try {
            nuevosLogros = await Logro.checkAndUnlock(req.usuarioId);
            for (const logro of nuevosLogros) {
                try {
                    const { sendNotification } = require('../server');
                    if (sendNotification) {
                        sendNotification(req.usuarioId, 'new_logro', {
                            logro: logro,
                            mensaje: `🏅 ¡Has desbloqueado el logro "${logro.nombre}"!`
                        });
                    }
                } catch (e) {
                    console.log('ℹ️ No se pudo enviar notificación de logro');
                }
            }
        } catch (err) {
            console.log('ℹ️ No se pudieron verificar logros:', err.message);
        }

        res.json({ success: true, nuevosLogros });
    } catch (error) {
        console.error('Error guardando progreso de minijuego:', error);
        res.status(500).json({ success: false, error: 'Error al guardar progreso' });
    }
});

module.exports = router;