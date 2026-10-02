// ============================================
// CONFIGURACIÓN DE EMAILS PARA TORNEOS
// ============================================
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

async function sendTournamentEmail(email, username, torneo) {
    try {
        const fechaInicio = new Date(torneo.fecha_inicio);
        const fechaFin = new Date(torneo.fecha_fin);
        
        const mailOptions = {
            from: `"Sabiquiz" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `🏆 Confirmación de Inscripción - ${torneo.nombre}`,
            html: `
                <div style="font-family: 'Segoe UI', system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%); border-radius: 20px; border: 1px solid #e2e8f0;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <img src="cid:sabiLogo" alt="Sabi" style="width: 80px; height: 80px;">
                        <h1 style="color: #667eea; margin: 15px 0 5px; font-size: 28px;">Sabiquiz</h1>
                        <p style="color: #718096; font-size: 16px;">Confirmación de Inscripción a Torneo</p>
                    </div>
                    
                    <div style="background: white; border-radius: 16px; padding: 25px; box-shadow: 0 4px 20px rgba(102, 126, 234, 0.1); border: 1px solid #e2e8f0;">
                        <p style="font-size: 16px; color: #2d3748;">Hola <strong>${username}</strong>,</p>
                        <p style="font-size: 16px; color: #4a5568;">Tu inscripción ha sido confirmada exitosamente.</p>
                        
                        <div style="background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 12px; padding: 20px; margin: 25px 0; color: white;">
                            <h2 style="margin: 0 0 15px; font-size: 22px;">${torneo.nombre}</h2>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 14px;">
                                <div><strong>📅 Inicio:</strong> ${fechaInicio.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}</div>
                                <div><strong>⏰ Fin:</strong> ${fechaFin.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}</div>
                                <div><strong>📚 Materia:</strong> ${torneo.materia_nombre || 'Matemáticas'}</div>
                                <div><strong>⏱️ Duración:</strong> ${torneo.duracion_minutos} min (${5} partidas)</div>
                                <div><strong>👥 Máx. participantes:</strong> ${torneo.max_usuarios}</div>
                                <div><strong>🎮 Modo:</strong> ${torneo.modo === 'acumulativo' ? 'Acumulativo (5 partidas vs sistema)' : torneo.modo}</div>
                            </div>
                        </div>
                        
                        <p style="font-size: 14px; color: #718096; background: #fff5f5; border-left: 4px solid #fc8181; padding: 15px; border-radius: 8px;">
                            <strong>⚠️ Importante:</strong> El torneo comienza en <strong>${fechaInicio.toLocaleString('es-ES')}</strong>. 
                            Recibirás un recordatorio 5 minutos antes. ¡Prepárate!
                        </p>
                        
                        <div style="text-align: center; margin-top: 30px;">
                            <a href="${process.env.FRONTEND_URL || 'https://sabiquiz.com'}/torneo_detalle.html?id=${torneo.id}" 
                               style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 14px 30px; border-radius: 10px; text-decoration: none; font-weight: bold; font-size: 16px; display: inline-block; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);">
                                🏆 Ver Torneo
                            </a>
                        </div>
                    </div>
                    
                    <div style="text-align: center; margin-top: 20px; color: #a0aec0; font-size: 12px;">
                        <p>© ${new Date().getFullYear()} Sabiquiz - Feria CIMAT 2026</p>
                        <p>Este correo ha sido enviado automáticamente, por favor no respondas.</p>
                    </div>
                </div>
            `,
            attachments: [{
                filename: 'sabi_celebrando.png',
                path: 'img/sabi/sabi_celebrando.png',
                cid: 'sabiLogo'
            }]
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`📨 Email de torneo enviado a ${email}: ${info.messageId}`);
        return true;
    } catch (error) {
        console.error('❌ Error enviando email de torneo:', error);
        return false;
    }
}

async function sendTournamentReminderEmail(email, username, torneo) {
    try {
        const mailOptions = {
            from: `"Sabiquiz" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `⏰ ¡Empieza en 5 minutos! - ${torneo.nombre}`,
            html: `
                <div style="font-family: 'Segoe UI', system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #fff5f5 0%, #ffe8e8 100%); border-radius: 20px; border: 2px solid #fc8181;">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <img src="cid:sabiLogo" alt="Sabi" style="width: 80px; height: 80px;">
                        <h1 style="color: #e53e3e; margin: 15px 0 5px;">⏰ Recordatorio de Torneo</h1>
                    </div>
                    
                    <div style="background: white; border-radius: 16px; padding: 25px; box-shadow: 0 4px 20px rgba(229, 62, 62, 0.1);">
                        <p style="font-size: 18px; color: #2d3748; text-align: center;">Hola <strong>${username}</strong>,</p>
                        <p style="font-size: 18px; color: #e53e3e; text-align: center; font-weight: bold;">¡El torneo empieza en <strong>5 MINUTOS</strong>! 🚀</p>
                        
                        <div style="background: linear-gradient(135deg, #e53e3e, #fc8181); border-radius: 12px; padding: 20px; margin: 25px 0; color: white; text-align: center;">
                            <h2 style="margin: 0 0 10px; font-size: 24px;">${torneo.nombre}</h2>
                            <p style="margin: 0; font-size: 18px;">Comienza a las ${new Date(torneo.fecha_inicio).toLocaleTimeString('es-ES')}</p>
                        </div>
                        
                        <div style="text-align: center; margin-top: 30px;">
                            <a href="${process.env.FRONTEND_URL || 'https://sabiquiz.com'}/torneo_detalle.html?id=${torneo.id}" 
                               style="background: linear-gradient(135deg, #e53e3e, #fc8181); color: white; padding: 16px 35px; border-radius: 10px; text-decoration: none; font-weight: bold; font-size: 18px; display: inline-block; box-shadow: 0 4px 20px rgba(229, 62, 62, 0.4);">
                                🎮 ENTRAR AL TORNEO AHORA
                            </a>
                        </div>
                    </div>
                </div>
            `,
            attachments: [{
                filename: 'sabi_competitivo.png',
                path: 'img/sabi/sabi_competitivo.png',
                cid: 'sabiLogo'
            }]
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`📨 Email de recordatorio enviado a ${email}: ${info.messageId}`);
        return true;
    } catch (error) {
        console.error('❌ Error enviando email de recordatorio:', error);
        return false;
    }
}

