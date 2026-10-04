// ============================================
// SERVIDOR PRINCIPAL DE SABIQUIZ
// ============================================
const express = require('express');
const fs = require('fs');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { testConnection } = require('./config/database');

// Importar rutas de la API
const authRoutes = require('./routes/auth');
const quizRoutes = require('./routes/quiz');
const progressRoutes = require('./routes/progress');
const suggestionRoutes = require('./routes/suggestions');
const matchesRoutes = require('./routes/matches');
const minigamesRoutes = require('./routes/minigames');
const torneosRoutes = require('./routes/torneos');
const profileRoutes = require('./routes/profile');
const sabiRoutes = require('./routes/sabi');

// Utilidades compartidas de torneos
const { updateTournamentStates, calcularRankingTorneo } = require('./utils/torneos');

// Configuración de CORS
const allowedOrigins = [
  // Desarrollo local
  'http://localhost:3000',
  'http://localhost:5500',
  'http://localhost:10000',
  'http://127.0.0.1:5500',
  'http://127.0.0.1:3000',
  
  // Producción
  'https://sabiquiz.onrender.com',
  
  // Orígenes adicionales desde variable de entorno (separados por comas)
  ...(process.env.EXTRA_ORIGINS 
    ? process.env.EXTRA_ORIGINS.split(',').map(o => o.trim()) 
    : [])
].filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    // Permitir peticiones sin origin (Postman, curl, mobile apps)
    if (!origin) return callback(null, true);
    
    // Verificar si el origen está permitido
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.warn(`⚠️ Origen bloqueado por CORS: ${origin}`);
      callback(new Error('Origen no permitido por CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// ============================================
// CONFIGURACIÓN DE EXPRESS
// ============================================
const app = express();
const server = http.createServer(app);

const io = socketIO(server, {
  cors: { origin: ORIGENES_PERMITIDOS, methods: ['GET', 'POST'] }
});

// ============================================
// MIDDLEWARES DE SEGURIDAD
// ============================================
app.disable('x-powered-by');
app.set('trust proxy', 1);   // para que req.ip sea correcto detrás de un proxy

// Cabeceras de seguridad (sin dependencias externas)
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  next();
});

// CORS restringido a la lista blanca
app.use(cors(corsOptions));

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// ============================================
// LÍMITE DE PETICIONES (implementación propia, sin dependencias)
// ============================================
const buckets = new Map();
function rateLimit({ ventanaMs, maximo, mensaje }) {
  return (req, res, next) => {
    const clave = `${req.ip}|${req.baseUrl || ''}${req.path}`;
    const ahora = Date.now();
    let b = buckets.get(clave);
    if (!b || ahora > b.expira) { b = { cuenta: 0, expira: ahora + ventanaMs }; buckets.set(clave, b); }
    b.cuenta++;
    if (b.cuenta > maximo) {
      res.setHeader('Retry-After', Math.max(1, Math.ceil((b.expira - ahora) / 1000)));
      return res.status(429).json({ success: false, error: mensaje || '⛔ Demasiadas peticiones. Intenta más tarde.' });
    }
    next();
  };
}
// Limpieza periódica para que el Map no crezca sin límite
setInterval(() => {
  const ahora = Date.now();
  for (const [k, v] of buckets) if (ahora > v.expira) buckets.delete(k);
}, 60000).unref();

app.use('/api/auth/login', rateLimit({ ventanaMs: 15 * 60 * 1000, maximo: 20 }));
app.use('/api/auth/register', rateLimit({ ventanaMs: 60 * 60 * 1000, maximo: 10 }));
app.use('/api/auth/forgot-password', rateLimit({ ventanaMs: 60 * 60 * 1000, maximo: 5 }));
app.use('/api/auth/reset-password', rateLimit({ ventanaMs: 60 * 60 * 1000, maximo: 10 }));
app.use('/api', rateLimit({ ventanaMs: 60 * 1000, maximo: 400 }));

// ============================================
// SERVIR ARCHIVOS ESTÁTICOS (FRONTEND)
// ============================================
// La raíz del proyecto se sirve para el frontend, pero NUNCA debe exponer
// código fuente, secretos, dependencias ni volcados de la base de datos.
const publicPath = path.resolve(__dirname, '..');

