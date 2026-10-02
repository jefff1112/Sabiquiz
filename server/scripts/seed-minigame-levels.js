// ============================================
// SEED: NIVELES DE MINIJUEGOS MATEMÁTICOS (IDs 501-505 y 511-515)
// ============================================
// Crea (idempotente) los 15 niveles que respaldan el progreso de los
// minijuegos de Función Lineal y Trigonometría en la tabla `progreso_usuario`.
//
// ¿Por qué una materia oculta?
//   `progreso_usuario.nivel_id` se lee con un JOIN a `niveles` (Progreso.getAllProgreso).
//   Sin filas en `niveles`, el progreso de los minijuegos sería invisible.
//   La materia se crea con activo = 0 para que NO aparezca en /api/quiz/materias
//   ni altere los 30 niveles de quiz de Matemáticas.
//
// IDs:
//   501-505  → Función Lineal  (nivel 1-5)
//   511-515  → Trigonometría   (nivel 1-5)
//
// Uso:  node server/scripts/seed-minigame-levels.js
// ============================================
const { pool } = require('../config/database');
require('dotenv').config();

const MATERIA_NOMBRE = 'Minijuegos Matemáticas';

const NIVELES = [
    // Función Lineal
    { id: 501, numero: 1,  titulo: 'Función Lineal - Recta Horizontal',  teoria: 'Ajusta la recta y = mx + b para que pase por los puntos dados. En este nivel la recta debe ser horizontal (m = 0).' },
    { id: 502, numero: 2,  titulo: 'Función Lineal - Pendiente Positiva', teoria: 'Pendiente positiva: la recta sube de izquierda a derecha. Para pasar por (0,0) y (3,6), m = (6-0)/(3-0) = 2.' },
    { id: 503, numero: 3,  titulo: 'Función Lineal - Pendiente Negativa', teoria: 'Pendiente negativa: la recta baja de izquierda a derecha. Para pasar por (0,10) y (5,0), m = (0-10)/(5-0) = -2.' },
    { id: 504, numero: 4,  titulo: 'Función Lineal - Intercepto',         teoria: 'Con dos puntos se obtiene m = (y2-y1)/(x2-x1) y luego b = y1 - m·x1. Para (-2,1) y (2,5): m = 1, b = 3.' },
    { id: 505, numero: 5,  titulo: 'Función Lineal - Desafío Final',      teoria: 'Ajusta la recta de mínimos cuadrados a una nube de puntos. El coeficiente de determinación R² mide la calidad del ajuste (R² > 0.95 es excelente).' },
    // Trigonometría
    { id: 511, numero: 6,  titulo: 'Trigonometría - Ángulos Notables',    teoria: 'En el círculo unitario el seno es la coordenada Y del punto. sin(30°) = 0.5 y sin(150°) = 0.5.' },
    { id: 512, numero: 7,  titulo: 'Trigonometría - Coseno',              teoria: 'El coseno es la coordenada X del punto. cos(60°) = 0.5 y cos(300°) = 0.5.' },
    { id: 513, numero: 8,  titulo: 'Trigonometría - Tangente',            teoria: 'La tangente es sen/cos. tan(45°) = 1 y tan(225°) = 1.' },
    { id: 514, numero: 9,  titulo: 'Trigonometría - Exploración',         teoria: 'Ángulos clave: 45° (π/4), 90° (π/2), 180° (π), 270° (3π/2). Memorizar sus valores acelera cualquier cálculo trigonométrico.' },
    { id: 515, numero: 10, titulo: 'Trigonometría - Desafío Final',       teoria: 'sin(θ) = cos(θ) cuando θ = 45° + k·180°. Es decir, en los ángulos donde la recta y = x corta al círculo unitario.' }
];

async function main() {
    let connection;
    try {
        connection = await pool.getConnection();

        // 1. Materia oculta
        let [materias] = await connection.query('SELECT id, activo FROM materias WHERE nombre = ?', [MATERIA_NOMBRE]);
        let materiaId;
        if (materias.length === 0) {
            const [res] = await connection.query(
                'INSERT INTO materias (nombre, descripcion, icono_url, orden, activo) VALUES (?, ?, ?, ?, 0)',
                [MATERIA_NOMBRE, 'Niveles internos que respaldan el progreso de los minijuegos de Matemáticas (no visibles como materia de quiz).', 'grafica.png', 99]
            );
            materiaId = res.insertId;
            console.log(`✅ Materia creada: "${MATERIA_NOMBRE}" (id ${materiaId}, activo = 0)`);
        } else {
            materiaId = materias[0].id;
            if (materias[0].activo !== 0) {
                await connection.query('UPDATE materias SET activo = 0 WHERE id = ?', [materiaId]);
                console.log(`ℹ️  Materia existente "${MATERIA_NOMBRE}" (id ${materiaId}) forzada a activo = 0`);
            } else {
                console.log(`ℹ️  Materia ya existente: "${MATERIA_NOMBRE}" (id ${materiaId})`);
            }
        }

        // 2. Niveles con id explícito (idempotente)
        console.log('\nNiveles de minijuego:');
        for (const n of NIVELES) {
            await connection.query(
                `INSERT INTO niveles (id, materia_id, numero, titulo, passing_score, orden, teoria)
                 VALUES (?, ?, ?, ?, 0.60, ?, ?)
                 ON DUPLICATE KEY UPDATE
                   materia_id = VALUES(materia_id),
                   numero     = VALUES(numero),
                   titulo     = VALUES(titulo),
                   orden      = VALUES(orden),
                   teoria     = VALUES(teoria)`,
                [n.id, materiaId, n.numero, n.titulo, n.numero, n.teoria]
            );
            console.log(`   ${n.id}  numero=${String(n.numero).padStart(2)}  ${n.titulo}`);
        }

        // 3. Verificación
        const [check] = await connection.query(
            `SELECT id, numero, titulo FROM niveles
             WHERE id BETWEEN 501 AND 515 AND id NOT IN (506,507,508,509,510)
             ORDER BY id`
        );
        const [total] = await connection.query('SELECT COUNT(*) AS c FROM niveles');
        const [materiasActivas] = await connection.query('SELECT COUNT(*) AS c FROM materias WHERE activo = 1');

        console.log(`\n✅ Niveles de minijuego presentes: ${check.length}/10`);
        console.log(`📊 Total de niveles en la BD: ${total[0].c}`);
        console.log(`📚 Materias activas (visibles en el quiz): ${materiasActivas[0].c} (deben ser 7)`);

    } catch (error) {
        console.error('❌ Error en el seed:', error.message);
        process.exitCode = 1;
    } finally {
        if (connection) connection.release();
        await pool.end();
    }
}

main();
