// ============================================
// SERVIDOR PRINCIPAL DE SABIQUIZ
// ============================================
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const { testConnection } = require('./config/database');

// Importar rutas de la API
const authRoutes = require('./routes/auth');
const quizRoutes = require('./routes/quiz');
const progressRoutes = require('./routes/progress');
const suggestionRoutes = require('./routes/suggestions');
const matchesRoutes = require('./routes/matches');
const minigamesRoutes = require('./routes/minigames');

// ============================================
// CONFIGURACIÓN DE EXPRESS
// ============================================
const app = express();
const server = http.createServer(app);

const io = socketIO(server, {
  cors: {
    origin: ["http://localhost:3000", "http://127.0.0.1:5500", "https://sabiquiz.vercel.app", "https://sabiquiz.onrender.com"],
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================
// SERVIR ARCHIVOS ESTÁTICOS (FRONTEND)
// ============================================
const publicPath = path.resolve(__dirname, '..');
app.use(express.static(publicPath));

// ============================================
// RUTAS DE LA API
// ============================================
app.use('/api/auth', authRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/suggestions', suggestionRoutes);
app.use('/api/matches', matchesRoutes);
app.use('/api/minigames', minigamesRoutes);

// ============================================
// RUTA DE PRUEBA (Health Check)
// ============================================
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Servidor Sabiquiz funcionando correctamente',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// ============================================
// RUTAS PARA EL FRONTEND (HTML)
// ============================================
app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(publicPath, 'login.html'));
});

app.get('/login.html', (req, res) => {
  res.sendFile(path.join(publicPath, 'login.html'));
});

app.get('/main_menu', (req, res) => {
  res.sendFile(path.join(publicPath, 'main_menu.html'));
});

app.get('/main_menu.html', (req, res) => {
  res.sendFile(path.join(publicPath, 'main_menu.html'));
});

app.get('/profile', (req, res) => {
  res.sendFile(path.join(publicPath, 'profile.html'));
});

app.get('/profile.html', (req, res) => {
  res.sendFile(path.join(publicPath, 'profile.html'));
});

app.get('/leaderboard', (req, res) => {
  res.sendFile(path.join(publicPath, 'leaderboard.html'));
});

app.get('/leaderboard.html', (req, res) => {
  res.sendFile(path.join(publicPath, 'leaderboard.html'));
});

app.get('/quiz_runner', (req, res) => {
  res.sendFile(path.join(publicPath, 'quiz_runner.html'));
});

app.get('/quiz_runner.html', (req, res) => {
  res.sendFile(path.join(publicPath, 'quiz_runner.html'));
});

app.get('/admin_panel', (req, res) => {
  res.sendFile(path.join(publicPath, 'admin_panel.html'));
});

app.get('/admin_panel.html', (req, res) => {
  res.sendFile(path.join(publicPath, 'admin_panel.html'));
});

app.get('/suggestions', (req, res) => {
  res.sendFile(path.join(publicPath, 'suggestions.html'));
});

app.get('/suggestions.html', (req, res) => {
  res.sendFile(path.join(publicPath, 'suggestions.html'));
});

// ============================================
// RUTA 404 - NO ENCONTRADO
// ============================================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Ruta no encontrada'
  });
});

// ============================================
// MANEJADOR DE ERRORES
// ============================================
app.use((err, req, res, next) => {
  console.error('Error global:', err);
  res.status(500).json({
    success: false,
    error: 'Error interno del servidor'
  });
});

// ============================================
// SOCKET.IO - NOTIFICACIONES EN TIEMPO REAL
// ============================================
const userSockets = {};

// Función para enviar notificación a un usuario específico
function sendNotification(uid, type, data) {
    const socketId = userSockets[uid];
    if (socketId) {
        io.to(socketId).emit('notification', {
            type: type,
            data: data,
            timestamp: new Date().toISOString()
        });
        console.log(`📨 Notificación enviada a ${uid}: ${type}`);
        return true;
    }
    console.log(`⚠️ Usuario ${uid} no conectado, notificación guardada en BD`);
    return false;
}

