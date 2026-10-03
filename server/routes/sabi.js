// ============================================
// RUTAS SABI IA - Chat Tutor + 1vs1 vs Sabi
// ============================================
const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const { authMiddleware } = require('../middleware/auth');
const { pool } = require('../config/database');
const SabiAI = require('../utils/sabi_ai');

// ============================================
// A) CHAT TUTOR
// ============================================

// POST /api/sabi/chat - Enviar mensaje al tutor IA
router.post('/chat', authMiddleware, async (req, res) => {
  try {
    const usuarioId = req.usuarioId;
    const { mensaje, contexto } = req.body;

    if (!mensaje || typeof mensaje !== 'string' || !mensaje.trim()) {
      return res.status(400).json({ success: false, error: 'mensaje es requerido' });
    }

    if (!contexto || !contexto.materia) {
      return res.status(400).json({ success: false, error: 'contexto.materia es requerido' });
    }

    // Sanitizar: limitar largo del mensaje
    const mensajeLimpio = mensaje.trim().substring(0, 500);

    const sabiAI = new SabiAI();
    const result = await sabiAI.enviarMensaje(usuarioId, mensajeLimpio, {
      materia: contexto.materia,
      nivel: contexto.nivel || 1,
      pregunta: contexto.pregunta || '',
      opciones: Array.isArray(contexto.opciones) ? contexto.opciones : [],
      intento: contexto.intento || 1,
      sessionId: contexto.sessionId || null
    });

    res.json({
      success: true,
      respuesta: result.respuesta,
      imagen: result.imagen,
      sessionId: result.sessionId
    });
  } catch (error) {
    console.error('Error en /sabi/chat:', error);
    res.status(500).json({ success: false, error: 'Error interno del servidor' });
  }
});

// GET /api/sabi/historial/:sessionId - Obtener historial de chat
router.get('/historial/:sessionId', authMiddleware, async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, materia, nivel, historial, creado_en, actualizado_en FROM sabi_chat_sessions WHERE id = ? AND usuario_id = ?',
      [req.params.sessionId, req.usuarioId]
    );

    if (!rows.length) {
      return res.status(404).json({ success: false, error: 'Sesión no encontrada' });
    }

    const session = rows[0];
    const historialRaw = session.historial;
    const historial = typeof historialRaw === 'string'
      ? JSON.parse(historialRaw || '[]')
      : (historialRaw || []);

    res.json({
      success: true,
      session: {
        id: session.id,
        materia: session.materia,
        nivel: session.nivel,
        historial,
        creado_en: session.creado_en,
        actualizado_en: session.actualizado_en
      }
    });
  } catch (error) {
    console.error('Error en /sabi/historial:', error);
    res.status(500).json({ success: false, error: 'Error al obtener historial' });
  }
});

// ============================================
// B) OPONENTE 1VS1 vs SABI
// ============================================

