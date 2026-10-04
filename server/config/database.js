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
                usuario_id VARCHAR(100),
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
                usuario_id VARCHAR(100),
                materia VARCHAR(100),
                nivel INT,
                pregunta_actual TEXT,
                historial JSON,
                creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);
        await connection.query(`
            CREATE TABLE IF NOT EXISTS solicitudes_admin (
                id INT AUTO_INCREMENT PRIMARY KEY,
                usuario_id VARCHAR(100) NOT NULL,
                motivo TEXT,
                estado ENUM('pendiente','aprobada','rechazada') DEFAULT 'pendiente',
                fecha_solicitud DATETIME DEFAULT CURRENT_TIMESTAMP,
                fecha_revision DATETIME NULL,
                revisado_por VARCHAR(100) NULL,
                comentario_admin TEXT NULL
            )
        `);

        // Ajustar el tamaño de las columnas por si la tabla ya existía con un tamaño menor
        try {
            await connection.query("ALTER TABLE sabi_chat_sessions MODIFY id VARCHAR(100), MODIFY usuario_id VARCHAR(100);");
            await connection.query("ALTER TABLE sabi_1vs1_matches MODIFY id VARCHAR(100), MODIFY usuario_id VARCHAR(100);");
        } catch (e) {
            console.log("Recreando tablas de Sabi por restricciones de Foreign Key incompatibles en Aiven...");
            try {
                await connection.query("DROP TABLE IF EXISTS sabi_chat_sessions");
                await connection.query("DROP TABLE IF EXISTS sabi_1vs1_matches");
                
                // Recrear con el esquema correcto
                await connection.query(`
                    CREATE TABLE sabi_1vs1_matches (
                        id VARCHAR(100) PRIMARY KEY,
                        usuario_id VARCHAR(100),
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
                    CREATE TABLE sabi_chat_sessions (
                        id VARCHAR(100) PRIMARY KEY,
                        usuario_id VARCHAR(100),
                        materia VARCHAR(100),
                        nivel INT,
                        pregunta_actual TEXT,
                        historial JSON,
                        creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                    )
                `);
                console.log("Tablas de Sabi recreadas exitosamente con VARCHAR(100)");
            } catch (dropErr) {
                console.error("Error crítico recreando tablas:", dropErr.message);
            }
        }
        
        connection.release();
        return true;
    } catch (error) {
        console.error('❌ Error conectando a MySQL:', error.message);
        return false;
    }
}

module.exports = { pool, testConnection };