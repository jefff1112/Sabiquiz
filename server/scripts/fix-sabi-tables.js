require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const { pool } = require('../config/database');

async function fixSabiTables() {
    console.log('🔧 Corrigiendo tablas de Sabi...\n');
    
    try {
        // 0. Verify usuarios.id column type
        const [usuariosCols] = await pool.query(
            `SELECT COLUMN_TYPE FROM INFORMATION_SCHEMA.COLUMNS 
             WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'usuarios' AND COLUMN_NAME = 'id'`,
            [process.env.DB_NAME || 'sabiquiz_db']
        );
        if (usuariosCols.length) {
            console.log(`📋 usuarios.id column type: ${usuariosCols[0].COLUMN_TYPE}`);
        }

        // 1. Drop existing tables (order matters for FK constraints)
        await pool.query(`DROP TABLE IF EXISTS sabi_1vs1_matches`);
        console.log('🗑️  Tabla sabi_1vs1_matches eliminada');
        
        await pool.query(`DROP TABLE IF EXISTS sabi_chat_sessions`);
        console.log('🗑️  Tabla sabi_chat_sessions eliminada');

        // 2. Recreate sabi_1vs1_matches with correct schema
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

        // 3. Recreate sabi_chat_sessions with correct schema
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

        // 4. Verify schemas
        console.log('\n📋 Verificando schemas...');
        for (const table of ['sabi_1vs1_matches', 'sabi_chat_sessions']) {
            const [cols] = await pool.query(
                `SELECT COLUMN_NAME, COLUMN_TYPE, IS_NULLABLE 
                 FROM INFORMATION_SCHEMA.COLUMNS 
                 WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ? AND COLUMN_NAME = 'usuario_id'`,
                [process.env.DB_NAME || 'sabiquiz_db', table]
            );
            if (cols.length) {
                const col = cols[0];
                const ok = col.COLUMN_TYPE === 'char(36)' && col.IS_NULLABLE === 'NO';
                console.log(`  ${table}.usuario_id: ${col.COLUMN_TYPE}, nullable=${col.IS_NULLABLE} → ${ok ? '✅ OK' : '❌ BAD'}`);
            }
        }

        // 5. Verify SABI_WEBHOOK_URL
        console.log('\n📋 Verificando SABI_WEBHOOK_URL...');
        if (process.env.SABI_WEBHOOK_URL) {
            console.log(`  ✅ SABI_WEBHOOK_URL = ${process.env.SABI_WEBHOOK_URL}`);
        } else {
            console.log('  ⚠️  SABI_WEBHOOK_URL no encontrado en .env');
        }

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