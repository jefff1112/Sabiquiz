export const levels = [
    // --- Dificultad Baja (Niveles 1-5) ---
    {
        id: 1, title: "Nivel 1", passingScore: 0.6,
        questions: [
            { question: { es: "¿Quién fue el primer presidente de los Estados Unidos?", en: "Who was the first president of the United States?" }, options: { es: ["Abraham Lincoln", "George Washington", "Thomas Jefferson"], en: ["Abraham Lincoln", "George Washington", "Thomas Jefferson"] }, correctAnswer: { es: "George Washington", en: "George Washington" } },
            { question: { es: "¿Qué país tiene una bandera con una hoja de arce?", en: "Which country has a flag with a maple leaf?" }, options: { es: ["Estados Unidos", "México", "Canadá"], en: ["United States", "Mexico", "Canada"] }, correctAnswer: { es: "Canadá", en: "Canada" } },
            { question: { es: "¿En qué continente se encuentra el desierto del Sahara?", en: "On which continent is the Sahara Desert located?" }, options: { es: ["Asia", "África", "Europa"], en: ["Asia", "Africa", "Europe"] }, correctAnswer: { es: "África", en: "Africa" } },
            { question: { es: "¿Qué civilización construyó las pirámides de Giza?", en: "Which civilization built the pyramids of Giza?" }, options: { es: ["Los romanos", "Los egipcios", "Los griegos"], en: ["The Romans", "The Egyptians", "The Greeks"] }, correctAnswer: { es: "Los egipcios", en: "The Egyptians" } },
            { question: { es: "El océano más grande del mundo es...", en: "The largest ocean in the world is..." }, options: { es: ["el Atlántico", "el Índico", "el Pacífico"], en: ["the Atlantic", "the Indian", "the Pacific"] }, correctAnswer: { es: "el Pacífico", en: "the Pacific" } }
        ]
    },
    {
        id: 2, title: "Nivel 2", passingScore: 0.65,
        questions: [
            { question: { es: "¿En qué año llegó Cristóbal Colón a América?", en: "In what year did Christopher Columbus arrive in America?" }, options: { es: ["1492", "1500", "1620"], en: ["1492", "1500", "1620"] }, correctAnswer: { es: "1492", en: "1492" } },
            { question: { es: "La capital de Francia es...", en: "The capital of France is..." }, options: { es: ["Madrid", "Londres", "París"], en: ["Madrid", "London", "Paris"] }, correctAnswer: { es: "París", en: "Paris" } },
            { question: { es: "¿Cuál es el río más largo del mundo?", en: "What is the longest river in the world?" }, options: { es: ["El Nilo", "El Amazonas", "El Misisipi"], en: ["The Nile", "The Amazon", "The Mississippi"] }, correctAnswer: { es: "El Amazonas", en: "The Amazon" } },
            { question: { es: "El 'Coliseo' se encuentra en...", en: "The 'Colosseum' is located in..." }, options: { es: ["Grecia", "Italia", "Egipto"], en: ["Greece", "Italy", "Egypt"] }, correctAnswer: { es: "Italia", en: "Italy" } },
            { question: { es: "El 'muro de Berlín' separó a Alemania en dos partes: Este y...", en: "The 'Berlin Wall' separated Germany into two parts: East and..." }, options: { es: ["Oeste", "Norte", "Sur"], en: ["West", "North", "South"] }, correctAnswer: { es: "Oeste", en: "West" } }
        ]
    },
    {
        id: 3, title: "Nivel 3", passingScore: 0.7,
        questions: [
            { question: { es: "La 'Gran Muralla China' se construyó para...", en: "The 'Great Wall of China' was built to..." }, options: { es: ["decorar el país", "proteger las fronteras", "facilitar el comercio"], en: ["decorate the country", "protect the borders", "facilitate trade"] }, correctAnswer: { es: "proteger las fronteras", en: "protect the borders" } },
            { question: { es: "¿Qué documento de 1776 declaró la independencia de los Estados Unidos?", en: "Which 1776 document declared the independence of the United States?" }, options: { es: ["La Constitución", "La Declaración de Derechos", "La Declaración de Independencia"], en: ["The Constitution", "The Bill of Rights", "The Declaration of Independence"] }, correctAnswer: { es: "La Declaración de Independencia", en: "The Declaration of Independence" } },
            { question: { es: "El idioma más hablado en el mundo es...", en: "The most spoken language in the world is..." }, options: { es: ["el inglés", "el español", "el mandarín"], en: ["English", "Spanish", "Mandarin"] }, correctAnswer: { es: "el mandarín", en: "Mandarin" } },
            { question: { es: "¿Qué metal fue el principal para la 'Edad de Bronce'?", en: "What metal was the main one for the 'Bronze Age'?" }, options: { es: ["El hierro", "El oro", "El cobre y el estaño"], en: ["Iron", "Gold", "Copper and tin"] }, correctAnswer: { es: "El cobre y el estaño", en: "Copper and tin" } },
            { question: { es: "Un 'continente' es...", en: "A 'continent' is..." }, options: { es: ["una isla", "una gran extensión de tierra", "un país"], en: ["an island", "a large landmass", "a country"] }, correctAnswer: { es: "una gran extensión de tierra", en: "a large landmass" } }
        ]
    },
    {
        id: 4, title: "Nivel 4", passingScore: 0.7,
        questions: [
            { question: { es: "¿Cuál es el país más grande del mundo por superficie?", en: "What is the largest country in the world by area?" }, options: { es: ["Canadá", "China", "Rusia"], en: ["Canada", "China", "Russia"] }, correctAnswer: { es: "Rusia", en: "Russia" } },
            { question: { es: "La 'Revolución Francesa' de 1789 derrocó a la monarquía y estableció...", en: "The 'French Revolution' of 1789 overthrew the monarchy and established..." }, options: { es: ["un imperio", "una república", "una dictadura"], en: ["an empire", "a republic", "a dictatorship"] }, correctAnswer: { es: "una república", en: "a republic" } },
            { question: { es: "El 'Río Nilo' fluye a través de...", en: "The 'Nile River' flows through..." }, options: { es: ["Asia", "África", "América"], en: ["Asia", "Africa", "America"] }, correctAnswer: { es: "África", en: "Africa" } },
            { question: { es: "¿Quién fue el líder del movimiento de independencia de la India?", en: "Who was the leader of the Indian independence movement?" }, options: { es: ["Mahatma Gandhi", "Nelson Mandela", "Martin Luther King Jr."], en: ["Mahatma Gandhi", "Nelson Mandela", "Martin Luther King Jr."] }, correctAnswer: { es: "Mahatma Gandhi", en: "Mahatma Gandhi" } },
            { question: { es: "El 'monte Everest' se encuentra en la cordillera del...", en: "Mount Everest is located in the..." }, options: { es: ["los Andes", "el Himalaya", "las Rocosas"], en: ["Andes", "Himalayas", "Rockies"] }, correctAnswer: { es: "el Himalaya", en: "Himalayas" } }
        ]
    },
    {
        id: 5, title: "Nivel 5", passingScore: 0.75,
        questions: [
            { question: { es: "La 'dictadura' es una forma de gobierno donde el poder es ejercido por...", en: "A 'dictatorship' is a form of government where power is exercised by..." }, options: { es: ["un solo líder", "el pueblo", "un grupo de élite"], en: ["a single leader", "the people", "an elite group"] }, correctAnswer: { es: "un solo líder", en: "a single leader" } },
            { question: { es: "¿Qué río sagrado fluye por la India?", en: "Which sacred river flows through India?" }, options: { es: ["El Ganges", "El Nilo", "El Yangtsé"], en: ["The Ganges", "The Nile", "The Yangtze"] }, correctAnswer: { es: "El Ganges", en: "The Ganges" } },
            { question: { es: "El 'Renacimiento' fue un periodo de gran desarrollo en...", en: "The 'Renaissance' was a period of great development in..." }, options: { es: ["la tecnología y la industria", "el arte, la cultura y la ciencia", "el comercio y la exploración"], en: ["technology and industry", "art, culture, and science", "trade and exploration"] }, correctAnswer: { es: "el arte, la cultura y la ciencia", en: "art, culture, and science" } },
            { question: { es: "Los 'aztecas' se establecieron en la actual...", en: "The 'Aztecs' settled in present-day..." }, options: { es: ["Perú", "México", "España"], en: ["Peru", "Mexico", "Spain"] }, correctAnswer: { es: "México", en: "Mexico" } },
            { question: { es: "La 'Constitución' de un país es un documento que...", en: "A country's 'Constitution' is a document that..." }, options: { es: ["recopila las leyes", "describe la historia", "prohíbe el comercio"], en: ["compiles the laws", "describes history", "prohibits trade"] }, correctAnswer: { es: "recopila las leyes", en: "compiles the laws" } }
        ]
    },
    // Dificultad Media (Niveles 6-12)
    {
        id: 6, title: "Nivel 6", passingScore: 0.75,
        questions: [
            { question: { es: "La 'primera guerra mundial' comenzó en el año...", en: "The 'First World War' began in the year..." }, options: { es: ["1914", "1939", "1945"], en: ["1914", "1939", "1945"] }, correctAnswer: { es: "1914", en: "1914" } },
            { question: { es: "El 'sistema capitalista' se basa en la propiedad privada y...", en: "The 'capitalist system' is based on private property and..." }, options: { es: ["la propiedad del Estado", "la economía de mercado", "el control centralizado"], en: ["state ownership", "the market economy", "centralized control"] }, correctAnswer: { es: "la economía de mercado", en: "the market economy" } },
            { question: { es: "¿Qué explorador portugués fue el primero en circunnavegar la Tierra?", en: "Which Portuguese explorer was the first to circumnavigate the Earth?" }, options: { es: ["Vasco da Gama", "Cristóbal Colón", "Fernando de Magallanes"], en: ["Vasco da Gama", "Christopher Columbus", "Ferdinand Magellan"] }, correctAnswer: { es: "Fernando de Magallanes", en: "Ferdinand Magellan" } },
            { question: { es: "La 'Torre de Pisa' está en...", en: "The 'Leaning Tower of Pisa' is in..." }, options: { es: ["París", "Roma", "Italia"], en: ["Paris", "Rome", "Italy"] }, correctAnswer: { es: "Italia", en: "Italy" } },
            { question: { es: "La 'civilización maya' se desarrolló en...", en: "The 'Maya civilization' developed in..." }, options: { es: ["América del Sur", "Mesoamérica", "África"], en: ["South America", "Mesoamerica", "Africa"] }, correctAnswer: { es: "Mesoamérica", en: "Mesoamerica" } }
        ]
    },
    {
        id: 7, title: "Nivel 7", passingScore: 0.8,
        questions: [
            { question: { es: "La 'guerra fría' fue un conflicto ideológico entre los bloques...", en: "The 'Cold War' was an ideological conflict between the..." }, options: { es: ["capitalista y comunista", "europeo y americano", "asiático y africano"], en: ["capitalist and communist blocs", "European and American blocs", "Asian and African blocs"] }, correctAnswer: { es: "capitalista y comunista", en: "capitalist and communist blocs" } },
            { question: { es: "El 'Canal de Panamá' conecta...", en: "The 'Panama Canal' connects..." }, options: { es: ["el Océano Atlántico y el Índico", "el Mar Mediterráneo y el Mar Rojo", "el Océano Atlántico y el Pacífico"], en: ["the Atlantic and Indian Oceans", "the Mediterranean and Red Seas", "the Atlantic and Pacific Oceans"] }, correctAnswer: { es: "el Océano Atlántico y el Pacífico", en: "the Atlantic and Pacific Oceans" } },
            { question: { es: "La 'Edad Media' terminó con la caída de...", en: "The 'Middle Ages' ended with the fall of..." }, options: { es: ["el Imperio Romano de Occidente", "la ciudad de Constantinopla", "la caída del muro de Berlín"], en: ["the Western Roman Empire", "the city of Constantinople", "the fall of the Berlin Wall"] }, correctAnswer: { es: "la ciudad de Constantinopla", en: "the city of Constantinople" } },
            { question: { es: "¿Quién fue el líder del nazismo en Alemania?", en: "Who was the leader of Nazism in Germany?" }, options: { es: ["Adolf Hitler", "Benito Mussolini", "Winston Churchill"], en: ["Adolf Hitler", "Benito Mussolini", "Winston Churchill"] }, correctAnswer: { es: "Adolf Hitler", en: "Adolf Hitler" } },
            { question: { es: "El 'Día de la Tierra' se celebra el...", en: "'Earth Day' is celebrated on..." }, options: { es: ["1 de enero", "22 de abril", "4 de julio"], en: ["January 1st", "April 22nd", "July 4th"] }, correctAnswer: { es: "22 de abril", en: "April 22nd" } }
        ]
    },
    {
        id: 8, title: "Nivel 8", passingScore: 0.8,
        questions: [
            { question: { es: "El 'Imperio Romano' cayó en el año...", en: "The 'Roman Empire' fell in the year..." }, options: { es: ["476 d.C.", "1453 d.C.", "1789 d.C."], en: ["476 AD", "1453 AD", "1789 AD"] }, correctAnswer: { es: "476 d.C.", en: "476 AD" } },
            { question: { es: "El 'Tratado de Versalles' puso fin a...", en: "The 'Treaty of Versailles' ended..." }, options: { es: ["la Segunda Guerra Mundial", "la Primera Guerra Mundial", "la Guerra Fría"], en: ["World War II", "World War I", "the Cold War"] }, correctAnswer: { es: "la Primera Guerra Mundial", en: "World War I" } },
            { question: { es: "La 'Declaración Universal de los Derechos Humanos' fue proclamada en...", en: "The 'Universal Declaration of Human Rights' was proclaimed in..." }, options: { es: ["1919", "1945", "1948"], en: ["1919", "1945", "1948"] }, correctAnswer: { es: "1948", en: "1948" } },
            { question: { es: "El 'socialismo' es un sistema político y económico que defiende...", en: "'Socialism' is a political and economic system that advocates for..." }, options: { es: ["la propiedad privada", "el control de la producción por el Estado", "el libre mercado"], en: ["private property", "state control of production", "the free market"] }, correctAnswer: { es: "el control de la producción por el Estado", en: "state control of production" } },
            { question: { es: "La 'reforma protestante' fue iniciada por...", en: "The 'Protestant Reformation' was initiated by..." }, options: { es: ["Martín Lutero", "Enrique VIII", "Juan Calvino"], en: ["Martin Luther", "Henry VIII", "John Calvin"] }, correctAnswer: { es: "Martín Lutero", en: "Martin Luther" } }
        ]
    },
    {
        id: 9, title: "Nivel 9", passingScore: 0.8,
        questions: [
            { question: { es: "La 'Edad Antigua' terminó con la caída de...", en: "The 'Ancient Age' ended with the fall of..." }, options: { es: ["el Imperio Griego", "el Imperio Romano de Occidente", "el Imperio Babilónico"], en: ["the Greek Empire", "the Western Roman Empire", "the Babylonian Empire"] }, correctAnswer: { es: "el Imperio Romano de Occidente", en: "the Western Roman Empire" } },
            { question: { es: "El 'imperio inca' se ubicó en...", en: "The 'Inca Empire' was located in..." }, options: { es: ["Mesoamérica", "los Andes", "el Caribe"], en: ["Mesoamerica", "the Andes", "the Caribbean"] }, correctAnswer: { es: "los Andes", en: "the Andes" } },
            { question: { es: "La 'democracia' se originó en la antigua...", en: "'Democracy' originated in ancient..." }, options: { es: ["Roma", "Grecia", "Egipto"], en: ["Rome", "Greece", "Egypt"] }, correctAnswer: { es: "Grecia", en: "Greece" } },
            { question: { es: "La 'Revolución Industrial' comenzó en...", en: "The 'Industrial Revolution' began in..." }, options: { es: ["Estados Unidos", "Alemania", "Inglaterra"], en: ["the United States", "Germany", "England"] }, correctAnswer: { es: "Inglaterra", en: "England" } },
            { question: { es: "El 'Estado' es una organización política que tiene el poder de...", en: "The 'State' is a political organization that has the power to..." }, options: { es: ["crear dinero", "gobernar a la población en un territorio", "hacer la guerra"], en: ["create money", "govern the population in a territory", "wage war"] }, correctAnswer: { es: "gobernar a la población en un territorio", en: "govern the population in a territory" } }
        ]
    },
    {
        id: 10, title: "Nivel 10", passingScore: 0.85,
        questions: [
            { question: { es: "El 'Tratado de Tordesillas' de 1494 dividió las nuevas tierras entre...", en: "The 'Treaty of Tordesillas' of 1494 divided the new lands between..." }, options: { es: ["España y Portugal", "España y Francia", "Inglaterra y Portugal"], en: ["Spain and Portugal", "Spain and France", "England and Portugal"] }, correctAnswer: { es: "España y Portugal", en: "Spain and Portugal" } },
            { question: { es: "La 'línea del Ecuador' divide la Tierra en el hemisferio Norte y el hemisferio...", en: "The 'Equator line' divides the Earth into the Northern Hemisphere and the..." }, options: { es: ["Sur", "Este", "Oeste"], en: ["Southern Hemisphere", "Eastern Hemisphere", "Western Hemisphere"] }, correctAnswer: { es: "Sur", en: "Southern Hemisphere" } },
            { question: { es: "La 'guerra de los Cien Años' fue un conflicto entre...", en: "The 'Hundred Years' War' was a conflict between..." }, options: { es: ["Francia e Inglaterra", "Alemania y Rusia", "España y Portugal"], en: ["France and England", "Germany and Russia", "Spain and Portugal"] }, correctAnswer: { es: "Francia e Inglaterra", en: "France and England" } },
            { question: { es: "El 'Comunismo' es un sistema político y económico que promueve...", en: "'Communism' is a political and economic system that promotes..." }, options: { es: ["la propiedad privada", "la abolición de las clases sociales", "la economía de mercado"], en: ["private property", "the abolition of social classes", "the market economy"] }, correctAnswer: { es: "la abolición de las clases sociales", en: "the abolition of social classes" } },
            { question: { es: "El 'movimiento de los derechos civiles' en EE.UU. fue liderado por...", en: "The 'civil rights movement' in the US was led by..." }, options: { es: ["Malcolm X", "Martin Luther King Jr.", "Rosa Parks"], en: ["Malcolm X", "Martin Luther King Jr.", "Rosa Parks"] }, correctAnswer: { es: "Martin Luther King Jr.", en: "Martin Luther King Jr." } }
        ]
    },
    // Dificultad Avanzada (Niveles 11-20)
    {
        id: 11, title: "Nivel 11", passingScore: 0.85,
        questions: [
            { question: { es: "La 'caída del muro de Berlín' ocurrió en el año...", en: "The 'fall of the Berlin Wall' occurred in the year..." }, options: { es: ["1989", "1991", "2001"], en: ["1989", "1991", "2001"] }, correctAnswer: { es: "1989", en: "1989" } },
            { question: { es: "La 'Triple Alianza' en la Primera Guerra Mundial estaba formada por...", en: "The 'Triple Alliance' in World War I was formed by..." }, options: { es: ["Alemania, Austria-Hungría e Italia", "Francia, Reino Unido y Rusia", "Estados Unidos, Francia y Rusia"], en: ["Germany, Austria-Hungary, and Italy", "France, United Kingdom, and Russia", "United States, France, and Russia"] }, correctAnswer: { es: "Alemania, Austria-Hungría e Italia", en: "Germany, Austria-Hungary, and Italy" } },
            { question: { es: "El 'Imperio Bizantino' tuvo como capital la ciudad de...", en: "The 'Byzantine Empire' had as its capital the city of..." }, options: { es: ["Roma", "Constantinopla", "Atenas"], en: ["Rome", "Constantinople", "Athens"] }, correctAnswer: { es: "Constantinopla", en: "Constantinople" } },
            { question: { es: "El 'Tratado de Maastricht' de 1992 fue el que dio origen a la...", en: "The 'Maastricht Treaty' of 1992 gave rise to the..." }, options: { es: ["OTAN", "Unión Europea", "ONU"], en: ["NATO", "European Union", "UN"] }, correctAnswer: { es: "Unión Europea", en: "European Union" } },
            { question: { es: "La 'Ilustración' fue un movimiento intelectual que promovió...", en: "The 'Enlightenment' was an intellectual movement that promoted..." }, options: { es: ["la fe y la tradición", "el uso de la razón y la ciencia", "la monarquía absoluta"], en: ["faith and tradition", "the use of reason and science", "absolute monarchy"] }, correctAnswer: { es: "el uso de la razón y la ciencia", en: "the use of reason and science" } }
        ]
    },
    {
        id: 12, title: "Nivel 12", passingScore: 0.85,
        questions: [
            { question: { es: "La 'Segunda Guerra Mundial' comenzó en...", en: "The 'Second World War' began in..." }, options: { es: ["1914", "1939", "1945"], en: ["1914", "1939", "1945"] }, correctAnswer: { es: "1939", en: "1939" } },
            { question: { es: "La 'guerra civil española' se desarrolló entre los años...", en: "The 'Spanish Civil War' took place between the years..." }, options: { es: ["1914-1918", "1936-1939", "1945-1949"], en: ["1914-1918", "1936-1939", "1945-1949"] }, correctAnswer: { es: "1936-1939", en: "1936-1939" } },
            { question: { es: "El 'populismo' es una ideología política que apela a...", en: "'Populism' is a political ideology that appeals to..." }, options: { es: ["la clase alta", "el pueblo", "el ejército"], en: ["the upper class", "the people", "the army"] }, correctAnswer: { es: "el pueblo", en: "the people" } },
            { question: { es: "El 'proletariado' es la clase social que, según el marxismo, no posee...", en: "The 'proletariat' is the social class that, according to Marxism, does not own..." }, options: { es: ["propiedad privada", "dinero", "trabajo"], en: ["private property", "money", "work"] }, correctAnswer: { es: "propiedad privada", en: "private property" } },
            { question: { es: "La 'Organización de las Naciones Unidas (ONU)' se fundó en el año...", en: "The 'United Nations (UN)' was founded in the year..." }, options: { es: ["1919", "1945", "1950"], en: ["1919", "1945", "1950"] }, correctAnswer: { es: "1945", en: "1945" } }
        ]
    },
    {
        id: 13, title: "Nivel 13", passingScore: 0.85,
        questions: [
            { question: { es: "El 'Tratado de Roma' de 1957 estableció la...", en: "The 'Treaty of Rome' of 1957 established the..." }, options: { es: ["Comunidad Económica Europea", "OTAN", "ONU"], en: ["European Economic Community", "NATO", "UN"] }, correctAnswer: { es: "Comunidad Económica Europea", en: "European Economic Community" } },
            { question: { es: "El 'Holocausto' fue el genocidio de judíos en la Segunda Guerra Mundial, y fue perpetrado por...", en: "The 'Holocaust' was the genocide of Jews in World War II, and it was perpetrated by..." }, options: { es: ["la URSS", "la Alemania nazi", "el Imperio Japonés"], en: ["the USSR", "Nazi Germany", "the Japanese Empire"] }, correctAnswer: { es: "la Alemania nazi", en: "Nazi Germany" } },
            { question: { es: "La 'Guerra de Vietnam' fue un conflicto entre el Norte (comunista) y el Sur (apoyado por EE.UU.) que duró de...", en: "The 'Vietnam War' was a conflict between the North (communist) and the South (supported by the US) that lasted from..." }, options: { es: ["1955 a 1975", "1960 a 1970", "1950 a 1960"], en: ["1955 to 1975", "1960 to 1970", "1950 to 1960"] }, correctAnswer: { es: "1955 a 1975", en: "1955 to 1975" } },
            { question: { es: "La 'civilización mesopotámica' se desarrolló entre los ríos...", en: "The 'Mesopotamian civilization' developed between the rivers..." }, options: { es: ["Nilo y Tigris", "Tigris y Éufrates", "Ganges e Indo"], en: ["Nile and Tigris", "Tigris and Euphrates", "Ganges and Indus"] }, correctAnswer: { es: "Tigris y Éufrates", en: "Tigris and Euphrates" } },
            { question: { es: "El 'apartheid' fue un sistema de segregación racial en...", en: "'Apartheid' was a system of racial segregation in..." }, options: { es: ["Estados Unidos", "Sudáfrica", "Australia"], en: ["the United States", "South Africa", "Australia"] }, correctAnswer: { es: "Sudáfrica", en: "South Africa" } }
        ]
    },
    {
        id: 14, title: "Nivel 14", passingScore: 0.85,
        questions: [
            { question: { es: "La 'crisis del 29' fue una gran depresión económica que comenzó en...", en: "The 'Crisis of '29' was a great economic depression that began in..." }, options: { es: ["Europa", "Asia", "Estados Unidos"], en: ["Europe", "Asia", "the United States"] }, correctAnswer: { es: "Estados Unidos", en: "the United States" } },
            { question: { es: "El 'socialismo utópico' se diferencia del científico en que...", en: "'Utopian socialism' differs from scientific socialism in that..." }, options: { es: ["es más violento", "no se basa en el estudio de la sociedad", "promueve el libre mercado"], en: ["it is more violent", "it is not based on the study of society", "it promotes the free market"] }, correctAnswer: { es: "no se basa en el estudio de la sociedad", en: "it is not based on the study of society" } },
            { question: { es: "El 'derecho consuetudinario' se basa en...", en: "'Common law' is based on..." }, options: { es: ["leyes escritas", "la costumbre", "la jurisprudencia"], en: ["written laws", "custom", "jurisprudence"] }, correctAnswer: { es: "la costumbre", en: "custom" } },
            { question: { es: "La 'cultura de la antigua Grecia' se divide en varios periodos, el último es el...", en: "The 'culture of ancient Greece' is divided into several periods, the last one is the..." }, options: { es: ["arcaico", "clásico", "helenístico"], en: ["Archaic", "Classical", "Hellenistic"] }, correctAnswer: { es: "helenístico", en: "Hellenistic" } },
            { question: { es: "El 'tratado de libre comercio' es un acuerdo entre países para...", en: "A 'free trade agreement' is an agreement between countries to..." }, options: { es: ["prohibir el comercio", "reducir aranceles y barreras comerciales", "aumentar los impuestos"], en: ["prohibit trade", "reduce tariffs and trade barriers", "increase taxes"] }, correctAnswer: { es: "reducir aranceles y barreras comerciales", en: "reduce tariffs and trade barriers" } }
        ]
    },
    {
        id: 15, title: "Nivel 15", passingScore: 0.85,
        questions: [
            { question: { es: "El 'feudalismo' es un sistema político y económico basado en la relación entre...", en: "'Feudalism' is a political and economic system based on the relationship between..." }, options: { es: ["el rey y el pueblo", "el señor feudal y los vasallos", "el Estado y la Iglesia"], en: ["the king and the people", "the feudal lord and the vassals", "the State and the Church"] }, correctAnswer: { es: "el señor feudal y los vasallos", en: "the feudal lord and the vassals" } },
            { question: { es: "La 'Peste Negra' del siglo XIV fue una pandemia que afectó a...", en: "The 'Black Death' of the 14th century was a pandemic that affected..." }, options: { es: ["América", "Europa y Asia", "África"], en: ["America", "Europe and Asia", "Africa"] }, correctAnswer: { es: "Europa y Asia", en: "Europe and Asia" } },
            { question: { es: "La 'guerra de las Rosas' fue un conflicto dinástico en...", en: "The 'War of the Roses' was a dynastic conflict in..." }, options: { es: ["Francia", "Inglaterra", "Alemania"], en: ["France", "England", "Germany"] }, correctAnswer: { es: "Inglaterra", en: "England" } },
            { question: { es: "El 'cisma de Oriente y Occidente' de 1054 dividió a la Iglesia en...", en: "The 'East-West Schism' of 1054 divided the Church into..." }, options: { es: ["Católica y Protestante", "Ortodoxa y Católica", "Anglicana y Católica"], en: ["Catholic and Protestant", "Orthodox and Catholic", "Anglican and Catholic"] }, correctAnswer: { es: "Ortodoxa y Católica", en: "Orthodox and Catholic" } },
            { question: { es: "El 'movimiento de los no alineados' fue un grupo de países que se oponía a...", en: "The 'Non-Aligned Movement' was a group of countries that opposed..." }, options: { es: ["el colonialismo", "la guerra fría", "la globalización"], en: ["colonialism", "the Cold War", "globalization"] }, correctAnswer: { es: "la guerra fría", en: "the Cold War" } }
        ]
    },
    // Dificultad Experto (Niveles 16-30)
    {
        id: 16, title: "Nivel 16", passingScore: 0.9,
        questions: [
            { question: { es: "El 'capitalismo de Estado' es un sistema en el que el Estado tiene un papel fundamental en la...", en: "'State capitalism' is a system in which the state plays a fundamental role in the..." }, options: { es: ["economía", "religión", "cultura"], en: ["economy", "religion", "culture"] }, correctAnswer: { es: "economía", en: "economy" } },
            { question: { es: "La 'Primavera Árabe' fue una serie de levantamientos populares que ocurrieron en...", en: "The 'Arab Spring' was a series of popular uprisings that occurred in..." }, options: { es: ["los años 60", "los años 80", "el año 2010"], en: ["the 60s", "the 80s", "the year 2010"] }, correctAnswer: { es: "el año 2010", en: "the year 2010" } },
            { question: { es: "¿Qué río atraviesa la ciudad de Roma?", en: "Which river flows through the city of Rome?" }, options: { es: ["El Sena", "El Támesis", "El Tíber"], en: ["The Seine", "The Thames", "The Tiber"] }, correctAnswer: { es: "El Tíber", en: "The Tiber" } },
            { question: { es: "El 'genocidio de Ruanda' de 1994 fue un conflicto étnico entre...", en: "The 'Rwandan genocide' of 1994 was an ethnic conflict between..." }, options: { es: ["tutsi y hutu", "serbios y croatas", "judíos y alemanes"], en: ["Tutsi and Hutu", "Serbs and Croats", "Jews and Germans"] }, correctAnswer: { es: "tutsi y hutu", en: "Tutsi and Hutu" } },
            { question: { es: "El 'consenso de Washington' fue un conjunto de políticas económicas promovidas por...", en: "The 'Washington Consensus' was a set of economic policies promoted by..." }, options: { es: ["la ONU", "los países desarrollados", "el Fondo Monetario Internacional y el Banco Mundial"], en: ["the UN", "developed countries", "the International Monetary Fund and the World Bank"] }, correctAnswer: { es: "el Fondo Monetario Internacional y el Banco Mundial", en: "the International Monetary Fund and the World Bank" } }
        ]
    },
    {
        id: 17, title: "Nivel 17", passingScore: 0.9,
        questions: [
            { question: { es: "La 'Revolución Rusa' de 1917 derrocó al zarismo e instauró...", en: "The 'Russian Revolution' of 1917 overthrew tsarism and established..." }, options: { es: ["el comunismo", "la democracia", "la monarquía"], en: ["communism", "democracy", "monarchy"] }, correctAnswer: { es: "el comunismo", en: "communism" } },
            { question: { es: "La 'guerra del Opio' fue un conflicto entre...", en: "The 'Opium War' was a conflict between..." }, options: { es: ["China y Francia", "China y Reino Unido", "Japón y China"], en: ["China and France", "China and the United Kingdom", "Japan and China"] }, correctAnswer: { es: "China y Reino Unido", en: "China and the United Kingdom" } },
            { question: { es: "La 'diáspora' es la dispersión de un pueblo, y la más conocida es la del pueblo...", en: "The 'diaspora' is the dispersion of a people, and the best known is that of the..." }, options: { es: ["romano", "judío", "griego"], en: ["Roman people", "Jewish people", "Greek people"] }, correctAnswer: { es: "judío", en: "Jewish people" } },
            { question: { es: "La 'Liga de las Naciones' fue una organización internacional creada después de...", en: "The 'League of Nations' was an international organization created after..." }, options: { es: ["la Primera Guerra Mundial", "la Segunda Guerra Mundial", "la Guerra Fría"], en: ["World War I", "World War II", "the Cold War"] }, correctAnswer: { es: "la Primera Guerra Mundial", en: "World War I" } },
            { question: { es: "El 'Tratado de Utrecht' de 1713 puso fin a...", en: "The 'Treaty of Utrecht' of 1713 ended..." }, options: { es: ["la guerra de los Cien Años", "la guerra de Sucesión Española", "la guerra de los Treinta Años"], en: ["the Hundred Years' War", "the War of the Spanish Succession", "the Thirty Years' War"] }, correctAnswer: { es: "la guerra de Sucesión Española", en: "the War of the Spanish Succession" } }
        ]
    },
    {
        id: 18, title: "Nivel 18", passingScore: 0.9,
        questions: [
            { question: { es: "El 'plan Marshall' fue un programa de ayuda económica para reconstruir...", en: "The 'Marshall Plan' was an economic aid program to rebuild..." }, options: { es: ["Japón", "Europa Occidental", "Europa Oriental"], en: ["Japan", "Western Europe", "Eastern Europe"] }, correctAnswer: { es: "Europa Occidental", en: "Western Europe" } },
            { question: { es: "La 'OTAN' es una alianza militar que se creó en 1949 para hacer frente a...", en: "'NATO' is a military alliance that was created in 1949 to confront..." }, options: { es: ["la amenaza del nazismo", "la expansión del comunismo", "el terrorismo"], en: ["the threat of Nazism", "the expansion of communism", "terrorism"] }, correctAnswer: { es: "la expansión del comunismo", en: "the expansion of communism" } },
            { question: { es: "La 'globalización' es un proceso de interacción e integración entre personas, empresas y gobiernos de diferentes...", en: "'Globalization' is a process of interaction and integration between people, companies, and governments of different..." }, options: { es: ["países", "regiones", "continentes"], en: ["countries", "regions", "continents"] }, correctAnswer: { es: "países", en: "countries" } },
            { question: { es: "El 'capitalismo financiero' se caracteriza por la importancia de...", en: "'Financial capitalism' is characterized by the importance of..." }, options: { es: ["la industria", "el capital bancario y especulativo", "la agricultura"], en: ["industry", "banking and speculative capital", "agriculture"] }, correctAnswer: { es: "el capital bancario y especulativo", en: "banking and speculative capital" } },
            { question: { es: "La 'Guerra de Corea' dividió a la península en Corea del Norte (comunista) y Corea del Sur (capitalista) en el año...", en: "The 'Korean War' divided the peninsula into North Korea (communist) and South Korea (capitalist) in the year..." }, options: { es: ["1945", "1950", "1953"], en: ["1945", "1950", "1953"] }, correctAnswer: { es: "1953", en: "1953" } }
        ]
    },
    {
        id: 19, title: "Nivel 19", passingScore: 0.95,
        questions: [
            { question: { es: "La 'doctrina Monroe' de 1823 estableció que...", en: "The 'Monroe Doctrine' of 1823 established that..." }, options: { es: ["Europa debía colonizar América", "América era para los europeos", "América era para los americanos"], en: ["Europe should colonize America", "America was for Europeans", "America was for Americans"] }, correctAnswer: { es: "América era para los americanos", en: "America was for Americans" } },
            { question: { es: "La 'Batalla de Stalingrado' fue un punto de inflexión en la Segunda Guerra Mundial, y fue una derrota para...", en: "The 'Battle of Stalingrad' was a turning point in World War II, and it was a defeat for..." }, options: { es: ["Alemania", "la URSS", "Reino Unido"], en: ["Germany", "the USSR", "the United Kingdom"] }, correctAnswer: { es: "Alemania", en: "Germany" } },
            { question: { es: "La 'guerra de los Seis Días' de 1967 fue un conflicto entre Israel y...", en: "The 'Six-Day War' of 1967 was a conflict between Israel and..." }, options: { es: ["Egipto, Jordania y Siria", "Irán e Irak", "Líbano y Siria"], en: ["Egypt, Jordan, and Syria", "Iran and Iraq", "Lebanon and Syria"] }, correctAnswer: { es: "Egipto, Jordania y Siria", en: "Egypt, Jordan, and Syria" } },
            { question: { es: "La 'Edad de los Metales' se divide en Edad del Cobre, Edad del Bronce y Edad del...", en: "The 'Metal Age' is divided into the Copper Age, the Bronze Age, and the..." }, options: { es: ["Hierro", "Oro", "Plata"], en: ["Iron Age", "Gold Age", "Silver Age"] }, correctAnswer: { es: "Hierro", en: "Iron Age" } },
            { question: { es: "La 'República de Weimar' fue un régimen democrático que existió en Alemania entre...", en: "The 'Weimar Republic' was a democratic regime that existed in Germany between..." }, options: { es: ["1918 y 1933", "1933 y 1945", "1945 y 1989"], en: ["1918 and 1933", "1933 and 1945", "1945 and 1989"] }, correctAnswer: { es: "1918 y 1933", en: "1918 and 1933" } }
        ]
    },
    {
        id: 20, title: "Nivel 20", passingScore: 0.95,
        questions: [
            { question: { es: "La 'Organización Mundial del Comercio (OMC)' es una organización que regula...", en: "The 'World Trade Organization (WTO)' is an organization that regulates..." }, options: { es: ["la política mundial", "el comercio internacional", "la inmigración"], en: ["world politics", "international trade", "immigration"] }, correctAnswer: { es: "el comercio internacional", en: "international trade" } },
            { question: { es: "El 'Muro de las Lamentaciones' es un lugar sagrado para los judíos y se encuentra en...", en: "The 'Wailing Wall' is a sacred place for Jews and is located in..." }, options: { es: ["Roma", "Jerusalén", "El Cairo"], en: ["Rome", "Jerusalem", "Cairo"] }, correctAnswer: { es: "Jerusalén", en: "Jerusalem" } },
            { question: { es: "La 'guerra de la Independencia de los Estados Unidos' comenzó en el año...", en: "The 'American Revolutionary War' began in the year..." }, options: { es: ["1776", "1789", "1812"], en: ["1776", "1789", "1812"] }, correctAnswer: { es: "1776", en: "1776" } },
            { question: { es: "La 'civilización persa' se desarrolló en el actual territorio de...", en: "The 'Persian civilization' developed in the present-day territory of..." }, options: { es: ["Turquía", "Irán", "Irak"], en: ["Turkey", "Iran", "Iraq"] }, correctAnswer: { es: "Irán", en: "Iran" } },
            { question: { es: "El 'fascismo' es una ideología política que promueve el nacionalismo extremo y...", en: "'Fascism' is a political ideology that promotes extreme nationalism and..." }, options: { es: ["la democracia", "el totalitarismo", "el socialismo"], en: ["democracy", "totalitarianism", "socialism"] }, correctAnswer: { es: "el totalitarismo", en: "totalitarianism" } }
        ]
    },
    // Dificultad Experto (Niveles 21-30)
    {
        id: 21, title: "Nivel 21", passingScore: 0.95,
        questions: [
            { question: { es: "La 'Guerra de los Treinta Años' (1618-1648) fue un conflicto principalmente religioso y político que se desarrolló en...", en: "The 'Thirty Years' War' (1618-1648) was a primarily religious and political conflict that took place in..." }, options: { es: ["América", "Asia", "Europa"], en: ["America", "Asia", "Europe"] }, correctAnswer: { es: "Europa", en: "Europe" } },
            { question: { es: "El 'Tratado de Westfalia' de 1648 puso fin a la Guerra de los Treinta Años y estableció el principio de...", en: "The 'Peace of Westphalia' of 1648 ended the Thirty Years' War and established the principle of..." }, options: { es: ["soberanía estatal", "autodeterminación", "libertad de comercio"], en: ["state sovereignty", "self-determination", "free trade"] }, correctAnswer: { es: "soberanía estatal", en: "state sovereignty" } },
            { question: { es: "La 'Dinastía Ming' (1368-1644) fue una de las más importantes en la historia de...", en: "The 'Ming Dynasty' (1368-1644) was one of the most important in the history of..." }, options: { es: ["Japón", "China", "Corea"], en: ["Japan", "China", "Korea"] }, correctAnswer: { es: "China", en: "China" } },
            { question: { es: "La 'guerra de Secesión' de EE.UU. fue un conflicto entre los estados del Norte (Unión) y los del Sur (Confederación) que se desarrolló de...", en: "The 'American Civil War' was a conflict between the Northern states (Union) and the Southern states (Confederacy) that took place from..." }, options: { es: ["1861 a 1865", "1850 a 1855", "1870 a 1875"], en: ["1861 to 1865", "1850 to 1855", "1870 to 1875"] }, correctAnswer: { es: "1861 a 1865", en: "1861 to 1865" } },
            { question: { es: "El 'Estado del bienestar' es un modelo de organización social que busca asegurar el bienestar de los ciudadanos a través de...", en: "The 'welfare state' is a model of social organization that seeks to ensure the well-being of citizens through..." }, options: { es: ["servicios públicos", "el libre mercado", "la caridad"], en: ["public services", "the free market", "charity"] }, correctAnswer: { es: "servicios públicos", en: "public services" } }
        ]
    },
    {
        id: 22, title: "Nivel 22", passingScore: 1.0,
        questions: [
            { question: { es: "La 'Revolución Gloriosa' de 1688 en Inglaterra estableció una monarquía...", en: "The 'Glorious Revolution' of 1688 in England established a..." }, options: { es: ["absoluta", "parlamentaria", "federal"], en: ["absolute monarchy", "parliamentary monarchy", "federal monarchy"] }, correctAnswer: { es: "parlamentaria", en: "parliamentary monarchy" } },
            { question: { es: "El 'proceso de descolonización' se desarrolló principalmente después de...", en: "The 'decolonization process' mainly took place after..." }, options: { es: ["la Primera Guerra Mundial", "la Segunda Guerra Mundial", "la Guerra Fría"], en: ["World War I", "World War II", "the Cold War"] }, correctAnswer: { es: "la Segunda Guerra Mundial", en: "World War II" } },
            { question: { es: "La 'doctrina Truman' de 1947 se enfocó en contener la expansión de...", en: "The 'Truman Doctrine' of 1947 focused on containing the expansion of..." }, options: { es: ["el fascismo", "el comunismo", "la globalización"], en: ["fascism", "communism", "globalization"] }, correctAnswer: { es: "el comunismo", en: "communism" } },
            { question: { es: "El 'tratado de libre comercio de América del Norte (TLCAN)' fue un acuerdo entre...", en: "The 'North American Free Trade Agreement (NAFTA)' was an agreement between..." }, options: { es: ["México, EE.UU. y Canadá", "EE.UU., Brasil y Argentina", "Canadá, México y China"], en: ["Mexico, the US, and Canada", "the US, Brazil, and Argentina", "Canada, Mexico, and China"] }, correctAnswer: { es: "México, EE.UU. y Canadá", en: "Mexico, the US, and Canada" } },
            { question: { es: "La 'Comuna de París' de 1871 fue un gobierno revolucionario y efímero que se estableció en...", en: "The 'Paris Commune' of 1871 was a revolutionary and short-lived government established in..." }, options: { es: ["Moscú", "París", "Londres"], en: ["Moscow", "Paris", "London"] }, correctAnswer: { es: "París", en: "Paris" } }
        ]
    },
    {
        id: 23, title: "Nivel 23", passingScore: 1.0,
        questions: [
            { question: { es: "La 'Guerra de las Galaxias' (Strategic Defense Initiative) fue un programa de defensa propuesto por...", en: "'Star Wars' (Strategic Defense Initiative) was a defense program proposed by..." }, options: { es: ["Ronald Reagan", "George Bush", "John F. Kennedy"], en: ["Ronald Reagan", "George Bush", "John F. Kennedy"] }, correctAnswer: { es: "Ronald Reagan", en: "Ronald Reagan" } },
            { question: { es: "El 'populismo de derecha' se caracteriza por un fuerte nacionalismo, un líder carismático y una retórica anti...", en: "'Right-wing populism' is characterized by strong nationalism, a charismatic leader, and anti-..." }, options: { es: ["izquierdista", "socialista", "inmigrante"], en: ["leftist rhetoric", "socialist rhetoric", "immigrant rhetoric"] }, correctAnswer: { es: "inmigrante", en: "immigrant rhetoric" } },
            { question: { es: "La 'teoría de la dependencia' es una teoría económica que explica el subdesarrollo de los países periféricos como resultado de su relación con...", en: "'Dependency theory' is an economic theory that explains the underdevelopment of peripheral countries as a result of their relationship with..." }, options: { es: ["los países desarrollados", "el colonialismo", "la globalización"], en: ["developed countries", "colonialism", "globalization"] }, correctAnswer: { es: "los países desarrollados", en: "developed countries" } },
            { question: { es: "El 'Estado Islámico (ISIS)' es un grupo yihadista que busca establecer un califato en el...", en: "The 'Islamic State (ISIS)' is a jihadist group that seeks to establish a caliphate in the..." }, options: { es: ["Oriente Medio", "Norte de África", "Sureste Asiático"], en: ["Middle East", "North Africa", "Southeast Asia"] }, correctAnswer: { es: "Oriente Medio", en: "Middle East" } },
            { question: { es: "La 'Pax Romana' fue un periodo de paz y prosperidad en el Imperio Romano que duró aproximadamente...", en: "The 'Pax Romana' was a period of peace and prosperity in the Roman Empire that lasted approximately..." }, options: { es: ["50 años", "100 años", "200 años"], en: ["50 years", "100 years", "200 years"] }, correctAnswer: { es: "200 años", en: "200 years" } }
        ]
    },
    {
        id: 24, title: "Nivel 24", passingScore: 1.0,
        questions: [
            { question: { es: "La 'guerra del Golfo' de 1991 fue una operación militar para liberar a Kuwait de la invasión de...", en: "The 'Gulf War' of 1991 was a military operation to liberate Kuwait from the invasion of..." }, options: { es: ["Irán", "Irak", "Siria"], en: ["Iran", "Iraq", "Syria"] }, correctAnswer: { es: "Irak", en: "Iraq" } },
            { question: { es: "El 'movimiento sufragista' luchó por el derecho de las mujeres a...", en: "The 'suffragist movement' fought for the right of women to..." }, options: { es: ["votar", "trabajar", "estudiar"], en: ["vote", "work", "study"] }, correctAnswer: { es: "votar", en: "vote" } },
            { question: { es: "La 'Revolución Cultural China' de los años 60 fue una campaña liderada por Mao Zedong para eliminar los elementos capitalistas y tradicionales de la sociedad, y fue un periodo de...", en: "The 'Chinese Cultural Revolution' of the 1960s was a campaign led by Mao Zedong to eliminate capitalist and traditional elements from society, and it was a period of..." }, options: { es: ["gran crecimiento económico", "violencia y purgas", "democracia"], en: ["great economic growth", "violence and purges", "democracy"] }, correctAnswer: { es: "violencia y purgas", en: "violence and purges" } },
            { question: { es: "El 'neoliberalismo' es una teoría económica y política que promueve la libertad de mercado y la privatización de...", en: "'Neoliberalism' is an economic and political theory that promotes market freedom and the privatization of..." }, options: { es: ["las empresas públicas", "la educación", "la salud"], en: ["public companies", "education", "health"] }, correctAnswer: { es: "las empresas públicas", en: "public companies" } },
            { question: { es: "La 'Liga Hanseática' fue una federación de ciudades comerciales que controló el comercio en el Mar Báltico y el Mar del Norte durante la...", en: "The 'Hanseatic League' was a federation of merchant cities that controlled trade in the Baltic and North Seas during the..." }, options: { es: ["Edad Media", "Edad Moderna", "Edad Contemporánea"], en: ["Middle Ages", "Modern Age", "Contemporary Age"] }, correctAnswer: { es: "Edad Media", en: "Middle Ages" } }
        ]
    },
    {
        id: 25, title: "Nivel 25", passingScore: 1.0,
        questions: [
            { question: { es: "La 'guerra de los Balcanes' de los años 90 resultó en la desintegración de...", en: "The 'Balkan Wars' of the 1990s resulted in the disintegration of..." }, options: { es: ["Checoslovaquia", "la URSS", "Yugoslavia"], en: ["Czechoslovakia", "the USSR", "Yugoslavia"] }, correctAnswer: { es: "Yugoslavia", en: "Yugoslavia" } },
            { question: { es: "El 'Tratado de Niza' de 2001 modificó el sistema de toma de decisiones en la...", en: "The 'Treaty of Nice' of 2001 modified the decision-making system in the..." }, options: { es: ["ONU", "Unión Europea", "OTAN"], en: ["UN", "European Union", "NATO"] }, correctAnswer: { es: "Unión Europea", en: "European Union" } },
            { question: { es: "La 'sociedad de la información' es una sociedad en la que la creación, distribución y manipulación de la información juega un papel importante en la...", en: "The 'information society' is a society in which the creation, distribution, and manipulation of information plays an important role in..." }, options: { es: ["vida política", "vida económica y cultural", "vida religiosa"], en: ["political life", "economic and cultural life", "religious life"] }, correctAnswer: { es: "vida económica y cultural", en: "economic and cultural life" } },
            { question: { es: "La 'doctrina de la seguridad nacional' es una doctrina militar que surgió en la Guerra Fría y se basa en la idea de que la seguridad de un Estado es una prioridad sobre...", en: "The 'national security doctrine' is a military doctrine that emerged in the Cold War and is based on the idea that a state's security is a priority over..." }, options: { es: ["la economía", "los derechos humanos", "la cultura"], en: ["the economy", "human rights", "culture"] }, correctAnswer: { es: "los derechos humanos", en: "human rights" } },
            { question: { es: "La 'Guerra de los Treinta Años' terminó con la firma de la...", en: "The 'Thirty Years' War' ended with the signing of the..." }, options: { es: ["Paz de Westfalia", "Paz de París", "Paz de Versalles"], en: ["Peace of Westphalia", "Peace of Paris", "Treaty of Versailles"] }, correctAnswer: { es: "Paz de Westfalia", en: "Peace of Westphalia" } }
        ]
    },
    {
        id: 26, title: "Nivel 26", passingScore: 1.0,
        questions: [
            { question: { es: "La 'teoría de la conspiración' se refiere a la creencia en que un evento o situación es el resultado de un plan secreto de un grupo de...", en: "A 'conspiracy theory' refers to the belief that an event or situation is the result of a secret plan by a group of..." }, options: { es: ["políticos", "gente influyente", "conspiradores"], en: ["politicians", "influential people", "conspirators"] }, correctAnswer: { es: "conspiradores", en: "conspirators" } },
            { question: { es: "El 'estado laico' es un estado que no tiene una...", en: "A 'secular state' is a state that does not have an..." }, options: { es: ["religión oficial", "constitución", "monarquía"], en: ["official religion", "constitution", "monarchy"] }, correctAnswer: { es: "religión oficial", en: "official religion" } },
            { question: { es: "La 'política de contención' fue una estrategia de EE.UU. durante la Guerra Fría para prevenir la expansión del...", en: "The 'containment policy' was a US strategy during the Cold War to prevent the expansion of..." }, options: { es: ["fascismo", "comunismo", "imperialismo"], en: ["fascism", "communism", "imperialism"] }, correctAnswer: { es: "comunismo", en: "communism" } },
            { question: { es: "El 'tratado de Kioto' de 1997 fue un acuerdo para reducir las emisiones de...", en: "The 'Kyoto Protocol' of 1997 was an agreement to reduce emissions of..." }, options: { es: ["dióxido de carbono", "óxidos de nitrógeno", "clorofluorocarbonos"], en: ["carbon dioxide", "nitrogen oxides", "chlorofluorocarbons"] }, correctAnswer: { es: "dióxido de carbono", en: "carbon dioxide" } },
            { question: { es: "La 'diplomacia' es la práctica de gestionar las relaciones internacionales a través de...", en: "'Diplomacy' is the practice of managing international relations through..." }, options: { es: ["la guerra", "la negociación", "la fuerza"], en: ["war", "negotiation", "force"] }, correctAnswer: { es: "la negociación", en: "negotiation" } }
        ]
    },
    {
        id: 27, title: "Nivel 27", passingScore: 1.0,
        questions: [
            { question: { es: "La 'Gran Depresión' (1929) se caracterizó por una gran caída de...", en: "The 'Great Depression' (1929) was characterized by a major drop in..." }, options: { es: ["la producción y el empleo", "la temperatura global", "la natalidad"], en: ["production and employment", "global temperature", "the birth rate"] }, correctAnswer: { es: "la producción y el empleo", en: "production and employment" } },
            { question: { es: "La 'doctrina de shock' es una teoría que sostiene que los desastres naturales o las crisis políticas se utilizan para imponer políticas económicas...", en: "The 'shock doctrine' is a theory that holds that natural disasters or political crises are used to impose..." }, options: { es: ["neoliberales", "socialistas", "proteccionistas"], en: ["neoliberal economic policies", "socialist economic policies", "protectionist economic policies"] }, correctAnswer: { es: "neoliberales", en: "neoliberal economic policies" } },
            { question: { es: "El 'populismo de izquierda' se caracteriza por un discurso que apela a la clase trabajadora y promueve políticas...", en: "'Left-wing populism' is characterized by a discourse that appeals to the working class and promotes..." }, options: { es: ["de libre mercado", "de redistribución de la riqueza", "proteccionistas"], en: ["free market policies", "wealth redistribution policies", "protectionist policies"] }, correctAnswer: { es: "de redistribución de la riqueza", en: "wealth redistribution policies" } },
            { question: { es: "La 'teoría del fin de la historia' de Francis Fukuyama sostiene que la democracia liberal y la economía de mercado son el punto final de la evolución...", en: "Francis Fukuyama's 'end of history theory' holds that liberal democracy and the market economy are the final point of..." }, options: { es: ["social", "política e ideológica", "tecnológica"], en: ["social evolution", "political and ideological evolution", "technological evolution"] }, correctAnswer: { es: "política e ideológica", en: "political and ideological evolution" } },
            { question: { es: "El 'cisma de Occidente' (1378-1417) fue una división de la Iglesia Católica en la que había dos o tres...", en: "The 'Western Schism' (1378-1417) was a split within the Catholic Church in which there were two or three..." }, options: { es: ["papas", "reyes", "emperadores"], en: ["popes", "kings", "emperors"] }, correctAnswer: { es: "papas", en: "popes" } }
        ]
    },
    {
        id: 28, title: "Nivel 28", passingScore: 1.0,
        questions: [
            { question: { es: "La 'guerra civil de Siria' es un conflicto que comenzó en el año...", en: "The 'Syrian civil war' is a conflict that began in the year..." }, options: { es: ["2001", "2011", "2014"], en: ["2001", "2011", "2014"] }, correctAnswer: { es: "2011", en: "2011" } },
            { question: { es: "La 'doctrina de seguridad humana' se enfoca en la protección de los individuos en lugar de la protección de...", en: "The 'human security doctrine' focuses on the protection of individuals rather than the protection of..." }, options: { es: ["los Estados", "las empresas", "la religión"], en: ["States", "companies", "religion"] }, correctAnswer: { es: "los Estados", en: "States" } },
            { question: { es: "El 'Maoísmo' es una variante del marxismo-leninismo que se adaptó a las condiciones de la China de...", en: "'Maoism' is a variant of Marxism-Leninism that was adapted to the conditions of..." }, options: { es: ["la industria", "la agricultura", "el comercio"], en: ["industrial China", "agricultural China", "commercial China"] }, correctAnswer: { es: "la agricultura", en: "agricultural China" } },
            { question: { es: "La 'primavera de Praga' de 1968 fue un intento de liberalización política en Checoslovaquia que fue reprimido por...", en: "The 'Prague Spring' of 1968 was an attempt at political liberalization in Czechoslovakia that was suppressed by..." }, options: { es: ["la OTAN", "la URSS", "EE.UU."], en: ["NATO", "the USSR", "the US"] }, correctAnswer: { es: "la URSS", en: "the USSR" } },
            { question: { es: "El 'Tratado de Lisboa' de 2007 modificó los tratados de la Unión Europea y le dio más poder al...", en: "The 'Treaty of Lisbon' of 2007 amended the treaties of the European Union and gave more power to the..." }, options: { es: ["Parlamento Europeo", "Consejo Europeo", "Presidente de la Comisión"], en: ["European Parliament", "European Council", "President of the Commission"] }, correctAnswer: { es: "Parlamento Europeo", en: "European Parliament" } }
        ]
    },
    {
        id: 29, title: "Nivel 29", passingScore: 1.0,
        questions: [
            { question: { es: "La 'crisis de los misiles de Cuba' de 1962 fue un enfrentamiento entre EE.UU. y la URSS por la instalación de misiles nucleares en...", en: "The 'Cuban Missile Crisis' of 1962 was a confrontation between the US and the USSR over the installation of nuclear missiles in..." }, options: { es: ["México", "Cuba", "Puerto Rico"], en: ["Mexico", "Cuba", "Puerto Rico"] }, correctAnswer: { es: "Cuba", en: "Cuba" } },
            { question: { es: "La 'guerra de los Balcanes' de los años 90 fue un conflicto que se originó por la desintegración de...", en: "The 'Balkan Wars' of the 1990s was a conflict that originated from the disintegration of..." }, options: { es: ["la URSS", "Yugoslavia", "Checoslovaquia"], en: ["the USSR", "Yugoslavia", "Czechoslovakia"] }, correctAnswer: { es: "Yugoslavia", en: "Yugoslavia" } },
            { question: { es: "La 'Revolución Naranja' de 2004 fue un movimiento de protesta en Ucrania contra el fraude en las...", en: "The 'Orange Revolution' of 2004 was a protest movement in Ukraine against fraud in the..." }, options: { es: ["elecciones presidenciales", "elecciones parlamentarias", "elecciones locales"], en: ["presidential elections", "parliamentary elections", "local elections"] }, correctAnswer: { es: "elecciones presidenciales", en: "presidential elections" } },
            { question: { es: "La 'doctrina Brezhnev' de la URSS establecía que Moscú tenía derecho a intervenir en los asuntos de los países socialistas para defender el...", en: "The 'Brezhnev Doctrine' of the USSR established that Moscow had the right to intervene in the affairs of socialist countries to defend..." }, options: { es: ["capitalismo", "socialismo", "nacionalismo"], en: ["capitalism", "socialism", "nationalism"] }, correctAnswer: { es: "socialismo", en: "socialism" } },
            { question: { es: "El 'movimiento 15-M' o 'Indignados' fue un movimiento de protesta en España que surgió en el año...", en: "The '15-M Movement' or 'Indignados' was a protest movement in Spain that emerged in the year..." }, options: { es: ["2008", "2011", "2014"], en: ["2008", "2011", "2014"] }, correctAnswer: { es: "2011", en: "2011" } }
        ]
    },
    {
        id: 30, title: "Nivel 30", passingScore: 1.0,
        questions: [
            { question: { es: "El 'acuerdo de paz de Dayton' de 1995 puso fin a la guerra de...", en: "The 'Dayton Peace Agreement' of 1995 ended the war in..." }, options: { es: ["Croacia", "Serbia", "Bosnia"], en: ["Croatia", "Serbia", "Bosnia"] }, correctAnswer: { es: "Bosnia", en: "Bosnia" } },
            { question: { es: "La 'Revolución Industrial' fue un proceso de transformación económica y social que comenzó en el siglo...", en: "The 'Industrial Revolution' was a process of economic and social transformation that began in the..." }, options: { es: ["XVI", "XVIII", "XX"], en: ["16th century", "18th century", "20th century"] }, correctAnswer: { es: "XVIII", en: "18th century" } },
            { question: { es: "La 'teoría de la conspiración' de 'chemtrails' sostiene que las estelas de los aviones son en realidad productos químicos para...", en: "The 'chemtrails' conspiracy theory holds that airplane contrails are actually chemicals for..." }, options: { es: ["controlar el clima", "controlar la población", "controlar las mentes"], en: ["weather control", "population control", "mind control"] }, correctAnswer: { es: "controlar el clima", en: "weather control" } },
            { question: { es: "La 'diplomacia del dólar' fue una política exterior de EE.UU. en América Latina que consistía en el uso del poder económico y financiero para...", en: "'Dollar diplomacy' was a US foreign policy in Latin America that consisted of using economic and financial power to..." }, options: { es: ["promover la democracia", "proteger los intereses de EE.UU.", "promover el socialismo"], en: ["promote democracy", "protect US interests", "promote socialism"] }, correctAnswer: { es: "proteger los intereses de EE.UU.", en: "protect US interests" } },
            { question: { es: "La 'teoría del desarrollo sostenible' es un enfoque que busca un equilibrio entre el crecimiento económico, la protección del medio ambiente y la...", en: "'Sustainable development theory' is an approach that seeks a balance between economic growth, environmental protection, and..." }, options: { es: ["equidad social", "política", "religión"], en: ["social equity", "politics", "religion"] }, correctAnswer: { es: "equidad social", en: "social equity" } }
        ]
    }
];