// POST /api/sabi/1vs1/crear - Crear partida 1vs1 vs Sabi
router.post('/1vs1/crear', authMiddleware, async (req, res) => {
  try {
    const usuarioId = req.usuarioId;
    const { materiaId, tipoJuego = 'normal' } = req.body;

    // Obtener stats del usuario
    const stats = await SabiAI.obtenerStatsUsuario(usuarioId);
    if (!stats) {
      return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
    }

    // Calcular dificultad de Sabi
    const dificultad = SabiAI.calcularDificultad(stats.promedioEstrellas, stats.nivelesCompletados);

    // Obtener preguntas desde BD
    const preguntas = await _obtenerPreguntasParaSabi(tipoJuego, 5, dificultad.nivelSabi);

    if (!preguntas.length) {
      return res.status(404).json({ success: false, error: 'No hay preguntas disponibles' });
    }

    // Crear registro en sabi_1vs1_matches
    const matchId = crypto.randomUUID();
    const roomCode = `sabi_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

    await pool.query(
      `INSERT INTO sabi_1vs1_matches
       (id, usuario_id, sabi_nivel, sabi_dificultad, estado, preguntas, pregunta_actual, detalles)
       VALUES (?, ?, ?, ?, 'en_curso', ?, 0, '[]')`,
      [matchId, usuarioId, dificultad.nivelSabi,
       JSON.stringify({
         probabilidad_acierto: Math.round(dificultad.probabilidadAcierto * 100) / 100,
         delay_min_ms: dificultad.delayMin,
         delay_max_ms: dificultad.delayMax,
         personalidad: dificultad.personalidad
       }),
       JSON.stringify(preguntas)]
    );

    // Preguntas sin respuesta correcta para el frontend
    const preguntasFrontend = preguntas.map(p => ({
      preguntaId: p.preguntaId,
      question: p.question,
      options: p.options,
      difficulty: p.difficulty
    }));

    const delaySabi = Math.floor(dificultad.delayMin + Math.random() * (dificultad.delayMax - dificultad.delayMin));

    res.json({
      success: true,
      partida: {
        matchId,
        roomCode,
        totalPreguntas: preguntas.length,
        sabi: {
          nombre: 'Sabi 🤖',
          avatar: 'img/sabi/sabi_competitivo.png',
          nivel: dificultad.nivelSabi,
          personalidad: dificultad.personalidad,
          delay_ms: delaySabi,
          mensaje_intro: dificultad.personalidad === 'experto'
            ? '🤖 "¡Prepárate! No te lo pondré fácil."'
            : dificultad.personalidad === 'intermedio'
              ? '🤖 "Jugaremos una buena partida. ¡Suerte!"'
              : '🤖 "¡Hola! Juguemos juntos, voy despacito."'
        },
        preguntas: preguntasFrontend
      }
    });
  } catch (error) {
    console.error('Error en /sabi/1vs1/crear:', error);
    res.status(500).json({ success: false, error: 'Error al crear partida vs Sabi' });
  }
});

// POST /api/sabi/1vs1/:matchId/responder - Enviar respuesta en 1vs1 vs Sabi
router.post('/1vs1/:matchId/responder', authMiddleware, async (req, res) => {
  try {
    const { matchId } = req.params;
    const { opcionSeleccionada, tiempoRespuesta } = req.body;
    const usuarioId = req.usuarioId;

    // Obtener partida
    const [matches] = await pool.query(
      'SELECT * FROM sabi_1vs1_matches WHERE id = ? AND usuario_id = ? AND estado = ?',
      [matchId, usuarioId, 'en_curso']
    );

    if (!matches.length) {
      return res.status(404).json({ success: false, error: 'Partida no encontrada o ya finalizada' });
    }

    const match = matches[0];
    const preguntas = JSON.parse(match.preguntas || '[]');
    const detalles = JSON.parse(match.detalles || '[]');
    const dificultad = JSON.parse(match.sabi_dificultad || '{}');
    const preguntaActual = match.pregunta_actual;

    if (preguntaActual >= preguntas.length) {
      return res.status(400).json({ success: false, error: 'No hay más preguntas' });
    }

    const pregunta = preguntas[preguntaActual];
    const respuestaCorrecta = pregunta.correctAnswer;

    // Verificar respuesta del usuario
    const usuarioAcerto = opcionSeleccionada === respuestaCorrecta;

    // Simular respuesta de Sabi según probabilidad
    const probAcierto = dificultad.probabilidad_acierto || 0.5;
    const sabiAcerto = Math.random() < probAcierto;

    // Seleccionar la opción de Sabi
    let opcionSabi;
    if (sabiAcerto) {
      opcionSabi = respuestaCorrecta;
    } else {
      // Elegir opción incorrecta al azar
      const incorrectas = pregunta.options.filter(o => o !== respuestaCorrecta);
      opcionSabi = incorrectas[Math.floor(Math.random() * incorrectas.length)] || respuestaCorrecta;
    }

    // Calcular delay de Sabi
    const delayMin = dificultad.delay_min_ms || 800;
    const delayMax = dificultad.delay_max_ms || 1500;
    const delaySabi = Math.floor(delayMin + Math.random() * (delayMax - delayMin));

    // Actualizar puntajes
    const nuevoDetalles = [...detalles, {
      preguntaIndex: preguntaActual,
      preguntaId: pregunta.preguntaId,
      preguntaTexto: pregunta.question,
      respuestaCorrecta,
      usuario: { opcion: opcionSeleccionada, acerto: usuarioAcerto, tiempo: tiempoRespuesta || 0 },
      sabi: { opcion: opcionSabi, acerto: sabiAcerto, delay: delaySabi }
    }];

    const nuevoPuntajeUsuario = match.puntaje_usuario + (usuarioAcerto ? 1 : 0);
    const nuevoPuntajeSabi = match.puntaje_sabi + (sabiAcerto ? 1 : 0);
    const nuevaPregunta = preguntaActual + 1;
    const esUltima = nuevaPregunta >= preguntas.length;

    // Actualizar en BD
    await pool.query(
      `UPDATE sabi_1vs1_matches SET
        pregunta_actual = ?,
        puntaje_usuario = ?,
        puntaje_sabi = ?,
        detalles = ?
        ${esUltima ? ", estado = 'finalizada', finalizado_en = NOW(), resultado = ?" : ''}
       WHERE id = ?`,
      esUltima
        ? [nuevaPregunta, nuevoPuntajeUsuario, nuevoPuntajeSabi, JSON.stringify(nuevoDetalles),
           nuevoPuntajeUsuario > nuevoPuntajeSabi ? 'victoria' : nuevoPuntajeUsuario < nuevoPuntajeSabi ? 'derrota' : 'empate',
           matchId]
        : [nuevaPregunta, nuevoPuntajeUsuario, nuevoPuntajeSabi, JSON.stringify(nuevoDetalles), matchId]
    );

    // Si terminó, actualizar stats del usuario
    if (esUltima) {
      try {
        await _actualizarStatsPostPartida(usuarioId, nuevoPuntajeUsuario, nuevoPuntajeSabi);
      } catch (e) {
        console.error('Error actualizando stats post-Sabi:', e.message);
      }
    }

    res.json({
      success: true,
      ronda: {
        preguntaIndex: preguntaActual,
        pregunta: pregunta.question,
        respuestaCorrecta,
        usuario: { opcion: opcionSeleccionada, acerto: usuarioAcerto },
        sabi: { opcion: opcionSabi, acerto: sabiAcerto, delay_ms: delaySabi },
        puntajes: { usuario: nuevoPuntajeUsuario, sabi: nuevoPuntajeSabi },
        esUltima,
        ...(esUltima ? {
          resultado: nuevoPuntajeUsuario > nuevoPuntajeSabi ? 'victoria'
            : nuevoPuntajeUsuario < nuevoPuntajeSabi ? 'derrota' : 'empate'
        } : {})
      }
    });
  } catch (error) {
    console.error('Error en /sabi/1vs1/responder:', error);
    res.status(500).json({ success: false, error: 'Error al procesar respuesta' });
  }
});

// GET /api/sabi/1vs1/:matchId/estado - Estado de partida
router.get('/1vs1/:matchId/estado', authMiddleware, async (req, res) => {
  try {
    const [matches] = await pool.query(
      'SELECT * FROM sabi_1vs1_matches WHERE id = ? AND usuario_id = ?',
      [req.params.matchId, req.usuarioId]
    );

    if (!matches.length) {
      return res.status(404).json({ success: false, error: 'Partida no encontrada' });
    }

    const m = matches[0];
    res.json({
      success: true,
      partida: {
        id: m.id,
        estado: m.estado,
        resultado: m.resultado,
        puntaje_usuario: m.puntaje_usuario,
        puntaje_sabi: m.puntaje_sabi,
        pregunta_actual: m.pregunta_actual,
        total_preguntas: JSON.parse(m.preguntas || '[]').length,
        sabi_nivel: m.sabi_nivel,
        detalles: JSON.parse(m.detalles || '[]'),
        creado_en: m.creado_en,
        finalizado_en: m.finalizado_en
      }
    });
  } catch (error) {
    console.error('Error en /sabi/1vs1/estado:', error);
    res.status(500).json({ success: false, error: 'Error al obtener estado' });
  }
});

// ============================================
// C) ENDPOINTS EXISTENTES (COMPATIBILIDAD)
// ============================================

// POST /api/sabi/jugar - Configuración Sabi (placeholder mejorado)
router.post('/jugar', authMiddleware, async (req, res) => {
  try {
    const stats = await SabiAI.obtenerStatsUsuario(req.usuarioId);
    if (!stats) {
      return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
    }

    const dificultad = SabiAI.calcularDificultad(stats.promedioEstrellas, stats.nivelesCompletados);
    const delaySabi = Math.floor(dificultad.delayMin + Math.random() * (dificultad.delayMax - dificultad.delayMin));

    res.json({
      success: true,
      sabi: {
        nombre: 'Sabi 🤖',
        avatar: 'img/sabi/sabi_competitivo.png',
        nivel: dificultad.nivelSabi,
        dificultad: {
          probabilidad_acierto: Math.round(dificultad.probabilidadAcierto * 100) / 100,
          delay_min_ms: dificultad.delayMin,
          delay_max_ms: dificultad.delayMax,
          delay_promedio_ms: delaySabi
        },
        personalidad: dificultad.personalidad,
        mensaje_intro: dificultad.personalidad === 'experto'
          ? '🤖 "¡Prepárate! No te lo pondré fácil."'
          : dificultad.personalidad === 'intermedio'
            ? '🤖 "Jugaremos una buena partida. ¡Suerte!"'
            : '🤖 "¡Hola! Juguemos juntos, voy despacito."'
      },
      frontend_config: {
        delay_entre_preguntas_ms: delaySabi,
        mostrar_pensando: true,
        animacion_pensando: 'img/sabi/sabi_pensando.png',
        animacion_acierta: 'img/sabi/sabi_celebrando.png',
        animacion_falla: 'img/sabi/sabi_confundido.png'
      }
    });
  } catch (error) {
    console.error('Error en endpoint Sabi IA:', error);
    res.status(500).json({ success: false, error: 'Error interno del servidor' });
  }
});

// GET /api/sabi/config - Obtener configuración de Sabi para el usuario
router.get('/config', authMiddleware, async (req, res) => {
  try {
    const stats = await SabiAI.obtenerStatsUsuario(req.usuarioId);
    if (!stats) {
      return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
    }

    const dificultad = SabiAI.calcularDificultad(stats.promedioEstrellas, stats.nivelesCompletados);

    res.json({
      success: true,
      sabi: {
        nombre: 'Sabi 🤖',
        avatar: 'img/sabi/sabi_competitivo.png',
        nivel: dificultad.nivelSabi,
        dificultad: {
          probabilidad_acierto: Math.round(dificultad.probabilidadAcierto * 100) / 100,
          delay_min_ms: dificultad.delayMin,
          delay_max_ms: dificultad.delayMax
        },
        personalidad: dificultad.personalidad,
        mensaje_intro: dificultad.personalidad === 'experto'
          ? '🤖 "¡Prepárate! No te lo pondré fácil."'
          : dificultad.personalidad === 'intermedio'
            ? '🤖 "Jugaremos una buena partida. ¡Suerte!"'
            : '🤖 "¡Hola! Juguemos juntos, voy despacito."'
      },
      webhook_configurado: !!(process.env.SABI_WEBHOOK_URL || process.env.SABI_IA_WEBHOOK_URL)
    });
  } catch (error) {
    console.error('Error obteniendo config de Sabi:', error);
    res.status(500).json({ success: false, error: 'Error interno del servidor' });
  }
});

// ============================================
// FUNCIONES AUXILIARES
// ============================================

/**
 * Obtiene preguntas de la BD para partidas vs Sabi.
 * Duplica la lógica esencial de getQuestionsFromDB de server.js
 * ya que esa función no se exporta.
 */
async function _obtenerPreguntasParaSabi(gameType, cantidad, nivelSabi) {
  const SQL_MATERIA_SIN_ACENTOS = `REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
    LOWER(m.nombre),'á','a'),'é','e'),'í','i'),'ó','o'),'ú','u')`;

  let where = gameType === 'maths'
    ? ` WHERE m.activo = 1 AND ${SQL_MATERIA_SIN_ACENTOS} = 'matematicas'`
    : ` WHERE m.activo = 1`;

  try {
    const [rows] = await pool.query(`
      SELECT
        p.id,
        JSON_UNQUOTE(JSON_EXTRACT(p.texto, '$.es')) as question,
        p.dificultad,
        GROUP_CONCAT(JSON_UNQUOTE(JSON_EXTRACT(o.texto, '$.es')) ORDER BY o.orden SEPARATOR '|||') as options_raw,
        GROUP_CONCAT(o.id ORDER BY o.orden SEPARATOR '|||') as option_ids_raw,
        JSON_UNQUOTE(
          (SELECT JSON_EXTRACT(o2.texto, '$.es')
           FROM opciones o2
           WHERE o2.pregunta_id = p.id AND o2.es_correcta = TRUE
           LIMIT 1)
        ) as correctAnswer
      FROM preguntas p
      JOIN niveles n ON p.nivel_id = n.id
      JOIN materias m ON n.materia_id = m.id
      JOIN opciones o ON o.pregunta_id = p.id
      ${where}
      GROUP BY p.id
      ORDER BY RAND()
      LIMIT ?
    `, [cantidad]);

    return rows.map(row => {
      const textos = String(row.options_raw || '').split('|||');
      const ids = String(row.option_ids_raw || '').split('|||');
      const opciones = [];
      for (let k = 0; k < textos.length; k++) {
        const texto = (textos[k] || '').trim();
        if (texto) opciones.push({ id: Number((ids[k] || '').trim()) || null, texto });
      }
      if (!opciones.length) {
        ['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4'].forEach(t => opciones.push({ id: null, texto: t }));
      }

      return {
        preguntaId: row.id,
        question: row.question || 'Pregunta sin texto',
        options: opciones.map(o => o.texto),
        optionIds: opciones.map(o => o.id),
        correctAnswer: row.correctAnswer || opciones[0].texto,
        difficulty: row.dificultad || 'easy'
      };
    });
  } catch (error) {
    console.error('Error obteniendo preguntas para Sabi:', error);
    return _preguntasFallback(cantidad);
  }
}

function _preguntasFallback(cantidad) {
  const fallback = [
    { preguntaId: null, question: '¿Cuál es la capital de Francia?', options: ['Madrid', 'París', 'Roma', 'Londres'], correctAnswer: 'París', difficulty: 'easy' },
    { preguntaId: null, question: '¿2 + 2?', options: ['3', '4', '5', '6'], correctAnswer: '4', difficulty: 'easy' },
    { preguntaId: null, question: '¿Qué planeta es el más cercano al Sol?', options: ['Venus', 'Marte', 'Mercurio', 'Tierra'], correctAnswer: 'Mercurio', difficulty: 'medium' },
    { preguntaId: null, question: '¿Cuántos lados tiene un hexágono?', options: ['5', '6', '7', '8'], correctAnswer: '6', difficulty: 'easy' },
    { preguntaId: null, question: '¿Quién escribió "Cien años de soledad"?', options: ['Pablo Neruda', 'Gabriel García Márquez', 'Mario Vargas Llosa', 'Jorge Luis Borges'], correctAnswer: 'Gabriel García Márquez', difficulty: 'medium' }
  ];
  return fallback.sort(() => 0.5 - Math.random()).slice(0, cantidad);
}

/**
 * Actualiza stats del usuario después de una partida vs Sabi
 */
async function _actualizarStatsPostPartida(usuarioId, puntajeUsuario, puntajeSabi) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // +1 partida jugada
    await connection.query(
      'UPDATE usuarios SET partidas_jugadas = partidas_jugadas + 1 WHERE id = ?',
      [usuarioId]
    );

    if (puntajeUsuario > puntajeSabi) {
      // Victoria: +1 ganada, +30 XP
      await connection.query(
        'UPDATE usuarios SET partidas_ganadas = partidas_ganadas + 1, pvpXp = pvpXp + 30 WHERE id = ?',
        [usuarioId]
      );
    } else if (puntajeUsuario < puntajeSabi) {
      // Derrota: +10 XP (participación)
      await connection.query(
        'UPDATE usuarios SET pvpXp = pvpXp + 10 WHERE id = ?',
        [usuarioId]
      );
    } else {
      // Empate: +15 XP
      await connection.query(
        'UPDATE usuarios SET pvpXp = pvpXp + 15 WHERE id = ?',
        [usuarioId]
      );
    }

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}
// POST /api/sabi/verify-suggestion - Verificar pregunta sugerida
router.post('/verify-suggestion', authMiddleware, async (req, res) => {
  const { pregunta, opciones, correcta } = req.body;
  if (!pregunta || !opciones || correcta === undefined) {
    return res.status(400).json({ success: false, error: 'Faltan datos' });
  }

  try {
    const SabiAI = require('../utils/sabi_ai');
    const sabi = new SabiAI();
    
    // Usar directamente el fetch al webhook configurado
    if (!sabi.webhookUrl) throw new Error('SABI_WEBHOOK_URL no configurado');

    const opsTxt = opciones.map((o,i) => `${i}: ${o}`).join(', ');
    const correctaTxt = opciones[correcta];
    
    const prompt = `Eres un experto evaluador educativo. Han sugerido esta pregunta para un juego de trivia:
Pregunta: ${pregunta}
Opciones: ${opsTxt}
La opción marcada como CORRECTA es: ${correctaTxt}

Dictamina SI ES CORRECTO Y COHERENTE. Responde solo con un pequeño reporte de máximo 4 líneas.`;

    const payload = {
      body: {
        mensaje: prompt,
        contexto: { materia: "Evaluador", nivel: 99, historial: [] }
      }
    };

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    const response = await fetch(sabi.webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
    clearTimeout(timeout);
    
    const data = await response.json();
    const analisis = data.respuesta || data.output || data.message || 'Error analizando la sugerencia';
    
    res.json({ success: true, analisis });
  } catch(error) {
    console.error('Error verify-suggestion:', error);
    res.status(500).json({ success: false, error: 'Sabi no pudo analizar la sugerencia en este momento' });
  }
});

module.exports = router;