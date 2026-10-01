const mysql = require('./node_modules/mysql2/promise');
const bcrypt = require('bcrypt');
(async () => {
  const c = await mysql.createConnection({host:'localhost',user:'root',password:'',database:'sabiquiz_db',port:3306});
  const hash = await bcrypt.hash('test123', 10);
  const id = require('crypto').randomUUID();
  await c.query(
    `INSERT INTO usuarios (id, username, email, password_hash, password_changed_at, rol) 
     VALUES (?, ?, ?, ?, NOW(), 'usuario')
     ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash)`,
    [id, 'testuser', 'test@example.com', hash]
  );
  console.log('Test user created with password: test123');
  await c.end();
})();