// ============================================
// SCRIPT: AGREGAR LOGROS DE MINIJUEGOS
// - Extiende el enum de logros.tipo con 'minijuegos'
// - Agrega la columna logros.minijuego
// - Inserta los logros de minijuegos (idempotente)
// ============================================
require('dotenv').config();
const { pool, testConnection } = require('../config/database');

const LOGROS = [
    { tipo: 'minijuegos', minijuego: 'puzzle',    condicion: 1, nombre: 'Primer Puzzle',           icono: '🧩', descripcion: 'Completa tu primer nivel del Puzzle Geométrico.' },
    { tipo: 'minijuegos', minijuego: 'puzzle',    condicion: 5, nombre: 'Maestro del Puzzle',      icono: '🧩', descripcion: 'Completa los 5 niveles del Puzzle Geométrico.' },
    { tipo: 'minijuegos', minijuego: 'balanzas',  condicion: 1, nombre: 'En Equilibrio',           icono: '⚖️', descripcion: 'Completa tu primer nivel de Balanzas de Ecuaciones.' },
    { tipo: 'minijuegos', minijuego: 'balanzas',  condicion: 5, nombre: 'Mente Algebráica',        icono: '⚖️', descripcion: 'Completa los 5 niveles de Balanzas de Ecuaciones.' },
    { tipo: 'minijuegos', minijuego: 'tiro',      condicion: 1, nombre: 'Primer Disparo',          icono: '🚀', descripcion: 'Completa tu primer nivel de Tiro Parabólico.' },
    { tipo: 'minijuegos', minijuego: 'tiro',      condicion: 5, nombre: 'Francotirador Parabólico', icono: '🚀', descripcion: 'Completa los 5 niveles de Tiro Parabólico.' },
    { tipo: 'minijuegos', minijuego: 'regresion', condicion: 1, nombre: 'Primer Ajuste',           icono: '📈', descripcion: 'Completa tu primer nivel de Regresión y Predicción.' },
    { tipo: 'minijuegos', minijuego: 'regresion', condicion: 5, nombre: 'Analista de Datos',       icono: '📈', descripcion: 'Completa los 5 niveles de Regresión y Predicción.' },
    { tipo: 'minijuegos', minijuego: null,        condicion: 4, nombre: 'Polímata',                icono: '🏆', descripcion: 'Completa al menos un nivel de los 4 minijuegos.' }
];

async function run() {
    console.log('🚀 AGREGANDO LOGROS DE MINIJUEGOS');
    console.log('═════════════════════════════════\n');

    const connected = await testConnection();
    if (!connected) { process.exit(1); }

    try {
        // 1. Agregar columna minijuego si no existe
        const [cols] = await pool.query(
            "SELECT COLUMN_NAME FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'logros' AND COLUMN_NAME = 'minijuego'"
        );
        if (cols.length === 0) {
            await pool.query("ALTER TABLE logros ADD COLUMN minijuego VARCHAR(30) NULL AFTER tipo");
            console.log('  ✅ Columna logros.minijuego añadida');
        } else {
            console.log('  ℹ️ Columna logros.minijuego ya existe');
        }

        // 2. Extender el enum de tipo
        const [ct] = await pool.query(
            "SELECT COLUMN_TYPE FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'logros' AND COLUMN_NAME = 'tipo'"
        );
        const tipo = ct[0].COLUMN_TYPE || '';
        if (!tipo.includes('minijuegos')) {
            await pool.query("ALTER TABLE logros MODIFY tipo ENUM('partidas','niveles','estrellas','especial','minijuegos') NOT NULL");
            console.log('  ✅ Enum logros.tipo extendido con minijuegos');
        } else {
            console.log('  ℹ️ Enum ya incluye minijuegos');
        }

        // 3. Insertar logros
        console.log('\n📥 Insertando logros...');
        for (const l of LOGROS) {
            const [ex] = await pool.query('SELECT id FROM logros WHERE nombre = ?', [l.nombre]);
            if (ex.length === 0) {
                await pool.query(
                    'INSERT INTO logros (nombre, descripcion, icono, tipo, condicion, minijuego) VALUES (?, ?, ?, ?, ?, ?)',
                    [l.nombre, l.descripcion, l.icono, l.tipo, l.condicion, l.minijuego || null]
                );
                console.log(`  ✅ ${l.nombre}`);
            } else {
                console.log(`  ℹ️ Ya existe: ${l.nombre}`);
            }
        }

        const [res] = await pool.query("SELECT COUNT(*) AS c FROM logros WHERE tipo = 'minijuegos'");
        console.log(`\n📊 Total de logros de minijuegos: ${res[0].c}`);
        console.log('🎉 LISTO');
    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await pool.end();
    }
}

run();