const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const { pool } = require('../config/database');

// ============================================
// GET /api/profile/stats-avanzadas
// ============================================
router.get('/stats-avanzadas', authMiddleware, async (req, res) => {
    try {
        const usuarioId = req.usuarioId;
        const hoy = new Date();
        const hace7Dias = new Date(hoy);
        hace7Dias.setDate(hoy.getDate() - 6); // Incluye hoy = 7 días
        hace7Dias.setHours(0, 0, 0, 0);

        // 1. PROGRESO SEMANAL (últimos 7 días)
        let semanal = [];
        try {
            [semanal] = await pool.query(`
                SELECT 
                    DATE(ad.fecha) as fecha,
                    COALESCE(SUM(ad.niveles_completados), 0) as niveles_completados
                FROM actividad_diaria ad
                WHERE ad.usuario_id = ? AND ad.fecha >= ?
                GROUP BY DATE(ad.fecha)
                ORDER BY ad.fecha ASC
            `, [usuarioId, hace7Dias]);
        } catch (e) { console.error('Error stats semanal:', e.message); }

        // Completar días faltantes con 0
        const progresoSemanal = [];
        for (let i = 0; i < 7; i++) {
            const fecha = new Date(hace7Dias);
            fecha.setDate(hace7Dias.getDate() + i);
            const fechaStr = fecha.toISOString().split('T')[0];
            const encontrado = semanal.find(s => s.fecha === fechaStr);
            progresoSemanal.push({
                fecha: fechaStr,
                dia: fecha.toLocaleDateString('es-ES', { weekday: 'short' }),
                niveles_completados: encontrado ? parseInt(encontrado.niveles_completados) : 0
            });
        }

        // 2. MATERIA MÁS FUERTE Y MÁS DÉBIL
        let materiaMasFuerte = null;
        let materiaMasDebil = null;
        try {
            const [materiasStats] = await pool.query(`
                SELECT 
                    m.id,
                    m.nombre,
                    m.icono_url as icono,
                    AVG(p.estrellas) as promedio_estrellas,
                    COUNT(DISTINCT p.nivel_id) as niveles_jugados
                FROM progreso_usuario p
                JOIN niveles n ON p.nivel_id = n.id
                JOIN materias m ON n.materia_id = m.id
                WHERE p.usuario_id = ? AND p.completado = TRUE
                GROUP BY m.id, m.nombre, m.icono_url
                HAVING niveles_jugados >= 2
                ORDER BY promedio_estrellas DESC
            `, [usuarioId]);
            
            if (materiasStats.length > 0) {
                materiaMasFuerte = {
                    id: materiasStats[0].id,
                    nombre: materiasStats[0].nombre,
                    icono: materiasStats[0].icono,
                    promedio_estrellas: parseFloat(materiasStats[0].promedio_estrellas).toFixed(1)
                };
                
                if (materiasStats.length > 1) {
                    const ultima = materiasStats[materiasStats.length - 1];
                    materiaMasDebil = {
                        id: ultima.id,
                        nombre: ultima.nombre,
                        icono: ultima.icono,
                        promedio_estrellas: parseFloat(ultima.promedio_estrellas).toFixed(1)
                    };
                }
            }
        } catch (e) { console.error('Error stats materias:', e.message); }

        // 3. TIEMPO PROMEDIO POR PREGUNTA
        let tiempoPromedioSegundos = '0.0';
        try {
            const [tiempoStats] = await pool.query(`
                SELECT AVG(dp.tiempo_respuesta) as tiempo_promedio
                FROM detalles_partida dp
                JOIN partidas p ON dp.partida_id = p.id
                WHERE dp.usuario_id = ? AND dp.tiempo_respuesta IS NOT NULL
            `, [usuarioId]);
            tiempoPromedioSegundos = tiempoStats[0]?.tiempo_promedio ? parseFloat(tiempoStats[0].tiempo_promedio).toFixed(1) : '0.0';
        } catch (e) { console.error('Error stats tiempo:', e.message); }

        // 4. RACHA MÁXIMA HISTÓRICA
        let rachaMaximaHistorica = 0;
        let racha_actual = 0;
        try {
            const [rachaStats] = await pool.query(`
                SELECT mejor_racha, racha_actual FROM usuarios WHERE id = ?
            `, [usuarioId]);
            rachaMaximaHistorica = rachaStats[0]?.mejor_racha || 0;
            racha_actual = rachaStats[0]?.racha_actual || 0;
        } catch (e) { console.error('Error stats racha:', e.message); }

        // 5. TOP PORCENTAJE POR MATERIA (percentil del usuario vs todos)
        const topPorcentajeMaterias = {};
        try {
            const [percentiles] = await pool.query(`
                SELECT m.nombre, m.id, COUNT(DISTINCT u.id) as total_usuarios
                FROM usuarios u
                JOIN progreso_usuario pu ON u.id = pu.usuario_id
                JOIN niveles n ON pu.nivel_id = n.id
                JOIN materias m ON n.materia_id = m.id
                WHERE pu.completado = TRUE
                GROUP BY m.id, m.nombre
            `);

            for (const mat of percentiles) {
                const [userMateria] = await pool.query(`
                    SELECT AVG(p.estrellas) as user_promedio
                    FROM progreso_usuario p
                    JOIN niveles n ON p.nivel_id = n.id
                    WHERE p.usuario_id = ? AND n.materia_id = ? AND p.completado = TRUE
                `, [usuarioId, mat.id]);

                if (!userMateria[0]?.user_promedio) continue;

                const [ranking] = await pool.query(`
                    SELECT COUNT(*) as mejores_o_iguales
                    FROM (
                        SELECT u2.id, AVG(p2.estrellas) as prom
                        FROM usuarios u2
                        JOIN progreso_usuario p2 ON u2.id = p2.usuario_id
                        JOIN niveles n2 ON p2.nivel_id = n2.id
                        WHERE n2.materia_id = ? AND p2.completado = TRUE
                        GROUP BY u2.id
                        HAVING prom <= ?
                    ) sub
                `, [mat.id, userMateria[0].user_promedio]);

                const totalUsuarios = mat.total_usuarios || 1;
                const mejores = ranking[0]?.mejores_o_iguales || 1;
                const percentil = Math.round((mejores / totalUsuarios) * 100);
                topPorcentajeMaterias[mat.nombre.toLowerCase()] = percentil;
            }
        } catch (e) { console.error('Error stats percentil:', e.message); }

        // 6. PARTIDAS 1VS1 GANADAS
        let pvpStats = [{ partidas_ganadas: 0, partidas_jugadas: 0, pvpXp: 0 }];
        try {
            [pvpStats] = await pool.query(`
                SELECT partidas_ganadas, partidas_jugadas, pvpXp FROM usuarios WHERE id = ?
            `, [usuarioId]);
        } catch (e) { console.error('Error stats pvp:', e.message); }

        // 7. TORNEOS GANADOS
        let torneosGanados = [{ total: 0 }];
        try {
            [torneosGanados] = await pool.query(`
                SELECT COUNT(*) as total FROM ranking_torneo rt
                WHERE rt.usuario_id = ? AND rt.posicion = 1
            `, [usuarioId]);
        } catch (e) { console.error('Error stats torneos ganados:', e.message); }

        // 8. TOTAL DE ESTRELLAS Y NIVELES
        let totales = [{ total_estrellas: 0, niveles_completados: 0 }];
        try {
            [totales] = await pool.query(`
                SELECT SUM(p.estrellas) as total_estrellas, COUNT(DISTINCT p.nivel_id) as niveles_completados
                FROM progreso_usuario p WHERE p.usuario_id = ? AND p.completado = TRUE
            `, [usuarioId]);
        } catch (e) { console.error('Error stats totales:', e.message); }

        // 9. MINIJUEGOS ESTRELLAS
        let minijuegosStats = [{ minijuegos_estrellas: 0, minijuegos_completados: 0 }];
        try {
            [minijuegosStats] = await pool.query(`
                SELECT SUM(estrellas) as minijuegos_estrellas, COUNT(DISTINCT CONCAT(minijuego, '-', nivel)) as minijuegos_completados
                FROM progreso_minijuego WHERE usuario_id = ? AND completado = TRUE
            `, [usuarioId]);
        } catch (e) { console.error('Error stats minijuegos:', e.message); }

        res.json({
            success: true,
            stats: {
                // Gráfica semanal
                progreso_semanal: progresoSemanal,
                
                // Materias fuerte/débil
                materia_mas_fuerte: materiaMasFuerte,
                materia_mas_debil: materiaMasDebil,
                
                // Tiempo promedio
                tiempo_promedio_segundos: tiempoPromedioSegundos,
                
                // Rachas
                racha_maxima_historica: rachaMaximaHistorica,
                racha_actual: racha_actual,
                
                // Percentiles
                top_porcentaje_materias: topPorcentajeMaterias,
                
                // PvP
                total_partidas_1vs1_ganadas: pvpStats[0]?.partidas_ganadas || 0,
                total_partidas_1vs1_jugadas: pvpStats[0]?.partidas_jugadas || 0,
                pvpXp: pvpStats[0]?.pvpXp || 0,
                
                // Torneos
                torneos_ganados: torneosGanados[0]?.total || 0,
                
                // Totales
                total_estrellas: (totales[0]?.total_estrellas || 0) + (minijuegosStats[0]?.minijuegos_estrellas || 0),
                quiz_estrellas: totales[0]?.total_estrellas || 0,
                minijuegos_estrellas: minijuegosStats[0]?.minijuegos_estrellas || 0,
                niveles_completados: totales[0]?.niveles_completados || 0,
                minijuegos_completados: minijuegosStats[0]?.minijuegos_completados || 0
            }
        });
    } catch (error) {
        console.error('Error obteniendo estadísticas avanzadas:', error);
        res.status(500).json({ success: false, error: 'Error al cargar estadísticas avanzadas' });
    }
});

