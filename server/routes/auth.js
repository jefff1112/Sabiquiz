const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const Auditoria = require('../models/Auditoria');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const { pool } = require('../config/database');

// ============================================
// VALIDACIÓN Y UTILIDADES
// ============================================
const MAX_INTENTOS = 8;                       // intentos fallidos por email en 15 min
const VENTANA_BLOQUEO_MIN = 15;
const MIN_PASSWORD = 8;

const RE_USERNAME = /^[A-Za-z0-9ÁÉÍÓÚÜÑáéíóúüñ _.-]{3,20}$/;
const RE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function normalizarUsername(v) {
    return String(v || '').trim().replace(/\s+/g, ' ');
}
function normalizarEmail(v) {
    return String(v || '').trim().toLowerCase();
}
function validarUsername(v) {
    if (!v) return 'El nombre de usuario es obligatorio';
    if (!RE_USERNAME.test(v)) return 'El nombre debe tener entre 3 y 20 caracteres (letras, números, espacios, . _ -)';
    return null;
}
function validarEmail(v) {
    if (!v) return 'El correo es obligatorio';
    if (v.length > 100 || !RE_EMAIL.test(v)) return 'El correo no tiene un formato válido';
    return null;
}
function validarPassword(v) {
    if (!v) return 'La contraseña es obligatoria';
    if (v.length < MIN_PASSWORD) return `La contraseña debe tener al menos ${MIN_PASSWORD} caracteres`;
    if (v.length > 72) return 'La contraseña no puede superar 72 caracteres';
    if (!/[A-Za-z]/.test(v) || !/[0-9]/.test(v)) return 'La contraseña debe incluir al menos una letra y un número';
    return null;
}
function ipDe(req) {
    return req.ip || req.connection?.remoteAddress || null;
}
function uaDe(req) {
    return (req.headers['user-agent'] || 'Desconocido').slice(0, 500);
}
// Una sola fórmula de nivel en todo el sistema
function calcularNivel(totalXp) {
    return Math.floor((Number(totalXp) || 0) / 100) + 1;
}
// Base segura para los enlaces de correo (evita Host header injection)
const ORIGENES_PERMITIDOS = (process.env.CORS_ORIGINS ||
    'http://localhost:3000,http://127.0.0.1:3000,http://127.0.0.1:5500')
    .split(',').map(o => o.trim()).filter(Boolean);

function urlBase(req) {
    if (process.env.APP_URL) return process.env.APP_URL.replace(/\/+$/, '');
    const host = String(req.get('host') || '').toLowerCase();
    const coincide = ORIGENES_PERMITIDOS.find(o => {
        try { return new URL(o).host.toLowerCase() === host; } catch { return false; }
    });
    return (coincide || ORIGENES_PERMITIDOS[0] || 'http://localhost:3000').replace(/\/+$/, '');
}

