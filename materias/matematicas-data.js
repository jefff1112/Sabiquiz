// materias/matematicas-data.js

export const levels = [
    // Nivel 1
    {
        id: 1,
        title: "Nivel 1",
        passingScore: 0.6,
        questions: [
            { "question": "¿Cuánto es 2 + 2?", "options": ["3", "4", "5"], "correctAnswer": "4" },
            { "question": "¿Qué número va después del 7?", "options": ["8", "6", "9"], "correctAnswer": "8" },
            { "question": "¿Cuántos lados tiene un triángulo?", "options": ["3", "4", "5"], "correctAnswer": "3" },
            { "question": "¿Cuánto es 5 - 1?", "options": ["4", "6", "3"], "correctAnswer": "4" },
            { "question": "Si tienes 2 manzanas y te dan 1 más, ¿cuántas tienes?", "options": ["2", "4", "3"], "correctAnswer": "3" }
        ]
    },
    // Nivel 2
    {
                id: 2,
                title: "Nivel 2",
                passingScore: 0.65,
                questions: [
                    { "question": "¿Cuánto es 2 x 3?", "options": ["5", "6", "8"], "correctAnswer": "6" },
                    { "question": "La mitad de 10 es...", "options": ["4", "5", "6"], "correctAnswer": "5" },
                    { "question": "Si divides 8 dulces entre 4 niños, ¿cuántos dulces le tocan a cada uno?", "options": ["3", "2", "4"], "correctAnswer": "2" },
                    { "question": "¿Cuánto es 20 + 15?", "options": ["30", "35", "40"], "correctAnswer": "35" },
                    { "question": "Un centenar es igual a...", "options": ["10", "100", "1000"], "correctAnswer": "100" }
                ]
            },
            {
                id: 3,
                title: "Nivel 3",
                passingScore: 0.7,
                questions: [
                    { "question": "¿Cuál es el resultado de 7 x 7?", "options": ["42", "49", "56"], "correctAnswer": "49" },
                    { "question": "¿Qué número es impar?", "options": ["8", "10", "13"], "correctAnswer": "13" },
                    { "question": "El perímetro de un cuadrado de lado 5 cm es...", "options": ["10 cm", "20 cm", "25 cm"], "correctAnswer": "20 cm" },
                    { "question": "¿Cuánto es 1/4 + 1/4?", "options": ["1/2", "2/8", "1/4"], "correctAnswer": "1/2" },
                    { "question": "Un ángulo de 90 grados es...", "options": ["Agudo", "Recto", "Obtuso"], "correctAnswer": "Recto" }
                ]
            },
            {
                id: 4,
                title: "Nivel 4",
                passingScore: 0.7,
                questions: [
                    { "question": "El área de un rectángulo con base 6 y altura 4 es...", "options": ["10", "20", "24"], "correctAnswer": "24" },
                    { "question": "La fracción 5/10 es equivalente a...", "options": ["1/5", "1/2", "2/5"], "correctAnswer": "1/2" },
                    { "question": "¿Cuánto es 0.5 x 10?", "options": ["0.05", "5", "50"], "correctAnswer": "5" },
                    { "question": "¿Cuál es el valor de x en la ecuación: x + 5 = 10?", "options": ["15", "5", "2"], "correctAnswer": "5" },
                    { "question": "El número romano 'X' representa...", "options": ["5", "10", "1"], "correctAnswer": "10" }
                ]
            },
            {
                id: 5,
                title: "Nivel 5",
                passingScore: 0.75,
                questions: [
                    { "question": "El M.C.D. de 12 y 18 es...", "options": ["6", "3", "12"], "correctAnswer": "6" },
                    { "question": "La suma de los ángulos internos de un triángulo es...", "options": ["90°", "180°", "360°"], "correctAnswer": "180°" },
                    { "question": "El resultado de 5² es...", "options": ["10", "25", "7"], "correctAnswer": "25" },
                    { "question": "¿Cuál es la raíz cuadrada de 144?", "options": ["10", "12", "24"], "correctAnswer": "12" },
                    { "question": "¿Qué número es divisible por 3?", "options": ["25", "37", "42"], "correctAnswer": "42" }
                ]
            },
            // Dificultad Media (Niveles 6-12)
            {
                id: 6,
                title: "Nivel 6",
                passingScore: 0.75,
                questions: [
                    { "question": "¿Cuánto es 120 / 10?", "options": ["10", "12", "1200"], "correctAnswer": "12" },
                    { "question": "El L.C.M. de 4 y 6 es...", "options": ["12", "18", "24"], "correctAnswer": "12" },
                    { "question": "El valor de 'y' en la ecuación 2y - 3 = 7 es...", "options": ["5", "10", "2"], "correctAnswer": "5" },
                    { "question": "¿Cuánto es 25% de 200?", "options": ["25", "50", "100"], "correctAnswer": "50" },
                    { "question": "La pendiente de una recta es...", "options": ["La inclinación", "La intersección con el eje Y", "El punto de origen"], "correctAnswer": "La inclinación" }
                ]
            },
            {
                id: 7,
                title: "Nivel 7",
                passingScore: 0.8,
                questions: [
                    { "question": "La mediana de los números 2, 5, 8, 9, 11 es...", "options": ["5", "8", "9"], "correctAnswer": "8" },
                    { "question": "El resultado de (x + 3)² es...", "options": ["x² + 9", "x² + 6x + 9", "x² + 3x + 9"], "correctAnswer": "x² + 6x + 9" },
                    { "question": "La ecuación de una recta horizontal es de la forma...", "options": ["y = mx + b", "x = k", "y = k"], "correctAnswer": "y = k" },
                    { "question": "¿Cuál es el teorema de Pitágoras?", "options": ["a+b=c", "a²+b²=c²", "a²-b²=c²"], "correctAnswer": "a²+b²=c²" },
                    { "question": "Un número elevado a la potencia 0 es...", "options": ["0", "1", "el mismo número"], "correctAnswer": "1" }
                ]
            },
            {
                id: 8,
                title: "Nivel 8",
                passingScore: 0.8,
                questions: [
                    { "question": "La moda del conjunto {2, 5, 5, 8, 9} es...", "options": ["2", "5", "8"], "correctAnswer": "5" },
                    { "question": "El valor de x en 3x = 12 es...", "options": ["3", "4", "9"], "correctAnswer": "4" },
                    { "question": "El volumen de un cubo de lado 3 es...", "options": ["9", "27", "18"], "correctAnswer": "27" },
                    { "question": "La fórmula del área de un triángulo es...", "options": ["b*h", "(b*h)/2", "πr²"], "correctAnswer": "(b*h)/2" },
                    { "question": "¿Cuál es la notación científica de 5,000,000?", "options": ["5 x 10⁶", "5 x 10⁵", "50 x 10⁵"], "correctAnswer": "5 x 10⁶" }
                ]
            },
            {
                id: 9,
                title: "Nivel 9",
                passingScore: 0.8,
                questions: [
                    { "question": "El coeficiente de 'x²' en la expresión 3x² - 5x + 2 es...", "options": ["3", "-5", "2"], "correctAnswer": "3" },
                    { "question": "El dominio de una función son los valores de...", "options": ["y", "x", "z"], "correctAnswer": "x" },
                    { "question": "La solución a la ecuación cuadrática x² - 4 = 0 es...", "options": ["x=2", "x=4", "x=±2"], "correctAnswer": "x=±2" },
                    { "question": "El rango de una función son los valores de...", "options": ["x", "y", "z"], "correctAnswer": "y" },
                    { "question": "Una función lineal tiene como gráfica...", "options": ["una parábola", "una línea recta", "un círculo"], "correctAnswer": "una línea recta" }
                ]
            },
            {
                id: 10,
                title: "Nivel 10",
                passingScore: 0.85,
                questions: [
                    { "question": "El resultado de 2⁻² es...", "options": ["-4", "1/4", "4"], "correctAnswer": "1/4" },
                    { "question": "El valor de 'x' en 2x + 1 = 3x - 5 es...", "options": ["6", "4", "2"], "correctAnswer": "6" },
                    { "question": "El logaritmo de 100 en base 10 es...", "options": ["10", "1", "2"], "correctAnswer": "2" },
                    { "question": "¿Cuál es el valor del seno de 30°?", "options": ["0.5", "1", "0"], "correctAnswer": "0.5" },
                    { "question": "El factorial de 4 (4!) es...", "options": ["16", "24", "12"], "correctAnswer": "24" }
                ]
            },
            // Dificultad Avanzada (Niveles 11-20)
            {
                id: 11,
                title: "Nivel 11",
                passingScore: 0.85,
                questions: [
                    { "question": "La integral de x es...", "options": ["x²", "x²/2 + C", "1"], "correctAnswer": "x²/2 + C" },
                    { "question": "La derivada de x² es...", "options": ["x", "2x", "2"], "correctAnswer": "2x" },
                    { "question": "¿Qué es un vector?", "options": ["Una cantidad con magnitud", "Una cantidad con dirección y magnitud", "Un punto en el espacio"], "correctAnswer": "Una cantidad con dirección y magnitud" },
                    { "question": "El límite de (x² - 1)/(x - 1) cuando x tiende a 1 es...", "options": ["0", "1", "2"], "correctAnswer": "2" },
                    { "question": "La matriz identidad de 2x2 es...", "options": ["[1 0; 0 1]", "[1 1; 1 1]", "[0 1; 1 0]"], "correctAnswer": "[1 0; 0 1]" }
                ]
            },
            {
                id: 12,
                title: "Nivel 12",
                passingScore: 0.85,
                questions: [
                    { "question": "El rango de la matriz [1 2; 3 4] es...", "options": ["1", "2", "0"], "correctAnswer": "2" },
                    { "question": "La derivada de sen(x) es...", "options": ["-cos(x)", "cos(x)", "tan(x)"], "correctAnswer": "cos(x)" },
                    { "question": "La integral de 1/x es...", "options": ["ln|x| + C", "x⁻²", "-1/x² + C"], "correctAnswer": "ln|x| + C" },
                    { "question": "El valor del coseno de 90° es...", "options": ["1", "-1", "0"], "correctAnswer": "0" },
                    { "question": "Si f(x) = 2x, entonces f(g(x)) = 4x. ¿Cuál es g(x)?", "options": ["2x", "x", "x+2"], "correctAnswer": "2x" }
                ]
            },
            {
                id: 13,
                title: "Nivel 13",
                passingScore: 0.85,
                questions: [
                    { "question": "El producto cruz de dos vectores paralelos es...", "options": ["Un vector unitario", "Un vector cero", "Un escalar"], "correctAnswer": "Un vector cero" },
                    { "question": "Una serie geométrica infinita converge si el valor absoluto de la razón común 'r' es...", "options": ["r > 1", "r < 1", "r = 1"], "correctAnswer": "r < 1" },
                    { "question": "La derivada de la función logarítmica ln(x) es...", "options": ["1", "1/x", "e^x"], "correctAnswer": "1/x" },
                    { "question": "La suma de los primeros 'n' números enteros es...", "options": ["n(n+1)/2", "n²", "n(n-1)/2"], "correctAnswer": "n(n+1)/2" },
                    { "question": "En estadística, la desviación estándar mide...", "options": ["El valor promedio", "La dispersión de los datos", "El valor central"], "correctAnswer": "La dispersión de los datos" }
                ]
            },
            {
                id: 14,
                title: "Nivel 14",
                passingScore: 0.85,
                questions: [
                    { "question": "La transformada de Laplace de la función f(t)=1 es...", "options": ["1/s²", "1", "1/s"], "correctAnswer": "1/s" },
                    { "question": "El determinante de la matriz [[1, 2], [3, 4]] es...", "options": ["-2", "2", "0"], "correctAnswer": "-2" },
                    { "question": "¿Cuál es la ecuación de una parábola con vértice en el origen?", "options": ["y = ax²", "x = ay²", "Ambas son correctas"], "correctAnswer": "Ambas son correctas" },
                    { "question": "La derivada de la función f(x) = e^x es...", "options": ["1", "e^x", "e^x + C"], "correctAnswer": "e^x" },
                    { "question": "El número áureo, φ (Phi), es aproximadamente...", "options": ["1.414", "1.618", "3.14159"], "correctAnswer": "1.618" }
                ]
            },
            {
                id: 15,
                title: "Nivel 15",
                passingScore: 0.85,
                questions: [
                    { "question": "Un número complejo z = a + bi tiene una parte real que es...", "options": ["a", "b", "bi"], "correctAnswer": "a" },
                    { "question": "La fórmula de la distancia entre dos puntos (x1, y1) y (x2, y2) es...", "options": ["(x2-x1)² + (y2-y1)²", "√((x2-x1)² + (y2-y1)²)"], "correctAnswer": "√((x2-x1)² + (y2-y1)²)" },
                    { "question": "La regla de L'Hôpital se utiliza para resolver...", "options": ["Integrales", "Derivadas", "Límites indeterminados"], "correctAnswer": "Límites indeterminados" },
                    { "question": "La integral de cos(x) es...", "options": ["sen(x) + C", "-sen(x) + C", "tan(x) + C"], "correctAnswer": "sen(x) + C" },
                    { "question": "Un número irracional es...", "options": ["El que se puede escribir como fracción", "El que no se puede escribir como fracción", "Un número negativo"], "correctAnswer": "El que no se puede escribir como fracción" }
                ]
            },
            {
                id: 16,
                title: "Nivel 16",
                passingScore: 0.9,
                questions: [
                    { "question": "La ecuación de una circunferencia con centro en (0,0) es...", "options": ["x² + y² = r", "x² - y² = r²", "x² + y² = r²"], "correctAnswer": "x² + y² = r²" },
                    { "question": "¿Cuál es la derivada de la función f(x) = c, donde c es una constante?", "options": ["x", "c", "0"], "correctAnswer": "0" },
                    { "question": "El resultado de la sumatoria Σ(i) desde i=1 hasta 5 es...", "options": ["10", "15", "20"], "correctAnswer": "15" },
                    { "question": "¿Cuál es la fórmula para calcular el volumen de una esfera?", "options": ["4/3 πr³", "πr²h", "2πrh"], "correctAnswer": "4/3 πr³" },
                    { "question": "La derivada de ln(x) es...", "options": ["x", "1/x", "e^x"], "correctAnswer": "1/x" }
                ]
            },
            {
                id: 17,
                title: "Nivel 17",
                passingScore: 0.9,
                questions: [
                    { "question": "La ley de los signos para la multiplicación dice que 'menos por menos' es...", "options": ["menos", "más", "cero"], "correctAnswer": "más" },
                    { "question": "¿Cuánto es (-2) x (-3)?", "options": ["-5", "-6", "6"], "correctAnswer": "6" },
                    { "question": "La moda del conjunto de datos {1, 2, 2, 3, 5} es...", "options": ["1", "2", "3"], "correctAnswer": "2" },
                    { "question": "¿Cuál es la media (promedio) de 2, 4 y 6?", "options": ["4", "3", "5"], "correctAnswer": "4" },
                    { "question": "El valor de 'a' en (a+2)(a-2) = a² - 4 es...", "options": ["a", "2", "No se puede determinar"], "correctAnswer": "No se puede determinar" }
                ]
            },
            {
                id: 18,
                title: "Nivel 18",
                passingScore: 0.9,
                questions: [
                    { "question": "Un número es primo si solo tiene dos divisores...", "options": ["el 1 y el 2", "el 1 y él mismo", "él mismo y cualquier otro número"], "correctAnswer": "el 1 y él mismo" },
                    { "question": "¿Qué número es primo?", "options": ["9", "15", "13"], "correctAnswer": "13" },
                    { "question": "El área de un círculo con radio 3 (usando π=3.14) es...", "options": ["18.84", "28.26", "9.42"], "correctAnswer": "28.26" },
                    { "question": "El volumen de un cilindro es...", "options": ["πr²h", "2πrh", "4/3πr³"], "correctAnswer": "πr²h" },
                    { "question": "El perímetro de un círculo se llama...", "options": ["área", "circunferencia", "radio"], "correctAnswer": "circunferencia" }
                ]
            },
            {
                id: 19,
                title: "Nivel 19",
                passingScore: 0.95,
                questions: [
                    { "question": "El logaritmo de 1000 en base 10 es...", "options": ["2", "3", "10"], "correctAnswer": "3" },
                    { "question": "La ecuación de la recta es...", "options": ["y = mx + b", "x² + y² = r²", "y = ax² + bx + c"], "correctAnswer": "y = mx + b" },
                    { "question": "La fórmula general para resolver ecuaciones cuadráticas es...", "options": ["x = -b ± √(b²-4ac)/2a", "a² + b² = c²", "V = πr²h"], "correctAnswer": "x = -b ± √(b²-4ac)/2a" },
                    { "question": "Una función exponencial es de la forma...", "options": ["y = ax²", "y = a^x", "y = log(x)"], "correctAnswer": "y = a^x" },
                    { "question": "La derivada de una constante es...", "options": ["1", "la constante", "0"], "correctAnswer": "0" }
                ]
            },
            {
                id: 20,
                title: "Nivel 20",
                passingScore: 0.95,
                questions: [
                    { "question": "La derivada de x³ es...", "options": ["3x²", "3x", "x⁴/4"], "correctAnswer": "3x²" },
                    { "question": "La integral de x² es...", "options": ["2x", "x³", "x³/3 + C"], "correctAnswer": "x³/3 + C" },
                    { "question": "La derivada de e^x es...", "options": ["1", "x*e^x", "e^x"], "correctAnswer": "e^x" },
                    { "question": "El límite de una función cuando x tiende a 'a' es...", "options": ["siempre f(a)", "el valor al que se acerca la función", "el punto de origen"], "correctAnswer": "el valor al que se acerca la función" },
                    { "question": "Un vector en 2D tiene...", "options": ["solo magnitud", "solo dirección", "magnitud y dirección"], "correctAnswer": "magnitud y dirección" }
                ]
            },
            // Dificultad Experta (Niveles 21-30)
            {
                id: 21,
                title: "Nivel 21",
                passingScore: 0.95,
                questions: [
                    { "question": "La matriz inversa de una matriz 'A' es una matriz 'B' tal que A x B es igual a...", "options": ["La matriz nula", "La matriz identidad", "La matriz transpuesta"], "correctAnswer": "La matriz identidad" },
                    { "question": "La determinante de una matriz 2x2 [[a, b], [c, d]] se calcula como...", "options": ["a*c + b*d", "a*d - b*c", "a*b - c*d"], "correctAnswer": "a*d - b*c" },
                    { "question": "El gradiente de una función multivariable es...", "options": ["una constante", "un escalar", "un vector"], "correctAnswer": "un vector" },
                    { "question": "Un número imaginario es...", "options": ["un número negativo", "la raíz cuadrada de un número negativo", "la raíz cúbica de un número negativo"], "correctAnswer": "la raíz cuadrada de un número negativo" },
                    { "question": "La ecuación de una elipse es...", "options": ["x² + y² = r²", "x²/a² + y²/b² = 1", "y = ax² + b"], "correctAnswer": "x²/a² + y²/b² = 1" }
                ]
            },
            {
                id: 22,
                title: "Nivel 22",
                passingScore: 1.0,
                questions: [
                    { "question": "La derivada de tan(x) es...", "options": ["sec²(x)", "cos(x)", "-sen(x)"], "correctAnswer": "sec²(x)" },
                    { "question": "La integral de sen(x) es...", "options": ["cos(x) + C", "-cos(x) + C", "tan(x) + C"], "correctAnswer": "-cos(x) + C" },
                    { "question": "La regla de la cadena se usa para derivar...", "options": ["sumas de funciones", "productos de funciones", "funciones compuestas"], "correctAnswer": "funciones compuestas" },
                    { "question": "La integral definida de una función representa...", "options": ["La pendiente de la función", "El área bajo la curva", "El punto de origen"], "correctAnswer": "El área bajo la curva" },
                    { "question": "Un número complejo en su forma polar se representa con...", "options": ["a+bi", "r(cosθ + isenθ)", "x+y"], "correctAnswer": "r(cosθ + isenθ)" }
                ]
            },
            {
                id: 23,
                title: "Nivel 23",
                passingScore: 1.0,
                questions: [
                    { "question": "El producto punto de dos vectores perpendiculares es...", "options": ["1", "0", "un vector"], "correctAnswer": "0" },
                    { "question": "La transformada de Laplace de la derivada de una función f'(t) es...", "options": ["F(s) - f(0)", "sF(s) - f(0)", "F(s)/s"], "correctAnswer": "sF(s) - f(0)" },
                    { "question": "La regla de Cramer se usa para resolver...", "options": ["ecuaciones cuadráticas", "sistemas de ecuaciones lineales", "integrales"], "correctAnswer": "sistemas de ecuaciones lineales" },
                    { "question": "Un grupo abeliano es aquel en el que se cumple la propiedad...", "options": ["Asociativa", "Conmutativa", "Distributiva"], "correctAnswer": "Conmutativa" },
                    { "question": "La suma de una serie geométrica infinita es S = a/(1-r) si...", "options": ["r > 1", "|r| < 1", "r = 1"], "correctAnswer": "|r| < 1" }
                ]
            },
            {
                id: 24,
                title: "Nivel 24",
                passingScore: 1.0,
                questions: [
                    { "question": "El valor de π (Pi) es aproximadamente...", "options": ["2.718", "3.14159", "1.618"], "correctAnswer": "3.14159" },
                    { "question": "El número 'e' (número de Euler) es aproximadamente...", "options": ["2.718", "3.14159", "1.618"], "correctAnswer": "2.718" },
                    { "question": "La derivada de un producto de funciones f(x)g(x) es...", "options": ["f'(x)g'(x)", "f'(x)g(x) + f(x)g'(x)", "f(x)g(x)"], "correctAnswer": "f'(x)g(x) + f(x)g'(x)" },
                    { "question": "El límite de (1+1/n)^n cuando n tiende a infinito es...", "options": ["1", "0", "e"], "correctAnswer": "e" },
                    { "question": "El conjunto de los números naturales se representa con el símbolo...", "options": ["Z", "Q", "N"], "correctAnswer": "N" }
                ]
            },
            {
                id: 25,
                title: "Nivel 25",
                passingScore: 1.0,
                questions: [
                    { "question": "El número 'i' (unidad imaginaria) es igual a...", "options": ["-1", "√(-1)", "1"], "correctAnswer": "√(-1)" },
                    { "question": "El valor de cos(0) es...", "options": ["-1", "0", "1"], "correctAnswer": "1" },
                    { "question": "La ecuación de Euler para un poliedro es V - E + F =...", "options": ["0", "1", "2"], "correctAnswer": "2" },
                    { "question": "La ecuación de la hipérbola es...", "options": ["x²/a² + y²/b² = 1", "x²/a² - y²/b² = 1", "x² + y² = r²"], "correctAnswer": "x²/a² - y²/b² = 1" },
                    { "question": "La regla del cociente para derivar (f/g) es...", "options": ["(f'g - fg')/g²", "f'g + fg'", "f'g'"], "correctAnswer": "(f'g - fg')/g²" }
                ]
            },
            {
                id: 26,
                title: "Nivel 26",
                passingScore: 1.0,
                questions: [
                    { "question": "El concepto de 'infinito' se representa con el símbolo...", "options": ["π", "φ", "∞"], "correctAnswer": "∞" },
                    { "question": "La integral de 1/sqrt(1-x²) es...", "options": ["arcsen(x) + C", "arctan(x) + C", "sen(x) + C"], "correctAnswer": "arcsen(x) + C" },
                    { "question": "El valor del determinante de una matriz triangular es el producto de...", "options": ["los elementos de la diagonal principal", "los elementos de la diagonal secundaria", "todos los elementos"], "correctAnswer": "los elementos de la diagonal principal" },
                    { "question": "Un grafo conexo es aquel en el que...", "options": ["todos los vértices están conectados", "hay un ciclo", "todos los vértices tienen grado par"], "correctAnswer": "todos los vértices están conectados" },
                    { "question": "La función inversa de f(x) = e^x es...", "options": ["f⁻¹(x) = x", "f⁻¹(x) = ln(x)", "f⁻¹(x) = 1/e^x"], "correctAnswer": "f⁻¹(x) = ln(x)" }
                ]
            },
            {
                id: 27,
                title: "Nivel 27",
                passingScore: 1.0,
                questions: [
                    { "question": "Una 'partición' de un conjunto es una colección de subconjuntos...", "options": ["que tienen elementos en común", "que son disjuntos y su unión es el conjunto original", "que son iguales"], "correctAnswer": "que son disjuntos y su unión es el conjunto original" },
                    { "question": "El número de combinaciones de 'n' elementos tomados de 'k' en 'k' se representa como...", "options": ["C(n,k) = n! / (k!(n-k)!)", "P(n,k) = n! / (n-k)!"], "correctAnswer": "C(n,k) = n! / (k!(n-k)!)" },
                    { "question": "La fórmula de Bayes se utiliza para calcular...", "options": ["probabilidad de eventos independientes", "probabilidad condicional", "probabilidad de la unión de eventos"], "correctAnswer": "probabilidad condicional" },
                    { "question": "La integral por partes se basa en la fórmula...", "options": ["∫udv = uv - ∫vdu", "∫(f+g)dx = ∫fdx + ∫gdx", "∫f(g(x))g'(x)dx"], "correctAnswer": "∫udv = uv - ∫vdu" },
                    { "question": "Un 'espacio vectorial' es un conjunto de vectores que...", "options": ["es cerrado bajo la suma y la multiplicación por escalares", "es un conjunto de números", "es un plano"], "correctAnswer": "es cerrado bajo la suma y la multiplicación por escalares" }
                ]
            },
            {
                id: 28,
                title: "Nivel 28",
                passingScore: 1.0,
                questions: [
                    { "question": "La 'serie de Taylor' de una función representa...", "options": ["una aproximación de la función mediante polinomios", "la integral de la función", "la transformada de Laplace de la función"], "correctAnswer": "una aproximación de la función mediante polinomios" },
                    { "question": "El teorema fundamental del cálculo relaciona...", "options": ["derivación e integración", "suma y resta", "multiplicación y división"], "correctAnswer": "derivación e integración" },
                    { "question": "La transformada de Fourier convierte una función del dominio del tiempo al dominio...", "options": ["de la frecuencia", "de la potencia", "de la amplitud"], "correctAnswer": "de la frecuencia" },
                    { "question": "La 'matriz transpuesta' de una matriz 'A' es...", "options": ["la inversa de A", "la matriz A con las filas y columnas intercambiadas", "la matriz A multiplicada por un escalar"], "correctAnswer": "la matriz A con las filas y columnas intercambiadas" },
                    { "question": "Un 'sistema de ecuaciones' es homogéneo si todos sus términos constantes son...", "options": ["1", "0", "negativos"], "correctAnswer": "0" }
                ]
            },
            {
                id: 29,
                title: "Nivel 29",
                passingScore: 1.0,
                questions: [
                    { "question": "El valor de la integral de -∞ a +∞ de la función de densidad de probabilidad es...", "options": ["0", "1", "infinito"], "correctAnswer": "1" },
                    { "question": "La 'media geométrica' de un conjunto de números es...", "options": ["la suma de los números entre la cantidad", "la raíz enésima del producto de los números", "el número que más se repite"], "correctAnswer": "la raíz enésima del producto de los números" },
                    { "question": "Una 'ecuación diferencial' es una ecuación que contiene...", "options": ["variables y constantes", "una función y sus derivadas", "funciones trigonométricas"], "correctAnswer": "una función y sus derivadas" },
                    { "question": "La fórmula de la circunferencia de un círculo es...", "options": ["πr²", "2πr", "πd"], "correctAnswer": "2πr" },
                    { "question": "La regla del trapecio es un método de...", "options": ["derivación numérica", "integración numérica", "resolución de ecuaciones"], "correctAnswer": "integración numérica" }
                ]
            },
            {
                id: 30,
                title: "Nivel 30",
                passingScore: 1.0,
                questions: [
                    { "question": "El concepto de 'teorema de los cuatro colores' se aplica a...", "options": ["la topología de redes", "la teoría de grafos", "la geometría euclidiana"], "correctAnswer": "la teoría de grafos" },
                    { "question": "La 'hipótesis de Riemann' se refiere a la distribución de...", "options": ["los números primos", "los números irracionales", "los números complejos"], "correctAnswer": "los números primos" },
                    { "question": "La 'conjetura de Poincaré' está relacionada con el campo de...", "options": ["la geometría diferencial", "la topología", "el álgebra lineal"], "correctAnswer": "la topología" },
                    { "question": "La 'serie de Fourier' descompone una función periódica en una suma de...", "options": ["polinomios", "senos y cosenos", "exponenciales"], "correctAnswer": "senos y cosenos" },
                    { "question": "La 'ecuación de Schrödinger' es fundamental en...", "options": ["la mecánica newtoniana", "la mecánica cuántica", "la termodinámica"], "correctAnswer": "la mecánica cuántica" }
                ]
            }
        ];