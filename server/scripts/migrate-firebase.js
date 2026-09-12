// ============================================
// SCRIPT DE MIGRACIÓN: FIREBASE → MYSQL
// ============================================
// Este script lee los datos de Firebase Firestore
// y los inserta en tu base de datos MySQL
// ============================================

require('dotenv').config();
const { pool, testConnection } = require('../config/database');
const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// ============================================
// 1. CONFIGURACIÓN DE FIREBASE
// ============================================
console.log('📡 Conectando a Firebase...');

// Verificar si ya hay una app de Firebase inicializada
if (!admin.apps.length) {
    try {
        // Usar las credenciales del archivo serviceAccountKey.json
        // que ya tienes en tu proyecto
        const serviceAccountPath = path.join(__dirname, '../../serviceAccountKey.json');
        
        if (!fs.existsSync(serviceAccountPath)) {
            console.error('❌ Archivo serviceAccountKey.json no encontrado en la raíz del proyecto');
            console.error('⚠️  Asegúrate de tener el archivo de credenciales de Firebase');
            process.exit(1);
        }

        const serviceAccount = require(serviceAccountPath);
        
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
        console.log('✅ Firebase conectado correctamente');
    } catch (error) {
        console.error('❌ Error conectando a Firebase:', error.message);
        process.exit(1);
    }
}

const firestore = admin.firestore();

// ============================================
// 2. FUNCIONES DE MIGRACIÓN
// ============================================

// 2.1 SEMILLA DE MATERIAS Y NIVELES
async function seedMateriasYNiveles() {
    console.log('\n📥 Insertando materias y niveles base...');

    const materias = [
        { nombre: 'Ciencias', descripcion: 'Preguntas sobre ciencia y naturaleza', icono: 'ciencias.png', orden: 1 },
        { nombre: 'Matemáticas', descripcion: 'Preguntas de matemáticas y lógica', icono: 'mat.png', orden: 2 },
        { nombre: 'Software', descripcion: 'Preguntas sobre desarrollo de software', icono: 'programacion.png', orden: 3 },
        { nombre: 'Salud', descripcion: 'Preguntas sobre salud y medicina', icono: 'salud.png', orden: 4 },
        { nombre: 'Lenguaje', descripcion: 'Preguntas de lenguaje y literatura', icono: 'lenguaje.png', orden: 5 },
        { nombre: 'Sociales', descripcion: 'Preguntas de ciencias sociales', icono: 'sociales.png', orden: 6 },
        { nombre: 'Inglés', descripcion: 'Preguntas de inglés', icono: 'ingles.png', orden: 7 }
    ];

    let totalMaterias = 0;
    let totalNiveles = 0;

    for (const materia of materias) {
        // Verificar si la materia ya existe
        const [existente] = await pool.query(
            'SELECT id FROM materias WHERE nombre = ?',
            [materia.nombre]
        );

        let materiaId;
        if (existente.length === 0) {
            const [result] = await pool.query(
                `INSERT INTO materias (nombre, descripcion, icono_url, orden) 
                 VALUES (?, ?, ?, ?)`,
                [materia.nombre, materia.descripcion, materia.icono, materia.orden]
            );
            materiaId = result.insertId;
            totalMaterias++;
        } else {
            materiaId = existente[0].id;
        }

        // Insertar 5 niveles por materia
        for (let i = 1; i <= 5; i++) {
            const [nivelExistente] = await pool.query(
                'SELECT id FROM niveles WHERE materia_id = ? AND numero = ?',
                [materiaId, i]
            );
            if (nivelExistente.length === 0) {
                await pool.query(
                    `INSERT INTO niveles (materia_id, numero, titulo, passing_score, orden) 
                     VALUES (?, ?, ?, ?, ?)`,
                    [materiaId, i, `Nivel ${i}`, 0.60, i]
                );
                totalNiveles++;
            }
        }
    }
    console.log(`✅ ${totalMaterias} materias y ${totalNiveles} niveles insertados/verificados`);
}

