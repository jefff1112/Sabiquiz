const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const { authMiddleware } = require('../middleware/auth');
const { pool } = require('../config/database');

// ============================================
// RUTA: REGISTRO
// ============================================
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        const existingUser = await Usuario.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ 
                success: false, 
                error: 'El email ya está registrado' 
            });
        }

        const userId = await Usuario.create(username, email, password);
        
        const token = jwt.sign(
            { id: userId }, 
            process.env.JWT_SECRET, 
            { expiresIn: '7d' }
        );
        
        res.status(201).json({
            success: true,
            token,
            user: {
                id: userId,
                username,
                email,
                rol: 'usuario'
            }
        });
    } catch (error) {
        console.error('Error en registro:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Error al registrar usuario' 
        });
    }
});

// ============================================
// RUTA: LOGIN (MEJORADO CON EXCEPCIÓN PARA ADMIN)
// ============================================
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const ip = req.ip || req.connection.remoteAddress || '0.0.0.0';
        const userAgent = req.headers['user-agent'] || 'Desconocido';

        // 1. Buscar usuario primero para saber si es admin
        const user = await Usuario.findByEmail(email);
        
        // 2. Si el usuario existe y es admin, NO aplicar bloqueo
        const isAdmin = user && user.rol === 'admin';
        
        // 3. Verificar intentos fallidos solo para NO admins
        if (!isAdmin) {
            const intentosFallidos = await Usuario.getIntentosFallidos(email, ip);
            if (intentosFallidos >= 5) {
                return res.status(429).json({
                    success: false,
                    error: `⛔ Demasiados intentos fallidos. Espera 15 minutos.`,
                    tipo: 'bloqueo',
                    intentos: intentosFallidos
                });
            }
        }
        
        // 4. Si el usuario no existe, registrar intento y responder
        if (!user) {
            await Usuario.registrarIntento(email, false, null, ip, userAgent);
            return res.status(401).json({
                success: false,
                error: '❌ No encontramos una cuenta con ese correo',
                tipo: 'no_existe'
            });
        }

        // 5. Verificar contraseña
        const isValid = await Usuario.verifyPassword(password, user.password_hash);
        
        if (!isValid) {
            await Usuario.registrarIntento(email, false, user.id, ip, userAgent);
            
            // Si es admin, no mostramos contador de intentos
            let totalIntentos = 0;
            if (!isAdmin) {
                totalIntentos = await Usuario.getIntentosFallidos(email, ip);
            }
            
            const lastChange = await Usuario.getLastPasswordChange(user.id);
            let mensaje = '🔒 Contraseña incorrecta.';
            if (lastChange) {
                const fecha = new Date(lastChange);
                mensaje += ` La contraseña se cambió el ${fecha.toLocaleDateString()}.`;
            }
            
            return res.status(401).json({
                success: false,
                error: mensaje,
                tipo: 'password_incorrecta',
                intentos: totalIntentos,
                maxIntentos: isAdmin ? 999 : 5,
                lastPasswordChange: lastChange,
                isAdmin: isAdmin
            });
        }

        // ✅ LOGIN EXITOSO
        await Usuario.registrarIntento(email, true, user.id, ip, userAgent);
        await Usuario.updateLastLogin(user.id);

        const ultimoLogin = await Usuario.getUltimoLoginExitoso(user.id);
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            success: true,
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                avatar: user.avatar_url,
                rol: user.rol || 'usuario',
                ultimoLogin: ultimoLogin,
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
        res.status(500).json({
            success: false,
            error: 'Error al iniciar sesión'
        });
    }
});

// ============================================
// RUTA: VERIFICAR INTENTOS FALLIDOS
// ============================================
router.post('/check-attempts', async (req, res) => {
    try {
        const { email } = req.body;
        const ip = req.ip || req.connection.remoteAddress || '0.0.0.0';
        
        const intentos = await Usuario.getIntentosFallidos(email, ip);
        
        res.json({
            success: true,
            intentos: intentos,
            maxIntentos: 5,
            bloqueado: intentos >= 5
        });
    } catch (error) {
        console.error('Error verificando intentos:', error);
        res.status(500).json({
            success: false,
            error: 'Error al verificar intentos'
        });
    }
});

