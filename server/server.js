// Importa las bibliotecas necesarias
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

// Importa el archivo de preguntas que acabas de crear
const questions = require('./questions');

// Configura Express y el servidor HTTP
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Define la ruta a tu carpeta principal 'SABIQUIZ'
const publicPath = path.join(__dirname, '..');

// Sirve todos los archivos de la carpeta 'SABIQUIZ'
app.use(express.static(publicPath));

// Garantiza que se sirva el index.html cuando se accede a la raíz
app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

// Lógica para manejar las partidas y salas
let rooms = {}; // Objeto para guardar todas las salas de juego activas

// Lógica de Socket.IO para manejar conexiones
io.on('connection', (socket) => {
    console.log('¡Un usuario se ha conectado! ID del socket:', socket.id);

    // --- NUEVA LÓGICA DE SALAS ---
    // Escucha el evento 'createRoom' del cliente
    socket.on('createRoom', (roomCode) => {
        // Verifica si la sala ya existe y si tiene menos de 2 jugadores
        if (rooms[roomCode] && rooms[roomCode].players.length < 2) {
            socket.join(roomCode); // Une al jugador a la sala
            rooms[roomCode].players.push(socket.id);
            console.log(`Jugador unido a la sala: ${roomCode}`);
            // Emite un mensaje a todos en la sala de que un jugador se unió
            io.to(roomCode).emit('playerJoined', rooms[roomCode].players.length);

            // Si hay 2 jugadores, ¡es hora de empezar el juego!
            if (rooms[roomCode].players.length === 2) {
                console.log(`Sala ${roomCode} lista. ¡Iniciando juego!`);
                // Selecciona preguntas para la partida
                rooms[roomCode].gameData = {
                    questions: questions.sort(() => 0.5 - Math.random()).slice(0, 5), // Selecciona 5 preguntas al azar
                    currentQuestionIndex: 0,
                    scores: {
                        [rooms[roomCode].players[0]]: 0,
                        [rooms[roomCode].players[1]]: 0
                    }
                };
                
                // Envía la primera pregunta a ambos jugadores
                const firstQuestion = rooms[roomCode].gameData.questions[0];
                io.to(roomCode).emit('startGame', {
                    question: firstQuestion.question,
                    options: firstQuestion.options,
                });
            }

        } else if (!rooms[roomCode]) {
            // Si la sala no existe, la crea
            socket.join(roomCode);
            rooms[roomCode] = {
                players: [socket.id],
                gameData: null // Aquí se guardarán los datos del juego
            };
            console.log(`Sala creada: ${roomCode}`);
            socket.emit('roomCreated', roomCode); // Envía un mensaje al creador de la sala
        } else {
            // Si la sala está llena, notifica al cliente
            socket.emit('roomFull');
        }
    });

    // --- NUEVA LÓGICA DE JUEGO ---
    // Escucha cuando un jugador responde
    socket.on('playerAnswer', ({ roomCode, answer }) => {
        const room = rooms[roomCode];
        if (!room || !room.gameData) return; // Si la sala no existe o no hay juego, no hagas nada
        
        const gameData = room.gameData;
        const currentQuestion = gameData.questions[gameData.currentQuestionIndex];
        
        // Verifica si la respuesta es correcta
        if (answer === currentQuestion.answer) {
            gameData.scores[socket.id] += 1; // Suma un punto al jugador
            console.log(`Respuesta correcta de ${socket.id} en sala ${roomCode}. Puntuación: ${gameData.scores[socket.id]}`);
            
            // Envía la puntuación actualizada a ambos jugadores
            io.to(roomCode).emit('updateScore', gameData.scores);
        }

        // Avanza a la siguiente pregunta después de un tiempo o si ambos jugadores respondieron
        // Por ahora, solo avanzaremos a la siguiente pregunta.
        gameData.currentQuestionIndex++;
        
        if (gameData.currentQuestionIndex < gameData.questions.length) {
            const nextQuestion = gameData.questions[gameData.currentQuestionIndex];
            io.to(roomCode).emit('nextQuestion', {
                question: nextQuestion.question,
                options: nextQuestion.options,
            });
        } else {
            // El juego ha terminado
            io.to(roomCode).emit('endGame', gameData.scores);
            delete rooms[roomCode]; // Elimina la sala
        }
    });

    // Maneja la desconexión de un usuario
    socket.on('disconnect', () => {
        console.log('Un usuario se ha desconectado. ID del socket:', socket.id);
        // Lógica para limpiar las salas si un jugador se va
        for (const roomCode in rooms) {
            const index = rooms[roomCode].players.indexOf(socket.id);
            if (index > -1) {
                rooms[roomCode].players.splice(index, 1);
                console.log(`Jugador ${socket.id} ha abandonado la sala ${roomCode}`);
                if (rooms[roomCode].players.length === 0) {
                    delete rooms[roomCode];
                    console.log(`Sala ${roomCode} eliminada.`);
                }
                break;
            }
        }
    });
});

// Elige un puerto para que tu servidor escuche
const PORT = process.env.PORT || 3000;

// Inicia el servidor
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});