// 2.2 MIGRAR USUARIOS DESDE FIREBASE
async function migrateUsers() {
    console.log('\n📥 Migrando usuarios desde Firebase...');
    
    try {
        const snapshot = await firestore.collection('users').get();
        
        if (snapshot.empty) {
            console.log('⚠️  No se encontraron usuarios en Firebase');
            return 0;
        }

        const usuarios = [];
        let usuariosMigrados = 0;

        for (const doc of snapshot.docs) {
            const data = doc.data();
            
            // Mapear los campos de Firebase a MySQL
            usuarios.push([
                doc.id, // uid de Firebase
                data.username || data.displayName || 'usuario_anonimo',
                data.email || '',
                data.passwordHash || data.password || '',
                data.createdAt ? new Date(data.createdAt.toDate()) : new Date(),
                data.lastLogin ? new Date(data.lastLogin.toDate()) : null,
                data.avatarUrl || data.photoURL || null,
                data.partidasJugadas || 0,
                data.partidasGanadas || 0,
                data.rachaActual || 0,
                data.mejorRacha || 0
            ]);
        }

        if (usuarios.length > 0) {
            const sql = `
                INSERT IGNORE INTO usuarios 
                (id, username, email, password_hash, fecha_registro, ultima_conexion, avatar_url, 
                 partidas_jugadas, partidas_ganadas, racha_actual, mejor_racha)
                VALUES ?
            `;
            
            // Insertar en lotes de 100 para mejor rendimiento
            const batchSize = 100;
            for (let i = 0; i < usuarios.length; i += batchSize) {
                const batch = usuarios.slice(i, i + batchSize);
                await pool.query(sql, [batch]);
            }
            
            usuariosMigrados = usuarios.length;
            console.log(`✅ ${usuariosMigrados} usuarios migrados correctamente`);
        }
        return usuariosMigrados;
    } catch (error) {
        console.error('❌ Error migrando usuarios:', error.message);
        throw error;
    }
}