// ============================================
// RUTA: PERFIL
// ============================================
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await Usuario.findById(req.usuarioId);
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
                pvpXp: user.pvpXp || 0,  // 🔥 AGREGAR ESTO
                level: user.level || 1,
                lastPasswordChange: user.password_changed_at
            }
        });
    } catch (error) {
        console.error('Error al obtener perfil:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Error al obtener perfil' 
        });
    }
});

// ============================================
// RUTA: ACTUALIZAR PERFIL
// ============================================
router.put('/profile', authMiddleware, async (req, res) => {
    try {
        const { username, avatar } = req.body;
        const userId = req.usuarioId;
        
        let updates = [];
        let values = [];

        if (username) {
            updates.push('username = ?');
            values.push(username);
        }

        if (avatar) {
            updates.push('avatar_url = ?');
            values.push(avatar);
        }

        if (updates.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'No hay datos para actualizar'
            });
        }

        values.push(userId);
        const query = `UPDATE usuarios SET ${updates.join(', ')} WHERE id = ?`;
        
        await pool.query(query, values);

        const user = await Usuario.findById(userId);
        res.json({
            success: true,
            message: 'Perfil actualizado correctamente',
            user
        });
    } catch (error) {
        console.error('Error actualizando perfil:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Error al actualizar perfil' 
        });
    }
});

// ============================================
// RUTA: ADMIN - VERIFICAR SI ES ADMIN
// ============================================
router.get('/isAdmin', authMiddleware, async (req, res) => {
    try {
        const isAdmin = await Usuario.isAdmin(req.usuarioId);
        res.json({
            success: true,
            isAdmin
        });
    } catch (error) {
        console.error('Error verificando admin:', error);
        res.status(500).json({
            success: false,
            error: 'Error al verificar permisos'
        });
    }
});

// ============================================
// RUTA: RANKING (USERS)
// ============================================
router.get('/users', authMiddleware, async (req, res) => {
    try {
        const [users] = await pool.query(`
            SELECT 
                u.id,
                u.username,
                u.avatar_url as photoURL,
                u.partidas_jugadas,
                u.partidas_ganadas,
                u.rol,
                COALESCE(
                    (SELECT SUM(p.estrellas * 10) 
                     FROM progreso_usuario p 
                     WHERE p.usuario_id = u.id AND p.completado = TRUE),
                    0
                ) as quizXp,
                u.pvpXp as pvpXp,
                FLOOR(
                    COALESCE(
                        (SELECT SUM(p.estrellas * 10) 
                         FROM progreso_usuario p 
                         WHERE p.usuario_id = u.id AND p.completado = TRUE),
                        0
                    ) / 100
                ) + 1 as level
            FROM usuarios u
            ORDER BY level DESC, quizXp DESC
        `);

        const usersFormatted = users.map(user => ({
            id: user.id,
            username: user.username,
            displayName: user.username,
            photoURL: user.photoURL || 'img/default-avatar.png',
            level: user.level || 1,
            rol: user.rol || 'usuario',
            partidas_jugadas: user.partidas_jugadas || 0,
            partidas_ganadas: user.partidas_ganadas || 0,
            quizXp: user.quizXp || 0,
            pvpXp: user.pvpXp || 0,
            totalXp: (user.quizXp || 0) + (user.pvpXp || 0)
        }));

        res.json({
            success: true,
            users: usersFormatted
        });
    } catch (error) {
        console.error('Error obteniendo usuarios:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Error al obtener lista de usuarios' 
        });
    }
});