const RUTAS_PROHIBIDAS = [
  /^\/server(\/|$)/i,                       // backend completo
  /^\/node_modules(\/|$)/i,                 // dependencias (101 MB)
  /^\/\.git(\/|$)/i,                        // historial de Git
  /^\/\.env/i,                              // secretos
  /^\/\.gitignore$/i,
  /^\/package(-lock)?\.json$/i,             // configuración del proyecto
  /^\/serviceAccountKey\.json$/i,           // clave privada de Firebase
  /^\/[^/]+\.md$/i,                         // reportes de auditoría
  /^\/materias\/[^/]*-data\.js$/i,          // semillas con las 1.050 respuestas
  /\.(sql|log|bak|old|sqlite|db)$/i         // volcados y respaldos
];

app.use((req, res, next) => {
  if (RUTAS_PROHIBIDAS.some(re => re.test(req.path))) {
    return res.status(404).json({ success: false, error: 'Ruta no encontrada' });
  }

  if (req.method !== 'GET' || req.path.startsWith('/api/') || req.path.startsWith('/css/') || req.path.startsWith('/js/') || req.path.startsWith('/img/') || req.path.startsWith('/components/')) {
    return next();
  }

  const htmlRoutes = ['/', '/index.html', '/main_menu', '/main_menu.html', '/profile', '/profile.html', '/leaderboard', '/leaderboard.html', '/quiz_runner', '/quiz_runner.html', '/admin_panel', '/admin_panel.html', '/suggestions', '/suggestions.html', '/torneos', '/torneos.html'];
  const isHtmlRoute = req.path.endsWith('.html') || htmlRoutes.includes(req.path);

  if (isHtmlRoute) {
    const normalizedPath = req.path === '/' ? 'index.html' : req.path.replace(/^\/+/, '');
    const filePath = path.join(publicPath, normalizedPath.endsWith('.html') ? normalizedPath : `${normalizedPath}.html`);

    if (fs.existsSync(filePath)) {
      const html = fs.readFileSync(filePath, 'utf8');
      return res.send(injectSharedLayout(html, req.path));
    }
  }

  next();
});

function injectSharedLayout(html, requestPath = '') {
  if (!html || typeof html !== 'string') return html;

  const excluded = ['/login', '/login.html', '/forgot-password', '/forgot-password.html', '/reset-password', '/reset-password.html'];
  if (excluded.includes(requestPath) || requestPath.includes('login') || requestPath.includes('forgot-password') || requestPath.includes('reset-password')) {
    return html;
  }

  let updated = html;

  if (!updated.includes('/css/design-system.css')) {
    updated = updated.replace(/<\/head>/i, '<link rel="stylesheet" href="/css/design-system.css"><link rel="stylesheet" href="/css/navbar.css"></head>');
  }

  if (!updated.includes('/js/layout.js')) {
    updated = updated.replace(/<\/body>/i, '<script src="/js/layout.js" defer></script></body>');
  }

  if (!updated.includes('id="navbar-container"')) {
    updated = updated.replace(/<body[^>]*>/i, '$&<div id="navbar-container"></div>');
  }

  return updated;
}

function sendHtmlFile(res, relativePath) {
  const filePath = path.join(publicPath, relativePath);
  if (!fs.existsSync(filePath)) {
    return res.status(404).send('Página no encontrada');
  }

  const html = fs.readFileSync(filePath, 'utf8');
  res.send(injectSharedLayout(html, '/' + relativePath));
}

app.use(express.static(publicPath, { dotfiles: 'ignore', index: false, setHeaders: (res) => { res.set('Cache-Control', 'no-store'); } }));

// ============================================
// RUTAS DE LA API
// ============================================
app.use('/api/auth', authRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/suggestions', suggestionRoutes);
app.use('/api/matches', matchesRoutes);
app.use('/api/minigames', minigamesRoutes);
app.use('/api/torneos', torneosRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/sabi', sabiRoutes);

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
  sendHtmlFile(res, 'index.html');
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(publicPath, 'login.html'));
});

app.get('/login.html', (req, res) => {
  res.sendFile(path.join(publicPath, 'login.html'));
});

app.get('/main_menu', (req, res) => {
  sendHtmlFile(res, 'main_menu.html');
});

app.get('/main_menu.html', (req, res) => {
  sendHtmlFile(res, 'main_menu.html');
});

app.get('/profile', (req, res) => {
  sendHtmlFile(res, 'profile.html');
});

app.get('/profile.html', (req, res) => {
  sendHtmlFile(res, 'profile.html');
});

app.get('/leaderboard', (req, res) => {
  sendHtmlFile(res, 'leaderboard.html');
});

app.get('/leaderboard.html', (req, res) => {
  sendHtmlFile(res, 'leaderboard.html');
});

