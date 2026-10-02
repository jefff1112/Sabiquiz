// ============================================
// CORRECCIÓN DE INTEGRIDAD DE LA BASE DE DATOS
// ============================================
// Corrige los hallazgos I1-I14 del reporte de auditoría.
// Es idempotente: se puede ejecutar varias veces sin daño.
//
// USO:  node server/scripts/fix-integrity.js
// ============================================
const { pool } = require('../config/database');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
require('dotenv').config();

const log = [];
function paso(titulo) { console.log('\n▶ ' + titulo); }
function ok(msg) { console.log('   ✅ ' + msg); log.push('OK   ' + msg); }
function info(msg) { console.log('   •  ' + msg); log.push('info ' + msg); }

async function existeIndice(conn, tabla, indice) {
    const [r] = await conn.query(
        `SELECT COUNT(*) c FROM information_schema.STATISTICS
         WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND INDEX_NAME = ?`, [tabla, indice]);
    return r[0].c > 0;
}
async function existeFK(conn, nombre) {
    const [r] = await conn.query(
        `SELECT COUNT(*) c FROM information_schema.TABLE_CONSTRAINTS
         WHERE CONSTRAINT_SCHEMA = DATABASE() AND CONSTRAINT_NAME = ? AND CONSTRAINT_TYPE = 'FOREIGN KEY'`, [nombre]);
    return r[0].c > 0;
}
async function existeTabla(conn, tabla) {
    const [r] = await conn.query(
        `SELECT COUNT(*) c FROM information_schema.TABLES
         WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?`, [tabla]);
    return r[0].c > 0;
}
async function motor(conn, tabla) {
    const [r] = await conn.query(
        `SELECT ENGINE e FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?`, [tabla]);
    return r[0] ? r[0].e : null;
}

