const questions = [
    {
        question: '¿En qué país se encuentra la Gran Muralla China?',
        options: ['Japón', 'China', 'Corea del Sur', 'Vietnam'],
        correctAnswer: 'China',
        difficulty: 'easy'
    },
    {
        question: '¿Cuál es el océano más grande del mundo?',
        options: ['Océano Atlántico', 'Océano Índico', 'Océano Ártico', 'Océano Pacífico'],
        correctAnswer: 'Océano Pacífico',
        difficulty: 'easy'
    },
    {
        question: '¿Cuántos huesos tiene un esqueleto humano adulto?',
        options: ['206', '210', '198', '200'],
        correctAnswer: '206',
        difficulty: 'easy'
    },
    {
        question: '¿Quién pintó la Mona Lisa?',
        options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Claude Monet'],
        correctAnswer: 'Leonardo da Vinci',
        difficulty: 'easy'
    },
    {
        question: '¿Cuál es el planeta más cercano al sol?',
        options: ['Marte', 'Tierra', 'Mercurio', 'Venus'],
        correctAnswer: 'Mercurio',
        difficulty: 'easy'
    },
    {
        question: '¿En qué año llegó el hombre a la luna?',
        options: ['1965', '1969', '1972', '1980'],
        correctAnswer: '1969',
        difficulty: 'easy'
    },
    {
        question: '¿Cuál es el animal terrestre más grande del mundo?',
        options: ['Elefante africano', 'Rinoceronte blanco', 'Jirafa', 'Hipopótamo'],
        correctAnswer: 'Elefante africano',
        difficulty: 'easy'
    },
    {
        question: '¿Qué país es conocido como la "Tierra del Sol Naciente"?',
        options: ['China', 'Japón', 'Tailandia', 'Vietnam'],
        correctAnswer: 'Japón',
        difficulty: 'easy'
    },
    {
        question: '¿Cuál es la capital de Australia?',
        options: ['Sídney', 'Melbourne', 'Canberra', 'Brisbane'],
        correctAnswer: 'Canberra',
        difficulty: 'medium'
    },
    {
        question: '¿Qué gas es el más abundante en la atmósfera de la Tierra?',
        options: ['Oxígeno', 'Dióxido de carbono', 'Argón', 'Nitrógeno'],
        correctAnswer: 'Nitrógeno',
        difficulty: 'medium'
    },
    {
        question: '¿Quién escribió "El ingenioso hidalgo Don Quijote de la Mancha"?',
        options: ['Miguel de Cervantes', 'Lope de Vega', 'Federico García Lorca', 'Gustavo Adolfo Bécquer'],
        correctAnswer: 'Miguel de Cervantes',
        difficulty: 'easy'
    },
    {
        question: '¿Cuántos continentes hay en el mundo?',
        options: ['5', '6', '7', '8'],
        correctAnswer: '7',
        difficulty: 'easy'
    },
    {
        question: '¿Cuál es la montaña más alta del mundo?',
        options: ['K2', 'Monte Everest', 'Kangchenjunga', 'Lhotse'],
        correctAnswer: 'Monte Everest',
        difficulty: 'medium'
    },
    {
        question: '¿Cuál es la capital de Francia?',
        options: ['Berlín', 'Londres', 'París', 'Madrid'],
        correctAnswer: 'París',
        difficulty: 'easy'
    },
    {
        question: '¿Qué elemento químico tiene el símbolo "Fe"?',
        options: ['Hierro', 'Fósforo', 'Flúor', 'Helio'],
        correctAnswer: 'Hierro',
        difficulty: 'easy'
    },
    {
        question: '¿Cuál es la moneda de Japón?',
        options: ['Yuan', 'Euro', 'Dólar', 'Yen'],
        correctAnswer: 'Yen',
        difficulty: 'easy'
    },
    {
        question: '¿Quién fue el primer presidente de los Estados Unidos?',
        options: ['Thomas Jefferson', 'George Washington', 'Abraham Lincoln', 'John Adams'],
        correctAnswer: 'George Washington',
        difficulty: 'easy'
    },
    {
        question: '¿Cuál es el río más largo del mundo?',
        options: ['Río Amazonas', 'Río Nilo', 'Río Yangtsé', 'Río Misisipi'],
        correctAnswer: 'Río Amazonas',
        difficulty: 'medium'
    },
    {
        question: '¿Qué animal da el huevo más grande?',
        options: ['Avestruz', 'Pato', 'Gallina', 'Águila'],
        correctAnswer: 'Avestruz',
        difficulty: 'easy'
    },
    {
        question: '¿Cuál es la capital de España?',
        options: ['Barcelona', 'Madrid', 'Sevilla', 'Valencia'],
        correctAnswer: 'Madrid',
        difficulty: 'easy'
    },
    {
        question: '¿Cuál es el metal más abundante en la corteza terrestre?',
        options: ['Hierro', 'Aluminio', 'Cobre', 'Oro'],
        correctAnswer: 'Aluminio',
        difficulty: 'hard'
    },
    {
        question: '¿En qué año comenzó la Primera Guerra Mundial?',
        options: ['1912', '1914', '1918', '1920'],
        correctAnswer: '1914',
        difficulty: 'medium'
    },
    {
        question: '¿Cuál es el punto más bajo de la Tierra?',
        options: ['El Mar Muerto', 'La Fosa de las Marianas', 'El Valle de la Muerte', 'El Desierto del Sahara'],
        correctAnswer: 'La Fosa de las Marianas',
        difficulty: 'hard'
    },
    {
        question: '¿Qué país es el mayor productor de café del mundo?',
        options: ['Colombia', 'Vietnam', 'Brasil', 'Etiopía'],
        correctAnswer: 'Brasil',
        difficulty: 'medium'
    },
    {
        question: '¿Cuál es el desierto más grande del mundo?',
        options: ['Desierto del Sahara', 'Desierto de Gobi', 'Antártida', 'Desierto de Atacama'],
        correctAnswer: 'Antártida',
        difficulty: 'hard'
    },
    {
        question: '¿Qué órgano del cuerpo humano es el responsable de la producción de insulina?',
        options: ['Hígado', 'Páncreas', 'Riñón', 'Bazo'],
        correctAnswer: 'Páncreas',
        difficulty: 'medium'
    },
    {
        question: '¿En qué continente se encuentra el desierto del Sahara?',
        options: ['Asia', 'América del Sur', 'África', 'Australia'],
        correctAnswer: 'África',
        difficulty: 'easy'
    },
    {
        question: '¿Cuál es el hueso más largo del cuerpo humano?',
        options: ['Tibia', 'Fémur', 'Radio', 'Peroné'],
        correctAnswer: 'Fémur',
        difficulty: 'easy'
    },
    {
        question: '¿Qué país tiene más pirámides en el mundo?',
        options: ['Egipto', 'México', 'Sudán', 'Perú'],
        correctAnswer: 'Sudán',
        difficulty: 'hard'
    },
    {
        question: '¿Qué planeta es conocido como "el planeta rojo"?',
        options: ['Marte', 'Júpiter', 'Venus', 'Urano'],
        correctAnswer: 'Marte',
        difficulty: 'easy'
    },
    {
        question: '¿Cuál es el único mamífero que puede volar?',
        options: ['Pingüino', 'Murciélago', 'Koala', 'Puma'],
        correctAnswer: 'Murciélago',
        difficulty: 'easy'
    },
    {
        question: '¿Cuál es el deporte nacional de Japón?',
        options: ['Judo', 'Karate', 'Sumo', 'Kendo'],
        correctAnswer: 'Sumo',
        difficulty: 'medium'
    },
    {
        question: '¿Quién escribió la obra "Romeo y Julieta"?',
        options: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'F. Scott Fitzgerald'],
        correctAnswer: 'William Shakespeare',
        difficulty: 'easy'
    },
    {
        question: '¿En qué ciudad se encuentra la Torre Eiffel?',
        options: ['Londres', 'Roma', 'París', 'Berlín'],
        correctAnswer: 'París',
        difficulty: 'easy'
    },
    {
        question: '¿Cuál es el componente principal del aire que respiramos?',
        options: ['Oxígeno', 'Nitrógeno', 'Dióxido de carbono', 'Argón'],
        correctAnswer: 'Nitrógeno',
        difficulty: 'medium'
    },
    {
        question: '¿Cuál es la estrella más cercana a la Tierra (aparte del sol)?',
        options: ['Alfa Centauri', 'Sirio', 'Próxima Centauri', 'Betelgeuse'],
       correctAnswer: 'Próxima Centauri',
        difficulty: 'hard'
    },
    {
        question: '¿Qué famoso científico desarrolló la teoría de la relatividad?',
        options: ['Isaac Newton', 'Albert Einstein', 'Galileo Galilei', 'Stephen Hawking'],
       correctAnswer: 'Albert Einstein',
        difficulty: 'easy'
    },
    {
        question: '¿Cuál es el animal más rápido del mundo?',
        options: ['Guepardo', 'Águila', 'Halcón peregrino', 'Tigre'],
       correctAnswer: 'Halcón peregrino',
        difficulty: 'hard'
    },
    {
        question: '¿Qué vitamina se obtiene de la luz solar?',
        options: ['Vitamina A', 'Vitamina C', 'Vitamina D', 'Vitamina K'],
       correctAnswer: 'Vitamina D',
        difficulty: 'easy'
    },
    {
        question: '¿Cuál es la capital de Italia?',
        options: ['Milán', 'Venecia', 'Florencia', 'Roma'],
       correctAnswer: 'Roma',
        difficulty: 'easy'
    },
    {
        question: '¿Quién fue el primer hombre en viajar al espacio?',
        options: ['Neil Armstrong', 'Yuri Gagarin', 'Buzz Aldrin', 'Valentina Tereshkova'],
       correctAnswer: 'Yuri Gagarin',
        difficulty: 'medium'
    },
    {
        question: '¿Qué país es el hogar de los canguros?',
        options: ['Sudáfrica', 'Australia', 'Nueva Zelanda', 'Canadá'],
       correctAnswer: 'Australia',
        difficulty: 'easy'
    },
    {
        question: '¿Cuál es la unidad básica de la vida?',
        options: ['Átomo', 'Molécula', 'Célula', 'Tejido'],
       correctAnswer: 'Célula',
        difficulty: 'easy'
    },
    {
        question: '¿Qué instrumento musical tiene cuerdas pero no se toca con arco?',
        options: ['Violín', 'Guitarra', 'Chelo', 'Contrabajo'],
       correctAnswer: 'Guitarra',
        difficulty: 'easy'
    },
    {
        question: '¿Cuál es el metal líquido a temperatura ambiente?',
        options: ['Plata', 'Oro', 'Mercurio', 'Cobre'],
       correctAnswer: 'Mercurio',
        difficulty: 'medium'
    },
    {
        question: '¿En qué año se disolvió la Unión Soviética?',
        options: ['1989', '1991', '1995', '2001'],
       correctAnswer: '1991',
        difficulty: 'medium'
    },
    {
        question: '¿Quién pintó "La noche estrellada"?',
        options: ['Pablo Picasso', 'Vincent van Gogh', 'Salvador Dalí', 'Leonardo da Vinci'],
       correctAnswer: 'Vincent van Gogh',
        difficulty: 'easy'
    },
    {
        question: '¿Cuál es el país más grande de América del Sur?',
        options: ['Argentina', 'Brasil', 'Perú', 'Colombia'],
       correctAnswer: 'Brasil',
        difficulty: 'easy'
    },
    {
        question: '¿Qué animal marino es conocido por tener tentáculos venenosos?',
        options: ['Delfín', 'Ballena', 'Medusa', 'Tiburón'],
        correctAnswer: 'Medusa',
        difficulty: 'easy'
    },
    {
        question: '¿Cuál es la capital de Egipto?',
        options: ['Alejandría', 'Luxor', 'El Cairo', 'Giza'],
        correctAnswer: 'El Cairo',
        difficulty: 'medium'
    },
    {
        question: '¿Cuál es la velocidad de la luz en el vacío?',
        options: ['300,000 km/s', '3,000 km/s', '30,000 km/s', '300,000 m/s'],
        correctAnswer: '300,000 km/s',
        difficulty: 'medium'
    },
    {
        question: '¿Qué tipo de sangre se considera el donante universal?',
        options: ['A', 'B', 'AB', 'O-'],
        correctAnswer: 'O-',
        difficulty: 'hard'
    },
    {
        question: '¿Qué idioma se habla en Brasil?',
        options: ['Español', 'Inglés', 'Portugués', 'Francés'],
        correctAnswer: 'Portugués',
        difficulty: 'easy'
    },
    {
        question: '¿Quién fue el primer emperador de Roma?',
        options: ['Julio César', 'Augusto', 'Nerón', 'Calígula'],
        correctAnswer: 'Augusto',
        difficulty: 'medium'
    },
    {
        question: '¿Cuál es el hueso que protege el cerebro?',
        options: ['Craneo', 'Costilla', 'Clavícula', 'Vertebra'],
        correctAnswer: 'Craneo',
        difficulty: 'easy'
    },
    {
        question: '¿Cuál es el mamífero más grande del mundo?',
        options: ['Elefante', 'Ballena azul', 'Jirafa', 'Oso polar'],
        correctAnswer: 'Ballena azul',
        difficulty: 'easy'
    },
    {
        question: '¿Qué gas usan las plantas para hacer la fotosíntesis?',
        options: ['Oxígeno', 'Nitrógeno', 'Dióxido de carbono', 'Hidrógeno'],
        correctAnswer: 'Dióxido de carbono',
        difficulty: 'easy'
    },
    {
        question: '¿Cuál es el órgano más grande del cuerpo humano?',
        options: ['Corazón', 'Hígado', 'Piel', 'Cerebro'],
        correctAnswer: 'Piel',
        difficulty: 'medium'
    },
    {
        question: '¿Qué ciudad es conocida como "La Ciudad Eterna"?',
        options: ['Atenas', 'París', 'Roma', 'Londres'],
        correctAnswer: 'Roma',
        difficulty: 'easy'
    },
    {
        question: '¿Qué científico formuló la ley de la gravedad?',
        options: ['Albert Einstein', 'Isaac Newton', 'Galileo Galilei', 'Stephen Hawking'],
        correctAnswer: 'Isaac Newton',
        difficulty: 'easy'
    },
    {
        question: '¿Qué país es el mayor productor de diamantes del mundo?',
        options: ['Rusia', 'Sudáfrica', 'Canadá', 'Australia'],
        correctAnswer: 'Rusia',
        difficulty: 'hard'
    },
    {
        question: '¿Cuál es la capital de Canadá?',
        options: ['Toronto', 'Vancouver', 'Montreal', 'Ottawa'],
        correctAnswer: 'Ottawa',
        difficulty: 'medium'
    },
    {
        question: '¿Qué planeta es conocido por sus anillos?',
        options: ['Júpiter', 'Marte', 'Saturno', 'Urano'],
        correctAnswer: 'Saturno',
        difficulty: 'easy'
    },
    {
        question: '¿Cuál es el animal que vive más tiempo?',
        options: ['Tortuga', 'Ballena Boreal', 'Elefante', 'Albatros'],
        correctAnswer: 'Ballena Boreal',
        difficulty: 'hard'
    },
    {
        question: '¿Quién es el autor de la saga de Harry Potter?',
        options: ['J.R.R. Tolkien', 'George R.R. Martin', 'J.K. Rowling', 'Stephen King'],
        correctAnswer: 'J.K. Rowling',
        difficulty: 'easy'
    },
    {
        question: '¿Cuál es el símbolo químico del oro?',
        options: ['Ag', 'Au', 'O', 'Fe'],
        correctAnswer: 'Au',
        difficulty: 'easy'
    },
    {
        question: '¿Qué volcán destruyó la antigua ciudad de Pompeya?',
        options: ['Monte Fuji', 'Vesubio', 'Kilauea', 'Monte Etna'],
        correctAnswer: 'Vesubio',
        difficulty: 'medium'
    },
    {
        question: '¿Cuál es el país más pequeño del mundo?',
        options: ['Mónaco', 'Vaticano', 'Nauru', 'Maldivas'],
        correctAnswer: 'Vaticano',
        difficulty: 'medium'
    },
    {
        question: '¿Qué bebida se considera "oro líquido"?',
        options: ['Leche', 'Agua', 'Aceite de oliva', 'Vino'],
       correctAnswer: 'Aceite de oliva',
        difficulty: 'hard'
    },
    {
        question: '¿Cuál es el único estado de EE. UU. que tiene una bandera que no es rectangular?',
        options: ['Ohio', 'Maryland', 'Florida', 'Utah'],
       correctAnswer: 'Ohio',
        difficulty: 'hard'
    },
    {
        question: '¿Qué tipo de animal es un ornitorrinco?',
        options: ['Reptil', 'Anfibio', 'Mamífero', 'Ave'],
       correctAnswer: 'Mamífero',
        difficulty: 'easy'
    },
    {
        question: '¿Qué órgano humano puede regenerarse?',
        options: ['Corazón', 'Pulmón', 'Riñón', 'Hígado'],
       correctAnswer: 'Hígado',
        difficulty: 'hard'
    },
    {
        question: '¿Qué es un "hongo" en biología?',
        options: ['Planta', 'Animal', 'Hongo', 'Mineral'],
       correctAnswer: 'Hongo',
        difficulty: 'easy'
    },
    {
        question: '¿Cuál es la capital de Chile?',
        options: ['Valparaíso', 'Santiago', 'Concepción', 'La Serena'],
       correctAnswer: 'Santiago',
        difficulty: 'easy'
    },
    {
        question: '¿Quién inventó el teléfono?',
        options: ['Thomas Edison', 'Alexander Graham Bell', 'Nikola Tesla', 'Isaac Newton'],
       correctAnswer: 'Alexander Graham Bell',
        difficulty: 'easy'
    },
    {
        question: '¿Qué cordillera es la más larga del mundo?',
        options: ['Himalaya', 'Andes', 'Montañas Rocosas', 'Alpes'],
       correctAnswer: 'Andes',
        difficulty: 'medium'
    },
    {
        question: '¿Qué país tiene una bandera con un dragón rojo?',
        options: ['China', 'Gales', 'Nepal', 'Bután'],
       correctAnswer: 'Gales',
        difficulty: 'hard'
    },
    {
        question: '¿Cuál es el animal nacional de Escocia?',
        options: ['León', 'Unicornio', 'Águila', 'Toro'],
       correctAnswer: 'Unicornio',
        difficulty: 'hard'
    },
    {
        question: '¿Qué color de luz viaja más rápido en el vacío?',
        options: ['Rojo', 'Azul', 'Verde', 'Todos viajan a la misma velocidad'],
       correctAnswer: 'Todos viajan a la misma velocidad',
        difficulty: 'hard'
    },
    {
        question: '¿Qué ciudad es la capital de Tailandia?',
        options: ['Singapur', 'Bangkok', 'Hanói', 'Kuala Lumpur'],
       correctAnswer: 'Bangkok',
        difficulty: 'medium'
    },
    {
        question: '¿Cuál es el nombre del famoso detective de Baker Street?',
        options: ['Hércules Poirot', 'Sherlock Holmes', 'Miss Marple', 'Philip Marlowe'],
       correctAnswer: 'Sherlock Holmes',
        difficulty: 'easy'
    },
    {
        question: '¿Qué compuesto químico es el "sabor umami"?',
        options: ['Glutamato monosódico', 'Cloruro de sodio', 'Ácido cítrico', 'Lactosa'],
       correctAnswer: 'Glutamato monosódico',
        difficulty: 'hard'
    },
    {
        question: '¿En qué país se encuentra la Estatua de la Libertad?',
        options: ['Francia', 'Canadá', 'Estados Unidos', 'México'],
       correctAnswer: 'Estados Unidos',
        difficulty: 'easy'
    },
    {
        question: '¿Cuál es el nombre de la galaxia donde se encuentra la Tierra?',
        options: ['Andrómeda', 'Vía Láctea', 'Triángulo', 'Centaurus A'],
       correctAnswer: 'Vía Láctea',
        difficulty: 'easy'
    },
    {
        question: '¿Qué científico propuso las tres leyes del movimiento?',
        options: ['Albert Einstein', 'Isaac Newton', 'Galileo Galilei', 'Marie Curie'],
       correctAnswer: 'Isaac Newton',
        difficulty: 'easy'
    },
    {
        question: '¿Cuál es el metal más caro del mundo?',
        options: ['Oro', 'Platino', 'Rodio', 'Plata'],
       correctAnswer: 'Rodio',
        difficulty: 'hard'
    },
    {
        question: '¿Qué país es conocido por su tradición de sake?',
        options: ['China', 'Corea', 'Japón', 'Tailandia'],
       correctAnswer: 'Japón',
        difficulty: 'easy'
    },
    {
        question: '¿Qué instrumento musical se conoce como "la reina de los instrumentos"?',
        options: ['Piano', 'Violín', 'Órgano', 'Guitarra'],
       correctAnswer: 'Órgano',
        difficulty: 'medium'
    },
    {
        question: '¿Cuál es la ciudad de los rascacielos?',
        options: ['Tokio', 'Dubái', 'Nueva York', 'Shanghái'],
       correctAnswer: 'Nueva York',
        difficulty: 'easy'
    },
    {
        question: '¿Cuál es el único mamífero que pone huevos?',
        options: ['Koala', 'Pato', 'Ornitorrinco', 'Murciélago'],
       correctAnswer: 'Ornitorrinco',
        difficulty: 'medium'
    },
    {
        question: '¿Qué famoso pintor se cortó la oreja?',
        options: ['Van Gogh', 'Picasso', 'Monet', 'Dalí'],
       correctAnswer: 'Van Gogh',
        difficulty: 'easy'
    },
    {
        question: '¿Qué océano separa África de Australia?',
        options: ['Atlántico', 'Pacífico', 'Índico', 'Ártico'],
       correctAnswer: 'Índico',
        difficulty: 'medium'
    },
    {
        question: '¿Cuál es la principal fuente de energía de la Tierra?',
        options: ['Petróleo', 'Viento', 'Sol', 'Agua'],
       correctAnswer: 'Sol',
        difficulty: 'easy'
    },
    {
        question: '¿Qué planeta tiene más lunas?',
        options: ['Marte', 'Júpiter', 'Saturno', 'Neptuno'],
       correctAnswer: 'Saturno',
        difficulty: 'hard'
    },
    {
        question: '¿Qué ciudad es conocida como la "Ciudad del Amor"?',
        options: ['París', 'Roma', 'Venecia', 'Nueva York'],
       correctAnswer: 'París',
        difficulty: 'easy'
    },
    {
        question: '¿Cuál es la montaña más alta de América?',
        options: ['Monte Aconcagua', 'Monte Denali', 'Monte Kilimanjaro', 'Monte Logan'],
       correctAnswer: 'Monte Aconcagua',
        difficulty: 'medium'
    },
    {
        question: '¿Qué animal es el mejor amigo del hombre?',
        options: ['Gato', 'Perro', 'Caballo', 'Pájaro'],
       correctAnswer: 'Perro',
        difficulty: 'easy'
    },
    {
        question: '¿Cuál es la capital de Brasil?',
        options: ['Río de Janeiro', 'São Paulo', 'Brasilia', 'Salvador'],
       correctAnswer: 'Brasilia',
        difficulty: 'medium'
    },
    {
        question: '¿Qué país tiene la forma de una bota?',
        options: ['España', 'Portugal', 'Francia', 'Italia'],
       correctAnswer: 'Italia',
        difficulty: 'easy'
    },
    {
        question: '¿Cuál es la célula más pequeña del cuerpo humano?',
        options: ['Glóbulo rojo', 'Espermatocito', 'Glóbulo blanco', 'Neurona'],
       correctAnswer: 'Espermatocito',
        difficulty: 'hard'
    },
    {
        question: '¿Cuál es el único continente que se encuentra en los cuatro hemisferios?',
        options: ['Asia', 'Europa', 'África', 'América'],
       correctAnswer: 'África',
        difficulty: 'hard'
    },
    {
        question: '¿Qué animal vive en el desierto y puede almacenar agua en su joroba?',
        options: ['Elefante', 'Camello', 'Dromedario', 'Coyote'],
       correctAnswer: 'Camello',
        difficulty: 'easy'
    },
    {
        question: '¿Quién escribió la obra "El principito"?',
        options: ['Antoine de Saint-Exupéry', 'Julio Verne', 'Gabriel García Márquez', 'Miguel de Cervantes'],
       correctAnswer: 'Antoine de Saint-Exupéry',
        difficulty: 'easy'
    },
    {
        question: '¿Qué gas es el que da el color azul al cielo?',
        options: ['Ozono', 'Dióxido de carbono', 'Argón', 'Nitrógeno'],
       correctAnswer: 'Nitrógeno',
        difficulty: 'hard'
    },
    {
        question: '¿Cuál es la unidad de medida de la fuerza?',
        options: ['Voltio', 'Amperio', 'Newton', 'Vatio'],
       correctAnswer: 'Newton',
        difficulty: 'medium'
    },
    {
        question: '¿Qué famoso pintor fue el líder del movimiento cubista?',
        options: ['Salvador Dalí', 'Pablo Picasso', 'Henri Matisse', 'Frida Kahlo'],
       correctAnswer: 'Pablo Picasso',
        difficulty: 'easy'
    },
    {
        question: '¿Qué tipo de animal es una "cabeza de hacha"?',
        options: ['Pez', 'Ave', 'Reptil', 'Anfibio'],
       correctAnswer: 'Pez',
        difficulty: 'hard'
    },
    {
        question: '¿Cuál es el río más largo de Europa?',
        options: ['Danubio', 'Sena', 'Támesis', 'Volga'],
       correctAnswer: 'Volga',
        difficulty: 'medium'
    },
    {
        question: '¿Qué sustancia es conocida como "la vitamina del sol"?',
        options: ['Vitamina A', 'Vitamina C', 'Vitamina D', 'Vitamina B12'],
       correctAnswer: 'Vitamina D',
        difficulty: 'easy'
    },
    {
        question: '¿Cuál es el país más poblado del mundo?',
        options: ['China', 'India', 'Estados Unidos', 'Indonesia'],
       correctAnswer: 'India',
        difficulty: 'easy'
    },
    {
        question: '¿Qué país es el hogar de los pumas y los jaguares?',
        options: ['África', 'América', 'Asia', 'Australia'],
       correctAnswer: 'América',
        difficulty: 'easy'
    },
    {
        question: '¿Cuál es la ciudad más grande de Turquía?',
        options: ['Estambul', 'Ankara', 'Izmir', 'Bursa'],
       correctAnswer: 'Estambul',
        difficulty: 'medium'
    },
    {
        question: '¿Qué tipo de animal es una "ballena de orca"?',
        options: ['Pez', 'Delfín', 'Ballena', 'Tiburón'],
       correctAnswer: 'Delfín',
        difficulty: 'hard'
    },
    {
        question: '¿Quién pintó "El grito"?',
        options: ['Edvard Munch', 'Gustav Klimt', 'Pablo Picasso', 'Salvador Dalí'],
       correctAnswer: 'Edvard Munch',
        difficulty: 'hard'
    },
    {
        question: '¿Qué país es el mayor productor de petróleo del mundo?',
        options: ['Arabia Saudita', 'Rusia', 'Estados Unidos', 'Irán'],
       correctAnswer: 'Estados Unidos',
        difficulty: 'hard'
    },
    {
        question: '¿Qué país es el hogar de los pingüinos emperador?',
        options: ['Argentina', 'Chile', 'Antártida', 'Sudáfrica'],
       correctAnswer: 'Antártida',
        difficulty: 'medium'
    },
    {
        question: '¿Cuál es el nombre de la galaxia más cercana a la Vía Láctea?',
        options: ['Galaxia de Andrómeda', 'Galaxia del Triángulo', 'Galaxia del Escultor', 'Galaxia de Bode'],
       correctAnswer: 'Galaxia de Andrómeda',
        difficulty: 'medium'
    },
    {
        question: '¿Qué instrumento produce el sonido más agudo?',
        options: ['Flauta', 'Violín', 'Piano', 'Guitarra'],
       correctAnswer: 'Violín',
        difficulty: 'hard'
    },
    {
        question: '¿Qué país es conocido por su comida picante?',
        options: ['China', 'India', 'México', 'Tailandia'],
       correctAnswer: 'México',
        difficulty: 'easy'
    },
    {
        question: '¿Cuál es la capa más externa de la Tierra?',
        options: ['Manto', 'Núcleo', 'Corteza', 'Atmósfera'],
       correctAnswer: 'Corteza',
        difficulty: 'easy'
    },
    {
        question: '¿Qué es un "koala"?',
        options: ['Oso', 'Marsupial', 'Perezoso', 'Roedor'],
       correctAnswer: 'Marsupial',
        difficulty: 'easy'
    },
    {
        question: '¿Cuál es la moneda de India?',
        options: ['Dólar', 'Euro', 'Rupia', 'Yen'],
       correctAnswer: 'Rupia',
        difficulty: 'easy'
    },
    {
        question: '¿Qué es un "mamífero monotrema"?',
        options: ['Mamífero que vuela', 'Mamífero que vive en el agua', 'Mamífero que pone huevos', 'Mamífero que tiene escamas'],
       correctAnswer: 'Mamífero que pone huevos',
        difficulty: 'hard'
    },
    {
        question: '¿Cuál es el desierto más grande del mundo?',
        options: ['Desierto del Sahara', 'Desierto de Gobi', 'Desierto de Atacama', 'Antártida'],
        correctAnswer: 'Antártida',
        difficulty: 'hard'
    },
    {
        question: '¿Qué océano separa África de América?',
        options: ['Océano Pacífico', 'Océano Índico', 'Océano Atlántico', 'Océano Ártico'],
        correctAnswer: 'Océano Atlántico',
        difficulty: 'easy'
    },
    {
        question: '¿Qué país es conocido por sus tulipanes?',
        options: ['Holanda', 'Bélgica', 'Francia', 'Alemania'],
        correctAnswer: 'Holanda',
        difficulty: 'easy'
    },
    {
        question: '¿Cuál es el principal metal en el acero inoxidable?',
        options: ['Hierro', 'Cromo', 'Níquel', 'Aluminio'],
        correctAnswer: 'Hierro',
        difficulty: 'medium'
    },
    {
        question: '¿Quién escribió "Orgullo y prejuicio"?',
        options: ['Jane Austen', 'Emily Brontë', 'Charles Dickens', 'Oscar Wilde'],
        correctAnswer: 'Jane Austen',
        difficulty: 'medium'
    },
    {
        question: '¿Qué país es conocido por los "Moai" de la Isla de Pascua?',
        options: ['Chile', 'Perú', 'Ecuador', 'Colombia'],
        correctAnswer: 'Chile',
        difficulty: 'easy'
    },
    {
        question: '¿Qué planeta es conocido por su "Gran Mancha Roja"?',
        options: ['Marte', 'Júpiter', 'Saturno', 'Neptuno'],
        correctAnswer: 'Júpiter',
        difficulty: 'easy'
    },
    {
        question: '¿Cuál es la capital de México?',
        options: ['Guadalajara', 'Monterrey', 'Ciudad de México', 'Puebla'],
        correctAnswer: 'Ciudad de México',
        difficulty: 'easy'
    },
    {
        question: '¿Qué tipo de animal es el "tiburón ballena"?',
        options: ['Mamífero', 'Pez', 'Anfibio', 'Reptil'],
        correctAnswer: 'Pez',
        difficulty: 'medium'
    },
    {
        question: '¿Qué bebida se obtiene de la fermentación de la cebada?',
        options: ['Vino', 'Cerveza', 'Ron', 'Tequila'],
        correctAnswer: 'Cerveza',
        difficulty: 'easy'
    }
];
module.exports = questions;