// ============================================
// ACTUALIZAR ACTIVIDAD DIARIA (se llama desde quiz/submit)
// ============================================
router.post('/actualizar-actividad', authMiddleware, async (req, res) => {
    try {
        const usuarioId = req.usuarioId;
        const { niveles_completados = 0, preguntas_correctas = 0, preguntas_totales = 0, tiempo_segundos = 0, racha_dia = 0 } = req.body;
        const hoy = new Date().toISOString().split('T')[0];

        await pool.query(`
            INSERT INTO actividad_diaria (usuario_id, fecha, niveles_completados, preguntas_correctas, preguntas_totales, tiempo_total_segundos, racha_maxima_dia)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
            niveles_completados = niveles_completados + VALUES(niveles_completados),
            preguntas_correctas = preguntas_correctas + VALUES(preguntas_correctas),
            preguntas_totales = preguntas_totales + VALUES(preguntas_totales),
            tiempo_total_segundos = tiempo_total_segundos + VALUES(tiempo_total_segundos),
            racha_maxima_dia = GREATEST(racha_maxima_dia, VALUES(racha_maxima_dia))
        `, [usuarioId, hoy, niveles_completados, preguntas_correctas, preguntas_totales, tiempo_segundos, racha_dia]);

        // Actualizar racha en usuarios si corresponde
        if (racha_dia > 0) {
            await pool.query(`
                UPDATE usuarios 
                SET racha_actual = racha_actual + ?,
                    mejor_racha = GREATEST(mejor_racha, racha_actual + ?)
                WHERE id = ?
            `, [racha_dia, racha_dia, usuarioId]);
        }

        res.json({ success: true });
    } catch (error) {
        console.error('Error actualizando actividad diaria:', error);
        res.status(500).json({ success: false, error: 'Error al actualizar actividad' });
    }
});

module.exports = router;