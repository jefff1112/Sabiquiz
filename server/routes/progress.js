const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const Progreso = require('../models/Progreso');
const Logro = require('../models/Logro');
const { pool } = require('../config/database');

// ============================================
// RUTA: OBTENER TODO EL PROGRESO DEL USUARIO
// ============================================
router.get('/', authMiddleware, async (req, res) => {
    try {
        const progreso = await Progreso.getAllProgreso(req.usuarioId);
        
        const grouped = {};
        for (const item of progreso) {
            if (!grouped[item.materia_nombre]) {
                grouped[item.materia_nombre] = [];
            }
            grouped[item.materia_nombre].push({
                nivel_id: item.nivel_id,
                nivel: item.numero,
                titulo: item.titulo,
                completado: item.completado,
                estrellas: item.estrellas,
                puntaje: item.puntaje,
                fecha_completado: item.fecha_completado
            });
        }
        
        res.json({
            success: true,
            progreso: grouped
        });
    } catch (error) {
        console.error('Error al obtener progreso:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Error al cargar progreso' 
        });
    }
});

// ============================================
// RUTA: OBTENER PROGRESO DE UNA MATERIA
// ============================================
router.get('/materia/:materiaId', authMiddleware, async (req, res) => {
    try {
        const progreso = await Progreso.getProgresoByMateria(
            req.usuarioId,
            req.params.materiaId
        );
        
        const [materia] = await pool.query(
            'SELECT nombre FROM materias WHERE id = ?',
            [req.params.materiaId]
        );
        
        res.json({
            success: true,
            materia: materia[0]?.nombre || 'Desconocida',
            progreso
        });
    } catch (error) {
        console.error('Error al obtener progreso por materia:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Error al cargar progreso' 
        });
    }
});

// ============================================
// RUTA: OBTENER NIVELES DESBLOQUEADOS
// ============================================
router.get('/desbloqueados', authMiddleware, async (req, res) => {
    try {
        const desbloqueados = await Progreso.getNivelesDesbloqueados(req.usuarioId);
        
        res.json({
            success: true,
            desbloqueados
        });
    } catch (error) {
        console.error('Error al obtener niveles desbloqueados:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Error al cargar niveles desbloqueados' 
        });
    }
});

// ============================================
// RUTA: OBTENER ESTADÍSTICAS DEL USUARIO
// ============================================
router.get('/stats', authMiddleware, async (req, res) => {
    try {
        // 🔥 Obtener pvpXp del usuario
        const [user] = await pool.query(
            'SELECT pvpXp FROM usuarios WHERE id = ?',
            [req.usuarioId]
        );

        const [stats] = await pool.query(
            `SELECT 
                COUNT(DISTINCT p.nivel_id) as niveles_completados,
                SUM(p.estrellas) as total_estrellas,
                AVG(p.puntaje) as promedio_puntaje
             FROM progreso_usuario p
             WHERE p.usuario_id = ? AND p.completado = TRUE`,
            [req.usuarioId]
        );
        
        res.json({
            success: true,
            stats: {
                niveles_completados: stats[0]?.niveles_completados || 0,
                total_estrellas: stats[0]?.total_estrellas || 0,
                promedio_puntaje: stats[0]?.promedio_puntaje || 0,
                pvpXp: user[0]?.pvpXp || 0  // 🔥 AGREGAR ESTO
            }
        });
    } catch (error) {
        console.error('Error al obtener estadísticas:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Error al cargar estadísticas' 
        });
    }
});

// ============================================
// RUTA: OBTENER HISTORIAL DE PARTIDAS 1VS1
// ============================================
router.get('/historial-partidas', authMiddleware, async (req, res) => {
    try {
        const usuarioId = req.usuarioId;

        const [partidas] = await pool.query(
            `SELECT 
                p.id,
                p.room_code,
                p.tipo_juego,
                p.modo_juego,
                p.estado,
                p.fecha_inicio,
                p.fecha_fin,
                u1.username as anfitrion,
                u2.username as oponente,
                g.username as ganador,
                CASE 
                    WHEN p.ganador_id = ? THEN 'Ganaste'
                    WHEN p.ganador_id IS NOT NULL AND p.ganador_id != ? THEN 'Perdiste'
                    ELSE 'Empate'
                END as resultado
             FROM partidas p
             LEFT JOIN usuarios u1 ON p.anfitrion_id = u1.id
             LEFT JOIN usuarios u2 ON p.oponente_id = u2.id
             LEFT JOIN usuarios g ON p.ganador_id = g.id
             WHERE p.anfitrion_id = ? OR p.oponente_id = ?
             ORDER BY p.fecha_inicio DESC
             LIMIT 50`,
            [usuarioId, usuarioId, usuarioId, usuarioId]
        );

        res.json({
            success: true,
            partidas
        });
    } catch (error) {
        console.error('Error al obtener historial de partidas:', error);
        res.status(500).json({
            success: false,
            error: 'Error al cargar historial de partidas'
        });
    }
});

