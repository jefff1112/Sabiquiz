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
                id CHAR(36) PRIMARY KEY,
                usuario_id CHAR(36) NOT NULL,
                sabi_nivel INT UNSIGNED NOT NULL DEFAULT 1,
                sabi_dificultad JSON NOT NULL,
                estado ENUM('en_curso', 'finalizada') NOT NULL DEFAULT 'en_curso',
                preguntas JSON NOT NULL,
                pregunta_actual INT UNSIGNED NOT NULL DEFAULT 0,
                puntaje_usuario INT UNSIGNED NOT NULL DEFAULT 0,
                puntaje_sabi INT UNSIGNED NOT NULL DEFAULT 0,
                detalles JSON NOT NULL,
                resultado ENUM('victoria', 'derrota', 'empate') NULL,
                finalizado_en DATETIME NULL,
                creado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT fk_sabi1vs1_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
            ) ENGINE=InnoDB
        `);
        await connection.query(`
            CREATE TABLE IF NOT EXISTS sabi_chat_sessions (
                id CHAR(36) PRIMARY KEY,
                usuario_id CHAR(36) NOT NULL,
                materia VARCHAR(100) NULL,
                nivel INT UNSIGNED NULL,
                pregunta_actual JSON NULL,
                historial JSON NOT NULL,
                creado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
                actualizado_en DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                CONSTRAINT fk_sabi_chat_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
            ) ENGINE=InnoDB
        `);
        
        connection.release();
        return true;
    } catch (error) {
        console.error('❌ Error conectando a MySQL:', error.message);
        return false;
    }
}

module.exports = { pool, testConnection };