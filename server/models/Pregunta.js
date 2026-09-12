const { pool } = require('../config/database');

class Pregunta {
    static async getByNivel(nivelId) {
        const [preguntas] = await pool.query(
            `SELECT p.*, 
                    JSON_EXTRACT(p.texto, '$.es') as texto_es
             FROM preguntas p
             WHERE p.nivel_id = ?
             ORDER BY p.orden`,
            [nivelId]
        );
        
        for (const pregunta of preguntas) {
            const [opciones] = await pool.query(
                `SELECT o.id, JSON_EXTRACT(o.texto, '$.es') as texto, 
                        o.es_correcta, o.orden
                 FROM opciones o
                 WHERE o.pregunta_id = ?
                 ORDER BY o.orden`,
                [pregunta.id]
            );
            pregunta.opciones = opciones;
        }
        
        return preguntas;
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
        
        for (const pregunta of preguntas) {
            const [opciones] = await pool.query(
                `SELECT o.id, JSON_EXTRACT(o.texto, '$.es') as texto, 
                        o.es_correcta, o.orden
                 FROM opciones o
                 WHERE o.pregunta_id = ?
                 ORDER BY o.orden`,
                [pregunta.id]
            );
            pregunta.opciones = opciones;
        }
        
        return preguntas;
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