// ============================================
// RUTA: RANKING (TOP 10)
// ============================================
router.get('/ranking', authMiddleware, async (req, res) => {
    try {
        const [users] = await pool.query(`
            SELECT 
                u.id,
                u.username,
                u.avatar_url as photoURL,
                u.partidas_jugadas,
                u.partidas_ganadas,
                u.rol,
                COALESCE(
                    (SELECT SUM(p.estrellas * 10) 
                     FROM progreso_usuario p 
                     WHERE p.usuario_id = u.id AND p.completado = TRUE),
                    0
                ) as quizXp,
                u.pvpXp as pvpXp,
                FLOOR(
                    COALESCE(
                        (SELECT SUM(p.estrellas * 10) 
                         FROM progreso_usuario p 
                         WHERE p.usuario_id = u.id AND p.completado = TRUE),
                        0
                    ) / 100
                ) + 1 as level
            FROM usuarios u
            ORDER BY level DESC, quizXp DESC
            LIMIT 10
        `);

        const usersFormatted = users.map(user => ({
            id: user.id,
            username: user.username,
            displayName: user.username,
            photoURL: user.photoURL || 'img/default-avatar.png',
            level: user.level || 1,
            rol: user.rol || 'usuario',
            partidas_jugadas: user.partidas_jugadas || 0,
            partidas_ganadas: user.partidas_ganadas || 0,
            quizXp: user.quizXp || 0,
            pvpXp: user.pvpXp || 0,
            totalXp: (user.quizXp || 0) + (user.pvpXp || 0)
        }));

        res.json({
            success: true,
            ranking: usersFormatted
        });
    } catch (error) {
        console.error('Error obteniendo ranking:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Error al obtener ranking' 
        });
    }
});

// ============================================
// RUTA: RECUPERACIÓN DE CONTRASEÑA
// ============================================

// Solicitar recuperación
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({
                success: false,
                error: 'El email es requerido'
            });
        }

        const user = await Usuario.findByEmail(email);
        if (!user) {
            return res.status(200).json({
                success: true,
                message: 'Si el email existe, recibirás un correo con las instrucciones'
            });
        }

        const resetToken = jwt.sign(
            { 
                id: user.id,
                type: 'password_reset'
            },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
        );

        const resetLink = `${req.protocol}://${req.get('host')}/reset-password.html?token=${resetToken}`;

        const { sendPasswordResetEmail } = require('../config/email');
        const emailSent = await sendPasswordResetEmail(email, user.username, resetLink);

        if (!emailSent) {
            return res.status(500).json({
                success: false,
                error: 'Error al enviar el correo. Intenta nuevamente más tarde.'
            });
        }

        res.json({
            success: true,
            message: 'Se ha enviado un correo con las instrucciones para restablecer tu contraseña'
        });
    } catch (error) {
        console.error('Error en forgot-password:', error);
        res.status(500).json({
            success: false,
            error: 'Error al procesar la solicitud'
        });
    }
});

// Verificar token de recuperación
router.get('/verify-reset-token/:token', async (req, res) => {
    try {
        const { token } = req.params;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (!decoded.id || decoded.type !== 'password_reset') {
            return res.status(400).json({
                success: false,
                error: 'Token inválido'
            });
        }

        const user = await Usuario.findById(decoded.id);
        if (!user) {
            return res.status(400).json({
                success: false,
                error: 'Usuario no encontrado'
            });
        }

        res.json({
            success: true,
            message: 'Token válido',
            userId: decoded.id
        });
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(400).json({
                success: false,
                error: 'El enlace ha expirado. Solicita un nuevo restablecimiento.'
            });
        }
        console.error('Error verificando token:', error);
        res.status(400).json({
            success: false,
            error: 'Token inválido o expirado'
        });
    }
});

// Restablecer contraseña (con historial)
router.post('/reset-password', async (req, res) => {
    try {
        const { token, password, confirmPassword } = req.body;

        if (!token || !password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                error: 'Todos los campos son requeridos'
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                error: 'La contraseña debe tener al menos 6 caracteres'
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                error: 'Las contraseñas no coinciden'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (!decoded.id || decoded.type !== 'password_reset') {
            return res.status(400).json({
                success: false,
                error: 'Token inválido'
            });
        }

        const user = await Usuario.findById(decoded.id);
        if (!user) {
            return res.status(400).json({
                success: false,
                error: 'Usuario no encontrado'
            });
        }

        // 🔥 Guardar en historial y actualizar
        await Usuario.changePassword(decoded.id, password);

        res.json({
            success: true,
            message: 'Contraseña actualizada correctamente. Ahora puedes iniciar sesión.'
        });
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(400).json({
                success: false,
                error: 'El enlace ha expirado. Solicita un nuevo restablecimiento.'
            });
        }
        console.error('Error en reset-password:', error);
        res.status(500).json({
            success: false,
            error: 'Error al restablecer la contraseña'
        });
    }
});

module.exports = router;