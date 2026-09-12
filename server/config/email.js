// ============================================
// CONFIGURACIÓN DE EMAIL (Nodemailer)
// ============================================
const nodemailer = require('nodemailer');

// Verificar que nodemailer esté instalado
if (typeof nodemailer.createTransport !== 'function') {
    console.error('❌ Nodemailer no está instalado correctamente');
    console.error('Ejecuta: npm install nodemailer');
    process.exit(1);
}

// Crear el transporter con SMTP de Gmail
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true para 465, false para otros puertos
    auth: {
        user: process.env.EMAIL_USER, // Tu correo Gmail
        pass: process.env.EMAIL_PASS  // Contraseña de aplicación de Gmail
    }
});

// Verificar conexión al iniciar
transporter.verify(function(error, success) {
    if (error) {
        console.error('❌ Error conectando con el servidor de correo:', error);
    } else {
        console.log('✅ Servidor de correo configurado correctamente');
    }
});

// Función para enviar correo de recuperación
async function sendPasswordResetEmail(email, username, resetLink) {
    try {
        const mailOptions = {
            from: `"Sabiquiz" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: '🔐 Recuperación de Contraseña - Sabiquiz',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <h1 style="color: #667eea;">📚 Sabiquiz</h1>
                        <p style="color: #4a5568; font-size: 18px;">Recuperación de Contraseña</p>
                    </div>
                    <hr style="border: 1px solid #e2e8f0;">
                    <div style="padding: 20px 0;">
                        <p style="font-size: 16px; color: #2d3748;">
                            Hola <strong>${username}</strong>,
                        </p>
                        <p style="font-size: 16px; color: #4a5568;">
                            Hemos recibido una solicitud para restablecer tu contraseña en Sabiquiz.
                            Si no realizaste esta solicitud, puedes ignorar este correo.
                        </p>
                        <p style="font-size: 16px; color: #4a5568;">
                            Para restablecer tu contraseña, haz clic en el siguiente botón:
                        </p>
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${resetLink}" 
                               style="background: linear-gradient(135deg, #667eea, #764ba2); 
                                      color: white; 
                                      padding: 14px 40px; 
                                      border-radius: 10px; 
                                      text-decoration: none; 
                                      font-weight: bold; 
                                      font-size: 16px;
                                      display: inline-block;
                                      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);">
                                🔐 Restablecer Contraseña
                            </a>
                        </div>
                        <p style="font-size: 14px; color: #a0aec0; text-align: center;">
                            ⏰ Este enlace expirará en <strong>15 minutos</strong>.
                        </p>
                        <p style="font-size: 14px; color: #a0aec0; text-align: center;">
                            Si el botón no funciona, copia y pega este enlace en tu navegador:
                            <br>
                            <span style="word-break: break-all; color: #667eea; font-size: 12px;">${resetLink}</span>
                        </p>
                    </div>
                    <hr style="border: 1px solid #e2e8f0;">
                    <div style="text-align: center; padding-top: 15px; color: #a0aec0; font-size: 12px;">
                        <p>© ${new Date().getFullYear()} Sabiquiz - Todos los derechos reservados</p>
                        <p>Este correo ha sido enviado automáticamente, por favor no respondas.</p>
                    </div>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`📨 Email enviado a ${email}: ${info.messageId}`);
        return true;
    } catch (error) {
        console.error('❌ Error enviando email:', error);
        return false;
    }
}

module.exports = { transporter, sendPasswordResetEmail };