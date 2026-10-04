const express = require('express');
const router = express.Router();
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
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

    // ============================================
    // 🔥 RAMA B: NIVEL DE QUIZ — el servidor calcula el puntaje
    // ============================================
    // Cada respuesta debe traer preguntaId + opcionId. La corrección se hace
    // consultando `opciones.es_correcta` en la base de datos: NUNCA se confía
    // en ningún booleano enviado por el navegador.
    const normalizadas = [];
    for (const r of respuestas) {
        const preguntaId = Number(r && r.preguntaId);
        const opcionId = Number(r && r.opcionId);
        if (!Number.isInteger(preguntaId) || !Number.isInteger(opcionId)) {
            return res.status(400).json({
                success: false,
                error: 'Cada respuesta debe incluir preguntaId y opcionId numéricos'
            });
        }
        normalizadas.push({ preguntaId, opcionId });
    }

    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        // Comprobar que el nivel existe y es un nivel de quiz (no de minijuego)
        const [nivelRows] = await connection.query('SELECT id FROM niveles WHERE id = ?', [nivelId]);
        if (!nivelRows.length) {
            await connection.rollback();
            return res.status(404).json({ success: false, error: 'Nivel no encontrado' });
        }

        // Respuestas correctas REALES, leídas de la base de datos
        const idsPreguntas = normalizadas.map(r => r.preguntaId);
        const [correctasDB] = await connection.query(
            `SELECT o.pregunta_id, o.id AS opcion_id
             FROM opciones o
             JOIN preguntas p ON p.id = o.pregunta_id
             WHERE o.pregunta_id IN (?) AND p.nivel_id = ? AND o.es_correcta = TRUE`,
            [idsPreguntas, nivelId]
        );
        const mapaCorrectas = new Map(
            correctasDB.map(c => [Number(c.pregunta_id), Number(c.opcion_id)]));

        let correctas = 0;
        for (const r of normalizadas) {
            if (mapaCorrectas.get(r.preguntaId) === r.opcionId) correctas++;
        }

        const totalPreguntas = normalizadas.length;

        const porcentaje = totalPreguntas > 0 ? correctas / totalPreguntas : 0;

        let estrellas = 0;
        if (porcentaje >= 1) estrellas = 3;
        else if (porcentaje >= 0.7) estrellas = 2;
        else if (porcentaje >= 0.5) estrellas = 1;

        const puntaje = Math.round(porcentaje * 100);

        // Umbral de aprobación del propio nivel (antes estaba fijo en 0,6 e
        // ignoraba niveles.passing_score, que va de 0,60 a 1,00)
        const [[cfgNivel]] = await connection.query(
            'SELECT passing_score FROM niveles WHERE id = ?', [nivelId]);
        const umbral = cfgNivel ? Number(cfgNivel.passing_score) : 0.6;
        const completado = porcentaje >= umbral;

        // 🔥 GUARDAR PROGRESO (mantiene estrellas máximas, no baja al repetir)
        // Se seleccionan las 3 columnas: antes faltaba `completado`, y al
        // repetir un nivel ya completado con <60 % quedaba desmarcado.
        const [existing] = await connection.query(
            'SELECT estrellas, puntaje, completado FROM progreso_usuario WHERE usuario_id = ? AND nivel_id = ?',
            [usuarioId, nivelId]
        );

        const existingEstrellas = existing.length > 0 ? existing[0].estrellas : 0;
        const existingPuntaje = existing.length > 0 ? existing[0].puntaje : 0;
        const existingCompletado = existing.length > 0 && existing[0].completado;

        const estrellasFinal = Math.max(estrellas, existingEstrellas);
        const puntajeFinal = Math.max(puntaje, Number(existingPuntaje) || 0);
        const completadoFinal = completado || existingCompletado ? 1 : 0;

        await connection.query(
            `INSERT INTO progreso_usuario
             (usuario_id, nivel_id, puntaje, estrellas, completado, fecha_completado)
             VALUES (?, ?, ?, ?, ?, NOW())
             ON DUPLICATE KEY UPDATE
             estrellas = GREATEST(estrellas, VALUES(estrellas)),
             puntaje = GREATEST(COALESCE(puntaje, 0), VALUES(puntaje)),
             completado = (completado OR VALUES(completado)),
             fecha_completado = IF(VALUES(completado) = 1, NOW(), fecha_completado)`,
            [usuarioId, nivelId, puntajeFinal, estrellasFinal, completadoFinal]
        );

        await connection.commit();

        console.log(`✅ Progreso guardado: usuario=${usuarioId}, nivel=${nivelId}, ${correctas}/${totalPreguntas}, estrellas=${estrellasFinal}`);

        // Actualizar actividad diaria
        try {
            const hoy = new Date().toISOString().split('T')[0];
            const rachaDia = correctas === totalPreguntas && totalPreguntas > 0 ? totalPreguntas : 0;
            await pool.query(`
                INSERT INTO actividad_diaria (usuario_id, fecha, niveles_completados, preguntas_correctas, preguntas_totales, racha_maxima_dia)
                VALUES (?, ?, ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE
                niveles_completados = niveles_completados + VALUES(niveles_completados),
                preguntas_correctas = preguntas_correctas + VALUES(preguntas_correctas),
                preguntas_totales = preguntas_totales + VALUES(preguntas_totales),
                racha_maxima_dia = GREATEST(racha_maxima_dia, VALUES(racha_maxima_dia))
            `, [usuarioId, hoy, completadoFinal ? 1 : 0, correctas, totalPreguntas, rachaDia]);
        } catch (e) { console.log('No se pudo actualizar actividad diaria:', e); }

        res.json({
            success: true,
            resultados: {
                totalCorrectas: correctas,
                totalPreguntas: totalPreguntas,
                porcentaje: porcentaje * 100,
                puntaje: puntajeFinal,
                estrellas: estrellasFinal,
                umbralAprobacion: umbral,
                completado: !!completadoFinal
            }
        });
    } catch (error) {
        if (connection) { try { await connection.rollback(); } catch (e) { /* noop */ } }
        console.error('Error al enviar respuestas:', error);
        res.status(500).json({
            success: false,
            error: 'Error al procesar respuestas'
        });
    } finally {
        if (connection) connection.release();
    }
});