app.get('/quiz_runner', (req, res) => {
  sendHtmlFile(res, 'quiz_runner.html');
});

app.get('/quiz_runner.html', (req, res) => {
  sendHtmlFile(res, 'quiz_runner.html');
});

app.get('/admin_panel', (req, res) => {
  sendHtmlFile(res, 'admin_panel.html');
});

app.get('/admin_panel.html', (req, res) => {
  sendHtmlFile(res, 'admin_panel.html');
});

app.get('/suggestions', (req, res) => {
  sendHtmlFile(res, 'suggestions.html');
});

app.get('/suggestions.html', (req, res) => {
  sendHtmlFile(res, 'suggestions.html');
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
const notificationManager = require('./utils/notifications');

const userSockets = {};

// Conectar el módulo de notificaciones
notificationManager.setIO(io);
notificationManager.setUserSockets(userSockets);

// Función para enviar notificación (wrapper para compatibilidad)
function sendNotification(uid, type, data) {
    return notificationManager.sendNotification(uid, type, data);
}

// ============================================
// SOCKET.IO - LÓGICA 1VS1
// ============================================
let rooms = {};
let matchmakingPool = [];

// ============================================
// AUTENTICACIÓN DE SOCKETS (JWT en el handshake)
// ============================================
// Antes cualquier cliente anónimo podía conectarse y decir "soy el usuario X"
// mediante el evento registerUser(uid), recibiendo notificaciones ajenas.
// Ahora el uid se deriva del token firmado y no se acepta del cliente.
io.use((socket, next) => {
  const token = (socket.handshake.auth && socket.handshake.auth.token) ||
                socket.handshake.query.token;
  if (!token) return next(new Error('AUTH_REQUIRED'));
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.id) return next(new Error('AUTH_INVALID'));
    socket.userId = decoded.id;
    return next();
  } catch (e) {
    return next(new Error('AUTH_INVALID'));
  }
});

