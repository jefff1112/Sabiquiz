export const levels = [
    // --- Dificultad Baja (Niveles 1-5) ---
    {
        id: 1, title: "Nivel 1", passingScore: 0.6,
        questions: [
            { question: { es: "¿Cuánto es 2 + 2?", en: "What is 2 + 2?" }, options: { es: ["3", "4", "5"], en: ["3", "4", "5"] }, correctAnswer: { es: "4", en: "4" } },
            { question: { es: "¿Qué número va después del 7?", en: "What number comes after 7?" }, options: { es: ["8", "6", "9"], en: ["8", "6", "9"] }, correctAnswer: { es: "8", en: "8" } },
            { question: { es: "¿Cuántos lados tiene un triángulo?", en: "How many sides does a triangle have?" }, options: { es: ["3", "4", "5"], en: ["3", "4", "5"] }, correctAnswer: { es: "3", en: "3" } },
            { question: { es: "¿Cuánto es 5 - 1?", en: "What is 5 - 1?" }, options: { es: ["4", "6", "3"], en: ["4", "6", "3"] }, correctAnswer: { es: "4", en: "4" } },
            { question: { es: "Si tienes 2 manzanas y te dan 1 más, ¿cuántas tienes?", en: "If you have 2 apples and are given 1 more, how many do you have?" }, options: { es: ["2", "4", "3"], en: ["2", "4", "3"] }, correctAnswer: { es: "3", en: "3" } }
        ]
    },
    {
        id: 2, title: "Nivel 2", passingScore: 0.65,
        questions: [
            { question: { es: "¿Cuánto es 2 x 3?", en: "What is 2 x 3?" }, options: { es: ["5", "6", "8"], en: ["5", "6", "8"] }, correctAnswer: { es: "6", en: "6" } },
            { question: { es: "La mitad de 10 es...", en: "Half of 10 is..." }, options: { es: ["4", "5", "6"], en: ["4", "5", "6"] }, correctAnswer: { es: "5", en: "5" } },
            { question: { es: "Si divides 8 dulces entre 4 niños, ¿cuántos dulces le tocan a cada uno?", en: "If you divide 8 candies among 4 children, how many candies does each one get?" }, options: { es: ["3", "2", "4"], en: ["3", "2", "4"] }, correctAnswer: { es: "2", en: "2" } },
            { question: { es: "¿Cuánto es 20 + 15?", en: "What is 20 + 15?" }, options: { es: ["30", "35", "40"], en: ["30", "35", "40"] }, correctAnswer: { es: "35", en: "35" } },
            { question: { es: "Un centenar es igual a...", en: "A hundred is equal to..." }, options: { es: ["10", "100", "1000"], en: ["10", "100", "1000"] }, correctAnswer: { es: "100", en: "100" } }
        ]
    },
    {
        id: 3, title: "Nivel 3", passingScore: 0.7,
        questions: [
            { question: { es: "¿Cuál es el resultado de 7 x 7?", en: "What is the result of 7 x 7?" }, options: { es: ["42", "49", "56"], en: ["42", "49", "56"] }, correctAnswer: { es: "49", en: "49" } },
            { question: { es: "¿Qué número es impar?", en: "Which number is odd?" }, options: { es: ["8", "10", "13"], en: ["8", "10", "13"] }, correctAnswer: { es: "13", en: "13" } },
            { question: { es: "El perímetro de un cuadrado de lado 5 cm es...", en: "The perimeter of a square with a side of 5 cm is..." }, options: { es: ["10 cm", "20 cm", "25 cm"], en: ["10 cm", "20 cm", "25 cm"] }, correctAnswer: { es: "20 cm", en: "20 cm" } },
            { question: { es: "¿Cuánto es 1/4 + 1/4?", en: "What is 1/4 + 1/4?" }, options: { es: ["1/2", "2/8", "1/4"], en: ["1/2", "2/8", "1/4"] }, correctAnswer: { es: "1/2", en: "1/2" } },
            { question: { es: "Un ángulo de 90 grados es...", en: "A 90-degree angle is..." }, options: { es: ["Agudo", "Recto", "Obtuso"], en: ["Acute", "Right", "Obtuse"] }, correctAnswer: { es: "Recto", en: "Right" } }
        ]
    },
    {
        id: 4, title: "Nivel 4", passingScore: 0.7,
        questions: [
            { question: { es: "El área de un rectángulo con base 6 y altura 4 es...", en: "The area of a rectangle with a base of 6 and a height of 4 is..." }, options: { es: ["10", "20", "24"], en: ["10", "20", "24"] }, correctAnswer: { es: "24", en: "24" } },
            { question: { es: "La fracción 5/10 es equivalente a...", en: "The fraction 5/10 is equivalent to..." }, options: { es: ["1/5", "1/2", "2/5"], en: ["1/5", "1/2", "2/5"] }, correctAnswer: { es: "1/2", en: "1/2" } },
            { question: { es: "¿Cuánto es 0.5 x 10?", en: "What is 0.5 x 10?" }, options: { es: ["0.05", "5", "50"], en: ["0.05", "5", "50"] }, correctAnswer: { es: "5", en: "5" } },
            { question: { es: "¿Cuál es el valor de x en la ecuación: x + 5 = 10?", en: "What is the value of x in the equation: x + 5 = 10?" }, options: { es: ["15", "5", "2"], en: ["15", "5", "2"] }, correctAnswer: { es: "5", en: "5" } },
            { question: { es: "El número romano 'X' representa...", en: "The Roman numeral 'X' represents..." }, options: { es: ["5", "10", "1"], en: ["5", "10", "1"] }, correctAnswer: { es: "10", en: "10" } }
        ]
    },
    {
        id: 5, title: "Nivel 5", passingScore: 0.75,
        questions: [
            { question: { es: "El M.C.D. de 12 y 18 es...", en: "The G.C.D. of 12 and 18 is..." }, options: { es: ["6", "3", "12"], en: ["6", "3", "12"] }, correctAnswer: { es: "6", en: "6" } },
            { question: { es: "La suma de los ángulos internos de un triángulo es...", en: "The sum of the internal angles of a triangle is..." }, options: { es: ["90°", "180°", "360°"], en: ["90°", "180°", "360°"] }, correctAnswer: { es: "180°", en: "180°" } },
            { question: { es: "El resultado de 5² es...", en: "The result of 5² is..." }, options: { es: ["10", "25", "7"], en: ["10", "25", "7"] }, correctAnswer: { es: "25", en: "25" } },
            { question: { es: "¿Cuál es la raíz cuadrada de 144?", en: "What is the square root of 144?" }, options: { es: ["10", "12", "24"], en: ["10", "12", "24"] }, correctAnswer: { es: "12", en: "12" } },
            { question: { es: "¿Qué número es divisible por 3?", en: "Which number is divisible by 3?" }, options: { es: ["25", "37", "42"], en: ["25", "37", "42"] }, correctAnswer: { es: "42", en: "42" } }
        ]
    },
    {
        id: 6, title: "Nivel 6", passingScore: 0.75,
        questions: [
            { question: { es: "¿Cuánto es 120 / 10?", en: "What is 120 / 10?" }, options: { es: ["10", "12", "1200"], en: ["10", "12", "1200"] }, correctAnswer: { es: "12", en: "12" } },
            { question: { es: "El L.C.M. de 4 y 6 es...", en: "The L.C.M. of 4 and 6 is..." }, options: { es: ["12", "18", "24"], en: ["12", "18", "24"] }, correctAnswer: { es: "12", en: "12" } },
            { question: { es: "El valor de 'y' en la ecuación 2y - 3 = 7 es...", en: "The value of 'y' in the equation 2y - 3 = 7 is..." }, options: { es: ["5", "10", "2"], en: ["5", "10", "2"] }, correctAnswer: { es: "5", en: "5" } },
            { question: { es: "¿Cuánto es 25% de 200?", en: "What is 25% of 200?" }, options: { es: ["25", "50", "100"], en: ["25", "50", "100"] }, correctAnswer: { es: "50", en: "50" } },
            { question: { es: "La pendiente de una recta es...", en: "The slope of a line is..." }, options: { es: ["La inclinación", "La intersección con el eje Y", "El punto de origen"], en: ["The inclination", "The Y-intercept", "The origin point"] }, correctAnswer: { es: "La inclinación", en: "The inclination" } }
        ]
    },
    {
        id: 7, title: "Nivel 7", passingScore: 0.8,
        questions: [
            { question: { es: "La mediana de los números 2, 5, 8, 9, 11 es...", en: "The median of the numbers 2, 5, 8, 9, 11 is..." }, options: { es: ["5", "8", "9"], en: ["5", "8", "9"] }, correctAnswer: { es: "8", en: "8" } },
            { question: { es: "El resultado de (x + 3)² es...", en: "The result of (x + 3)² is..." }, options: { es: ["x² + 9", "x² + 6x + 9", "x² + 3x + 9"], en: ["x² + 9", "x² + 6x + 9", "x² + 3x + 9"] }, correctAnswer: { es: "x² + 6x + 9", en: "x² + 6x + 9" } },
            { question: { es: "La ecuación de una recta horizontal es de la forma...", en: "The equation of a horizontal line is of the form..." }, options: { es: ["y = mx + b", "x = k", "y = k"], en: ["y = mx + b", "x = k", "y = k"] }, correctAnswer: { es: "y = k", en: "y = k" } },
            { question: { es: "¿Cuál es el teorema de Pitágoras?", en: "What is the Pythagorean theorem?" }, options: { es: ["a+b=c", "a²+b²=c²", "a²-b²=c²"], en: ["a+b=c", "a²+b²=c²", "a²-b²=c²"] }, correctAnswer: { es: "a²+b²=c²", en: "a²+b²=c²" } },
            { question: { es: "Un número elevado a la potencia 0 es...", en: "A number raised to the power of 0 is..." }, options: { es: ["0", "1", "el mismo número"], en: ["0", "1", "the same number"] }, correctAnswer: { es: "1", en: "1" } }
        ]
    },
    {
        id: 8, title: "Nivel 8", passingScore: 0.8,
        questions: [
            { question: { es: "La moda del conjunto {2, 5, 5, 8, 9} es...", en: "The mode of the set {2, 5, 5, 8, 9} is..." }, options: { es: ["2", "5", "8"], en: ["2", "5", "8"] }, correctAnswer: { es: "5", en: "5" } },
            { question: { es: "El valor de x en 3x = 12 es...", en: "The value of x in 3x = 12 is..." }, options: { es: ["3", "4", "9"], en: ["3", "4", "9"] }, correctAnswer: { es: "4", en: "4" } },
            { question: { es: "El volumen de un cubo de lado 3 es...", en: "The volume of a cube with side 3 is..." }, options: { es: ["9", "27", "18"], en: ["9", "27", "18"] }, correctAnswer: { es: "27", en: "27" } },
            { question: { es: "La fórmula del área de un triángulo es...", en: "The formula for the area of a triangle is..." }, options: { es: ["b*h", "(b*h)/2", "πr²"], en: ["b*h", "(b*h)/2", "πr²"] }, correctAnswer: { es: "(b*h)/2", en: "(b*h)/2" } },
            { question: { es: "¿Cuál es la notación científica de 5,000,000?", en: "What is the scientific notation for 5,000,000?" }, options: { es: ["5 x 10⁶", "5 x 10⁵", "50 x 10⁵"], en: ["5 x 10⁶", "5 x 10⁵", "50 x 10⁵"] }, correctAnswer: { es: "5 x 10⁶", en: "5 x 10⁶" } }
        ]
    },
    {
        id: 9, title: "Nivel 9", passingScore: 0.8,
        questions: [
            { question: { es: "El coeficiente de 'x²' en la expresión 3x² - 5x + 2 es...", en: "The coefficient of 'x²' in the expression 3x² - 5x + 2 is..." }, options: { es: ["3", "-5", "2"], en: ["3", "-5", "2"] }, correctAnswer: { es: "3", en: "3" } },
            { question: { es: "El dominio de una función son los valores de...", en: "The domain of a function are the values of..." }, options: { es: ["y", "x", "z"], en: ["y", "x", "z"] }, correctAnswer: { es: "x", en: "x" } },
            { question: { es: "La solución a la ecuación cuadrática x² - 4 = 0 es...", en: "The solution to the quadratic equation x² - 4 = 0 is..." }, options: { es: ["x=2", "x=4", "x=±2"], en: ["x=2", "x=4", "x=±2"] }, correctAnswer: { es: "x=±2", en: "x=±2" } },
            { question: { es: "El rango de una función son los valores de...", en: "The range of a function are the values of..." }, options: { es: ["x", "y", "z"], en: ["x", "y", "z"] }, correctAnswer: { es: "y", en: "y" } },
            { question: { es: "Una función lineal tiene como gráfica...", en: "A linear function has a graph of a..." }, options: { es: ["una parábola", "una línea recta", "un círculo"], en: ["parabola", "straight line", "circle"] }, correctAnswer: { es: "una línea recta", en: "straight line" } }
        ]
    },
    {
        id: 10, title: "Nivel 10", passingScore: 0.85,
        questions: [
            { question: { es: "El resultado de 2⁻² es...", en: "The result of 2⁻² is..." }, options: { es: ["-4", "1/4", "4"], en: ["-4", "1/4", "4"] }, correctAnswer: { es: "1/4", en: "1/4" } },
            { question: { es: "El valor de 'x' en 2x + 1 = 3x - 5 es...", en: "The value of 'x' in 2x + 1 = 3x - 5 is..." }, options: { es: ["6", "4", "2"], en: ["6", "4", "2"] }, correctAnswer: { es: "6", en: "6" } },
            { question: { es: "El logaritmo de 100 en base 10 es...", en: "The logarithm of 100 in base 10 is..." }, options: { es: ["10", "1", "2"], en: ["10", "1", "2"] }, correctAnswer: { es: "2", en: "2" } },
            { question: { es: "¿Cuál es el valor del seno de 30°?", en: "What is the value of the sine of 30°?" }, options: { es: ["0.5", "1", "0"], en: ["0.5", "1", "0"] }, correctAnswer: { es: "0.5", en: "0.5" } },
            { question: { es: "El factorial de 4 (4!) es...", en: "The factorial of 4 (4!) is..." }, options: { es: ["16", "24", "12"], en: ["16", "24", "12"] }, correctAnswer: { es: "24", en: "24" } }
        ]
    },
    // Dificultad Avanzada (Niveles 11-20)
    {
        id: 11, title: "Nivel 11", passingScore: 0.85,
        questions: [
            { question: { es: "La integral de x es...", en: "The integral of x is..." }, options: { es: ["x²", "x²/2 + C", "1"], en: ["x²", "x²/2 + C", "1"] }, correctAnswer: { es: "x²/2 + C", en: "x²/2 + C" } },
            { question: { es: "La derivada de x² es...", en: "The derivative of x² is..." }, options: { es: ["x", "2x", "2"], en: ["x", "2x", "2"] }, correctAnswer: { es: "2x", en: "2x" } },
            { question: { es: "¿Qué es un vector?", en: "What is a vector?" }, options: { es: ["Una cantidad con magnitud", "Una cantidad con dirección y magnitud", "Un punto en el espacio"], en: ["A quantity with magnitude", "A quantity with direction and magnitude", "A point in space"] }, correctAnswer: { es: "Una cantidad con dirección y magnitud", en: "A quantity with direction and magnitude" } },
            { question: { es: "El límite de (x² - 1)/(x - 1) cuando x tiende a 1 es...", en: "The limit of (x² - 1)/(x - 1) as x approaches 1 is..." }, options: { es: ["0", "1", "2"], en: ["0", "1", "2"] }, correctAnswer: { es: "2", en: "2" } },
            { question: { es: "La matriz identidad de 2x2 es...", en: "The 2x2 identity matrix is..." }, options: { es: ["[1 0; 0 1]", "[1 1; 1 1]", "[0 1; 1 0]"], en: ["[1 0; 0 1]", "[1 1; 1 1]", "[0 1; 1 0]"] }, correctAnswer: { es: "[1 0; 0 1]", en: "[1 0; 0 1]" } }
        ]
    },
    {
        id: 12, title: "Nivel 12", passingScore: 0.85,
        questions: [
            { question: { es: "El rango de la matriz [1 2; 3 4] es...", en: "The rank of the matrix [1 2; 3 4] is..." }, options: { es: ["1", "2", "0"], en: ["1", "2", "0"] }, correctAnswer: { es: "2", en: "2" } },
            { question: { es: "La derivada de sen(x) es...", en: "The derivative of sin(x) is..." }, options: { es: ["-cos(x)", "cos(x)", "tan(x)"], en: ["-cos(x)", "cos(x)", "tan(x)"] }, correctAnswer: { es: "cos(x)", en: "cos(x)" } },
            { question: { es: "La integral de 1/x es...", en: "The integral of 1/x is..." }, options: { es: ["ln|x| + C", "x⁻²", "-1/x² + C"], en: ["ln|x| + C", "x⁻²", "-1/x² + C"] }, correctAnswer: { es: "ln|x| + C", en: "ln|x| + C" } },
            { question: { es: "El valor del coseno de 90° es...", en: "The value of the cosine of 90° is..." }, options: { es: ["1", "-1", "0"], en: ["1", "-1", "0"] }, correctAnswer: { es: "0", en: "0" } },
            { question: { es: "Si f(x) = 2x, entonces f(g(x)) = 4x. ¿Cuál es g(x)?", en: "If f(x) = 2x, then f(g(x)) = 4x. What is g(x)?" }, options: { es: ["2x", "x", "x+2"], en: ["2x", "x", "x+2"] }, correctAnswer: { es: "2x", en: "2x" } }
        ]
    },
    {
        id: 13, title: "Nivel 13", passingScore: 0.85,
        questions: [
            { question: { es: "El producto cruz de dos vectores paralelos es...", en: "The cross product of two parallel vectors is..." }, options: { es: ["Un vector unitario", "Un vector cero", "Un escalar"], en: ["A unit vector", "A zero vector", "A scalar"] }, correctAnswer: { es: "Un vector cero", en: "A zero vector" } },
            { question: { es: "Una serie geométrica infinita converge si el valor absoluto de la razón común 'r' es...", en: "An infinite geometric series converges if the absolute value of the common ratio 'r' is..." }, options: { es: ["r > 1", "r < 1", "r = 1"], en: ["r > 1", "r < 1", "r = 1"] }, correctAnswer: { es: "r < 1", en: "r < 1" } },
            { question: { es: "La derivada de la función logarítmica ln(x) es...", en: "The derivative of the logarithmic function ln(x) is..." }, options: { es: ["1", "1/x", "e^x"], en: ["1", "1/x", "e^x"] }, correctAnswer: { es: "1/x", en: "1/x" } },
            { question: { es: "La suma de los primeros 'n' números enteros es...", en: "The sum of the first 'n' integers is..." }, options: { es: ["n(n+1)/2", "n²", "n(n-1)/2"], en: ["n(n+1)/2", "n²", "n(n-1)/2"] }, correctAnswer: { es: "n(n+1)/2", en: "n(n+1)/2" } },
            { question: { es: "En estadística, la desviación estándar mide...", en: "In statistics, the standard deviation measures..." }, options: { es: ["El valor promedio", "La dispersión de los datos", "El valor central"], en: ["The average value", "The dispersion of the data", "The central value"] }, correctAnswer: { es: "La dispersión de los datos", en: "The dispersion of the data" } }
        ]
    },
    {
        id: 14, title: "Nivel 14", passingScore: 0.85,
        questions: [
            { question: { es: "La transformada de Laplace de la función f(t)=1 es...", en: "The Laplace transform of the function f(t)=1 is..." }, options: { es: ["1/s²", "1", "1/s"], en: ["1/s²", "1", "1/s"] }, correctAnswer: { es: "1/s", en: "1/s" } },
            { question: { es: "El determinante de la matriz [[1, 2], [3, 4]] es...", en: "The determinant of the matrix [[1, 2], [3, 4]] is..." }, options: { es: ["-2", "2", "0"], en: ["-2", "2", "0"] }, correctAnswer: { es: "-2", en: "-2" } },
            { question: { es: "¿Cuál es la ecuación de una parábola con vértice en el origen?", en: "What is the equation of a parabola with its vertex at the origin?" }, options: { es: ["y = ax²", "x = ay²", "Ambas son correctas"], en: ["y = ax²", "x = ay²", "Both are correct"] }, correctAnswer: { es: "Ambas son correctas", en: "Both are correct" } },
            { question: { es: "La derivada de la función f(x) = e^x es...", en: "The derivative of the function f(x) = e^x is..." }, options: { es: ["1", "e^x", "e^x + C"], en: ["1", "e^x", "e^x + C"] }, correctAnswer: { es: "e^x", en: "e^x" } },
            { question: { es: "El número áureo, φ (Phi), es aproximadamente...", en: "The golden ratio, φ (Phi), is approximately..." }, options: { es: ["1.414", "1.618", "3.14159"], en: ["1.414", "1.618", "3.14159"] }, correctAnswer: { es: "1.618", en: "1.618" } }
        ]
    },
    {
        id: 15, title: "Nivel 15", passingScore: 0.85,
        questions: [
            { question: { es: "Un número complejo z = a + bi tiene una parte real que es...", en: "A complex number z = a + bi has a real part which is..." }, options: { es: ["a", "b", "bi"], en: ["a", "b", "bi"] }, correctAnswer: { es: "a", en: "a" } },
            { question: { es: "La fórmula de la distancia entre dos puntos (x1, y1) y (x2, y2) es...", en: "The distance formula between two points (x1, y1) and (x2, y2) is..." }, options: { es: ["(x2-x1)² + (y2-y1)²", "√((x2-x1)² + (y2-y1)²)"], en: ["(x2-x1)² + (y2-y1)²", "√((x2-x1)² + (y2-y1)²)" ] }, correctAnswer: { es: "√((x2-x1)² + (y2-y1)²)", en: "√((x2-x1)² + (y2-y1)²)" } },
            { question: { es: "La regla de L'Hôpital se utiliza para resolver...", en: "L'Hôpital's rule is used to solve..." }, options: { es: ["Integrales", "Derivadas", "Límites indeterminados"], en: ["Integrals", "Derivatives", "Indeterminate limits"] }, correctAnswer: { es: "Límites indeterminados", en: "Indeterminate limits" } },
            { question: { es: "La integral de cos(x) es...", en: "The integral of cos(x) is..." }, options: { es: ["sen(x) + C", "-sen(x) + C", "tan(x) + C"], en: ["sin(x) + C", "-sin(x) + C", "tan(x) + C"] }, correctAnswer: { es: "sen(x) + C", en: "sin(x) + C" } },
            { question: { es: "Un número irracional es...", en: "An irrational number is..." }, options: { es: ["El que se puede escribir como fracción", "El que no se puede escribir como fracción", "Un número negativo"], en: ["One that can be written as a fraction", "One that cannot be written as a fraction", "A negative number"] }, correctAnswer: { es: "El que no se puede escribir como fracción", en: "One that cannot be written as a fraction" } }
        ]
    },
    // Dificultad Experto (Niveles 16-30)
    {
        id: 16, title: "Nivel 16", passingScore: 0.9,
        questions: [
            { question: { es: "La ecuación de una circunferencia con centro en (0,0) es...", en: "The equation of a circle with center at (0,0) is..." }, options: { es: ["x² + y² = r", "x² - y² = r²", "x² + y² = r²"], en: ["x² + y² = r", "x² - y² = r²", "x² + y² = r²"] }, correctAnswer: { es: "x² + y² = r²", en: "x² + y² = r²" } },
            { question: { es: "¿Cuál es la derivada de la función f(x) = c, donde c es una constante?", en: "What is the derivative of the function f(x) = c, where c is a constant?" }, options: { es: ["x", "c", "0"], en: ["x", "c", "0"] }, correctAnswer: { es: "0", en: "0" } },
            { question: { es: "El resultado de la sumatoria Σ(i) desde i=1 hasta 5 es...", en: "The result of the summation Σ(i) from i=1 to 5 is..." }, options: { es: ["10", "15", "20"], en: ["10", "15", "20"] }, correctAnswer: { es: "15", en: "15" } },
            { question: { es: "¿Cuál es la fórmula para calcular el volumen de una esfera?", en: "What is the formula to calculate the volume of a sphere?" }, options: { es: ["4/3 πr³", "πr²h", "2πrh"], en: ["4/3 πr³", "πr²h", "2πrh"] }, correctAnswer: { es: "4/3 πr³", en: "4/3 πr³" } },
            { question: { es: "La derivada de ln(x) es...", en: "The derivative of ln(x) is..." }, options: { es: ["x", "1/x", "e^x"], en: ["x", "1/x", "e^x"] }, correctAnswer: { es: "1/x", en: "1/x" } }
        ]
    },
    {
        id: 17, title: "Nivel 17", passingScore: 0.9,
        questions: [
            { question: { es: "La ley de los signos para la multiplicación dice que 'menos por menos' es...", en: "The sign rule for multiplication states that 'minus times minus' is..." }, options: { es: ["menos", "más", "cero"], en: ["minus", "plus", "zero"] }, correctAnswer: { es: "más", en: "plus" } },
            { question: { es: "¿Cuánto es (-2) x (-3)?", en: "What is (-2) x (-3)?" }, options: { es: ["-5", "-6", "6"], en: ["-5", "-6", "6"] }, correctAnswer: { es: "6", en: "6" } },
            { question: { es: "La moda del conjunto de datos {1, 2, 2, 3, 5} es...", en: "The mode of the data set {1, 2, 2, 3, 5} is..." }, options: { es: ["1", "2", "3"], en: ["1", "2", "3"] }, correctAnswer: { es: "2", en: "2" } },
            { question: { es: "¿Cuál es la media (promedio) de 2, 4 y 6?", en: "What is the mean (average) of 2, 4, and 6?" }, options: { es: ["4", "3", "5"], en: ["4", "3", "5"] }, correctAnswer: { es: "4", en: "4" } },
            { question: { es: "El valor de 'a' en (a+2)(a-2) = a² - 4 es...", en: "The value of 'a' in (a+2)(a-2) = a² - 4 is..." }, options: { es: ["a", "2", "No se puede determinar"], en: ["a", "2", "Cannot be determined"] }, correctAnswer: { es: "No se puede determinar", en: "Cannot be determined" } }
        ]
    },
    {
        id: 18, title: "Nivel 18", passingScore: 0.9,
        questions: [
            { question: { es: "Un número es primo si solo tiene dos divisores...", en: "A number is prime if it only has two divisors..." }, options: { es: ["el 1 y el 2", "el 1 y él mismo", "él mismo y cualquier otro número"], en: ["1 and 2", "1 and itself", "itself and any other number"] }, correctAnswer: { es: "el 1 y él mismo", en: "1 and itself" } },
            { question: { es: "¿Qué número es primo?", en: "Which number is prime?" }, options: { es: ["9", "15", "13"], en: ["9", "15", "13"] }, correctAnswer: { es: "13", en: "13" } },
            { question: { es: "El área de un círculo con radio 3 (usando π=3.14) es...", en: "The area of a circle with radius 3 (using π=3.14) is..." }, options: { es: ["18.84", "28.26", "9.42"], en: ["18.84", "28.26", "9.42"] }, correctAnswer: { es: "28.26", en: "28.26" } },
            { question: { es: "El volumen de un cilindro es...", en: "The volume of a cylinder is..." }, options: { es: ["πr²h", "2πrh", "4/3πr³"], en: ["πr²h", "2πrh", "4/3πr³"] }, correctAnswer: { es: "πr²h", en: "πr²h" } },
            { question: { es: "El perímetro de un círculo se llama...", en: "The perimeter of a circle is called..." }, options: { es: ["área", "circunferencia", "radio"], en: ["area", "circumference", "radius"] }, correctAnswer: { es: "circunferencia", en: "circumference" } }
        ]
    },
    {
        id: 19, title: "Nivel 19", passingScore: 0.95,
        questions: [
            { question: { es: "El logaritmo de 1000 en base 10 es...", en: "The logarithm of 1000 in base 10 is..." }, options: { es: ["2", "3", "10"], en: ["2", "3", "10"] }, correctAnswer: { es: "3", en: "3" } },
            { question: { es: "La ecuación de la recta es...", en: "The equation of a line is..." }, options: { es: ["y = mx + b", "x² + y² = r²", "y = ax² + bx + c"], en: ["y = mx + b", "x² + y² = r²", "y = ax² + bx + c"] }, correctAnswer: { es: "y = mx + b", en: "y = mx + b" } },
            { question: { es: "La fórmula general para resolver ecuaciones cuadráticas es...", en: "The general formula to solve quadratic equations is..." }, options: { es: ["x = -b ± √(b²-4ac)/2a", "a² + b² = c²", "V = πr²h"], en: ["x = -b ± √(b²-4ac)/2a", "a² + b² = c²", "V = πr²h"] }, correctAnswer: { es: "x = -b ± √(b²-4ac)/2a", en: "x = -b ± √(b²-4ac)/2a" } },
            { question: { es: "Una función exponencial es de la forma...", en: "An exponential function is of the form..." }, options: { es: ["y = ax²", "y = a^x", "y = log(x)"], en: ["y = ax²", "y = a^x", "y = log(x)"] }, correctAnswer: { es: "y = a^x", en: "y = a^x" } },
            { question: { es: "La derivada de una constante es...", en: "The derivative of a constant is..." }, options: { es: ["1", "la constante", "0"], en: ["1", "the constant", "0"] }, correctAnswer: { es: "0", en: "0" } }
        ]
    },
    {
        id: 20, title: "Nivel 20", passingScore: 0.95,
        questions: [
            { question: { es: "La derivada de x³ es...", en: "The derivative of x³ is..." }, options: { es: ["3x²", "3x", "x⁴/4"], en: ["3x²", "3x", "x⁴/4"] }, correctAnswer: { es: "3x²", en: "3x²" } },
            { question: { es: "La integral de x² es...", en: "The integral of x² is..." }, options: { es: ["2x", "x³", "x³/3 + C"], en: ["2x", "x³", "x³/3 + C"] }, correctAnswer: { es: "x³/3 + C", en: "x³/3 + C" } },
            { question: { es: "La derivada de e^x es...", en: "The derivative of e^x is..." }, options: { es: ["1", "x*e^x", "e^x"], en: ["1", "x*e^x", "e^x"] }, correctAnswer: { es: "e^x", en: "e^x" } },
            { question: { es: "El límite de una función cuando x tiende a 'a' es...", en: "The limit of a function as x approaches 'a' is..." }, options: { es: ["siempre f(a)", "el valor al que se acerca la función", "el punto de origen"], en: ["always f(a)", "the value the function approaches", "the origin point"] }, correctAnswer: { es: "el valor al que se acerca la función", en: "the value the function approaches" } },
            { question: { es: "Un vector en 2D tiene...", en: "A 2D vector has..." }, options: { es: ["solo magnitud", "solo dirección", "magnitud y dirección"], en: ["only magnitude", "only direction", "magnitude and direction"] }, correctAnswer: { es: "magnitud y dirección", en: "magnitude and direction" } }
        ]
    },
    {
        id: 21, title: "Nivel 21", passingScore: 0.95,
        questions: [
            { question: { es: "La matriz inversa de una matriz 'A' es una matriz 'B' tal que A x B es igual a...", en: "The inverse of a matrix 'A' is a matrix 'B' such that A x B equals..." }, options: { es: ["La matriz nula", "La matriz identidad", "La matriz transpuesta"], en: ["The null matrix", "The identity matrix", "The transpose matrix"] }, correctAnswer: { es: "La matriz identidad", en: "The identity matrix" } },
            { question: { es: "El determinante de una matriz 2x2 [[a, b], [c, d]] se calcula como...", en: "The determinant of a 2x2 matrix [[a, b], [c, d]] is calculated as..." }, options: { es: ["a*c + b*d", "a*d - b*c", "a*b - c*d"], en: ["a*c + b*d", "a*d - b*c", "a*b - c*d"] }, correctAnswer: { es: "a*d - b*c", en: "a*d - b*c" } },
            { question: { es: "El gradiente de una función multivariable es...", en: "The gradient of a multivariable function is..." }, options: { es: ["una constante", "un escalar", "un vector"], en: ["a constant", "a scalar", "a vector"] }, correctAnswer: { es: "un vector", en: "a vector" } },
            { question: { es: "Un número imaginario es...", en: "An imaginary number is..." }, options: { es: ["un número negativo", "la raíz cuadrada de un número negativo", "la raíz cúbica de un número negativo"], en: ["a negative number", "the square root of a negative number", "the cube root of a negative number"] }, correctAnswer: { es: "la raíz cuadrada de un número negativo", en: "the square root of a negative number" } },
            { question: { es: "La ecuación de una elipse es...", en: "The equation of an ellipse is..." }, options: { es: ["x² + y² = r²", "x²/a² + y²/b² = 1", "y = ax² + b"], en: ["x² + y² = r²", "x²/a² + y²/b² = 1", "y = ax² + b"] }, correctAnswer: { es: "x²/a² + y²/b² = 1", en: "x²/a² + y²/b² = 1" } }
        ]
    },
    {
        id: 22, title: "Nivel 22", passingScore: 1.0,
        questions: [
            { question: { es: "La derivada de tan(x) es...", en: "The derivative of tan(x) is..." }, options: { es: ["sec²(x)", "cos(x)", "-sen(x)"], en: ["sec²(x)", "cos(x)", "-sin(x)"] }, correctAnswer: { es: "sec²(x)", en: "sec²(x)" } },
            { question: { es: "La integral de sen(x) es...", en: "The integral of sin(x) is..." }, options: { es: ["cos(x) + C", "-cos(x) + C", "tan(x) + C"], en: ["cos(x) + C", "-cos(x) + C", "tan(x) + C"] }, correctAnswer: { es: "-cos(x) + C", en: "-cos(x) + C" } },
            { question: { es: "La regla de la cadena se usa para derivar...", en: "The chain rule is used to differentiate..." }, options: { es: ["sumas de funciones", "productos de funciones", "funciones compuestas"], en: ["sums of functions", "products of functions", "composite functions"] }, correctAnswer: { es: "funciones compuestas", en: "composite functions" } },
            { question: { es: "La integral definida de una función representa...", en: "The definite integral of a function represents..." }, options: { es: ["La pendiente de la función", "El área bajo la curva", "El punto de origen"], en: ["The slope of the function", "The area under the curve", "The origin point"] }, correctAnswer: { es: "El área bajo la curva", en: "The area under the curve" } },
            { question: { es: "Un número complejo en su forma polar se representa con...", en: "A complex number in its polar form is represented with..." }, options: { es: ["a+bi", "r(cosθ + isenθ)", "x+y"], en: ["a+bi", "r(cosθ + isinθ)", "x+y"] }, correctAnswer: { es: "r(cosθ + isenθ)", en: "r(cosθ + isinθ)" } }
        ]
    },
    {
        id: 23, title: "Nivel 23", passingScore: 1.0,
        questions: [
            { question: { es: "El producto punto de dos vectores perpendiculares es...", en: "The dot product of two perpendicular vectors is..." }, options: { es: ["1", "0", "un vector"], en: ["1", "0", "a vector"] }, correctAnswer: { es: "0", en: "0" } },
            { question: { es: "La transformada de Laplace de la derivada de una función f'(t) es...", en: "The Laplace transform of the derivative of a function f'(t) is..." }, options: { es: ["F(s) - f(0)", "sF(s) - f(0)", "F(s)/s"], en: ["F(s) - f(0)", "sF(s) - f(0)", "F(s)/s"] }, correctAnswer: { es: "sF(s) - f(0)", en: "sF(s) - f(0)" } },
            { question: { es: "La regla de Cramer se usa para resolver...", en: "Cramer's rule is used to solve..." }, options: { es: ["ecuaciones cuadráticas", "sistemas de ecuaciones lineales", "integrales"], en: ["quadratic equations", "systems of linear equations", "integrals"] }, correctAnswer: { es: "sistemas de ecuaciones lineales", en: "systems of linear equations" } },
            { question: { es: "Un grupo abeliano es aquel en el que se cumple la propiedad...", en: "An abelian group is one in which the property of..." }, options: { es: ["Asociativa", "Conmutativa", "Distributiva"], en: ["Associativity", "Commutativity", "Distributivity"] }, correctAnswer: { es: "Conmutativa", en: "Commutativity" } },
            { question: { es: "La suma de una serie geométrica infinita es S = a/(1-r) si...", en: "The sum of an infinite geometric series is S = a/(1-r) if..." }, options: { es: ["r > 1", "|r| < 1", "r = 1"], en: ["r > 1", "|r| < 1", "r = 1"] }, correctAnswer: { es: "|r| < 1", en: "|r| < 1" } }
        ]
    },
    {
        id: 24, title: "Nivel 24", passingScore: 1.0,
        questions: [
            { question: { es: "El valor de π (Pi) es aproximadamente...", en: "The value of π (Pi) is approximately..." }, options: { es: ["2.718", "3.14159", "1.618"], en: ["2.718", "3.14159", "1.618"] }, correctAnswer: { es: "3.14159", en: "3.14159" } },
            { question: { es: "El número 'e' (número de Euler) es aproximadamente...", en: "The number 'e' (Euler's number) is approximately..." }, options: { es: ["2.718", "3.14159", "1.618"], en: ["2.718", "3.14159", "1.618"] }, correctAnswer: { es: "2.718", en: "2.718" } },
            { question: { es: "La derivada de un producto de funciones f(x)g(x) es...", en: "The derivative of a product of functions f(x)g(x) is..." }, options: { es: ["f'(x)g'(x)", "f'(x)g(x) + f(x)g'(x)", "f(x)g(x)"], en: ["f'(x)g'(x)", "f'(x)g(x) + f(x)g'(x)", "f(x)g(x)"] }, correctAnswer: { es: "f'(x)g(x) + f(x)g'(x)", en: "f'(x)g(x) + f(x)g'(x)" } },
            { question: { es: "El límite de (1+1/n)^n cuando n tiende a infinito es...", en: "The limit of (1+1/n)^n as n approaches infinity is..." }, options: { es: ["1", "0", "e"], en: ["1", "0", "e"] }, correctAnswer: { es: "e", en: "e" } },
            { question: { es: "El conjunto de los números naturales se representa con el símbolo...", en: "The set of natural numbers is represented by the symbol..." }, options: { es: ["Z", "Q", "N"], en: ["Z", "Q", "N"] }, correctAnswer: { es: "N", en: "N" } }
        ]
    },
    {
        id: 25, title: "Nivel 25", passingScore: 1.0,
        questions: [
            { question: { es: "El número 'i' (unidad imaginaria) es igual a...", en: "The number 'i' (imaginary unit) is equal to..." }, options: { es: ["-1", "√(-1)", "1"], en: ["-1", "√(-1)", "1"] }, correctAnswer: { es: "√(-1)", en: "√(-1)" } },
            { question: { es: "El valor de cos(0) es...", en: "The value of cos(0) is..." }, options: { es: ["-1", "0", "1"], en: ["-1", "0", "1"] }, correctAnswer: { es: "1", en: "1" } },
            { question: { es: "La ecuación de Euler para un poliedro es V - E + F =...", en: "Euler's formula for a polyhedron is V - E + F =..." }, options: { es: ["0", "1", "2"], en: ["0", "1", "2"] }, correctAnswer: { es: "2", en: "2" } },
            { question: { es: "La ecuación de la hipérbola es...", en: "The equation of a hyperbola is..." }, options: { es: ["x²/a² + y²/b² = 1", "x²/a² - y²/b² = 1", "x² + y² = r²"], en: ["x²/a² + y²/b² = 1", "x²/a² - y²/b² = 1", "x² + y² = r²"] }, correctAnswer: { es: "x²/a² - y²/b² = 1", en: "x²/a² - y²/b² = 1" } },
            { question: { es: "La regla del cociente para derivar (f/g) es...", en: "The quotient rule for differentiating (f/g) is..." }, options: { es: ["(f'g - fg')/g²", "f'g + fg'", "f'g'"], en: ["(f'g - fg')/g²", "f'g + fg'", "f'g'"] }, correctAnswer: { es: "(f'g - fg')/g²", en: "(f'g - fg')/g²" } }
        ]
    },
    {
        id: 26, title: "Nivel 26", passingScore: 1.0,
        questions: [
            { question: { es: "El concepto de 'infinito' se representa con el símbolo...", en: "The concept of 'infinity' is represented by the symbol..." }, options: { es: ["π", "φ", "∞"], en: ["π", "φ", "∞"] }, correctAnswer: { es: "∞", en: "∞" } },
            { question: { es: "La integral de 1/sqrt(1-x²) es...", en: "The integral of 1/sqrt(1-x²) is..." }, options: { es: ["arcsen(x) + C", "arctan(x) + C", "sen(x) + C"], en: ["arcsin(x) + C", "arctan(x) + C", "sin(x) + C"] }, correctAnswer: { es: "arcsen(x) + C", en: "arcsin(x) + C" } },
            { question: { es: "El valor del determinante de una matriz triangular es el producto de...", en: "The determinant of a triangular matrix is the product of..." }, options: { es: ["los elementos de la diagonal principal", "los elementos de la diagonal secundaria", "todos los elementos"], en: ["the elements on the main diagonal", "the elements on the secondary diagonal", "all the elements"] }, correctAnswer: { es: "los elementos de la diagonal principal", en: "the elements on the main diagonal" } },
            { question: { es: "Un grafo conexo es aquel en el que...", en: "A connected graph is one in which..." }, options: { es: ["todos los vértices están conectados", "hay un ciclo", "todos los vértices tienen grado par"], en: ["all vertices are connected", "there is a cycle", "all vertices have an even degree"] }, correctAnswer: { es: "todos los vértices están conectados", en: "all vertices are connected" } },
            { question: { es: "La función inversa de f(x) = e^x es...", en: "The inverse function of f(x) = e^x is..." }, options: { es: ["f⁻¹(x) = x", "f⁻¹(x) = ln(x)", "f⁻¹(x) = 1/e^x"], en: ["f⁻¹(x) = x", "f⁻¹(x) = ln(x)", "f⁻¹(x) = 1/e^x"] }, correctAnswer: { es: "f⁻¹(x) = ln(x)", en: "f⁻¹(x) = ln(x)" } }
        ]
    },
    {
        id: 27, title: "Nivel 27", passingScore: 1.0,
        questions: [
            { question: { es: "Una 'partición' de un conjunto es una colección de subconjuntos...", en: "A 'partition' of a set is a collection of subsets..." }, options: { es: ["que tienen elementos en común", "que son disjuntos y su unión es el conjunto original", "que son iguales"], en: ["that have elements in common", "that are disjoint and their union is the original set", "that are equal"] }, correctAnswer: { es: "que son disjuntos y su unión es el conjunto original", en: "that are disjoint and their union is the original set" } },
            { question: { es: "El número de combinaciones de 'n' elementos tomados de 'k' en 'k' se representa como...", en: "The number of combinations of 'n' elements taken 'k' at a time is represented as..." }, options: { es: ["C(n,k) = n! / (k!(n-k)!)", "P(n,k) = n! / (n-k)!"], en: ["C(n,k) = n! / (k!(n-k)!)", "P(n,k) = n! / (n-k)!"] }, correctAnswer: { es: "C(n,k) = n! / (k!(n-k)!)", en: "C(n,k) = n! / (k!(n-k)!)" } },
            { question: { es: "La fórmula de Bayes se utiliza para calcular...", en: "Bayes' formula is used to calculate..." }, options: { es: ["probabilidad de eventos independientes", "probabilidad condicional", "probabilidad de la unión de eventos"], en: ["the probability of independent events", "conditional probability", "the probability of the union of events"] }, correctAnswer: { es: "probabilidad condicional", en: "conditional probability" } },
            { question: { es: "La integral por partes se basa en la fórmula...", en: "Integration by parts is based on the formula..." }, options: { es: ["∫udv = uv - ∫vdu", "∫(f+g)dx = ∫fdx + ∫gdx", "∫f(g(x))g'(x)dx"], en: ["∫udv = uv - ∫vdu", "∫(f+g)dx = ∫fdx + ∫gdx", "∫f(g(x))g'(x)dx"] }, correctAnswer: { es: "∫udv = uv - ∫vdu", en: "∫udv = uv - ∫vdu" } },
            { question: { es: "Un 'espacio vectorial' es un conjunto de vectores que...", en: "A 'vector space' is a set of vectors that..." }, options: { es: ["es cerrado bajo la suma y la multiplicación por escalares", "es un conjunto de números", "es un plano"], en: ["is closed under addition and scalar multiplication", "is a set of numbers", "is a plane"] }, correctAnswer: { es: "es cerrado bajo la suma y la multiplicación por escalares", en: "is closed under addition and scalar multiplication" } }
        ]
    },
    {
        id: 28, title: "Nivel 28", passingScore: 1.0,
        questions: [
            { question: { es: "La 'serie de Taylor' de una función representa...", en: "A function's 'Taylor series' represents..." }, options: { es: ["una aproximación de la función mediante polinomios", "la integral de la función", "la transformada de Laplace de la función"], en: ["an approximation of the function using polynomials", "the integral of the function", "the Laplace transform of the function"] }, correctAnswer: { es: "una aproximación de la función mediante polinomios", en: "an approximation of the function using polynomials" } },
            { question: { es: "El teorema fundamental del cálculo relaciona...", en: "The fundamental theorem of calculus relates..." }, options: { es: ["derivación e integración", "suma y resta", "multiplicación y división"], en: ["differentiation and integration", "addition and subtraction", "multiplication and division"] }, correctAnswer: { es: "derivación e integración", en: "differentiation and integration" } },
            { question: { es: "La transformada de Fourier convierte una función del dominio del tiempo al dominio...", en: "The Fourier transform converts a function from the time domain to the..." }, options: { es: ["de la frecuencia", "de la potencia", "de la amplitud"], en: ["frequency domain", "power domain", "amplitude domain"] }, correctAnswer: { es: "de la frecuencia", en: "frequency domain" } },
            { question: { es: "La 'matriz transpuesta' de una matriz 'A' es...", en: "The 'transpose' of a matrix 'A' is..." }, options: { es: ["la inversa de A", "la matriz A con las filas y columnas intercambiadas", "la matriz A multiplicada por un escalar"], en: ["the inverse of A", "the matrix A with its rows and columns swapped", "the matrix A multiplied by a scalar"] }, correctAnswer: { es: "la matriz A con las filas y columnas intercambiadas", en: "the matrix A with its rows and columns swapped" } },
            { question: { es: "Un 'sistema de ecuaciones' es homogéneo si todos sus términos constantes son...", en: "A 'system of equations' is homogeneous if all its constant terms are..." }, options: { es: ["1", "0", "negativos"], en: ["1", "0", "negative"] }, correctAnswer: { es: "0", en: "0" } }
        ]
    },
    {
        id: 29, title: "Nivel 29", passingScore: 1.0,
        questions: [
            { question: { es: "El valor de la integral de -∞ a +∞ de la función de densidad de probabilidad es...", en: "The value of the integral from -∞ to +∞ of a probability density function is..." }, options: { es: ["0", "1", "infinito"], en: ["0", "1", "infinity"] }, correctAnswer: { es: "1", en: "1" } },
            { question: { es: "La 'media geométrica' de un conjunto de números es...", en: "The 'geometric mean' of a set of numbers is..." }, options: { es: ["la suma de los números entre la cantidad", "la raíz enésima del producto de los números", "el número que más se repite"], en: ["the sum of the numbers divided by the count", "the nth root of the product of the numbers", "the number that repeats most often"] }, correctAnswer: { es: "la raíz enésima del producto de los números", en: "the nth root of the product of the numbers" } },
            { question: { es: "Una 'ecuación diferencial' es una ecuación que contiene...", en: "A 'differential equation' is an equation that contains..." }, options: { es: ["variables y constantes", "una función y sus derivadas", "funciones trigonométricas"], en: ["variables and constants", "a function and its derivatives", "trigonometric functions"] }, correctAnswer: { es: "una función y sus derivadas", en: "a function and its derivatives" } },
            { question: { es: "La fórmula de la circunferencia de un círculo es...", en: "The formula for the circumference of a circle is..." }, options: { es: ["πr²", "2πr", "πd"], en: ["πr²", "2πr", "πd"] }, correctAnswer: { es: "2πr", en: "2πr" } },
            { question: { es: "La regla del trapecio es un método de...", en: "The trapezoidal rule is a method of..." }, options: { es: ["derivación numérica", "integración numérica", "resolución de ecuaciones"], en: ["numerical differentiation", "numerical integration", "solving equations"] }, correctAnswer: { es: "integración numérica", en: "numerical integration" } }
        ]
    },
    {
        id: 30, title: "Nivel 30", passingScore: 1.0,
        questions: [
            { question: { es: "El concepto de 'teorema de los cuatro colores' se aplica a...", en: "The 'four color theorem' concept applies to..." }, options: { es: ["la topología de redes", "la teoría de grafos", "la geometría euclidiana"], en: ["network topology", "graph theory", "Euclidean geometry"] }, correctAnswer: { es: "la teoría de grafos", en: "graph theory" } },
            { question: { es: "La 'hipótesis de Riemann' se refiere a la distribución de...", en: "The 'Riemann hypothesis' refers to the distribution of..." }, options: { es: ["los números primos", "los números irracionales", "los números complejos"], en: ["prime numbers", "irrational numbers", "complex numbers"] }, correctAnswer: { es: "los números primos", en: "prime numbers" } },
            { question: { es: "La 'conjetura de Poincaré' está relacionada con el campo de...", en: "The 'Poincaré conjecture' is related to the field of..." }, options: { es: ["la geometría diferencial", "la topología", "el álgebra lineal"], en: ["differential geometry", "topology", "linear algebra"] }, correctAnswer: { es: "la topología", en: "topology" } },
            { question: { es: "La 'serie de Fourier' descompone una función periódica en una suma de...", en: "A 'Fourier series' decomposes a periodic function into a sum of..." }, options: { es: ["polinomios", "senos y cosenos", "exponenciales"], en: ["polynomials", "sines and cosines", "exponentials"] }, correctAnswer: { es: "senos y cosenos", en: "sines and cosines" } },
            { question: { es: "La 'ecuación de Schrödinger' es fundamental en...", en: "The 'Schrödinger equation' is fundamental in..." }, options: { es: ["la mecánica newtoniana", "la mecánica cuántica", "la termodinámica"], en: ["Newtonian mechanics", "quantum mechanics", "thermodynamics"] }, correctAnswer: { es: "la mecánica cuántica", en: "quantum mechanics" } }
        ]
    }
];