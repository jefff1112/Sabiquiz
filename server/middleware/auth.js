const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

// Middleware de autenticación (verifica que el usuario esté logueado)
const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ 
                success: false,
                error: 'No autorizado: Token no proporcionado' 
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const usuario = await Usuario.findById(decoded.id);
        
        if (!usuario) {
            return res.status(401).json({ 
                success: false,
                error: 'No autorizado: Usuario no encontrado' 
            });
        }

        req.usuario = usuario;
        req.usuarioId = decoded.id;
        req.usuarioRol = usuario.rol || 'usuario';
        next();
    } catch (error) {
        return res.status(401).json({ 
            success: false,
            error: 'Token inválido o expirado' 
        });
    }
};

// Middleware para verificar si es ADMIN
const adminMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ 
                success: false,
                error: 'No autorizado: Token no proporcionado' 
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const usuario = await Usuario.findById(decoded.id);
        
        if (!usuario) {
            return res.status(401).json({ 
                success: false,
                error: 'No autorizado: Usuario no encontrado' 
            });
        }

        if (usuario.rol !== 'admin') {
            return res.status(403).json({ 
                success: false,
                error: 'Acceso denegado: Se requieren permisos de administrador' 
            });
        }

        req.usuario = usuario;
        req.usuarioId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({ 
            success: false,
            error: 'Token inválido o expirado' 
        });
    }
};

module.exports = { 
    authMiddleware, 
    adminMiddleware 
};