// ============================================
// SOCKET.IO - LÓGICA 1VS1
// ============================================
let rooms = {};
let matchmakingPool = [];

io.on('connection', (socket) => {
  console.log(`Usuario conectado: ${socket.id}`);

  // Registrar usuario para notificaciones
  socket.on('registerUser', (uid) => {
    if (uid) {
      userSockets[uid] = socket.id;
      console.log(`✅ Usuario ${uid} registrado para notificaciones con socket ${socket.id}`);
    }
  });

  socket.on('findMatch', (playerData) => {
    if (matchmakingPool.some(p => p.socketId === socket.id)) return;
    matchmakingPool.push({ socketId: socket.id, data: playerData });
  });

  socket.on('cancelFindMatch', () => {
    matchmakingPool = matchmakingPool.filter(p => p.socketId !== socket.id);
  });

  socket.on('createRoom', (data) => {
    const { roomCode, player, gameType } = data;
    if (rooms[roomCode] && rooms[roomCode].players.length < 2) {
      socket.join(roomCode);
      rooms[roomCode].players.push(socket.id);
      rooms[roomCode].playerData[socket.id] = player;
      io.to(roomCode).emit('playerJoined', rooms[roomCode].players.length);
      if (rooms[roomCode].players.length === 2) {
        rooms[roomCode].rematchVoters = new Set();
        startGame(roomCode, rooms[roomCode].gameType || gameType || 'normal');
      }
    } else if (!rooms[roomCode]) {
      socket.join(roomCode);
      rooms[roomCode] = {
        players: [socket.id],
        playerData: { [socket.id]: player },
        gameData: null,
        gameMode: null,
        rematchVoters: new Set(),
        timerInterval: null,
        gameType: gameType || 'normal'
      };
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
      startGame(roomId, room.gameType || 'normal');
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
    const correctAnswer = currentQuestion?.correctAnswer;
    const isCorrect = correctAnswer ? (normalize(answer) === normalize(correctAnswer)) : false;
    gameData.playerAnswers[socket.id] = { answer, isCorrect };
    const answersCount = Object.keys(gameData.playerAnswers).length;
    const aPlayerWasCorrect = Object.values(gameData.playerAnswers).some(p => p.isCorrect);
    let roundOver = false;
    if (room.gameMode === 'revancha') {
      if (aPlayerWasCorrect || answersCount === 2) roundOver = true;
    } else {
      if (answersCount === 2) roundOver = true;
    }
    if (roundOver) {
      for (const playerId in gameData.playerAnswers) {
        if (gameData.playerAnswers[playerId].isCorrect) gameData.scores[playerId]++;
      }
      io.to(roomCode).emit('roundResult', {
        playerAnswers: gameData.playerAnswers,
        correctAnswer: correctAnswer || 'Error',
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
    if (room.rematchVoters.size === 2) {
      startGame(data.roomCode, room.gameType || 'normal');
    }
  });

  socket.on('disconnect', () => {
    console.log(`Usuario desconectado: ${socket.id}`);
    // Eliminar usuario de userSockets
    for (const [uid, sid] of Object.entries(userSockets)) {
      if (sid === socket.id) {
        delete userSockets[uid];
        console.log(`🗑️ Usuario ${uid} eliminado de userSockets`);
        break;
      }
    }
    matchmakingPool = matchmakingPool.filter(p => p.socketId !== socket.id);
    for (const roomCode in rooms) {
      const room = rooms[roomCode];
      const playerIndex = room.players.indexOf(socket.id);
      if (playerIndex > -1) {
        const disconnectedPlayerName = room.playerData[socket.id]?.name || 'Un jugador';
        room.players.splice(playerIndex, 1);
        delete room.playerData[socket.id];
        if (room.players.length < 2) {
          if (room.players.length === 1) {
            const remainingPlayerSocketId = room.players[0];
            io.to(remainingPlayerSocketId).emit('opponentLeft', `${disconnectedPlayerName} ha abandonado la partida.`);
          }
          delete rooms[roomCode];
        }
        break;
      }
    }
  });
});

// ============================================
// FUNCIONES DEL JUEGO 1VS1
// ============================================

// ============================================
// 🔥 FUNCIÓN PARA MAPEAR NIVEL PROMEDIO A RANGO DE PREGUNTAS
// ============================================
function obtenerRangoNiveles(nivelPromedio) {
  if (nivelPromedio <= 3) return { min: 1, max: 5 };
  if (nivelPromedio <= 6) return { min: 3, max: 10 };
  if (nivelPromedio <= 10) return { min: 6, max: 15 };
  if (nivelPromedio <= 15) return { min: 10, max: 20 };
  if (nivelPromedio <= 20) return { min: 15, max: 25 };
  return { min: 20, max: 30 };
}

// ============================================
// 🔥 FUNCIÓN PARA OBTENER PREGUNTAS DESDE MYSQL CON FILTRO POR NIVEL
// ============================================
async function getQuestionsFromDB(gameType = 'normal', cantidad = 5, nivelPromedio = null) {
  try {
    const { pool } = require('./config/database');
    
    let query = `
      SELECT 
        p.id,
        JSON_EXTRACT(p.texto, '$.es') as question,
        p.dificultad,
        GROUP_CONCAT(DISTINCT JSON_UNQUOTE(JSON_EXTRACT(o.texto, '$.es')) ORDER BY o.orden SEPARATOR '|||') as options_raw,
        JSON_UNQUOTE(
          (SELECT JSON_EXTRACT(o2.texto, '$.es') 
           FROM opciones o2 
           WHERE o2.pregunta_id = p.id AND o2.es_correcta = TRUE 
           LIMIT 1)
        ) as correctAnswer
      FROM preguntas p
      JOIN niveles n ON p.nivel_id = n.id
      JOIN materias m ON n.materia_id = m.id
      JOIN opciones o ON o.pregunta_id = p.id
    `;
    
    // 🔥 FILTRO POR TIPO DE JUEGO
    if (gameType === 'maths') {
      query += ` WHERE LOWER(m.nombre) = 'matematicas'`;
    } else {
      query += ` WHERE LOWER(m.nombre) != 'matematicas'`;
    }
    
    // 🔥 FILTRO POR NIVEL PROMEDIO (si se proporciona)
    if (nivelPromedio !== null && nivelPromedio > 0) {
      const rango = obtenerRangoNiveles(nivelPromedio);
      query += ` AND n.numero BETWEEN ${rango.min} AND ${rango.max}`;
      console.log(`🎯 Nivel promedio: ${nivelPromedio} → Rango de niveles: ${rango.min}-${rango.max}`);
    }
    
    query += ` GROUP BY p.id ORDER BY RAND() LIMIT ?`;
    
    const [rows] = await pool.query(query, [cantidad]);
    
    // 🔥 Si no hay suficientes preguntas, expandir el rango y reintentar
    if (rows.length < cantidad && nivelPromedio !== null && nivelPromedio > 0) {
      console.log(`⚠️ Solo ${rows.length} preguntas encontradas en el rango inicial. Expandiendo...`);
      
      // Expandir rango gradualmente (sumar 5 al mínimo y al máximo)
      let rangoExpandido = { min: 1, max: 30 };
      let rangoActual = obtenerRangoNiveles(nivelPromedio);
      
      // Intentar con un rango más amplio (todo el rango de la materia)
      let queryExpandida = `
        SELECT 
          p.id,
          JSON_EXTRACT(p.texto, '$.es') as question,
          p.dificultad,
          GROUP_CONCAT(DISTINCT JSON_UNQUOTE(JSON_EXTRACT(o.texto, '$.es')) ORDER BY o.orden SEPARATOR '|||') as options_raw,
          JSON_UNQUOTE(
            (SELECT JSON_EXTRACT(o2.texto, '$.es') 
             FROM opciones o2 
             WHERE o2.pregunta_id = p.id AND o2.es_correcta = TRUE 
             LIMIT 1)
          ) as correctAnswer
        FROM preguntas p
        JOIN niveles n ON p.nivel_id = n.id
        JOIN materias m ON n.materia_id = m.id
        JOIN opciones o ON o.pregunta_id = p.id
      `;
      
      if (gameType === 'maths') {
        queryExpandida += ` WHERE LOWER(m.nombre) = 'matematicas'`;
      } else {
        queryExpandida += ` WHERE LOWER(m.nombre) != 'matematicas'`;
      }
      
      queryExpandida += ` GROUP BY p.id ORDER BY RAND() LIMIT ?`;
      
      const [rowsExpandidas] = await pool.query(queryExpandida, [cantidad]);
      
      if (rowsExpandidas.length > 0) {
        console.log(`✅ ${rowsExpandidas.length} preguntas encontradas en rango expandido`);
        return rowsExpandidas.map(row => {
          let optionsArray = [];
          if (row.options_raw) {
            optionsArray = row.options_raw.split('|||').map(o => o.trim()).filter(o => o.length > 0);
          }
          
          if (optionsArray.length === 0) {
            optionsArray = ['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4'];
          }
          
          return {
            question: row.question || 'Pregunta sin texto',
            options: optionsArray,
            correctAnswer: row.correctAnswer || optionsArray[0] || 'Respuesta no disponible',
            difficulty: row.dificultad || 'easy'
          };
        });
      }
    }
    
    return rows.map(row => {
      let optionsArray = [];
      if (row.options_raw) {
        optionsArray = row.options_raw.split('|||').map(o => o.trim()).filter(o => o.length > 0);
      }
      
      if (optionsArray.length === 0) {
        optionsArray = ['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4'];
      }
      
      return {
        question: row.question || 'Pregunta sin texto',
        options: optionsArray,
        correctAnswer: row.correctAnswer || optionsArray[0] || 'Respuesta no disponible',
        difficulty: row.dificultad || 'easy'
      };
    });
  } catch (error) {
    console.error('❌ Error obteniendo preguntas de MySQL:', error);
    return getFallbackQuestions(gameType, cantidad);
  }
}

// PREGUNTAS DE FALLBACK
function getFallbackQuestions(gameType = 'normal', cantidad = 5) {
  const fallback = [
    { question: '¿Cuál es la capital de Francia?', options: ['Madrid', 'París', 'Roma', 'Londres'], correctAnswer: 'París', difficulty: 'easy' },
    { question: '¿2 + 2?', options: ['3', '4', '5', '6'], correctAnswer: '4', difficulty: 'easy' },
    { question: '¿Qué planeta es conocido como el planeta rojo?', options: ['Venus', 'Marte', 'Júpiter', 'Saturno'], correctAnswer: 'Marte', difficulty: 'medium' }
  ];
  const shuffled = [...fallback].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, cantidad);
}

// ============================================
// 🔥 INICIAR PARTIDA (con nivel promedio)
// ============================================
function startGame(roomCode, gameType = 'normal') {
  const room = rooms[roomCode];
  if (!room || room.players.length !== 2) return;
  
  // 🔥 Calcular nivel promedio de los jugadores
  const playerIds = room.players;
  const nivel1 = room.playerData[playerIds[0]]?.level || 1;
  const nivel2 = room.playerData[playerIds[1]]?.level || 1;
  const nivelPromedio = Math.round((nivel1 + nivel2) / 2);
  
  // Guardar nivel promedio en la sala
  room.nivelPromedio = nivelPromedio;
  console.log(`📊 Nivel promedio de los jugadores: ${nivelPromedio} (J1: ${nivel1}, J2: ${nivel2})`);
  
  room.gameMode = Math.random() < 0.5 ? 'normal' : 'revancha';
  room.rematchVoters = new Set();
  
  console.log(`--- INICIANDO PARTIDA --- Sala: ${roomCode}, Modo: ${room.gameMode}, Tipo: ${gameType}`);
  
  // 🔥 Pasar el nivel promedio a getQuestionsFromDB
  getQuestionsFromDB(gameType, 5, nivelPromedio).then(selectedQuestions => {
    if (selectedQuestions.length === 0) {
      io.to(roomCode).emit('error', 'No se pudieron cargar preguntas');
      return;
    }
    
    room.gameData = {
      questions: selectedQuestions,
      currentQuestionIndex: 0,
      scores: { [room.players[0]]: 0, [room.players[1]]: 0 },
      playerAnswers: {}
    };
    
    io.to(roomCode).emit('startCountdown', { gameMode: room.gameMode, roomCode, gameType });
    
    setTimeout(() => {
      const firstQuestion = room.gameData.questions[0];
      io.to(roomCode).emit('nextQuestion', { 
        question: firstQuestion.question, 
        options: firstQuestion.options 
      });
      startQuestionTimer(roomCode, firstQuestion.difficulty);
    }, 4000);
  });
}

// INICIAR TEMPORIZADOR
function startQuestionTimer(roomCode, difficulty = 'easy') {
  const room = rooms[roomCode];
  if (!room || !room.gameData) return;
  
  if (room.timerInterval) clearInterval(room.timerInterval);
  
  let timeLeft = 10;
  if (difficulty === 'hard') timeLeft = 18;
  else if (difficulty === 'medium') timeLeft = 14;
  
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
      setTimeout(() => proceedToNextQuestion(roomCode), 2000);
    }
  }, 1000);
}

