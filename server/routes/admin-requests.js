const express = require('express');
const router = express.Router();
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const { pool } = require('../config/database');

// ============================================
// RUTA: SOLICITAR SER ADMIN (usuario normal)
// ============================================
router.post('/', authMiddleware, async (req, res) => {
    const { motivo } = req.body;
    const usuarioId = req.usuarioId;

    if (!motivo || motivo.trim().length < 10) {
        return res.status(400).json({
            success: false,
            error: 'El motivo debe tener al menos 10 caracteres'
        });
    }

    try {
        // Verificar si ya es admin
        const [userRows] = await pool.query(
            'SELECT rol FROM usuarios WHERE id = ?', [usuarioId]
        );
        if (userRows.length > 0 && userRows[0].rol === 'admin') {
            return res.status(400).json({
                success: false,
                error: 'Ya eres administrador'
            });
        }

        // Verificar si ya tiene solicitud pendiente
        const [pending] = await pool.query(
            'SELECT id FROM solicitudes_admin WHERE usuario_id = ? AND estado = ?',
            [usuarioId, 'pendiente']
        );
        if (pending.length > 0) {
            return res.status(400).json({
                success: false,
                error: 'Ya tienes una solicitud pendiente'
            });
        }

        await pool.query(
            `INSERT INTO solicitudes_admin (usuario_id, motivo, estado, fecha_solicitud)
             VALUES (?, ?, 'pendiente', NOW())`,
            [usuarioId, motivo.trim()]
        );

        res.status(201).json({
            success: true,
            message: 'Solicitud enviada correctamente'
        });
    } catch (error) {
        console.error('Error al solicitar admin:', error);
        res.status(500).json({
            success: false,
            error: 'Error al procesar la solicitud'
        });
    }
});

// ============================================
// RUTA: OBTENER MIS SOLICITUDES (usuario normal)
// ============================================
router.get('/mi-solicitud', authMiddleware, async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT id, estado, motivo, fecha_solicitud, fecha_revision, comentario_admin
             FROM solicitudes_admin WHERE usuario_id = ? ORDER BY fecha_solicitud DESC LIMIT 1`,
            [req.usuarioId]
        );
        res.json({ success: true, solicitud: rows[0] || null });
    } catch (error) {
        console.error('Error al obtener solicitud:', error);
        res.status(500).json({ success: false, error: 'Error al cargar solicitud' });
    }
});

// ============================================
// RUTA: OBTENER SOLICITUDES PENDIENTES (admin)
// ============================================
router.get('/pending', adminMiddleware, async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT s.*, u.username, u.email, u.avatar_url
             FROM solicitudes_admin s
             JOIN usuarios u ON s.usuario_id COLLATE utf8mb4_unicode_ci = u.id COLLATE utf8mb4_unicode_ci
             ORDER BY 
                CASE WHEN s.estado = 'pendiente' THEN 1 ELSE 2 END,
                s.fecha_solicitud ASC`
        );
        res.json({ success: true, solicitudes: rows });
    } catch (error) {
        console.error('Error al obtener solicitudes:', error);
        res.status(500).json({ success: false, error: 'Error al cargar solicitudes' });
    }
});

// ============================================
// RUTA: APROBAR SOLICITUD (admin)
// ============================================
router.post('/approve/:id', adminMiddleware, async (req, res) => {
    const { id } = req.params;
    const { comentario } = req.body;
    const adminId = req.usuarioId;

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const [sol] = await connection.query(
            'SELECT usuario_id FROM solicitudes_admin WHERE id = ? AND estado = ?',
            [id, 'pendiente']
        );
        if (sol.length === 0) {
            await connection.rollback();
            return res.status(404).json({ success: false, error: 'Solicitud no encontrada o ya procesada' });
        }

        const userId = sol[0].usuario_id;

        // Actualizar solicitud
        await connection.query(
            `UPDATE solicitudes_admin SET estado = 'aprobada', fecha_revision = NOW(),
             revisado_por = ?, comentario_admin = ? WHERE id = ?`,
            [adminId, comentario || 'Aprobada', id]
        );

        // Hacer admin al usuario
        await connection.query(
            'UPDATE usuarios SET rol = ? WHERE id = ?',
            ['admin', userId]
        );

        // Notificación
        try {
            await connection.query(
                `INSERT INTO notificaciones (usuario_id, tipo, mensaje, leida, fecha_creacion)
                 VALUES (?, ?, ?, FALSE, NOW())`,
                [userId, 'admin_approved', '🎉 ¡Tu solicitud de administrador ha sido aprobada! Ya tienes acceso al Panel de Administración.']
            );
        } catch (e) { /* ignore */ }

        await connection.commit();
        res.json({ success: true, message: 'Solicitud aprobada' });
    } catch (error) {
        await connection.rollback();
        console.error('Error al aprobar solicitud:', error);
        res.status(500).json({ success: false, error: 'Error al aprobar solicitud' });
    } finally {
        connection.release();
    }
});

// ============================================
// RUTA: RECHAZAR SOLICITUD (admin)
// ============================================
router.post('/reject/:id', adminMiddleware, async (req, res) => {
    const { id } = req.params;
    const { comentario } = req.body;
    const adminId = req.usuarioId;

    try {
        const [sol] = await pool.query(
            'SELECT usuario_id FROM solicitudes_admin WHERE id = ? AND estado = ?',
            [id, 'pendiente']
        );
        if (sol.length === 0) {
            return res.status(404).json({ success: false, error: 'Solicitud no encontrada o ya procesada' });
        }

        await pool.query(
            `UPDATE solicitudes_admin SET estado = 'rechazada', fecha_revision = NOW(),
             revisado_por = ?, comentario_admin = ? WHERE id = ?`,
            [adminId, comentario || 'Rechazada', id]
        );

        // Notificación
        try {
            await pool.query(
                `INSERT INTO notificaciones (usuario_id, tipo, mensaje, leida, fecha_creacion)
                 VALUES (?, ?, ?, FALSE, NOW())`,
                [sol[0].usuario_id, 'admin_rejected', `Tu solicitud de administrador ha sido rechazada. Motivo: ${comentario || 'No especificado'}`]
            );
        } catch (e) { /* ignore */ }

        res.json({ success: true, message: 'Solicitud rechazada' });
    } catch (error) {
        console.error('Error al rechazar solicitud:', error);
        res.status(500).json({ success: false, error: 'Error al rechazar solicitud' });
    }
});

module.exports = router;
