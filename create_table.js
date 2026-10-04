const { pool } = require('./server/config/database');
async function test() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS solicitudes_admin (
                id INT AUTO_INCREMENT PRIMARY KEY,
                usuario_id VARCHAR(100) NOT NULL,
                motivo TEXT,
                estado ENUM('pendiente','aprobada','rechazada') DEFAULT 'pendiente',
                fecha_solicitud DATETIME DEFAULT CURRENT_TIMESTAMP,
                fecha_revision DATETIME NULL,
                revisado_por VARCHAR(100) NULL,
                comentario_admin TEXT NULL
            )
        `);
        console.log("Table created!");
    } catch(e) {
        console.error(e);
    }
    process.exit(0);
}
test();
