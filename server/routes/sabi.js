const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const { pool } = require('../config/database');

// ============================================
// POST /api/sabi/jugar - Placeholder para oponente IA Sabi
// ============================================
// TODO: Conectar con n8n cuando la IA esté lista
// Formato webhook esperado para n8n:
// POST {SABI_IA_WEBHOOK_URL}
// Body: { usuario_id, nivel_usuario, dificultad_sabi, pregunta, opciones, tiempo_limite }
// Response esperado: { respuesta: "texto_opcion", confianza: 0.85, tiempo_respuesta_ms: 800 }

router.post('/jugar', authMiddleware, async (req, res) => {
    try {
        const usuarioId = req.usuarioId;
        const { nivel_id, respuestas } = req.body;

        if (!nivel_id) {
            return res.status(400).json({ success: false, error: 'nivel_id es requerido' });
        }

        // Obtener datos del usuario para calcular dificultad de Sabi
        const [userData] = await pool.query(`
            SELECT 
                u.id, u.username, u.avatar_url,
                (SELECT AVG(p.estrellas) FROM progreso_usuario p WHERE p.usuario_id = u.id AND p.completado = TRUE) as promedio_estrellas,
                (SELECT COUNT(*) FROM progreso_usuario p WHERE p.usuario_id = u.id AND p.completado = TRUE) as niveles_completados
            FROM usuarios u
            WHERE u.id = ?
        `, [usuarioId]);

        if (userData.length === 0) {
            return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
        }

        const user = userData[0];
        const promedioEstrellas = parseFloat(user.promedio_estrellas) || 0;
        const nivelesCompletados = user.niveles_completados || 0;

        // Calcular nivel y dificultad de Sabi
        // Nivel de Sabi = Nivel del usuario
        const nivelSabi = Math.max(1, Math.floor(nivelesCompletados / 3) + 1);
        
        // Dificultad de Sabi basada en promedio de estrellas
        // 3 estrellas promedio = Sabi muy bueno (90% acierto, 500ms delay)
        // 1.5 estrellas promedio = Sabi medio (60% acierto, 1200ms delay)
        // 0 estrellas = Sabi fácil (30% acierto, 2000ms delay)
        let probabilidadAcierto, delayMin, delayMax;
        
        if (promedioEstrellas >= 2.5) {
            probabilidadAcierto = 0.85 + Math.random() * 0.1; // 85-95%
            delayMin = 300; delayMax = 800;
        } else if (promedioEstrellas >= 1.5) {
            probabilidadAcierto = 0.55 + Math.random() * 0.2; // 55-75%
            delayMin = 800; delayMax = 1500;
        } else {
            probabilidadAcierto = 0.25 + Math.random() * 0.2; // 25-45%
            delayMin = 1500; delayMax = 2500;
        }

        const delaySabi = Math.floor(delayMin + Math.random() * (delayMax - delayMin));

        // Verificar si hay webhook de n8n configurado
        const webhookUrl = process.env.SABI_IA_WEBHOOK_URL;
        
        if (webhookUrl) {
            // TODO: Cuando la IA esté lista, hacer fetch al webhook de n8n
            // const response = await fetch(webhookUrl, {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({
            //         usuario_id: usuarioId,
            //         nivel_sabi: nivelSabi,
            //         dificultad: probabilidadAcierto,
            //         pregunta: req.body.pregunta,
            //         opciones: req.body.opciones,
            //         tiempo_limite: req.body.tiempo_limite || 10000
            //     })
            // });
            // const iaResult = await response.json();
            // return res.json({ success: true, ...iaResult, fuente: 'n8n' });
            
            console.log(`🤖 Webhook n8n configurado pero IA no conectada aún. URL: ${webhookUrl}`);
        }

        // RESPUESTA SIMULADA (placeholder)
        // En una partida real contra Sabi, el frontend manejaría el juego
        // Aquí solo devolvemos la configuración de Sabi para que el frontend la use
        
        res.json({
            success: true,
            sabi: {
                nombre: 'Sabi 🤖',
                avatar: 'img/sabi/sabi_competitivo.png',
                nivel: nivelSabi,
                dificultad: {
                    probabilidad_acierto: Math.round(probabilidadAcierto * 100) / 100,
                    delay_min_ms: delayMin,
                    delay_max_ms: delayMax,
                    delay_promedio_ms: delaySabi
                },
                personalidad: promedioEstrellas >= 2.5 ? 'experto' : promedioEstrellas >= 1.5 ? 'intermedio' : 'principiante',
                mensaje_intro: promedioEstrellas >= 2.5 
                    ? '🤖 "¡Prepárate! No te lo pondré fácil."'
                    : promedioEstrellas >= 1.5
                        ? '🤖 "Jugaremos una buena partida. ¡Suerte!"'
                        : '🤖 "¡Hola! Juguemos juntos, voy despacito."'
            },
            // Información para el frontend
            frontend_config: {
                delay_entre_preguntas_ms: delaySabi,
                mostrar_pensando: true,
                animacion_pensando: 'img/sabi/sabi_pensando.png',
                animacion_acierta: 'img/sabi/sabi_celebrando.png',
                animacion_falla: 'img/sabi/sabi_confundido.png'
            },
            nota: 'IA no conectada todavía. Configura SABI_IA_WEBHOOK_URL en .env para conectar con n8n.'
        });

    } catch (error) {
        console.error('Error en endpoint Sabi IA:', error);
        res.status(500).json({ success: false, error: 'Error interno del servidor' });
    }
});