function firmarToken(usuarioId) {
    return jwt.sign({ id: usuarioId }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

// ============================================
// RUTA: REGISTRO
// ============================================
router.post('/register', async (req, res) => {
    const username = normalizarUsername(req.body.username);
    const email = normalizarEmail(req.body.email);
    const password = String(req.body.password || '');

    // Validación en servidor (antes no existía ninguna)
    const error = validarUsername(username) || validarEmail(email) || validarPassword(password);
    if (error) {
        return res.status(400).json({ success: false, error });
    }

    try {
        if (await Usuario.findByEmail(email)) {
            return res.status(400).json({ success: false, error: 'El email ya está registrado' });
        }
        if (await Usuario.findByUsername(username)) {
            return res.status(400).json({ success: false, error: 'Ese nombre de usuario ya está en uso' });
        }

        const userId = await Usuario.create(username, email, password);
        const token = firmarToken(userId);

        await Auditoria.registrar({
            usuarioId: userId, evento: 'registro',
            descripcion: `Nueva cuenta: ${username}`, ip: ipDe(req), userAgent: uaDe(req)
        });

        res.status(201).json({
            success: true,
            token,
            user: { id: userId, username, email, rol: 'usuario', level: 1 }
        });
    } catch (error) {
        console.error('Error en registro:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ success: false, error: 'Ese nombre de usuario o correo ya está en uso' });
        }
        res.status(500).json({ success: false, error: 'Error al registrar usuario' });
    }
});

// ============================================
// RUTA: LOGIN
// ============================================
router.post('/login', async (req, res) => {
    const email = normalizarEmail(req.body.email);
    const password = String(req.body.password || '');
    const ip = ipDe(req);
    const userAgent = uaDe(req);

    if (!email || !password) {
        return res.status(400).json({ success: false, error: 'Correo y contraseña son obligatorios' });
    }

    try {
        // Bloqueo por intentos fallidos: SOLO por email (no por IP) y sin
        // excepción para administradores.
        const intentosFallidos = await Usuario.getIntentosFallidos(email);
        if (intentosFallidos >= MAX_INTENTOS) {
            await Auditoria.registrar({
                evento: 'login_bloqueado',
                descripcion: `Bloqueo por ${intentosFallidos} intentos fallidos (${email})`,
                ip, userAgent
            });
            return res.status(429).json({
                success: false,
                tipo: 'bloqueo',
                error: `⛔ Demasiados intentos fallidos. Espera ${VENTANA_BLOQUEO_MIN} minutos.`,
                intentos: intentosFallidos,
                maxIntentos: MAX_INTENTOS
            });
        }

        const user = await Usuario.findByEmail(email);

        // Mismo mensaje y mismo `tipo` exista o no la cuenta: así no se puede
        // enumerar qué correos están registrados.
        const RESPUESTA_GENERICA = '❌ Correo o contraseña incorrectos.';
        const valido = user ? await Usuario.verifyPassword(password, user.password_hash) : false;

        if (!user || !valido) {
            await Usuario.registrarIntento(email, false, user ? user.id : null, ip, userAgent);
            const total = await Usuario.getIntentosFallidos(email);
            await Auditoria.registrar({
                usuarioId: user ? user.id : null, evento: 'login_fallido',
                descripcion: user ? `Contraseña incorrecta (${email})` : `Cuenta inexistente (${email})`,
                ip, userAgent
            });
            return res.status(401).json({
                success: false,
                tipo: 'credenciales',
                error: RESPUESTA_GENERICA,
                intentos: total,
                maxIntentos: MAX_INTENTOS
            });
        }

        // ✅ LOGIN CORRECTO
        await Usuario.registrarIntento(email, true, user.id, ip, userAgent);
        await Usuario.limpiarIntentosFallidos(email);
        await Usuario.updateLastLogin(user.id);

        const ultimoLogin = await Usuario.getUltimoLoginExitoso(user.id);
        const token = firmarToken(user.id);

        await Auditoria.registrar({
            usuarioId: user.id, evento: 'login_ok',
            descripcion: `Inicio de sesión correcto (${email})`, ip, userAgent
        });

        res.json({
            success: true,
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                avatar: user.avatar_url,
                rol: user.rol || 'usuario',
                ultimoLogin,
                lastPasswordChange: user.password_changed_at,
                stats: {
                    partidasJugadas: user.partidas_jugadas,
                    partidasGanadas: user.partidas_ganadas,
                    rachaActual: user.racha_actual,
                    mejorRacha: user.mejor_racha
                }
            }
        });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ success: false, error: 'Error al iniciar sesión' });
    }
});

// ============================================
// RUTA: VERIFICAR INTENTOS FALLIDOS
// ============================================
router.post('/check-attempts', async (req, res) => {
    try {
        const email = normalizarEmail(req.body.email);
        const intentos = await Usuario.getIntentosFallidos(email);
        res.json({
            success: true,
            intentos,
            maxIntentos: MAX_INTENTOS,
            bloqueado: intentos >= MAX_INTENTOS
        });
    } catch (error) {
        console.error('Error verificando intentos:', error);
        res.status(500).json({ success: false, error: 'Error al verificar intentos' });
    }
});

// ============================================
// RUTA: PERFIL
// ============================================
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await Usuario.findById(req.usuarioId);
        if (!user) return res.status(404).json({ success: false, error: 'Usuario no encontrado' });

        // Nivel real calculado en el servidor (antes devolvía siempre 1 porque
        // se leía `user.level`, una columna que no existe)
        const [[xp]] = await pool.query(
            `SELECT COALESCE(SUM(estrellas * 10), 0) AS quizXp FROM progreso_usuario
             WHERE usuario_id = ? AND completado = TRUE`, [req.usuarioId]);
        const totalXp = Number(xp.quizXp) + Number(user.pvpXp || 0);

        res.json({
            success: true,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                avatar: user.avatar_url,
                rol: user.rol || 'usuario',
                partidas_jugadas: user.partidas_jugadas || 0,
                partidas_ganadas: user.partidas_ganadas || 0,
                pvpXp: user.pvpXp || 0,
                quizXp: Number(xp.quizXp),
                totalXp,
                level: calcularNivel(totalXp),
                lastPasswordChange: user.password_changed_at
            }
        });
    } catch (error) {
        console.error('Error al obtener perfil:', error);
        res.status(500).json({ success: false, error: 'Error al obtener perfil' });
    }
});

