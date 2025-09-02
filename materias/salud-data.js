export const leveles = [
    {
                id: 1,
                title: "Nivel 1",
                passingScore: 0.6,
                questions: [
                    { "question": "¿Cuántas veces al día se recomienda cepillarse los dientes?", "options": ["Una vez", "Dos veces", "Tres veces"], "correctAnswer": "Tres veces" },
                    { "question": "La comida más importante del día es el...", "options": ["almuerzo", "desayuno", "cena"], "correctAnswer": "desayuno" },
                    { "question": "¿Cuál es la bebida más saludable?", "options": ["El agua", "El refresco", "El jugo"], "correctAnswer": "El agua" },
                    { "question": "Hacer ejercicio ayuda a mantener...", "options": ["un peso saludable", "el cansancio", "el estrés"], "correctAnswer": "un peso saludable" },
                    { "question": "Para evitar los resfriados es importante lavarse las...", "options": ["manos", "piernas", "cara"], "correctAnswer": "manos" }
                ]
            },
            {
                id: 2,
                title: "Nivel 2",
                passingScore: 0.65,
                questions: [
                    { "question": "¿Qué vitamina se obtiene principalmente del sol?", "options": ["Vitamina C", "Vitamina A", "Vitamina D"], "correctAnswer": "Vitamina D" },
                    { "question": "El corazón es un...", "options": ["músculo", "hueso", "órgano"], "correctAnswer": "órgano" },
                    { "question": "Para una buena digestión, es importante comer...", "options": ["rápido", "lento", "con prisa"], "correctAnswer": "lento" },
                    { "question": "Una 'dieta equilibrada' significa comer...", "options": ["solo dulces", "muchas frutas y verduras, granos enteros y proteínas", "solo carnes"], "correctAnswer": "muchas frutas y verduras, granos enteros y proteínas" },
                    { "question": "El descanso adecuado para los niños es de...", "options": ["2-4 horas", "5-7 horas", "8-10 horas"], "correctAnswer": "8-10 horas" }
                ]
            },
            {
                id: 3,
                title: "Nivel 3",
                passingScore: 0.7,
                questions: [
                    { "question": "El órgano más grande del cuerpo es la...", "options": ["piel", "estómago", "hígado"], "correctAnswer": "piel" },
                    { "question": "Los 'carbohidratos' nos dan...", "options": ["energía", "vitaminas", "hierro"], "correctAnswer": "energía" },
                    { "question": "Las 'proteínas' son importantes para...", "options": ["los huesos", "el crecimiento y reparación de los tejidos", "la vista"], "correctAnswer": "el crecimiento y reparación de los tejidos" },
                    { "question": "Un 'hábito' saludable es...", "options": ["ver televisión todo el día", "hacer ejercicio", "comer comida chatarra"], "correctAnswer": "hacer ejercicio" },
                    { "question": "La 'fiebre' es una señal de que el cuerpo está...", "options": ["sano", "luchando contra una infección", "relajado"], "correctAnswer": "luchando contra una infección" }
                ]
            },
            {
                id: 4,
                title: "Nivel 4",
                passingScore: 0.7,
                questions: [
                    { "question": "Los 'huesos' del cuerpo forman el...", "options": ["aparato digestivo", "sistema respiratorio", "esqueleto"], "correctAnswer": "esqueleto" },
                    { "question": "Los 'músculos' ayudan a nuestro cuerpo a...", "options": ["pensar", "moverse", "respirar"], "correctAnswer": "moverse" },
                    { "question": "Las 'vitaminas y minerales' se encuentran principalmente en...", "options": ["los dulces", "los refrescos", "las frutas y verduras"], "correctAnswer": "las frutas y verduras" },
                    { "question": "El 'cerebro' es el centro de...", "options": ["la circulación", "la respiración", "el sistema nervioso"], "correctAnswer": "el sistema nervioso" },
                    { "question": "Para una buena postura, es importante sentarse...", "options": ["encorvado", "derecho", "con los pies en la mesa"], "correctAnswer": "derecho" }
                ]
            },
            {
                id: 5,
                title: "Nivel 5",
                passingScore: 0.75,
                questions: [
                    { "question": "El 'sistema circulatorio' se encarga de transportar...", "options": ["alimentos", "sangre", "oxígeno"], "correctAnswer": "sangre" },
                    { "question": "El 'pulmón' es parte del sistema...", "options": ["digestivo", "respiratorio", "nervioso"], "correctAnswer": "respiratorio" },
                    { "question": "El 'sistema digestivo' transforma los alimentos en...", "options": ["energía", "agua", "desechos"], "correctAnswer": "energía" },
                    { "question": "La 'higiene personal' es importante para prevenir...", "options": ["la felicidad", "enfermedades", "el sueño"], "correctAnswer": "enfermedades" },
                    { "question": "La 'pirámide alimenticia' es una guía para comer de forma...", "options": ["desordenada", "excesiva", "saludable"], "correctAnswer": "saludable" }
                ]
            },
            // Dificultad Media (Niveles 6-12)
            {
                id: 6,
                title: "Nivel 6",
                passingScore: 0.75,
                questions: [
                    { "question": "Las 'calorías' son una medida de...", "options": ["la energía de los alimentos", "el peso de una persona", "el sabor de la comida"], "correctAnswer": "la energía de los alimentos" },
                    { "question": "El 'colesterol' es una sustancia grasa que se encuentra en la sangre y su exceso puede causar problemas...", "options": ["de vista", "del corazón", "de huesos"], "correctAnswer": "del corazón" },
                    { "question": "La 'presión arterial' es la fuerza con la que la sangre empuja las paredes de las...", "options": ["venas", "arterias", "células"], "correctAnswer": "arterias" },
                    { "question": "El 'estrés' puede tener efectos negativos en la salud...", "options": ["física y mental", "solo física", "solo mental"], "correctAnswer": "física y mental" },
                    { "question": "Para prevenir las caries, es importante evitar el consumo excesivo de...", "options": ["frutas", "verduras", "azúcar"], "correctAnswer": "azúcar" }
                ]
            },
            {
                id: 7,
                title: "Nivel 7",
                passingScore: 0.8,
                questions: [
                    { "question": "La 'anemia' es una enfermedad causada por la falta de...", "options": ["calcio", "hierro", "magnesio"], "correctAnswer": "hierro" },
                    { "question": "La 'obesidad' es una enfermedad caracterizada por el exceso de...", "options": ["peso", "salud", "ejercicio"], "correctAnswer": "peso" },
                    { "question": "El 'ejercicio aeróbico' es el que se realiza con una intensidad baja o moderada durante un largo periodo, como...", "options": ["correr", "levantar pesas", "hacer abdominales"], "correctAnswer": "correr" },
                    { "question": "El 'ejercicio anaeróbico' es el que se realiza con una alta intensidad y corta duración, como...", "options": ["correr", "nadar", "levantar pesas"], "correctAnswer": "levantar pesas" },
                    { "question": "La 'dieta mediterránea' se basa en el consumo de...", "options": ["carnes rojas y grasas", "frutas, verduras, legumbres, pescado y aceite de oliva", "lácteos y pan"], "correctAnswer": "frutas, verduras, legumbres, pescado y aceite de oliva" }
                ]
            },
            {
                id: 8,
                title: "Nivel 8",
                passingScore: 0.8,
                questions: [
                    { "question": "La 'vacuna' es una preparación biológica que proporciona...", "options": ["inmunidad adquirida contra una enfermedad", "alimentos", "descanso"], "correctAnswer": "inmunidad adquirida contra una enfermedad" },
                    { "question": "El 'sistema inmunológico' protege al cuerpo contra...", "options": ["el hambre", "el cansancio", "las enfermedades"], "correctAnswer": "las enfermedades" },
                    { "question": "Una 'fractura' es la rotura de un...", "options": ["músculo", "hueso", "tendón"], "correctAnswer": "hueso" },
                    { "question": "La 'diabetes' es una enfermedad en la que el cuerpo no produce o no usa adecuadamente la...", "options": ["vitamina", "insulina", "proteína"], "correctAnswer": "insulina" },
                    { "question": "El 'primeros auxilios' son las atenciones inmediatas que se dan a una persona...", "options": ["sana", "enferma o lesionada", "dormida"], "correctAnswer": "enferma o lesionada" }
                ]
            },
            {
                id: 9,
                title: "Nivel 9",
                passingScore: 0.8,
                questions: [
                    { "question": "La 'hidratación' es importante para el correcto funcionamiento de...", "options": ["los huesos", "el cuerpo", "el cerebro"], "correctAnswer": "el cuerpo" },
                    { "question": "La 'osteoporosis' es una enfermedad que debilita los...", "options": ["músculos", "huesos", "tendones"], "correctAnswer": "huesos" },
                    { "question": "El 'autocuidado' es la práctica de cuidarse a uno mismo para mantener la salud...", "options": ["física y mental", "solo física", "solo mental"], "correctAnswer": "física y mental" },
                    { "question": "La 'respiración boca a boca' es una técnica de reanimación...", "options": ["cardiopulmonar", "cerebral", "muscular"], "correctAnswer": "cardiopulmonar" },
                    { "question": "La 'inflamación' es una respuesta del cuerpo a una...", "options": ["infección o lesión", "comida", "temperatura"], "correctAnswer": "infección o lesión" }
                ]
            },
            {
                id: 10,
                title: "Nivel 10",
                passingScore: 0.85,
                questions: [
                    { "question": "La 'hipertensión' es la presión arterial...", "options": ["baja", "normal", "alta"], "correctAnswer": "alta" },
                    { "question": "El 'sistema nervioso central' está formado por el cerebro y...", "options": ["la médula espinal", "los nervios", "los músculos"], "correctAnswer": "la médula espinal" },
                    { "question": "Una 'quemadura' se clasifica según su...", "options": ["tamaño", "profundidad", "color"], "correctAnswer": "profundidad" },
                    { "question": "La 'gripe' es una enfermedad causada por un...", "options": ["virus", "bacteria", "hongo"], "correctAnswer": "virus" },
                    { "question": "El 'sistema endocrino' se encarga de la producción de...", "options": ["hormonas", "glóbulos rojos", "saliva"], "correctAnswer": "hormonas" }
                ]
            },
            // Dificultad Avanzada (Niveles 11-20)
            {
                id: 11,
                title: "Nivel 11",
                passingScore: 0.85,
                questions: [
                    { "question": "La 'insulina' es una hormona que regula el nivel de...", "options": ["glucosa en la sangre", "colesterol", "sodio"], "correctAnswer": "glucosa en la sangre" },
                    { "question": "El 'sida' es una enfermedad causada por el virus de la...", "options": ["gripe", "hepatitis", "inmunodeficiencia humana (VIH)"], "correctAnswer": "inmunodeficiencia humana (VIH)" },
                    { "question": "El 'sistema linfático' es parte del sistema...", "options": ["circulatorio", "inmunológico", "nervioso"], "correctAnswer": "inmunológico" },
                    { "question": "La 'alergia' es una respuesta exagerada del sistema inmunológico a una...", "options": ["sustancia extraña", "bacteria", "emoción"], "correctAnswer": "sustancia extraña" },
                    { "question": "El 'botulismo' es una intoxicación alimentaria causada por una...", "options": ["bacteria", "virus", "hongo"], "correctAnswer": "bacteria" }
                ]
            },
            {
                id: 12,
                title: "Nivel 12",
                passingScore: 0.85,
                questions: [
                    { "question": "La 'cirrosis' es una enfermedad crónica y progresiva del...", "options": ["corazón", "hígado", "pulmón"], "correctAnswer": "hígado" },
                    { "question": "La 'nefritis' es una inflamación del...", "options": ["riñón", "hígado", "estómago"], "correctAnswer": "riñón" },
                    { "question": "El 'hipertiroidismo' es una afección en la que la glándula tiroides produce demasiada...", "options": ["insulina", "hormona tiroidea", "glucosa"], "correctAnswer": "hormona tiroidea" },
                    { "question": "Una 'embolia' es la obstrucción de un vaso sanguíneo por un...", "options": ["coágulo", "hueso", "músculo"], "correctAnswer": "coágulo" },
                    { "question": "La 'meningitis' es la inflamación de las membranas que rodean el cerebro y la...", "options": ["médula espinal", "columna vertebral", "estómago"], "correctAnswer": "médula espinal" }
                ]
            },
            {
                id: 13,
                title: "Nivel 13",
                passingScore: 0.85,
                questions: [
                    { "question": "La 'artritis' es la inflamación de las...", "options": ["articulaciones", "venas", "arterias"], "correctAnswer": "articulaciones" },
                    { "question": "La 'tuberculosis' es una enfermedad infecciosa causada por una...", "options": ["bacteria", "virus", "hongo"], "correctAnswer": "bacteria" },
                    { "question": "El 'infarto de miocardio' se produce por la obstrucción de una...", "options": ["arteria coronaria", "vena pulmonar", "arteria cerebral"], "correctAnswer": "arteria coronaria" },
                    { "question": "La 'hepatitis' es una enfermedad inflamatoria del...", "options": ["corazón", "hígado", "riñón"], "correctAnswer": "hígado" },
                    { "question": "La 'esclerosis múltiple' es una enfermedad crónica que afecta al...", "options": ["sistema nervioso central", "sistema digestivo", "sistema respiratorio"], "correctAnswer": "sistema nervioso central" }
                ]
            },
            {
                id: 14,
                title: "Nivel 14",
                passingScore: 0.85,
                questions: [
                    { "question": "La 'síndrome de Down' es una condición genética causada por la presencia de una copia extra del cromosoma...", "options": ["21", "18", "13"], "correctAnswer": "21" },
                    { "question": "El 'cáncer' es una enfermedad caracterizada por el crecimiento descontrolado de...", "options": ["células anormales", "huesos", "músculos"], "correctAnswer": "células anormales" },
                    { "question": "El 'ictus' o 'accidente cerebrovascular' se produce por la interrupción del flujo sanguíneo al...", "options": ["corazón", "cerebro", "pulmón"], "correctAnswer": "cerebro" },
                    { "question": "La 'gastroenteritis' es la inflamación del estómago y...", "options": ["el intestino", "el hígado", "el riñón"], "correctAnswer": "el intestino" },
                    { "question": "La 'hipercolesterolemia' es la presencia de niveles elevados de colesterol en la...", "options": ["orina", "sangre", "saliva"], "correctAnswer": "sangre" }
                ]
            },
            {
                id: 15,
                title: "Nivel 15",
                passingScore: 0.85,
                questions: [
                    { "question": "La 'insuficiencia renal' es una enfermedad en la que los riñones pierden la capacidad de...", "options": ["filtrar la sangre", "producir hormonas", "digerir alimentos"], "correctAnswer": "filtrar la sangre" },
                    { "question": "La 'esquizofrenia' es un trastorno mental que se caracteriza por una alteración del...", "options": ["pensamiento, la percepción y las emociones", "corazón", "hígado"], "correctAnswer": "pensamiento, la percepción y las emociones" },
                    { "question": "La 'catarata' es una enfermedad del ojo que se caracteriza por la opacidad del...", "options": ["cristalino", "nervio óptico", "retina"], "correctAnswer": "cristalino" },
                    { "question": "La 'síndrome del túnel carpiano' es una afección que se produce por la compresión de un nervio en la...", "options": ["rodilla", "muñeca", "espalda"], "correctAnswer": "muñeca" },
                    { "question": "La 'endometriosis' es una enfermedad en la que el tejido que normalmente recubre el útero crece...", "options": ["dentro del útero", "fuera del útero", "en el corazón"], "correctAnswer": "fuera del útero" }
                ]
            },
            {
                id: 16,
                title: "Nivel 16",
                passingScore: 0.9,
                questions: [
                    { "question": "El 'SIDA' es el 'Síndrome de Inmunodeficiencia Adquirida'. ¿Qué significa 'Inmunodeficiencia'?", "options": ["El sistema inmunitario está débil", "El sistema inmunitario está fuerte", "No hay sistema inmunitario"], "correctAnswer": "El sistema inmunitario está débil" },
                    { "question": "La 'epilepsia' es un trastorno cerebral caracterizado por...", "options": ["dolor de cabeza", "convulsiones", "fiebre"], "correctAnswer": "convulsiones" },
                    { "question": "La 'anorexia nerviosa' es un trastorno alimentario caracterizado por un miedo intenso a...", "options": ["comer", "engordar", "adelgazar"], "correctAnswer": "engordar" },
                    { "question": "La 'bulimia nerviosa' es un trastorno alimentario que se caracteriza por episodios recurrentes de...", "options": ["comer en exceso", "vomitar", "ayunar"], "correctAnswer": "comer en exceso" },
                    { "question": "La 'encefalitis' es la inflamación del...", "options": ["cerebro", "hígado", "riñón"], "correctAnswer": "cerebro" }
                ]
            },
            {
                id: 17,
                title: "Nivel 17",
                passingScore: 0.9,
                questions: [
                    { "question": "La 'leucemia' es un tipo de cáncer de...", "options": ["la piel", "la sangre", "el cerebro"], "correctAnswer": "la sangre" },
                    { "question": "El 'asma' es una enfermedad de los...", "options": ["pulmones", "riñones", "músculos"], "correctAnswer": "pulmones" },
                    { "question": "La 'artrosis' es una enfermedad degenerativa de las...", "options": ["articulaciones", "venas", "arterias"], "correctAnswer": "articulaciones" },
                    { "question": "La 'gastritis' es la inflamación del...", "options": ["estómago", "intestino", "hígado"], "correctAnswer": "estómago" },
                    { "question": "El 'sistema endocrino' se encarga de regular funciones como el metabolismo, el crecimiento y...", "options": ["el hambre", "la reproducción", "el sueño"], "correctAnswer": "la reproducción" }
                ]
            },
            {
                id: 18,
                title: "Nivel 18",
                passingScore: 0.9,
                questions: [
                    { "question": "La 'neumonía' es una infección de los...", "options": ["pulmones", "riñones", "músculos"], "correctAnswer": "pulmones" },
                    { "question": "El 'lupus' es una enfermedad autoinmune que ataca a los...", "options": ["huesos", "órganos y tejidos sanos", "músculos"], "correctAnswer": "órganos y tejidos sanos" },
                    { "question": "El 'Alzheimer' es una enfermedad degenerativa que afecta al...", "options": ["cerebro", "corazón", "hígado"], "correctAnswer": "cerebro" },
                    { "question": "La 'esclerosis lateral amiotrófica' (ELA) es una enfermedad degenerativa de las...", "options": ["neuronas", "venas", "arterias"], "correctAnswer": "neuronas" },
                    { "question": "La 'hipertensión' es la principal causa de...", "options": ["enfermedades del corazón, infarto e ictus", "alergias", "resfriados"], "correctAnswer": "enfermedades del corazón, infarto e ictus" }
                ]
            },
            {
                id: 19,
                title: "Nivel 19",
                passingScore: 0.95,
                questions: [
                    { "question": "El 'virus del papiloma humano' (VPH) es la causa principal de la mayoría de los casos de cáncer de...", "options": ["pulmón", "cuello uterino", "estómago"], "correctAnswer": "cuello uterino" },
                    { "question": "La 'psicosis' es un trastorno mental que se caracteriza por una pérdida del contacto con la...", "options": ["familia", "realidad", "vida"], "correctAnswer": "realidad" },
                    { "question": "El 'déficit de atención e hiperactividad' (TDAH) es un trastorno mental que se caracteriza por la dificultad para...", "options": ["prestar atención y controlar los impulsos", "dormir", "comer"], "correctAnswer": "prestar atención y controlar los impulsos" },
                    { "question": "El 'trastorno bipolar' es un trastorno mental que se caracteriza por cambios extremos en el...", "options": ["humor", "peso", "color de la piel"], "correctAnswer": "humor" },
                    { "question": "La 'esquizofrenia' se caracteriza por...", "options": ["alucinaciones, delirios y pensamiento desorganizado", "fiebre", "dolor de cabeza"], "correctAnswer": "alucinaciones, delirios y pensamiento desorganizado" }
                ]
            },
            {
                id: 20,
                title: "Nivel 20",
                passingScore: 0.95,
                questions: [
                    { "question": "El 'trastorno obsesivo-compulsivo' (TOC) es un trastorno mental que se caracteriza por...", "options": ["pensamientos intrusivos y comportamientos repetitivos", "tristeza", "miedo"], "correctAnswer": "pensamientos intrusivos y comportamientos repetitivos" },
                    { "question": "El 'síndrome de Asperger' es un trastorno del espectro autista que se caracteriza por dificultades en la...", "options": ["comunicación social y comportamientos repetitivos", "alimentación", "respiración"], "correctAnswer": "comunicación social y comportamientos repetitivos" },
                    { "question": "La 'epilepsia' es un trastorno cerebral que se caracteriza por una actividad eléctrica anormal en el cerebro, que causa...", "options": ["dolor de cabeza", "convulsiones y pérdida de conciencia", "náuseas"], "correctAnswer": "convulsiones y pérdida de conciencia" },
                    { "question": "El 'alzhéimer' es una enfermedad degenerativa del cerebro que causa problemas de...", "options": ["memoria, pensamiento y comportamiento", "respiración", "corazón"], "correctAnswer": "memoria, pensamiento y comportamiento" },
                    { "question": "La 'diabetes' es una enfermedad metabólica caracterizada por una elevada concentración de glucosa en la sangre, que causa...", "options": ["fatiga, sed y orina frecuente", "dolor de cabeza", "fiebre"], "correctAnswer": "fatiga, sed y orina frecuente" }
                ]
            },
            // Dificultad Experta (Niveles 21-30)
            {
                id: 21,
                title: "Nivel 21",
                passingScore: 0.95,
                questions: [
                    { "question": "La 'arteriosclerosis' es el endurecimiento y engrosamiento de las paredes de las...", "options": ["venas", "arterias", "células"], "correctAnswer": "arterias" },
                    { "question": "La 'arritmia' es una alteración del ritmo del...", "options": ["pulso", "corazón", "respiración"], "correctAnswer": "corazón" },
                    { "question": "El 'edema' es la acumulación de líquido en los tejidos del...", "options": ["cuerpo", "corazón", "hígado"], "correctAnswer": "cuerpo" },
                    { "question": "La 'síndrome de Tourette' es un trastorno neurológico que se caracteriza por...", "options": ["tics involuntarios", "dolor de cabeza", "fiebre"], "correctAnswer": "tics involuntarios" },
                    { "question": "La 'fibromialgia' es una enfermedad crónica caracterizada por un dolor musculoesquelético generalizado y...", "options": ["fatiga", "fiebre", "inflamación"], "correctAnswer": "fatiga" }
                ]
            },
            {
                id: 22,
                title: "Nivel 22",
                passingScore: 1.0,
                questions: [
                    { "question": "La 'enfermedad de Crohn' es una enfermedad inflamatoria del...", "options": ["hígado", "intestino", "riñón"], "correctAnswer": "intestino" },
                    { "question": "La 'artritis reumatoide' es una enfermedad autoinmune que ataca a las...", "options": ["articulaciones", "venas", "arterias"], "correctAnswer": "articulaciones" },
                    { "question": "La 'enfermedad celíaca' es una enfermedad autoinmune que se caracteriza por una intolerancia al...", "options": ["gluten", "lactosa", "fructosa"], "correctAnswer": "gluten" },
                    { "question": "La 'síndrome de fatiga crónica' (SFC) es una enfermedad que se caracteriza por una fatiga persistente y...", "options": ["fiebre", "sin explicación", "dolor de cabeza"], "correctAnswer": "sin explicación" },
                    { "question": "La 'poliomielitis' es una enfermedad infecciosa causada por un virus que ataca al...", "options": ["sistema nervioso", "sistema digestivo", "sistema respiratorio"], "correctAnswer": "sistema nervioso" }
                ]
            },
            {
                id: 23,
                title: "Nivel 23",
                passingScore: 1.0,
                questions: [
                    { "question": "La 'enfermedad de Parkinson' es un trastorno neurodegenerativo que afecta a las neuronas que producen...", "options": ["serotonina", "dopamina", "adrenalina"], "correctAnswer": "dopamina" },
                    { "question": "La 'esclerosis múltiple' es una enfermedad que afecta a la mielina, la capa protectora que rodea las...", "options": ["venas", "arterias", "fibras nerviosas"], "correctAnswer": "fibras nerviosas" },
                    { "question": "La 'trombosis venosa profunda' (TVP) es la formación de un coágulo de sangre en una...", "options": ["vena profunda", "arteria superficial", "vena superficial"], "correctAnswer": "vena profunda" },
                    { "question": "La 'colitis ulcerosa' es una enfermedad inflamatoria del intestino grueso, que causa...", "options": ["diarrea, dolor abdominal y sangrado rectal", "fiebre", "dolor de cabeza"], "correctAnswer": "diarrea, dolor abdominal y sangrado rectal" },
                    { "question": "La 'gastroenteritis' viral es una infección del estómago y los intestinos causada por un...", "options": ["virus", "bacteria", "hongo"], "correctAnswer": "virus" }
                ]
            },
            {
                id: 24,
                title: "Nivel 24",
                passingScore: 1.0,
                questions: [
                    { "question": "La 'enfermedad de Lyme' es una enfermedad bacteriana que se transmite a los humanos a través de la picadura de...", "options": ["mosquitos", "garrapatas", "arañas"], "correctAnswer": "garrapatas" },
                    { "question": "La 'migraña' es un tipo de dolor de cabeza que puede ser causado por una combinación de factores...", "options": ["genéticos y ambientales", "alimenticios y psicológicos", "ambientales y de estrés"], "correctAnswer": "genéticos y ambientales" },
                    { "question": "El 'asma' es una enfermedad inflamatoria crónica de las vías respiratorias que causa...", "options": ["dificultad para respirar, sibilancias y tos", "dolor de cabeza", "fiebre"], "correctAnswer": "dificultad para respirar, sibilancias y tos" },
                    { "question": "La 'candidiasis' es una infección por hongos causada por el crecimiento excesivo de la levadura...", "options": ["cándida", "aspergillus", "cryptococcus"], "correctAnswer": "cándida" },
                    { "question": "La 'salmonelosis' es una infección bacteriana del intestino causada por la bacteria...", "options": ["salmonella", "e. coli", "shigella"], "correctAnswer": "salmonella" }
                ]
            },
            {
                id: 25,
                title: "Nivel 25",
                passingScore: 1.0,
                questions: [
                    { "question": "La 'enfermedad de Graves' es una enfermedad autoinmune que causa...", "options": ["hipertiroidismo", "hipotiroidismo", "diabetes"], "correctAnswer": "hipertiroidismo" },
                    { "question": "La 'síndrome del intestino irritable' (SII) es un trastorno funcional del intestino que causa...", "options": ["dolor abdominal, hinchazón y cambios en los hábitos intestinales", "fiebre", "dolor de cabeza"], "correctAnswer": "dolor abdominal, hinchazón y cambios en los hábitos intestinales" },
                    { "question": "La 'fibrosis quística' es una enfermedad genética que afecta a las glándulas que producen...", "options": ["hormonas", "sudor, moco y enzimas digestivas", "saliva"], "correctAnswer": "sudor, moco y enzimas digestivas" },
                    { "question": "La 'demencia' es una enfermedad neurodegenerativa que causa un deterioro progresivo de las funciones...", "options": ["motoras", "cognitivas", "visuales"], "correctAnswer": "cognitivas" },
                    { "question": "La 'enfermedad de Addison' es un trastorno endocrino en el que las glándulas suprarrenales no producen suficientes...", "options": ["hormonas", "vitaminas", "minerales"], "correctAnswer": "hormonas" }
                ]
            },
            {
                id: 26,
                title: "Nivel 26",
                passingScore: 1.0,
                questions: [
                    { "question": "La 'endocarditis' es una inflamación del revestimiento de las cámaras del corazón y sus...", "options": ["válvulas", "arterias", "venas"], "correctAnswer": "válvulas" },
                    { "question": "La 'miocarditis' es la inflamación del...", "options": ["hígado", "miocardio (músculo cardíaco)", "pulmón"], "correctAnswer": "miocardio (músculo cardíaco)" },
                    { "question": "El 'aneurisma' es una dilatación anormal de una...", "options": ["arteria", "vena", "célula"], "correctAnswer": "arteria" },
                    { "question": "La 'neoplasia' es la formación anormal de tejido en el cuerpo, que puede ser benigno o...", "options": ["malo", "maligno", "regular"], "correctAnswer": "maligno" },
                    { "question": "La 'inmunoterapia' es un tipo de tratamiento que utiliza el propio sistema inmunológico del paciente para luchar contra el...", "options": ["cáncer", "dolor", "cansancio"], "correctAnswer": "cáncer" }
                ]
            },
            {
                id: 27,
                title: "Nivel 27",
                passingScore: 1.0,
                questions: [
                    { "question": "La 'sepsis' es una respuesta sistémica del cuerpo a una infección que puede causar daño a...", "options": ["un solo órgano", "múltiples órganos", "los huesos"], "correctAnswer": "múltiples órganos" },
                    { "question": "La 'colangiocarcinoma' es un tipo de cáncer que se forma en los conductos...", "options": ["biliares", "salivales", "lágrimas"], "correctAnswer": "biliares" },
                    { "question": "La 'polineuropatía desmielinizante inflamatoria crónica' (CIDP) es un trastorno neurológico que causa debilidad en los...", "options": ["brazos y piernas", "ojos", "orejas"], "correctAnswer": "brazos y piernas" },
                    { "question": "El 'síndrome de Guillain-Barré' es un trastorno neurológico autoinmune en el que el sistema inmunológico ataca los...", "options": ["nervios periféricos", "nervios del cerebro", "nervios del corazón"], "correctAnswer": "nervios periféricos" },
                    { "question": "La 'aterosclerosis' es una enfermedad en la que las placas de grasa, colesterol y otras sustancias se acumulan en las paredes de las...", "options": ["venas", "arterias", "células"], "correctAnswer": "arterias" }
                ]
            },
            {
                id: 28,
                title: "Nivel 28",
                passingScore: 1.0,
                questions: [
                    { "question": "La 'miastenia gravis' es una enfermedad autoinmune que causa debilidad en los...", "options": ["huesos", "músculos", "nervios"], "correctAnswer": "músculos" },
                    { "question": "La 'esclerosis lateral amiotrófica' (ELA) afecta a las células nerviosas en el cerebro y la médula espinal que controlan el movimiento...", "options": ["voluntario", "involuntario", "muscular"], "correctAnswer": "voluntario" },
                    { "question": "La 'enfermedad de Huntington' es una enfermedad genética hereditaria que causa la degeneración de las células nerviosas en el...", "options": ["hígado", "corazón", "cerebro"], "correctAnswer": "cerebro" },
                    { "question": "El 'glaucoma' es una enfermedad del ojo que causa daño al nervio óptico y puede llevar a la...", "options": ["ceguera", "sordera", "parálisis"], "correctAnswer": "ceguera" },
                    { "question": "La 'enfermedad de Alzheimer' es la forma más común de...", "options": ["demencia", "hipertensión", "diabetes"], "correctAnswer": "demencia" }
                ]
            },
            {
                id: 29,
                title: "Nivel 29",
                passingScore: 1.0,
                questions: [
                    { "question": "La 'esclerosis múltiple' es una enfermedad autoinmune que se produce cuando el sistema inmunológico ataca a la...", "options": ["mielina", "hormona", "célula"], "correctAnswer": "mielina" },
                    { "question": "La 'enfermedad de Parkinson' se caracteriza por temblores, rigidez muscular y...", "options": ["dificultad para moverse", "dolor de cabeza", "fiebre"], "correctAnswer": "dificultad para moverse" },
                    { "question": "La 'demencia' es un término general para el deterioro de la memoria, el pensamiento y el comportamiento que interfiere con la vida...", "options": ["social", "cotidiana", "familiar"], "correctAnswer": "cotidiana" },
                    { "question": "El 'ictus' o 'accidente cerebrovascular' puede ser isquémico (por un coágulo) o...", "options": ["hemorrágico (por una hemorragia)", "arterial", "venoso"], "correctAnswer": "hemorrágico (por una hemorragia)" },
                    { "question": "La 'encefalopatía traumática crónica' (CTE) es una enfermedad cerebral degenerativa que se encuentra en personas con un historial de lesiones cerebrales...", "options": ["leves", "repetidas", "graves"], "correctAnswer": "repetidas" }
                ]
            },
            {
                id: 30,
                title: "Nivel 30",
                passingScore: 1.0,
                questions: [
                    { "question": "El 'síndrome de Tourette' es un trastorno neurológico que se caracteriza por la presencia de 'tics' motores y...", "options": ["mentales", "sensoriales", "vocales"], "correctAnswer": "vocales" },
                    { "question": "La 'enfermedad de Creutzfeldt-Jakob' (ECJ) es una enfermedad neurodegenerativa rara y...", "options": ["curable", "mortal", "leve"], "correctAnswer": "mortal" },
                    { "question": "La 'miastenia gravis' es una enfermedad neuromuscular autoinmune que se caracteriza por la debilidad de los músculos...", "options": ["voluntarios", "involuntarios", "del corazón"], "correctAnswer": "voluntarios" },
                    { "question": "La 'enfermedad de Huntington' es una enfermedad genética que afecta al cerebro y causa movimientos incontrolables, problemas emocionales y...", "options": ["deterioro cognitivo", "fiebre", "dolor de cabeza"], "correctAnswer": "deterioro cognitivo" },
                    { "question": "La 'epidermólisis bullosa' es un grupo de enfermedades genéticas raras que causan que la piel sea muy frágil y forme...", "options": ["heridas", "ampollas", "manchas"], "correctAnswer": "ampollas" }
                ]
            }
        ];