// 2.3 MIGRAR PREGUNTAS DESDE ARCHIVOS JS
async function migrateQuestionsFromJS() {
    console.log('\n📥 Migrando preguntas desde archivos JS locales...');

    const materiasDir = path.join(__dirname, '../../materias');
    if (!fs.existsSync(materiasDir)) {
        console.log('⚠️  Carpeta "materias" no encontrada en la raíz del proyecto');
        console.log('ℹ️  Saltando migración de preguntas desde archivos JS');
        return 0;
    }

    const files = fs.readdirSync(materiasDir);
    let totalPreguntas = 0;
    let totalOpciones = 0;

    for (const file of files) {
        // Solo procesar archivos que terminan con -data.js
        if (!file.endsWith('-data.js')) continue;

        const materiaNombre = file.replace('-data.js', '');
        console.log(`  📖 Procesando: ${materiaNombre}`);

        try {
            // Cargar el archivo de preguntas
            const filePath = path.join(materiasDir, file);
            // Limpiar caché para recargar el archivo si se ejecuta varias veces
            delete require.cache[require.resolve(filePath)];
            const contenido = require(filePath);
            
            // El archivo puede exportar un array directamente o tener una propiedad 'preguntas'
            const preguntas = contenido.preguntas || contenido;
            
            if (!Array.isArray(preguntas) || preguntas.length === 0) {
                console.warn(`    ⚠️ El archivo ${file} no contiene un array de preguntas`);
                continue;
            }

            // Obtener ID de la materia
            const [materiaRows] = await pool.query(
                'SELECT id FROM materias WHERE nombre = ?',
                [materiaNombre]
            );
            if (materiaRows.length === 0) {
                console.warn(`    ⚠️ Materia "${materiaNombre}" no existe en BD, saltando...`);
                continue;
            }
            const materiaId = materiaRows[0].id;

            // Obtener nivel 1 de esta materia
            const [nivelRows] = await pool.query(
                'SELECT id FROM niveles WHERE materia_id = ? AND numero = 1',
                [materiaId]
            );
            if (nivelRows.length === 0) {
                console.warn(`    ⚠️ Nivel 1 para "${materiaNombre}" no encontrado, saltando...`);
                continue;
            }
            const nivelId = nivelRows[0].id;

            // Insertar preguntas
            let preguntasInsertadas = 0;
            let opcionesInsertadas = 0;

            for (const [index, p] of preguntas.entries()) {
                // Validar que la pregunta tenga los campos necesarios
                if (!p.pregunta || !p.opciones || !Array.isArray(p.opciones)) {
                    console.warn(`    ⚠️ Pregunta ${index + 1} inválida, saltando...`);
                    continue;
                }

                const textoJSON = JSON.stringify({ es: p.pregunta });
                const dificultad = p.dificultad || 'easy';

                const [result] = await pool.query(
                    `INSERT INTO preguntas (nivel_id, texto, dificultad, orden) 
                     VALUES (?, ?, ?, ?)`,
                    [nivelId, textoJSON, dificultad, index + 1]
                );
                const preguntaId = result.insertId;
                preguntasInsertadas++;

                // Insertar opciones
                for (const [optIndex, opt] of p.opciones.entries()) {
                    const esCorrecta = optIndex === p.correcta;
                    const textoOptJSON = JSON.stringify({ es: opt });
                    await pool.query(
                        `INSERT INTO opciones (pregunta_id, texto, es_correcta, orden) 
                         VALUES (?, ?, ?, ?)`,
                        [preguntaId, textoOptJSON, esCorrecta, optIndex + 1]
                    );
                    opcionesInsertadas++;
                }
            }

            totalPreguntas += preguntasInsertadas;
            totalOpciones += opcionesInsertadas;
            console.log(`    ✅ ${preguntasInsertadas} preguntas y ${opcionesInsertadas} opciones migradas`);

        } catch (error) {
            console.error(`    ❌ Error al procesar ${file}:`, error.message);
        }
    }

    console.log(`✅ Total: ${totalPreguntas} preguntas y ${totalOpciones} opciones migradas`);
    return totalPreguntas;
}

