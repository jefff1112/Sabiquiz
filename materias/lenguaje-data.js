// materias/lenguaje-data.js

// La única diferencia es que ahora usamos "export const levels"
export const levels = [
    // Dificultad Baja (Niveles 1-5)
    {
        id: 1,
        title: "Nivel 1",
        passingScore: 0.6,
        questions: [
            { "question": "¿Cuál es la primera letra del abecedario?", "options": ["B", "C", "A"], "correctAnswer": "A" },
            { "question": "¿Cuántas vocales tiene el abecedario?", "options": ["4", "5", "6"], "correctAnswer": "5" },
            { "question": "El sonido 'ma' se forma con la 'm' y la vocal...", "options": ["e", "o", "a"], "correctAnswer": "a" },
            { "question": "La palabra 'sol' tiene...", "options": ["Una sílaba", "Dos sílabas", "Tres sílabas"], "correctAnswer": "Una sílaba" },
            { "question": "Una palabra que empieza con la 'P' es...", "options": ["Mesa", "Pato", "Lana"], "correctAnswer": "Pato" }
            
        ]
    },
    {
                id: 2,
                title: "Nivel 2",
                passingScore: 0.65,
                questions: [
                    { "question": "¿Qué palabra rima con 'queso'?", "options": ["pan", "hueso", "agua"], "correctAnswer": "hueso" },
                    { "question": "El nombre 'Luis' es un sustantivo...", "options": ["Común", "Propio", "Abstracto"], "correctAnswer": "Propio" },
                    { "question": "¿Cuál es el plural de 'perro'?", "options": ["perros", "perres", "perrito"], "correctAnswer": "perros" },
                    { "question": "Un adjetivo es una palabra que...", "options": ["Nombra objetos", "Indica una acción", "Describe a un sustantivo"], "correctAnswer": "Describe a un sustantivo" },
                    { "question": "¿Cuál es el verbo en 'La niña come manzanas'?", "options": ["niña", "come", "manzanas"], "correctAnswer": "come" }
                ]
            },
            {
                id: 3,
                title: "Nivel 3",
                passingScore: 0.7,
                questions: [
                    { "question": "El antónimo de 'grande' es...", "options": ["alto", "pequeño", "largo"], "correctAnswer": "pequeño" },
                    { "question": "Un sinónimo de 'bonito' es...", "options": ["feo", "hermoso", "rojo"], "correctAnswer": "hermoso" },
                    { "question": "El género masculino de 'niña' es...", "options": ["niño", "niñito", "niñote"], "correctAnswer": "niño" },
                    { "question": "Una oración que hace una pregunta se llama...", "options": ["Exclamativa", "Interrogativa", "Declarativa"], "correctAnswer": "Interrogativa" },
                    { "question": "En la oración 'El cielo está azul', el sujeto es...", "options": ["azul", "está", "El cielo"], "correctAnswer": "El cielo" }
                ]
            },
            {
                id: 4,
                title: "Nivel 4",
                passingScore: 0.7,
                questions: [
                    { "question": "La sílaba tónica es la que...", "options": ["Se pronuncia más bajo", "Se pronuncia con más fuerza", "Va al final de la palabra"], "correctAnswer": "Se pronuncia con más fuerza" },
                    { "question": "La palabra 'ratón' es...", "options": ["Aguda", "Grave", "Esdrújula"], "correctAnswer": "Aguda" },
                    { "question": "La palabra 'árbol' lleva tilde porque es...", "options": ["Aguda terminada en 'l'", "Grave terminada en 'l'", "Esdrújula"], "correctAnswer": "Grave terminada en 'l'" },
                    { "question": "Un diptongo es la unión de dos vocales en...", "options": ["Diferentes sílabas", "Una misma sílaba", "Palabras diferentes"], "correctAnswer": "Una misma sílaba" },
                    { "question": "¿Qué palabra tiene un diptongo?", "options": ["poeta", "maíz", "cielo"], "correctAnswer": "cielo" }
                ]
            },
            {
                id: 5,
                title: "Nivel 5",
                passingScore: 0.75,
                questions: [
                    { "question": "Una palabra que indica una acción es un...", "options": ["Sustantivo", "Adjetivo", "Verbo"], "correctAnswer": "Verbo" },
                    { "question": "El verbo 'comer' en pasado es...", "options": ["comerá", "comió", "come"], "correctAnswer": "comió" },
                    { "question": "Un adverbio es una palabra que modifica a...", "options": ["un sustantivo", "un verbo", "una conjunción"], "correctAnswer": "un verbo" },
                    { "question": "¿Qué palabra es un adverbio de lugar?", "options": ["rápido", "aquí", "siempre"], "correctAnswer": "aquí" },
                    { "question": "El prefijo 'in-' en 'invisible' significa...", "options": ["dentro", "negación", "mucho"], "correctAnswer": "negación" }
                ]
            },
            // Dificultad Media (Niveles 6-12)
            {
                id: 6,
                title: "Nivel 6",
                passingScore: 0.75,
                questions: [
                    { "question": "El hiato es la separación de dos vocales en...", "options": ["Una misma sílaba", "Diferentes sílabas", "Una vocal y una consonante"], "correctAnswer": "Diferentes sílabas" },
                    { "question": "¿Qué palabra tiene un hiato?", "options": ["cielo", "poeta", "auto"], "correctAnswer": "poeta" },
                    { "question": "La sílaba tónica de la palabra 'esdrújula' es la...", "options": ["última", "penúltima", "antepenúltima"], "correctAnswer": "antepenúltima" },
                    { "question": "Las palabras esdrújulas siempre llevan...", "options": ["mayúscula", "tilde", "punto"], "correctAnswer": "tilde" },
                    { "question": "La persona que recibe la acción del verbo es el...", "options": ["Sujeto", "Objeto directo", "Objeto indirecto"], "correctAnswer": "Objeto directo" }
                ]
            },
            {
                id: 7,
                title: "Nivel 7",
                passingScore: 0.8,
                questions: [
                    { "question": "Un pronombre sustituye a...", "options": ["un verbo", "un sustantivo", "un adjetivo"], "correctAnswer": "un sustantivo" },
                    { "question": "¿Qué palabra es un pronombre personal?", "options": ["ella", "alto", "libro"], "correctAnswer": "ella" },
                    { "question": "El adjetivo en 'El coche rápido' es...", "options": ["coche", "rápido", "El"], "correctAnswer": "rápido" },
                    { "question": "El género y el número en la oración 'Los niños juegan' concuerdan entre...", "options": ["niños y juegan", "Los y niños", "Los, niños y juegan"], "correctAnswer": "Los, niños y juegan" },
                    { "question": "¿Cuál es la función del predicado?", "options": ["Nombrar un objeto", "Decir de quién se habla", "Decir lo que hace el sujeto"], "correctAnswer": "Decir lo que hace el sujeto" }
                ]
            },
            {
                id: 8,
                title: "Nivel 8",
                passingScore: 0.8,
                questions: [
                    { "question": "El sujeto en la oración 'El perro blanco corrió' es...", "options": ["El perro", "El perro blanco", "corrió"], "correctAnswer": "El perro blanco" },
                    { "question": "Un sustantivo colectivo es...", "options": ["Un sustantivo singular", "Un sustantivo que nombra un conjunto", "Un sustantivo propio"], "correctAnswer": "Un sustantivo que nombra un conjunto" },
                    { "question": "El sustantivo colectivo de 'pez' es...", "options": ["peces", "cardumen", "acuario"], "correctAnswer": "cardumen" },
                    { "question": "La palabra 'felizmente' es un adverbio de...", "options": ["tiempo", "modo", "cantidad"], "correctAnswer": "modo" },
                    { "question": "El objeto indirecto en 'Le di un regalo a mi mamá' es...", "options": ["Le", "un regalo", "a mi mamá"], "correctAnswer": "a mi mamá" }
                ]
            },
            {
                id: 9,
                title: "Nivel 9",
                passingScore: 0.8,
                questions: [
                    { "question": "Una oración compuesta es aquella que tiene...", "options": ["un solo verbo", "dos o más verbos", "un solo sujeto"], "correctAnswer": "dos o más verbos" },
                    { "question": "La conjunción 'y' sirve para...", "options": ["Indicar oposición", "Unir palabras o frases", "Indicar una causa"], "correctAnswer": "Unir palabras o frases" },
                    { "question": "El pretérito perfecto simple del verbo 'vivir' para 'yo' es...", "options": ["vivo", "viviré", "viví"], "correctAnswer": "viví" },
                    { "question": "El modo indicativo expresa...", "options": ["Una orden", "Un deseo", "Una acción real y objetiva"], "correctAnswer": "Una acción real y objetiva" },
                    { "question": "La palabra 'teléfono' es...", "options": ["Aguda", "Grave", "Esdrújula"], "correctAnswer": "Esdrújula" }
                ]
            },
            {
                id: 10,
                title: "Nivel 10",
                passingScore: 0.85,
                questions: [
                    { "question": "El adjetivo 'bonísimo' es un grado...", "options": ["Positivo", "Comparativo", "Superlativo"], "correctAnswer": "Superlativo" },
                    { "question": "¿Qué palabra es un prefijo?", "options": ["in-", "-mente", "-dad"], "correctAnswer": "in-" },
                    { "question": "El sufijo '-mente' en 'rápidamente' forma...", "options": ["un sustantivo", "un adjetivo", "un adverbio"], "correctAnswer": "un adverbio" },
                    { "question": "¿Qué figura literaria es 'tus ojos son dos luceros'?", "options": ["Símil", "Hipérbole", "Metáfora"], "correctAnswer": "Metáfora" },
                    { "question": "La obra más famosa de Salarrué es...", "options": ["Cuentos de Barro", "Poesía", "Tierra de Infancia"], "correctAnswer": "Cuentos de Barro" }
                ]
            },
            // Dificultad Avanzada (Niveles 11-20)
            {
                id: 11,
                title: "Nivel 11",
                passingScore: 0.85,
                questions: [
                    { "question": "¿Qué figura literaria utiliza 'como' o 'parece' para comparar?", "options": ["Metáfora", "Símil", "Hipérbole"], "correctAnswer": "Símil" },
                    { "question": "La palabra 'ortografía' se refiere a...", "options": ["La pronunciación", "La forma correcta de escribir", "La estructura de las oraciones"], "correctAnswer": "La forma correcta de escribir" },
                    { "question": "El modo subjuntivo expresa...", "options": ["Deseo o duda", "Un hecho real", "Una orden"], "correctAnswer": "Deseo o duda" },
                    { "question": "El complemento circunstancial de tiempo en 'El viernes iré al cine' es...", "options": ["iré", "al cine", "El viernes"], "correctAnswer": "El viernes" },
                    { "question": "¿Qué palabra tiene un triptongo?", "options": ["cielo", "Uruguay", "poesía"], "correctAnswer": "Uruguay" }
                ]
            },
            {
                id: 12,
                title: "Nivel 12",
                passingScore: 0.85,
                questions: [
                    { "question": "Una oración unimembre es aquella que...", "options": ["Tiene un solo sujeto", "Carece de sujeto y predicado", "Tiene un solo predicado"], "correctAnswer": "Carece de sujeto y predicado" },
                    { "question": "La función del complemento del nombre en 'El libro de la biblioteca' es...", "options": ["modificar al verbo", "modificar al sustantivo 'libro'", "ser el sujeto de la oración"], "correctAnswer": "modificar al sustantivo 'libro'" },
                    { "question": "El verbo 'ser' es un verbo...", "options": ["Transitivo", "Intransitivo", "Copulativo"], "correctAnswer": "Copulativo" },
                    { "question": "¿Quién fue el poeta salvadoreño que escribió la obra 'El Libro de los pies'?", "options": ["Salarrué", "Claudia Lars", "Roque Dalton"], "correctAnswer": "Roque Dalton" },
                    { "question": "La figura literaria que le da cualidades humanas a objetos es...", "options": ["Metáfora", "Símil", "Personificación"], "correctAnswer": "Personificación" }
                ]
            },
            {
                id: 13,
                title: "Nivel 13",
                passingScore: 0.85,
                questions: [
                    { "question": "La sílaba 'trans' en 'transporte' es...", "options": ["Prefijo", "Raíz", "Sufijo"], "correctAnswer": "Prefijo" },
                    { "question": "El pretérito imperfecto del verbo 'ir' para 'nosotros' es...", "options": ["fuimos", "íbamos", "iremos"], "correctAnswer": "íbamos" },
                    { "question": "La palabra 'ortografía' se forma con los lexemas...", "options": ["orto y grafía", "orto y grafos", "orthos y graphein"], "correctAnswer": "orthos y graphein" },
                    { "question": "La obra de Claudia Lars 'Tierra de infancia' es de tipo...", "options": ["Novela", "Poesía", "Cuento"], "correctAnswer": "Poesía" },
                    { "question": "¿Qué figura literaria consiste en una exageración?", "options": ["Hipérbole", "Metáfora", "Anáfora"], "correctAnswer": "Hipérbole" }
                ]
            },
            {
                id: 14,
                title: "Nivel 14",
                passingScore: 0.85,
                questions: [
                    { "question": "La conjunción 'aunque' es de tipo...", "options": ["Copulativa", "Adversativa", "Concesiva"], "correctAnswer": "Concesiva" },
                    { "question": "Un texto expositivo tiene la función de...", "options": ["Narrar una historia", "Dar una opinión", "Explicar un tema"], "correctAnswer": "Explicar un tema" },
                    { "question": "El 'análisis sintáctico' se enfoca en...", "options": ["La pronunciación", "El significado de las palabras", "La función de las palabras en la oración"], "correctAnswer": "La función de las palabras en la oración" },
                    { "question": "El objeto directo se puede sustituir por los pronombres...", "options": ["me, te, le, se", "lo, la, los, las", "mi, tu, su"], "correctAnswer": "lo, la, los, las" },
                    { "question": "¿Cuál es la función del complemento agente en la voz pasiva?", "options": ["Recibir la acción", "Realizar la acción", "Modificar el verbo"], "correctAnswer": "Realizar la acción" }
                ]
            },
            {
                id: 15,
                title: "Nivel 15",
                passingScore: 0.85,
                questions: [
                    { "question": "La voz pasiva se forma con el verbo 'ser' y...", "options": ["Un gerundio", "Un participio", "Un infinitivo"], "correctAnswer": "Un participio" },
                    { "question": "El complemento circunstancial de modo responde a la pregunta...", "options": ["¿Cuándo?", "¿Cómo?", "¿Dónde?"], "correctAnswer": "¿Cómo?" },
                    { "question": "Un 'párrafo' es un conjunto de...", "options": ["Letras", "Palabras", "Oraciones"], "correctAnswer": "Oraciones" },
                    { "question": "La palabra 'reloj' es...", "options": ["Aguda", "Grave", "Esdrújula"], "correctAnswer": "Aguda" },
                    { "question": "La palabra 'férreo' tiene...", "options": ["Un hiato", "Un diptongo", "Un triptongo"], "correctAnswer": "Un diptongo" }
                ]
            },
            {
                id: 16,
                title: "Nivel 16",
                passingScore: 0.9,
                questions: [
                    { "question": "Un 'sustantivo abstracto' nombra...", "options": ["Objetos que se pueden tocar", "Cualidades o ideas", "Personas o lugares"], "correctAnswer": "Cualidades o ideas" },
                    { "question": "La palabra 'altísimo' es un ejemplo de...", "options": ["Grado comparativo", "Grado superlativo", "Grado positivo"], "correctAnswer": "Grado superlativo" },
                    { "question": "La figura literaria 'la fría nieve de tu boca' es...", "options": ["Metáfora", "Antítesis", "Hipérbole"], "correctAnswer": "Antítesis" },
                    { "question": "El objeto indirecto en la oración 'Compré un regalo para mi papá' es...", "options": ["Compré", "un regalo", "para mi papá"], "correctAnswer": "para mi papá" },
                    { "question": "La palabra 'ortografía' lleva tilde en la 'i' porque es...", "options": ["aguda", "grave", "esdrújula"], "correctAnswer": "grave" }
                ]
            },
            {
                id: 17,
                title: "Nivel 17",
                passingScore: 0.9,
                questions: [
                    { "question": "La 'coma' se utiliza para...", "options": ["Terminar una oración", "Hacer una pausa breve en la lectura", "Hacer una pregunta"], "correctAnswer": "Hacer una pausa breve en la lectura" },
                    { "question": "La conjunción 'pero' indica...", "options": ["Adición", "Oposición", "Causa"], "correctAnswer": "Oposición" },
                    { "question": "El verbo 'haber' en el tiempo pretérito pluscuamperfecto es...", "options": ["he", "había", "hubo"], "correctAnswer": "había" },
                    { "question": "La palabra 'bilingüe' lleva diéresis para indicar que la 'u'...", "options": ["se pronuncia", "no se pronuncia", "es tónica"], "correctAnswer": "se pronuncia" },
                    { "question": "La función del pronombre 'cuyo' es...", "options": ["Indicar cantidad", "Indicar posesión", "Reemplazar a un sustantivo"], "correctAnswer": "Indicar posesión" }
                ]
            },
            {
                id: 18,
                title: "Nivel 18",
                passingScore: 0.9,
                questions: [
                    { "question": "La oración 'La mesa de madera' tiene un complemento del nombre que es...", "options": ["la mesa", "de madera", "madera"], "correctAnswer": "de madera" },
                    { "question": "Un 'neologismo' es una palabra...", "options": ["antigua", "nueva", "extranjera"], "correctAnswer": "nueva" },
                    { "question": "La palabra 'aeropuerto' está formada por los lexemas...", "options": ["aero y puerto", "aire y puerto", "aer y puerto"], "correctAnswer": "aero y puerto" },
                    { "question": "La conjugación verbal de 'cantar' en futuro es...", "options": ["cantaría", "cantará", "cantó"], "correctAnswer": "cantará" },
                    { "question": "El adjetivo 'nacional' es de tipo...", "options": ["Calificativo", "Relacional", "Posesivo"], "correctAnswer": "Relacional" }
                ]
            },
            {
                id: 19,
                title: "Nivel 19",
                passingScore: 0.95,
                questions: [
                    { "question": "Un 'texto argumentativo' tiene como propósito...", "options": ["Contar una historia", "Explicar un tema", "Defender una opinión"], "correctAnswer": "Defender una opinión" },
                    { "question": "La palabra 'política' es...", "options": ["Aguda", "Grave", "Esdrújula"], "correctAnswer": "Esdrújula" },
                    { "question": "El verso de 11 sílabas se llama...", "options": ["Octosílabo", "Eneasílabo", "Endecasílabo"], "correctAnswer": "Endecasílabo" },
                    { "question": "La figura literaria 'El mar rugía con furia' es...", "options": ["Metáfora", "Símil", "Personificación"], "correctAnswer": "Personificación" },
                    { "question": "¿Cuál es la función del pronombre 'le' en 'Le di la carta'?", "options": ["Sujeto", "Objeto directo", "Objeto indirecto"], "correctAnswer": "Objeto indirecto" }
                ]
            },
            {
                id: 20,
                title: "Nivel 20",
                passingScore: 0.95,
                questions: [
                    { "question": "La palabra 'subrayar' es un verbo formado con el prefijo 'sub-' que significa...", "options": ["sobre", "debajo de", "dentro de"], "correctAnswer": "debajo de" },
                    { "question": "La concordancia verbal se da entre...", "options": ["Sustantivo y adjetivo", "Verbo y sujeto", "Sujeto y adjetivo"], "correctAnswer": "Verbo y sujeto" },
                    { "question": "La oración 'La mesa de mi abuela está rota' tiene un predicado...", "options": ["Nominal", "Verbal", "No tiene predicado"], "correctAnswer": "Verbal" },
                    { "question": "Una oración subordinada es aquella que...", "options": ["Tiene sentido completo por sí misma", "Depende de otra oración para tener sentido", "Es muy larga"], "correctAnswer": "Depende de otra oración para tener sentido" },
                    { "question": "El gerundio del verbo 'dormir' es...", "options": ["dormido", "durmiendo", "dormiría"], "correctAnswer": "durmiendo" }
                ]
            },
            // Dificultad Experta (Niveles 21-30)
            {
                id: 21,
                title: "Nivel 21",
                passingScore: 0.95,
                questions: [
                    { "question": "El modo imperativo expresa...", "options": ["Deseo", "Una orden", "Un hecho"], "correctAnswer": "Una orden" },
                    { "question": "La conjunción subordinada de causa es...", "options": ["cuando", "porque", "aunque"], "correctAnswer": "porque" },
                    { "question": "¿Qué tipo de oración es 'No sé qué hacer'?", "options": ["Simple", "Compuesta coordinada", "Compuesta subordinada"], "correctAnswer": "Compuesta subordinada" },
                    { "question": "La oración 'El libro fue leído por Juan' está en voz...", "options": ["Activa", "Pasiva", "Reflexiva"], "correctAnswer": "Pasiva" },
                    { "question": "La figura literaria 'El Sol llora cuando la Luna se va' es...", "options": ["Metáfora", "Personificación", "Símil"], "correctAnswer": "Personificación" }
                ]
            },
            {
                id: 22,
                title: "Nivel 22",
                passingScore: 1.0,
                questions: [
                    { "question": "Un 'soneto' es un poema de...", "options": ["10 versos", "14 versos", "20 versos"], "correctAnswer": "14 versos" },
                    { "question": "La palabra 'exánime' es...", "options": ["Aguda", "Grave", "Esdrújula"], "correctAnswer": "Esdrújula" },
                    { "question": "El objeto directo en la oración 'La profesora nos vio' es...", "options": ["La profesora", "nos", "vio"], "correctAnswer": "nos" },
                    { "question": "La anáfora es una figura literaria que consiste en...", "options": ["Repetir una palabra al inicio de los versos", "Exagerar una idea", "Usar palabras con sonido similar"], "correctAnswer": "Repetir una palabra al inicio de los versos" },
                    { "question": "¿Qué autor salvadoreño escribió la novela 'Un tren de cuerda'?", "options": ["Roque Dalton", "Salarrué", "Manlio Argueta"], "correctAnswer": "Manlio Argueta" }
                ]
            },
            {
                id: 23,
                title: "Nivel 23",
                passingScore: 1.0,
                questions: [
                    { "question": "El 'análisis morfológico' se enfoca en...", "options": ["La función de la palabra en la oración", "La estructura interna de la palabra", "El significado de la palabra"], "correctAnswer": "La estructura interna de la palabra" },
                    { "question": "El complemento predicativo se diferencia del adjetivo en que...", "options": ["Modifica al verbo y al sustantivo", "Solo modifica al sustantivo", "Modifica a otro adjetivo"], "correctAnswer": "Modifica al verbo y al sustantivo" },
                    { "question": "El adjetivo 'limpísimo' es un grado...", "options": ["Positivo", "Comparativo", "Superlativo"], "correctAnswer": "Superlativo" },
                    { "question": "La perífrasis verbal 'voy a cantar' expresa...", "options": ["Una acción pasada", "Una acción presente", "Una acción futura"], "correctAnswer": "Una acción futura" },
                    { "question": "¿Cuál es la función del complemento agente en una oración pasiva?", "options": ["Recibir la acción del verbo", "Realizar la acción del verbo", "Complementar al sujeto"], "correctAnswer": "Realizar la acción del verbo" }
                ]
            },
            {
                id: 24,
                title: "Nivel 24",
                passingScore: 1.0,
                questions: [
                    { "question": "La palabra 'ortografía' se clasifica como una palabra...", "options": ["Aguda", "Grave", "Esdrújula"], "correctAnswer": "Grave" },
                    { "question": "Un 'pleonasmo' es una figura retórica que consiste en...", "options": ["Una exageración", "El uso de palabras innecesarias", "Una repetición de sonidos"], "correctAnswer": "El uso de palabras innecesarias" },
                    { "question": "El pronombre relativo 'cuyo' indica...", "options": ["Cantidad", "Posesión", "Lugar"], "correctAnswer": "Posesión" },
                    { "question": "La palabra 'aún' lleva tilde cuando es un adverbio de...", "options": ["tiempo", "cantidad", "modo"], "correctAnswer": "tiempo" },
                    { "question": "¿Cuál de estas palabras es un verboide?", "options": ["corrió", "corriendo", "correré"], "correctAnswer": "corriendo" }
                ]
            },
            {
                id: 25,
                title: "Nivel 25",
                passingScore: 1.0,
                questions: [
                    { "question": "El uso de la 'b' y la 'v' en 'bello' y 'vello' se conoce como...", "options": ["Sinónimos", "Antónimos", "Parónimos"], "correctAnswer": "Parónimos" },
                    { "question": "El tiempo verbal 'cantaría' es...", "options": ["Futuro simple", "Condicional simple", "Futuro compuesto"], "correctAnswer": "Condicional simple" },
                    { "question": "El complemento circunstancial de finalidad en 'Estudié para el examen' es...", "options": ["Estudié", "para el examen", "yo"], "correctAnswer": "para el examen" },
                    { "question": "La figura retórica 'El viento me susurró al oído' es...", "options": ["Hipérbaton", "Personificación", "Metonimia"], "correctAnswer": "Personificación" },
                    { "question": "La estructura 'Sujeto + Predicado' es la de una oración...", "options": ["Simple", "Compuesta", "Subordinada"], "correctAnswer": "Simple" }
                ]
            },
            {
                id: 26,
                title: "Nivel 26",
                passingScore: 1.0,
                questions: [
                    { "question": "El sustantivo 'paz' es de tipo...", "options": ["Concreto", "Abstracto", "Común"], "correctAnswer": "Abstracto" },
                    { "question": "Un 'texto descriptivo' se enfoca en...", "options": ["Narrar eventos", "Presentar argumentos", "Detallar características"], "correctAnswer": "Detallar características" },
                    { "question": "La 'conjunción' es una palabra que sirve para...", "options": ["Nombrar objetos", "Unir palabras u oraciones", "Describir sustantivos"], "correctAnswer": "Unir palabras u oraciones" },
                    { "question": "El verbo 'estar' en pretérito perfecto simple para 'tú' es...", "options": ["estuve", "estuviste", "estás"], "correctAnswer": "estuviste" },
                    { "question": "La oración 'Canta y baila' tiene un sujeto...", "options": ["Explícito", "Tácito", "Inexistente"], "correctAnswer": "Tácito" }
                ]
            },
            {
                id: 27,
                title: "Nivel 27",
                passingScore: 1.0,
                questions: [
                    { "question": "El 'complemento predicativo' concuerda en género y número con...", "options": ["El verbo", "El objeto directo", "El sujeto y el objeto directo"], "correctAnswer": "El sujeto y el objeto directo" },
                    { "question": "La figura retórica que altera el orden gramatical de las palabras es...", "options": ["Metáfora", "Hipérbaton", "Anáfora"], "correctAnswer": "Hipérbaton" },
                    { "question": "La voz pasiva en la oración 'La carta es leída por la niña' tiene como complemento agente...", "options": ["La carta", "es leída", "por la niña"], "correctAnswer": "por la niña" },
                    { "question": "El 'subjuntivo' se utiliza para expresar...", "options": ["Hechos reales", "Órdenes", "Dudas, deseos, o posibilidades"], "correctAnswer": "Dudas, deseos, o posibilidades" },
                    { "question": "El infinitivo de un verbo termina en...", "options": ["-ando, -iendo", "-ar, -er, -ir", "-ado, -ido"], "correctAnswer": "-ar, -er, -ir" }
                ]
            },
            {
                id: 28,
                title: "Nivel 28",
                passingScore: 1.0,
                questions: [
                    { "question": "Una 'oración subordinada adverbial' funciona como...", "options": ["Un sustantivo", "Un adjetivo", "Un adverbio"], "correctAnswer": "Un adverbio" },
                    { "question": "La 'sintaxis' se encarga de...", "options": ["La correcta escritura", "El estudio de la oración", "El significado de las palabras"], "correctAnswer": "El estudio de la oración" },
                    { "question": "El 'punto y coma' se usa para...", "options": ["Separar elementos de una enumeración", "Indicar una pausa larga", "Unir oraciones relacionadas pero independientes"], "correctAnswer": "Unir oraciones relacionadas pero independientes" },
                    { "question": "¿Qué palabra es un 'sustantivo común'?", "options": ["San Salvador", "perro", "Juan"], "correctAnswer": "perro" },
                    { "question": "El verbo 'ir' en modo imperativo para 'tú' es...", "options": ["vas", "ve", "vayas"], "correctAnswer": "ve" }
                ]
            },
            {
                id: 29,
                title: "Nivel 29",
                passingScore: 1.0,
                questions: [
                    { "question": "El adjetivo 'verde' es de tipo...", "options": ["Calificativo", "Relacional", "Posesivo"], "correctAnswer": "Calificativo" },
                    { "question": "La 'conjunción adversativa' más común es...", "options": ["y", "o", "pero"], "correctAnswer": "pero" },
                    { "question": "El 'sujeto elíptico' es el que...", "options": ["Está explícito en la oración", "No está en la oración pero se sobreentiende", "No existe"], "correctAnswer": "No está en la oración pero se sobreentiende" },
                    { "question": "¿Cuál es la función del 'complemento de régimen'?", "options": ["Modificar al sustantivo", "Completar el significado del verbo con una preposición", "Indicar un lugar"], "correctAnswer": "Completar el significado del verbo con una preposición" },
                    { "question": "La oración 'Cuentan que va a llover' tiene un sujeto...", "options": ["Explícito", "Tácito", "Impersonal"], "correctAnswer": "Impersonal" }
                ]
            },
            {
                id: 30,
                title: "Nivel 30",
                passingScore: 1.0,
                questions: [
                    { "question": "La 'polisemia' es el fenómeno en el que una palabra tiene...", "options": ["Un solo significado", "Dos significados opuestos", "Varios significados"], "correctAnswer": "Varios significados" },
                    { "question": "El verbo 'cocinar' en pretérito perfecto simple para 'nosotros' es...", "options": ["cocinábamos", "cocinamos", "cocinaríamos"], "correctAnswer": "cocinamos" },
                    { "question": "La 'metáfora' es una figura literaria que consiste en...", "options": ["Exagerar una idea", "Comparar un término real con uno imaginario", "Atribuir cualidades humanas a objetos"], "correctAnswer": "Comparar un término real con uno imaginario" },
                    { "question": "El sustantivo 'felicidad' es de tipo...", "options": ["Concreto", "Abstracto", "Contable"], "correctAnswer": "Abstracto" },
                    { "question": "La oración 'El niño juega en el parque' tiene un complemento circunstancial de...", "options": ["Tiempo", "Lugar", "Modo"], "correctAnswer": "Lugar" }
                ]
            }
];