const { pool } = require('../config/database');

async function fixActividadDiaria() {
    console.log('🔧 Corrigiendo tabla actividad_diaria a InnoDB...');
    
    try {
        await pool.query(`ALTER TABLE actividad_diaria ENGINE=InnoDB`);
        console.log('✅ Tabla actividad_diaria convertida a InnoDB');
        
        // Verify
        const [rows] = await pool.query("SHOW CREATE TABLE actividad_diaria");
        console.log(rows[0]['Create Table']);
        
    } catch (error) {
        console.error('❌ Error:', error);
        throw error;
    }
}

if (require.main === module) {
    fixActividadDiaria()
        .then(() => process.exit(0))
        .catch(() => process.exit(1));
}

module.exports = { fixActividadDiaria };