// GET /api/sabi/config - Obtener configuración de Sabi para el usuario
router.get('/config', authMiddleware, async (req, res) => {
    try {
        const usuarioId = req.usuarioId;

        const [userData] = await pool.query(`
            SELECT 
                u.id,
                (SELECT AVG(p.estrellas) FROM progreso_usuario p WHERE p.usuario_id = u.id AND p.completado = TRUE) as promedio_estrellas,
                (SELECT COUNT(*) FROM progreso_usuario p WHERE p.usuario_id = u.id AND p.completado = TRUE) as niveles_completados
            FROM usuarios u
            WHERE u.id = ?
        `, [usuarioId]);

        if (userData.length === 0) {
            return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
        }

        const user = userData[0];
        const promedioEstrellas = parseFloat(user.promedio_estrellas) || 0;
        const nivelesCompletados = user.niveles_completados || 0;
        const nivelSabi = Math.max(1, Math.floor(nivelesCompletados / 3) + 1);

        let probabilidadAcierto, delayMin, delayMax, personalidad;
        
        if (promedioEstrellas >= 2.5) {
            probabilidadAcierto = 0.9; delayMin = 300; delayMax = 800; personalidad = 'experto';
        } else if (promedioEstrellas >= 1.5) {
            probabilidadAcierto = 0.65; delayMin = 800; delayMax = 1500; personalidad = 'intermedio';
        } else {
            probabilidadAcierto = 0.35; delayMin = 1500; delayMax = 2500; personalidad = 'principiante';
        }

        res.json({
            success: true,
            sabi: {
                nombre: 'Sabi 🤖',
                avatar: 'img/sabi/sabi_competitivo.png',
                nivel: nivelSabi,
                dificultad: {
                    probabilidad_acierto: probabilidadAcierto,
                    delay_min_ms: delayMin,
                    delay_max_ms: delayMax
                },
                personalidad,
                mensaje_intro: personalidad === 'experto' 
                    ? '🤖 "¡Prepárate! No te lo pondré fácil."'
                    : personalidad === 'intermedio'
                        ? '🤖 "Jugaremos una buena partida. ¡Suerte!"'
                        : '🤖 "¡Hola! Juguemos juntos, voy despacito."'
            }
        });

    } catch (error) {
        console.error('Error obteniendo config de Sabi:', error);
        res.status(500).json({ success: false, error: 'Error interno del servidor' });
    }
});

module.exports = router;