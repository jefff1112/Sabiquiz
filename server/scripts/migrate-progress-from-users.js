// ============================================
// SCRIPT PARA MIGRAR PROGRESO DESDE users/quizProgress
// ============================================
require('dotenv').config();
const { pool, testConnection } = require('../config/database');
const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Configurar Firebase
if (!admin.apps.length) {
    const serviceAccountPath = path.join(__dirname, '../../serviceAccountKey.json');
    if (!fs.existsSync(serviceAccountPath)) {
        console.error('❌ Archivo serviceAccountKey.json no encontrado');
        process.exit(1);
    }
    const serviceAccount = require(serviceAccountPath);
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

const firestore = admin.firestore();

// ============================================
// FUNCIÓN PARA OBTENER ID DE MATERIA POR NOMBRE
// ============================================
async function getMateriaId(nombre) {
    const [rows] = await pool.query(
        'SELECT id FROM materias WHERE LOWER(nombre) = LOWER(?)',
        [nombre]
    );
    return rows.length > 0 ? rows[0].id : null;
}

// ============================================
// FUNCIÓN PARA OBTENER ID DE NIVEL
// ============================================
async function getNivelId(materiaId, numero) {
    const [rows] = await pool.query(
        'SELECT id FROM niveles WHERE materia_id = ? AND numero = ?',
        [materiaId, parseInt(numero)]
    );
    return rows.length > 0 ? rows[0].id : null;
}

// ============================================
// FUNCIÓN PRINCIPAL
// ============================================
async function migrateProgress() {
    console.log('🚀 MIGRANDO PROGRESO DESDE users/quizProgress');
    console.log('═══════════════════════════════════════════════\n');

    // Verificar conexión a MySQL
    const connected = await testConnection();
    if (!connected) {
        console.error('❌ No se pudo conectar a MySQL');
        process.exit(1);
    }

    try {
        // ============================================
        // 1. OBTENER TODOS LOS USUARIOS DE FIREBASE
        // ============================================
        console.log('📡 Obteniendo usuarios desde Firebase...');
        const snapshot = await firestore.collection('users').get();
        
        if (snapshot.empty) {
            console.log('⚠️ No hay usuarios en Firebase');
            return;
        }

        console.log(`✅ ${snapshot.size} usuarios encontrados\n`);

        let totalUsuarios = 0;
        let totalProgresos = 0;
        let totalEstrellas = 0;
        let errores = 0;

        // ============================================
        // 2. PROCESAR CADA USUARIO
        // ============================================
        for (const doc of snapshot.docs) {
            const uid = doc.id;
            const data = doc.data();
            
            console.log(`📄 Usuario: ${data.displayName || 'sin nombre'} (${uid})`);
            
            try {
                // Verificar si el usuario existe en MySQL
                const [userExists] = await pool.query(
                    'SELECT id FROM usuarios WHERE id = ?',
                    [uid]
                );
                
                if (userExists.length === 0) {
                    console.log(`   ⚠️ Usuario ${uid} no encontrado en MySQL, creando...`);
                    await pool.query(
                        `INSERT INTO usuarios (id, username, email, avatar_url) 
                         VALUES (?, ?, ?, ?)`,
                        [uid, data.displayName || 'usuario', data.email || '', data.photoURL || null]
                    );
                }

                // ============================================
                // 2.1 ACTUALIZAR ESTADÍSTICAS DEL USUARIO
                // ============================================
                const level = data.level || 1;
                const quizXp = data.quizXp || 0;
                const pvpXp = data.pvpXp || 0;
                const matchesPlayed = data.matchesPlayed || 0;
                const matchesWon = data.matchesWon || 0;

                await pool.query(
                    `UPDATE usuarios SET 
                        username = ?,
                        avatar_url = ?,
                        partidas_jugadas = ?,
                        partidas_ganadas = ?
                     WHERE id = ?`,
                    [
                        data.displayName || 'usuario',
                        data.photoURL || null,
                        matchesPlayed,
                        matchesWon,
                        uid
                    ]
                );

                // ============================================
                // 2.2 PROCESAR quizProgress
                // ============================================
                const quizProgress = data.quizProgress || {};
                const materiasKeys = Object.keys(quizProgress);

                if (materiasKeys.length === 0) {
                    console.log(`   ℹ️ Sin progreso de quizzes`);
                }

                for (const materiaNombre of materiasKeys) {
                    const niveles = quizProgress[materiaNombre];
                    console.log(`   📚 Materia: ${materiaNombre}`);
                    
                    // Obtener ID de la materia en MySQL
                    const materiaId = await getMateriaId(materiaNombre);
                    if (!materiaId) {
                        console.log(`      ⚠️ Materia "${materiaNombre}" no encontrada en MySQL`);
                        continue;
                    }

                    // Procesar cada nivel
                    for (const [nivelNumero, estrellas] of Object.entries(niveles)) {
                        console.log(`      📖 Nivel ${nivelNumero}: ${estrellas} estrellas`);
                        
                        const nivelId = await getNivelId(materiaId, nivelNumero);
                        if (!nivelId) {
                            console.log(`         ⚠️ Nivel ${nivelNumero} no encontrado`);
                            continue;
                        }

                        // Calcular puntaje basado en estrellas
                        const puntaje = estrellas * 33; // 3 estrellas = 100 puntos
                        const completado = estrellas > 0;

                        // Guardar en progreso_usuario
                        await pool.query(
                            `INSERT INTO progreso_usuario 
                             (usuario_id, nivel_id, puntaje, estrellas, completado, fecha_completado)
                             VALUES (?, ?, ?, ?, ?, NOW())
                             ON DUPLICATE KEY UPDATE
                             puntaje = VALUES(puntaje),
                             estrellas = VALUES(estrellas),
                             completado = VALUES(completado),
                             fecha_completado = NOW()`,
                            [uid, nivelId, puntaje, estrellas, completado]
                        );
                        
                        totalProgresos++;
                        totalEstrellas += estrellas;
                    }
                }

                totalUsuarios++;

            } catch (error) {
                console.error(`   ❌ Error procesando usuario ${uid}:`, error.message);
                errores++;
            }
            console.log('');
        }

        // ============================================
        // 3. RESULTADOS
        // ============================================
        console.log('═══════════════════════════════════════════════');
        console.log('📊 RESULTADOS DE LA MIGRACIÓN');
        console.log('═══════════════════════════════════════════════');
        console.log(`  ✅ Usuarios procesados: ${totalUsuarios}`);
        console.log(`  ✅ Progresos migrados: ${totalProgresos}`);
        console.log(`  ⭐ Total estrellas: ${totalEstrellas}`);
        console.log(`  ❌ Errores: ${errores}`);

        // Verificar datos finales
        const [stats] = await pool.query(`
            SELECT 
                COUNT(DISTINCT usuario_id) as usuarios_con_progreso,
                COUNT(*) as total_progresos,
                SUM(estrellas) as total_estrellas
            FROM progreso_usuario
        `);
        
        console.log(`\n📈 Estadísticas finales en MySQL:`);
        console.log(`  Usuarios con progreso: ${stats[0].usuarios_con_progreso}`);
        console.log(`  Total registros de progreso: ${stats[0].total_progresos}`);
        console.log(`  Total estrellas acumuladas: ${stats[0].total_estrellas || 0}`);

        console.log('\n🎉 ¡Migración de progreso completada!');
        console.log('✅ Ahora los usuarios deberían tener sus niveles y XP correctos');

    } catch (error) {
        console.error('❌ Error en la migración:', error);
    } finally {
        await pool.end();
    }
}

migrateProgress();