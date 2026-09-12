const { pool } = require('../config/database');
const bcrypt = require('bcrypt');

class Usuario {
    // ============================================
    // CRUD BÁSICO
    // ============================================

    static async create(username, email, password) {
        const passwordHash = await bcrypt.hash(password, 10);
        const id = require('crypto').randomUUID();
        
        await pool.query(
            `INSERT INTO usuarios (id, username, email, password_hash, password_changed_at, rol) 
             VALUES (?, ?, ?, ?, NOW(), 'usuario')`,
            [id, username, email, passwordHash]
        );

        // Guardar la contraseña en el historial
        await this.savePasswordHistory(id, passwordHash);

        return id;
    }

    static async findByEmail(email) {
        const [rows] = await pool.query(
            'SELECT * FROM usuarios WHERE email = ?',
            [email]
        );
        return rows[0] || null;
    }

    static async findById(id) {
    const [rows] = await pool.query(
        `SELECT id, username, email, avatar_url, rol, pvpXp, password_changed_at,
                partidas_jugadas, partidas_ganadas, racha_actual, mejor_racha, 
                fecha_registro, ultima_conexion 
         FROM usuarios WHERE id = ?`,
        [id]
    );
    return rows[0] || null;
}

    static async verifyPassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }

    static async updateLastLogin(id) {
        await pool.query(
            'UPDATE usuarios SET ultima_conexion = NOW() WHERE id = ?',
            [id]
        );
    }

    static async updateStats(id, partidasJugadas, partidasGanadas) {
        await pool.query(
            `UPDATE usuarios 
             SET partidas_jugadas = partidas_jugadas + ?,
                 partidas_ganadas = partidas_ganadas + ?
             WHERE id = ?`,
            [partidasJugadas, partidasGanadas, id]
        );
    }

    // ============================================
    // HISTORIAL DE CONTRASEÑAS
    // ============================================

    static async savePasswordHistory(usuarioId, passwordHash) {
        try {
            await pool.query(
                `INSERT INTO password_history (usuario_id, password_hash) 
                 VALUES (?, ?)`,
                [usuarioId, passwordHash]
            );
        } catch (error) {
            console.error('Error guardando historial de contraseña:', error);
        }
    }

    // Verificar si una contraseña ya fue usada anteriormente (opcional)
    static async wasPasswordUsed(usuarioId, newPasswordHash) {
        try {
            const [rows] = await pool.query(
                `SELECT COUNT(*) as total 
                 FROM password_history 
                 WHERE usuario_id = ? AND password_hash = ?`,
                [usuarioId, newPasswordHash]
            );
            return rows[0]?.total > 0;
        } catch (error) {
            console.error('Error verificando historial de contraseñas:', error);
            return false;
        }
    }

    // Cambiar contraseña (guardando historial)
    static async changePassword(usuarioId, newPassword) {
        const newPasswordHash = await bcrypt.hash(newPassword, 10);
        
        await pool.query(
            `UPDATE usuarios 
             SET password_hash = ?, password_changed_at = NOW() 
             WHERE id = ?`,
            [newPasswordHash, usuarioId]
        );

        await this.savePasswordHistory(usuarioId, newPasswordHash);
        return true;
    }

    // Obtener fecha del último cambio de contraseña
    static async getLastPasswordChange(usuarioId) {
        try {
            const [rows] = await pool.query(
                'SELECT password_changed_at FROM usuarios WHERE id = ?',
                [usuarioId]
            );
            return rows[0]?.password_changed_at || null;
        } catch (error) {
            console.error('Error obteniendo último cambio de contraseña:', error);
            return null;
        }
    }

    // ============================================
    // INTENTOS DE LOGIN
    // ============================================

    static async registrarIntento(email, exito, usuarioId = null, ip = null, userAgent = null) {
        try {
            await pool.query(
                `INSERT INTO login_attempts (usuario_id, email, ip_address, user_agent, exito, fecha_intento)
                 VALUES (?, ?, ?, ?, ?, NOW())`,
                [usuarioId, email, ip || '0.0.0.0', userAgent || 'Desconocido', exito]
            );
        } catch (error) {
            console.error('Error registrando intento de login:', error);
        }
    }

    static async getIntentosFallidos(email, ip) {
        try {
            const [rows] = await pool.query(
                `SELECT COUNT(*) as total 
                 FROM login_attempts 
                 WHERE (email = ? OR ip_address = ?) 
                   AND exito = FALSE 
                   AND fecha_intento > DATE_SUB(NOW(), INTERVAL 15 MINUTE)`,
                [email, ip]
            );
            return rows[0]?.total || 0;
        } catch (error) {
            console.error('Error obteniendo intentos fallidos:', error);
            return 0;
        }
    }

    static async getUltimoLoginExitoso(usuarioId) {
        try {
            const [rows] = await pool.query(
                `SELECT fecha_intento 
                 FROM login_attempts 
                 WHERE usuario_id = ? AND exito = TRUE 
                 ORDER BY fecha_intento DESC 
                 LIMIT 1`,
                [usuarioId]
            );
            return rows[0]?.fecha_intento || null;
        } catch (error) {
            console.error('Error obteniendo último login:', error);
            return null;
        }
    }

    // ============================================
    // ADMIN (para verificar rol)
    // ============================================

    static async isAdmin(id) {
        const [rows] = await pool.query(
            'SELECT rol FROM usuarios WHERE id = ?',
            [id]
        );
        return rows.length > 0 && rows[0].rol === 'admin';
    }
}

module.exports = Usuario;