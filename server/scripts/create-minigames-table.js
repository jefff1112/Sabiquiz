// ============================================
// SCRIPT: CREAR TABLA DE PROGRESO DE MINIJUEGOS
// Se ejecuta una sola vez. Crea progreso_minijuego.
// ============================================
require('dotenv').config();
const { pool, testConnection } = require('../config/database');

async function createMinijuegoTable() {
    console.log('🚀 CREANDO TABLA progreso_minijuego');
    console.log('═══════════════════════════════════════\n');

    const connected = await testConnection();
    if (!connected) {
        console.error('❌ No se pudo conectar a MySQL');
        process.exit(1);
    }

    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS progreso_minijuego (
                id int unsigned NOT NULL AUTO_INCREMENT,
                usuario_id char(36) NOT NULL,
                minijuego varchar(30) NOT NULL,
                nivel tinyint unsigned NOT NULL,
                estrellas tinyint unsigned NOT NULL DEFAULT 0,
                completado tinyint(1) NOT NULL DEFAULT 0,
                fecha_completado datetime NULL,
                created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (id),
                UNIQUE KEY uk_usuario_minijuego_nivel (usuario_id, minijuego, nivel),
                KEY idx_usuario (usuario_id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        `);
        console.log('  ✅ Tabla progreso_minijuego creada/verificada');

        const [res] = await pool.query('SELECT COUNT(*) AS c FROM progreso_minijuego');
        console.log(`  📊 Registros actuales: ${res[0].c}`);
        console.log('\n🎉 LISTO');
    } catch (error) {
        console.error('❌ Error creando tabla:', error);
    } finally {
        await pool.end();
    }
}

createMinijuegoTable();