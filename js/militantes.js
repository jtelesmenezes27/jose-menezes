/**
 * JOSÉ MENEZES — MILITANTES (MILITANTES.JS)
 * Apresentação alfabética, pesquisa em tempo real e filtro por iniciais (A-Z).
 * Nomes estritamente fictícios para efeitos de demonstração.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMilitantesPage();
});

let currentMilitanteLetter = 'todos';
let currentMilitanteSearch = '';

function initMilitantesPage() {
  if (typeof MILITANTES_DATA === 'undefined') {
    console.error('MILITANTES_DATA não foi carregado.');
    return;
  }

  setupAlphabetNav();
  setupSearchInput();
  renderMilitantes();
}

/**
 * Cria a barra de letras A-Z
 */
function setupAlphabetNav() {
  const container = document.getElementById('alphabetNav');
  if (!container) return;

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  
  let html = `<button type="button" class="alphabet-btn active" data-letter="todos">Todos</button>`;
  alphabet.forEach(letter => {
    html += `<button type="button" class="alphabet-btn" data-letter="${letter}">${letter}</button>`;
  });

  container.innerHTML = html;

  container.querySelectorAll('.alphabet-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.alphabet-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentMilitanteLetter = btn.getAttribute('data-letter');
      renderMilitantes();
    });
  });
}

/**
 * Pesquisa em tempo real
 */
function setupSearchInput() {
  const searchInput = document.getElementById('militanteSearch');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentMilitanteSearch = e.target.value.trim().toLowerCase();
      renderMilitantes();
    });
  }
}

/**
 * Renderiza os cartões dos militantes
 */
function renderMilitantes() {
  const container = document.getElementById('militantesContainer');
  const countEl = document.getElementById('militantesCount');
  if (!container) return;

  // Ordenação alfabética
  const sorted = [...MILITANTES_DATA].sort((a, b) => a.nome.localeCompare(b.nome, 'pt-PT'));

  const filtered = sorted.filter(item => {
    // Filtro por letra inicial
    const firstLetter = item.nome.normalize("NFD").replace(/[\u0300-\u036f]/g, "").charAt(0).toUpperCase();
    const matchesLetter = (currentMilitanteLetter === 'todos') || (firstLetter === currentMilitanteLetter);

    // Filtro por pesquisa
    const matchesSearch = !currentMilitanteSearch ||
      item.nome.toLowerCase().includes(currentMilitanteSearch) ||
      item.freguesia.toLowerCase().includes(currentMilitanteSearch);

    return matchesLetter && matchesSearch;
  });

  if (countEl) {
    countEl.textContent = `A apresentar ${filtered.length} de ${MILITANTES_DATA.length} militantes registados`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3.5rem 1rem; background: #FFFFFF; border: 1px dashed #CBD5E1; border-radius: 16px;">
        <svg style="width: 44px; height: 44px; color: #94A3B8; margin: 0 auto 0.75rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
        </svg>
        <h4 style="font-size: 1.1rem; font-weight: 700; color: #1E293B; margin-bottom: 0.25rem;">Nenhum registo encontrado</h4>
        <p style="color: #64748B; font-size: 0.875rem;">Não foram encontrados registos para a letra ou critério de pesquisa indicado.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => {
    const initials = getInitials(item.nome);
    return `
      <div class="militante-card fade-in">
        <div class="militante-avatar">
          ${escapeHtml(initials)}
        </div>
        <div class="militante-info">
          <h4>${escapeHtml(item.nome)}</h4>
          <p>📍 ${escapeHtml(item.freguesia)}</p>
        </div>
      </div>
    `;
  }).join('');
}

function getInitials(name) {
  if (!name) return 'JM';
  const parts = name.trim().split(' ').filter(Boolean);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
