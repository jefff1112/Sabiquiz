// ============================================
// UTILIDADES COMPARTIDAS DE TORNEOS
// ============================================
const { pool } = require('../config/database');
const { sendNotification } = require('./notifications');
const { sendTournamentWinnerEmail } = require('../config/email-torneos');

async function updateTournamentStates() {
    try {
        const now = new Date();
        
        // Cambiar a 'inscripcion_abierta' si falta 1 hora
        await pool.query(`
            UPDATE torneos 
            SET estado = 'inscripcion_abierta' 
            WHERE estado = 'proximo' 
            AND fecha_inicio <= DATE_ADD(?, INTERVAL 1 HOUR)
            AND fecha_inicio > ?
        `, [now, now]);

        // Cambiar a 'en_curso' si es la hora de inicio
        await pool.query(`
            UPDATE torneos 
            SET estado = 'en_curso' 
            WHERE estado = 'inscripcion_abierta' 
            AND fecha_inicio <= ?
        `, [now]);

        // Cambiar a 'finalizado' si pasó el tiempo
        await pool.query(`
            UPDATE torneos 
            SET estado = 'finalizado' 
            WHERE estado = 'en_curso' 
            AND fecha_fin <= ?
        `, [now]);

        // Para torneos finalizados sin ranking, calcular ranking
        const [torneosFinalizados] = await pool.query(`
            SELECT t.id FROM torneos t
            LEFT JOIN ranking_torneo rt ON t.id = rt.torneo_id
            WHERE t.estado = 'finalizado' AND rt.id IS NULL
        `);

        for (const t of torneosFinalizados) {
            await calcularRankingTorneo(t.id);
        }

    } catch (error) {
        console.error('Error actualizando estados de torneos:', error);
    }
}

async function calcularRankingTorneo(torneoId) {
    try {
        // Obtener inscripciones ordenadas por puntaje
        const [inscripciones] = await pool.query(`
            SELECT it.usuario_id, it.puntaje, u.username, u.email
            FROM inscripciones_torneo it
            JOIN usuarios u ON it.usuario_id = u.id
            WHERE it.torneo_id = ?
            ORDER BY it.puntaje DESC, it.fecha_inscripcion ASC
        `, [torneoId]);

        if (inscripciones.length === 0) return;

        let connection = await pool.getConnection();
        await connection.beginTransaction();

        try {
            // Insertar ranking
            for (let i = 0; i < inscripciones.length; i++) {
                const ins = inscripciones[i];
                await connection.query(`
                    INSERT INTO ranking_torneo (torneo_id, usuario_id, posicion, puntaje_final)
                    VALUES (?, ?, ?, ?)
                `, [torneoId, ins.usuario_id, i + 1, ins.puntaje]);
            }

            // El ganador (posición 1) recibe premios
            if (inscripciones.length > 0) {
                const ganador = inscripciones[0];
                
                // +200 XP
                await connection.query(`
                    UPDATE usuarios SET pvpXp = pvpXp + 200 WHERE id = ?
                `, [ganador.usuario_id]);

                // Logro "Campeón de Torneo" (id 100)
                await connection.query(`
                    INSERT IGNORE INTO usuario_logros (usuario_id, logro_id)
                    VALUES (?, 100)
                `, [ganador.usuario_id]);

                // Notificación y correo al ganador
                try {
                    await sendNotification(ganador.usuario_id, 'torneo_ganado', {
                        torneo_id: torneoId,
                        mensaje: `🏆 ¡Felicidades! Has ganado el torneo y recibido 200 XP + logro "Campeón de Torneo"`
                    });
                } catch (e) { console.log('No se pudo enviar notificación'); }

                // Email al ganador
                try {
                    const [torneoInfo] = await connection.query('SELECT * FROM torneos WHERE id = ?', [torneoId]);
                    if (ganador.email && torneoInfo[0]) {
                        await sendTournamentWinnerEmail(ganador.email, ganador.username, torneoInfo[0]);
                    }
                } catch (e) { console.log('No se pudo enviar email de ganador'); }
            }

            await connection.commit();
            console.log(`✅ Ranking calculado para torneo ${torneoId}`);
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('Error calculando ranking:', error);
    }
}

module.exports = { updateTournamentStates, calcularRankingTorneo };