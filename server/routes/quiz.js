const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const Pregunta = require('../models/Pregunta');
const Progreso = require('../models/Progreso');
const { pool } = require('../config/database');

// ============================================
// RUTA: OBTENER PREGUNTAS DE UN NIVEL
// ============================================
router.get('/nivel/:nivelId', authMiddleware, async (req, res) => {
    try {
        const preguntas = await Pregunta.getByNivel(req.params.nivelId);
        res.json({
            success: true,
            preguntas
        });
    } catch (error) {
        console.error('Error al obtener preguntas:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Error al cargar preguntas' 
        });
    }
});

// ============================================
// RUTA: OBTENER PREGUNTAS ALEATORIAS PARA 1VS1
// ============================================
router.get('/random/:materiaId', authMiddleware, async (req, res) => {
    try {
        const cantidad = req.query.cantidad || 10;
        const preguntas = await Pregunta.getRandomQuestions(
            req.params.materiaId,
            parseInt(cantidad)
        );
        res.json({
            success: true,
            preguntas
        });
    } catch (error) {
        console.error('Error al obtener preguntas aleatorias:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Error al cargar preguntas' 
        });
    }
});

// ============================================
// RUTA: ENVIAR RESPUESTAS Y CALCULAR PUNTAJE
// ============================================
router.post('/submit', authMiddleware, async (req, res) => {
    const { nivelId, respuestas, tiempo } = req.body;
    const usuarioId = req.usuarioId;

    console.log('📝 Recibiendo respuestas:', { nivelId, respuestas: respuestas?.length || 0, tiempo, usuarioId });

    try {
        const connection = await pool.getConnection();
        await connection.beginTransaction();

        // 🔥 Contar respuestas correctas (según el flag enviado por el cliente)
        let correctas = 0;
        for (const respuesta of respuestas) {
            if (respuesta.esCorrecta) {
                correctas++;
            }
        }

        // Obtener total de preguntas del nivel (o usar las respondidas)
        const [preguntas] = await connection.query(
            'SELECT COUNT(*) as total FROM preguntas WHERE nivel_id = ?',
            [nivelId]
        );
        const totalPreguntas = (respuestas && respuestas.length > 0)
            ? respuestas.length
            : (preguntas[0].total || 1);

        const porcentaje = totalPreguntas > 0 ? correctas / totalPreguntas : 0;
        
        let estrellas = 0;
        if (porcentaje >= 1) estrellas = 3;
        else if (porcentaje >= 0.7) estrellas = 2;
        else if (porcentaje >= 0.5) estrellas = 1;
        
        const completado = porcentaje >= 0.6;
        const puntaje = Math.round(porcentaje * 100);

        // 🔥 GUARDAR PROGRESO
        await connection.query(
            `INSERT INTO progreso_usuario 
             (usuario_id, nivel_id, puntaje, estrellas, completado, fecha_completado)
             VALUES (?, ?, ?, ?, ?, NOW())
             ON DUPLICATE KEY UPDATE
             puntaje = VALUES(puntaje),
             estrellas = VALUES(estrellas),
             completado = VALUES(completado),
             fecha_completado = NOW()`,
            [usuarioId, nivelId, puntaje, estrellas, completado]
        );

        await connection.commit();
        connection.release();

        console.log(`✅ Progreso guardado: usuario=${usuarioId}, nivel=${nivelId}, estrellas=${estrellas}`);

        res.json({
            success: true,
            resultados: {
                totalCorrectas: correctas,
                totalPreguntas: totalPreguntas,
                porcentaje: porcentaje * 100,
                puntaje,
                estrellas,
                completado
            }
        });
    } catch (error) {
        console.error('Error al enviar respuestas:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Error al procesar respuestas: ' + error.message
        });
    }
});

// ============================================
// RUTA: OBTENER MATERIAS DISPONIBLES
// ============================================
router.get('/materias', async (req, res) => {
    try {
        const [materias] = await pool.query(
            'SELECT * FROM materias WHERE activo = TRUE ORDER BY orden'
        );
        res.json({
            success: true,
            materias
        });
    } catch (error) {
        console.error('Error al obtener materias:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Error al cargar materias' 
        });
    }
});

// ============================================
// RUTA: OBTENER NIVELES DE UNA MATERIA
// ============================================
router.get('/materia/:materiaId/niveles', async (req, res) => {
    try {
        const [niveles] = await pool.query(
            'SELECT * FROM niveles WHERE materia_id = ? ORDER BY numero',
            [req.params.materiaId]
        );
        res.json({
            success: true,
            niveles
        });
    } catch (error) {
        console.error('Error al obtener niveles:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Error al cargar niveles' 
        });
    }
});

module.exports = router;