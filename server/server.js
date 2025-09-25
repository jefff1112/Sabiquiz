const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const admin = require('firebase-admin');

// --- Rutas Absolutas para Vercel/Render ---
const serviceAccount = require(path.join(__dirname, 'serviceAccountKey.json'));
const questions = require(path.join(__dirname, 'questions.js'));

// --- 1. CONFIGURACIÓN ---
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();
const app = express();
const server = http.createServer(app);

const io = socketIO(server, {
  cors: {
    origin: ["http://localhost:3000", "https://sabiquiz.vercel.app", "https://sabiquiz.onrender.com"],
    methods: ["GET", "POST"]
  }
});

const publicPath = path.resolve(__dirname, '..');
app.use(express.static(publicPath));

let rooms = {};
let matchmakingPool = [];

// --- 2. FUNCIONES DE LÓGICA DE JUEGO ---

function startGame(roomCode) {
    const room = rooms[roomCode];
    if (!room || room.players.length !== 2) return;
    room.gameMode = getRandomGameMode();
    room.rematchVoters = new Set();
    console.log(`--- INICIANDO PARTIDA --- Sala: ${roomCode}, Modo: ${room.gameMode}`);
    room.gameData = {
        questions: [...questions].sort(() => 0.5 - Math.random()).slice(0, 5),
        currentQuestionIndex: 0,
        scores: { [room.players[0]]: 0, [room.players[1]]: 0 },
        playerAnswers: {}
    };
    io.to(roomCode).emit('startCountdown', { gameMode: room.gameMode, roomCode: roomCode });
    setTimeout(() => {
        const firstQuestion = room.gameData.questions[0];
        // Se envía el objeto completo para que el cliente elija el idioma
        io.to(roomCode).emit('nextQuestion', { question: firstQuestion });
        startQuestionTimer(roomCode);
    }, 4000);
}

function startQuestionTimer(roomCode) {
    const room = rooms[roomCode];
    if (!room || !room.gameData) return;
    if (room.timerInterval) clearInterval(room.timerInterval);
    let timeLeft = 10;
    room.timerInterval = setInterval(() => {
        io.to(roomCode).emit('timerUpdate', timeLeft);
        timeLeft--;
        if (timeLeft < 0) {
            clearInterval(room.timerInterval);
            const currentQuestion = room.gameData.questions[room.gameData.currentQuestionIndex];
            io.to(roomCode).emit('roundResult', { 
                playerAnswers: {}, 
                correctAnswer: currentQuestion.correctAnswer, 
                scores: room.gameData.scores, 
                playerData: room.playerData 
            });
            setTimeout(() => proceedToNextQuestion(roomCode), 3000);
        }
    }, 1000);
}

function proceedToNextQuestion(roomCode) {
    const room = rooms[roomCode];
    if (!room || !room.gameData) return;
    if (room.timerInterval) clearInterval(room.timerInterval);
    room.gameData.currentQuestionIndex++;
    room.gameData.playerAnswers = {};
    if (room.gameData.currentQuestionIndex >= room.gameData.questions.length) {
        handleEndGame(roomCode, false); // Juego terminó normalmente
    } else {
        const nextQuestion = room.gameData.questions[room.gameData.currentQuestionIndex];
        io.to(roomCode).emit('nextQuestion', { question: nextQuestion });
        startQuestionTimer(roomCode);
    }
}

