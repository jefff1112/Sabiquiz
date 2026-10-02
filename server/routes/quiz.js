const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const Pregunta = require('../models/Pregunta');
const Progreso = require('../models/Progreso');
const { pool } = require('../config/database');

// ============================================
// 🔥 NIVELES DE MINIJUEGO MATEMÁTICO (lista blanca)
// ============================================
// Estos IDs NO son niveles de quiz: son niveles "virtuales" sembrados por
// server/scripts/seed-minigame-levels.js bajo la materia oculta
// "Minijuegos Matemáticas" (activo = 0), para que su progreso viva en
// `progreso_usuario` y sea visible a través del JOIN de /api/progress.
//
//   501-505 → Función Lineal Interactiva (nivel 1 a 5)
//   511-515 → Círculo Trigonométrico     (nivel 1 a 5)
//
// Para estos IDs el cliente envía las estrellas ya calculadas por la mecánica
// del juego (no hay preguntas ni opciones), así que /submit acepta
// `respuestas: []` + `estrellas`. La lista blanca impide que se puedan
// inyectar estrellas arbitrarias en niveles de quiz reales.
const MINIGAME_LEVEL_IDS = new Set([501, 502, 503, 504, 505, 511, 512, 513, 514, 515]);

// REDONDEA y acota las estrellas al rango válido 0-3
function normalizarEstrellas(valor) {
    const n = Math.round(Number(valor));
    if (!Number.isFinite(n)) return 0;
    return Math.min(3, Math.max(0, n));
}

