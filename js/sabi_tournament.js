// ============================================
// SABI TOURNAMENT - Lógica frontend para torneos vs Sabi
// ============================================

const SabiTournament = (function () {
  'use strict';

  function getToken() { return localStorage.getItem('token'); }

  function getApiUrl() {
    return (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
      ? 'http://localhost:3000/api' : (window.location.origin + '/api');
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

  /**
   * Renderiza una card especial de torneo vs Sabi
   */
  function renderSabiCard(container) {
    if (!container) return;
    const card = document.createElement('div');
    card.className = 'torneo-card torneo-card-sabi';
    card.style.cssText = 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: 2px solid #5a67d8; cursor: pointer;';
    card.innerHTML = `
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
        <img src="img/sabi/sabi_competitivo.png" alt="Sabi" style="width:50px;height:50px;border-radius:50%;border:2px solid rgba(255,255,255,0.4);">
        <div>
          <h3 style="margin:0;font-size:18px;">🤖 Desafía a Sabi</h3>
          <p style="margin:4px 0 0;font-size:13px;opacity:0.9;">Enfréntate al bot IA en un duelo rápido</p>
        </div>
      </div>
      <button onclick="Sabi1vs1.iniciar('normal')" style="background:white;color:#667eea;border:none;padding:10px 24px;border-radius:10px;font-weight:bold;cursor:pointer;width:100%;font-size:15px;transition:transform 0.2s;">
        ⚔️ ¡Jugar Ahora!
      </button>
    `;
    container.prepend(card);
  }

  return { renderSabiCard };
})();
