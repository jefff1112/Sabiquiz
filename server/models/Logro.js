const { pool } = require('../config/database');

class Logro {
    // Obtener todos los logros
    static async getAll() {
        const [rows] = await pool.query('SELECT * FROM logros ORDER BY id');
        return rows;
    }

    // Obtener logros desbloqueados por un usuario
    static async getByUsuario(usuarioId) {
        const [rows] = await pool.query(
            `SELECT l.*, ul.fecha_desbloqueo 
             FROM logros l
             JOIN usuario_logros ul ON l.id = ul.logro_id
             WHERE ul.usuario_id = ?
             ORDER BY ul.fecha_desbloqueo DESC`,
            [usuarioId]
        );
        return rows;
    }

    // Verificar y desbloquear logros para un usuario
    static async checkAndUnlock(usuarioId) {
        try {
            const connection = await pool.getConnection();
            await connection.beginTransaction();

            // Obtener estadísticas del usuario
            const [stats] = await connection.query(
                `SELECT 
                    partidas_jugadas,
                    (SELECT COUNT(*) FROM progreso_usuario WHERE usuario_id = ? AND completado = TRUE) as niveles_completados,
                    (SELECT SUM(estrellas) FROM progreso_usuario WHERE usuario_id = ?) as total_estrellas
                 FROM usuarios WHERE id = ?`,
                [usuarioId, usuarioId, usuarioId]
            );

            const userStats = stats[0] || { partidas_jugadas: 0, niveles_completados: 0, total_estrellas: 0 };

            // Estadísticas de minijuegos (niveles completados por minijuego)
            const [mjRows] = await connection.query(
                'SELECT minijuego, COUNT(*) AS c FROM progreso_minijuego WHERE usuario_id = ? AND completado = 1 GROUP BY minijuego',
                [usuarioId]
            );
            const minijuegoCompletados = {};
            mjRows.forEach(r => { minijuegoCompletados[r.minijuego] = r.c; });
            const minijuegosDistintos = mjRows.length;

            // Obtener logros ya desbloqueados
            const [desbloqueados] = await connection.query(
                'SELECT logro_id FROM usuario_logros WHERE usuario_id = ?',
                [usuarioId]
            );
            const desbloqueadosIds = desbloqueados.map(d => d.logro_id);

            // Obtener todos los logros
            const [logros] = await connection.query('SELECT * FROM logros');
            let nuevosLogros = [];

            for (const logro of logros) {
                if (desbloqueadosIds.includes(logro.id)) continue;

                let cumplido = false;
                switch (logro.tipo) {
                    case 'partidas':
                        cumplido = userStats.partidas_jugadas >= logro.condicion;
                        break;
                    case 'niveles':
                        cumplido = userStats.niveles_completados >= logro.condicion;
                        break;
                    case 'estrellas':
                        cumplido = userStats.total_estrellas >= logro.condicion;
                        break;
                    case 'minijuegos':
                        if (logro.minijuego) {
                            cumplido = (minijuegoCompletados[logro.minijuego] || 0) >= logro.condicion;
                        } else {
                            cumplido = minijuegosDistintos >= logro.condicion;
                        }
                        break;
                }

                if (cumplido) {
                    await connection.query(
                        'INSERT INTO usuario_logros (usuario_id, logro_id) VALUES (?, ?)',
                        [usuarioId, logro.id]
                    );
                    nuevosLogros.push(logro);
                }
            }

            await connection.commit();
            connection.release();

            return nuevosLogros;
        } catch (error) {
            console.error('Error verificando logros:', error);
            throw error;
        }
    }
}

module.exports = Logro;