// ============================================
// RUTA: OBTENER TEORÍA DE UN NIVEL ESPECÍFICO (DEBE IR ANTES DE /nivel/:nivelId)
// ============================================
router.get('/nivel/:nivelId/teoria', authMiddleware, async (req, res) => {
    try {
        const [nivel] = await pool.query(
            'SELECT id, numero, titulo, teoria FROM niveles WHERE id = ?',
            [req.params.nivelId]
        );
        
        if (nivel.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Nivel no encontrado'
            });
        }
        
        res.json({
            success: true,
            teoria: nivel[0].teoria || null,
            titulo: nivel[0].titulo,
            numero: nivel[0].numero
        });
    } catch (error) {
        console.error('Error al obtener teoría:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Error al cargar teoría' 
        });
    }
});

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
    const { nivelId, respuestas, tiempo, estrellas: estrellasBody } = req.body;
    const usuarioId = req.usuarioId;

    console.log('📝 Recibiendo respuestas:', { nivelId, respuestas: respuestas?.length || 0, tiempo, usuarioId });

    // Validación de entrada
    if (!nivelId) {
        return res.status(400).json({ 
            success: false, 
            error: 'nivelId es requerido' 
        });
    }

    // ============================================
    // 🔥 RAMA A: NIVEL DE MINIJUEGO MATEMÁTICO
    // ============================================
    // No hay preguntas: el juego calcula las estrellas según su propia
    // mecánica y las envía. La regla de "no bajar estrellas" se aplica
    // directamente en SQL con GREATEST.
    if (MINIGAME_LEVEL_IDS.has(Number(nivelId))) {
        let connection;
        try {
            const estrellasPedidas = normalizarEstrellas(estrellasBody);
            const completado = estrellasPedidas > 0 ? 1 : 0;
            const puntaje = Math.round((estrellasPedidas / 3) * 100);

            connection = await pool.getConnection();

            await connection.query(
                `INSERT INTO progreso_usuario
                 (usuario_id, nivel_id, puntaje, estrellas, completado, fecha_completado)
                 VALUES (?, ?, ?, ?, ?, NOW())
                 ON DUPLICATE KEY UPDATE
                 estrellas  = GREATEST(estrellas, VALUES(estrellas)),
                 puntaje    = GREATEST(COALESCE(puntaje, 0), VALUES(puntaje)),
                 completado = (completado OR VALUES(completado)),
                 fecha_completado = IF(VALUES(completado) = 1, NOW(), fecha_completado)`,
                [usuarioId, Number(nivelId), puntaje, estrellasPedidas, completado]
            );

            const [rows] = await connection.query(
                'SELECT estrellas, puntaje, completado FROM progreso_usuario WHERE usuario_id = ? AND nivel_id = ?',
                [usuarioId, Number(nivelId)]
            );
            const guardado = rows[0] || { estrellas: estrellasPedidas, puntaje, completado };

            console.log(`✅ Minijuego guardado: usuario=${usuarioId}, nivel=${nivelId}, estrellas=${guardado.estrellas}`);

            return res.json({
                success: true,
                minijuego: true,
                resultados: {
                    totalCorrectas: 0,
                    totalPreguntas: 0,
                    porcentaje: Number(guardado.puntaje) || 0,
                    puntaje: Number(guardado.puntaje) || 0,
                    estrellas: Number(guardado.estrellas) || 0,
                    estrellasObtenidas: estrellasPedidas,
                    completado: !!guardado.completado
                }
            });
        } catch (error) {
            console.error('Error al guardar progreso de minijuego:', error);
            return res.status(500).json({
                success: false,
                error: 'Error al guardar el progreso del minijuego'
            });
        } finally {
            if (connection) connection.release();
        }
    }

    // ============================================
    // 🔥 RAMA B: NIVEL DE QUIZ (comportamiento original)
    // ============================================
    if (!Array.isArray(respuestas) || respuestas.length === 0) {
        return res.status(400).json({ 
            success: false, 
            error: 'respuestas debe ser un array no vacío' 
        });
    }

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

        // 🔥 GUARDAR PROGRESO (mantiene estrellas máximas, no baja al repetir)
        // Primero obtener progreso existente para calcular el máximo
        let [existing] = await connection.query(
            'SELECT estrellas, puntaje FROM progreso_usuario WHERE usuario_id = ? AND nivel_id = ?',
            [usuarioId, nivelId]
        );
        
        const existingEstrellas = existing.length > 0 ? existing[0].estrellas : 0;
        const existingPuntaje = existing.length > 0 ? existing[0].puntaje : 0;
        
        const estrellasFinal = Math.max(estrellas, existingEstrellas);
        const puntajeFinal = Math.max(puntaje, existingPuntaje);
        const completadoFinal = completado || (existing.length > 0 && existing[0].completado);

        await connection.query(
            `INSERT INTO progreso_usuario 
             (usuario_id, nivel_id, puntaje, estrellas, completado, fecha_completado)
             VALUES (?, ?, ?, ?, ?, NOW())
             ON DUPLICATE KEY UPDATE
             puntaje = VALUES(puntaje),
             estrellas = VALUES(estrellas),
             completado = VALUES(completado),
             fecha_completado = IF(VALUES(completado) = 1, NOW(), fecha_completado)`,
            [usuarioId, nivelId, puntajeFinal, estrellasFinal, completadoFinal]
        );

        await connection.commit();
        connection.release();

        console.log(`✅ Progreso guardado: usuario=${usuarioId}, nivel=${nivelId}, estrellas=${estrellasFinal}`);

        res.json({
            success: true,
            resultados: {
                totalCorrectas: correctas,
                totalPreguntas: totalPreguntas,
                porcentaje: porcentaje * 100,
                puntaje: puntajeFinal,
                estrellas: estrellasFinal,
                completado: completadoFinal
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
// RUTA: OBTENER NIVELES DE UNA MATERIA (INCLUYE TEORÍA)
// ============================================
router.get('/materia/:materiaId/niveles', async (req, res) => {
    try {
        const [niveles] = await pool.query(
            'SELECT id, materia_id, numero, titulo, passing_score, orden, teoria FROM niveles WHERE materia_id = ? ORDER BY numero',
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