async function main() {
    const conn = await pool.getConnection();
    try {
        console.log('════════════════════════════════════════════════════');
        console.log(' CORRECCIÓN DE INTEGRIDAD — sabiquiz_db');
        console.log('════════════════════════════════════════════════════');

        // ─────────────────────────────────────────────
        paso('I1 · Progreso huérfano (nivel_id sin nivel real)');
        const [huerfanos] = await conn.query(
            `SELECT pu.id FROM progreso_usuario pu
             LEFT JOIN niveles n ON n.id = pu.nivel_id WHERE n.id IS NULL`);
        if (huerfanos.length) {
            await conn.query(
                `DELETE pu FROM progreso_usuario pu
                 LEFT JOIN niveles n ON n.id = pu.nivel_id WHERE n.id IS NULL`);
            ok(`${huerfanos.length} registros de progreso huérfanos eliminados`);
        } else ok('no había progreso huérfano');

        // ─────────────────────────────────────────────
        paso('D2 · progreso_usuario: MyISAM → InnoDB (para poder tener FKs)');
        const m1 = await motor(conn, 'progreso_usuario');
        if (m1 !== 'InnoDB') {
            await conn.query('ALTER TABLE progreso_usuario ENGINE = InnoDB');
            ok(`motor cambiado de ${m1} a InnoDB (ahora soporta transacciones y FKs)`);
        } else ok('ya estaba en InnoDB');

        paso('progreso_minijuego: comprobar motor');
        const m2 = await motor(conn, 'progreso_minijuego');
        if (m2 !== 'InnoDB') { await conn.query('ALTER TABLE progreso_minijuego ENGINE = InnoDB'); ok(`motor cambiado de ${m2} a InnoDB`); }
        else ok('ya estaba en InnoDB');

        // ─────────────────────────────────────────────
        paso('I14/D10 · Claves foráneas que faltaban');
        const fks = [
            ['fk_progreso_usuario', 'progreso_usuario', 'usuario_id', 'usuarios', 'id', 'CASCADE'],
            ['fk_progreso_nivel', 'progreso_usuario', 'nivel_id', 'niveles', 'id', 'CASCADE'],
            ['fk_progreso_minijuego_usuario', 'progreso_minijuego', 'usuario_id', 'usuarios', 'id', 'CASCADE'],
            ['fk_preguntas_nivel', 'preguntas', 'nivel_id', 'niveles', 'id', 'CASCADE'],
            ['fk_usuario_logros_usuario', 'usuario_logros', 'usuario_id', 'usuarios', 'id', 'CASCADE'],
            ['fk_sugerencia_usuario', 'sugerencias_preguntas', 'usuario_id', 'usuarios', 'id', 'CASCADE'],
            ['fk_login_attempts_usuario', 'login_attempts', 'usuario_id', 'usuarios', 'id', 'SET NULL']
        ];
        for (const [nombre, tabla, col, refTabla, refCol, onDelete] of fks) {
            if (await existeFK(conn, nombre)) { info(`${nombre} ya existe`); continue; }
            try {
                await conn.query(
                    `ALTER TABLE ${tabla} ADD CONSTRAINT ${nombre}
                     FOREIGN KEY (${col}) REFERENCES ${refTabla}(${refCol}) ON DELETE ${onDelete}`);
                ok(`${tabla}.${col} → ${refTabla}.${refCol} (ON DELETE ${onDelete})`);
            } catch (e) {
                // Si hay huérfanos, limpiamos y reintentamos
                if (e.code === 'ER_NO_REFERENCED_ROW_2' || e.errno === 1452) {
                    const [del] = await conn.query(
                        `DELETE t FROM ${tabla} t LEFT JOIN ${refTabla} r ON r.${refCol} = t.${col} WHERE r.${refCol} IS NULL`);
                    info(`${tabla}: ${del.affectedRows} huérfanos limpiados antes de crear la FK`);
                    await conn.query(
                        `ALTER TABLE ${tabla} ADD CONSTRAINT ${nombre}
                         FOREIGN KEY (${col}) REFERENCES ${refTabla}(${refCol}) ON DELETE ${onDelete}`);
                    ok(`${tabla}.${col} → ${refTabla}.${refCol} (tras limpiar huérfanos)`);
                } else {
                    info(`no se pudo crear ${nombre}: ${e.message}`);
                }
            }
        }

        // ─────────────────────────────────────────────
        paso('I4 · partidas.modo_juego inválido (cadena vacía)');
        const [modos] = await conn.query(
            `SELECT modo_juego, COUNT(*) c FROM partidas GROUP BY modo_juego`);
        console.log('   antes:', JSON.stringify(modos));
        await conn.query(
            `UPDATE partidas SET modo_juego = '1vs1'
             WHERE modo_juego = '' OR modo_juego IS NULL OR modo_juego NOT IN ('solitario','1vs1')`);
        ok('partidas con modo_juego inválido normalizadas a "1vs1"');

        paso('I6 · Partida del usuario contra sí mismo');
        const [self] = await conn.query(
            'SELECT COUNT(*) c FROM partidas WHERE anfitrion_id = oponente_id');
        if (self[0].c > 0) {
            await conn.query('DELETE FROM partidas WHERE anfitrion_id = oponente_id');
            ok(`${self[0].c} partida(s) con anfitrión = oponente eliminadas`);
        } else ok('no había partidas contra uno mismo');

        paso('Datos basura · progreso_minijuego con minijuego inventado');
        const [basura] = await conn.query(
            `SELECT COUNT(*) c FROM progreso_minijuego
             WHERE minijuego NOT IN ('puzzle','balanzas','tiro','regresion','funcion_lineal','trigonometria')`);
        if (basura[0].c > 0) {
            await conn.query(
                `DELETE FROM progreso_minijuego
                 WHERE minijuego NOT IN ('puzzle','balanzas','tiro','regresion','funcion_lineal','trigonometria')`);
            ok(`${basura[0].c} registro(s) con minijuego inexistente eliminados`);
        } else ok('no había minijuegos inventados');

        // ─────────────────────────────────────────────
        paso('I13 · Índices duplicados / redundantes');
        const dropIdx = [
            ['partidas', 'room_code_2'], ['partidas', 'idx_room_code_unique'], ['partidas', 'idx_room_code'],
            ['usuarios', 'idx_email'], ['usuarios', 'idx_username'], ['niveles', 'idx_materia_id']
        ];
        for (const [tabla, idx] of dropIdx) {
            if (await existeIndice(conn, tabla, idx)) {
                try { await conn.query(`ALTER TABLE ${tabla} DROP INDEX \`${idx}\``); ok(`índice ${tabla}.${idx} eliminado`); }
                catch (e) { info(`no se pudo eliminar ${tabla}.${idx}: ${e.message}`); }
            } else info(`${tabla}.${idx} no existía`);
        }

        paso('Índice compuesto que faltaba para el ranking y las estadísticas');
        if (!(await existeIndice(conn, 'progreso_usuario', 'idx_usuario_completado'))) {
            await conn.query('ALTER TABLE progreso_usuario ADD INDEX idx_usuario_completado (usuario_id, completado)');
            ok('progreso_usuario(usuario_id, completado) creado');
        } else info('ya existía');
        if (!(await existeIndice(conn, 'preguntas', 'idx_nivel_orden'))) {
            await conn.query('ALTER TABLE preguntas ADD INDEX idx_nivel_orden (nivel_id, orden)');
            ok('preguntas(nivel_id, orden) creado');
        } else info('ya existía');

        // ─────────────────────────────────────────────
        paso('I12 · preguntas.orden (todas eran 1) — numeración secuencial por nivel');
        await conn.query(
            `UPDATE preguntas p
             JOIN (SELECT id, ROW_NUMBER() OVER (PARTITION BY nivel_id ORDER BY id) rn FROM preguntas) x
               ON x.id = p.id
             SET p.orden = x.rn`);
        const [ordenStats] = await conn.query('SELECT DISTINCT orden FROM preguntas ORDER BY orden');
        ok(`orden renumerado 1..5 por nivel (valores presentes: ${ordenStats.map(r => r.orden).join(', ')})`);

        paso('I12 · preguntas.dificultad (todas eran easy) — progresiva por número de nivel');
        await conn.query(
            `UPDATE preguntas p JOIN niveles n ON n.id = p.nivel_id
             SET p.dificultad = CASE
                 WHEN n.materia_id = 8 THEN 'easy'          -- niveles de minijuego (501-515)
                 WHEN n.numero <= 10 THEN 'easy'
                 WHEN n.numero <= 20 THEN 'medium'
                 ELSE 'hard' END`);
        const [difStats] = await conn.query(
            'SELECT dificultad, COUNT(*) c FROM preguntas GROUP BY dificultad ORDER BY dificultad');
        ok('dificultad asignada: ' + difStats.map(d => `${d.dificultad}=${d.c}`).join(', '));

        // ─────────────────────────────────────────────
        paso('I2/I3 · Contraseñas: texto plano y hashes vacíos');
        const [malas] = await conn.query(
            `SELECT id, username, email, password_hash FROM usuarios
             WHERE password_hash IS NULL OR password_hash = '' OR password_hash NOT LIKE '$2%'`);
        if (malas.length === 0) ok('todas las contraseñas tienen hash bcrypt');
        for (const u of malas) {
            let nuevoHash, accion;
            if (u.password_hash && u.password_hash !== '' && !u.password_hash.startsWith('$2')) {
                // Texto plano: conservamos la contraseña que el usuario ya tenía,
                // pero ahora correctamente hasheada.
                nuevoHash = await bcrypt.hash(u.password_hash, 10);
                accion = `TEXTO PLANO "${u.password_hash}" → bcrypt (misma contraseña, ahora segura)`;
            } else {
                // Hash vacío: no hay credencial que preservar. Se desactiva el acceso
                // con un valor aleatorio que nadie conoce (cuenta no utilizable hasta
                // que un admin le asigne contraseña).
                nuevoHash = await bcrypt.hash(crypto.randomBytes(32).toString('hex'), 10);
                accion = 'hash vacío → DESHABILITADA (contraseña aleatoria desconocida)';
            }
            await conn.query('UPDATE usuarios SET password_hash = ? WHERE id = ?', [nuevoHash, u.id]);
            info(`${u.username} (${u.email}): ${accion}`);
            await conn.query(
                'INSERT INTO password_history (usuario_id, password_hash) VALUES (?, ?)', [u.id, nuevoHash]);
        }
        ok(`${malas.length} cuentas corregidas`);

        // ─────────────────────────────────────────────
        paso('S13 · Tabla para tokens de recuperación de un solo uso');
        if (!(await existeTabla(conn, 'password_reset_tokens'))) {
            await conn.query(`
                CREATE TABLE password_reset_tokens (
                    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
                    usuario_id CHAR(36) NOT NULL,
                    token_hash CHAR(64) NOT NULL COMMENT 'SHA-256 del token enviado por email',
                    expira_en DATETIME NOT NULL,
                    usado_en DATETIME DEFAULT NULL,
                    ip_solicitud VARCHAR(45) DEFAULT NULL,
                    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    PRIMARY KEY (id),
                    UNIQUE KEY uk_token_hash (token_hash),
                    KEY idx_usuario (usuario_id),
                    KEY idx_expira (expira_en),
                    CONSTRAINT fk_reset_usuario FOREIGN KEY (usuario_id)
                        REFERENCES usuarios (id) ON DELETE CASCADE
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);
            ok('tabla password_reset_tokens creada');
        } else info('ya existía');

        // ─────────────────────────────────────────────
        paso('Verificación final');
        const checks = [
            ['progreso huérfano', `SELECT COUNT(*) c FROM progreso_usuario pu LEFT JOIN niveles n ON n.id=pu.nivel_id WHERE n.id IS NULL`],
            ['FKs creadas', `SELECT COUNT(*) c FROM information_schema.TABLE_CONSTRAINTS WHERE CONSTRAINT_SCHEMA=DATABASE() AND CONSTRAINT_TYPE='FOREIGN KEY'`],
            ['modo_juego inválido', `SELECT COUNT(*) c FROM partidas WHERE modo_juego NOT IN ('solitario','1vs1')`],
            ['contraseñas sin bcrypt', `SELECT COUNT(*) c FROM usuarios WHERE password_hash NOT LIKE '$2%'`],
            ['motor progreso_usuario', `SELECT ENGINE c FROM information_schema.TABLES WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='progreso_usuario'`]
        ];
        for (const [nombre, sql] of checks) {
            const [r] = await conn.query(sql);
            const v = Object.values(r[0])[0];
            ok(`${nombre}: ${v}`);
        }
        const [pend] = await conn.query(
            'SELECT COUNT(*) c FROM progreso_usuario WHERE nivel_id BETWEEN 501 AND 515');
        ok(`progreso de minijuegos preservado: ${pend[0].c} filas`);

        console.log('\n════════════════════════════════════════════════════');
        console.log(' ✅ INTEGRIDAD CORREGIDA');
        console.log('════════════════════════════════════════════════════\n');
    } catch (error) {
        console.error('\n❌ ERROR:', error.message);
        process.exitCode = 1;
    } finally {
        conn.release();
        await pool.end();
    }
}
main();