// SIGUIENTE PREGUNTA
function proceedToNextQuestion(roomCode) {
  const room = rooms[roomCode];
  if (!room || !room.gameData) return;
  
  if (room.timerInterval) clearInterval(room.timerInterval);
  
  room.gameData.currentQuestionIndex++;
  room.gameData.playerAnswers = {};
  
  if (room.gameData.currentQuestionIndex >= room.gameData.questions.length) {
    handleEndGame(roomCode);
  } else {
    const nextQuestion = room.gameData.questions[room.gameData.currentQuestionIndex];
    io.to(roomCode).emit('nextQuestion', { 
      question: nextQuestion.question, 
      options: nextQuestion.options 
    });
    startQuestionTimer(roomCode, nextQuestion.difficulty);
  }
}

// FINALIZAR PARTIDA Y GUARDAR EN MYSQL
async function handleEndGame(roomCode) {
  const room = rooms[roomCode];
  if (!room || !room.gameData) return;
  
  io.to(roomCode).emit('endGame', { 
    scores: room.gameData.scores, 
    playerData: room.playerData 
  });
  
  const scores = room.gameData.scores;
  const playerSocketIds = Object.keys(scores);
  
  if (playerSocketIds.length < 2) return;
  
  const [p1_socketId, p2_socketId] = playerSocketIds;
  const p1_uid = room.playerData[p1_socketId]?.uid;
  const p2_uid = room.playerData[p2_socketId]?.uid;
  
  if (!p1_uid || !p2_uid) {
    console.error('❌ No se encontraron UIDs de los jugadores');
    return;
  }
  
  try {
    const { pool } = require('./config/database');
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    
    // Actualizar partidas jugadas
    await connection.query('UPDATE usuarios SET partidas_jugadas = partidas_jugadas + 1 WHERE id = ?', [p1_uid]);
    await connection.query('UPDATE usuarios SET partidas_jugadas = partidas_jugadas + 1 WHERE id = ?', [p2_uid]);
    
    const p1Score = scores[p1_socketId] || 0;
    const p2Score = scores[p2_socketId] || 0;
    
    // ============================================
    // 🔥 GENERAR room_code ÚNICO (más seguro)
    // ============================================
    const timestamp = Date.now();
    const random1 = Math.random().toString(36).substring(2, 8);
    const random2 = Math.random().toString(36).substring(2, 8);
    const uniqueRoomCode = `p_${timestamp}_${random1}${random2}`;
    
    console.log(`📝 Guardando partida con room_code: ${uniqueRoomCode}`);
    
    // Insertar partida
    const ganadorId = p1Score > p2Score ? p1_uid : (p2Score > p1Score ? p2_uid : null);
    
    await connection.query(
      `INSERT INTO partidas 
       (anfitrion_id, oponente_id, room_code, tipo_juego, modo_juego, estado, fecha_inicio, fecha_fin, ganador_id)
       VALUES (?, ?, ?, ?, ?, 'finalizada', NOW(), NOW(), ?)`,
      [
        p1_uid, 
        p2_uid, 
        uniqueRoomCode, 
        room.gameType || 'normal', 
        room.gameMode || 'normal', 
        ganadorId
      ]
    );
    
    // ============================================
    // 🔥 ACTUALIZAR XP DE 1VS1 Y PARTIDAS GANADAS
    // ============================================
    if (p1Score > p2Score) {
      // Jugador 1 GANA: +50 XP, Jugador 2: +10 XP
      await connection.query(
        'UPDATE usuarios SET partidas_ganadas = partidas_ganadas + 1, pvpXp = pvpXp + 50 WHERE id = ?',
        [p1_uid]
      );
      await connection.query(
        'UPDATE usuarios SET pvpXp = pvpXp + 10 WHERE id = ?',
        [p2_uid]
      );
    } else if (p2Score > p1Score) {
      // Jugador 2 GANA: +50 XP, Jugador 1: +10 XP
      await connection.query(
        'UPDATE usuarios SET partidas_ganadas = partidas_ganadas + 1, pvpXp = pvpXp + 50 WHERE id = ?',
        [p2_uid]
      );
      await connection.query(
        'UPDATE usuarios SET pvpXp = pvpXp + 10 WHERE id = ?',
        [p1_uid]
      );
    } else {
      // EMPATE: +15 XP para ambos
      await connection.query(
        'UPDATE usuarios SET pvpXp = pvpXp + 15 WHERE id = ?',
        [p1_uid]
      );
      await connection.query(
        'UPDATE usuarios SET pvpXp = pvpXp + 15 WHERE id = ?',
        [p2_uid]
      );
    }
    
    await connection.commit();
    connection.release();
    
    console.log(`✅ Partida ${uniqueRoomCode} guardada en MySQL`);
    
  } catch (error) {
    console.error('❌ Error al guardar datos de 1vs1 en MySQL:', error);
  }
}