// ============================================
// RUTA: ACTUALIZAR PERFIL
// ============================================
router.put('/profile', authMiddleware, async (req, res) => {
    try {
        const userId = req.usuarioId;
        const updates = [];
        const values = [];

        if (req.body.username !== undefined) {
            const username = normalizarUsername(req.body.username);
            const err = validarUsername(username);
            if (err) return res.status(400).json({ success: false, error: err });
            const existente = await Usuario.findByUsername(username);
            if (existente && existente.id !== userId) {
                return res.status(400).json({ success: false, error: 'Ese nombre de usuario ya está en uso' });
            }
            updates.push('username = ?');
            values.push(username);
        }

        if (req.body.avatar !== undefined) {
            const avatar = req.body.avatar;
            // Solo se acepta una URL http(s) o una imagen en base64 acotada
            const esBase64 = typeof avatar === 'string' && /^data:image\/(png|jpe?g|webp);base64,/.test(avatar);
            const esUrl = typeof avatar === 'string' && /^https?:\/\//i.test(avatar);
            if (avatar !== null && avatar !== '' && !esBase64 && !esUrl) {
                return res.status(400).json({ success: false, error: 'Formato de avatar no permitido' });
            }
            if (esBase64 && avatar.length > 400000) {
                return res.status(400).json({ success: false, error: 'La imagen es demasiado grande (máx. ~300 KB)' });
            }
            updates.push('avatar_url = ?');
            values.push(avatar);
        }

        if (updates.length === 0) {
            return res.status(400).json({ success: false, error: 'No hay datos para actualizar' });
        }

        values.push(userId);
        await pool.query(`UPDATE usuarios SET ${updates.join(', ')} WHERE id = ?`, values);

        await Auditoria.registrar({
            usuarioId: userId, evento: 'perfil_actualizado',
            descripcion: `Campos: ${updates.map(u => u.split(' ')[0]).join(', ')}`,
            ip: ipDe(req), userAgent: uaDe(req)
        });

        const user = await Usuario.findById(userId);
        res.json({ success: true, message: 'Perfil actualizado correctamente', user });
    } catch (error) {
        console.error('Error actualizando perfil:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ success: false, error: 'Ese nombre de usuario ya está en uso' });
        }
        res.status(500).json({ success: false, error: 'Error al actualizar perfil' });
    }
});

// ============================================
// RUTA: CAMBIAR CONTRASEÑA (con sesión iniciada)
// ============================================
// No existía: la única forma de cambiar la contraseña era el enlace por email.
router.post('/change-password', authMiddleware, async (req, res) => {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const userId = req.usuarioId;

    if (!currentPassword || !newPassword || !confirmPassword) {
        return res.status(400).json({ success: false, error: 'Todos los campos son obligatorios' });
    }
    if (newPassword !== confirmPassword) {
        return res.status(400).json({ success: false, error: 'Las contraseñas no coinciden' });
    }
    const errPass = validarPassword(newPassword);
    if (errPass) return res.status(400).json({ success: false, error: errPass });

    try {
        const [rows] = await pool.query('SELECT password_hash FROM usuarios WHERE id = ?', [userId]);
        if (!rows.length) return res.status(404).json({ success: false, error: 'Usuario no encontrado' });

        const ok = await Usuario.verifyPassword(currentPassword, rows[0].password_hash);
        if (!ok) {
            await Auditoria.registrar({
                usuarioId: userId, evento: 'password_incorrecta_cambio',
                descripcion: 'Intento de cambio con contraseña actual incorrecta',
                ip: ipDe(req), userAgent: uaDe(req)
            });
            return res.status(401).json({ success: false, error: 'La contraseña actual no es correcta' });
        }
        if (await Usuario.wasPasswordUsed(userId, newPassword)) {
            return res.status(400).json({ success: false, error: 'No puedes reutilizar una contraseña anterior' });
        }

        await Usuario.changePassword(userId, newPassword);
        await Auditoria.registrar({
            usuarioId: userId, evento: 'password_cambiada',
            descripcion: 'Contraseña cambiada desde el perfil',
            ip: ipDe(req), userAgent: uaDe(req)
        });
        res.json({ success: true, message: 'Contraseña actualizada correctamente' });
    } catch (error) {
        console.error('Error cambiando contraseña:', error);
        res.status(500).json({ success: false, error: 'Error al cambiar la contraseña' });
    }
});