// 2.4 MIGRAR PROGRESO DE USUARIOS DESDE FIREBASE
async function migrateProgress() {
    console.log('\n📥 Migrando progreso de usuarios desde Firebase...');

    try {
        // Buscar la colección de progreso en Firebase
        // Puede llamarse 'userProgress', 'progress', 'progreso', etc.
        let snapshot;
        let coleccionEncontrada = false;
        
        const posiblesNombres = ['userProgress', 'progress', 'progreso', 'usersProgress'];
        
        for (const nombre of posiblesNombres) {
            try {
                snapshot = await firestore.collection(nombre).limit(1).get();
                if (!snapshot.empty) {
                    coleccionEncontrada = true;
                    console.log(`ℹ️  Colección de progreso encontrada: "${nombre}"`);
                    // Obtener todos los documentos
                    snapshot = await firestore.collection(nombre).get();
                    break;
                }
            } catch (error) {
                // La colección no existe, continuar con la siguiente
            }
        }

        if (!coleccionEncontrada) {
            console.log('⚠️  No se encontró colección de progreso en Firebase');
            console.log('ℹ️  Saltando migración de progreso');
            return 0;
        }

        if (snapshot.empty) {
            console.log('ℹ️  No hay documentos de progreso en Firebase');
            return 0;
        }

        let progresosMigrados = 0;
        let errores = 0;

        for (const doc of snapshot.docs) {
            try {
                const data = doc.data();
                
                // Intentar obtener el userId de diferentes formas
                const userId = data.userId || data.usuarioId || data.user_id || data.uid || data.user;
                
                if (!userId) {
                    console.warn(`⚠️  Documento ${doc.id} sin userId, saltando...`);
                    errores++;
                    continue;
                }

                // Verificar que el usuario existe en MySQL
                const [userExists] = await pool.query(
                    'SELECT id FROM usuarios WHERE id = ?',
                    [userId]
                );
                if (userExists.length === 0) {
                    // Si el usuario no existe, lo creamos con datos básicos
                    await pool.query(
                        `INSERT IGNORE INTO usuarios (id, username, email) 
                         VALUES (?, ?, ?)`,
                        [userId, `usuario_${userId.substring(0, 8)}`, '']
                    );
                }

                // Determinar materia y nivel
                const materiaNombre = data.materia || data.materia_nombre || data.materiaId || 'Ciencias';
                const nivelNumero = data.nivel || data.nivel_numero || 1;

                // Obtener IDs
                const [materiaRows] = await pool.query(
                    'SELECT id FROM materias WHERE nombre = ?',
                    [materiaNombre]
                );
                if (materiaRows.length === 0) {
                    // Si no existe la materia, la creamos
                    const [result] = await pool.query(
                        `INSERT INTO materias (nombre, descripcion, orden) 
                         VALUES (?, ?, ?)`,
                        [materiaNombre, `Materia: ${materiaNombre}`, 99]
                    );
                    const materiaId = result.insertId;
                    
                    // Crear nivel 1 para esta materia
                    await pool.query(
                        `INSERT INTO niveles (materia_id, numero, titulo, passing_score) 
                         VALUES (?, 1, 'Nivel 1', 0.60)`,
                        [materiaId]
                    );
                    
                    const [materiaRows2] = await pool.query(
                        'SELECT id FROM materias WHERE nombre = ?',
                        [materiaNombre]
                    );
                    const [nivelRows] = await pool.query(
                        'SELECT id FROM niveles WHERE materia_id = ? AND numero = ?',
                        [materiaRows2[0].id, nivelNumero]
                    );
                    
                    if (nivelRows.length === 0) continue;
                    const nivelId = nivelRows[0].id;
                }
                
                const [materiaRows2] = await pool.query(
                    'SELECT id FROM materias WHERE nombre = ?',
                    [materiaNombre]
                );
                const [nivelRows] = await pool.query(
                    'SELECT id FROM niveles WHERE materia_id = ? AND numero = ?',
                    [materiaRows2[0].id, nivelNumero]
                );
                if (nivelRows.length === 0) continue;
                const nivelId = nivelRows[0].id;

                // Insertar progreso
                await pool.query(
                    `INSERT INTO progreso_usuario 
                     (usuario_id, nivel_id, completado, puntaje, estrellas, fecha_completado)
                     VALUES (?, ?, ?, ?, ?, ?)
                     ON DUPLICATE KEY UPDATE
                     completado = VALUES(completado),
                     puntaje = VALUES(puntaje),
                     estrellas = VALUES(estrellas),
                     fecha_completado = VALUES(fecha_completado)`,
                    [
                        userId,
                        nivelId,
                        data.completed || data.completado || false,
                        data.score || data.puntaje || 0,
                        data.stars || data.estrellas || 0,
                        data.completedAt ? new Date(data.completedAt.toDate()) : 
                        data.fecha_completado ? new Date(data.fecha_completado.toDate()) : null
                    ]
                );
                progresosMigrados++;
            } catch (error) {
                console.error(`❌ Error migrando progreso del documento ${doc.id}:`, error.message);
                errores++;
            }
        }

        console.log(`✅ ${progresosMigrados} progresos migrados correctamente`);
        if (errores > 0) {
            console.log(`⚠️  ${errores} errores encontrados durante la migración`);
        }
        return progresosMigrados;
    } catch (error) {
        console.error('❌ Error migrando progreso:', error.message);
        return 0;
    }
}