// NORMALIZAR TEXTO
function normalize(str) {
  return (str || '').toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// ============================================
// ÁRBITRO DE MATCHMAKING
// ============================================
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
    
    const tempRoomId = `vote_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    
    rooms[tempRoomId] = {
      players: [player1.socketId, player2.socketId],
      playerData: { 
        [player1.socketId]: player1.data, 
        [player2.socketId]: player2.data 
      },
      votes: new Set(),
      gameType: player1.data.gameType || 'normal'
    };
    
    socket1.join(tempRoomId);
    socket2.join(tempRoomId);
    
    socket1.emit('matchFound', { roomId: tempRoomId, opponent: player2.data });
    socket2.emit('matchFound', { roomId: tempRoomId, opponent: player1.data });
  }
}, 3000);

// ============================================
// INICIO DEL SERVIDOR
// ============================================
const PORT = process.env.PORT || 3000;

async function startServer() {
  console.log('🚀 Iniciando servidor Sabiquiz...');
  console.log('📡 Verificando conexión a la base de datos...');
  
  const dbConnected = await testConnection();
  if (!dbConnected) {
    console.error('❌ No se pudo conectar a la base de datos.');
    process.exit(1);
  }
  
  server.listen(PORT, () => {
    console.log(`✅ Servidor 1vs1 escuchando en http://localhost:${PORT}`);
    console.log(`📊 Usando MySQL como base de datos`);
    console.log(`📨 Sistema de notificaciones en tiempo real activo`);
    console.log(`🎯 Filtro de preguntas por nivel activo`);
  });
}

// Exportar funciones para usar en otras rutas
module.exports = { io, sendNotification, userSockets };

startServer();