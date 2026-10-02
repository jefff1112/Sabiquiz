// ============================================
// MÓDULO DE NOTIFICACIONES - Evita dependencias circulares
// ============================================

let io = null;
let userSockets = {};

function setIO(socketIO) {
    io = socketIO;
}

function setUserSockets(sockets) {
    userSockets = sockets;
}

// Función para enviar notificación a un usuario específico
function sendNotification(uid, type, data) {
    const socketId = userSockets[uid];
    if (socketId && io) {
        io.to(socketId).emit('notification', {
            type: type,
            data: data,
            timestamp: new Date().toISOString()
        });
        console.log(`📨 Notificación enviada a ${uid}: ${type}`);
        return true;
    }
    console.log(`⚠️ Usuario ${uid} no conectado, notificación guardada en BD`);
    return false;
}

module.exports = {
    setIO,
    setUserSockets,
    sendNotification
};