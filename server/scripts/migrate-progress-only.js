// ============================================
// SCRIPT PARA MIGRAR SOLO EL PROGRESO
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
// FUNCIÓN PRINCIPAL
// ============================================
async function migrateProgress() {
    console.log('🚀 MIGRANDO PROGRESO DE FIREBASE A MYSQL');
    console.log('═══════════════════════════════════════════════\n');

    // Verificar conexión a MySQL
    const connected = await testConnection();
    if (!connected) {
        console.error('❌ No se pudo conectar a MySQL');
        process.exit(1);
    }

    try {
        // ============================================
        // 1. BUSCAR TODAS LAS COLECCIONES POSIBLES
        // ============================================
        console.log('📡 Buscando colecciones de progreso en Firebase...');
        
        const coleccionesPosibles = [
            'userProgress', 
            'progress', 
            'progreso', 
            'usersProgress',
            'quizProgress',
            'levelsProgress',
            'progressData'
        ];

        let coleccionEncontrada = null;
        let snapshot = null;

        for (const nombre of coleccionesPosibles) {
            try {
                const testSnapshot = await firestore.collection(nombre).limit(1).get();
                if (!testSnapshot.empty) {
                    coleccionEncontrada = nombre;
                    snapshot = await firestore.collection(nombre).get();
                    console.log(`✅ Colección encontrada: "${nombre}" con ${snapshot.size} documentos`);
                    break;
                }
            } catch (error) {
                // La colección no existe, continuar
            }
        }

        if (!coleccionEncontrada || !snapshot) {
            console.log('⚠️ No se encontró ninguna colección de progreso');
            console.log('📝 Revisa en Firebase Console cómo se llama tu colección de progreso');
            process.exit(1);
        }

        // ============================================
        // 2. PROCESAR CADA DOCUMENTO DE PROGRESO
        // ============================================
        console.log('\n📥 Procesando documentos de progreso...');
        
        let progresosMigrados = 0;
        let errores = 0;
        let usuariosActualizados = 0;

        for (const doc of snapshot.docs) {
            try {
                const data = doc.data();
                console.log(`\n📄 Documento: ${doc.id}`);
                console.log(`   Datos:`, JSON.stringify(data, null, 2));

                // ============================================
                // 2.1 OBTENER EL ID DEL USUARIO
                // ============================================
                const userId = data.userId || data.usuarioId || data.user_id || data.uid || data.user;
                
                if (!userId) {
                    console.warn(`⚠️ Documento ${doc.id} sin userId, saltando...`);
                    errores++;
                    continue;
                }

                // ============================================
                // 2.2 VERIFICAR QUE EL USUARIO EXISTE EN MYSQL
                // ============================================
                const [userExists] = await pool.query(
                    'SELECT id, username FROM usuarios WHERE id = ?',
                    [userId]
                );
                
                if (userExists.length === 0) {
                    console.warn(`⚠️ Usuario ${userId} no encontrado en MySQL, saltando...`);
                    errores++;
                    continue;
                }

                console.log(`   👤 Usuario: ${userExists[0].username} (${userId})`);

                // ============================================
                // 2.3 PROCESAR EL PROGRESO SEGÚN LA ESTRUCTURA
                // ============================================
                
                // ESTRUCTURA 1: { subjectId: { levelId: { stars, score, completed } } }
                if (data.quizProgress || data.progress) {
                    const progressData = data.quizProgress || data.progress;
                    console.log(`   📊 Progreso encontrado:`, progressData);
                    
                    for (const [materiaNombre, niveles] of Object.entries(progressData)) {
                        console.log(`      📚 Materia: ${materiaNombre}`);
                        
                        // Obtener ID de la materia
                        const [materiaRows] = await pool.query(
                            'SELECT id FROM materias WHERE nombre = ? OR LOWER(nombre) = LOWER(?)',
                            [materiaNombre, materiaNombre]
                        );
                        
                        if (materiaRows.length === 0) {
                            console.warn(`         ⚠️ Materia "${materiaNombre}" no encontrada`);
                            continue;
                        }
                        const materiaId = materiaRows[0].id;
                        
                        for (const [nivelNumero, nivelData] of Object.entries(niveles)) {
                            console.log(`         📖 Nivel: ${nivelNumero}`);
                            
                            // Obtener ID del nivel
                            const [nivelRows] = await pool.query(
                                'SELECT id FROM niveles WHERE materia_id = ? AND numero = ?',
                                [materiaId, parseInt(nivelNumero)]
                            );
                            
                            if (nivelRows.length === 0) {
                                console.warn(`            ⚠️ Nivel ${nivelNumero} no encontrado`);
                                continue;
                            }
                            const nivelId = nivelRows[0].id;
                            
                            // Datos del nivel
                            const estrellas = nivelData.stars || 0;
                            const puntaje = nivelData.score || 0;
                            const completado = nivelData.completed || nivelData.completado || false;
                            
                            // Guardar en MySQL
                            await pool.query(
                                `INSERT INTO progreso_usuario 
                                 (usuario_id, nivel_id, puntaje, estrellas, completado, fecha_completado)
                                 VALUES (?, ?, ?, ?, ?, NOW())
                                 ON DUPLICATE KEY UPDATE
                                 puntaje = VALUES(puntaje),
                                 estrellas = VALUES(estrellas),
                                 completado = VALUES(completado),
                                 fecha_completado = NOW()`,
                                [userId, nivelId, puntaje, estrellas, completado]
                            );
                            progresosMigrados++;
                            
                            // Actualizar estadísticas del usuario
                            if (completado) {
                                await pool.query(
                                    `UPDATE usuarios 
                                     SET partidas_jugadas = partidas_jugadas + 1
                                     WHERE id = ?`,
                                    [userId]
                                );
                                usuariosActualizados++;
                            }
                        }
                    }
                }
                // ESTRUCTURA 2: { nivelId, stars, score, completed } (progreso plano)
                else if (data.nivelId || data.levelId) {
                    const nivelIdFirebase = data.nivelId || data.levelId;
                    const estrellas = data.stars || 0;
                    const puntaje = data.score || 0;
                    const completado = data.completed || data.completado || false;
                    
                    // Buscar el nivel en MySQL
                    const [nivelRows] = await pool.query(
                        'SELECT id FROM niveles WHERE id = ? OR numero = ?',
                        [nivelIdFirebase, parseInt(nivelIdFirebase)]
                    );
                    
                    if (nivelRows.length > 0) {
                        await pool.query(
                            `INSERT INTO progreso_usuario 
                             (usuario_id, nivel_id, puntaje, estrellas, completado, fecha_completado)
                             VALUES (?, ?, ?, ?, ?, NOW())
                             ON DUPLICATE KEY UPDATE
                             puntaje = VALUES(puntaje),
                             estrellas = VALUES(estrellas),
                             completado = VALUES(completado),
                             fecha_completado = NOW()`,
                            [userId, nivelRows[0].id, puntaje, estrellas, completado]
                        );
                        progresosMigrados++;
                    }
                }
                // ESTRUCTURA 3: { subject: "Ciencias", level: 1, stars: 3 }
                else if (data.subject || data.materia) {
                    const materiaNombre = data.subject || data.materia;
                    const nivelNumero = data.level || data.nivel || 1;
                    const estrellas = data.stars || 0;
                    const puntaje = data.score || 0;
                    const completado = data.completed || data.completado || false;
                    
                    // Obtener IDs
                    const [materiaRows] = await pool.query(
                        'SELECT id FROM materias WHERE nombre = ? OR LOWER(nombre) = LOWER(?)',
                        [materiaNombre, materiaNombre]
                    );
                    
                    if (materiaRows.length > 0) {
                        const [nivelRows] = await pool.query(
                            'SELECT id FROM niveles WHERE materia_id = ? AND numero = ?',
                            [materiaRows[0].id, parseInt(nivelNumero)]
                        );
                        
                        if (nivelRows.length > 0) {
                            await pool.query(
                                `INSERT INTO progreso_usuario 
                                 (usuario_id, nivel_id, puntaje, estrellas, completado, fecha_completado)
                                 VALUES (?, ?, ?, ?, ?, NOW())
                                 ON DUPLICATE KEY UPDATE
                                 puntaje = VALUES(puntaje),
                                 estrellas = VALUES(estrellas),
                                 completado = VALUES(completado),
                                 fecha_completado = NOW()`,
                                [userId, nivelRows[0].id, puntaje, estrellas, completado]
                            );
                            progresosMigrados++;
                        }
                    }
                }

            } catch (error) {
                console.error(`❌ Error procesando documento ${doc.id}:`, error.message);
                errores++;
            }
        }

        // ============================================
        // 3. RESULTADOS
        // ============================================
        console.log('\n═══════════════════════════════════════════════');
        console.log('📊 RESULTADOS DE LA MIGRACIÓN');
        console.log('═══════════════════════════════════════════════');
        console.log(`  ✅ Progresos migrados: ${progresosMigrados}`);
        console.log(`  ✅ Usuarios actualizados: ${usuariosActualizados}`);
        console.log(`  ❌ Errores: ${errores}`);

        // Verificar datos
        const [stats] = await pool.query(`
            SELECT 
                COUNT(*) as total_progresos,
                SUM(estrellas) as total_estrellas
            FROM progreso_usuario
        `);
        
        console.log(`\n📈 Estadísticas finales:`);
        console.log(`  Total registros de progreso: ${stats[0].total_progresos}`);
        console.log(`  Total estrellas acumuladas: ${stats[0].total_estrellas || 0}`);

        console.log('\n🎉 ¡Migración de progreso completada!');

    } catch (error) {
        console.error('❌ Error en la migración:', error);
    } finally {
        await pool.end();
    }
}

migrateProgress();