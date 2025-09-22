export const levels = [
    // --- Dificultad Baja (Niveles 1-10) ---
    {
        id: 1, title: "Nivel 1", passingScore: 0.6,
        questions: [
            { question: { es: "¿Cómo se dice 'hola' en inglés?", en: "How do you say 'hola' in English?" }, options: { es: ["Bye", "Hello", "Thanks"], en: ["Bye", "Hello", "Thanks"] }, correctAnswer: { es: "Hello", en: "Hello" } },
            { question: { es: "¿Qué significa 'dog'?", en: "What does 'dog' mean?" }, options: { es: ["Gato", "Perro", "Pájaro"], en: ["Cat", "Dog", "Bird"] }, correctAnswer: { es: "Perro", en: "Dog" } },
            { question: { es: "La palabra 'apple' significa...", en: "The word 'apple' means..." }, options: { es: ["manzana", "banana", "naranja"], en: ["apple", "banana", "orange"] }, correctAnswer: { es: "manzana", en: "apple" } },
            { question: { es: "El número 'two' es el...", en: "The number 'two' is..." }, options: { es: ["uno", "dos", "tres"], en: ["one", "two", "three"] }, correctAnswer: { es: "dos", en: "two" } },
            { question: { es: "El color 'red' es el...", en: "The color 'red' is..." }, options: { es: ["azul", "rojo", "verde"], en: ["blue", "red", "green"] }, correctAnswer: { es: "rojo", en: "red" } }
        ]
    },
    {
        id: 2, title: "Nivel 2", passingScore: 0.65,
        questions: [
            { question: { es: "¿Qué significa 'good morning'?", en: "What does 'good morning' mean?" }, options: { es: ["Buenas noches", "Buenas tardes", "Buenos días"], en: ["Good night", "Good afternoon", "Good morning"] }, correctAnswer: { es: "Buenos días", en: "Good morning" } },
            { question: { es: "El verbo 'to be' significa...", en: "The verb 'to be' means..." }, options: { es: ["correr", "ser o estar", "saltar"], en: ["to run", "to be", "to jump"] }, correctAnswer: { es: "ser o estar", en: "to be" } },
            { question: { es: "La palabra 'house' significa...", en: "The word 'house' means..." }, options: { es: ["coche", "casa", "árbol"], en: ["car", "house", "tree"] }, correctAnswer: { es: "casa", en: "house" } },
            { question: { es: "El número 'five' es el...", en: "The number 'five' is..." }, options: { es: ["cuatro", "cinco", "seis"], en: ["four", "five", "six"] }, correctAnswer: { es: "cinco", en: "five" } },
            { question: { es: "El color 'yellow' es el...", en: "The color 'yellow' is..." }, options: { es: ["amarillo", "blanco", "negro"], en: ["yellow", "white", "black"] }, correctAnswer: { es: "amarillo", en: "yellow" } }
        ]
    },
    {
        id: 3, title: "Nivel 3", passingScore: 0.7,
        questions: [
            { question: { es: "¿Cómo se dice 'gracias' en inglés?", en: "How do you say 'gracias' in English?" }, options: { es: ["Please", "Sorry", "Thank you"], en: ["Please", "Sorry", "Thank you"] }, correctAnswer: { es: "Thank you", en: "Thank you" } },
            { question: { es: "La frase 'I am happy' significa...", en: "The phrase 'I am happy' means..." }, options: { es: ["Yo estoy triste", "Yo estoy feliz", "Yo estoy cansado"], en: ["I am sad", "I am happy", "I am tired"] }, correctAnswer: { es: "Yo estoy feliz", en: "I am happy" } },
            { question: { es: "La palabra 'book' significa...", en: "The word 'book' means..." }, options: { es: ["libro", "lápiz", "mesa"], en: ["book", "pencil", "table"] }, correctAnswer: { es: "libro", en: "book" } },
            { question: { es: "El número 'ten' es el...", en: "The number 'ten' is..." }, options: { es: ["ocho", "nueve", "diez"], en: ["eight", "nine", "ten"] }, correctAnswer: { es: "diez", en: "ten" } },
            { question: { es: "El color 'blue' es el...", en: "The color 'blue' is..." }, options: { es: ["azul", "rojo", "verde"], en: ["blue", "red", "green"] }, correctAnswer: { es: "azul", en: "blue" } }
        ]
    },
    {
        id: 4, title: "Nivel 4", passingScore: 0.7,
        questions: [
            { question: { es: "¿Qué significa 'water'?", en: "What does 'water' mean?" }, options: { es: ["fuego", "aire", "agua"], en: ["fire", "air", "water"] }, correctAnswer: { es: "agua", en: "water" } },
            { question: { es: "La palabra 'car' significa...", en: "The word 'car' means..." }, options: { es: ["bicicleta", "coche", "camión"], en: ["bicycle", "car", "truck"] }, correctAnswer: { es: "coche", en: "car" } },
            { question: { es: "El verbo 'to eat' significa...", en: "The verb 'to eat' means..." }, options: { es: ["dormir", "comer", "beber"], en: ["to sleep", "to eat", "to drink"] }, correctAnswer: { es: "comer", en: "to eat" } },
            { question: { es: "El número 'twenty' es el...", en: "The number 'twenty' is..." }, options: { es: ["quince", "veinte", "veinticinco"], en: ["fifteen", "twenty", "twenty-five"] }, correctAnswer: { es: "veinte", en: "twenty" } },
            { question: { es: "La frase 'It is hot' significa...", en: "The phrase 'It is hot' means..." }, options: { es: ["Hace frío", "Hace calor", "Está lloviendo"], en: ["It is cold", "It is hot", "It is raining"] }, correctAnswer: { es: "Hace calor", en: "It is hot" } }
        ]
    },
    {
        id: 5, title: "Nivel 5", passingScore: 0.75,
        questions: [
            { question: { es: "¿Qué significa 'family'?", en: "What does 'family' mean?" }, options: { es: ["amigos", "trabajo", "familia"], en: ["friends", "work", "family"] }, correctAnswer: { es: "familia", en: "family" } },
            { question: { es: "La palabra 'table' significa...", en: "The word 'table' means..." }, options: { es: ["silla", "mesa", "cama"], en: ["chair", "table", "bed"] }, correctAnswer: { es: "mesa", en: "table" } },
            { question: { es: "El verbo 'to run' significa...", en: "The verb 'to run' means..." }, options: { es: ["correr", "nadar", "saltar"], en: ["to run", "to swim", "to jump"] }, correctAnswer: { es: "correr", en: "to run" } },
            { question: { es: "La frase 'I like cats' significa...", en: "The phrase 'I like cats' means..." }, options: { es: ["Me gustan los perros", "No me gustan los gatos", "Me gustan los gatos"], en: ["I like dogs", "I don't like cats", "I like cats"] }, correctAnswer: { es: "Me gustan los gatos", en: "I like cats" } },
            { question: { es: "El color 'black' es el...", en: "The color 'black' is..." }, options: { es: ["blanco", "negro", "marrón"], en: ["white", "black", "brown"] }, correctAnswer: { es: "negro", en: "black" } }
        ]
    },
    {
        id: 6, title: "Nivel 6", passingScore: 0.75,
        questions: [
            { question: { es: "El pasado del verbo 'to go' (ir) es...", en: "The past tense of the verb 'to go' is..." }, options: { es: ["goed", "went", "gone"], en: ["goed", "went", "gone"] }, correctAnswer: { es: "went", en: "went" } },
            { question: { es: "El pronombre 'she' se usa para...", en: "The pronoun 'she' is used for..." }, options: { es: ["él", "ella", "ello"], en: ["he", "she", "it"] }, correctAnswer: { es: "ella", en: "she" } },
            { question: { es: "La frase 'They are students' significa...", en: "The phrase 'They are students' means..." }, options: { es: ["Ellos son profesores", "Ellos son estudiantes", "Ellos están estudiando"], en: ["They are teachers", "They are students", "They are studying"] }, correctAnswer: { es: "Ellos son estudiantes", en: "They are students" } },
            { question: { es: "El plural de 'child' (niño) es...", en: "The plural of 'child' is..." }, options: { es: ["childs", "children", "childen"], en: ["childs", "children", "childen"] }, correctAnswer: { es: "children", en: "children" } },
            { question: { es: "La preposición 'in' significa...", en: "The preposition 'in' means..." }, options: { es: ["sobre", "debajo", "en"], en: ["on", "under", "in"] }, correctAnswer: { es: "en", en: "in" } }
        ]
    },
    {
        id: 7, title: "Nivel 7", passingScore: 0.8,
        questions: [
            { question: { es: "La pregunta 'What is your name?' significa...", en: "The question 'What is your name?' means..." }, options: { es: ["¿Cómo estás?", "¿Cuántos años tienes?", "¿Cuál es tu nombre?"], en: ["How are you?", "How old are you?", "What is your name?"] }, correctAnswer: { es: "¿Cuál es tu nombre?", en: "What is your name?" } },
            { question: { es: "El futuro simple se forma con 'will' o...", en: "The simple future is formed with 'will' or..." }, options: { es: ["did", "was", "going to"], en: ["did", "was", "going to"] }, correctAnswer: { es: "going to", en: "going to" } },
            { question: { es: "El adjetivo 'big' es el opuesto de...", en: "The adjective 'big' is the opposite of..." }, options: { es: ["small", "tall", "fast"], en: ["small", "tall", "fast"] }, correctAnswer: { es: "small", en: "small" } },
            { question: { es: "La frase 'He doesn't like pizza' significa...", en: "The phrase 'He doesn't like pizza' means..." }, options: { es: ["A él le gusta la pizza", "A él no le gusta la pizza", "Él está comiendo pizza"], en: ["He likes pizza", "He doesn't like pizza", "He is eating pizza"] }, correctAnswer: { es: "A él no le gusta la pizza", en: "He doesn't like pizza" } },
            { question: { es: "El plural de 'foot' (pie) es...", en: "The plural of 'foot' is..." }, options: { es: ["foots", "feet", "feets"], en: ["foots", "feet", "feets"] }, correctAnswer: { es: "feet", en: "feet" } }
        ]
    },
    {
        id: 8, title: "Nivel 8", passingScore: 0.8,
        questions: [
            { question: { es: "El presente perfecto se forma con 'have' o 'has' y el...", en: "The present perfect is formed with 'have' or 'has' and the..." }, options: { es: ["infinitivo", "pasado simple", "participio pasado"], en: ["infinitive", "simple past", "past participle"] }, correctAnswer: { es: "participio pasado", en: "past participle" } },
            { question: { es: "La palabra 'yesterday' significa...", en: "The word 'yesterday' means..." }, options: { es: ["mañana", "hoy", "ayer"], en: ["tomorrow", "today", "yesterday"] }, correctAnswer: { es: "ayer", en: "yesterday" } },
            { question: { es: "La frase 'I have a car' significa...", en: "The phrase 'I have a car' means..." }, options: { es: ["Yo soy un coche", "Yo tengo un coche", "Yo quiero un coche"], en: ["I am a car", "I have a car", "I want a car"] }, correctAnswer: { es: "Yo tengo un coche", en: "I have a car" } },
            { question: { es: "El adverbio 'quickly' significa...", en: "The adverb 'quickly' means..." }, options: { es: ["rápido", "despacio", "fácilmente"], en: ["fast", "slow", "easily"] }, correctAnswer: { es: "rápido", en: "fast" } },
            { question: { es: "La pregunta 'Are you a doctor?' significa...", en: "The question 'Are you a doctor?' means..." }, options: { es: ["¿Eres un doctor?", "¿Dónde está el doctor?", "¿Quieres un doctor?"], en: ["Are you a doctor?", "Where is the doctor?", "Do you want a doctor?"] }, correctAnswer: { es: "¿Eres un doctor?", en: "Are you a doctor?" } }
        ]
    },
    {
        id: 9, title: "Nivel 9", passingScore: 0.8,
        questions: [
            { question: { es: "El condicional simple se forma con 'would' y el...", en: "The simple conditional is formed with 'would' and the..." }, options: { es: ["infinitivo", "pasado simple", "participio pasado"], en: ["infinitive", "simple past", "past participle"] }, correctAnswer: { es: "infinitivo", en: "infinitive" } },
            { question: { es: "La frase 'She can swim' significa...", en: "The phrase 'She can swim' means..." }, options: { es: ["Ella no puede nadar", "Ella debe nadar", "Ella puede nadar"], en: ["She can't swim", "She must swim", "She can swim"] }, correctAnswer: { es: "Ella puede nadar", en: "She can swim" } },
            { question: { es: "El verbo 'to study' significa...", en: "The verb 'to study' means..." }, options: { es: ["jugar", "trabajar", "estudiar"], en: ["to play", "to work", "to study"] }, correctAnswer: { es: "estudiar", en: "to study" } },
            { question: { es: "La preposición 'under' significa...", en: "The preposition 'under' means..." }, options: { es: ["sobre", "dentro de", "debajo de"], en: ["on", "inside", "under"] }, correctAnswer: { es: "debajo de", en: "under" } },
            { question: { es: "El opuesto de 'cold' (frío) es...", en: "The opposite of 'cold' is..." }, options: { es: ["hot", "warm", "cool"], en: ["hot", "warm", "cool"] }, correctAnswer: { es: "hot", en: "hot" } }
        ]
    },
    {
        id: 10, title: "Nivel 10", passingScore: 0.85,
        questions: [
            { question: { es: "El presente continuo se forma con 'to be' y el verbo principal con la terminación...", en: "The present continuous is formed with 'to be' and the main verb ending in..." }, options: { es: ["-ed", "-ing", "-s"], en: ["-ed", "-ing", "-s"] }, correctAnswer: { es: "-ing", en: "-ing" } },
            { question: { es: "La frase 'I went to the cinema' significa...", en: "The phrase 'I went to the cinema' means..." }, options: { es: ["Voy al cine", "Fui al cine", "Iré al cine"], en: ["I go to the cinema", "I went to the cinema", "I will go to the cinema"] }, correctAnswer: { es: "Fui al cine", en: "I went to the cinema" } },
            { question: { es: "El adjetivo 'beautiful' significa...", en: "The adjective 'beautiful' means..." }, options: { es: ["feo", "bonito", "viejo"], en: ["ugly", "beautiful", "old"] }, correctAnswer: { es: "bonito", en: "beautiful" } },
            { question: { es: "El verbo 'to live' significa...", en: "The verb 'to live' means..." }, options: { es: ["morir", "vivir", "dormir"], en: ["to die", "to live", "to sleep"] }, correctAnswer: { es: "vivir", en: "to live" } },
            { question: { es: "El plural de 'man' (hombre) es...", en: "The plural of 'man' is..." }, options: { es: ["mans", "men", "mens"], en: ["mans", "men", "mens"] }, correctAnswer: { es: "men", en: "men" } }
        ]
    },
    // Dificultad Avanzada (Niveles 11-20)
    {
        id: 11, title: "Nivel 11", passingScore: 0.85,
        questions: [
            { question: { es: "El pasado perfecto se forma con 'had' y el...", en: "The past perfect is formed with 'had' and the..." }, options: { es: ["infinitivo", "pasado simple", "participio pasado"], en: ["infinitive", "simple past", "past participle"] }, correctAnswer: { es: "participio pasado", en: "past participle" } },
            { question: { es: "La palabra 'unfortunately' significa...", en: "The word 'unfortunately' means..." }, options: { es: ["afortunadamente", "desafortunadamente", "posiblemente"], en: ["fortunately", "unfortunately", "possibly"] }, correctAnswer: { es: "desafortunadamente", en: "unfortunately" } },
            { question: { es: "El 'present perfect continuous' se forma con 'have/has been' y el verbo principal con la terminación...", en: "The 'present perfect continuous' is formed with 'have/has been' and the main verb ending in..." }, options: { es: ["-ed", "-ing", "-s"], en: ["-ed", "-ing", "-s"] }, correctAnswer: { es: "-ing", en: "-ing" } },
            { question: { es: "El verbo 'to write' (escribir) en pasado simple es...", en: "The simple past of the verb 'to write' is..." }, options: { es: ["wrote", "writed", "written"], en: ["wrote", "writed", "written"] }, correctAnswer: { es: "wrote", en: "wrote" } },
            { question: { es: "El 'conditional perfect' se forma con 'would have' y el...", en: "The 'conditional perfect' is formed with 'would have' and the..." }, options: { es: ["infinitivo", "pasado simple", "participio pasado"], en: ["infinitive", "simple past", "past participle"] }, correctAnswer: { es: "participio pasado", en: "past participle" } }
        ]
    },
    {
        id: 12, title: "Nivel 12", passingScore: 0.85,
        questions: [
            { question: { es: "La frase 'I have been studying for hours' significa...", en: "The phrase 'I have been studying for hours' means..." }, options: { es: ["Estudié por horas", "He estado estudiando por horas", "Estudiaré por horas"], en: ["I studied for hours", "I have been studying for hours", "I will study for hours"] }, correctAnswer: { es: "He estado estudiando por horas", en: "I have been studying for hours" } },
            { question: { es: "El 'modal verb' 'should' se usa para expresar...", en: "The 'modal verb' 'should' is used to express..." }, options: { es: ["una obligación", "una posibilidad", "un consejo"], en: ["an obligation", "a possibility", "advice"] }, correctAnswer: { es: "un consejo", en: "advice" } },
            { question: { es: "La palabra 'knowledge' significa...", en: "The word 'knowledge' means..." }, options: { es: ["conocimiento", "inteligencia", "habilidad"], en: ["knowledge", "intelligence", "skill"] }, correctAnswer: { es: "conocimiento", en: "knowledge" } },
            { question: { es: "El 'reported speech' se usa para...", en: "'Reported speech' is used to..." }, options: { es: ["preguntar", "reportar lo que alguien dijo", "describir acciones"], en: ["ask", "report what someone said", "describe actions"] }, correctAnswer: { es: "reportar lo que alguien dijo", en: "report what someone said" } },
            { question: { es: "La preposición 'across' significa...", en: "The preposition 'across' means..." }, options: { es: ["a través de", "cerca de", "detrás de"], en: ["across", "near", "behind"] }, correctAnswer: { es: "a través de", en: "across" } }
        ]
    },
    {
        id: 13, title: "Nivel 13", passingScore: 0.85,
        questions: [
            { question: { es: "El 'passive voice' se forma con el verbo 'to be' y el...", en: "The 'passive voice' is formed with the verb 'to be' and the..." }, options: { es: ["infinitivo", "pasado simple", "participio pasado"], en: ["infinitive", "simple past", "past participle"] }, correctAnswer: { es: "participio pasado", en: "past participle" } },
            { question: { es: "La palabra 'although' significa...", en: "The word 'although' means..." }, options: { es: ["porque", "aunque", "mientras"], en: ["because", "although", "while"] }, correctAnswer: { es: "aunque", en: "although" } },
            { question: { es: "El 'third conditional' se usa para hablar de...", en: "The 'third conditional' is used to talk about..." }, options: { es: ["situaciones reales en el presente", "situaciones irreales en el pasado", "situaciones futuras"], en: ["real situations in the present", "unreal situations in the past", "future situations"] }, correctAnswer: { es: "situaciones irreales en el pasado", en: "unreal situations in the past" } },
            { question: { es: "El 'phrasal verb' 'look up' significa...", en: "The 'phrasal verb' 'look up' means..." }, options: { es: ["buscar en un diccionario", "mirar hacia arriba", "cuidar de"], en: ["to look up in a dictionary", "to look up", "to take care of"] }, correctAnswer: { es: "buscar en un diccionario", en: "to look up in a dictionary" } },
            { question: { es: "La frase 'If I had studied, I would have passed the exam' significa...", en: "The phrase 'If I had studied, I would have passed the exam' means..." }, options: { es: ["Si estudio, aprobaré", "Si hubiera estudiado, habría aprobado el examen", "Si estudiara, aprobaría"], en: ["If I study, I will pass", "If I had studied, I would have passed the exam", "If I studied, I would pass"] }, correctAnswer: { es: "Si hubiera estudiado, habría aprobado el examen", en: "If I had studied, I would have passed the exam" } }
        ]
    },
    {
        id: 14, title: "Nivel 14", passingScore: 0.85,
        questions: [
            { question: { es: "El 'gerundio' es la forma del verbo que termina en...", en: "The 'gerund' is the verb form that ends in..." }, options: { es: ["-ed", "-ing", "-s"], en: ["-ed", "-ing", "-s"] }, correctAnswer: { es: "-ing", en: "-ing" } },
            { question: { es: "La palabra 'therefore' significa...", en: "The word 'therefore' means..." }, options: { es: ["sin embargo", "por lo tanto", "en consecuencia"], en: ["however", "therefore", "consequently"] }, correctAnswer: { es: "por lo tanto", en: "therefore" } },
            { question: { es: "El 'relative pronoun' 'which' se usa para...", en: "The 'relative pronoun' 'which' is used for..." }, options: { es: ["personas", "lugares", "cosas o animales"], en: ["people", "places", "things or animals"] }, correctAnswer: { es: "cosas o animales", en: "things or animals" } },
            { question: { es: "La frase 'The book was written by a famous author' es un ejemplo de...", en: "The phrase 'The book was written by a famous author' is an example of..." }, options: { es: ["voz activa", "voz pasiva", "reported speech"], en: ["active voice", "passive voice", "reported speech"] }, correctAnswer: { es: "voz pasiva", en: "passive voice" } },
            { question: { es: "El 'modal verb' 'must' se usa para expresar...", en: "The 'modal verb' 'must' is used to express..." }, options: { es: ["una posibilidad", "una obligación o deducción lógica", "un consejo"], en: ["a possibility", "an obligation or logical deduction", "advice"] }, correctAnswer: { es: "una obligación o deducción lógica", en: "an obligation or logical deduction" } }
        ]
    },
    {
        id: 15, title: "Nivel 15", passingScore: 0.85,
        questions: [
            { question: { es: "La frase 'The girl who is wearing a red dress is my sister' usa 'who' para referirse a...", en: "The phrase 'The girl who is wearing a red dress is my sister' uses 'who' to refer to..." }, options: { es: ["la cosa", "el lugar", "la persona"], en: ["the thing", "the place", "the person"] }, correctAnswer: { es: "la persona", en: "the person" } },
            { question: { es: "El 'phrasal verb' 'put off' significa...", en: "The 'phrasal verb' 'put off' means..." }, options: { es: ["posponer", "quitarse la ropa", "poner algo en su lugar"], en: ["to postpone", "to take off clothes", "to put something in its place"] }, correctAnswer: { es: "posponer", en: "to postpone" } },
            { question: { es: "La palabra 'nevertheless' significa...", en: "The word 'nevertheless' means..." }, options: { es: ["por lo tanto", "sin embargo", "así que"], en: ["therefore", "however", "so"] }, correctAnswer: { es: "sin embargo", en: "however" } },
            { question: { es: "La pregunta 'Could you help me?' usa el modal 'could' para...", en: "The question 'Could you help me?' uses the modal 'could' to..." }, options: { es: ["pedir un favor de forma formal", "expresar una habilidad", "indicar una posibilidad"], en: ["ask a favor formally", "express an ability", "indicate a possibility"] }, correctAnswer: { es: "pedir un favor de forma formal", en: "ask a favor formally" } },
            { question: { es: "La frase 'He is running' está en tiempo...", en: "The phrase 'He is running' is in the..." }, options: { es: ["pasado simple", "presente continuo", "futuro simple"], en: ["simple past", "present continuous", "simple future"] }, correctAnswer: { es: "presente continuo", en: "present continuous" } }
        ]
    },
    {
        id: 16, title: "Nivel 16", passingScore: 0.9,
        questions: [
            { question: { es: "El 'past continuous' se forma con 'was/were' y el verbo principal con la terminación...", en: "The 'past continuous' is formed with 'was/were' and the main verb ending in..." }, options: { es: ["-ed", "-ing", "-s"], en: ["-ed", "-ing", "-s"] }, correctAnswer: { es: "-ing", en: "-ing" } },
            { question: { es: "La frase 'They have not finished yet' usa 'yet' para indicar que la acción...", en: "The phrase 'They have not finished yet' uses 'yet' to indicate that the action..." }, options: { es: ["terminó", "no ha terminado", "terminará pronto"], en: ["finished", "has not finished", "will finish soon"] }, correctAnswer: { es: "no ha terminado", en: "has not finished" } },
            { question: { es: "El adjetivo 'fast' es irregular en su forma comparativa, que es...", en: "The adjective 'fast' is irregular in its comparative form, which is..." }, options: { es: ["faster", "fastier", "more fast"], en: ["faster", "fastier", "more fast"] }, correctAnswer: { es: "faster", en: "faster" } },
            { question: { es: "El 'superlativo' de 'good' es...", en: "The 'superlative' of 'good' is..." }, options: { es: ["goodest", "better", "best"], en: ["goodest", "better", "best"] }, correctAnswer: { es: "best", en: "best" } },
            { question: { es: "El 'zero conditional' se usa para hablar de...", en: "The 'zero conditional' is used to talk about..." }, options: { es: ["situaciones futuras", "situaciones reales o verdades generales", "situaciones pasadas"], en: ["future situations", "real situations or general truths", "past situations"] }, correctAnswer: { es: "situaciones reales o verdades generales", en: "real situations or general truths" } }
        ]
    },
    {
        id: 17, title: "Nivel 17", passingScore: 0.9,
        questions: [
            { question: { es: "El verbo 'to see' (ver) en pasado simple es...", en: "The simple past of the verb 'to see' is..." }, options: { es: ["seeed", "saw", "seen"], en: ["seeed", "saw", "seen"] }, correctAnswer: { es: "saw", en: "saw" } },
            { question: { es: "La frase 'He said that he was tired' es un ejemplo de...", en: "The phrase 'He said that he was tired' is an example of..." }, options: { es: ["voz activa", "reported speech", "preguntas indirectas"], en: ["active voice", "reported speech", "indirect questions"] }, correctAnswer: { es: "reported speech", en: "reported speech" } },
            { question: { es: "El 'relative pronoun' 'whose' se usa para indicar...", en: "The 'relative pronoun' 'whose' is used to indicate..." }, options: { es: ["propiedad", "lugar", "tiempo"], en: ["possession", "place", "time"] }, correctAnswer: { es: "propiedad", en: "possession" } },
            { question: { es: "El 'phrasal verb' 'take off' significa...", en: "The 'phrasal verb' 'take off' means..." }, options: { es: ["despegar o quitarse ropa", "ponerse ropa", "subir"], en: ["to take off (plane) or to take off (clothes)", "to put on clothes", "to go up"] }, correctAnswer: { es: "despegar o quitarse ropa", en: "to take off (plane) or to take off (clothes)" } },
            { question: { es: "El adverbio 'carefully' significa...", en: "The adverb 'carefully' means..." }, options: { es: ["rápidamente", "cuidadosamente", "lentamente"], en: ["quickly", "carefully", "slowly"] }, correctAnswer: { es: "cuidadosamente", en: "carefully" } }
        ]
    },
    {
        id: 18, title: "Nivel 18", passingScore: 0.9,
        questions: [
            { question: { es: "El 'future perfect' se forma con 'will have' y el...", en: "The 'future perfect' is formed with 'will have' and the..." }, options: { es: ["infinitivo", "pasado simple", "participio pasado"], en: ["infinitive", "simple past", "past participle"] }, correctAnswer: { es: "participio pasado", en: "past participle" } },
            { question: { es: "La palabra 'unfortunately' es un adverbio que modifica a...", en: "The word 'unfortunately' is an adverb that modifies..." }, options: { es: ["un sustantivo", "un verbo, un adjetivo o a otro adverbio", "un pronombre"], en: ["a noun", "a verb, an adjective or another adverb", "a pronoun"] }, correctAnswer: { es: "un verbo, un adjetivo o a otro adverbio", en: "a verb, an adjective or another adverb" } },
            { question: { es: "El 'first conditional' se usa para hablar de...", en: "The 'first conditional' is used to talk about..." }, options: { es: ["situaciones futuras probables", "situaciones irreales en el presente", "situaciones pasadas"], en: ["likely future situations", "unreal situations in the present", "past situations"] }, correctAnswer: { es: "situaciones futuras probables", en: "likely future situations" } },
            { question: { es: "La frase 'If it rains, I will stay at home' es un ejemplo de...", en: "The phrase 'If it rains, I will stay at home' is an example of..." }, options: { es: ["zero conditional", "first conditional", "second conditional"], en: ["zero conditional", "first conditional", "second conditional"] }, correctAnswer: { es: "first conditional", en: "first conditional" } },
            { question: { es: "La preposición 'among' significa...", en: "The preposition 'among' means..." }, options: { es: ["entre dos cosas", "entre más de dos cosas", "al lado de"], en: ["between two things", "among more than two things", "next to"] }, correctAnswer: { es: "entre más de dos cosas", en: "among more than two things" } }
        ]
    },
    {
        id: 19, title: "Nivel 19", passingScore: 0.95,
        questions: [
            { question: { es: "La frase 'I have been to Paris' usa el presente perfecto para hablar de...", en: "The phrase 'I have been to Paris' uses the present perfect to talk about..." }, options: { es: ["una acción que ocurrió en un momento específico", "una experiencia sin especificar cuándo", "una acción que continúa en el presente"], en: ["an action that happened at a specific time", "an experience without specifying when", "an action that continues in the present"] }, correctAnswer: { es: "una experiencia sin especificar cuándo", en: "an experience without specifying when" } },
            { question: { es: "El 'second conditional' se usa para hablar de...", en: "The 'second conditional' is used to talk about..." }, options: { es: ["situaciones futuras probables", "situaciones irreales en el presente o futuro", "situaciones pasadas"], en: ["likely future situations", "unreal situations in the present or future", "past situations"] }, correctAnswer: { es: "situaciones irreales en el presente o futuro", en: "unreal situations in the present or future" } },
            { question: { es: "El 'modal verb' 'might' se usa para expresar...", en: "The 'modal verb' 'might' is used to express..." }, options: { es: ["una alta probabilidad", "una baja probabilidad", "una obligación"], en: ["a high probability", "a low probability", "an obligation"] }, correctAnswer: { es: "una baja probabilidad", en: "a low probability" } },
            { question: { es: "La frase 'He asked me where I lived' es un ejemplo de...", en: "The phrase 'He asked me where I lived' is an example of..." }, options: { es: ["reported speech", "pregunta directa", "pasado perfecto"], en: ["reported speech", "direct question", "past perfect"] }, correctAnswer: { es: "reported speech", en: "reported speech" } },
            { question: { es: "El 'quantifier' 'few' se usa con sustantivos...", en: "The 'quantifier' 'few' is used with..." }, options: { es: ["incontables", "contables en plural", "contables en singular"], en: ["uncountable nouns", "plural countable nouns", "singular countable nouns"] }, correctAnswer: { es: "contables en plural", en: "plural countable nouns" } }
        ]
    },
    {
        id: 20, title: "Nivel 20", passingScore: 0.95,
        questions: [
            { question: { es: "El 'gerundio' puede funcionar como...", en: "The 'gerund' can function as..." }, options: { es: ["sustantivo", "adjetivo", "adverbio"], en: ["a noun", "an adjective", "an adverb"] }, correctAnswer: { es: "sustantivo", en: "a noun" } },
            { question: { es: "La frase 'I am used to living in a big city' significa...", en: "The phrase 'I am used to living in a big city' means..." }, options: { es: ["Solía vivir en una gran ciudad", "Estoy acostumbrado a vivir en una gran ciudad", "Vivo en una gran ciudad"], en: ["I used to live in a big city", "I am used to living in a big city", "I live in a big city"] }, correctAnswer: { es: "Estoy acostumbrado a vivir en una gran ciudad", en: "I am used to living in a big city" } },
            { question: { es: "El verbo 'to get' puede formar muchos 'phrasal verbs' y uno de ellos, 'get up', significa...", en: "The verb 'to get' can form many 'phrasal verbs' and one of them, 'get up', means..." }, options: { es: ["levantarse", "entender", "llegar"], en: ["to get up", "to understand", "to arrive"] }, correctAnswer: { es: "levantarse", en: "to get up" } },
            { question: { es: "La palabra 'however' se usa como un conector para expresar...", en: "The word 'however' is used as a connector to express..." }, options: { es: ["causa", "contraste", "resultado"], en: ["cause", "contrast", "result"] }, correctAnswer: { es: "contraste", en: "contrast" } },
            { question: { es: "El 'futuro continuo' se forma con 'will be' y el verbo principal con la terminación...", en: "The 'future continuous' is formed with 'will be' and the main verb ending in..." }, options: { es: ["-ed", "-ing", "-s"], en: ["-ed", "-ing", "-s"] }, correctAnswer: { es: "-ing", en: "-ing" } }
        ]
    },
    // Dificultad Experto (Niveles 21-30)
    {
        id: 21, title: "Nivel 21", passingScore: 0.95,
        questions: [
            { question: { es: "El 'adverbio de frecuencia' 'seldom' significa...", en: "The 'adverb of frequency' 'seldom' means..." }, options: { es: ["a menudo", "nunca", "rara vez"], en: ["often", "never", "seldom"] }, correctAnswer: { es: "rara vez", en: "seldom" } },
            { question: { es: "El 'third conditional' se utiliza para expresar arrepentimiento o...", en: "The 'third conditional' is used to express regret or..." }, options: { es: ["una predicción", "una situación imaginaria en el pasado", "un hábito"], en: ["a prediction", "an imaginary situation in the past", "a habit"] }, correctAnswer: { es: "una situación imaginaria en el pasado", en: "an imaginary situation in the past" } },
            { question: { es: "El 'verbo modal' 'used to' se usa para hablar de...", en: "The 'modal verb' 'used to' is used to talk about..." }, options: { es: ["hábitos en el presente", "hábitos en el pasado", "obligaciones"], en: ["habits in the present", "habits in the past", "obligations"] }, correctAnswer: { es: "hábitos en el pasado", en: "habits in the past" } },
            { question: { es: "La palabra 'unless' significa lo mismo que...", en: "The word 'unless' means the same as..." }, options: { es: ["si", "a menos que", "debido a que"], en: ["if", "unless", "because"] }, correctAnswer: { es: "a menos que", en: "unless" } },
            { question: { es: "El 'phrasal verb' 'give up' significa...", en: "The 'phrasal verb' 'give up' means..." }, options: { es: ["dar algo", "rendirse o dejar un hábito", "entregarse"], en: ["to give something", "to give up or quit a habit", "to surrender"] }, correctAnswer: { es: "rendirse o dejar un hábito", en: "to give up or quit a habit" } }
        ]
    },
    {
        id: 22, title: "Nivel 22", passingScore: 1.0,
        questions: [
            { question: { es: "El 'past perfect continuous' se forma con 'had been' y el verbo principal con la terminación...", en: "The 'past perfect continuous' is formed with 'had been' and the main verb ending in..." }, options: { es: ["-ed", "-ing", "-s"], en: ["-ed", "-ing", "-s"] }, correctAnswer: { es: "-ing", en: "-ing" } },
            { question: { es: "La palabra 'consequently' significa...", en: "The word 'consequently' means..." }, options: { es: ["por el contrario", "en consecuencia", "además"], en: ["on the contrary", "consequently", "besides"] }, correctAnswer: { es: "en consecuencia", en: "consequently" } },
            { question: { es: "El 'relative pronoun' 'whom' se usa como objeto para referirse a...", en: "The 'relative pronoun' 'whom' is used as an object to refer to..." }, options: { es: ["personas", "lugares", "cosas"], en: ["people", "places", "things"] }, correctAnswer: { es: "personas", en: "people" } },
            { question: { es: "La frase 'The woman with whom I spoke...' significa...", en: "The phrase 'The woman with whom I spoke...' means..." }, options: { es: ["La mujer de la que hablé...", "La mujer con la que hablé...", "La mujer que habló..."], en: ["The woman I spoke of...", "The woman with whom I spoke...", "The woman who spoke..."] }, correctAnswer: { es: "La mujer con la que hablé...", en: "The woman with whom I spoke..." } },
            { question: { es: "El 'conditional perfect' se usa para hablar de una acción que...", en: "The 'conditional perfect' is used to talk about an action that..." }, options: { es: ["ocurrió en el pasado", "ocurrirá en el futuro", "habría ocurrido si una condición en el pasado se hubiera cumplido"], en: ["happened in the past", "will happen in the future", "would have happened if a condition in the past had been met"] }, correctAnswer: { es: "habría ocurrido si una condición en el pasado se hubiera cumplido", en: "would have happened if a condition in the past had been met" } }
        ]
    },
    {
        id: 23, title: "Nivel 23", passingScore: 1.0,
        questions: [
            { question: { es: "El 'verbo modal' 'ought to' se usa para expresar...", en: "The 'modal verb' 'ought to' is used to express..." }, options: { es: ["una obligación fuerte", "una recomendación o deber moral", "una posibilidad"], en: ["a strong obligation", "a recommendation or moral duty", "a possibility"] }, correctAnswer: { es: "una recomendación o deber moral", en: "a recommendation or moral duty" } },
            { question: { es: "La palabra 'hence' significa...", en: "The word 'hence' means..." }, options: { es: ["desde", "por lo tanto", "sin embargo"], en: ["since", "therefore", "however"] }, correctAnswer: { es: "por lo tanto", en: "therefore" } },
            { question: { es: "El 'phrasal verb' 'break down' significa...", en: "The 'phrasal verb' 'break down' means..." }, options: { es: ["romperse o averiarse", "terminar una relación", "descomponerse"], en: ["to break or break down", "to end a relationship", "to decompose"] }, correctAnswer: { es: "romperse o averiarse", en: "to break or break down" } },
            { question: { es: "La frase 'It's high time you studied' significa...", en: "The phrase 'It's high time you studied' means..." }, options: { es: ["Es hora de que estudies", "Es tarde para que estudies", "Estudiar es bueno"], en: ["It's time for you to study", "It's late for you to study", "Studying is good"] }, correctAnswer: { es: "Es hora de que estudies", en: "It's time for you to study" } },
            { question: { es: "El 'subjunctive mood' se usa para expresar...", en: "The 'subjunctive mood' is used to express..." }, options: { es: ["hechos", "deseos, sugerencias o dudas", "obligaciones"], en: ["facts", "wishes, suggestions or doubts", "obligations"] }, correctAnswer: { es: "deseos, sugerencias o dudas", en: "wishes, suggestions or doubts" } }
        ]
    },
    {
        id: 24, title: "Nivel 24", passingScore: 1.0,
        questions: [
            { question: { es: "El 'verbo modal' 'may' se usa para expresar...", en: "The 'modal verb' 'may' is used to express..." }, options: { es: ["habilidad", "permiso o posibilidad", "una obligación"], en: ["ability", "permission or possibility", "an obligation"] }, correctAnswer: { es: "permiso o posibilidad", en: "permission or possibility" } },
            { question: { es: "La palabra 'subsequently' significa...", en: "The word 'subsequently' means..." }, options: { es: ["anteriormente", "posteriormente", "constantemente"], en: ["previously", "subsequently", "constantly"] }, correctAnswer: { es: "posteriormente", en: "subsequently" } },
            { question: { es: "El 'phrasal verb' 'turn down' significa...", en: "The 'phrasal verb' 'turn down' means..." }, options: { es: ["encender", "rechazar o bajar el volumen", "subir el volumen"], en: ["to turn on", "to turn down or reject", "to turn up the volume"] }, correctAnswer: { es: "rechazar o bajar el volumen", en: "to turn down or reject" } },
            { question: { es: "El 'reported speech' de 'I am going to the store' es...", en: "The 'reported speech' of 'I am going to the store' is..." }, options: { es: ["He said he went to the store", "He said he was going to the store", "He said I was going to the store"], en: ["He said he went to the store", "He said he was going to the store", "He said I was going to the store"] }, correctAnswer: { es: "He said he was going to the store", en: "He said he was going to the store" } },
            { question: { es: "El 'third conditional' se forma con el 'past perfect' en la cláusula 'if' y el 'conditional perfect' en la cláusula principal, ¿esto es cierto o falso?", en: "The 'third conditional' is formed with the 'past perfect' in the 'if' clause and the 'conditional perfect' in the main clause, is this true or false?" }, options: { es: ["Verdadero", "Falso"], en: ["True", "False"] }, correctAnswer: { es: "Verdadero", en: "True" } }
        ]
    },
    {
        id: 25, title: "Nivel 25", passingScore: 1.0,
        questions: [
            { question: { es: "El 'infinitivo' puede usarse con 'to' o sin 'to'. La forma sin 'to' se llama 'bare infinitive' y se usa después de los 'modal verbs' y el verbo...", en: "The 'infinitive' can be used with or without 'to'. The form without 'to' is called the 'bare infinitive' and is used after 'modal verbs' and the verb..." }, options: { es: ["go", "make", "want"], en: ["go", "make", "want"] }, correctAnswer: { es: "make", en: "make" } },
            { question: { es: "La palabra 'whereby' significa...", en: "The word 'whereby' means..." }, options: { es: ["por el cual", "siempre y cuando", "sin importar"], en: ["whereby", "as long as", "regardless"] }, correctAnswer: { es: "por el cual", en: "whereby" } },
            { question: { es: "El 'infinitive of purpose' se usa para expresar...", en: "The 'infinitive of purpose' is used to express..." }, options: { es: ["una razón o propósito", "una obligación", "una posibilidad"], en: ["a reason or purpose", "an obligation", "a possibility"] }, correctAnswer: { es: "una razón o propósito", en: "a reason or purpose" } },
            { question: { es: "El 'phrasal verb' 'look into' significa...", en: "The 'phrasal verb' 'look into' means..." }, options: { es: ["cuidar de", "investigar", "admirar"], en: ["to take care of", "to investigate", "to admire"] }, correctAnswer: { es: "investigar", en: "to investigate" } },
            { question: { es: "El 'zero conditional' usa el 'present simple' en ambas cláusulas, ¿esto es cierto o falso?", en: "The 'zero conditional' uses the 'present simple' in both clauses, is this true or false?" }, options: { es: ["Verdadero", "Falso"], en: ["True", "False"] }, correctAnswer: { es: "Verdadero", en: "True" } }
        ]
    },
    {
        id: 26, title: "Nivel 26", passingScore: 1.0,
        questions: [
            { question: { es: "La frase 'He denied having stolen the money' es un ejemplo de la forma en la que el 'gerundio' puede ir precedido por un...", en: "The phrase 'He denied having stolen the money' is an example of how the 'gerund' can be preceded by a..." }, options: { es: ["sustantivo", "verbo", "pronombre posesivo"], en: ["noun", "verb", "possessive pronoun"] }, correctAnswer: { es: "pronombre posesivo", en: "possessive pronoun" } },
            { question: { es: "El 'verbo modal' 'shall' se usa para ofrecer, sugerir o preguntar sobre...", en: "The 'modal verb' 'shall' is used to offer, suggest or ask about..." }, options: { es: ["el pasado", "el futuro", "el presente"], en: ["the past", "the future", "the present"] }, correctAnswer: { es: "el futuro", en: "the future" } },
            { question: { es: "La palabra 'nonetheless' significa lo mismo que...", en: "The word 'nonetheless' means the same as..." }, options: { es: ["por lo tanto", "sin embargo", "en consecuencia"], en: ["therefore", "however", "consequently"] }, correctAnswer: { es: "sin embargo", en: "however" } },
            { question: { es: "El 'third conditional' es un tipo de 'conditional clause' que se utiliza para hablar de...", en: "The 'third conditional' is a type of 'conditional clause' that is used to talk about..." }, options: { es: ["situaciones reales en el presente", "situaciones hipotéticas en el pasado", "situaciones probables en el futuro"], en: ["real situations in the present", "hypothetical situations in the past", "likely situations in the future"] }, correctAnswer: { es: "situaciones hipotéticas en el pasado", en: "hypothetical situations in the past" } },
            { question: { es: "El 'phrasal verb' 'call off' significa...", en: "The 'phrasal verb' 'call off' means..." }, options: { es: ["llamar a alguien", "cancelar", "gritar"], en: ["to call someone", "to cancel", "to shout"] }, correctAnswer: { es: "cancelar", en: "to cancel" } }
        ]
    },
    {
        id: 27, title: "Nivel 27", passingScore: 1.0,
        questions: [
            { question: { es: "El 'present perfect' se usa con 'since' para indicar el punto de partida de una acción que...", en: "The 'present perfect' is used with 'since' to indicate the starting point of an action that..." }, options: { es: ["terminó en el pasado", "continúa en el presente", "pasará en el futuro"], en: ["finished in the past", "continues in the present", "will happen in the future"] }, correctAnswer: { es: "continúa en el presente", en: "continues in the present" } },
            { question: { es: "La frase 'It's no use crying over spilled milk' significa que...", en: "The phrase 'It's no use crying over spilled milk' means that..." }, options: { es: ["hay que llorar por la leche derramada", "no sirve de nada lamentarse por lo que ya pasó", "la leche se derramó"], en: ["you have to cry over spilled milk", "it's no use crying over what has already happened", "the milk was spilled"] }, correctAnswer: { es: "no sirve de nada lamentarse por lo que ya pasó", en: "it's no use crying over what has already happened" } },
            { question: { es: "El 'verbo modal' 'will' se usa para expresar una decisión tomada en el momento de...", en: "The 'modal verb' 'will' is used to express a decision made at the moment of..." }, options: { es: ["hablar", "escribir", "pensar"], en: ["speaking", "writing", "thinking"] }, correctAnswer: { es: "hablar", en: "speaking" } },
            { question: { es: "La frase 'They said the flight was delayed' es un ejemplo de 'reported speech' en el que el verbo 'to be' en presente fue cambiado a...", en: "The phrase 'They said the flight was delayed' is an example of 'reported speech' in which the verb 'to be' in the present was changed to..." }, options: { es: ["futuro", "pasado", "participio"], en: ["future", "past", "participle"] }, correctAnswer: { es: "pasado", en: "past" } },
            { question: { es: "El 'phrasal verb' 'do away with' significa...", en: "The 'phrasal verb' 'do away with' means..." }, options: { es: ["hacer algo", "deshacerse de algo", "hacer algo mal"], en: ["to do something", "to get rid of something", "to do something wrong"] }, correctAnswer: { es: "deshacerse de algo", en: "to get rid of something" } }
        ]
    },
    {
        id: 28, title: "Nivel 28", passingScore: 1.0,
        questions: [
            { question: { es: "El 'mixed conditional' combina cláusulas de diferentes tipos de condicionales. El 'mixed conditional' se usa para hablar de una condición en el pasado que tiene una consecuencia en el...", en: "The 'mixed conditional' combines clauses of different types of conditionals. The 'mixed conditional' is used to talk about a condition in the past that has a consequence in the..." }, options: { es: ["futuro", "presente", "pasado"], en: ["future", "present", "past"] }, correctAnswer: { es: "presente", en: "present" } },
            { question: { es: "La frase 'If I had won the lottery, I would be rich now' es un ejemplo de 'mixed conditional'. ¿Esto es cierto o falso?", en: "The phrase 'If I had won the lottery, I would be rich now' is an example of a 'mixed conditional'. Is this true or false?" }, options: { es: ["Verdadero", "Falso"], en: ["True", "False"] }, correctAnswer: { es: "Verdadero", en: "True" } },
            { question: { es: "El 'verbo modal' 'may as well' se usa para expresar que...", en: "The 'modal verb' 'may as well' is used to express that..." }, options: { es: ["algo es una buena idea", "no hay una mejor opción", "algo es una mala idea"], en: ["something is a good idea", "there is no better option", "something is a bad idea"] }, correctAnswer: { es: "no hay una mejor opción", en: "there is no better option" } },
            { question: { es: "La palabra 'wherever' significa...", en: "The word 'wherever' means..." }, options: { es: ["donde", "dondequiera que", "aquí"], en: ["where", "wherever", "here"] }, correctAnswer: { es: "dondequiera que", en: "wherever" } },
            { question: { es: "El 'phrasal verb' 'come across' significa...", en: "The 'phrasal verb' 'come across' means..." }, options: { es: ["encontrar o toparse con algo", "atravesar", "conseguir"], en: ["to find or come across something", "to cross", "to get"] }, correctAnswer: { es: "encontrar o toparse con algo", en: "to find or come across something" } }
        ]
    },
    {
        id: 29, title: "Nivel 29", passingScore: 1.0,
        questions: [
            { question: { es: "La frase 'She insisted on me paying for dinner' es un ejemplo de la forma en la que el 'gerundio' puede ir precedido por un...", en: "The phrase 'She insisted on me paying for dinner' is an example of how the 'gerund' can be preceded by a..." }, options: { es: ["sustantivo", "verbo", "pronombre posesivo"], en: ["noun", "verb", "possessive pronoun"] }, correctAnswer: { es: "pronombre posesivo", en: "possessive pronoun" } },
            { question: { es: "El 'reported speech' de 'Will you go?' es...", en: "The 'reported speech' of 'Will you go?' is..." }, options: { es: ["He asked if I will go", "He asked if I would go", "He asked if I went"], en: ["He asked if I will go", "He asked if I would go", "He asked if I went"] }, correctAnswer: { es: "He asked if I would go", en: "He asked if I would go" } },
            { question: { es: "La palabra 'for' se usa con el 'present perfect' para indicar...", en: "The word 'for' is used with the 'present perfect' to indicate..." }, options: { es: ["el punto de partida", "la duración de una acción", "el resultado de una acción"], en: ["the starting point", "the duration of an action", "the result of an action"] }, correctAnswer: { es: "la duración de una acción", en: "the duration of an action" } },
            { question: { es: "El 'verbo modal' 'could' puede usarse para expresar 'past ability' o...", en: "The 'modal verb' 'could' can be used to express 'past ability' or..." }, options: { es: ["futuro", "pasado", "sugerencias o peticiones amables"], en: ["future", "past", "suggestions or polite requests"] }, correctAnswer: { es: "sugerencias o peticiones amables", en: "suggestions or polite requests" } },
            { question: { es: "El 'phrasal verb' 'keep up with' significa...", en: "The 'phrasal verb' 'keep up with' means..." }, options: { es: ["seguir el ritmo de alguien", "mantener algo en alto", "dejar de hacer algo"], en: ["to keep up with someone", "to hold something up", "to stop doing something"] }, correctAnswer: { es: "seguir el ritmo de alguien", en: "to keep up with someone" } }
        ]
    },
    {
        id: 30, title: "Nivel 30", passingScore: 1.0,
        questions: [
            { question: { es: "El 'verbo modal' 'used to' se utiliza para hablar de hábitos o estados en el pasado que...", en: "The 'modal verb' 'used to' is used to talk about habits or states in the past that..." }, options: { es: ["todavía continúan", "ya no continúan", "ocurrirán en el futuro"], en: ["still continue", "no longer continue", "will happen in the future"] }, correctAnswer: { es: "ya no continúan", en: "no longer continue" } },
            { question: { es: "La frase 'The cake was eaten by the dog' es un ejemplo de 'passive voice' donde el agente ('the dog') se introduce con la preposición...", en: "The phrase 'The cake was eaten by the dog' is an example of 'passive voice' where the agent ('the dog') is introduced with the preposition..." }, options: { es: ["with", "for", "by"], en: ["with", "for", "by"] }, correctAnswer: { es: "by", en: "by" } },
            { question: { es: "El 'reported speech' de 'I like coffee' es...", en: "The 'reported speech' of 'I like coffee' is..." }, options: { es: ["He said he liked coffee", "He said he likes coffee", "He said he would like coffee"], en: ["He said he liked coffee", "He said he likes coffee", "He said he would like coffee"] }, correctAnswer: { es: "He said he liked coffee", en: "He said he liked coffee" } },
            { question: { es: "La frase 'There's a lot of work to do' significa...", en: "The phrase 'There's a lot of work to do' means..." }, options: { es: ["No hay mucho trabajo que hacer", "Hay mucho trabajo que hacer", "El trabajo es mucho"], en: ["There's not much work to do", "There's a lot of work to do", "The work is a lot"] }, correctAnswer: { es: "Hay mucho trabajo que hacer", en: "There's a lot of work to do" } },
            { question: { es: "El 'phrasal verb' 'look forward to' se usa para expresar...", en: "The 'phrasal verb' 'look forward to' is used to express..." }, options: { es: ["miedo", "alegría o anticipación", "tristeza"], en: ["fear", "joy or anticipation", "sadness"] }, correctAnswer: { es: "alegría o anticipación", en: "joy or anticipation" } }
        ]
    }
];

