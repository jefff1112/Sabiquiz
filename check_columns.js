const { pool } = require('./server/config/database');

async function check() {
  try {
    const [rows] = await pool.query('SHOW COLUMNS FROM usuarios LIKE "id"');
    console.log('usuarios.id:', rows[0]);
    const [rows2] = await pool.query('SHOW COLUMNS FROM sabi_1vs1_matches LIKE "usuario_id"');
    console.log('sabi_1vs1_matches.usuario_id:', rows2[0]);
  } catch(e) { console.error(e.message); }
  process.exit(0);
}

check();