io.on('connection', (socket) => {
  const uid = socket.userId;
  console.log(`Usuario conectado: ${socket.id} (uid ${uid})`);

  // Registro automático para notificaciones (el uid viene del token)
  userSockets[uid] = socket.id;

  // Compatibilidad con el cliente antiguo: el argumento se ignora a propósito
  socket.on('registerUser', () => {
    userSockets[uid] = socket.id;
  });

  socket.on('findMatch', (playerData) => {
    if (matchmakingPool.some(p => p.socketId === socket.id)) return;
    // El uid SIEMPRE se toma del token, nunca del cliente
    const data = Object.assign({}, playerData || {}, { uid });
    matchmakingPool.push({ socketId: socket.id, data });
  });

  socket.on('cancelFindMatch', () => {
    matchmakingPool = matchmakingPool.filter(p => p.socketId !== socket.id);
  });

  socket.on('createRoom', (data) => {
    const { roomCode, player, gameType } = data || {};
    if (!roomCode) return;
    // El uid del jugador se fuerza desde el token
    const jugador = Object.assign({}, player || {}, { uid });
    if (rooms[roomCode] && rooms[roomCode].players.length < 2) {
      if (rooms[roomCode].players.includes(socket.id)) return;   // ya está dentro
      socket.join(roomCode);
      rooms[roomCode].players.push(socket.id);
      rooms[roomCode].playerData[socket.id] = jugador;
      io.to(roomCode).emit('playerJoined', rooms[roomCode].players.length);
      if (rooms[roomCode].players.length === 2) {
        rooms[roomCode].rematchVoters = new Set();
        startGame(roomCode, rooms[roomCode].gameType || gameType || 'normal');
      }
    } else if (!rooms[roomCode]) {
      socket.join(roomCode);
      rooms[roomCode] = {
        players: [socket.id],
        playerData: { [socket.id]: jugador },
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
    // Solo las salas de votación tienen `votes`; las creadas por código no.
    if (!room || !room.votes || !room.players.includes(socket.id)) return;
    if (room.votes.has(socket.id)) return;
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
    // Solo se reencola a quien realmente estaba en la cola de emparejamiento
    // (las salas creadas por código no participan del matchmaking).
    if (room.votes) {
      room.players.forEach(playerId => {
        const playerProfile = room.playerData[playerId];
        if (playerProfile && playerProfile.uid) {
          matchmakingPool.unshift({ socketId: playerId, data: playerProfile });
        }
      });
    }
    if (room.timerInterval) clearInterval(room.timerInterval);
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

    // Detalle por pregunta, para poder persistirlo en `detalles_partida`
    if (gameData.detalle && gameData.detalle[socket.id]) {
      const idxOpcion = Array.isArray(currentQuestion.options)
        ? currentQuestion.options.indexOf(answer) : -1;
      gameData.detalle[socket.id].push({
        preguntaId: currentQuestion.preguntaId || null,
        opcionSeleccionadaId: (idxOpcion >= 0 && Array.isArray(currentQuestion.optionIds))
          ? currentQuestion.optionIds[idxOpcion] : null,
        tiempoRespuesta: gameData.preguntaInicio
          ? Math.min(99.99, (Date.now() - gameData.preguntaInicio) / 1000) : null,
        isCorrect
      });
    }
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
    const room = rooms[data && data.roomCode];
    if (!room || !room.rematchVoters || room.rematchVoters.has(socket.id)) return;
    room.rematchVoters.add(socket.id);
    if (room.rematchVoters.size === 2) {
      startGame(data.roomCode, room.gameType || 'normal');
    }
  });

  socket.on('disconnect', () => {
    console.log(`Usuario desconectado: ${socket.id}`);
    // Eliminar usuario de userSockets
    for (const [u, sid] of Object.entries(userSockets)) {
      if (sid === socket.id) {
        delete userSockets[u];
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
          // Limpiar el temporizador antes de borrar la sala (antes quedaba huérfano)
          if (room.timerInterval) clearInterval(room.timerInterval);
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
// Compara el nombre de la materia ignorando tildes y mayúsculas.
// Antes se usaba LOWER(m.nombre) = 'matematicas', que NUNCA coincidía con
// 'Matemáticas' (la tilde no se elimina con LOWER) y el modo "maths" caía
// siempre al fallback de 3 preguntas de cultura general.
const SQL_MATERIA_SIN_ACENTOS = `REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
  LOWER(m.nombre),'á','a'),'é','e'),'í','i'),'ó','o'),'ú','u')`;

function filaAPregunta(row) {
  // options_raw y option_ids_raw se generan con el MISMO ORDER BY o.orden,
  // así que se recorren en paralelo para no desalinear texto e id.
  const textos = String(row.options_raw || '').split('|||');
  const ids = String(row.option_ids_raw || '').split('|||');
  const opciones = [];
  for (let k = 0; k < textos.length; k++) {
    const texto = (textos[k] || '').trim();
    if (!texto) continue;
    opciones.push({ id: Number((ids[k] || '').trim()) || null, texto });
  }
  if (opciones.length === 0) {
    ['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4'].forEach(t => opciones.push({ id: null, texto: t }));
  }
  const correcta = row.correctAnswer || opciones[0].texto;
  const opcionCorrecta = opciones.find(o => o.texto === correcta);

  return {
    preguntaId: row.id,
    question: row.question || 'Pregunta sin texto',
    options: opciones.map(o => o.texto),
    optionIds: opciones.map(o => o.id),
    correctAnswer: correcta,
    opcionCorrectaId: opcionCorrecta ? opcionCorrecta.id : null,
    difficulty: row.dificultad || 'easy'
  };
}

const SELECT_PREGUNTAS_1VS1 = `
  SELECT
    p.id,
    JSON_UNQUOTE(JSON_EXTRACT(p.texto, '$.es')) as question,
    p.dificultad,
    GROUP_CONCAT(JSON_UNQUOTE(JSON_EXTRACT(o.texto, '$.es')) ORDER BY o.orden SEPARATOR '|||') as options_raw,
    GROUP_CONCAT(o.id ORDER BY o.orden SEPARATOR '|||') as option_ids_raw,
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

async function getQuestionsFromDB(gameType = 'normal', cantidad = 5, nivelPromedio = null) {
  try {
    const { pool } = require('./config/database');

    // Solo materias activas: excluye la materia oculta de los minijuegos (id 8)
    let where = gameType === 'maths'
      ? ` WHERE m.activo = 1 AND ${SQL_MATERIA_SIN_ACENTOS} = 'matematicas'`
      : ` WHERE m.activo = 1 AND ${SQL_MATERIA_SIN_ACENTOS} <> 'matematicas'`;
    const params = [];

    const conRango = nivelPromedio !== null && nivelPromedio > 0;
    if (conRango) {
      const rango = obtenerRangoNiveles(nivelPromedio);
      where += ` AND n.numero BETWEEN ? AND ?`;
      params.push(rango.min, rango.max);
      console.log(`🎯 Nivel promedio: ${nivelPromedio} → Rango de niveles: ${rango.min}-${rango.max}`);
    }

    const [rows] = await pool.query(
      `${SELECT_PREGUNTAS_1VS1}${where} GROUP BY p.id ORDER BY RAND() LIMIT ?`,
      [...params, cantidad]
    );

    // Si no hay suficientes preguntas en el rango, se reintenta sin filtro de nivel
    if (rows.length < cantidad && conRango) {
      console.log(`⚠️ Solo ${rows.length} preguntas en el rango inicial. Expandiendo a todos los niveles...`);
      const whereAmplio = gameType === 'maths'
        ? ` WHERE m.activo = 1 AND ${SQL_MATERIA_SIN_ACENTOS} = 'matematicas'`
        : ` WHERE m.activo = 1 AND ${SQL_MATERIA_SIN_ACENTOS} <> 'matematicas'`;
      const [rowsExpandidas] = await pool.query(
        `${SELECT_PREGUNTAS_1VS1}${whereAmplio} GROUP BY p.id ORDER BY RAND() LIMIT ?`,
        [cantidad]
      );
      if (rowsExpandidas.length > 0) {
        console.log(`✅ ${rowsExpandidas.length} preguntas encontradas en rango expandido`);
        return rowsExpandidas.map(filaAPregunta);
      }
    }

    return rows.map(filaAPregunta);
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
      playerAnswers: {},
      // Acumula el detalle de cada respuesta para persistirlo en `detalles_partida`
      detalle: { [room.players[0]]: [], [room.players[1]]: [] },
      preguntaInicio: Date.now()
    };
    
    io.to(roomCode).emit('startCountdown', { gameMode: room.gameMode, roomCode, gameType });
    
    setTimeout(() => {
      const firstQuestion = room.gameData.questions[0];
      room.gameData.preguntaInicio = Date.now();
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
  room.gameData.preguntaInicio = Date.now();
  
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

  // Nunca guardar una partida contra uno mismo
  if (!p1_uid || !p2_uid || p1_uid === p2_uid) {
    console.error('❌ Partida descartada: UIDs ausentes o iguales');
    if (room.timerInterval) clearInterval(room.timerInterval);
    delete rooms[roomCode];
    return;
  }

  const preguntasPartida = (room.gameData && room.gameData.questions) || [];
  const respuestasPartida = (room.gameData && room.gameData.detalle) || {};

  let connection;
  try {
    const { pool } = require('./config/database');
    connection = await pool.getConnection();
    await connection.beginTransaction();

    // Actualizar partidas jugadas
    await connection.query('UPDATE usuarios SET partidas_jugadas = partidas_jugadas + 1 WHERE id = ?', [p1_uid]);
    await connection.query('UPDATE usuarios SET partidas_jugadas = partidas_jugadas + 1 WHERE id = ?', [p2_uid]);

    const p1Score = scores[p1_socketId] || 0;
    const p2Score = scores[p2_socketId] || 0;

    const timestamp = Date.now();
    const random1 = Math.random().toString(36).substring(2, 8);
    const random2 = Math.random().toString(36).substring(2, 8);
    const uniqueRoomCode = `p_${timestamp}_${random1}${random2}`;

    const ganadorId = p1Score > p2Score ? p1_uid : (p2Score > p1Score ? p2_uid : null);

    // modo_juego debe ser uno de los valores del ENUM ('solitario' | '1vs1').
    // Antes se escribía 'normal'/'revancha', que no existen en el ENUM.
    const [insPartida] = await connection.query(
      `INSERT INTO partidas
       (anfitrion_id, oponente_id, room_code, tipo_juego, modo_juego, estado, fecha_inicio, fecha_fin, ganador_id)
       VALUES (?, ?, ?, ?, '1vs1', 'finalizada', NOW(), NOW(), ?)`,
      [p1_uid, p2_uid, uniqueRoomCode, room.gameType || 'normal', ganadorId]
    );

    // ============================================
    // 🔥 PERSISTIR EL DETALLE POR PREGUNTA (antes nunca se guardaba)
    // ============================================
    const partidaId = insPartida.insertId;
    const filasDetalle = [];
    for (const socketId of [p1_socketId, p2_socketId]) {
      const uidJugador = room.playerData[socketId]?.uid;
      const respuestas = respuestasPartida[socketId] || [];
      respuestas.forEach(r => {
        if (!r.preguntaId) return;
        filasDetalle.push([
          partidaId,
          uidJugador,
          r.preguntaId,
          r.opcionSeleccionadaId || null,
          r.tiempoRespuesta === undefined ? null : r.tiempoRespuesta,
          r.isCorrect ? 1 : 0,
          r.isCorrect ? 10 : 0
        ]);
      });
    }
    if (filasDetalle.length > 0) {
      await connection.query(
        `INSERT IGNORE INTO detalles_partida
         (partida_id, usuario_id, pregunta_id, opcion_seleccionada_id, tiempo_respuesta, es_correcta, puntos)
         VALUES ?`,
        [filasDetalle]
      );
    }

    // ============================================
    // 🔥 ACTUALIZAR XP DE 1VS1 Y PARTIDAS GANADAS
    // ============================================
    if (p1Score > p2Score) {
      await connection.query(
        'UPDATE usuarios SET partidas_ganadas = partidas_ganadas + 1, pvpXp = pvpXp + 50 WHERE id = ?', [p1_uid]);
      await connection.query('UPDATE usuarios SET pvpXp = pvpXp + 10 WHERE id = ?', [p2_uid]);
    } else if (p2Score > p1Score) {
      await connection.query(
        'UPDATE usuarios SET partidas_ganadas = partidas_ganadas + 1, pvpXp = pvpXp + 50 WHERE id = ?', [p2_uid]);
      await connection.query('UPDATE usuarios SET pvpXp = pvpXp + 10 WHERE id = ?', [p1_uid]);
    } else {
      await connection.query('UPDATE usuarios SET pvpXp = pvpXp + 15 WHERE id = ?', [p1_uid]);
      await connection.query('UPDATE usuarios SET pvpXp = pvpXp + 15 WHERE id = ?', [p2_uid]);
    }

    await connection.commit();
    console.log(`✅ Partida ${uniqueRoomCode} guardada (${filasDetalle.length} respuestas detalladas)`);

  } catch (error) {
    if (connection) { try { await connection.rollback(); } catch (e) { /* ya cerrada */ } }
    console.error('❌ Error al guardar datos de 1vs1 en MySQL:', error.message);
  } finally {
    // Sin esto, cada fallo dejaba una conexión del pool ocupada para siempre
    // y a los 10 fallos el backend se quedaba sin conexiones.
    if (connection) connection.release();
    if (room.timerInterval) clearInterval(room.timerInterval);
    delete rooms[roomCode];
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
// VERIFICADOR DE ESTADOS DE TORNEOS (cada 1 minuto)
// ============================================
setInterval(async () => {
  try {
    // Actualizar estados y calcular rankings
    await updateTournamentStates();
    
    // Enviar recordatorios 5 minutos antes (específico del servidor)
    const { pool } = require('./config/database');
    const now = new Date();
    
    const [torneosProximos] = await pool.query(`
      SELECT t.id, t.nombre, t.fecha_inicio, t.materia_id
      FROM torneos t
      WHERE t.estado = 'inscripcion_abierta'
      AND t.fecha_inicio <= DATE_ADD(?, INTERVAL 5 MINUTE)
      AND t.fecha_inicio > ?
    `, [now, now]);

    for (const torneo of torneosProximos) {
      // Enviar notificación a inscritos
      const [inscritos] = await pool.query(`
        SELECT it.usuario_id, u.email, u.username
        FROM inscripciones_torneo it
        JOIN usuarios u ON it.usuario_id = u.id
        WHERE it.torneo_id = ?
      `, [torneo.id]);

      for (const inscrito of inscritos) {
        // Notificación en tiempo real
        try {
          sendNotification(inscrito.usuario_id, 'torneo_recordatorio', {
            torneo_id: torneo.id,
            mensaje: `⏰ ¡El torneo "${torneo.nombre}" empieza en 5 minutos!`
          });
        } catch (e) { /* ignore */ }

        // Notificación en BD
        await pool.query(`
          INSERT INTO notificaciones (usuario_id, tipo, titulo, mensaje, data)
          VALUES (?, 'torneo_recordatorio', '⏰ Torneo pronto', ?, ?)
        `, [inscrito.usuario_id, `El torneo "${torneo.nombre}" comienza en 5 minutos. ¡Prepárate!`, JSON.stringify({ torneo_id: torneo.id })]);
      }
    }
  } catch (error) {
    console.error('Error en verificador de torneos:', error);
  }
}, 60000).unref();

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
module.exports = { io, sendNotification, userSockets, notificationManager };

startServer();