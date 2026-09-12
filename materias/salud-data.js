export const levels = [
    // --- Dificultad Baja (Niveles 1-5) ---
    {
        id: 1, title: "Nivel 1", passingScore: 0.6,
        questions: [
            { question: { es: "¿Cuántas veces al día se recomienda cepillarse los dientes?", en: "How many times a day is it recommended to brush your teeth?" }, options: { es: ["Una vez", "Dos veces", "Tres veces"], en: ["Once", "Twice", "Three times"] }, correctAnswer: { es: "Tres veces", en: "Three times" } },
            { question: { es: "La comida más importante del día es el...", en: "The most important meal of the day is..." }, options: { es: ["almuerzo", "desayuno", "cena"], en: ["lunch", "breakfast", "dinner"] }, correctAnswer: { es: "desayuno", en: "breakfast" } },
            { question: { es: "¿Cuál es la bebida más saludable?", en: "What is the healthiest drink?" }, options: { es: ["El agua", "El refresco", "El jugo"], en: ["Water", "Soda", "Juice"] }, correctAnswer: { es: "El agua", en: "Water" } },
            { question: { es: "Hacer ejercicio ayuda a mantener...", en: "Exercising helps maintain..." }, options: { es: ["un peso saludable", "el cansancio", "el estrés"], en: ["a healthy weight", "tiredness", "stress"] }, correctAnswer: { es: "un peso saludable", en: "a healthy weight" } },
            { question: { es: "Para evitar los resfriados es importante lavarse las...", en: "To avoid colds, it is important to wash your..." }, options: { es: ["manos", "piernas", "cara"], en: ["hands", "legs", "face"] }, correctAnswer: { es: "manos", en: "hands" } }
        ]
    },
    {
        id: 2, title: "Nivel 2", passingScore: 0.65,
        questions: [
            { question: { es: "¿Qué vitamina se obtiene principalmente del sol?", en: "Which vitamin is mainly obtained from the sun?" }, options: { es: ["Vitamina C", "Vitamina A", "Vitamina D"], en: ["Vitamin C", "Vitamin A", "Vitamin D"] }, correctAnswer: { es: "Vitamina D", en: "Vitamin D" } },
            { question: { es: "El corazón es un...", en: "The heart is a..." }, options: { es: ["músculo", "hueso", "órgano"], en: ["muscle", "bone", "organ"] }, correctAnswer: { es: "órgano", en: "organ" } }, // Technically also a muscle, but organ is a better general classification here.
            { question: { es: "Para una buena digestión, es importante comer...", en: "For good digestion, it is important to eat..." }, options: { es: ["rápido", "lento", "con prisa"], en: ["fast", "slowly", "in a hurry"] }, correctAnswer: { es: "lento", en: "slowly" } },
            { question: { es: "Una 'dieta equilibrada' significa comer...", en: "A 'balanced diet' means eating..." }, options: { es: ["solo dulces", "muchas frutas y verduras, granos enteros y proteínas", "solo carnes"], en: ["only sweets", "plenty of fruits and vegetables, whole grains, and proteins", "only meat"] }, correctAnswer: { es: "muchas frutas y verduras, granos enteros y proteínas", en: "plenty of fruits and vegetables, whole grains, and proteins" } },
            { question: { es: "El descanso adecuado para los niños es de...", en: "Adequate rest for children is..." }, options: { es: ["2-4 horas", "5-7 horas", "8-10 horas"], en: ["2-4 hours", "5-7 hours", "8-10 hours"] }, correctAnswer: { es: "8-10 horas", en: "8-10 hours" } }
        ]
    },
    {
        id: 3, title: "Nivel 3", passingScore: 0.7,
        questions: [
            { question: { es: "El órgano más grande del cuerpo es la...", en: "The largest organ of the body is the..." }, options: { es: ["piel", "estómago", "hígado"], en: ["skin", "stomach", "liver"] }, correctAnswer: { es: "piel", en: "skin" } },
            { question: { es: "Los 'carbohidratos' nos dan...", en: "'Carbohydrates' give us..." }, options: { es: ["energía", "vitaminas", "hierro"], en: ["energy", "vitamins", "iron"] }, correctAnswer: { es: "energía", en: "energy" } },
            { question: { es: "Las 'proteínas' son importantes para...", en: "'Proteins' are important for..." }, options: { es: ["los huesos", "el crecimiento y reparación de los tejidos", "la vista"], en: ["bones", "the growth and repair of tissues", "eyesight"] }, correctAnswer: { es: "el crecimiento y reparación de los tejidos", en: "the growth and repair of tissues" } },
            { question: { es: "Un 'hábito' saludable es...", en: "A healthy 'habit' is..." }, options: { es: ["ver televisión todo el día", "hacer ejercicio", "comer comida chatarra"], en: ["watching TV all day", "exercising", "eating junk food"] }, correctAnswer: { es: "hacer ejercicio", en: "exercising" } },
            { question: { es: "La 'fiebre' es una señal de que el cuerpo está...", en: "A 'fever' is a sign that the body is..." }, options: { es: ["sano", "luchando contra una infección", "relajado"], en: ["healthy", "fighting an infection", "relaxed"] }, correctAnswer: { es: "luchando contra una infección", en: "fighting an infection" } }
        ]
    },
    {
        id: 4, title: "Nivel 4", passingScore: 0.7,
        questions: [
            { question: { es: "Los 'huesos' del cuerpo forman el...", en: "The 'bones' of the body form the..." }, options: { es: ["aparato digestivo", "sistema respiratorio", "esqueleto"], en: ["digestive system", "respiratory system", "skeleton"] }, correctAnswer: { es: "esqueleto", en: "skeleton" } },
            { question: { es: "Los 'músculos' ayudan a nuestro cuerpo a...", en: "'Muscles' help our body to..." }, options: { es: ["pensar", "moverse", "respirar"], en: ["think", "move", "breathe"] }, correctAnswer: { es: "moverse", en: "move" } },
            { question: { es: "Las 'vitaminas y minerales' se encuentran principalmente en...", en: "'Vitamins and minerals' are mainly found in..." }, options: { es: ["los dulces", "los refrescos", "las frutas y verduras"], en: ["sweets", "sodas", "fruits and vegetables"] }, correctAnswer: { es: "las frutas y verduras", en: "fruits and vegetables" } },
            { question: { es: "El 'cerebro' es el centro de...", en: "The 'brain' is the center of..." }, options: { es: ["la circulación", "la respiración", "el sistema nervioso"], en: ["circulation", "respiration", "the nervous system"] }, correctAnswer: { es: "el sistema nervioso", en: "the nervous system" } },
            { question: { es: "Para una buena postura, es importante sentarse...", en: "For good posture, it's important to sit..." }, options: { es: ["encorvado", "derecho", "con los pies en la mesa"], en: ["slouched", "straight", "with feet on the table"] }, correctAnswer: { es: "derecho", en: "straight" } }
        ]
    },
    {
        id: 5, title: "Nivel 5", passingScore: 0.75,
        questions: [
            { question: { es: "El 'sistema circulatorio' se encarga de transportar...", en: "The 'circulatory system' is responsible for transporting..." }, options: { es: ["alimentos", "sangre", "oxígeno"], en: ["food", "blood", "oxygen"] }, correctAnswer: { es: "sangre", en: "blood" } },
            { question: { es: "El 'pulmón' es parte del sistema...", en: "The 'lung' is part of the..." }, options: { es: ["digestivo", "respiratorio", "nervioso"], en: ["digestive system", "respiratory system", "nervous system"] }, correctAnswer: { es: "respiratorio", en: "respiratory system" } },
            { question: { es: "El 'sistema digestivo' transforma los alimentos en...", en: "The 'digestive system' transforms food into..." }, options: { es: ["energía", "agua", "desechos"], en: ["energy", "water", "waste"] }, correctAnswer: { es: "energía", en: "energy" } },
            { question: { es: "La 'higiene personal' es importante para prevenir...", en: "Personal 'hygiene' is important to prevent..." }, options: { es: ["la felicidad", "enfermedades", "el sueño"], en: ["happiness", "diseases", "sleep"] }, correctAnswer: { es: "enfermedades", en: "diseases" } },
            { question: { es: "La 'pirámide alimenticia' es una guía para comer de forma...", en: "The 'food pyramid' is a guide to eating..." }, options: { es: ["desordenada", "excesiva", "saludable"], en: ["disorderly", "excessively", "healthily"] }, correctAnswer: { es: "saludable", en: "healthily" } }
        ]
    },
    // Dificultad Media (Niveles 6-12)
    {
        id: 6, title: "Nivel 6", passingScore: 0.75,
        questions: [
            { question: { es: "Las 'calorías' son una medida de...", en: "'Calories' are a measure of..." }, options: { es: ["la energía de los alimentos", "el peso de una persona", "el sabor de la comida"], en: ["the energy in food", "a person's weight", "the taste of food"] }, correctAnswer: { es: "la energía de los alimentos", en: "the energy in food" } },
            { question: { es: "El 'colesterol' es una sustancia grasa que se encuentra en la sangre y su exceso puede causar problemas...", en: "'Cholesterol' is a fatty substance found in the blood, and excess can cause..." }, options: { es: ["de vista", "del corazón", "de huesos"], en: ["vision problems", "heart problems", "bone problems"] }, correctAnswer: { es: "del corazón", en: "heart problems" } },
            { question: { es: "La 'presión arterial' es la fuerza con la que la sangre empuja las paredes de las...", en: "'Blood pressure' is the force with which blood pushes against the walls of the..." }, options: { es: ["venas", "arterias", "células"], en: ["veins", "arteries", "cells"] }, correctAnswer: { es: "arterias", en: "arteries" } },
            { question: { es: "El 'estrés' puede tener efectos negativos en la salud...", en: "'Stress' can have negative effects on..." }, options: { es: ["física y mental", "solo física", "solo mental"], en: ["physical and mental health", "only physical health", "only mental health"] }, correctAnswer: { es: "física y mental", en: "physical and mental health" } },
            { question: { es: "Para prevenir las caries, es importante evitar el consumo excesivo de...", en: "To prevent cavities, it is important to avoid excessive consumption of..." }, options: { es: ["frutas", "verduras", "azúcar"], en: ["fruits", "vegetables", "sugar"] }, correctAnswer: { es: "azúcar", en: "sugar" } }
        ]
    },
    {
        id: 7, title: "Nivel 7", passingScore: 0.8,
        questions: [
            { question: { es: "La 'anemia' es una enfermedad causada por la falta de...", en: "'Anemia' is a disease caused by a lack of..." }, options: { es: ["calcio", "hierro", "magnesio"], en: ["calcium", "iron", "magnesium"] }, correctAnswer: { es: "hierro", en: "iron" } },
            { question: { es: "La 'obesidad' es una enfermedad caracterizada por el exceso de...", en: "'Obesity' is a disease characterized by excess..." }, options: { es: ["peso", "salud", "ejercicio"], en: ["weight", "health", "exercise"] }, correctAnswer: { es: "peso", en: "weight" } },
            { question: { es: "El 'ejercicio aeróbico' es el que se realiza con una intensidad baja o moderada durante un largo periodo, como...", en: "'Aerobic exercise' is performed at a low or moderate intensity for a long period, such as..." }, options: { es: ["correr", "levantar pesas", "hacer abdominales"], en: ["running", "lifting weights", "doing sit-ups"] }, correctAnswer: { es: "correr", en: "running" } },
            { question: { es: "El 'ejercicio anaeróbico' es el que se realiza con una alta intensidad y corta duración, como...", en: "'Anaerobic exercise' is performed at high intensity for a short duration, such as..." }, options: { es: ["correr", "nadar", "levantar pesas"], en: ["running", "swimming", "lifting weights"] }, correctAnswer: { es: "levantar pesas", en: "lifting weights" } },
            { question: { es: "La 'dieta mediterránea' se basa en el consumo de...", en: "The 'Mediterranean diet' is based on the consumption of..." }, options: { es: ["carnes rojas y grasas", "frutas, verduras, legumbres, pescado y aceite de oliva", "lácteos y pan"], en: ["red meats and fats", "fruits, vegetables, legumes, fish, and olive oil", "dairy and bread"] }, correctAnswer: { es: "frutas, verduras, legumbres, pescado y aceite de oliva", en: "fruits, vegetables, legumes, fish, and olive oil" } }
        ]
    },
    {
        id: 8, title: "Nivel 8", passingScore: 0.8,
        questions: [
            { question: { es: "La 'vacuna' es una preparación biológica que proporciona...", en: "A 'vaccine' is a biological preparation that provides..." }, options: { es: ["inmunidad adquirida contra una enfermedad", "alimentos", "descanso"], en: ["acquired immunity against a disease", "food", "rest"] }, correctAnswer: { es: "inmunidad adquirida contra una enfermedad", en: "acquired immunity against a disease" } },
            { question: { es: "El 'sistema inmunológico' protege al cuerpo contra...", en: "The 'immune system' protects the body against..." }, options: { es: ["el hambre", "el cansancio", "las enfermedades"], en: ["hunger", "fatigue", "diseases"] }, correctAnswer: { es: "las enfermedades", en: "diseases" } },
            { question: { es: "Una 'fractura' es la rotura de un...", en: "A 'fracture' is the break of a..." }, options: { es: ["músculo", "hueso", "tendón"], en: ["muscle", "bone", "tendon"] }, correctAnswer: { es: "hueso", en: "bone" } },
            { question: { es: "La 'diabetes' es una enfermedad en la que el cuerpo no produce o no usa adecuadamente la...", en: "'Diabetes' is a disease in which the body does not produce or properly use..." }, options: { es: ["vitamina", "insulina", "proteína"], en: ["vitamin", "insulin", "protein"] }, correctAnswer: { es: "insulina", en: "insulin" } },
            { question: { es: "El 'primeros auxilios' son las atenciones inmediatas que se dan a una persona...", en: "'First aid' is the immediate care given to a person who is..." }, options: { es: ["sana", "enferma o lesionada", "dormida"], en: ["healthy", "sick or injured", "asleep"] }, correctAnswer: { es: "enferma o lesionada", en: "sick or injured" } }
        ]
    },
    {
        id: 9, title: "Nivel 9", passingScore: 0.8,
        questions: [
            { question: { es: "La 'hidratación' es importante para el correcto funcionamiento de...", en: "'Hydration' is important for the proper functioning of..." }, options: { es: ["los huesos", "el cuerpo", "el cerebro"], en: ["the bones", "the body", "the brain"] }, correctAnswer: { es: "el cuerpo", en: "the body" } },
            { question: { es: "La 'osteoporosis' es una enfermedad que debilita los...", en: "'Osteoporosis' is a disease that weakens the..." }, options: { es: ["músculos", "huesos", "tendones"], en: ["muscles", "bones", "tendons"] }, correctAnswer: { es: "huesos", en: "bones" } },
            { question: { es: "El 'autocuidado' es la práctica de cuidarse a uno mismo para mantener la salud...", en: "'Self-care' is the practice of taking care of oneself to maintain..." }, options: { es: ["física y mental", "solo física", "solo mental"], en: ["physical and mental health", "only physical health", "only mental health"] }, correctAnswer: { es: "física y mental", en: "physical and mental health" } },
            { question: { es: "La 'respiración boca a boca' es una técnica de reanimación...", en: "'Mouth-to-mouth resuscitation' is a technique of..." }, options: { es: ["cardiopulmonar", "cerebral", "muscular"], en: ["cardiopulmonary resuscitation", "cerebral resuscitation", "muscular resuscitation"] }, correctAnswer: { es: "cardiopulmonar", en: "cardiopulmonary resuscitation" } },
            { question: { es: "La 'inflamación' es una respuesta del cuerpo a una...", en: "'Inflammation' is a body's response to an..." }, options: { es: ["infección o lesión", "comida", "temperatura"], en: ["infection or injury", "food", "temperature"] }, correctAnswer: { es: "infección o lesión", en: "infection or injury" } }
        ]
    },
    {
        id: 10, title: "Nivel 10", passingScore: 0.85,
        questions: [
            { question: { es: "La 'hipertensión' es la presión arterial...", en: "'Hypertension' is..." }, options: { es: ["baja", "normal", "alta"], en: ["low blood pressure", "normal blood pressure", "high blood pressure"] }, correctAnswer: { es: "alta", en: "high blood pressure" } },
            { question: { es: "El 'sistema nervioso central' está formado por el cerebro y...", en: "The 'central nervous system' is composed of the brain and..." }, options: { es: ["la médula espinal", "los nervios", "los músculos"], en: ["the spinal cord", "the nerves", "the muscles"] }, correctAnswer: { es: "la médula espinal", en: "the spinal cord" } },
            { question: { es: "Una 'quemadura' se clasifica según su...", en: "A 'burn' is classified according to its..." }, options: { es: ["tamaño", "profundidad", "color"], en: ["size", "depth", "color"] }, correctAnswer: { es: "profundidad", en: "depth" } },
            { question: { es: "La 'gripe' es una enfermedad causada por un...", en: "The 'flu' is an illness caused by a..." }, options: { es: ["virus", "bacteria", "hongo"], en: ["virus", "bacterium", "fungus"] }, correctAnswer: { es: "virus", en: "virus" } },
            { question: { es: "El 'sistema endocrino' se encarga de la producción de...", en: "The 'endocrine system' is responsible for the production of..." }, options: { es: ["hormonas", "glóbulos rojos", "saliva"], en: ["hormones", "red blood cells", "saliva"] }, correctAnswer: { es: "hormonas", en: "hormones" } }
        ]
    },
    // Dificultad Avanzada (Niveles 11-20)
    {
        id: 11, title: "Nivel 11", passingScore: 0.85,
        questions: [
            { question: { es: "La 'insulina' es una hormona que regula el nivel de...", en: "'Insulin' is a hormone that regulates the level of..." }, options: { es: ["glucosa en la sangre", "colesterol", "sodio"], en: ["glucose in the blood", "cholesterol", "sodium"] }, correctAnswer: { es: "glucosa en la sangre", en: "glucose in the blood" } },
            { question: { es: "El 'sida' es una enfermedad causada por el virus de la...", en: "'AIDS' is a disease caused by the..." }, options: { es: ["gripe", "hepatitis", "inmunodeficiencia humana (VIH)"], en: ["flu virus", "hepatitis virus", "human immunodeficiency virus (HIV)"] }, correctAnswer: { es: "inmunodeficiencia humana (VIH)", en: "human immunodeficiency virus (HIV)" } },
            { question: { es: "El 'sistema linfático' es parte del sistema...", en: "The 'lymphatic system' is part of the..." }, options: { es: ["circulatorio", "inmunológico", "nervioso"], en: ["circulatory system", "immune system", "nervous system"] }, correctAnswer: { es: "inmunológico", en: "immune system" } },
            { question: { es: "La 'alergia' es una respuesta exagerada del sistema inmunológico a una...", en: "An 'allergy' is an exaggerated response of the immune system to a..." }, options: { es: ["sustancia extraña", "bacteria", "emoción"], en: ["foreign substance", "bacterium", "emotion"] }, correctAnswer: { es: "sustancia extraña", en: "foreign substance" } },
            { question: { es: "El 'botulismo' es una intoxicación alimentaria causada por una...", en: "'Botulism' is food poisoning caused by a..." }, options: { es: ["bacteria", "virus", "hongo"], en: ["bacterium", "virus", "fungus"] }, correctAnswer: { es: "bacteria", en: "bacterium" } }
        ]
    },
    {
        id: 12, title: "Nivel 12", passingScore: 0.85,
        questions: [
            { question: { es: "La 'cirrosis' es una enfermedad crónica y progresiva del...", en: "'Cirrhosis' is a chronic and progressive disease of the..." }, options: { es: ["corazón", "hígado", "pulmón"], en: ["heart", "liver", "lung"] }, correctAnswer: { es: "hígado", en: "liver" } },
            { question: { es: "La 'nefritis' es una inflamación del...", en: "'Nephritis' is an inflammation of the..." }, options: { es: ["riñón", "hígado", "estómago"], en: ["kidney", "liver", "stomach"] }, correctAnswer: { es: "riñón", en: "kidney" } },
            { question: { es: "El 'hipertiroidismo' es una afección en la que la glándula tiroides produce demasiada...", en: "'Hyperthyroidism' is a condition in which the thyroid gland produces too much..." }, options: { es: ["insulina", "hormona tiroidea", "glucosa"], en: ["insulin", "thyroid hormone", "glucose"] }, correctAnswer: { es: "hormona tiroidea", en: "thyroid hormone" } },
            { question: { es: "Una 'embolia' es la obstrucción de un vaso sanguíneo por un...", en: "An 'embolism' is the obstruction of a blood vessel by a..." }, options: { es: ["coágulo", "hueso", "músculo"], en: ["clot", "bone", "muscle"] }, correctAnswer: { es: "coágulo", en: "clot" } },
            { question: { es: "La 'meningitis' es la inflamación de las membranas que rodean el cerebro y la...", en: "'Meningitis' is the inflammation of the membranes surrounding the brain and the..." }, options: { es: ["médula espinal", "columna vertebral", "estómago"], en: ["spinal cord", "vertebral column", "stomach"] }, correctAnswer: { es: "médula espinal", en: "spinal cord" } }
        ]
    },
    {
        id: 13, title: "Nivel 13", passingScore: 0.85,
        questions: [
            { question: { es: "La 'artritis' es la inflamación de las...", en: "'Arthritis' is the inflammation of the..." }, options: { es: ["articulaciones", "venas", "arterias"], en: ["joints", "veins", "arteries"] }, correctAnswer: { es: "articulaciones", en: "joints" } },
            { question: { es: "La 'tuberculosis' es una enfermedad infecciosa causada por una...", en: "'Tuberculosis' is an infectious disease caused by a..." }, options: { es: ["bacteria", "virus", "hongo"], en: ["bacterium", "virus", "fungus"] }, correctAnswer: { es: "bacteria", en: "bacterium" } },
            { question: { es: "El 'infarto de miocardio' se produce por la obstrucción de una...", en: "A 'myocardial infarction' (heart attack) is caused by the obstruction of a..." }, options: { es: ["arteria coronaria", "vena pulmonar", "arteria cerebral"], en: ["coronary artery", "pulmonary vein", "cerebral artery"] }, correctAnswer: { es: "arteria coronaria", en: "coronary artery" } },
            { question: { es: "La 'hepatitis' es una enfermedad inflamatoria del...", en: "'Hepatitis' is an inflammatory disease of the..." }, options: { es: ["corazón", "hígado", "riñón"], en: ["heart", "liver", "kidney"] }, correctAnswer: { es: "hígado", en: "liver" } },
            { question: { es: "La 'esclerosis múltiple' es una enfermedad crónica que afecta al...", en: "'Multiple sclerosis' is a chronic disease that affects the..." }, options: { es: ["sistema nervioso central", "sistema digestivo", "sistema respiratorio"], en: ["central nervous system", "digestive system", "respiratory system"] }, correctAnswer: { es: "sistema nervioso central", en: "central nervous system" } }
        ]
    },
    {
        id: 14, title: "Nivel 14", passingScore: 0.85,
        questions: [
            { question: { es: "La 'síndrome de Down' es una condición genética causada por la presencia de una copia extra del cromosoma...", en: "'Down syndrome' is a genetic condition caused by the presence of an extra copy of chromosome..." }, options: { es: ["21", "18", "13"], en: ["21", "18", "13"] }, correctAnswer: { es: "21", en: "21" } },
            { question: { es: "El 'cáncer' es una enfermedad caracterizada por el crecimiento descontrolado de...", en: "'Cancer' is a disease characterized by the uncontrolled growth of..." }, options: { es: ["células anormales", "huesos", "músculos"], en: ["abnormal cells", "bones", "muscles"] }, correctAnswer: { es: "células anormales", en: "abnormal cells" } },
            { question: { es: "El 'ictus' o 'accidente cerebrovascular' se produce por la interrupción del flujo sanguíneo al...", en: "A 'stroke' or 'cerebrovascular accident' is caused by the interruption of blood flow to the..." }, options: { es: ["corazón", "cerebro", "pulmón"], en: ["heart", "brain", "lung"] }, correctAnswer: { es: "cerebro", en: "brain" } },
            { question: { es: "La 'gastroenteritis' es la inflamación del estómago y...", en: "'Gastroenteritis' is the inflammation of the stomach and..." }, options: { es: ["el intestino", "el hígado", "el riñón"], en: ["the intestine", "the liver", "the kidney"] }, correctAnswer: { es: "el intestino", en: "the intestine" } },
            { question: { es: "La 'hipercolesterolemia' es la presencia de niveles elevados de colesterol en la...", en: "'Hypercholesterolemia' is the presence of high levels of cholesterol in the..." }, options: { es: ["orina", "sangre", "saliva"], en: ["urine", "blood", "saliva"] }, correctAnswer: { es: "sangre", en: "blood" } }
        ]
    },
    {
        id: 15, title: "Nivel 15", passingScore: 0.85,
        questions: [
            { question: { es: "La 'insuficiencia renal' es una enfermedad en la que los riñones pierden la capacidad de...", en: "'Renal failure' is a disease in which the kidneys lose the ability to..." }, options: { es: ["filtrar la sangre", "producir hormonas", "digerir alimentos"], en: ["filter blood", "produce hormones", "digest food"] }, correctAnswer: { es: "filtrar la sangre", en: "filter blood" } },
            { question: { es: "La 'esquizofrenia' es un trastorno mental que se caracteriza por una alteración del...", en: "'Schizophrenia' is a mental disorder characterized by an alteration of..." }, options: { es: ["pensamiento, la percepción y las emociones", "corazón", "hígado"], en: ["thought, perception, and emotions", "the heart", "the liver"] }, correctAnswer: { es: "pensamiento, la percepción y las emociones", en: "thought, perception, and emotions" } },
            { question: { es: "La 'catarata' es una enfermedad del ojo que se caracteriza por la opacidad del...", en: "A 'cataract' is an eye disease characterized by the clouding of the..." }, options: { es: ["cristalino", "nervio óptico", "retina"], en: ["lens", "optic nerve", "retina"] }, correctAnswer: { es: "cristalino", en: "lens" } },
            { question: { es: "La 'síndrome del túnel carpiano' es una afección que se produce por la compresión de un nervio en la...", en: "'Carpal tunnel syndrome' is a condition caused by the compression of a nerve in the..." }, options: { es: ["rodilla", "muñeca", "espalda"], en: ["knee", "wrist", "back"] }, correctAnswer: { es: "muñeca", en: "wrist" } },
            { question: { es: "La 'endometriosis' es una enfermedad en la que el tejido que normalmente recubre el útero crece...", en: "'Endometriosis' is a disease in which the tissue that normally lines the uterus grows..." }, options: { es: ["dentro del útero", "fuera del útero", "en el corazón"], en: ["inside the uterus", "outside the uterus", "in the heart"] }, correctAnswer: { es: "fuera del útero", en: "outside the uterus" } }
        ]
    },
    // --- Dificultad Experto (Niveles 16-30) ---
    {
        id: 16, title: "Nivel 16", passingScore: 0.9,
        questions: [
            { question: { es: "El 'SIDA' es el 'Síndrome de Inmunodeficiencia Adquirida'. ¿Qué significa 'Inmunodeficiencia'?", en: "'AIDS' is 'Acquired Immunodeficiency Syndrome'. What does 'Immunodeficiency' mean?" }, options: { es: ["El sistema inmunitario está débil", "El sistema inmunitario está fuerte", "No hay sistema inmunitario"], en: ["The immune system is weak", "The immune system is strong", "There is no immune system"] }, correctAnswer: { es: "El sistema inmunitario está débil", en: "The immune system is weak" } },
            { question: { es: "La 'epilepsia' es un trastorno cerebral caracterizado por...", en: "'Epilepsy' is a brain disorder characterized by..." }, options: { es: ["dolor de cabeza", "convulsiones", "fiebre"], en: ["headaches", "seizures", "fever"] }, correctAnswer: { es: "convulsiones", en: "seizures" } },
            { question: { es: "La 'anorexia nerviosa' es un trastorno alimentario caracterizado por un miedo intenso a...", en: "'Anorexia nervosa' is an eating disorder characterized by an intense fear of..." }, options: { es: ["comer", "engordar", "adelgazar"], en: ["eating", "gaining weight", "losing weight"] }, correctAnswer: { es: "engordar", en: "gaining weight" } },
            { question: { es: "La 'bulimia nerviosa' es un trastorno alimentario que se caracteriza por episodios recurrentes de...", en: "'Bulimia nervosa' is an eating disorder characterized by recurrent episodes of..." }, options: { es: ["comer en exceso", "vomitar", "ayunar"], en: ["binge eating", "vomiting", "fasting"] }, correctAnswer: { es: "comer en exceso", en: "binge eating" } },
            { question: { es: "La 'encefalitis' es la inflamación del...", en: "'Encephalitis' is the inflammation of the..." }, options: { es: ["cerebro", "hígado", "riñón"], en: ["brain", "liver", "kidney"] }, correctAnswer: { es: "cerebro", en: "brain" } }
        ]
    },
    {
        id: 17, title: "Nivel 17", passingScore: 0.9,
        questions: [
            { question: { es: "La 'leucemia' es un tipo de cáncer de...", en: "'Leukemia' is a type of cancer of the..." }, options: { es: ["la piel", "la sangre", "el cerebro"], en: ["skin", "blood", "brain"] }, correctAnswer: { es: "la sangre", en: "blood" } },
            { question: { es: "El 'asma' es una enfermedad de los...", en: "'Asthma' is a disease of the..." }, options: { es: ["pulmones", "riñones", "músculos"], en: ["lungs", "kidneys", "muscles"] }, correctAnswer: { es: "pulmones", en: "lungs" } },
            { question: { es: "La 'artrosis' es una enfermedad degenerativa de las...", en: "'Osteoarthritis' is a degenerative disease of the..." }, options: { es: ["articulaciones", "venas", "arterias"], en: ["joints", "veins", "arteries"] }, correctAnswer: { es: "articulaciones", en: "joints" } },
            { question: { es: "La 'gastritis' es la inflamación del...", en: "'Gastritis' is the inflammation of the..." }, options: { es: ["estómago", "intestino", "hígado"], en: ["stomach", "intestine", "liver"] }, correctAnswer: { es: "estómago", en: "stomach" } },
            { question: { es: "El 'sistema endocrino' se encarga de regular funciones como el metabolismo, el crecimiento y...", en: "The 'endocrine system' is responsible for regulating functions such as metabolism, growth, and..." }, options: { es: ["el hambre", "la reproducción", "el sueño"], en: ["hunger", "reproduction", "sleep"] }, correctAnswer: { es: "la reproducción", en: "reproduction" } }
        ]
    },
    {
        id: 18, title: "Nivel 18", passingScore: 0.9,
        questions: [
            { question: { es: "La 'neumonía' es una infección de los...", en: "'Pneumonia' is an infection of the..." }, options: { es: ["pulmones", "riñones", "músculos"], en: ["lungs", "kidneys", "muscles"] }, correctAnswer: { es: "pulmones", en: "lungs" } },
            { question: { es: "El 'lupus' es una enfermedad autoinmune que ataca a los...", en: "'Lupus' is an autoimmune disease that attacks..." }, options: { es: ["huesos", "órganos y tejidos sanos", "músculos"], en: ["bones", "healthy organs and tissues", "muscles"] }, correctAnswer: { es: "órganos y tejidos sanos", en: "healthy organs and tissues" } },
            { question: { es: "El 'Alzheimer' es una enfermedad degenerativa que afecta al...", en: "'Alzheimer's' is a degenerative disease that affects the..." }, options: { es: ["cerebro", "corazón", "hígado"], en: ["brain", "heart", "liver"] }, correctAnswer: { es: "cerebro", en: "brain" } },
            { question: { es: "La 'esclerosis lateral amiotrófica' (ELA) es una enfermedad degenerativa de las...", en: "'Amyotrophic lateral sclerosis' (ALS) is a degenerative disease of the..." }, options: { es: ["neuronas", "venas", "arterias"], en: ["neurons", "veins", "arteries"] }, correctAnswer: { es: "neuronas", en: "neurons" } },
            { question: { es: "La 'hipertensión' es la principal causa de...", en: "'Hypertension' is the main cause of..." }, options: { es: ["enfermedades del corazón, infarto e ictus", "alergias", "resfriados"], en: ["heart disease, heart attack, and stroke", "allergies", "colds"] }, correctAnswer: { es: "enfermedades del corazón, infarto e ictus", en: "heart disease, heart attack, and stroke" } }
        ]
    },
    {
        id: 19, title: "Nivel 19", passingScore: 0.95,
        questions: [
            { question: { es: "El 'virus del papiloma humano' (VPH) es la causa principal de la mayoría de los casos de cáncer de...", en: "The 'human papillomavirus' (HPV) is the main cause of most cases of..." }, options: { es: ["pulmón", "cuello uterino", "estómago"], en: ["lung cancer", "cervical cancer", "stomach cancer"] }, correctAnswer: { es: "cuello uterino", en: "cervical cancer" } },
            { question: { es: "La 'psicosis' es un trastorno mental que se caracteriza por una pérdida del contacto con la...", en: "'Psychosis' is a mental disorder characterized by a loss of contact with..." }, options: { es: ["familia", "realidad", "vida"], en: ["family", "reality", "life"] }, correctAnswer: { es: "realidad", en: "reality" } },
            { question: { es: "El 'déficit de atención e hiperactividad' (TDAH) es un trastorno mental que se caracteriza por la dificultad para...", en: "'Attention deficit hyperactivity disorder' (ADHD) is a mental disorder characterized by difficulty in..." }, options: { es: ["prestar atención y controlar los impulsos", "dormir", "comer"], en: ["paying attention and controlling impulses", "sleeping", "eating"] }, correctAnswer: { es: "prestar atención y controlar los impulsos", en: "paying attention and controlling impulses" } },
            { question: { es: "El 'trastorno bipolar' es un trastorno mental que se caracteriza por cambios extremos en el...", en: "'Bipolar disorder' is a mental disorder characterized by extreme changes in..." }, options: { es: ["humor", "peso", "color de la piel"], en: ["mood", "weight", "skin color"] }, correctAnswer: { es: "humor", en: "mood" } },
            { question: { es: "La 'esquizofrenia' se caracteriza por...", en: "'Schizophrenia' is characterized by..." }, options: { es: ["alucinaciones, delirios y pensamiento desorganizado", "fiebre", "dolor de cabeza"], en: ["hallucinations, delusions, and disorganized thinking", "fever", "headache"] }, correctAnswer: { es: "alucinaciones, delirios y pensamiento desorganizado", en: "hallucinations, delusions, and disorganized thinking" } }
        ]
    },
    {
        id: 20, title: "Nivel 20", passingScore: 0.95,
        questions: [
            { question: { es: "El 'trastorno obsesivo-compulsivo' (TOC) es un trastorno mental que se caracteriza por...", en: "'Obsessive-compulsive disorder' (OCD) is a mental disorder characterized by..." }, options: { es: ["pensamientos intrusivos y comportamientos repetitivos", "tristeza", "miedo"], en: ["intrusive thoughts and repetitive behaviors", "sadness", "fear"] }, correctAnswer: { es: "pensamientos intrusivos y comportamientos repetitivos", en: "intrusive thoughts and repetitive behaviors" } },
            { question: { es: "El 'síndrome de Asperger' es un trastorno del espectro autista que se caracteriza por dificultades en la...", en: "'Asperger's syndrome' is an autism spectrum disorder characterized by difficulties in..." }, options: { es: ["comunicación social y comportamientos repetitivos", "alimentación", "respiración"], en: ["social communication and repetitive behaviors", "eating", "breathing"] }, correctAnswer: { es: "comunicación social y comportamientos repetitivos", en: "social communication and repetitive behaviors" } },
            { question: { es: "La 'epilepsia' es un trastorno cerebral que se caracteriza por una actividad eléctrica anormal en el cerebro, que causa...", en: "'Epilepsy' is a brain disorder characterized by abnormal electrical activity in the brain, which causes..." }, options: { es: ["dolor de cabeza", "convulsiones y pérdida de conciencia", "náuseas"], en: ["headaches", "seizures and loss of consciousness", "nausea"] }, correctAnswer: { es: "convulsiones y pérdida de conciencia", en: "seizures and loss of consciousness" } },
            { question: { es: "El 'alzhéimer' es una enfermedad degenerativa del cerebro que causa problemas de...", en: "'Alzheimer's' is a degenerative brain disease that causes problems with..." }, options: { es: ["memoria, pensamiento y comportamiento", "respiración", "corazón"], en: ["memory, thinking, and behavior", "breathing", "the heart"] }, correctAnswer: { es: "memoria, pensamiento y comportamiento", en: "memory, thinking, and behavior" } },
            { question: { es: "La 'diabetes' es una enfermedad metabólica caracterizada por una elevada concentración de glucosa en la sangre, que causa...", en: "'Diabetes' is a metabolic disease characterized by high blood glucose levels, which causes..." }, options: { es: ["fatiga, sed y orina frecuente", "dolor de cabeza", "fiebre"], en: ["fatigue, thirst, and frequent urination", "headache", "fever"] }, correctAnswer: { es: "fatiga, sed y orina frecuente", en: "fatigue, thirst, and frequent urination" } }
        ]
    },
    {
        id: 21, title: "Nivel 21", passingScore: 0.95,
        questions: [
            { question: { es: "La 'arteriosclerosis' es el endurecimiento y engrosamiento de las paredes de las...", en: "'Arteriosclerosis' is the hardening and thickening of the walls of the..." }, options: { es: ["venas", "arterias", "células"], en: ["veins", "arteries", "cells"] }, correctAnswer: { es: "arterias", en: "arteries" } },
            { question: { es: "La 'arritmia' es una alteración del ritmo del...", en: "An 'arrhythmia' is an alteration of the rhythm of the..." }, options: { es: ["pulso", "corazón", "respiración"], en: ["pulse", "heart", "breathing"] }, correctAnswer: { es: "corazón", en: "heart" } },
            { question: { es: "El 'edema' es la acumulación de líquido en los tejidos del...", en: "'Edema' is the accumulation of fluid in the tissues of the..." }, options: { es: ["cuerpo", "corazón", "hígado"], en: ["body", "heart", "liver"] }, correctAnswer: { es: "cuerpo", en: "body" } },
            { question: { es: "La 'síndrome de Tourette' es un trastorno neurológico que se caracteriza por...", en: "'Tourette's syndrome' is a neurological disorder characterized by..." }, options: { es: ["tics involuntarios", "dolor de cabeza", "fiebre"], en: ["involuntary tics", "headache", "fever"] }, correctAnswer: { es: "tics involuntarios", en: "involuntary tics" } },
            { question: { es: "La 'fibromialgia' es una enfermedad crónica caracterizada por un dolor musculoesquelético generalizado y...", en: "'Fibromyalgia' is a chronic disease characterized by widespread musculoskeletal pain and..." }, options: { es: ["fatiga", "fiebre", "inflamación"], en: ["fatigue", "fever", "inflammation"] }, correctAnswer: { es: "fatiga", en: "fatigue" } }
        ]
    },
    {
        id: 22, title: "Nivel 22", passingScore: 1.0,
        questions: [
            { question: { es: "La 'enfermedad de Crohn' es una enfermedad inflamatoria del...", en: "'Crohn's disease' is an inflammatory disease of the..." }, options: { es: ["hígado", "intestino", "riñón"], en: ["liver", "intestine", "kidney"] }, correctAnswer: { es: "intestino", en: "intestine" } },
            { question: { es: "La 'artritis reumatoide' es una enfermedad autoinmune que ataca a las...", en: "'Rheumatoid arthritis' is an autoimmune disease that attacks the..." }, options: { es: ["articulaciones", "venas", "arterias"], en: ["joints", "veins", "arteries"] }, correctAnswer: { es: "articulaciones", en: "joints" } },
            { question: { es: "La 'enfermedad celíaca' es una enfermedad autoinmune que se caracteriza por una intolerancia al...", en: "'Celiac disease' is an autoimmune disease characterized by an intolerance to..." }, options: { es: ["gluten", "lactosa", "fructosa"], en: ["gluten", "lactose", "fructose"] }, correctAnswer: { es: "gluten", en: "gluten" } },
            { question: { es: "La 'síndrome de fatiga crónica' (SFC) es una enfermedad que se caracteriza por una fatiga persistente y...", en: "'Chronic fatigue syndrome' (CFS) is a disease characterized by persistent fatigue and..." }, options: { es: ["fiebre", "sin explicación", "dolor de cabeza"], en: ["fever", "unexplained", "headache"] }, correctAnswer: { es: "sin explicación", en: "unexplained" } },
            { question: { es: "La 'poliomielitis' es una enfermedad infecciosa causada por un virus que ataca al...", en: "'Poliomyelitis' is an infectious disease caused by a virus that attacks the..." }, options: { es: ["sistema nervioso", "sistema digestivo", "sistema respiratorio"], en: ["nervous system", "digestive system", "respiratory system"] }, correctAnswer: { es: "sistema nervioso", en: "nervous system" } }
        ]
    },
    {
        id: 23, title: "Nivel 23", passingScore: 1.0,
        questions: [
            { question: { es: "La 'enfermedad de Parkinson' es un trastorno neurodegenerativo que afecta a las neuronas que producen...", en: "'Parkinson's disease' is a neurodegenerative disorder that affects the neurons that produce..." }, options: { es: ["serotonina", "dopamina", "adrenalina"], en: ["serotonin", "dopamine", "adrenaline"] }, correctAnswer: { es: "dopamina", en: "dopamine" } },
            { question: { es: "La 'esclerosis múltiple' es una enfermedad que afecta a la mielina, la capa protectora que rodea las...", en: "'Multiple sclerosis' is a disease that affects myelin, the protective sheath that surrounds..." }, options: { es: ["venas", "arterias", "fibras nerviosas"], en: ["veins", "arteries", "nerve fibers"] }, correctAnswer: { es: "fibras nerviosas", en: "nerve fibers" } },
            { question: { es: "La 'trombosis venosa profunda' (TVP) es la formación de un coágulo de sangre en una...", en: "'Deep vein thrombosis' (DVT) is the formation of a blood clot in a..." }, options: { es: ["vena profunda", "arteria superficial", "vena superficial"], en: ["deep vein", "superficial artery", "superficial vein"] }, correctAnswer: { es: "vena profunda", en: "deep vein" } },
            { question: { es: "La 'colitis ulcerosa' es una enfermedad inflamatoria del intestino grueso, que causa...", en: "'Ulcerative colitis' is an inflammatory disease of the large intestine, which causes..." }, options: { es: ["diarrea, dolor abdominal y sangrado rectal", "fiebre", "dolor de cabeza"], en: ["diarrhea, abdominal pain, and rectal bleeding", "fever", "headache"] }, correctAnswer: { es: "diarrea, dolor abdominal y sangrado rectal", en: "diarrhea, abdominal pain, and rectal bleeding" } },
            { question: { es: "La 'gastroenteritis' viral es una infección del estómago y los intestinos causada por un...", en: "Viral 'gastroenteritis' is an infection of the stomach and intestines caused by a..." }, options: { es: ["virus", "bacteria", "hongo"], en: ["virus", "bacterium", "fungus"] }, correctAnswer: { es: "virus", en: "virus" } }
        ]
    },
    {
        id: 24, title: "Nivel 24", passingScore: 1.0,
        questions: [
            { question: { es: "La 'enfermedad de Lyme' es una enfermedad bacteriana que se transmite a los humanos a través de la picadura de...", en: "'Lyme disease' is a bacterial illness transmitted to humans through the bite of..." }, options: { es: ["mosquitos", "garrapatas", "arañas"], en: ["mosquitoes", "ticks", "spiders"] }, correctAnswer: { es: "garrapatas", en: "ticks" } },
            { question: { es: "La 'migraña' es un tipo de dolor de cabeza que puede ser causado por una combinación de factores...", en: "A 'migraine' is a type of headache that can be caused by a combination of..." }, options: { es: ["genéticos y ambientales", "alimenticios y psicológicos", "ambientales y de estrés"], en: ["genetic and environmental factors", "dietary and psychological factors", "environmental and stress factors"] }, correctAnswer: { es: "genéticos y ambientales", en: "genetic and environmental factors" } },
            { question: { es: "El 'asma' es una enfermedad inflamatoria crónica de las vías respiratorias que causa...", en: "'Asthma' is a chronic inflammatory disease of the airways that causes..." }, options: { es: ["dificultad para respirar, sibilancias y tos", "dolor de cabeza", "fiebre"], en: ["difficulty breathing, wheezing, and coughing", "headache", "fever"] }, correctAnswer: { es: "dificultad para respirar, sibilancias y tos", en: "difficulty breathing, wheezing, and coughing" } },
            { question: { es: "La 'candidiasis' es una infección por hongos causada por el crecimiento excesivo de la levadura...", en: "'Candidiasis' is a fungal infection caused by the overgrowth of the yeast..." }, options: { es: ["cándida", "aspergillus", "cryptococcus"], en: ["candida", "aspergillus", "cryptococcus"] }, correctAnswer: { es: "cándida", en: "candida" } },
            { question: { es: "La 'salmonelosis' es una infección bacteriana del intestino causada por la bacteria...", en: "'Salmonellosis' is a bacterial infection of the intestine caused by the bacterium..." }, options: { es: ["salmonella", "e. coli", "shigella"], en: ["salmonella", "e. coli", "shigella"] }, correctAnswer: { es: "salmonella", en: "salmonella" } }
        ]
    },
    {
        id: 25, title: "Nivel 25", passingScore: 1.0,
        questions: [
            { question: { es: "La 'enfermedad de Graves' es una enfermedad autoinmune que causa...", en: "'Graves' disease' is an autoimmune disease that causes..." }, options: { es: ["hipertiroidismo", "hipotiroidismo", "diabetes"], en: ["hyperthyroidism", "hypothyroidism", "diabetes"] }, correctAnswer: { es: "hipertiroidismo", en: "hyperthyroidism" } },
            { question: { es: "La 'síndrome del intestino irritable' (SII) es un trastorno funcional del intestino que causa...", en: "'Irritable bowel syndrome' (IBS) is a functional bowel disorder that causes..." }, options: { es: ["dolor abdominal, hinchazón y cambios en los hábitos intestinales", "fiebre", "dolor de cabeza"], en: ["abdominal pain, bloating, and changes in bowel habits", "fever", "headache"] }, correctAnswer: { es: "dolor abdominal, hinchazón y cambios en los hábitos intestinales", en: "abdominal pain, bloating, and changes in bowel habits" } },
            { question: { es: "La 'fibrosis quística' es una enfermedad genética que afecta a las glándulas que producen...", en: "'Cystic fibrosis' is a genetic disease that affects the glands that produce..." }, options: { es: ["hormonas", "sudor, moco y enzimas digestivas", "saliva"], en: ["hormones", "sweat, mucus, and digestive enzymes", "saliva"] }, correctAnswer: { es: "sudor, moco y enzimas digestivas", en: "sweat, mucus, and digestive enzymes" } },
            { question: { es: "La 'demencia' es una enfermedad neurodegenerativa que causa un deterioro progresivo de las funciones...", en: "'Dementia' is a neurodegenerative disease that causes a progressive decline in..." }, options: { es: ["motoras", "cognitivas", "visuales"], en: ["motor functions", "cognitive functions", "visual functions"] }, correctAnswer: { es: "cognitivas", en: "cognitive functions" } },
            { question: { es: "La 'enfermedad de Addison' es un trastorno endocrino en el que las glándulas suprarrenales no producen suficientes...", en: "'Addison's disease' is an endocrine disorder in which the adrenal glands do not produce enough..." }, options: { es: ["hormonas", "vitaminas", "minerales"], en: ["hormones", "vitamins", "minerals"] }, correctAnswer: { es: "hormonas", en: "hormones" } }
        ]
    },
    {
        id: 26, title: "Nivel 26", passingScore: 1.0,
        questions: [
            { question: { es: "La 'endocarditis' es una inflamación del revestimiento de las cámaras del corazón y sus...", en: "'Endocarditis' is an inflammation of the lining of the heart chambers and their..." }, options: { es: ["válvulas", "arterias", "venas"], en: ["valves", "arteries", "veins"] }, correctAnswer: { es: "válvulas", en: "valves" } },
            { question: { es: "La 'miocarditis' es la inflamación del...", en: "'Myocarditis' is the inflammation of the..." }, options: { es: ["hígado", "miocardio (músculo cardíaco)", "pulmón"], en: ["liver", "myocardium (heart muscle)", "lung"] }, correctAnswer: { es: "miocardio (músculo cardíaco)", en: "myocardium (heart muscle)" } },
            { question: { es: "El 'aneurisma' es una dilatación anormal de una...", en: "An 'aneurysm' is an abnormal dilation of an..." }, options: { es: ["arteria", "vena", "célula"], en: ["artery", "vein", "cell"] }, correctAnswer: { es: "arteria", en: "artery" } },
            { question: { es: "La 'neoplasia' es la formación anormal de tejido en el cuerpo, que puede ser benigno o...", en: "A 'neoplasm' is the abnormal formation of tissue in the body, which can be benign or..." }, options: { es: ["malo", "maligno", "regular"], en: ["bad", "malignant", "regular"] }, correctAnswer: { es: "maligno", en: "malignant" } },
            { question: { es: "La 'inmunoterapia' es un tipo de tratamiento que utiliza el propio sistema inmunológico del paciente para luchar contra el...", en: "'Immunotherapy' is a type of treatment that uses the patient's own immune system to fight..." }, options: { es: ["cáncer", "dolor", "cansancio"], en: ["cancer", "pain", "fatigue"] }, correctAnswer: { es: "cáncer", en: "cancer" } }
        ]
    },
    {
        id: 27, title: "Nivel 27", passingScore: 1.0,
        questions: [
            { question: { es: "La 'sepsis' es una respuesta sistémica del cuerpo a una infección que puede causar daño a...", en: "'Sepsis' is a systemic response of the body to an infection that can cause damage to..." }, options: { es: ["un solo órgano", "múltiples órganos", "los huesos"], en: ["a single organ", "multiple organs", "the bones"] }, correctAnswer: { es: "múltiples órganos", en: "multiple organs" } },
            { question: { es: "La 'colangiocarcinoma' es un tipo de cáncer que se forma en los conductos...", en: "'Cholangiocarcinoma' is a type of cancer that forms in the..." }, options: { es: ["biliares", "salivales", "lágrimas"], en: ["bile ducts", "salivary ducts", "tear ducts"] }, correctAnswer: { es: "biliares", en: "bile ducts" } },
            { question: { es: "La 'polineuropatía desmielinizante inflamatoria crónica' (CIDP) es un trastorno neurológico que causa debilidad en los...", en: "'Chronic inflammatory demyelinating polyneuropathy' (CIDP) is a neurological disorder that causes weakness in the..." }, options: { es: ["brazos y piernas", "ojos", "orejas"], en: ["arms and legs", "eyes", "ears"] }, correctAnswer: { es: "brazos y piernas", en: "arms and legs" } },
            { question: { es: "El 'síndrome de Guillain-Barré' es un trastorno neurológico autoinmune en el que el sistema inmunológico ataca los...", en: "'Guillain-Barré syndrome' is an autoimmune neurological disorder in which the immune system attacks the..." }, options: { es: ["nervios periféricos", "nervios del cerebro", "nervios del corazón"], en: ["peripheral nerves", "nerves of the brain", "nerves of the heart"] }, correctAnswer: { es: "nervios periféricos", en: "peripheral nerves" } },
            { question: { es: "La 'aterosclerosis' es una enfermedad en la que las placas de grasa, colesterol y otras sustancias se acumulan en las paredes de las...", en: "'Atherosclerosis' is a disease in which plaques of fat, cholesterol, and other substances build up on the walls of the..." }, options: { es: ["venas", "arterias", "células"], en: ["veins", "arteries", "cells"] }, correctAnswer: { es: "arterias", en: "arteries" } }
        ]
    },
    {
        id: 28, title: "Nivel 28", passingScore: 1.0,
        questions: [
            { question: { es: "La 'miastenia gravis' es una enfermedad autoinmune que causa debilidad en los...", en: "'Myasthenia gravis' is an autoimmune disease that causes weakness in the..." }, options: { es: ["huesos", "músculos", "nervios"], en: ["bones", "muscles", "nerves"] }, correctAnswer: { es: "músculos", en: "muscles" } },
            { question: { es: "La 'esclerosis lateral amiotrófica' (ELA) afecta a las células nerviosas en el cerebro y la médula espinal que controlan el movimiento...", en: "'Amyotrophic lateral sclerosis' (ALS) affects the nerve cells in the brain and spinal cord that control..." }, options: { es: ["voluntario", "involuntario", "muscular"], en: ["voluntary movement", "involuntary movement", "muscular movement"] }, correctAnswer: { es: "voluntario", en: "voluntary movement" } },
            { question: { es: "La 'enfermedad de Huntington' es una enfermedad genética hereditaria que causa la degeneración de las células nerviosas en el...", en: "'Huntington's disease' is a hereditary genetic disease that causes the degeneration of nerve cells in the..." }, options: { es: ["hígado", "corazón", "cerebro"], en: ["liver", "heart", "brain"] }, correctAnswer: { es: "cerebro", en: "brain" } },
            { question: { es: "El 'glaucoma' es una enfermedad del ojo que causa daño al nervio óptico y puede llevar a la...", en: "'Glaucoma' is an eye disease that causes damage to the optic nerve and can lead to..." }, options: { es: ["ceguera", "sordera", "parálisis"], en: ["blindness", "deafness", "paralysis"] }, correctAnswer: { es: "ceguera", en: "blindness" } },
            { question: { es: "La 'enfermedad de Alzheimer' es la forma más común de...", en: "'Alzheimer's disease' is the most common form of..." }, options: { es: ["demencia", "hipertensión", "diabetes"], en: ["dementia", "hypertension", "diabetes"] }, correctAnswer: { es: "demencia", en: "dementia" } }
        ]
    },
    {
        id: 29, title: "Nivel 29", passingScore: 1.0,
        questions: [
            { question: { es: "La 'esclerosis múltiple' es una enfermedad autoinmune que se produce cuando el sistema inmunológico ataca a la...", en: "'Multiple sclerosis' is an autoimmune disease that occurs when the immune system attacks the..." }, options: { es: ["mielina", "hormona", "célula"], en: ["myelin", "hormone", "cell"] }, correctAnswer: { es: "mielina", en: "myelin" } },
            { question: { es: "La 'enfermedad de Parkinson' se caracteriza por temblores, rigidez muscular y...", en: "'Parkinson's disease' is characterized by tremors, muscle rigidity, and..." }, options: { es: ["dificultad para moverse", "dolor de cabeza", "fiebre"], en: ["difficulty moving", "headache", "fever"] }, correctAnswer: { es: "dificultad para moverse", en: "difficulty moving" } },
            { question: { es: "La 'demencia' es un término general para el deterioro de la memoria, el pensamiento y el comportamiento que interfiere con la vida...", en: "'Dementia' is a general term for the decline in memory, thinking, and behavior that interferes with..." }, options: { es: ["social", "cotidiana", "familiar"], en: ["social life", "daily life", "family life"] }, correctAnswer: { es: "cotidiana", en: "daily life" } },
            { question: { es: "El 'ictus' o 'accidente cerebrovascular' puede ser isquémico (por un coágulo) o...", en: "A 'stroke' or 'cerebrovascular accident' can be ischemic (due to a clot) or..." }, options: { es: ["hemorrágico (por una hemorragia)", "arterial", "venoso"], en: ["hemorrhagic (due to a hemorrhage)", "arterial", "venous"] }, correctAnswer: { es: "hemorrágico (por una hemorragia)", en: "hemorrhagic (due to a hemorrhage)" } },
            { question: { es: "La 'encefalopatía traumática crónica' (CTE) es una enfermedad cerebral degenerativa que se encuentra en personas con un historial de lesiones cerebrales...", en: "'Chronic traumatic encephalopathy' (CTE) is a degenerative brain disease found in people with a history of..." }, options: { es: ["leves", "repetidas", "graves"], en: ["mild brain injuries", "repeated brain injuries", "severe brain injuries"] }, correctAnswer: { es: "repetidas", en: "repeated brain injuries" } }
        ]
    },
    {
        id: 30, title: "Nivel 30", passingScore: 1.0,
        questions: [
            { question: { es: "El 'síndrome de Tourette' es un trastorno neurológico que se caracteriza por la presencia de 'tics' motores y...", en: "'Tourette's syndrome' is a neurological disorder characterized by the presence of motor 'tics' and..." }, options: { es: ["mentales", "sensoriales", "vocales"], en: ["mental tics", "sensory tics", "vocal tics"] }, correctAnswer: { es: "vocales", en: "vocal tics" } },
            { question: { es: "La 'enfermedad de Creutzfeldt-Jakob' (ECJ) es una enfermedad neurodegenerativa rara y...", en: "'Creutzfeldt-Jakob disease' (CJD) is a rare and..." }, options: { es: ["curable", "mortal", "leve"], en: ["curable", "fatal", "mild"] }, correctAnswer: { es: "mortal", en: "fatal" } },
            { question: { es: "La 'miastenia gravis' es una enfermedad neuromuscular autoinmune que se caracteriza por la debilidad de los músculos...", en: "'Myasthenia gravis' is an autoimmune neuromuscular disease characterized by weakness of the..." }, options: { es: ["voluntarios", "involuntarios", "del corazón"], en: ["voluntary muscles", "involuntary muscles", "heart muscles"] }, correctAnswer: { es: "voluntarios", en: "voluntary muscles" } },
            { question: { es: "La 'enfermedad de Huntington' es una enfermedad genética que afecta al cerebro y causa movimientos incontrolables, problemas emocionales y...", en: "'Huntington's disease' is a genetic disease that affects the brain and causes uncontrollable movements, emotional problems, and..." }, options: { es: ["deterioro cognitivo", "fiebre", "dolor de cabeza"], en: ["cognitive decline", "fever", "headache"] }, correctAnswer: { es: "deterioro cognitivo", en: "cognitive decline" } },
            { question: { es: "La 'epidermólisis bullosa' es un grupo de enfermedades genéticas raras que causan que la piel sea muy frágil y forme...", en: "'Epidermolysis bullosa' is a group of rare genetic diseases that cause the skin to be very fragile and form..." }, options: { es: ["heridas", "ampollas", "manchas"], en: ["wounds", "blisters", "spots"] }, correctAnswer: { es: "ampollas", en: "blisters" } }
        ]
    }
];
