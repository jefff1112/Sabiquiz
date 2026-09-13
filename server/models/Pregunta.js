const { pool } = require('../config/database');

class Pregunta {
    static async adjuntarOpciones(preguntas) {
        if (preguntas.length === 0) return preguntas;
        const ids = preguntas.map(p => p.id);
        const [opciones] = await pool.query(
            `SELECT o.id, o.pregunta_id, JSON_EXTRACT(o.texto, '$.es') as texto, 
                    o.es_correcta, o.orden
             FROM opciones o
             WHERE o.pregunta_id IN (?)
             ORDER BY o.pregunta_id, o.orden`,
            [ids]
        );
        const mapa = {};
        for (const o of opciones) {
            if (!mapa[o.pregunta_id]) mapa[o.pregunta_id] = [];
            mapa[o.pregunta_id].push(o);
        }
        for (const pregunta of preguntas) {
            pregunta.opciones = mapa[pregunta.id] || [];
        }
        return preguntas;
    }

    static async getByNivel(nivelId) {
        const [preguntas] = await pool.query(
            `SELECT p.*, 
                    JSON_EXTRACT(p.texto, '$.es') as texto_es
             FROM preguntas p
             WHERE p.nivel_id = ?
             ORDER BY p.orden`,
            [nivelId]
        );

        return await Pregunta.adjuntarOpciones(preguntas);
    }

    static async getRandomQuestions(materiaId, cantidad = 10, dificultad = null) {
        let query = `
            SELECT p.*, JSON_EXTRACT(p.texto, '$.es') as texto_es
            FROM preguntas p
            JOIN niveles n ON p.nivel_id = n.id
            WHERE n.materia_id = ?
        `;
        const params = [materiaId];
        
        if (dificultad) {
            query += ' AND p.dificultad = ?';
            params.push(dificultad);
        }
        
        query += ` ORDER BY RAND() LIMIT ?`;
        params.push(cantidad);
        
        const [preguntas] = await pool.query(query, params);

        return await Pregunta.adjuntarOpciones(preguntas);
    }

    static async countByMateria(materiaId) {
        const [rows] = await pool.query(
            `SELECT COUNT(*) as total
             FROM preguntas p
             JOIN niveles n ON p.nivel_id = n.id
             WHERE n.materia_id = ?`,
            [materiaId]
        );
        return rows[0].total;
    }
}

module.exports = Pregunta;