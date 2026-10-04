// ============================================
// SABI AI - Cliente n8n + Lógica Chat Tutor
// ============================================
const crypto = require('crypto');
const { pool } = require('../config/database');

class SabiAI {
  constructor() {
    this.webhookUrl = process.env.SABI_WEBHOOK_URL || process.env.SABI_IA_WEBHOOK_URL;
    if (!this.webhookUrl) {
      console.warn('⚠️ SABI_WEBHOOK_URL no configurado en .env - Sabi usará respuestas locales');
    }
  }

  /**
   * Envía mensaje al webhook n8n y devuelve la respuesta de Sabi.
   * @param {string} usuarioId - UUID del usuario
   * @param {string} mensaje - Texto del usuario
   * @param {Object} contexto - { materia, nivel, pregunta, opciones, intento, sessionId }
   * @returns {Object} { respuesta, imagen, sessionId }
   */
  async enviarMensaje(usuarioId, mensaje, contexto) {
    let sessionId = contexto.sessionId || null;
    let historial = [];

    // Recuperar sesión existente
    if (sessionId) {
      try {
        const [rows] = await pool.query(
          'SELECT historial FROM sabi_chat_sessions WHERE id = ? AND usuario_id = ?',
          [sessionId, usuarioId]
        );
        if (rows.length) {
          historial = typeof rows[0].historial === 'string' ? JSON.parse(rows[0].historial || '[]') : (rows[0].historial || []);
        }
      } catch (e) {
        console.error('Error recuperando sesión Sabi:', e.message);
      }
    }

    // Agregar mensaje del usuario al historial
    historial.push({ rol: 'user', contenido: mensaje, ts: Date.now() });

    let respuesta;
    let imagen = 'img/sabi/sabi_curioso.png';

    // Asegurarse de que tenemos un sessionId real
    if (!sessionId) {
      sessionId = crypto.randomUUID();
    }

    if (this.webhookUrl) {
      try {
        // Pasamos el historial PREVIO (sin el mensaje actual) para evitar duplicación
        // El nodo Code de n8n ya añade el mensaje actual por su cuenta
        respuesta = await this._llamarWebhook(mensaje, contexto, historial.slice(0, -1), sessionId);
        imagen = this._seleccionarImagen(respuesta, contexto);
      } catch (error) {
        console.error('Error webhook Sabi:', error.message);
        respuesta = this._respuestaSimulada(contexto);
        imagen = 'img/sabi/sabi_confundido.png';
      }
    } else {
      respuesta = this._respuestaSimulada(contexto);
    }

    // Agregar respuesta de Sabi al historial
    historial.push({ rol: 'sabi', contenido: respuesta, ts: Date.now() });

    // Limitar historial a 20 mensajes
    if (historial.length > 20) {
      historial = historial.slice(-20);
    }

    // Guardar sesión en BD
    try {
      // Intentar actualizar, si no afecta filas, insertar (UPSERT manual)
      const [resultUpdate] = await pool.query(
        'UPDATE sabi_chat_sessions SET historial = ?, pregunta_actual = ?, actualizado_en = NOW() WHERE id = ?',
        [JSON.stringify(historial), contexto.pregunta || null, sessionId]
      );
      
      if (resultUpdate.affectedRows === 0) {
        await pool.query(
          `INSERT INTO sabi_chat_sessions (id, usuario_id, materia, nivel, pregunta_actual, historial)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [sessionId, usuarioId, contexto.materia || null, contexto.nivel || null,
           contexto.pregunta || null, JSON.stringify(historial)]
        );
      }
    } catch (e) {
      console.error('Error guardando sesión Sabi:', e.message);
    }

    return { respuesta, imagen, sessionId };
  }

  /**
   * Llama al webhook n8n con timeout de 15s
   */
  async _llamarWebhook(mensaje, contexto, historialPrevio, sessionId) {
    const payload = {
      body: {
        mensaje,
        contexto: {
          materia: contexto.materia || 'General',
          nivel: contexto.nivel || 1,
          pregunta: contexto.pregunta || '',
          opciones: contexto.opciones || [],
          intento: contexto.intento || 1,
          historial: historialPrevio.slice(-8).map(h => ({ rol: h.rol, contenido: h.contenido })),
          sessionId: sessionId
        }
      }
    };

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timeout);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data.respuesta || data.output || data.message || 'Hmm, no obtuve una respuesta clara. ¿Puedes reformular?';
    } catch (error) {
      clearTimeout(timeout);
      throw error;
    }
  }

  /**
   * Respuestas offline cuando el webhook no está disponible
   */
  _respuestaSimulada(contexto) {
    const intento = contexto.intento || 1;
    const materia = contexto.materia || 'General';

    const pistasGenerales = [
      `🤔 Piensa en los conceptos clave de ${materia}. ¿Qué definición o fórmula aplica aquí?`,
      `💡 Un buen truco: lee la pregunta dos veces. La clave suele estar en las palabras específicas.`,
      `📚 Recuerda lo que estudiaste sobre ${materia}. A veces la respuesta más simple es la correcta.`
    ];

    if (intento <= 1) {
      return pistasGenerales[Math.floor(Math.random() * pistasGenerales.length)];
    } else if (intento === 2) {
      return `🔍 La respuesta está relacionada con los fundamentos de ${materia}. Descarta las opciones que claramente no encajan.`;
    } else {
      return `✅ No te preocupes, ¡aprender es un proceso! Te recomiendo repasar la teoría de este nivel antes de intentarlo de nuevo.`;
    }
  }

  /**
   * Selecciona la imagen de Sabi según el contenido de la respuesta
   */
  _seleccionarImagen(respuesta, contexto) {
    const texto = (respuesta || '').toLowerCase();

    if (texto.includes('correcto') || texto.includes('perfecto') || texto.includes('¡bien') || texto.includes('excelente')) {
      return 'img/sabi/sabi_celebrando.png';
    }
    if (texto.includes('pista') || texto.includes('piensa') || texto.includes('recuerda') || texto.includes('analiza')) {
      return 'img/sabi/sabi_curioso.png';
    }
    if (texto.includes('ánimo') || texto.includes('no te preocupes') || texto.includes('intentar')) {
      return 'img/sabi/sabi_anima.png';
    }
    if (contexto.intento >= 3) {
      return 'img/sabi/sabi_anima.png';
    }
    return 'img/sabi/sabi_curioso.png';
  }

  /**
   * Calcula la dificultad adaptativa de Sabi según el nivel del usuario
   */
  static calcularDificultad(promedioEstrellas, nivelesCompletados) {
    const nivelSabi = Math.max(1, Math.floor(nivelesCompletados / 3) + 1);
    let probabilidadAcierto, delayMin, delayMax, personalidad;

    if (promedioEstrellas >= 2.5) {
      probabilidadAcierto = 0.65 + Math.random() * 0.15;
      delayMin = 500; delayMax = 1200;
      personalidad = 'experto';
    } else if (promedioEstrellas >= 1.5) {
      probabilidadAcierto = 0.55 + Math.random() * 0.2;
      delayMin = 800; delayMax = 1500;
      personalidad = 'intermedio';
    } else {
      probabilidadAcierto = 0.25 + Math.random() * 0.2;
      delayMin = 1500; delayMax = 2500;
      personalidad = 'principiante';
    }

    return { nivelSabi, probabilidadAcierto, delayMin, delayMax, personalidad };
  }

  /**
   * Obtiene las stats del usuario para calcular dificultad
   */
  static async obtenerStatsUsuario(usuarioId) {
    const [userData] = await pool.query(`
      SELECT
        u.id, u.username, u.avatar_url,
        (SELECT AVG(p.estrellas) FROM progreso_usuario p WHERE p.usuario_id = u.id AND p.completado = TRUE) as promedio_estrellas,
        (SELECT COUNT(*) FROM progreso_usuario p WHERE p.usuario_id = u.id AND p.completado = TRUE) as niveles_completados
      FROM usuarios u WHERE u.id = ?
    `, [usuarioId]);

    if (!userData.length) return null;

    const user = userData[0];
    return {
      id: user.id,
      username: user.username,
      avatar_url: user.avatar_url,
      promedioEstrellas: parseFloat(user.promedio_estrellas) || 0,
      nivelesCompletados: user.niveles_completados || 0
    };
  }
  /**
   * Genera la teoría de un nivel usando la IA (o fallback local)
   */
  async generarTeoria(materia, numeroNivel, preguntas) {
    const prompt = `Actúa como Sabi, un búho tutor amigable para niños y jóvenes.
Genera una explicación teórica corta y clara para el Nivel ${numeroNivel} de la materia ${materia}.
Las preguntas de este nivel son sobre los siguientes temas:\n` + preguntas.map(p => `- ${p.texto}`).join('\n') + `\n
La teoría debe estar en formato Markdown, ser fácil de entender, tener emojis y no superar los 3-4 párrafos.`;

    if (this.webhookUrl) {
      try {
        const respuesta = await this._llamarWebhook(prompt, { materia, nivel: numeroNivel }, [], crypto.randomUUID());
        return respuesta;
      } catch (error) {
        console.error('Error generando teoría con webhook:', error.message);
      }
    }

    // Fallback local
    return `### 📚 Teoría: Nivel ${numeroNivel} de ${materia}

¡Hola! Soy Sabi 🦉. En este nivel vamos a aprender conceptos muy importantes de **${materia}**.

Lee con cuidado cada pregunta y recuerda lo que has aprendido en clase. Si te equivocas, no te preocupes, ¡de los errores se aprende!

**Conceptos clave a repasar:**
${preguntas.slice(0, 3).map(p => `- Analiza bien: *${p.texto}*`).join('\n')}

¡Mucho éxito en tu quiz! 🚀`;
  }
}

module.exports = SabiAI;
