export const levels = [
    // Dificultad Baja (Niveles 1-5)
    {
        id: 1, title: "Nivel 1", passingScore: 0.6,
        questions: [
            { question: { es: "¿Cuál es la primera letra del abecedario?", en: "What is the first letter of the alphabet?" }, options: { es: ["B", "C", "A"], en: ["B", "C", "A"] }, correctAnswer: { es: "A", en: "A" } },
            { question: { es: "¿Cuántas vocales tiene el abecedario?", en: "How many vowels does the alphabet have?" }, options: { es: ["4", "5", "6"], en: ["4", "5", "6"] }, correctAnswer: { es: "5", en: "5" } },
            { question: { es: "El sonido 'ma' se forma con la 'm' y la vocal...", en: "The sound 'ma' is formed with 'm' and the vowel..." }, options: { es: ["e", "o", "a"], en: ["e", "o", "a"] }, correctAnswer: { es: "a", en: "a" } },
            { question: { es: "La palabra 'sol' tiene...", en: "The word 'sol' (sun) has..." }, options: { es: ["Una sílaba", "Dos sílabas", "Tres sílabas"], en: ["One syllable", "Two syllables", "Three syllables"] }, correctAnswer: { es: "Una sílaba", en: "One syllable" } },
            { question: { es: "Una palabra que empieza con la 'P' es...", en: "A word that starts with 'P' is..." }, options: { es: ["Mesa", "Pato", "Lana"], en: ["Table", "Duck", "Wool"] }, correctAnswer: { es: "Pato", en: "Duck" } }
        ]
    },
    {
        id: 2, title: "Nivel 2", passingScore: 0.65,
        questions: [
            { question: { es: "¿Qué palabra rima con 'queso'?", en: "Which word rhymes with 'queso' (cheese)?" }, options: { es: ["pan", "hueso", "agua"], en: ["bread", "bone", "water"] }, correctAnswer: { es: "hueso", en: "bone" } },
            { question: { es: "El nombre 'Luis' es un sustantivo...", en: "The name 'Luis' is a..." }, options: { es: ["Común", "Propio", "Abstracto"], en: ["Common noun", "Proper noun", "Abstract noun"] }, correctAnswer: { es: "Propio", en: "Proper noun" } },
            { question: { es: "¿Cuál es el plural de 'perro'?", en: "What is the plural of 'perro' (dog)?" }, options: { es: ["perros", "perres", "perrito"], en: ["dogs", "perres", "puppy"] }, correctAnswer: { es: "perros", en: "dogs" } },
            { question: { es: "Un adjetivo es una palabra que...", en: "An adjective is a word that..." }, options: { es: ["Nombra objetos", "Indica una acción", "Describe a un sustantivo"], en: ["Names objects", "Indicates an action", "Describes a noun"] }, correctAnswer: { es: "Describe a un sustantivo", en: "Describes a noun" } },
            { question: { es: "¿Cuál es el verbo en 'La niña come manzanas'?", en: "What is the verb in 'The girl eats apples'?" }, options: { es: ["niña", "come", "manzanas"], en: ["girl", "eats", "apples"] }, correctAnswer: { es: "come", en: "eats" } }
        ]
    },
    {
        id: 3, title: "Nivel 3", passingScore: 0.7,
        questions: [
            { question: { es: "El antónimo de 'grande' es...", en: "The antonym of 'big' is..." }, options: { es: ["alto", "pequeño", "largo"], en: ["tall", "small", "long"] }, correctAnswer: { es: "pequeño", en: "small" } },
            { question: { es: "Un sinónimo de 'bonito' es...", en: "A synonym for 'pretty' is..." }, options: { es: ["feo", "hermoso", "rojo"], en: ["ugly", "beautiful", "red"] }, correctAnswer: { es: "hermoso", en: "beautiful" } },
            { question: { es: "El género masculino de 'niña' es...", en: "The masculine gender of 'girl' is..." }, options: { es: ["niño", "niñito", "niñote"], en: ["boy", "little boy", "big boy"] }, correctAnswer: { es: "niño", en: "boy" } },
            { question: { es: "Una oración que hace una pregunta se llama...", en: "A sentence that asks a question is called..." }, options: { es: ["Exclamativa", "Interrogativa", "Declarativa"], en: ["Exclamatory", "Interrogative", "Declarative"] }, correctAnswer: { es: "Interrogativa", en: "Interrogative" } },
            { question: { es: "En la oración 'El cielo está azul', el sujeto es...", en: "In the sentence 'The sky is blue', the subject is..." }, options: { es: ["azul", "está", "El cielo"], en: ["blue", "is", "The sky"] }, correctAnswer: { es: "El cielo", en: "The sky" } }
        ]
    },
    {
        id: 4, title: "Nivel 4", passingScore: 0.7,
        questions: [
            { question: { es: "La sílaba tónica es la que...", en: "The stressed syllable is the one that..." }, options: { es: ["Se pronuncia más bajo", "Se pronuncia con más fuerza", "Va al final de la palabra"], en: ["Is pronounced lower", "Is pronounced with more force", "Is at the end of the word"] }, correctAnswer: { es: "Se pronuncia con más fuerza", en: "Is pronounced with more force" } },
            { question: { es: "La palabra 'ratón' es...", en: "The word 'ratón' (mouse) is classified as..." }, options: { es: ["Aguda", "Grave", "Esdrújula"], en: ["Aguda", "Grave", "Esdrújula"] }, correctAnswer: { es: "Aguda", en: "Aguda" } },
            { question: { es: "La palabra 'árbol' lleva tilde porque es...", en: "The word 'árbol' (tree) has an accent because it is..." }, options: { es: ["Aguda terminada en 'l'", "Grave terminada en 'l'", "Esdrújula"], en: ["Aguda ending in 'l'", "Grave ending in 'l'", "Esdrújula"] }, correctAnswer: { es: "Grave terminada en 'l'", en: "Grave ending in 'l'" } },
            { question: { es: "Un diptongo es la unión de dos vocales en...", en: "A diphthong is the union of two vowels in..." }, options: { es: ["Diferentes sílabas", "Una misma sílaba", "Palabras diferentes"], en: ["Different syllables", "The same syllable", "Different words"] }, correctAnswer: { es: "Una misma sílaba", en: "The same syllable" } },
            { question: { es: "¿Qué palabra tiene un diptongo?", en: "Which word has a diphthong?" }, options: { es: ["poeta", "maíz", "cielo"], en: ["poet", "corn", "sky"] }, correctAnswer: { es: "cielo", en: "sky" } }
        ]
    },
    {
        id: 5, title: "Nivel 5", passingScore: 0.75,
        questions: [
            { question: { es: "Una palabra que indica una acción es un...", en: "A word that indicates an action is a..." }, options: { es: ["Sustantivo", "Adjetivo", "Verbo"], en: ["Noun", "Adjective", "Verb"] }, correctAnswer: { es: "Verbo", en: "Verb" } },
            { question: { es: "El verbo 'comer' en pasado es...", en: "The verb 'comer' (to eat) in the past tense is..." }, options: { es: ["comerá", "comió", "come"], en: ["will eat", "ate", "eats"] }, correctAnswer: { es: "comió", en: "ate" } },
            { question: { es: "Un adverbio es una palabra que modifica a...", en: "An adverb is a word that modifies..." }, options: { es: ["un sustantivo", "un verbo", "una conjunción"], en: ["a noun", "a verb", "a conjunction"] }, correctAnswer: { es: "un verbo", en: "a verb" } },
            { question: { es: "¿Qué palabra es un adverbio de lugar?", en: "Which word is an adverb of place?" }, options: { es: ["rápido", "aquí", "siempre"], en: ["fast", "here", "always"] }, correctAnswer: { es: "aquí", en: "here" } },
            { question: { es: "El prefijo 'in-' en 'invisible' significa...", en: "The prefix 'in-' in 'invisible' means..." }, options: { es: ["dentro", "negación", "mucho"], en: ["inside", "negation", "a lot"] }, correctAnswer: { es: "negación", en: "negation" } }
        ]
    },
    {
        id: 6, title: "Nivel 6", passingScore: 0.75,
        questions: [
            { question: { es: "El hiato es la separación de dos vocales en...", en: "A hiatus is the separation of two vowels into..." }, options: { es: ["Una misma sílaba", "Diferentes sílabas", "Una vocal y una consonante"], en: ["The same syllable", "Different syllables", "A vowel and a consonant"] }, correctAnswer: { es: "Diferentes sílabas", en: "Different syllables" } },
            { question: { es: "¿Qué palabra tiene un hiato?", en: "Which word has a hiatus?" }, options: { es: ["cielo", "poeta", "auto"], en: ["sky", "poet", "car"] }, correctAnswer: { es: "poeta", en: "poet" } },
            { question: { es: "La sílaba tónica de la palabra 'esdrújula' es la...", en: "The stressed syllable of the word 'esdrújula' is the..." }, options: { es: ["última", "penúltima", "antepenúltima"], en: ["last", "second to last", "third to last"] }, correctAnswer: { es: "antepenúltima", en: "third to last" } },
            { question: { es: "Las palabras esdrújulas siempre llevan...", en: "Esdrújula words always have..." }, options: { es: ["mayúscula", "tilde", "punto"], en: ["a capital letter", "an accent mark", "a period"] }, correctAnswer: { es: "tilde", en: "an accent mark" } },
            { question: { es: "La persona que recibe la acción del verbo es el...", en: "The person who receives the action of the verb is the..." }, options: { es: ["Sujeto", "Objeto directo", "Objeto indirecto"], en: ["Subject", "Direct object", "Indirect object"] }, correctAnswer: { es: "Objeto directo", en: "Direct object" } }
        ]
    },
    {
        id: 7, title: "Nivel 7", passingScore: 0.8,
        questions: [
            { question: { es: "Un pronombre sustituye a...", en: "A pronoun replaces a..." }, options: { es: ["un verbo", "un sustantivo", "un adjetivo"], en: ["verb", "noun", "adjective"] }, correctAnswer: { es: "un sustantivo", en: "noun" } },
            { question: { es: "¿Qué palabra es un pronombre personal?", en: "Which word is a personal pronoun?" }, options: { es: ["ella", "alto", "libro"], en: ["she", "tall", "book"] }, correctAnswer: { es: "ella", en: "she" } },
            { question: { es: "El adjetivo en 'El coche rápido' es...", en: "The adjective in 'The fast car' is..." }, options: { es: ["coche", "rápido", "El"], en: ["car", "fast", "The"] }, correctAnswer: { es: "rápido", en: "fast" } },
            { question: { es: "El género y el número en la oración 'Los niños juegan' concuerdan entre...", en: "Gender and number agree between..." }, options: { es: ["niños y juegan", "Los y niños", "Los, niños y juegan"], en: ["boys and play", "The and boys", "The, boys and play"] }, correctAnswer: { es: "Los, niños y juegan", en: "The, boys and play" } },
            { question: { es: "¿Cuál es la función del predicado?", en: "What is the function of the predicate?" }, options: { es: ["Nombrar un objeto", "Decir de quién se habla", "Decir lo que hace el sujeto"], en: ["To name an object", "To say who is being talked about", "To say what the subject does"] }, correctAnswer: { es: "Decir lo que hace el sujeto", en: "To say what the subject does" } }
        ]
    },
    {
        id: 8, title: "Nivel 8", passingScore: 0.8,
        questions: [
            { question: { es: "El sujeto en la oración 'El perro blanco corrió' es...", en: "The subject in 'The white dog ran' is..." }, options: { es: ["El perro", "El perro blanco", "corrió"], en: ["The dog", "The white dog", "ran"] }, correctAnswer: { es: "El perro blanco", en: "The white dog" } },
            { question: { es: "Un sustantivo colectivo es...", en: "A collective noun is..." }, options: { es: ["Un sustantivo singular", "Un sustantivo que nombra un conjunto", "Un sustantivo propio"], en: ["A singular noun", "A noun that names a group", "A proper noun"] }, correctAnswer: { es: "Un sustantivo que nombra un conjunto", en: "A noun that names a group" } },
            { question: { es: "El sustantivo colectivo de 'pez' es...", en: "The collective noun for 'fish' is..." }, options: { es: ["peces", "cardumen", "acuario"], en: ["fishes", "school", "aquarium"] }, correctAnswer: { es: "cardumen", en: "school" } },
            { question: { es: "La palabra 'felizmente' es un adverbio de...", en: "The word 'happily' is an adverb of..." }, options: { es: ["tiempo", "modo", "cantidad"], en: ["time", "manner", "quantity"] }, correctAnswer: { es: "modo", en: "manner" } },
            { question: { es: "El objeto indirecto en 'Le di un regalo a mi mamá' es...", en: "The indirect object in 'I gave a gift to my mom' is..." }, options: { es: ["Le", "un regalo", "a mi mamá"], en: ["Le", "a gift", "to my mom"] }, correctAnswer: { es: "a mi mamá", en: "to my mom" } }
        ]
    },
    {
        id: 9, title: "Nivel 9", passingScore: 0.8,
        questions: [
            { question: { es: "Una oración compuesta es aquella que tiene...", en: "A compound sentence is one that has..." }, options: { es: ["un solo verbo", "dos o más verbos", "un solo sujeto"], en: ["only one verb", "two or more verbs", "only one subject"] }, correctAnswer: { es: "dos o más verbos", en: "two or more verbs" } },
            { question: { es: "La conjunción 'y' sirve para...", en: "The conjunction 'and' is used to..." }, options: { es: ["Indicar oposición", "Unir palabras o frases", "Indicar una causa"], en: ["Indicate opposition", "Join words or phrases", "Indicate a cause"] }, correctAnswer: { es: "Unir palabras o frases", en: "Join words or phrases" } },
            { question: { es: "El pretérito perfecto simple del verbo 'vivir' para 'yo' es...", en: "The simple past tense of the verb 'vivir' (to live) for 'I' is..." }, options: { es: ["vivo", "viviré", "viví"], en: ["live", "will live", "lived"] }, correctAnswer: { es: "viví", en: "lived" } },
            { question: { es: "El modo indicativo expresa...", en: "The indicative mood expresses..." }, options: { es: ["Una orden", "Un deseo", "Una acción real y objetiva"], en: ["An order", "A wish", "A real and objective action"] }, correctAnswer: { es: "Una acción real y objetiva", en: "A real and objective action" } },
            { question: { es: "La palabra 'teléfono' es...", en: "The word 'teléfono' (telephone) is..." }, options: { es: ["Aguda", "Grave", "Esdrújula"], en: ["Aguda", "Grave", "Esdrújula"] }, correctAnswer: { es: "Esdrújula", en: "Esdrújula" } }
        ]
    },
    {
        id: 10, title: "Nivel 10", passingScore: 0.85,
        questions: [
            { question: { es: "El adjetivo 'bonísimo' es un grado...", en: "The adjective 'bonísimo' (very good) is a degree..." }, options: { es: ["Positivo", "Comparativo", "Superlativo"], en: ["Positive", "Comparative", "Superlative"] }, correctAnswer: { es: "Superlativo", en: "Superlative" } },
            { question: { es: "¿Qué palabra es un prefijo?", en: "Which word is a prefix?" }, options: { es: ["in-", "-mente", "-dad"], en: ["in-", "-ly", "-ness"] }, correctAnswer: { es: "in-", en: "in-" } },
            { question: { es: "El sufijo '-mente' en 'rápidamente' forma...", en: "The suffix '-mente' in 'rápidamente' (quickly) forms..." }, options: { es: ["un sustantivo", "un adjetivo", "un adverbio"], en: ["a noun", "an adjective", "an adverb"] }, correctAnswer: { es: "un adverbio", en: "an adverb" } },
            { question: { es: "¿Qué figura literaria es 'tus ojos son dos luceros'?", en: "What literary figure is 'your eyes are two stars'?" }, options: { es: ["Símil", "Hipérbole", "Metáfora"], en: ["Simile", "Hyperbole", "Metaphor"] }, correctAnswer: { es: "Metáfora", en: "Metaphor" } },
            { question: { es: "La obra más famosa de Salarrué es...", en: "The most famous work of Salarrué is..." }, options: { es: ["Cuentos de Barro", "Poesía", "Tierra de Infancia"], en: ["Tales of Clay", "Poetry", "Land of Childhood"] }, correctAnswer: { es: "Cuentos de Barro", en: "Tales of Clay" } }
        ]
    },
    {
        id: 11, title: "Nivel 11", passingScore: 0.85,
        questions: [
            { question: { es: "¿Qué figura literaria utiliza 'como' o 'parece' para comparar?", en: "Which literary figure uses 'like' or 'as' to compare?" }, options: { es: ["Metáfora", "Símil", "Hipérbole"], en: ["Metaphor", "Simile", "Hyperbole"] }, correctAnswer: { es: "Símil", en: "Simile" } },
            { question: { es: "La palabra 'ortografía' se refiere a...", en: "The word 'ortografía' (spelling) refers to..." }, options: { es: ["La pronunciación", "La forma correcta de escribir", "La estructura de las oraciones"], en: ["Pronunciation", "The correct way of writing", "The structure of sentences"] }, correctAnswer: { es: "La forma correcta de escribir", en: "The correct way of writing" } },
            { question: { es: "El modo subjuntivo expresa...", en: "The subjunctive mood expresses..." }, options: { es: ["Deseo o duda", "Un hecho real", "Una orden"], en: ["A wish or doubt", "A real fact", "An order"] }, correctAnswer: { es: "Deseo o duda", en: "A wish or doubt" } },
            { question: { es: "El complemento circunstancial de tiempo en 'El viernes iré al cine' es...", en: "The adverbial complement of time in 'On Friday I will go to the cinema' is..." }, options: { es: ["iré", "al cine", "El viernes"], en: ["will go", "to the cinema", "On Friday"] }, correctAnswer: { es: "El viernes", en: "On Friday" } },
            { question: { es: "¿Qué palabra tiene un triptongo?", en: "Which word has a triphthong?" }, options: { es: ["cielo", "Uruguay", "poesía"], en: ["sky", "Uruguay", "poetry"] }, correctAnswer: { es: "Uruguay", en: "Uruguay" } }
        ]
    },
    {
        id: 12, title: "Nivel 12", passingScore: 0.85,
        questions: [
            { question: { es: "Una oración unimembre es aquella que...", en: "A single-member sentence is one that..." }, options: { es: ["Tiene un solo sujeto", "Carece de sujeto y predicado", "Tiene un solo predicado"], en: ["Has only one subject", "Lacks a subject and predicate", "Has only one predicate"] }, correctAnswer: { es: "Carece de sujeto y predicado", en: "Lacks a subject and predicate" } },
            { question: { es: "La función del complemento del nombre en 'El libro de la biblioteca' es...", en: "The function of the noun complement in 'The book from the library' is..." }, options: { es: ["modificar al verbo", "modificar al sustantivo 'libro'", "ser el sujeto de la oración"], en: ["to modify the verb", "to modify the noun 'book'", "to be the subject of the sentence"] }, correctAnswer: { es: "modificar al sustantivo 'libro'", en: "to modify the noun 'book'" } },
            { question: { es: "El verbo 'ser' es un verbo...", en: "The verb 'ser' (to be) is a..." }, options: { es: ["Transitivo", "Intransitivo", "Copulativo"], en: ["Transitive verb", "Intransitive verb", "Copulative verb"] }, correctAnswer: { es: "Copulativo", en: "Copulative verb" } },
            { question: { es: "¿Quién fue el poeta salvadoreño que escribió la obra 'El Libro de los pies'?", en: "Which Salvadoran poet wrote the work 'The Book of Feet'?" }, options: { es: ["Salarrué", "Claudia Lars", "Roque Dalton"], en: ["Salarrué", "Claudia Lars", "Roque Dalton"] }, correctAnswer: { es: "Roque Dalton", en: "Roque Dalton" } },
            { question: { es: "La figura literaria que le da cualidades humanas a objetos es...", en: "The literary figure that gives human qualities to objects is..." }, options: { es: ["Metáfora", "Símil", "Personificación"], en: ["Metaphor", "Simile", "Personification"] }, correctAnswer: { es: "Personificación", en: "Personification" } }
        ]
    },
    {
        id: 13, title: "Nivel 13", passingScore: 0.85,
        questions: [
            { question: { es: "La sílaba 'trans' en 'transporte' es...", en: "The syllable 'trans' in 'transport' is..." }, options: { es: ["Prefijo", "Raíz", "Sufijo"], en: ["Prefix", "Root", "Suffix"] }, correctAnswer: { es: "Prefijo", en: "Prefix" } },
            { question: { es: "El pretérito imperfecto del verbo 'ir' para 'nosotros' es...", en: "The imperfect past tense of the verb 'ir' (to go) for 'we' is..." }, options: { es: ["fuimos", "íbamos", "iremos"], en: ["went", "were going", "will go"] }, correctAnswer: { es: "íbamos", en: "were going" } },
            { question: { es: "La palabra 'ortografía' se forma con los lexemas...", en: "The word 'ortografía' (spelling) is formed with the lexemes..." }, options: { es: ["orto y grafía", "orto y grafos", "orthos y graphein"], en: ["orto and grafía", "orto and grafos", "orthos and graphein"] }, correctAnswer: { es: "orthos y graphein", en: "orthos and graphein" } },
            { question: { es: "La obra de Claudia Lars 'Tierra de infancia' es de tipo...", en: "Claudia Lars' work 'Land of Childhood' is of the type..." }, options: { es: ["Novela", "Poesía", "Cuento"], en: ["Novel", "Poetry", "Short story"] }, correctAnswer: { es: "Poesía", en: "Poetry" } },
            { question: { es: "¿Qué figura literaria consiste en una exageración?", en: "What literary figure consists of an exaggeration?" }, options: { es: ["Hipérbole", "Metáfora", "Anáfora"], en: ["Hyperbole", "Metaphor", "Anaphora"] }, correctAnswer: { es: "Hipérbole", en: "Hyperbole" } }
        ]
    },
    {
        id: 14, title: "Nivel 14", passingScore: 0.85,
        questions: [
            { question: { es: "La conjunción 'aunque' es de tipo...", en: "The conjunction 'although' is of the type..." }, options: { es: ["Copulativa", "Adversativa", "Concesiva"], en: ["Copulative", "Adversative", "Concessive"] }, correctAnswer: { es: "Concesiva", en: "Concessive" } },
            { question: { es: "Un texto expositivo tiene la función de...", en: "An expository text has the function of..." }, options: { es: ["Narrar una historia", "Dar una opinión", "Explicar un tema"], en: ["Telling a story", "Giving an opinion", "Explaining a topic"] }, correctAnswer: { es: "Explicar un tema", en: "Explaining a topic" } },
            { question: { es: "El 'análisis sintáctico' se enfoca en...", en: "Syntactic analysis focuses on..." }, options: { es: ["La pronunciación", "El significado de las palabras", "La función de las palabras en la oración"], en: ["Pronunciation", "The meaning of words", "The function of words in the sentence"] }, correctAnswer: { es: "La función de las palabras en la oración", en: "The function of words in the sentence" } },
            { question: { es: "El objeto directo se puede sustituir por los pronombres...", en: "The direct object can be replaced by the pronouns..." }, options: { es: ["me, te, le, se", "lo, la, los, las", "mi, tu, su"], en: ["me, you, him/her, oneself", "it, them", "my, your, his/her"] }, correctAnswer: { es: "lo, la, los, las", en: "it, them" } },
            { question: { es: "¿Cuál es la función del complemento agente en la voz pasiva?", en: "What is the function of the agent complement in the passive voice?" }, options: { es: ["Recibir la acción", "Realizar la acción", "Modificar el verbo"], en: ["To receive the action", "To perform the action", "To modify the verb"] }, correctAnswer: { es: "Realizar la acción", en: "To perform the action" } }
        ]
    },
    {
        id: 15, title: "Nivel 15", passingScore: 0.85,
        questions: [
            { question: { es: "La voz pasiva se forma con el verbo 'ser' y...", en: "The passive voice is formed with the verb 'to be' and..." }, options: { es: ["Un gerundio", "Un participio", "Un infinitivo"], en: ["A gerund", "A participle", "An infinitive"] }, correctAnswer: { es: "Un participio", en: "A participle" } },
            { question: { es: "El complemento circunstancial de modo responde a la pregunta...", en: "The adverbial complement of manner answers the question..." }, options: { es: ["¿Cuándo?", "¿Cómo?", "¿Dónde?"], en: ["When?", "How?", "Where?"] }, correctAnswer: { es: "¿Cómo?", en: "How?" } },
            { question: { es: "Un 'párrafo' es un conjunto de...", en: "A 'paragraph' is a set of..." }, options: { es: ["Letras", "Palabras", "Oraciones"], en: ["Letters", "Words", "Sentences"] }, correctAnswer: { es: "Oraciones", en: "Sentences" } },
            { question: { es: "La palabra 'reloj' es...", en: "The word 'reloj' (clock) is..." }, options: { es: ["Aguda", "Grave", "Esdrújula"], en: ["Aguda", "Grave", "Esdrújula"] }, correctAnswer: { es: "Aguda", en: "Aguda" } },
            { question: { es: "La palabra 'férreo' tiene...", en: "The word 'férreo' (iron) has..." }, options: { es: ["Un hiato", "Un diptongo", "Un triptongo"], en: ["A hiatus", "A diphthong", "A triphthong"] }, correctAnswer: { es: "Un diptongo", en: "A diphthong" } }
        ]
    },
    {
        id: 16, title: "Nivel 16", passingScore: 0.9,
        questions: [
            { question: { es: "Un 'sustantivo abstracto' nombra...", en: "An 'abstract noun' names..." }, options: { es: ["Objetos que se pueden tocar", "Cualidades o ideas", "Personas o lugares"], en: ["Objects that can be touched", "Qualities or ideas", "People or places"] }, correctAnswer: { es: "Cualidades o ideas", en: "Qualities or ideas" } },
            { question: { es: "La palabra 'altísimo' es un ejemplo de...", en: "The word 'altísimo' (very tall) is an example of..." }, options: { es: ["Grado comparativo", "Grado superlativo", "Grado positivo"], en: ["Comparative degree", "Superlative degree", "Positive degree"] }, correctAnswer: { es: "Grado superlativo", en: "Superlative degree" } },
            { question: { es: "La figura literaria 'la fría nieve de tu boca' es...", en: "The literary figure 'the cold snow of your mouth' is..." }, options: { es: ["Metáfora", "Antítesis", "Hipérbole"], en: ["Metaphor", "Antithesis", "Hyperbole"] }, correctAnswer: { es: "Antítesis", en: "Antithesis" } },
            { question: { es: "El objeto indirecto en la oración 'Compré un regalo para mi papá' es...", en: "The indirect object in the sentence 'I bought a gift for my dad' is..." }, options: { es: ["Compré", "un regalo", "para mi papá"], en: ["I bought", "a gift", "for my dad"] }, correctAnswer: { es: "para mi papá", en: "for my dad" } },
            { question: { es: "La palabra 'ortografía' lleva tilde en la 'i' porque es...", en: "The word 'ortografía' has an accent on the 'i' because it is..." }, options: { es: ["aguda", "grave", "esdrújula"], en: ["aguda", "grave", "esdrújula"] }, correctAnswer: { es: "grave", en: "grave" } }
        ]
    },
    {
        id: 17, title: "Nivel 17", passingScore: 0.9,
        questions: [
            { question: { es: "La 'coma' se utiliza para...", en: "The 'comma' is used to..." }, options: { es: ["Terminar una oración", "Hacer una pausa breve en la lectura", "Hacer una pregunta"], en: ["End a sentence", "Make a brief pause in reading", "Ask a question"] }, correctAnswer: { es: "Hacer una pausa breve en la lectura", en: "Make a brief pause in reading" } },
            { question: { es: "La conjunción 'pero' indica...", en: "The conjunction 'but' indicates..." }, options: { es: ["Adición", "Oposición", "Causa"], en: ["Addition", "Opposition", "Cause"] }, correctAnswer: { es: "Oposición", en: "Opposition" } },
            { question: { es: "El verbo 'haber' en el tiempo pretérito pluscuamperfecto es...", en: "The verb 'haber' (to have) in the pluperfect tense is..." }, options: { es: ["he", "había", "hubo"], en: ["I have", "I had", "there was/were"] }, correctAnswer: { es: "había", en: "I had" } },
            { question: { es: "La palabra 'bilingüe' lleva diéresis para indicar que la 'u'...", en: "The word 'bilingüe' (bilingual) has a diaeresis to indicate that the 'u'..." }, options: { es: ["se pronuncia", "no se pronuncia", "es tónica"], en: ["is pronounced", "is not pronounced", "is stressed"] }, correctAnswer: { es: "se pronuncia", en: "is pronounced" } },
            { question: { es: "La función del pronombre 'cuyo' es...", en: "The function of the pronoun 'cuyo' (whose) is..." }, options: { es: ["Indicar cantidad", "Indicar posesión", "Reemplazar a un sustantivo"], en: ["To indicate quantity", "To indicate possession", "To replace a noun"] }, correctAnswer: { es: "Indicar posesión", en: "To indicate possession" } }
        ]
    },
    {
        id: 18, title: "Nivel 18", passingScore: 0.9,
        questions: [
            { question: { es: "La oración 'La mesa de madera' tiene un complemento del nombre que es...", en: "The sentence 'The wooden table' has a noun complement which is..." }, options: { es: ["la mesa", "de madera", "madera"], en: ["the table", "of wood", "wood"] }, correctAnswer: { es: "de madera", en: "of wood" } },
            { question: { es: "Un 'neologismo' es una palabra...", en: "A 'neologism' is a word..." }, options: { es: ["antigua", "nueva", "extranjera"], en: ["old", "new", "foreign"] }, correctAnswer: { es: "nueva", en: "new" } },
            { question: { es: "La palabra 'aeropuerto' está formada por los lexemas...", en: "The word 'aeropuerto' (airport) is formed by the lexemes..." }, options: { es: ["aero y puerto", "aire y puerto", "aer y puerto"], en: ["aero and puerto", "aire and puerto", "aer and puerto"] }, correctAnswer: { es: "aero y puerto", en: "aero and puerto" } },
            { question: { es: "La conjugación verbal de 'cantar' en futuro es...", en: "The future tense conjugation of 'cantar' (to sing) is..." }, options: { es: ["cantaría", "cantará", "cantó"], en: ["would sing", "will sing", "sang"] }, correctAnswer: { es: "cantará", en: "will sing" } },
            { question: { es: "El adjetivo 'nacional' es de tipo...", en: "The adjective 'nacional' (national) is of the type..." }, options: { es: ["Calificativo", "Relacional", "Posesivo"], en: ["Qualifying", "Relational", "Possessive"] }, correctAnswer: { es: "Relacional", en: "Relational" } }
        ]
    },
    {
        id: 19, title: "Nivel 19", passingScore: 0.95,
        questions: [
            { question: { es: "Un 'texto argumentativo' tiene como propósito...", en: "An 'argumentative text' has the purpose of..." }, options: { es: ["Contar una historia", "Explicar un tema", "Defender una opinión"], en: ["Telling a story", "Explaining a topic", "Defending an opinion"] }, correctAnswer: { es: "Defender una opinión", en: "Defending an opinion" } },
            { question: { es: "La palabra 'política' es...", en: "The word 'política' (politics) is..." }, options: { es: ["Aguda", "Grave", "Esdrújula"], en: ["Aguda", "Grave", "Esdrújula"] }, correctAnswer: { es: "Esdrújula", en: "Esdrújula" } },
            { question: { es: "El verso de 11 sílabas se llama...", en: "The 11-syllable verse is called..." }, options: { es: ["Octosílabo", "Eneasílabo", "Endecasílabo"], en: ["Octosyllable", "Enneasyllable", "Hendecasyllable"] }, correctAnswer: { es: "Endecasílabo", en: "Hendecasyllable" } },
            { question: { es: "La figura literaria 'El mar rugía con furia' es...", en: "The literary figure 'The sea roared with fury' is..." }, options: { es: ["Metáfora", "Símil", "Personificación"], en: ["Metaphor", "Simile", "Personification"] }, correctAnswer: { es: "Personificación", en: "Personification" } },
            { question: { es: "¿Cuál es la función del pronombre 'le' en 'Le di la carta'?", en: "What is the function of the pronoun 'le' in 'I gave him/her the letter'?" }, options: { es: ["Sujeto", "Objeto directo", "Objeto indirecto"], en: ["Subject", "Direct object", "Indirect object"] }, correctAnswer: { es: "Objeto indirecto", en: "Indirect object" } }
        ]
    },
    {
        id: 20, title: "Nivel 20", passingScore: 0.95,
        questions: [
            { question: { es: "La palabra 'subrayar' es un verbo formado con el prefijo 'sub-' que significa...", en: "The word 'subrayar' (to underline) is a verb formed with the prefix 'sub-' which means..." }, options: { es: ["sobre", "debajo de", "dentro de"], en: ["over", "under", "inside"] }, correctAnswer: { es: "debajo de", en: "under" } },
            { question: { es: "La concordancia verbal se da entre...", en: "Verbal agreement occurs between..." }, options: { es: ["Sustantivo y adjetivo", "Verbo y sujeto", "Sujeto y adjetivo"], en: ["Noun and adjective", "Verb and subject", "Subject and adjective"] }, correctAnswer: { es: "Verbo y sujeto", en: "Verb and subject" } },
            { question: { es: "La oración 'La mesa de mi abuela está rota' tiene un predicado...", en: "The sentence 'My grandmother's table is broken' has a..." }, options: { es: ["Nominal", "Verbal", "No tiene predicado"], en: ["Nominal predicate", "Verbal predicate", "No predicate"] }, correctAnswer: { es: "Verbal", en: "Verbal predicate" } },
            { question: { es: "Una oración subordinada es aquella que...", en: "A subordinate clause is one that..." }, options: { es: ["Tiene sentido completo por sí misma", "Depende de otra oración para tener sentido", "Es muy larga"], en: ["Makes complete sense on its own", "Depends on another sentence to make sense", "Is very long"] }, correctAnswer: { es: "Depende de otra oración para tener sentido", en: "Depends on another sentence to make sense" } },
            { question: { es: "El gerundio del verbo 'dormir' es...", en: "The gerund of the verb 'dormir' (to sleep) is..." }, options: { es: ["dormido", "durmiendo", "dormiría"], en: ["slept", "sleeping", "would sleep"] }, correctAnswer: { es: "durmiendo", en: "sleeping" } }
        ]
    },
    {
        id: 21, title: "Nivel 21", passingScore: 0.95,
        questions: [
            { question: { es: "El modo imperativo expresa...", en: "The imperative mood expresses..." }, options: { es: ["Deseo", "Una orden", "Un hecho"], en: ["A wish", "An order", "A fact"] }, correctAnswer: { es: "Una orden", en: "An order" } },
            { question: { es: "La conjunción subordinada de causa es...", en: "The subordinate conjunction of cause is..." }, options: { es: ["cuando", "porque", "aunque"], en: ["when", "because", "although"] }, correctAnswer: { es: "porque", en: "because" } },
            { question: { es: "¿Qué tipo de oración es 'No sé qué hacer'?", en: "What type of sentence is 'I don't know what to do'?" }, options: { es: ["Simple", "Compuesta coordinada", "Compuesta subordinada"], en: ["Simple", "Coordinated compound", "Subordinate compound"] }, correctAnswer: { es: "Compuesta subordinada", en: "Subordinate compound" } },
            { question: { es: "La oración 'El libro fue leído por Juan' está en voz...", en: "The sentence 'The book was read by Juan' is in..." }, options: { es: ["Activa", "Pasiva", "Reflexiva"], en: ["Active voice", "Passive voice", "Reflexive voice"] }, correctAnswer: { es: "Pasiva", en: "Passive voice" } },
            { question: { es: "La figura literaria 'El Sol llora cuando la Luna se va' es...", en: "The literary figure 'The Sun cries when the Moon leaves' is..." }, options: { es: ["Metáfora", "Personificación", "Símil"], en: ["Metaphor", "Personification", "Simile"] }, correctAnswer: { es: "Personificación", en: "Personification" } }
        ]
    },
    {
        id: 22, title: "Nivel 22", passingScore: 1.0,
        questions: [
            { question: { es: "Un 'soneto' es un poema de...", en: "A 'sonnet' is a poem of..." }, options: { es: ["10 versos", "14 versos", "20 versos"], en: ["10 lines", "14 lines", "20 lines"] }, correctAnswer: { es: "14 versos", en: "14 lines" } },
            { question: { es: "La palabra 'exánime' es...", en: "The word 'exánime' (lifeless) is..." }, options: { es: ["Aguda", "Grave", "Esdrújula"], en: ["Aguda", "Grave", "Esdrújula"] }, correctAnswer: { es: "Esdrújula", en: "Esdrújula" } },
            { question: { es: "El objeto directo en la oración 'La profesora nos vio' es...", en: "The direct object in the sentence 'The teacher saw us' is..." }, options: { es: ["La profesora", "nos", "vio"], en: ["The teacher", "us", "saw"] }, correctAnswer: { es: "nos", en: "us" } },
            { question: { es: "La anáfora es una figura literaria que consiste en...", en: "Anaphora is a literary figure that consists of..." }, options: { es: ["Repetir una palabra al inicio de los versos", "Exagerar una idea", "Usar palabras con sonido similar"], en: ["Repeating a word at the beginning of verses", "Exaggerating an idea", "Using words with similar sounds"] }, correctAnswer: { es: "Repetir una palabra al inicio de los versos", en: "Repeating a word at the beginning of verses" } },
            { question: { es: "¿Qué autor salvadoreño escribió la novela 'Un tren de cuerda'?", en: "Which Salvadoran author wrote the novel 'A String Train'?" }, options: { es: ["Roque Dalton", "Salarrué", "Manlio Argueta"], en: ["Roque Dalton", "Salarrué", "Manlio Argueta"] }, correctAnswer: { es: "Manlio Argueta", en: "Manlio Argueta" } }
        ]
    },
    {
        id: 23, title: "Nivel 23", passingScore: 1.0,
        questions: [
            { question: { es: "El 'análisis morfológico' se enfoca en...", en: "Morphological analysis focuses on..." }, options: { es: ["La función de la palabra en la oración", "La estructura interna de la palabra", "El significado de la palabra"], en: ["The function of the word in the sentence", "The internal structure of the word", "The meaning of the word"] }, correctAnswer: { es: "La estructura interna de la palabra", en: "The internal structure of the word" } },
            { question: { es: "El complemento predicativo se diferencia del adjetivo en que...", en: "The predicative complement differs from the adjective in that it..." }, options: { es: ["Modifica al verbo y al sustantivo", "Solo modifica al sustantivo", "Modifica a otro adjetivo"], en: ["Modifies the verb and the noun", "Only modifies the noun", "Modifies another adjective"] }, correctAnswer: { es: "Modifica al verbo y al sustantivo", en: "Modifies the verb and the noun" } },
            { question: { es: "El adjetivo 'limpísimo' es un grado...", en: "The adjective 'limpísimo' (very clean) is a degree..." }, options: { es: ["Positivo", "Comparativo", "Superlativo"], en: ["Positive", "Comparative", "Superlative"] }, correctAnswer: { es: "Superlativo", en: "Superlative" } },
            { question: { es: "La perífrasis verbal 'voy a cantar' expresa...", en: "The verbal periphrasis 'I am going to sing' expresses..." }, options: { es: ["Una acción pasada", "Una acción presente", "Una acción futura"], en: ["A past action", "A present action", "A future action"] }, correctAnswer: { es: "Una acción futura", en: "A future action" } },
            { question: { es: "¿Cuál es la función del complemento agente en una oración pasiva?", en: "What is the function of the agent complement in a passive sentence?" }, options: { es: ["Recibir la acción del verbo", "Realizar la acción del verbo", "Complementar al sujeto"], en: ["To receive the action of the verb", "To perform the action of the verb", "To complement the subject"] }, correctAnswer: { es: "Realizar la acción del verbo", en: "To perform the action of the verb" } }
        ]
    },
    {
        id: 24, title: "Nivel 24", passingScore: 1.0,
        questions: [
            { question: { es: "La palabra 'ortografía' se clasifica como una palabra...", en: "The word 'ortografía' (spelling) is classified as a..." }, options: { es: ["Aguda", "Grave", "Esdrújula"], en: ["Aguda", "Grave", "Esdrújula"] }, correctAnswer: { es: "Grave", en: "Grave" } },
            { question: { es: "Un 'pleonasmo' es una figura retórica que consiste en...", en: "A 'pleonasm' is a rhetorical figure that consists of..." }, options: { es: ["Una exageración", "El uso de palabras innecesarias", "Una repetición de sonidos"], en: ["An exaggeration", "The use of unnecessary words", "A repetition of sounds"] }, correctAnswer: { es: "El uso de palabras innecesarias", en: "The use of unnecessary words" } },
            { question: { es: "El pronombre relativo 'cuyo' indica...", en: "The relative pronoun 'cuyo' (whose) indicates..." }, options: { es: ["Cantidad", "Posesión", "Lugar"], en: ["Quantity", "Possession", "Place"] }, correctAnswer: { es: "Posesión", en: "Possession" } },
            { question: { es: "La palabra 'aún' lleva tilde cuando es un adverbio de...", en: "The word 'aún' (still/yet) has an accent when it is an adverb of..." }, options: { es: ["tiempo", "cantidad", "modo"], en: ["time", "quantity", "manner"] }, correctAnswer: { es: "tiempo", en: "time" } },
            { question: { es: "¿Cuál de estas palabras es un verboide?", en: "Which of these words is a verboid?" }, options: { es: ["corrió", "corriendo", "correré"], en: ["ran", "running", "will run"] }, correctAnswer: { es: "corriendo", en: "running" } }
        ]
    },
    {
        id: 25, title: "Nivel 25", passingScore: 1.0,
        questions: [
            { question: { es: "El uso de la 'b' y la 'v' en 'bello' y 'vello' se conoce como...", en: "The use of 'b' and 'v' in 'bello' (beautiful) and 'vello' (hair) is known as..." }, options: { es: ["Sinónimos", "Antónimos", "Parónimos"], en: ["Synonyms", "Antonyms", "Paronyms"] }, correctAnswer: { es: "Parónimos", en: "Paronyms" } },
            { question: { es: "El tiempo verbal 'cantaría' es...", en: "The verb tense 'cantaría' is..." }, options: { es: ["Futuro simple", "Condicional simple", "Futuro compuesto"], en: ["Simple future", "Simple conditional", "Future perfect"] }, correctAnswer: { es: "Condicional simple", en: "Simple conditional" } },
            { question: { es: "El complemento circunstancial de finalidad en 'Estudié para el examen' es...", en: "The adverbial complement of purpose in 'I studied for the exam' is..." }, options: { es: ["Estudié", "para el examen", "yo"], en: ["I studied", "for the exam", "I"] }, correctAnswer: { es: "para el examen", en: "for the exam" } },
            { question: { es: "La figura retórica 'El viento me susurró al oído' es...", en: "The rhetorical figure 'The wind whispered in my ear' is..." }, options: { es: ["Hipérbaton", "Personificación", "Metonimia"], en: ["Hyperbaton", "Personification", "Metonymy"] }, correctAnswer: { es: "Personificación", en: "Personification" } },
            { question: { es: "La estructura 'Sujeto + Predicado' es la de una oración...", en: "The structure 'Subject + Predicate' is that of a..." }, options: { es: ["Simple", "Compuesta", "Subordinada"], en: ["Simple sentence", "Compound sentence", "Subordinate clause"] }, correctAnswer: { es: "Simple", en: "Simple sentence" } }
        ]
    },
    {
        id: 26, title: "Nivel 26", passingScore: 1.0,
        questions: [
            { question: { es: "El sustantivo 'paz' es de tipo...", en: "The noun 'paz' (peace) is of the type..." }, options: { es: ["Concreto", "Abstracto", "Común"], en: ["Concrete", "Abstract", "Common"] }, correctAnswer: { es: "Abstracto", en: "Abstract" } },
            { question: { es: "Un 'texto descriptivo' se enfoca en...", en: "A 'descriptive text' focuses on..." }, options: { es: ["Narrar eventos", "Presentar argumentos", "Detallar características"], en: ["Narrating events", "Presenting arguments", "Detailing characteristics"] }, correctAnswer: { es: "Detallar características", en: "Detailing characteristics" } },
            { question: { es: "La 'conjunción' es una palabra que sirve para...", en: "A 'conjunction' is a word used to..." }, options: { es: ["Nombrar objetos", "Unir palabras u oraciones", "Describir sustantivos"], en: ["Name objects", "Join words or sentences", "Describe nouns"] }, correctAnswer: { es: "Unir palabras u oraciones", en: "Join words or sentences" } },
            { question: { es: "El verbo 'estar' en pretérito perfecto simple para 'tú' es...", en: "The verb 'estar' (to be) in the simple past tense for 'you' (tú) is..." }, options: { es: ["estuve", "estuviste", "estás"], en: ["I was", "you were", "you are"] }, correctAnswer: { es: "estuviste", en: "you were" } },
            { question: { es: "La oración 'Canta y baila' tiene un sujeto...", en: "The sentence 'Sings and dances' has a..." }, options: { es: ["Explícito", "Tácito", "Inexistente"], en: ["Explicit subject", "Tacit subject", "Non-existent subject"] }, correctAnswer: { es: "Tácito", en: "Tacit subject" } }
        ]
    },
    {
        id: 27, title: "Nivel 27", passingScore: 1.0,
        questions: [
            { question: { es: "El 'complemento predicativo' concuerda en género y número con...", en: "The 'predicative complement' agrees in gender and number with..." }, options: { es: ["El verbo", "El objeto directo", "El sujeto y el objeto directo"], en: ["The verb", "The direct object", "The subject and the direct object"] }, correctAnswer: { es: "El sujeto y el objeto directo", en: "The subject and the direct object" } },
            { question: { es: "La figura retórica que altera el orden gramatical de las palabras es...", en: "The rhetorical figure that alters the grammatical order of words is..." }, options: { es: ["Metáfora", "Hipérbaton", "Anáfora"], en: ["Metaphor", "Hyperbaton", "Anaphora"] }, correctAnswer: { es: "Hipérbaton", en: "Hyperbaton" } },
            { question: { es: "La voz pasiva en la oración 'La carta es leída por la niña' tiene como complemento agente...", en: "The passive voice in the sentence 'The letter is read by the girl' has as its agent complement..." }, options: { es: ["La carta", "es leída", "por la niña"], en: ["The letter", "is read", "by the girl"] }, correctAnswer: { es: "por la niña", en: "by the girl" } },
            { question: { es: "El 'subjuntivo' se utiliza para expresar...", en: "The 'subjunctive' is used to express..." }, options: { es: ["Hechos reales", "Órdenes", "Dudas, deseos, o posibilidades"], en: ["Real facts", "Orders", "Doubts, wishes, or possibilities"] }, correctAnswer: { es: "Dudas, deseos, o posibilidades", en: "Doubts, wishes, or possibilities" } },
            { question: { es: "El infinitivo de un verbo termina en...", en: "The infinitive of a verb ends in..." }, options: { es: ["-ando, -iendo", "-ar, -er, -ir", "-ado, -ido"], en: ["-ing", "-ar, -er, -ir", "-ed, -ido"] }, correctAnswer: { es: "-ar, -er, -ir", en: "-ar, -er, -ir" } }
        ]
    },
    {
        id: 28, title: "Nivel 28", passingScore: 1.0,
        questions: [
            { question: { es: "Una 'oración subordinada adverbial' funciona como...", en: "An 'adverbial subordinate clause' functions as..." }, options: { es: ["Un sustantivo", "Un adjetivo", "Un adverbio"], en: ["A noun", "An adjective", "An adverb"] }, correctAnswer: { es: "Un adverbio", en: "An adverb" } },
            { question: { es: "La 'sintaxis' se encarga de...", en: "Syntax is in charge of..." }, options: { es: ["La correcta escritura", "El estudio de la oración", "El significado de las palabras"], en: ["Correct writing", "The study of the sentence", "The meaning of words"] }, correctAnswer: { es: "El estudio de la oración", en: "The study of the sentence" } },
            { question: { es: "El 'punto y coma' se usa para...", en: "The 'semicolon' is used to..." }, options: { es: ["Separar elementos de una enumeración", "Indicar una pausa larga", "Unir oraciones relacionadas pero independientes"], en: ["Separate elements of an enumeration", "Indicate a long pause", "Join related but independent sentences"] }, correctAnswer: { es: "Unir oraciones relacionadas pero independientes", en: "Join related but independent sentences" } },
            { question: { es: "¿Qué palabra es un 'sustantivo común'?", en: "Which word is a 'common noun'?" }, options: { es: ["San Salvador", "perro", "Juan"], en: ["San Salvador", "dog", "Juan"] }, correctAnswer: { es: "perro", en: "dog" } },
            { question: { es: "El verbo 'ir' en modo imperativo para 'tú' es...", en: "The verb 'ir' (to go) in the imperative mood for 'you' (tú) is..." }, options: { es: ["vas", "ve", "vayas"], en: ["you go", "go", "you may go"] }, correctAnswer: { es: "ve", en: "go" } }
        ]
    },
    {
        id: 29, title: "Nivel 29", passingScore: 1.0,
        questions: [
            { question: { es: "El adjetivo 'verde' es de tipo...", en: "The adjective 'verde' (green) is of the type..." }, options: { es: ["Calificativo", "Relacional", "Posesivo"], en: ["Qualifying", "Relational", "Possessive"] }, correctAnswer: { es: "Calificativo", en: "Qualifying" } },
            { question: { es: "La 'conjunción adversativa' más común es...", en: "The most common 'adversative conjunction' is..." }, options: { es: ["y", "o", "pero"], en: ["and", "or", "but"] }, correctAnswer: { es: "pero", en: "but" } },
            { question: { es: "El 'sujeto elíptico' es el que...", en: "The 'elliptical subject' is the one that..." }, options: { es: ["Está explícito en la oración", "No está en la oración pero se sobreentiende", "No existe"], en: ["Is explicit in the sentence", "Is not in the sentence but is understood", "Does not exist"] }, correctAnswer: { es: "No está en la oración pero se sobreentiende", en: "Is not in the sentence but is understood" } },
            { question: { es: "¿Cuál es la función del 'complemento de régimen'?", en: "What is the function of the 'prepositional complement'?" }, options: { es: ["Modificar al sustantivo", "Completar el significado del verbo con una preposición", "Indicar un lugar"], en: ["To modify the noun", "To complete the meaning of the verb with a preposition", "To indicate a place"] }, correctAnswer: { es: "Completar el significado del verbo con una preposición", en: "To complete the meaning of the verb with a preposition" } },
            { question: { es: "La oración 'Cuentan que va a llover' tiene un sujeto...", en: "The sentence 'They say it is going to rain' has a..." }, options: { es: ["Explícito", "Tácito", "Impersonal"], en: ["Explicit subject", "Tacit subject", "Impersonal subject"] }, correctAnswer: { es: "Impersonal", en: "Impersonal subject" } }
        ]
    },
    {
        id: 30, title: "Nivel 30", passingScore: 1.0,
        questions: [
            { question: { es: "La 'polisemia' es el fenómeno en el que una palabra tiene...", en: "Polysemy is the phenomenon in which a word has..." }, options: { es: ["Un solo significado", "Dos significados opuestos", "Varios significados"], en: ["A single meaning", "Two opposite meanings", "Several meanings"] }, correctAnswer: { es: "Varios significados", en: "Several meanings" } },
            { question: { es: "El verbo 'cocinar' en pretérito perfecto simple para 'nosotros' es...", en: "The verb 'cocinar' (to cook) in the simple past tense for 'we' is..." }, options: { es: ["cocinábamos", "cocinamos", "cocinaríamos"], en: ["we were cooking", "we cooked", "we would cook"] }, correctAnswer: { es: "cocinamos", en: "we cooked" } },
            { question: { es: "La 'metáfora' es una figura literaria que consiste en...", en: "A 'metaphor' is a literary figure that consists of..." }, options: { es: ["Exagerar una idea", "Comparar un término real con uno imaginario", "Atribuir cualidades humanas a objetos"], en: ["Exaggerating an idea", "Comparing a real term with an imaginary one", "Attributing human qualities to objects"] }, correctAnswer: { es: "Comparar un término real con uno imaginario", en: "Comparing a real term with an imaginary one" } },
            { question: { es: "El sustantivo 'felicidad' es de tipo...", en: "The noun 'felicidad' (happiness) is of the type..." }, options: { es: ["Concreto", "Abstracto", "Contable"], en: ["Concrete", "Abstract", "Countable"] }, correctAnswer: { es: "Abstracto", en: "Abstract" } },
            { question: { es: "La oración 'El niño juega en el parque' tiene un complemento circunstancial de...", en: "The sentence 'The boy plays in the park' has an adverbial complement of..." }, options: { es: ["Tiempo", "Lugar", "Modo"], en: ["Time", "Place", "Manner"] }, correctAnswer: { es: "Lugar", en: "Place" } }
        ]
    }
];