async function sendTournamentWinnerEmail(email, username, torneo, premio) {
    try {
        const mailOptions = {
            from: `"Sabiquiz" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `🏆 ¡CAMPEÓN! Ganaste ${torneo.nombre}`,
            html: `
                <div style="font-family: 'Segoe UI', system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #f0fff4 0%, #e6fffa 100%); border-radius: 20px; border: 2px solid #48bb78;">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <img src="cid:sabiLogo" alt="Sabi" style="width: 100px; height: 100px;">
                        <h1 style="color: #276749; margin: 15px 0 5px; font-size: 32px;">🏆 ¡FELICIDADES!</h1>
                        <p style="color: #2f855a; font-size: 20px;">Has ganado el torneo</p>
                    </div>
                    
                    <div style="background: white; border-radius: 16px; padding: 25px; box-shadow: 0 4px 20px rgba(72, 187, 120, 0.1);">
                        <p style="font-size: 18px; color: #2d3748; text-align: center;">Hola <strong>${username}</strong>,</p>
                        <p style="font-size: 16px; color: #4a5568; text-align: center;">Tu esfuerzo ha valido la pena. ¡Eres el campeón!</p>
                        
                        <div style="background: linear-gradient(135deg, #48bb78, #38a169); border-radius: 12px; padding: 25px; margin: 25px 0; color: white; text-align: center;">
                            <h2 style="margin: 0 0 20px; font-size: 26px;">${torneo.nombre}</h2>
                            <div style="display: flex; justify-content: center; gap: 30px; flex-wrap: wrap;">
                                <div style="background: rgba(255,255,255,0.2); padding: 15px 25px; border-radius: 10px;">
                                    <div style="font-size: 32px; font-weight: bold;">+200 XP</div>
                                    <div style="font-size: 14px; opacity: 0.9;">Experiencia PvP</div>
                                </div>
                                <div style="background: rgba(255,255,255,0.2); padding: 15px 25px; border-radius: 10px;">
                                    <div style="font-size: 32px; font-weight: bold;">🏆</div>
                                    <div style="font-size: 14px; opacity: 0.9;">Logro: Campeón de Torneo</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            attachments: [{
                filename: 'sabi_medalla.png',
                path: 'img/sabi/sabi_medalla.png',
                cid: 'sabiLogo'
            }]
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`📨 Email de ganador enviado a ${email}: ${info.messageId}`);
        return true;
    } catch (error) {
        console.error('❌ Error enviando email de ganador:', error);
        return false;
    }
}

module.exports = { 
    sendTournamentEmail, 
    sendTournamentReminderEmail,
    sendTournamentWinnerEmail,
    transporter 
};