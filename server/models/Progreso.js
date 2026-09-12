const { pool } = require('../config/database');

class Progreso {
    static async getProgresoByMateria(usuarioId, materiaId) {
        const [rows] = await pool.query(
            `SELECT p.*, n.numero, n.titulo, m.nombre as materia_nombre
             FROM progreso_usuario p
             JOIN niveles n ON p.nivel_id = n.id
             JOIN materias m ON n.materia_id = m.id
             WHERE p.usuario_id = ? AND m.id = ?
             ORDER BY n.numero`,
            [usuarioId, materiaId]
        );
        return rows;
    }

    static async getAllProgreso(usuarioId) {
        const [rows] = await pool.query(
            `SELECT p.*, n.numero, n.titulo, m.nombre as materia_nombre
             FROM progreso_usuario p
             JOIN niveles n ON p.nivel_id = n.id
             JOIN materias m ON n.materia_id = m.id
             WHERE p.usuario_id = ?
             ORDER BY m.orden, n.numero`,
            [usuarioId]
        );
        return rows;
    }

    static async updateProgress(usuarioId, nivelId, score, stars, completado) {
        await pool.query(
            `INSERT INTO progreso_usuario 
             (usuario_id, nivel_id, puntaje, estrellas, completado, fecha_completado)
             VALUES (?, ?, ?, ?, ?, NOW())
             ON DUPLICATE KEY UPDATE
             puntaje = VALUES(puntaje),
             estrellas = VALUES(estrellas),
             completado = VALUES(completado),
             fecha_completado = NOW()`,
            [usuarioId, nivelId, score, stars, completado]
        );
    }

    static async getNivelesDesbloqueados(usuarioId) {
        const [rows] = await pool.query(
            `SELECT DISTINCT n.materia_id, COUNT(*) as niveles_completados
             FROM progreso_usuario p
             JOIN niveles n ON p.nivel_id = n.id
             WHERE p.usuario_id = ? AND p.completado = TRUE
             GROUP BY n.materia_id`,
            [usuarioId]
        );
        return rows;
    }
}

module.exports = Progreso;