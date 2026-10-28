/**
 * JOSÉ MENEZES — REUNIÕES DE CÂMARA (REUNIOES.JS)
 * Renderização cronológica das reuniões quinzenais, filtros por ano,
 * pesquisa por palavras-chave e modal com ata e propostas detalhadas.
 */

document.addEventListener('DOMContentLoaded', () => {
  initReunioesPage();
});

let currentReuniaoYear = 'todos';
let currentReuniaoSearch = '';

function initReunioesPage() {
  if (typeof REUNIOES_DATA === 'undefined') {
    console.error('REUNIOES_DATA não foi carregado.');
    return;
  }

  setupYearFilters();
  setupSearchInput();
  renderReunioes();
  setupReuniaoDetailsModal();
}

/**
 * Filtro por ano
 */
function setupYearFilters() {
  const buttons = document.querySelectorAll('.filter-btn[data-year]');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentReuniaoYear = btn.getAttribute('data-year');
      renderReunioes();
    });
  });
}

/**
 * Pesquisa por palavras-chave
 */
function setupSearchInput() {
  const searchInput = document.getElementById('reuniaoSearch');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentReuniaoSearch = e.target.value.trim().toLowerCase();
      renderReunioes();
    });
  }
}

/**
 * Renderiza a lista cronológica de reuniões
 */
