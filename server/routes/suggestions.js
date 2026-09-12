const express = require('express');
const router = express.Router();
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const { pool } = require('../config/database');

// ============================================
// FUNCIÓN: GUARDAR NOTIFICACIÓN EN BD
// ============================================
async function saveNotificationToDB(usuarioId, tipo, mensaje) {
    try {
        await pool.query(
            `INSERT INTO notificaciones (usuario_id, tipo, mensaje, leida, fecha_creacion) 
             VALUES (?, ?, ?, FALSE, NOW())`,
            [usuarioId, tipo, mensaje]
        );
        console.log(`✅ Notificación guardada en BD para usuario ${usuarioId}`);
    } catch (error) {
        console.error('❌ Error guardando notificación en BD:', error);
    }
}

// ============================================
// RUTA: USUARIO SUGIERE UNA PREGUNTA
// ============================================
router.post('/', authMiddleware, async (req, res) => {
    const { materiaId, pregunta, opciones, correcta, dificultad } = req.body;
    const usuarioId = req.usuarioId;

    console.log('📝 Nueva sugerencia:', { materiaId, pregunta, opciones, correcta, dificultad });

    if (!materiaId || !pregunta || !opciones || opciones.length < 2) {
        return res.status(400).json({
            success: false,
            error: 'Faltan datos: materiaId, pregunta y opciones son requeridos'
        });
    }

    try {
        const connection = await pool.getConnection();
        await connection.beginTransaction();

        const opcionesJSON = JSON.stringify(opciones);
        const textoJSON = JSON.stringify({ es: pregunta });

        const [result] = await connection.query(
            `INSERT INTO sugerencias_preguntas 
             (usuario_id, materia_id, texto, opciones, respuesta_correcta, dificultad) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            [usuarioId, materiaId, textoJSON, opcionesJSON, correcta, dificultad || 'easy']
        );

        await connection.query(
            `INSERT INTO log_sugerencias (sugerencia_id, usuario_id, accion, comentario) 
             VALUES (?, ?, ?, ?)`,
            [result.insertId, usuarioId, 'creada', 'Pregunta sugerida por usuario']
        );

        await connection.commit();
        connection.release();

        res.status(201).json({
            success: true,
            message: 'Pregunta enviada para moderación',
            sugerenciaId: result.insertId
        });
    } catch (error) {
        console.error('❌ Error al sugerir pregunta:', error);
        res.status(500).json({
            success: false,
            error: 'Error al procesar la sugerencia: ' + error.message
        });
    }
});

// ============================================
// RUTA: OBTENER SUGERENCIAS PENDIENTES (SOLO ADMIN)
// ============================================
router.get('/pendientes', adminMiddleware, async (req, res) => {
    try {
        const [sugerencias] = await pool.query(
            `SELECT 
                s.id,
                s.usuario_id,
                s.materia_id,
                s.nivel_id,
                s.texto,
                s.opciones,
                s.respuesta_correcta,
                s.dificultad,
                s.estado,
                s.comentario_moderador,
                s.fecha_sugerencia,
                s.fecha_revision,
                s.revisado_por,
                u.username,
                m.nombre as materia_nombre,
                JSON_EXTRACT(s.texto, '$.es') as texto_es
             FROM sugerencias_preguntas s
             JOIN usuarios u ON s.usuario_id = u.id
             JOIN materias m ON s.materia_id = m.id
             ORDER BY 
                CASE WHEN s.estado = 'pendiente' THEN 1 ELSE 2 END,
                s.fecha_sugerencia DESC`
        );

        const sugerenciasFormateadas = sugerencias.map(sug => {
            let opcionesArray = [];
            try {
                if (typeof sug.opciones === 'string') {
                    try {
                        opcionesArray = JSON.parse(sug.opciones);
                    } catch (e) {
                        opcionesArray = sug.opciones.split(',').map(o => o.trim());
                    }
                } else if (Array.isArray(sug.opciones)) {
                    opcionesArray = sug.opciones;
                }
            } catch (e) {
                opcionesArray = [];
            }

            return {
                ...sug,
                opciones: opcionesArray
            };
        });

        res.json({
            success: true,
            sugerencias: sugerenciasFormateadas
        });
    } catch (error) {
        console.error('Error al obtener sugerencias:', error);
        res.status(500).json({
            success: false,
            error: 'Error al cargar sugerencias: ' + error.message
        });
    }
});

// ============================================
// RUTA: APROBAR SUGERENCIA (SOLO ADMIN)
// ============================================
router.post('/aprobar/:sugerenciaId', adminMiddleware, async (req, res) => {
    const { sugerenciaId } = req.params;
    const { comentario, nivelId } = req.body;
    const moderadorId = req.usuarioId;

    console.log('✅ Aprobando sugerencia:', { sugerenciaId, nivelId, moderadorId });

    if (!nivelId) {
        return res.status(400).json({
            success: false,
            error: 'Debes seleccionar un nivel para la pregunta'
        });
    }

    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
        const [sugerencia] = await connection.query(
            `SELECT 
                s.*, 
                JSON_EXTRACT(s.texto, '$.es') as texto_es
             FROM sugerencias_preguntas s
             WHERE s.id = ? AND s.estado = 'pendiente'`,
            [sugerenciaId]
        );

        if (sugerencia.length === 0) {
            throw new Error('Sugerencia no encontrada o ya revisada');
        }

        const data = sugerencia[0];
        const usuarioId = data.usuario_id;

        let preguntaTexto = data.texto_es;
        if (!preguntaTexto) {
            try {
                const parsed = JSON.parse(data.texto);
                preguntaTexto = parsed.es || 'Pregunta sin texto';
            } catch (e) {
                preguntaTexto = String(data.texto);
            }
        }

        let opcionesArray = [];
        try {
            if (typeof data.opciones === 'string') {
                try {
                    opcionesArray = JSON.parse(data.opciones);
                } catch (e) {
                    opcionesArray = data.opciones.split(',').map(o => o.trim());
                }
            } else if (Array.isArray(data.opciones)) {
                opcionesArray = data.opciones;
            }
        } catch (e) {
            opcionesArray = [];
        }

        if (opcionesArray.length === 0) {
            throw new Error('No se pudieron parsear las opciones de la sugerencia');
        }

        const correcta = data.respuesta_correcta || 0;
        const textoJSON = JSON.stringify({ es: preguntaTexto });

        const [preguntaResult] = await connection.query(
            `INSERT INTO preguntas (nivel_id, texto, dificultad, orden) 
             VALUES (?, ?, ?, ?)`,
            [nivelId, textoJSON, data.dificultad || 'easy', 999]
        );
        const preguntaId = preguntaResult.insertId;

        for (const [index, opt] of opcionesArray.entries()) {
            const optJSON = JSON.stringify({ es: opt });
            await connection.query(
                `INSERT INTO opciones (pregunta_id, texto, es_correcta, orden) 
                 VALUES (?, ?, ?, ?)`,
                [preguntaId, optJSON, index === correcta, index + 1]
            );
        }

        await connection.query(
            `UPDATE sugerencias_preguntas 
             SET estado = 'aprobada', 
                 fecha_revision = NOW(), 
                 revisado_por = ?,
                 comentario_moderador = ?,
                 nivel_id = ?
             WHERE id = ?`,
            [moderadorId, comentario || 'Aprobada', nivelId, sugerenciaId]
        );

        await connection.commit();
        connection.release();

        // ============================================
        // GUARDAR NOTIFICACIÓN EN BD Y ENVIAR EN TIEMPO REAL
        // ============================================
        const mensaje = `¡Tu pregunta "${preguntaTexto.substring(0, 50)}..." ha sido aprobada! 🎉`;
        await saveNotificationToDB(usuarioId, 'suggestion_approved', mensaje);

        // Intentar enviar en tiempo real (si el usuario está conectado)
        try {
            const { sendNotification } = require('../server');
            sendNotification(usuarioId, 'suggestion_approved', {
                sugerenciaId: sugerenciaId,
                preguntaId: preguntaId,
                pregunta: preguntaTexto,
                mensaje: mensaje
            });
        } catch (e) {
            console.log('ℹ️ No se pudo enviar notificación en tiempo real (usuario offline)');
        }

        console.log(`✅ Sugerencia ${sugerenciaId} aprobada como pregunta ${preguntaId}`);

        res.json({
            success: true,
            message: 'Pregunta aprobada e insertada',
            preguntaId
        });
    } catch (error) {
        await connection.rollback();
        connection.release();
        console.error('❌ Error al aprobar pregunta:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// ============================================
// RUTA: RECHAZAR SUGERENCIA (SOLO ADMIN)
// ============================================
router.post('/rechazar/:sugerenciaId', adminMiddleware, async (req, res) => {
    const { sugerenciaId } = req.params;
    const { comentario } = req.body;
    const moderadorId = req.usuarioId;

    try {
        const [sugerencia] = await pool.query(
            `SELECT usuario_id, JSON_EXTRACT(texto, '$.es') as texto_es
             FROM sugerencias_preguntas 
             WHERE id = ? AND estado = 'pendiente'`,
            [sugerenciaId]
        );

        if (sugerencia.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Sugerencia no encontrada'
            });
        }

        const usuarioId = sugerencia[0].usuario_id;
        const preguntaTexto = sugerencia[0].texto_es || 'tu pregunta';

        await pool.query(
            `UPDATE sugerencias_preguntas 
             SET estado = 'rechazada', 
                 fecha_revision = NOW(), 
                 revisado_por = ?,
                 comentario_moderador = ?
             WHERE id = ? AND estado = 'pendiente'`,
            [moderadorId, comentario || 'Rechazada', sugerenciaId]
        );

        await pool.query(
            `INSERT INTO log_sugerencias (sugerencia_id, usuario_id, accion, comentario) 
             VALUES (?, ?, ?, ?)`,
            [sugerenciaId, moderadorId, 'rechazada', comentario || 'Rechazada por el moderador']
        );

        // ============================================
        // GUARDAR NOTIFICACIÓN EN BD Y ENVIAR EN TIEMPO REAL
        // ============================================
        const mensaje = `Tu pregunta "${preguntaTexto.substring(0, 50)}..." ha sido rechazada. Motivo: ${comentario || 'No especificado'}`;
        await saveNotificationToDB(usuarioId, 'suggestion_rejected', mensaje);

        try {
            const { sendNotification } = require('../server');
            sendNotification(usuarioId, 'suggestion_rejected', {
                sugerenciaId: sugerenciaId,
                pregunta: preguntaTexto,
                mensaje: mensaje
            });
        } catch (e) {
            console.log('ℹ️ No se pudo enviar notificación en tiempo real (usuario offline)');
        }

        res.json({
            success: true,
            message: 'Pregunta rechazada'
        });
    } catch (error) {
        console.error('Error al rechazar pregunta:', error);
        res.status(500).json({
            success: false,
            error: 'Error al procesar el rechazo'
        });
    }
});

// ============================================
// RUTA: OBTENER MIS SUGERENCIAS
// ============================================
router.get('/mis-sugerencias', authMiddleware, async (req, res) => {
    try {
        const [sugerencias] = await pool.query(
            `SELECT s.*, 
                    m.nombre as materia_nombre,
                    JSON_EXTRACT(s.texto, '$.es') as texto_es
             FROM sugerencias_preguntas s
             JOIN materias m ON s.materia_id = m.id
             WHERE s.usuario_id = ?
             ORDER BY s.fecha_sugerencia DESC`,
            [req.usuarioId]
        );

        res.json({
            success: true,
            sugerencias
        });
    } catch (error) {
        console.error('Error al obtener mis sugerencias:', error);
        res.status(500).json({
            success: false,
            error: 'Error al cargar sugerencias'
        });
    }
});

module.exports = router;