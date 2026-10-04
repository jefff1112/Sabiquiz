const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    timezone: 'Z',
    dateStrings: true
};

if (process.env.DB_SSL === 'true') {
    dbConfig.ssl = {
        rejectUnauthorized: false
    };
}

// Crear el pool de conexiones
const pool = mysql.createPool(dbConfig);

// Probar la conexión y crear tablas faltantes si es necesario
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Conectado a MySQL correctamente');
        
        // Auto-crear tablas faltantes (especialmente en producción/Aiven)
        await connection.query(`
            CREATE TABLE IF NOT EXISTS sabi_1vs1_matches (
                id VARCHAR(100) PRIMARY KEY,
                usuario_id CHAR(36),
                sabi_nivel INT,
                sabi_dificultad JSON,
                estado VARCHAR(50),
                preguntas JSON,
                pregunta_actual INT DEFAULT 0,
                detalles JSON,
                fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                resultado VARCHAR(50) DEFAULT NULL,
                puntaje_usuario INT DEFAULT 0,
                puntaje_sabi INT DEFAULT 0,
                finalizado_en TIMESTAMP NULL DEFAULT NULL
            )
        `);
        await connection.query(`
            CREATE TABLE IF NOT EXISTS sabi_chat_sessions (
                id VARCHAR(100) PRIMARY KEY,
                usuario_id CHAR(36),
                materia VARCHAR(100),
                nivel INT,
                pregunta_actual TEXT,
                historial JSON,
                creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);
        
        connection.release();
        return true;
    } catch (error) {
        console.error('❌ Error conectando a MySQL:', error.message);
        return false;
    }
}

module.exports = { pool, testConnection };