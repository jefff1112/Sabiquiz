const { pool } = require('../config/database');

async function fixSabiTables() {
    console.log('🔧 Corrigiendo tablas de Sabi...');
    
    try {
        // Fix sabi_1vs1_matches - recreate with correct schema
        await pool.query(`DROP TABLE IF EXISTS sabi_1vs1_matches`);
        console.log('🗑️ Tabla sabi_1vs1_matches eliminada');
        
        await pool.query(`
            CREATE TABLE sabi_1vs1_matches (
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
        console.log('✅ Tabla sabi_1vs1_matches recreada correctamente');

        // Fix sabi_chat_sessions - recreate with correct schema
        await pool.query(`DROP TABLE IF EXISTS sabi_chat_sessions`);
        console.log('🗑️ Tabla sabi_chat_sessions eliminada');
        
        await pool.query(`
            CREATE TABLE sabi_chat_sessions (
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
        console.log('✅ Tabla sabi_chat_sessions recreada correctamente');

        console.log('\n🎉 ¡Tablas de Sabi corregidas correctamente!');

    } catch (error) {
        console.error('❌ Error corrigiendo tablas de Sabi:', error);
        throw error;
    }
}

// Ejecutar si se llama directamente
if (require.main === module) {
    fixSabiTables()
        .then(() => process.exit(0))
        .catch(() => process.exit(1));
}

module.exports = { fixSabiTables };