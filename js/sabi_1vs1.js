// ============================================
// SABI 1VS1 - Lógica frontend para partidas contra Sabi
// ============================================
// Uso: Sabi1vs1.iniciar('normal') desde main_menu.html
// ============================================

const Sabi1vs1 = (function () {
  'use strict';

  let matchId = null;
  let preguntas = [];
  let preguntaActual = 0;
  let puntajeUsuario = 0;
  let puntajeSabi = 0;
  let sabiConfig = null;
  let timerInterval = null;
  let tiempoInicio = 0;

  // ============================================
  // OBTENER TOKEN Y API URL
  // ============================================
  function getToken() { return localStorage.getItem('token'); }

  function getApiUrl() {
    return (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
      ? 'http://localhost:3000/api'
      : (window.location.origin + '/api');
  }

  async function apiRequest(endpoint, options = {}) {
    const token = getToken();
    const response = await fetch(`${getApiUrl()}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
        ...(options.headers || {})
      }
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || `Error ${response.status}`);
    return data;
  }

  // ============================================
  // INICIAR PARTIDA VS SABI
  // ============================================
  async function iniciar(tipoJuego = 'normal') {
    try {
      // Mostrar loading en el modal de Sabi
      const sabiModalMessage = document.getElementById('sabiModalMessage');
      if (sabiModalMessage) sabiModalMessage.textContent = 'Preparando la partida...';

      const data = await apiRequest('/sabi/1vs1/crear', {
        method: 'POST',
        body: JSON.stringify({ tipoJuego })
      });

      if (!data.success || !data.partida) {
        throw new Error(data.error || 'Error al crear partida');
      }

      matchId = data.partida.matchId;
      preguntas = data.partida.preguntas;
      sabiConfig = data.partida.sabi;
      preguntaActual = 0;
      puntajeUsuario = 0;
      puntajeSabi = 0;

      // Cerrar modal de Sabi
      closeSabiModal();

      // Configurar UI del juego
      _configurarUIJuego();

      // Mostrar countdown y empezar
      _mostrarCountdown(() => {
        _mostrarPregunta(0);
      });

    } catch (error) {
      console.error('Error iniciando partida vs Sabi:', error);
      alert('❌ Error al crear partida: ' + error.message);
      closeSabiModal();
    }
  }

  // ============================================
  // CONFIGURAR UI DEL JUEGO
  // ============================================
  function _configurarUIJuego() {
    // Ocultar menús y mostrar gameContainer
    const mainMenu = document.getElementById('mainMenu');
    const multiplayerMenu = document.getElementById('multiplayerMenu');
    const gameContainer = document.getElementById('gameContainer');

    if (mainMenu) mainMenu.style.display = 'none';
    if (multiplayerMenu) multiplayerMenu.style.display = 'none';
    if (gameContainer) gameContainer.style.display = 'block';

    // Configurar nombres
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const p1Name = document.getElementById('player1Name');
    const p2Name = document.getElementById('player2Name');
    if (p1Name) p1Name.textContent = user.username || 'Tú';
    if (p2Name) p2Name.textContent = sabiConfig?.nombre || 'Sabi 🤖';

    // Resetear puntajes en UI
    const p1Score = document.getElementById('player1ScoreValue');
    const p2Score = document.getElementById('player2ScoreValue');
    if (p1Score) p1Score.textContent = '0';
    if (p2Score) p2Score.textContent = '0';

    // Configurar modo
    const modeDisplay = document.getElementById('gameModeDisplay');
    if (modeDisplay) modeDisplay.textContent = 'vs Sabi 🤖';

    // Configurar avatar de Sabi en endGame
    const endAvatar2 = document.getElementById('endAvatar2');
    if (endAvatar2) endAvatar2.src = sabiConfig?.avatar || 'img/sabi/sabi_competitivo.png';

    // Botón salir
    const backBtn = document.getElementById('backFromGame');
    if (backBtn) {
      backBtn.onclick = () => {
        if (confirm('¿Seguro que quieres abandonar la partida contra Sabi?')) {
          _volverAlMenu();
        }
      };
    }
  }

  // ============================================
  // COUNTDOWN
  // ============================================
  function _mostrarCountdown(callback) {
    const container = document.getElementById('countdownContainer');
    const text = document.getElementById('countdownText');
    if (!container || !text) { callback(); return; }

    container.style.display = 'flex';
    let count = 3;
    text.textContent = count;

    const interval = setInterval(() => {
      count--;
      if (count > 0) {
        text.textContent = count;
      } else if (count === 0) {
        text.textContent = '¡GO!';
      } else {
        clearInterval(interval);
        container.style.display = 'none';
        callback();
      }
    }, 1000);
  }

  // ============================================
  // MOSTRAR PREGUNTA
  // ============================================
  function _mostrarPregunta(index) {
    if (index >= preguntas.length) {
      _finPartida();
      return;
    }

    preguntaActual = index;
    const pregunta = preguntas[index];

    // Actualizar texto de pregunta
    const questionText = document.getElementById('questionText');
    if (questionText) questionText.textContent = pregunta.question;

    // Crear opciones
    const container = document.getElementById('optionsContainer');
    if (container) {
      container.innerHTML = '';
      pregunta.options.forEach((opcion) => {
        const btn = document.createElement('button');
        btn.className = 'option-button';
        btn.textContent = opcion;
        btn.onclick = () => _responder(opcion);
        container.appendChild(btn);
      });
    }

    // Iniciar timer
    tiempoInicio = Date.now();
    _iniciarTimer(pregunta.difficulty);
  }

  // ============================================
  // TIMER
  // ============================================
  function _iniciarTimer(difficulty) {
    if (timerInterval) clearInterval(timerInterval);

    let timeLeft = 10;
    if (difficulty === 'hard') timeLeft = 18;
    else if (difficulty === 'medium') timeLeft = 14;

    const timerDisplay = document.getElementById('timerDisplay');

    timerInterval = setInterval(() => {
      if (timerDisplay) timerDisplay.textContent = `⏰ ${timeLeft}s`;
      timeLeft--;

      if (timeLeft < 0) {
        clearInterval(timerInterval);
        // Tiempo agotado: enviar sin respuesta
        _responder(null);
      }
    }, 1000);
  }

  // ============================================
  // RESPONDER
  // ============================================
  async function _responder(opcionSeleccionada) {
    if (timerInterval) clearInterval(timerInterval);

    // Deshabilitar opciones
    const buttons = document.querySelectorAll('#optionsContainer .option-button');
    buttons.forEach(btn => { btn.disabled = true; });

    const tiempoRespuesta = Math.min(99.99, (Date.now() - tiempoInicio) / 1000);

    try {
      const data = await apiRequest(`/sabi/1vs1/${matchId}/responder`, {
        method: 'POST',
        body: JSON.stringify({
          opcionSeleccionada: opcionSeleccionada || '',
          tiempoRespuesta
        })
      });

      if (!data.success) throw new Error(data.error || 'Error');

      const ronda = data.ronda;
      puntajeUsuario = ronda.puntajes.usuario;
      puntajeSabi = ronda.puntajes.sabi;

      // Actualizar puntajes en UI
      const p1Score = document.getElementById('player1ScoreValue');
      const p2Score = document.getElementById('player2ScoreValue');
      if (p1Score) p1Score.textContent = puntajeUsuario;
      if (p2Score) p2Score.textContent = puntajeSabi;

      // Mostrar feedback visual en opciones
      buttons.forEach(btn => {
        if (btn.textContent === ronda.respuestaCorrecta) {
          btn.classList.add('correct');
        } else if (btn.textContent === opcionSeleccionada && !ronda.usuario.acerto) {
          btn.classList.add('incorrect');
        }
      });

      // Esperar y mostrar siguiente pregunta o fin
      const delay = Math.max(1500, ronda.sabi?.delay_ms || 2000);
      setTimeout(() => {
        if (ronda.esUltima) {
          _finPartida(ronda.resultado);
        } else {
          _mostrarPregunta(preguntaActual + 1);
        }
      }, delay);

    } catch (error) {
      console.error('Error respondiendo:', error);
      // Continuar con la siguiente pregunta de todas formas
      setTimeout(() => _mostrarPregunta(preguntaActual + 1), 2000);
    }
  }

  // ============================================
  // FIN DE PARTIDA
  // ============================================
  function _finPartida(resultado) {
    if (timerInterval) clearInterval(timerInterval);

    const gameContainer = document.getElementById('gameContainer');
    const endGameContainer = document.getElementById('endGameContainer');

    if (gameContainer) gameContainer.style.display = 'none';
    if (endGameContainer) endGameContainer.style.display = 'flex';

    // Datos del usuario
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    // Nombres y puntajes
    const endP1Name = document.getElementById('endPlayer1Name');
    const endP2Name = document.getElementById('endPlayer2Name');
    const endP1Score = document.getElementById('endPlayer1Score');
    const endP2Score = document.getElementById('endPlayer2Score');
    const endAvatar1 = document.getElementById('endAvatar1');
    const endAvatar2 = document.getElementById('endAvatar2');
    const endMsg = document.getElementById('endGameMessage');

    if (endP1Name) endP1Name.textContent = user.username || 'Tú';
    if (endP2Name) endP2Name.textContent = 'Sabi 🤖';
    if (endP1Score) endP1Score.textContent = `Puntuación: ${puntajeUsuario}`;
    if (endP2Score) endP2Score.textContent = `Puntuación: ${puntajeSabi}`;
    if (endAvatar1 && user.avatar_url) endAvatar1.src = user.avatar_url;
    if (endAvatar2) endAvatar2.src = sabiConfig?.avatar || 'img/sabi/sabi_competitivo.png';

    // Mensaje según resultado
    if (!resultado) {
      resultado = puntajeUsuario > puntajeSabi ? 'victoria'
        : puntajeUsuario < puntajeSabi ? 'derrota' : 'empate';
    }

    if (endMsg) {
      switch (resultado) {
        case 'victoria':
          endMsg.innerHTML = '🏆 ¡Ganaste contra Sabi! <img src="img/sabi/sabi_triste.png" style="width:40px;vertical-align:middle;">';
          break;
        case 'derrota':
          endMsg.innerHTML = '😢 Sabi ganó esta vez... <img src="img/sabi/sabi_celebrando.png" style="width:40px;vertical-align:middle;">';
          break;
        case 'empate':
          endMsg.innerHTML = '🤝 ¡Empate! Buen juego. <img src="img/sabi/sabi_saludando.png" style="width:40px;vertical-align:middle;">';
          break;
      }
    }

    // Confetti si ganó
    if (resultado === 'victoria' && typeof confetti === 'function') {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }

    // Configurar botón de revancha
    const rematchBtn = document.getElementById('rematchBtn');
    if (rematchBtn) {
      rematchBtn.textContent = '🔄 Revancha vs Sabi';
      rematchBtn.onclick = () => {
        if (endGameContainer) endGameContainer.style.display = 'none';
        iniciar(sabiConfig?.tipoJuego || 'normal');
      };
    }
  }

  // ============================================
  // VOLVER AL MENÚ
  // ============================================
  function _volverAlMenu() {
    if (timerInterval) clearInterval(timerInterval);

    const gameContainer = document.getElementById('gameContainer');
    const endGameContainer = document.getElementById('endGameContainer');
    const multiplayerMenu = document.getElementById('multiplayerMenu');

    if (gameContainer) gameContainer.style.display = 'none';
    if (endGameContainer) endGameContainer.style.display = 'none';
    if (multiplayerMenu) multiplayerMenu.style.display = 'block';
  }

  // ============================================
  // API PÚBLICA
  // ============================================
  return {
    iniciar,
    volverAlMenu: _volverAlMenu
  };

})();