async function handleEndGame(roomCode, opponentLeft = false) {
    const room = rooms[roomCode];
    if (!room || !room.gameData) return;
    
    io.to(roomCode).emit('endGame', { scores: room.gameData.scores, playerData: room.playerData });

    // Solo se guardan puntos si el juego terminó normalmente
    if (opponentLeft) {
        console.log(`Partida ${roomCode} terminada por desconexión. No se guardan puntos.`);
        return;
    }

    const scores = room.gameData.scores;
    const playerSocketIds = Object.keys(scores);
    if (playerSocketIds.length < 2) return;
    
    const [p1_socketId, p2_socketId] = playerSocketIds;
    const p1_uid = room.playerData[p1_socketId]?.uid;
    const p2_uid = room.playerData[p2_socketId]?.uid;

    if (!p1_uid || !p2_uid) return;

    const p1_docRef = db.collection('users').doc(p1_uid);
    const p2_docRef = db.collection('users').doc(p2_uid);
    
    try {
        await p1_docRef.update({ matchesPlayed: admin.firestore.FieldValue.increment(1) });
        await p2_docRef.update({ matchesPlayed: admin.firestore.FieldValue.increment(1) });
        if (scores[p1_socketId] > scores[p2_socketId]) {
            await p1_docRef.update({ matchesWon: admin.firestore.FieldValue.increment(1), pvpXp: admin.firestore.FieldValue.increment(50) });
            await p2_docRef.update({ pvpXp: admin.firestore.FieldValue.increment(10) });
        } else if (scores[p2_socketId] > scores[p1_socketId]) {
            await p2_docRef.update({ matchesWon: admin.firestore.FieldValue.increment(1), pvpXp: admin.firestore.FieldValue.increment(50) });
            await p1_docRef.update({ pvpXp: admin.firestore.FieldValue.increment(10) });
        } else {
            await p1_docRef.update({ pvpXp: admin.firestore.FieldValue.increment(15) });
            await p2_docRef.update({ pvpXp: admin.firestore.FieldValue.increment(15) });
        }
    } catch (error) { console.error("Error al guardar datos de 1vs1 en Firestore:", error); }
}

function getRandomGameMode() { return Math.random() < 0.5 ? 'normal' : 'revancha'; }

// --- 3. "ÁRBITRO" DE MATCHMAKING ---
setInterval(() => {
    if (matchmakingPool.length >= 2) {
        const player1 = matchmakingPool.shift();
        const player2 = matchmakingPool.shift();
        const socket1 = io.sockets.sockets.get(player1.socketId);
        const socket2 = io.sockets.sockets.get(player2.socketId);
        if (!socket1 || !socket2) {
            if (player1 && socket1) matchmakingPool.unshift(player1);
            if (player2 && socket2) matchmakingPool.unshift(player2);
            return;
        }
        const tempRoomId = `vote_${Date.now()}`;
        rooms[tempRoomId] = { players: [player1.socketId, player2.socketId], playerData: { [player1.socketId]: player1.data, [player2.socketId]: player2.data }, votes: new Set() };
        socket1.join(tempRoomId);
        socket2.join(tempRoomId);
        socket1.emit('matchFound', { roomId: tempRoomId, opponent: player2.data });
        socket2.emit('matchFound', { roomId: tempRoomId, opponent: player1.data });
    }
}, 3000);