// ============================================
// RUTA: ADMIN - VERIFICAR SI ES ADMIN
// ============================================
router.get('/isAdmin', authMiddleware, async (req, res) => {
    try {
        res.json({ success: true, isAdmin: await Usuario.isAdmin(req.usuarioId) });
    } catch (error) {
        console.error('Error verificando admin:', error);
        res.status(500).json({ success: false, error: 'Error al verificar permisos' });
    }
});

// ============================================
// RUTA: AUDITORÍA (solo admin)
// ============================================
router.get('/auditoria', adminMiddleware, async (req, res) => {
    try {
        const limite = Math.min(500, Math.max(1, parseInt(req.query.limite) || 100));
        res.json({ success: true, logs: await Auditoria.listar({ limite }) });
    } catch (error) {
        console.error('Error leyendo auditoría:', error);
        res.status(500).json({ success: false, error: 'Error al leer la auditoría' });
    }
});

// ============================================
// RANKING (una sola consulta, sin subconsultas duplicadas)
// ============================================
async function obtenerRanking(limite = null) {
    let sql = `
        SELECT
            u.id,
            u.username,
            u.avatar_url,
            u.partidas_jugadas,
            u.partidas_ganadas,
            u.rol,
            u.pvpXp,
            COALESCE(SUM(CASE WHEN p.completado = TRUE THEN p.estrellas * 10 ELSE 0 END), 0) AS quizXp
        FROM usuarios u
        LEFT JOIN progreso_usuario p ON p.usuario_id = u.id
        GROUP BY u.id, u.username, u.avatar_url, u.partidas_jugadas, u.partidas_ganadas, u.rol, u.pvpXp
        ORDER BY quizXp DESC, u.username ASC`;
    const params = [];
    if (limite) { sql += ' LIMIT ?'; params.push(limite); }

    const [users] = await pool.query(sql, params);
    return users.map(u => {
        const quizXp = Number(u.quizXp) || 0;
        const pvpXp = Number(u.pvpXp) || 0;
        const totalXp = quizXp + pvpXp;
        return {
            id: u.id,
            username: u.username,
            displayName: u.username,
            photoURL: u.avatar_url || 'img/default-avatar.png',
            level: calcularNivel(totalXp),
            rol: u.rol || 'usuario',
            partidas_jugadas: u.partidas_jugadas || 0,
            partidas_ganadas: u.partidas_ganadas || 0,
            quizXp,
            pvpXp,
            totalXp
        };
    });
}

router.get('/users', authMiddleware, async (req, res) => {
    try {
        res.json({ success: true, users: await obtenerRanking() });
    } catch (error) {
        console.error('Error obteniendo usuarios:', error);
        res.status(500).json({ success: false, error: 'Error al obtener lista de usuarios' });
    }
});

router.get('/ranking', authMiddleware, async (req, res) => {
    try {
        const limite = Math.min(100, Math.max(1, parseInt(req.query.limite) || 10));
        res.json({ success: true, ranking: await obtenerRanking(limite) });
    } catch (error) {
        console.error('Error obteniendo ranking:', error);
        res.status(500).json({ success: false, error: 'Error al obtener ranking' });
    }
});

// ============================================
// RECUPERACIÓN DE CONTRASEÑA
// ============================================
// Los tokens ahora se guardan HASHEADOS en `password_reset_tokens` y son de
// un solo uso: antes el JWT de reset se podía reutilizar durante 15 minutos.
function hashToken(token) {
    return crypto.createHash('sha256').update(token).digest('hex');
}

