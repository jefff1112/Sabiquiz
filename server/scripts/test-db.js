// ============================================
// SCRIPT PARA PROBAR LA CONEXIÓN A LA BD
// ============================================
require('dotenv').config();
const { pool, testConnection } = require('../config/database');

async function testDB() {
    console.log('🔍 Probando conexión a la base de datos...\n');
    
    const connected = await testConnection();
    if (!connected) {
        console.error('❌ No se pudo conectar a MySQL');
        console.log('⚠️  Verifica tu archivo .env');
        process.exit(1);
    }

    try {
        // Verificar tablas
        const [tables] = await pool.query('SHOW TABLES');
        console.log('📊 Tablas en la base de datos:');
        tables.forEach(table => {
            console.log(`  ✅ ${Object.values(table)[0]}`);
        });

        // Contar registros
        const [counts] = await pool.query(`
            SELECT 
                (SELECT COUNT(*) FROM usuarios) as usuarios,
                (SELECT COUNT(*) FROM materias) as materias,
                (SELECT COUNT(*) FROM niveles) as niveles,
                (SELECT COUNT(*) FROM preguntas) as preguntas,
                (SELECT COUNT(*) FROM opciones) as opciones,
                (SELECT COUNT(*) FROM progreso_usuario) as progresos
        `);
        
        console.log('\n📈 Estadísticas:');
        console.log(`  👥 Usuarios: ${counts[0].usuarios}`);
        console.log(`  📚 Materias: ${counts[0].materias}`);
        console.log(`  📖 Niveles: ${counts[0].niveles}`);
        console.log(`  ❓ Preguntas: ${counts[0].preguntas}`);
        console.log(`  🔘 Opciones: ${counts[0].opciones}`);
        console.log(`  📈 Progresos: ${counts[0].progresos}`);

        console.log('\n✅ ¡La base de datos está funcionando correctamente!');
        console.log('💡 Ahora puedes ejecutar la migración con: npm run migrate');

    } catch (error) {
        console.error('❌ Error en la prueba:', error.message);
    } finally {
        await pool.end();
    }
}

testDB();