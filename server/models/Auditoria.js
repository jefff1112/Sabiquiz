// ============================================
// MODELO DE AUDITORÍA
// ============================================
// Escribe en la tabla `logs_auditoria`, que existía desde el diseño original
// pero NUNCA se usaba (0 filas). Registra los eventos sensibles.
const { pool } = require('../config/database');

class Auditoria {
    static async registrar({ usuarioId = null, evento, descripcion = null, ip = null, userAgent = null }) {
        try {
            await pool.query(
                `INSERT INTO logs_auditoria (usuario_id, evento, descripcion, ip_address, user_agent)
                 VALUES (?, ?, ?, ?, ?)`,
                [usuarioId, String(evento).slice(0, 50), descripcion, ip, userAgent]
            );
        } catch (error) {
            // La auditoría nunca debe tumbar la petición del usuario
            console.error('⚠️ No se pudo escribir la auditoría:', error.message);
        }
    }

    static async listar({ limite = 100, evento = null } = {}) {
        const params = [];
        let sql = 'SELECT * FROM logs_auditoria';
        if (evento) { sql += ' WHERE evento = ?'; params.push(evento); }
        sql += ' ORDER BY id DESC LIMIT ?';
        params.push(limite);
        const [rows] = await pool.query(sql, params);
        return rows;
    }
}

module.exports = Auditoria;
