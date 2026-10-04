const { pool } = require('./server/config/database');

async function check() {
  try {
    const [rows] = await pool.query('SELECT id, username FROM usuarios WHERE username LIKE "test%"');
    for (const r of rows) {
      console.log('User ID:', r.id, 'Length:', r.id.length, 'Username:', r.username);
    }
  } catch(e) { console.error(e.message); }
  process.exit(0);
}

check();