// 2.5 FUNCIÓN PARA OBTENER ESTADÍSTICAS
async function getEstadisticas() {
    try {
        const [stats] = await pool.query(`
            SELECT 
                (SELECT COUNT(*) FROM usuarios) as total_usuarios,
                (SELECT COUNT(*) FROM materias) as total_materias,
                (SELECT COUNT(*) FROM niveles) as total_niveles,
                (SELECT COUNT(*) FROM preguntas) as total_preguntas,
                (SELECT COUNT(*) FROM opciones) as total_opciones,
                (SELECT COUNT(*) FROM progreso_usuario) as total_progresos
        `);
        return stats[0];
    } catch (error) {
        return {
            total_usuarios: 0,
            total_materias: 0,
            total_niveles: 0,
            total_preguntas: 0,
            total_opciones: 0,
            total_progresos: 0
        };
    }
}

// ============================================
// 3. FUNCIÓN PRINCIPAL
// ============================================
async function main() {
    console.log('\n🚀 INICIANDO MIGRACIÓN DE FIREBASE → MYSQL');
    console.log('═══════════════════════════════════════════════\n');

    try {
        // 3.1 Verificar conexión a MySQL
        console.log('📡 Verificando conexión a MySQL...');
        const connected = await testConnection();
        if (!connected) {
            console.error('❌ No se pudo conectar a MySQL. Abortando migración.');
            console.error('⚠️  Verifica tu archivo .env y que MySQL esté corriendo.');
            process.exit(1);
        }

        // 3.2 Ejecutar migración
        await seedMateriasYNiveles();
        const usuariosMigrados = await migrateUsers();
        const preguntasMigradas = await migrateQuestionsFromJS();
        const progresosMigrados = await migrateProgress();

        // 3.3 Mostrar estadísticas finales
        console.log('\n═══════════════════════════════════════════════');
        console.log('📊 ESTADÍSTICAS FINALES');
        console.log('═══════════════════════════════════════════════');
        
        const stats = await getEstadisticas();
        console.log(`  👥 Usuarios: ${stats.total_usuarios}`);
        console.log(`  📚 Materias: ${stats.total_materias}`);
        console.log(`  📖 Niveles: ${stats.total_niveles}`);
        console.log(`  ❓ Preguntas: ${stats.total_preguntas}`);
        console.log(`  🔘 Opciones: ${stats.total_opciones}`);
        console.log(`  📈 Progresos: ${stats.total_progresos}`);

        console.log('\n═══════════════════════════════════════════════');
        console.log('🎉 ¡MIGRACIÓN COMPLETADA CON ÉXITO!');
        console.log('═══════════════════════════════════════════════');
        console.log('\n✅ Ya puedes dejar de depender de Firebase para estos datos');
        console.log('💡 Recomendaciones:');
        console.log('  - Revisa los datos en phpMyAdmin');
        console.log('  - Verifica que los usuarios y progresos estén correctos');
        console.log('  - Actualiza tu frontend para usar las nuevas APIs');
        console.log('\n📌 Comandos útiles:');
        console.log('  npm start          - Iniciar servidor');
        console.log('  npm run test:db    - Verificar conexión y datos');
        console.log('');

    } catch (error) {
        console.error('\n❌ Error en la migración:', error.message);
        console.error('Detalles:', error);
        process.exit(1);
    } finally {
        await pool.end();
        console.log('🔌 Conexión a MySQL cerrada');
    }
}

// ============================================
// 4. EJECUTAR MIGRACIÓN
// ============================================
// Verificar que las variables de entorno estén configuradas
if (!process.env.DB_HOST || !process.env.DB_NAME) {
    console.error('❌ Error: Variables de entorno no configuradas');
    console.error('⚠️  Asegúrate de tener un archivo .env con:');
    console.error('  DB_HOST, DB_USER, DB_PASSWORD, DB_NAME');
    process.exit(1);
}

main();