// ============================================
// RUTA: VALIDAR UNA SOLA RESPUESTA
// ============================================
// Permite dar feedback inmediato en el quiz SIN enviar `es_correcta` en el
// listado de preguntas (antes la respuesta correcta viajaba al navegador antes
// de responder y se podía leer en DevTools).
router.post('/check', authMiddleware, async (req, res) => {
    const preguntaId = Number(req.body.preguntaId);
    const opcionId = Number(req.body.opcionId);

    // Validar (preguntaId debe ser > 0, opcionId puede ser 0 por timeout)
    if (!Number.isInteger(preguntaId) || preguntaId <= 0 ||
        !Number.isInteger(opcionId)   || opcionId < 0) {
        return res.status(400).json({ success: false, error: 'preguntaId y opcionId inválidos' });
    }

    try {
        const [rows] = await pool.query(
            `SELECT o.id, o.es_correcta, JSON_UNQUOTE(JSON_EXTRACT(o.texto, '$.es')) AS texto
             FROM opciones o WHERE o.pregunta_id = ?`, [preguntaId]);
        
        if (!rows.length) {
            return res.status(404).json({ success: false, error: 'Pregunta no encontrada' });
        }

        const elegida = rows.find(o => Number(o.id) === opcionId);
        const correcta = rows.find(o => o.es_correcta);
        
        if (!elegida) {
            return res.status(400).json({ success: false, error: 'La opción no pertenece a esa pregunta' });
        }

        res.json({
            success: true,
            correcta: !!elegida.es_correcta,
            respuestaCorrectaId: correcta ? Number(correcta.id) : null,
            respuestaCorrectaTexto: correcta ? correcta.texto : null
        });
    } catch (error) {
        console.error('Error al comprobar respuesta:', error);
        res.status(500).json({ success: false, error: 'Error al comprobar la respuesta' });
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

// ============================================
// ADMIN: CREATE LEVEL
// ============================================
router.post('/admin/nivel', adminMiddleware, async (req, res) => {
    try {
        const { materiaId, numero, titulo, descripcion, passing_score } = req.body;
        
        let targetNumero = numero;
        
        if (targetNumero) {
            const [existing] = await pool.query('SELECT id FROM niveles WHERE materia_id = ? AND numero = ?', [materiaId, targetNumero]);
            if (existing.length > 0) {
                await pool.query('UPDATE niveles SET numero = numero + 1 WHERE materia_id = ? AND numero >= ? ORDER BY numero DESC', [materiaId, targetNumero]);
            }
        } else {
            const [maxResult] = await pool.query('SELECT MAX(numero) as maxNum FROM niveles WHERE materia_id = ?', [materiaId]);
            targetNumero = (maxResult[0].maxNum || 0) + 1;
        }
        
        const [result] = await pool.query(
            'INSERT INTO niveles (materia_id, numero, titulo, teoria, passing_score, orden) VALUES (?, ?, ?, ?, ?, ?)',
            [materiaId, targetNumero, titulo, descripcion || null, passing_score || 0.6, targetNumero]
        );
        
        const [newLevel] = await pool.query('SELECT * FROM niveles WHERE id = ?', [result.insertId]);
        
        res.json({ success: true, nivel: newLevel[0] });
    } catch (error) {
        console.error('Error creating level:', error);
        res.status(500).json({ success: false, error: 'Error al crear nivel' });
    }
});

// ============================================
// ADMIN: GET LEVELS
// ============================================
router.get('/admin/niveles/:materiaId', adminMiddleware, async (req, res) => {
    try {
        const [niveles] = await pool.query(
            'SELECT n.*, COUNT(p.id) as total_preguntas FROM niveles n LEFT JOIN preguntas p ON p.nivel_id = n.id WHERE n.materia_id = ? GROUP BY n.id ORDER BY n.numero',
            [req.params.materiaId]
        );
        res.json({ success: true, niveles });
    } catch (error) {
        console.error('Error getting levels:', error);
        res.status(500).json({ success: false, error: 'Error al obtener niveles' });
    }
});

// ============================================
// ADMIN: ADD QUESTION
// ============================================
router.post('/admin/pregunta', adminMiddleware, async (req, res) => {
    let connection;
    try {
        const { nivelId, texto, opciones, dificultad } = req.body;
        
        connection = await pool.getConnection();
        await connection.beginTransaction();
        
        const [nivel] = await connection.query('SELECT id FROM niveles WHERE id = ?', [nivelId]);
        if (nivel.length === 0) {
            await connection.rollback();
            return res.status(404).json({ success: false, error: 'Nivel no encontrado' });
        }
        
        const dif = dificultad || 'medium';
        const textoJson = JSON.stringify({ es: texto });
        
        const [result] = await connection.query(
            'INSERT INTO preguntas (nivel_id, texto, dificultad) VALUES (?, ?, ?)',
            [nivelId, textoJson, dif]
        );
        const preguntaId = result.insertId;
        
        let orden = 1;
        for (const opc of opciones) {
            const opcTextoJson = JSON.stringify({ es: opc.texto });
            await connection.query(
                'INSERT INTO opciones (pregunta_id, texto, es_correcta, orden) VALUES (?, ?, ?, ?)',
                [preguntaId, opcTextoJson, opc.es_correcta ? 1 : 0, orden++]
            );
        }
        
        await connection.commit();
        res.json({ success: true, preguntaId });
    } catch (error) {
        if (connection) await connection.rollback();
        console.error('Error adding question:', error);
        res.status(500).json({ success: false, error: 'Error al añadir pregunta' });
    } finally {
        if (connection) connection.release();
    }
});

// ============================================
// RUTA ADMIN: OBTENER NIVELES CON CONTEO DE PREGUNTAS
// ============================================
router.get('/admin/niveles/:materiaId', adminMiddleware, async (req, res) => {
    try {
        const [niveles] = await pool.query(
            `SELECT n.id, n.materia_id, n.numero, n.titulo, n.passing_score, n.orden, n.teoria,
                    COUNT(p.id) as total_preguntas
             FROM niveles n
             LEFT JOIN preguntas p ON p.nivel_id = n.id
             WHERE n.materia_id = ?
             GROUP BY n.id
             ORDER BY n.numero`,
            [req.params.materiaId]
        );
        res.json({ success: true, niveles });
    } catch (error) {
        console.error('Error al obtener niveles admin:', error);
        res.status(500).json({ success: false, error: 'Error al cargar niveles' });
    }
});

// ============================================
// RUTA ADMIN: CREAR NUEVO NIVEL
// ============================================
router.post('/admin/nivel', adminMiddleware, async (req, res) => {
    const { materiaId, numero, titulo, descripcion, passing_score } = req.body;

    if (!materiaId) {
        return res.status(400).json({ success: false, error: 'materiaId es requerido' });
    }

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        let nuevoNumero = numero;

        if (nuevoNumero) {
            // Verificar si ya existe un nivel con ese número en esta materia
            const [existing] = await connection.query(
                'SELECT id FROM niveles WHERE materia_id = ? AND numero = ?',
                [materiaId, nuevoNumero]
            );
            if (existing.length > 0) {
                // Desplazar niveles >= nuevoNumero hacia arriba
                await connection.query(
                    'UPDATE niveles SET numero = numero + 1 WHERE materia_id = ? AND numero >= ? ORDER BY numero DESC',
                    [materiaId, nuevoNumero]
                );
            }
        } else {
            // Obtener el siguiente número disponible
            const [maxRow] = await connection.query(
                'SELECT COALESCE(MAX(numero), 0) as maxNum FROM niveles WHERE materia_id = ?',
                [materiaId]
            );
            nuevoNumero = maxRow[0].maxNum + 1;
        }

        const [result] = await connection.query(
            `INSERT INTO niveles (materia_id, numero, titulo, passing_score, orden)
             VALUES (?, ?, ?, ?, ?)`,
            [materiaId, nuevoNumero, titulo || `Nivel ${nuevoNumero}`, passing_score || 0.6, nuevoNumero]
        );

        await connection.commit();
        res.json({
            success: true,
            message: `Nivel ${nuevoNumero} creado`,
            nivel: { id: result.insertId, numero: nuevoNumero, titulo: titulo || `Nivel ${nuevoNumero}` }
        });
    } catch (error) {
        await connection.rollback();
        console.error('Error al crear nivel:', error);
        res.status(500).json({ success: false, error: 'Error al crear nivel: ' + error.message });
    } finally {
        connection.release();
    }
});

// ============================================
// RUTA ADMIN: AGREGAR PREGUNTA A UN NIVEL EXISTENTE
// ============================================
router.post('/admin/pregunta', adminMiddleware, async (req, res) => {
    const { nivelId, texto, opciones, dificultad } = req.body;

    if (!nivelId || !texto || !opciones || !Array.isArray(opciones) || opciones.length < 2) {
        return res.status(400).json({
            success: false,
            error: 'nivelId, texto y opciones (mínimo 2) son requeridos'
        });
    }

    // Verificar que al menos una opción sea correcta
    const tieneCorrecta = opciones.some(o => o.es_correcta);
    if (!tieneCorrecta) {
        return res.status(400).json({
            success: false,
            error: 'Al menos una opción debe ser marcada como correcta'
        });
    }

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // Verificar que el nivel existe
        const [nivelRows] = await connection.query('SELECT id FROM niveles WHERE id = ?', [nivelId]);
        if (!nivelRows.length) {
            await connection.rollback();
            return res.status(404).json({ success: false, error: 'Nivel no encontrado' });
        }

        // Obtener el orden máximo actual
        const [maxOrden] = await connection.query(
            'SELECT COALESCE(MAX(orden), 0) as maxOrd FROM preguntas WHERE nivel_id = ?',
            [nivelId]
        );

        const textoJSON = JSON.stringify({ es: texto });
        const [pregResult] = await connection.query(
            'INSERT INTO preguntas (nivel_id, texto, dificultad, orden) VALUES (?, ?, ?, ?)',
            [nivelId, textoJSON, dificultad || 'easy', maxOrden[0].maxOrd + 1]
        );
        const preguntaId = pregResult.insertId;

        // Insertar opciones
        for (const [index, opt] of opciones.entries()) {
            const optJSON = JSON.stringify({ es: opt.texto });
            await connection.query(
                'INSERT INTO opciones (pregunta_id, texto, es_correcta, orden) VALUES (?, ?, ?, ?)',
                [preguntaId, optJSON, !!opt.es_correcta, index + 1]
            );
        }

        await connection.commit();
        res.json({
            success: true,
            message: 'Pregunta agregada correctamente',
            preguntaId
        });
    } catch (error) {
        await connection.rollback();
        console.error('Error al agregar pregunta:', error);
        res.status(500).json({ success: false, error: 'Error al agregar pregunta: ' + error.message });
    } finally {
        connection.release();
    }
});

module.exports = router;