function renderReunioes() {
  const container = document.getElementById('reunioesContainer');
  if (!container) return;

  // Ordena por data (mais recente primeiro)
  const sorted = [...REUNIOES_DATA].sort((a, b) => new Date(b.dataISO) - new Date(a.dataISO));

  const filtered = sorted.filter(item => {
    // Filtro de ano
    const matchesYear = (currentReuniaoYear === 'todos') || (item.ano.toString() === currentReuniaoYear);

    // Filtro de pesquisa
    const searchTarget = (
      item.titulo + ' ' +
      item.numero + ' ' +
      item.resumo + ' ' +
      (item.intervencaoDestaque || '') + ' ' +
      item.propostasApresentadas.map(p => p.titulo + ' ' + p.descricao).join(' ')
    ).toLowerCase();

    const matchesSearch = !currentReuniaoSearch || searchTarget.includes(currentReuniaoSearch);

    return matchesYear && matchesSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 4rem 1.5rem; background: #FFFFFF; border: 1px dashed #CBD5E1; border-radius: 16px;">
        <svg style="width: 48px; height: 48px; color: #94A3B8; margin: 0 auto 1rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <h4 style="font-size: 1.15rem; font-weight: 700; color: #1E293B; margin-bottom: 0.5rem;">Nenhuma reunião encontrada</h4>
        <p style="color: #64748B; font-size: 0.9375rem;">Não foram localizadas reuniões de câmara com os critérios de pesquisa selecionados.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => {
    return `
      <article class="reuniao-card fade-in">
        <header class="reuniao-header">
          <div class="reuniao-meta-group">
            <span class="reuniao-date-badge">📅 ${escapeHtml(item.dataExtenso)}</span>
            <span class="reuniao-number">${escapeHtml(item.numero)}</span>
          </div>
          <span style="font-size: 0.8125rem; font-weight: 700; color: #C8102E; background: #FEF2F2; padding: 3px 10px; border-radius: 9999px;">
            ${item.propostasApresentadas.length} ${item.propostasApresentadas.length === 1 ? 'Proposta' : 'Propostas'}
          </span>
        </header>

        <div class="reuniao-body">
          <h3 class="reuniao-title">${escapeHtml(item.titulo)}</h3>
          <p class="reuniao-resumo">${escapeHtml(item.resumo)}</p>

          ${item.intervencaoDestaque ? `
            <div class="reuniao-quote-box">
              ${escapeHtml(item.intervencaoDestaque)}
            </div>
          ` : ''}

          <div class="reuniao-propostas-section">
            <h4>
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Propostas Apresentadas pelo Vereador José Menezes:
            </h4>

            <div class="propostas-mini-list">
              ${item.propostasApresentadas.map(p => {
                const badgeClass = getPropostaMiniStatusClass(p.estado);
                return `
                  <div class="proposta-mini-item">
                    <div class="proposta-mini-info">
                      <h5>${escapeHtml(p.titulo)}</h5>
                      <p>${escapeHtml(p.descricao)}</p>
                    </div>
                    <span class="status-badge ${badgeClass}" style="font-size: 0.6875rem;">
                      ${escapeHtml(p.estado)}
                    </span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <footer class="reuniao-footer">
            <div class="reuniao-docs-group">
              <span style="font-size: 0.8125rem; font-weight: 700; color: #4B5563;">Documentação:</span>
              ${item.documentos.map(doc => `
                <a href="${escapeHtml(doc.url)}" class="reuniao-doc-pill" onclick="handleDocClick(event, '${escapeHtml(doc.nome)}')">
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  ${escapeHtml(doc.nome)}
                </a>
              `).join('')}
            </div>

            <button type="button" class="btn btn-outline btn-sm" onclick="openReuniaoModal(${item.id})">
              Ver Detalhes da Reunião &rarr;
            </button>
          </footer>
        </div>
      </article>
    `;
  }).join('');
}

function getPropostaMiniStatusClass(estado) {
  switch (estado) {
    case 'Aprovada': return 'status-implementada';
    case 'Em Execução': return 'status-em-execucao';
    case 'Em Análise': return 'status-em-analise';
    case 'Rejeitada': return 'status-nao-implementada';
    default: return 'status-em-analise';
  }
}

function handleDocClick(e, docName) {
  e.preventDefault();
  alert(`Documento Institucional:\n\n«${docName}»\n\nO documento oficial está a ser disponibilizado pelo executivo municipal.`);
}
window.handleDocClick = handleDocClick;

/**
 * Modal para ver detalhes completos da reunião
 */
function setupReuniaoDetailsModal() {
  let modalOverlay = document.getElementById('reuniaoModal');
  if (!modalOverlay) {
    modalOverlay = document.createElement('div');
    modalOverlay.id = 'reuniaoModal';
    modalOverlay.className = 'modal-overlay';
    modalOverlay.innerHTML = `
      <div class="modal-dialog" style="max-width: 700px;">
        <div class="modal-header">
          <h3 class="modal-title" id="reuniaoModalTitle">Detalhes da Reunião de Câmara</h3>
          <button class="modal-close-btn" id="reuniaoModalClose" aria-label="Fechar">&times;</button>
        </div>
        <div class="modal-body" id="reuniaoModalBody">
          <!-- Conteúdo gerado dinamicamente -->
        </div>
      </div>
    `;
    document.body.appendChild(modalOverlay);
  }

  const closeBtn = document.getElementById('reuniaoModalClose');
  const closeModal = () => {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  window.openReuniaoModal = (id) => {
    const item = REUNIOES_DATA.find(r => r.id === id);
    if (!item) return;

    const modalTitle = document.getElementById('reuniaoModalTitle');
    const modalBody = document.getElementById('reuniaoModalBody');

    modalTitle.textContent = item.numero;
    modalBody.innerHTML = `
      <div style="margin-bottom: 1.25rem;">
        <span class="reuniao-date-badge" style="display: inline-block; margin-bottom: 0.75rem;">
          📅 ${escapeHtml(item.dataExtenso)}
        </span>
        <h4 style="font-size: 1.35rem; font-weight: 800; color: #111827; line-height: 1.3;">
          ${escapeHtml(item.titulo)}
        </h4>
      </div>

      <div style="margin-bottom: 1.5rem;">
        <h5 style="font-size: 0.8125rem; text-transform: uppercase; color: #64748B; font-weight: 700; margin-bottom: 0.4rem;">
          Resumo da Sessão
        </h5>
        <p style="color: #374151; font-size: 0.95rem; line-height: 1.65;">
          ${escapeHtml(item.resumo)}
        </p>
      </div>

      ${item.intervencaoDestaque ? `
        <div class="reuniao-quote-box" style="margin-bottom: 1.5rem;">
          ${escapeHtml(item.intervencaoDestaque)}
        </div>
      ` : ''}

      <div style="margin-bottom: 1.75rem;">
        <h5 style="font-size: 0.8125rem; text-transform: uppercase; color: #64748B; font-weight: 700; margin-bottom: 0.75rem;">
          Propostas e Votações do Vereador José Menezes
        </h5>
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          ${item.propostasApresentadas.map(p => `
            <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 1rem;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.35rem;">
                <strong style="color: #111827; font-size: 0.9375rem;">${escapeHtml(p.titulo)}</strong>
                <span class="status-badge ${getPropostaMiniStatusClass(p.estado)}" style="font-size: 0.6875rem;">
                  ${escapeHtml(p.estado)}
                </span>
              </div>
              <p style="color: #64748B; font-size: 0.8125rem; margin: 0;">${escapeHtml(p.descricao)}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <div style="display: flex; justify-content: flex-end; gap: 0.75rem; padding-top: 1rem; border-top: 1px solid #E2E8F0;">
        <button type="button" class="btn btn-secondary btn-sm" onclick="document.getElementById('reuniaoModalClose').click()">
          Fechar
        </button>
      </div>
    `;

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
}
