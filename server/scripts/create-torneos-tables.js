const { pool } = require('../config/database');

async function createTorneosTables() {
    console.log('🏗️  Creando tablas de torneos y actividad_diaria...');
    
    try {
        // Tabla de torneos
        await pool.query(`
            CREATE TABLE IF NOT EXISTS torneos (
                id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(100) NOT NULL,
                materia_id INT UNSIGNED NOT NULL,
                fecha_inicio DATETIME NOT NULL,
                fecha_fin DATETIME NOT NULL,
                duracion_minutos INT DEFAULT 15,
                max_usuarios INT DEFAULT 8,
                modo ENUM('acumulativo', 'roundrobin', 'ia') DEFAULT 'acumulativo',
                estado ENUM('proximo', 'inscripcion_abierta', 'en_curso', 'finalizado') DEFAULT 'proximo',
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT fk_torneo_materia FOREIGN KEY (materia_id) REFERENCES materias(id)
            )
        `);
        console.log('✅ Tabla torneos creada');

        // Tabla de inscripciones
        await pool.query(`
            CREATE TABLE IF NOT EXISTS inscripciones_torneo (
                id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                torneo_id INT UNSIGNED NOT NULL,
                usuario_id CHAR(36) NOT NULL,
                puntaje INT DEFAULT 0,
                partidas_jugadas INT DEFAULT 0,
                fecha_inscripcion DATETIME DEFAULT CURRENT_TIMESTAMP,
                UNIQUE KEY uk_torneo_usuario (torneo_id, usuario_id),
                CONSTRAINT fk_inscripcion_torneo FOREIGN KEY (torneo_id) REFERENCES torneos(id) ON DELETE CASCADE,
                CONSTRAINT fk_inscripcion_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
            )
        `);
        console.log('✅ Tabla inscripciones_torneo creada');

        // Tabla de ranking de torneos
        await pool.query(`
            CREATE TABLE IF NOT EXISTS ranking_torneo (
                id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                torneo_id INT UNSIGNED NOT NULL,
                usuario_id CHAR(36) NOT NULL,
                posicion INT NOT NULL,
                puntaje_final INT NOT NULL,
                fecha_calculo DATETIME DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT fk_ranking_torneo FOREIGN KEY (torneo_id) REFERENCES torneos(id) ON DELETE CASCADE,
                CONSTRAINT fk_ranking_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
            )
        `);
        console.log('✅ Tabla ranking_torneo creada');

        // Tabla de actividad diaria
        await pool.query(`
            CREATE TABLE IF NOT EXISTS actividad_diaria (
                id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                usuario_id CHAR(36) NOT NULL,
                fecha DATE NOT NULL,
                niveles_completados INT DEFAULT 0,
                preguntas_correctas INT DEFAULT 0,
                preguntas_totales INT DEFAULT 0,
                tiempo_total_segundos INT DEFAULT 0,
                racha_maxima_dia INT DEFAULT 0,
                UNIQUE KEY uk_usuario_fecha (usuario_id, fecha),
                CONSTRAINT fk_actividad_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
            )
        `);
        console.log('✅ Tabla actividad_diaria creada');

        // Tabla de notificaciones (si no existe)
        await pool.query(`
            CREATE TABLE IF NOT EXISTS notificaciones (
                id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                usuario_id CHAR(36) NOT NULL,
                tipo VARCHAR(50) NOT NULL,
                titulo VARCHAR(200) NOT NULL,
                mensaje TEXT,
                data JSON,
                leida BOOLEAN DEFAULT FALSE,
                fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
                fecha_leida DATETIME NULL,
                CONSTRAINT fk_notificacion_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
            )
        `);
        console.log('✅ Tabla notificaciones verificada/creada');

        // Tabla de logros - agregar logro de torneo si no existe
        await pool.query(`
            INSERT IGNORE INTO logros (id, nombre, descripcion, tipo, condicion, icono)
            VALUES 
            (100, '🏆 Campeón de Torneo', 'Ganaste un torneo por materia', 'torneos', 1, 'img/trofeo.png')
        `);
        console.log('✅ Logro de torneo verificado/creado');

        // Insertar torneos de ejemplo para la Feria CIMAT 2026
        // Primero obtener IDs de materias
        const [materias] = await pool.query('SELECT id, nombre FROM materias WHERE activo = 1');
        const materiaMap = {};
        materias.forEach(m => materiaMap[m.nombre.toLowerCase()] = m.id);

        // Torneo de Matemáticas - Sábado
        if (materiaMap['matemáticas'] || materiaMap['matematicas']) {
            const matId = materiaMap['matemáticas'] || materiaMap['matematicas'];
            await pool.query(`
                INSERT IGNORE INTO torneos (nombre, materia_id, fecha_inicio, fecha_fin, duracion_minutos, max_usuarios, modo, estado)
                VALUES ('🏆 Torneo de Matemáticas - Feria CIMAT', ?, DATE_ADD(NOW(), INTERVAL 1 DAY), DATE_ADD(DATE_ADD(NOW(), INTERVAL 1 DAY), INTERVAL 15 MINUTE), 15, 8, 'acumulativo', 'proximo')
            `, [matId]);
            console.log('✅ Torneo de Matemáticas creado');
        }

        // Torneo de Ciencias - Domingo
        if (materiaMap['ciencias']) {
            await pool.query(`
                INSERT IGNORE INTO torneos (nombre, materia_id, fecha_inicio, fecha_fin, duracion_minutos, max_usuarios, modo, estado)
                VALUES ('🏆 Torneo de Ciencias - Feria CIMAT', ?, DATE_ADD(NOW(), INTERVAL 2 DAY), DATE_ADD(DATE_ADD(NOW(), INTERVAL 2 DAY), INTERVAL 15 MINUTE), 15, 8, 'acumulativo', 'proximo')
            `, [materiaMap['ciencias']]);
            console.log('✅ Torneo de Ciencias creado');
        }

        // Torneo de Lenguaje - Viernes
        if (materiaMap['lenguaje']) {
            await pool.query(`
                INSERT IGNORE INTO torneos (nombre, materia_id, fecha_inicio, fecha_fin, duracion_minutos, max_usuarios, modo, estado)
                VALUES ('🏆 Torneo de Lenguaje - Feria CIMAT', ?, DATE_ADD(NOW(), INTERVAL 3 DAY), DATE_ADD(DATE_ADD(NOW(), INTERVAL 3 DAY), INTERVAL 15 MINUTE), 15, 8, 'acumulativo', 'proximo')
            `, [materiaMap['lenguaje']]);
            console.log('✅ Torneo de Lenguaje creado');
        }

        console.log('\n🎉 ¡Todas las tablas y datos iniciales creados correctamente!');

    } catch (error) {
        console.error('❌ Error creando tablas:', error);
        throw error;
    }
}

// Ejecutar si se llama directamente
if (require.main === module) {
    createTorneosTables()
        .then(() => process.exit(0))
        .catch(() => process.exit(1));
}

module.exports = { createTorneosTables };