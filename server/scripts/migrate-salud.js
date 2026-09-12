// ============================================
// SCRIPT: MIGRAR PREGUNTAS DE SALUD (30 NIVELES)
// ============================================
require('dotenv').config();
const { pool, testConnection } = require('../config/database');

// Importar los niveles desde el archivo
const { levels } = require('../../materias/salud-data.js');

async function migrateSaludQuestions() {
    console.log('🚀 MIGRANDO PREGUNTAS DE SALUD (30 NIVELES)');
    console.log('═══════════════════════════════════════════════\n');

    const connected = await testConnection();
    if (!connected) {
        console.error('❌ No se pudo conectar a MySQL');
        process.exit(1);
    }

    try {
        // 1. Obtener ID de la materia "Salud"
        const [materiaRows] = await pool.query(
            'SELECT id FROM materias WHERE nombre = ?',
            ['Salud']
        );

        if (materiaRows.length === 0) {
            console.error('❌ Materia "Salud" no encontrada');
            console.log('📚 Materias disponibles:');
            const [materias] = await pool.query('SELECT id, nombre FROM materias');
            materias.forEach(m => console.log(`  - ${m.nombre} (ID: ${m.id})`));
            process.exit(1);
        }

        const materiaId = materiaRows[0].id;
        console.log(`📚 Materia encontrada: Salud (ID: ${materiaId})`);

        // 2. Limpiar datos existentes de Salud
        console.log('\n🗑️ Eliminando datos existentes de Salud...');

        await pool.query(
            `DELETE o FROM opciones o
             JOIN preguntas p ON o.pregunta_id = p.id
             JOIN niveles n ON p.nivel_id = n.id
             WHERE n.materia_id = ?`,
            [materiaId]
        );
        console.log('  ✅ Opciones eliminadas');

        await pool.query(
            `DELETE p FROM preguntas p
             JOIN niveles n ON p.nivel_id = n.id
             WHERE n.materia_id = ?`,
            [materiaId]
        );
        console.log('  ✅ Preguntas eliminadas');

        await pool.query(
            'DELETE FROM niveles WHERE materia_id = ?',
            [materiaId]
        );
        console.log('  ✅ Niveles eliminados');

        // 3. Insertar los 30 niveles
        console.log('\n📥 Insertando 30 niveles...');
        for (const level of levels) {
            await pool.query(
                `INSERT INTO niveles (materia_id, numero, titulo, passing_score, orden)
                 VALUES (?, ?, ?, ?, ?)`,
                [materiaId, level.id, level.title, level.passingScore, level.id]
            );
        }
        console.log(`  ✅ ${levels.length} niveles creados`);

        // 4. Insertar preguntas y opciones (SOLO ESPAÑOL)
        console.log('\n📥 Insertando preguntas y opciones en español...');
        let totalPreguntas = 0;
        let totalOpciones = 0;

        for (const level of levels) {
            const [nivelRows] = await pool.query(
                'SELECT id FROM niveles WHERE materia_id = ? AND numero = ?',
                [materiaId, level.id]
            );

            if (nivelRows.length === 0) continue;
            const nivelId = nivelRows[0].id;

            for (const q of level.questions) {
                const textoJSON = JSON.stringify({ es: q.question.es });

                const [preguntaResult] = await pool.query(
                    `INSERT INTO preguntas (nivel_id, texto, dificultad, orden)
                     VALUES (?, ?, ?, ?)`,
                    [nivelId, textoJSON, 'easy', 1]
                );

                const preguntaId = preguntaResult.insertId;
                totalPreguntas++;

                const opciones = q.options.es;
                const correcta = q.correctAnswer.es;

                for (let i = 0; i < opciones.length; i++) {
                    const esCorrecta = opciones[i] === correcta;
                    const opcionJSON = JSON.stringify({ es: opciones[i] });

                    await pool.query(
                        `INSERT INTO opciones (pregunta_id, texto, es_correcta, orden)
                         VALUES (?, ?, ?, ?)`,
                        [preguntaId, opcionJSON, esCorrecta, i + 1]
                    );
                    totalOpciones++;
                }
            }
        }

        console.log(`  ✅ ${totalPreguntas} preguntas insertadas`);
        console.log(`  ✅ ${totalOpciones} opciones insertadas`);

        // 5. Verificar resultados
        console.log('\n📊 VERIFICANDO RESULTADOS');
        const [verificacion] = await pool.query(
            `SELECT 
                COUNT(DISTINCT p.id) as preguntas,
                COUNT(o.id) as opciones,
                COUNT(DISTINCT n.id) as niveles
             FROM niveles n
             LEFT JOIN preguntas p ON n.id = p.nivel_id
             LEFT JOIN opciones o ON p.id = o.pregunta_id
             WHERE n.materia_id = ?`,
            [materiaId]
        );

        console.log(`  📖 Niveles: ${verificacion[0].niveles}`);
        console.log(`  ❓ Preguntas: ${verificacion[0].preguntas}`);
        console.log(`  🔘 Opciones: ${verificacion[0].opciones}`);

        console.log('\n🎉 ¡MIGRACIÓN DE SALUD COMPLETADA!');

    } catch (error) {
        console.error('❌ Error en la migración:', error);
    } finally {
        await pool.end();
    }
}

migrateSaludQuestions();