router.post('/forgot-password', async (req, res) => {
    const email = normalizarEmail(req.body.email);
    const RESPUESTA = { success: true, message: 'Si el email existe, recibirás un correo con las instrucciones' };

    if (!email) return res.status(400).json({ success: false, error: 'El email es requerido' });

    try {
        const user = await Usuario.findByEmail(email);
        if (!user) return res.status(200).json(RESPUESTA);   // no se revela si existe

        // Token aleatorio de un solo uso
        const token = crypto.randomBytes(32).toString('hex');
        await pool.query(
            `INSERT INTO password_reset_tokens (usuario_id, token_hash, expira_en, ip_solicitud)
             VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 15 MINUTE), ?)`,
            [user.id, hashToken(token), ipDe(req)]
        );
        // Invalida los tokens anteriores sin usar
        await pool.query(
            `UPDATE password_reset_tokens SET usado_en = NOW()
             WHERE usuario_id = ? AND usado_en IS NULL AND token_hash <> ?`,
            [user.id, hashToken(token)]
        );

        const resetLink = `${urlBase(req)}/reset-password.html?token=${token}`;

        await Auditoria.registrar({
            usuarioId: user.id, evento: 'reset_solicitado',
            descripcion: 'Solicitud de recuperación de contraseña',
            ip: ipDe(req), userAgent: uaDe(req)
        });

        const { sendPasswordResetEmail } = require('../config/email');
        const emailSent = await sendPasswordResetEmail(email, user.username, resetLink);
        if (!emailSent) {
            return res.status(500).json({ success: false, error: 'Error al enviar el correo. Intenta nuevamente más tarde.' });
        }
        res.json({ success: true, message: 'Se ha enviado un correo con las instrucciones para restablecer tu contraseña' });
    } catch (error) {
        console.error('Error en forgot-password:', error);
        res.status(500).json({ success: false, error: 'Error al procesar la solicitud' });
    }
});

// Verificar token de recuperación
router.get('/verify-reset-token/:token', async (req, res) => {
    try {
        const { token } = req.params;
        if (!token || token.length < 32) {
            return res.status(400).json({ success: false, error: 'Token inválido' });
        }
        const [rows] = await pool.query(
            `SELECT r.usuario_id FROM password_reset_tokens r
             WHERE r.token_hash = ? AND r.usado_en IS NULL AND r.expira_en > NOW()`,
            [hashToken(token)]
        );
        if (!rows.length) {
            return res.status(400).json({ success: false, error: 'El enlace es inválido, ya fue usado o ha expirado. Solicita uno nuevo.' });
        }
        res.json({ success: true, message: 'Token válido', userId: rows[0].usuario_id });
    } catch (error) {
        console.error('Error verificando token:', error);
        res.status(400).json({ success: false, error: 'Token inválido o expirado' });
    }
});

// Restablecer contraseña (token de un solo uso + historial)
router.post('/reset-password', async (req, res) => {
    const { token, password, confirmPassword } = req.body;

    if (!token || !password || !confirmPassword) {
        return res.status(400).json({ success: false, error: 'Todos los campos son requeridos' });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ success: false, error: 'Las contraseñas no coinciden' });
    }
    const errPass = validarPassword(password);
    if (errPass) return res.status(400).json({ success: false, error: errPass });

    let connection;
    try {
        const hash = hashToken(token);
        const [rows] = await pool.query(
            `SELECT id, usuario_id FROM password_reset_tokens
             WHERE token_hash = ? AND usado_en IS NULL AND expira_en > NOW()`,
            [hash]
        );
        if (!rows.length) {
            return res.status(400).json({ success: false, error: 'El enlace es inválido, ya fue usado o ha expirado. Solicita uno nuevo.' });
        }

        const registro = rows[0];
        if (await Usuario.wasPasswordUsed(registro.usuario_id, password)) {
            return res.status(400).json({ success: false, error: 'No puedes reutilizar una contraseña anterior' });
        }

        connection = await pool.getConnection();
        await connection.beginTransaction();
        // Marca el token como usado ANTES de cambiar la contraseña (un solo uso)
        await connection.query(
            'UPDATE password_reset_tokens SET usado_en = NOW() WHERE id = ?', [registro.id]);
        await connection.commit();

        await Usuario.changePassword(registro.usuario_id, password);

        await Auditoria.registrar({
            usuarioId: registro.usuario_id, evento: 'password_reseteada',
            descripcion: 'Contraseña restablecida con token de un solo uso',
            ip: ipDe(req), userAgent: uaDe(req)
        });

        res.json({ success: true, message: 'Contraseña actualizada correctamente. Ahora puedes iniciar sesión.' });
    } catch (error) {
        if (connection) { try { await connection.rollback(); } catch (e) { /* noop */ } }
        console.error('Error en reset-password:', error);
        res.status(500).json({ success: false, error: 'Error al restablecer la contraseña' });
    } finally {
        if (connection) connection.release();
    }
});

module.exports = router;
