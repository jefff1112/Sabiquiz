const { pool } = require('./server/config/database');

async function check() {
  const [rows] = await pool.query('SELECT id, username FROM usuarios WHERE username = "testuser28"');
  console.log('User ID:', rows[0].id, 'Length:', rows[0].id.length);
}

check();