// ============================================
// RUTA: OBTENER NOTIFICACIONES DEL USUARIO
// ============================================
router.get('/notificaciones', authMiddleware, async (req, res) => {
    try {
        const [notificaciones] = await pool.query(
            `SELECT * FROM notificaciones 
             WHERE usuario_id = ? 
             ORDER BY fecha_creacion DESC 
             LIMIT 50`,
            [req.usuarioId]
        );

        res.json({
            success: true,
            notificaciones
        });
    } catch (error) {
        console.error('Error al obtener notificaciones:', error);
        res.status(500).json({
            success: false,
            error: 'Error al cargar notificaciones'
        });
    }
});

// ============================================
// RUTA: MARCAR NOTIFICACIÓN COMO LEÍDA
// ============================================
router.put('/notificaciones/:id/leer', authMiddleware, async (req, res) => {
    try {
        await pool.query(
            `UPDATE notificaciones 
             SET leida = TRUE, fecha_leida = NOW() 
             WHERE id = ? AND usuario_id = ?`,
            [req.params.id, req.usuarioId]
        );

        res.json({
            success: true,
            message: 'Notificación marcada como leída'
        });
    } catch (error) {
        console.error('Error al marcar notificación:', error);
        res.status(500).json({
            success: false,
            error: 'Error al marcar notificación'
        });
    }
});

// ============================================
// RUTA: MARCAR TODAS LAS NOTIFICACIONES COMO LEÍDAS
// ============================================
router.put('/notificaciones/leer-todas', authMiddleware, async (req, res) => {
    try {
        await pool.query(
            `UPDATE notificaciones 
             SET leida = TRUE, fecha_leida = NOW() 
             WHERE usuario_id = ? AND leida = FALSE`,
            [req.usuarioId]
        );

        res.json({
            success: true,
            message: 'Todas las notificaciones marcadas como leídas'
        });
    } catch (error) {
        console.error('Error al marcar notificaciones:', error);
        res.status(500).json({
            success: false,
            error: 'Error al marcar notificaciones'
        });
    }
});

// ============================================
// RUTA: ELIMINAR UNA NOTIFICACIÓN
// ============================================
router.delete('/notificaciones/:id', authMiddleware, async (req, res) => {
    try {
        await pool.query(
            'DELETE FROM notificaciones WHERE id = ? AND usuario_id = ?',
            [req.params.id, req.usuarioId]
        );

        res.json({
            success: true,
            message: 'Notificación eliminada'
        });
    } catch (error) {
        console.error('Error eliminando notificación:', error);
        res.status(500).json({
            success: false,
            error: 'Error al eliminar notificación'
        });
    }
});

// ============================================
// RUTA: ELIMINAR TODAS LAS NOTIFICACIONES
// ============================================
router.delete('/notificaciones', authMiddleware, async (req, res) => {
    try {
        await pool.query(
            'DELETE FROM notificaciones WHERE usuario_id = ?',
            [req.usuarioId]
        );

        res.json({
            success: true,
            message: 'Todas las notificaciones eliminadas'
        });
    } catch (error) {
        console.error('Error eliminando notificaciones:', error);
        res.status(500).json({
            success: false,
            error: 'Error al eliminar notificaciones'
        });
    }
});

// ============================================
// RUTAS DE LOGROS
// ============================================

// OBTENER LOGROS DEL USUARIO
router.get('/logros', authMiddleware, async (req, res) => {
    try {
        const [logros] = await pool.query(
            `SELECT l.*, ul.fecha_desbloqueo 
             FROM logros l
             JOIN usuario_logros ul ON l.id = ul.logro_id
             WHERE ul.usuario_id = ?
             ORDER BY ul.fecha_desbloqueo DESC`,
            [req.usuarioId]
        );

        res.json({
            success: true,
            logros
        });
    } catch (error) {
        console.error('Error al obtener logros:', error);
        res.status(500).json({
            success: false,
            error: 'Error al cargar logros'
        });
    }
});

// VERIFICAR Y DESBLOQUEAR LOGROS
router.post('/logros/check', authMiddleware, async (req, res) => {
    try {
        const nuevosLogros = await Logro.checkAndUnlock(req.usuarioId);

        // Enviar notificación en tiempo real por cada logro nuevo
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

        res.json({
            success: true,
            nuevosLogros
        });
    } catch (error) {
        console.error('Error verificando logros:', error);
        res.status(500).json({
            success: false,
            error: 'Error al verificar logros'
        });
    }
});

module.exports = router;