// --- 4. MANEJO DE CONEXIONES DE SOCKET.IO ---
io.on('connection', (socket) => {
    console.log(`Usuario conectado: ${socket.id}`);
    
    socket.on('findMatch', (playerData) => { if (matchmakingPool.some(p => p.socketId === socket.id)) return; matchmakingPool.push({ socketId: socket.id, data: playerData }); });
    socket.on('cancelFindMatch', () => { matchmakingPool = matchmakingPool.filter(p => p.socketId !== socket.id); });
    socket.on('createRoom', (data) => {
        const { roomCode, player } = data;
        if (rooms[roomCode] && rooms[roomCode].players.length < 2) {
            socket.join(roomCode);
            rooms[roomCode].players.push(socket.id);
            rooms[roomCode].playerData[socket.id] = player;
            io.to(roomCode).emit('playerJoined', rooms[roomCode].players.length);
            if (rooms[roomCode].players.length === 2) {
                rooms[roomCode].rematchVoters = new Set();
                startGame(roomCode);
            }
        } else if (!rooms[roomCode]) {
            socket.join(roomCode);
            rooms[roomCode] = { players: [socket.id], playerData: { [socket.id]: player }, gameData: null, gameMode: null, rematchVoters: new Set(), timerInterval: null };
            socket.emit('roomCreated', roomCode);
        } else {
            socket.emit('roomFull');
        }
    });
    socket.on('acceptMatch', ({ roomId }) => {
        const room = rooms[roomId];
        if (!room || room.votes.has(socket.id)) return;
        room.votes.add(socket.id);
        if (room.votes.size === 2) {
            room.rematchVoters = new Set();
            delete room.votes;
            startGame(roomId);
        }
    });
    socket.on('rejectMatch', ({ roomId }) => {
        const room = rooms[roomId];
        if (!room) return;
        io.to(roomId).emit('matchRejected');
        room.players.forEach(playerId => {
            const playerProfile = room.playerData[playerId];
            if (playerProfile) matchmakingPool.unshift({ socketId: playerId, data: playerProfile });
        });
        delete rooms[roomId];
    });

    socket.on('playerAnswer', ({ roomCode, answer }) => {
        const room = rooms[roomCode];
        if (!room || !room.gameData || room.gameData.playerAnswers[socket.id]) return;
        if (room.timerInterval) clearInterval(room.timerInterval);
        
        const gameData = room.gameData;
        const currentQuestion = gameData.questions[gameData.currentQuestionIndex];
        
        const correctAnswer_es = currentQuestion.correctAnswer.es.toLowerCase();
        const correctAnswer_en = currentQuestion.correctAnswer.en.toLowerCase();
        const isCorrect = (answer.toLowerCase() === correctAnswer_es) || (answer.toLowerCase() === correctAnswer_en);
        
        gameData.playerAnswers[socket.id] = { answer, isCorrect };
        
        if (isCorrect) {
            gameData.scores[socket.id]++;
        }
        
        const answersCount = Object.keys(gameData.playerAnswers).length;
        const aPlayerWasCorrect = Object.values(gameData.playerAnswers).some(p => p.isCorrect);
        let roundOver = false;
        
        if (room.gameMode === 'revancha' && (aPlayerWasCorrect || answersCount === 2)) {
            roundOver = true;
        } else if (room.gameMode === 'normal' && answersCount === 2) {
            roundOver = true;
        }
        
        if (roundOver) {
            io.to(roomCode).emit('roundResult', { 
                playerAnswers: gameData.playerAnswers, 
                correctAnswer: currentQuestion.correctAnswer, 
                scores: gameData.scores, 
                playerData: room.playerData 
            });
            setTimeout(() => proceedToNextQuestion(roomCode), 2500);
        } else {
            socket.emit('answerReceived');
        }
    });

    socket.on('requestRematch', (data) => {
        const room = rooms[data.roomCode];
        if (!room || room.rematchVoters.has(socket.id)) return;
        room.rematchVoters.add(socket.id);

        const otherPlayerId = room.players.find(pId => pId !== socket.id);
        if (otherPlayerId) {
            const requesterName = room.playerData[socket.id].name;
            io.to(otherPlayerId).emit('rematchRequested', { name: requesterName });
        }

        if (room.rematchVoters.size === 2) {
             startGame(data.roomCode);
        }
    });

    socket.on('disconnect', () => {
        console.log(`Usuario desconectado: ${socket.id}`);
        matchmakingPool = matchmakingPool.filter(p => p.socketId !== socket.id);
        for (const roomCode in rooms) {
            const room = rooms[roomCode];
            const playerIndex = room.players.indexOf(socket.id);
            if (playerIndex > -1) {
                const disconnectedPlayerName = room.playerData[socket.id]?.name || 'Un jugador';
                room.players.splice(playerIndex, 1);
                
                if (room.players.length > 0) {
                    const remainingPlayerId = room.players[0];
                    io.to(remainingPlayerId).emit('opponentDisconnected', { name: disconnectedPlayerName });
                    handleEndGame(roomCode, true);
                }
                
                delete rooms[roomCode];
                break;
            }
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});