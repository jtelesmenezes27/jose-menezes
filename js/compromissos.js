/**
 * JOSÉ MENEZES — MEDIDAS CONCRETIZADAS E EM ANDAMENTO (COMPROMISSOS.JS)
 * Apresentação das propostas e medidas autárquicas concretizadas e em andamento.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMedidasConcretizadasPage();
});

let currentSearch = '';

function initMedidasConcretizadasPage() {
  if (typeof PROPOSTAS_DATA === 'undefined') {
    console.error('PROPOSTAS_DATA não foi carregado.');
    return;
  }

  setupSearchInput();
  renderPropostas();
  setupEvidenceModal();
}

/**
 * Configuração da pesquisa por palavras-chave
 */
function setupSearchInput() {
  const searchInput = document.getElementById('propostaSearch');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value.trim().toLowerCase();
      renderPropostas();
    });
  }
}

/**
 * Retorna classe e texto da badge de estado
 */
function getEstadoBadge(estado) {
  if (estado === 'Concretizada') {
    return {
      className: 'status-implementada',
      label: 'CONCRETIZADA'
    };
  }
  if (estado === 'Parcialmente concretizada') {
    return {
      className: 'status-implementada',
      label: 'PARCIALMENTE CONCRETIZADA'
    };
  }
  return {
    className: 'status-em-execucao',
    label: 'EM ANDAMENTO'
  };
}

/**
 * Ordem de prioridade dos estados:
 * 1. Concretizada
 * 2. Parcialmente concretizada
 * 3. Em andamento
 */
function getEstadoOrder(estado) {
  if (estado === 'Concretizada') return 1;
  if (estado === 'Parcialmente concretizada') return 2;
  return 3;
}

/**
 * Renderiza todas as propostas da lista
 */
function renderPropostas() {
  const container = document.getElementById('propostasContainer');
  if (!container) return;

  const filtered = PROPOSTAS_DATA.filter(p => {
    if (!currentSearch) return true;
    const term = currentSearch;
    return (p.titulo && p.titulo.toLowerCase().includes(term)) ||
           (p.categoria && p.categoria.toLowerCase().includes(term)) ||
           (p.proposta && p.proposta.toLowerCase().includes(term)) ||
           (p.pontoSituacao && p.pontoSituacao.toLowerCase().includes(term)) ||
           (p.estado && p.estado.toLowerCase().includes(term));
  });

  // Ordenar: 1.º Concretizada, 2.º Parcialmente concretizada, 3.º Em andamento
  filtered.sort((a, b) => getEstadoOrder(a.estado) - getEstadoOrder(b.estado));

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1; padding: 3rem 1rem; text-align: center; background: #FFFFFF; border-radius: var(--radius-sm); border: 1px dashed var(--color-border);">
        <p style="color: var(--color-text-muted); font-size: 1.05rem; margin: 0;">
          Nenhuma medida encontrada para o termo pesquisado.
        </p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => {
    const badge = getEstadoBadge(item.estado);

    return `
    <article class="proposta-card">
      <div class="proposta-card-header">
        <span class="proposta-category">${escapeHtml(item.categoria)}</span>
        <span class="status-badge ${badge.className}">
          <span class="status-dot"></span>
          ${badge.label}
        </span>
      </div>

      <div class="proposta-card-body">
        <h3 class="proposta-title" style="margin-bottom: 1rem;">${escapeHtml(item.titulo)}</h3>
        
        <div style="margin-bottom: 0.85rem;">
          <h4 style="font-size: 0.78rem; text-transform: uppercase; color: var(--color-navy); font-weight: 800; letter-spacing: 0.05em; margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.35rem;">
            <span style="color: var(--color-red);">✦</span> O que propus
          </h4>
          <p class="proposta-desc" style="margin-bottom: 0; line-height: 1.55;">${escapeHtml(item.proposta)}</p>
        </div>

        <div>
          <h4 style="font-size: 0.78rem; text-transform: uppercase; color: var(--color-navy); font-weight: 800; letter-spacing: 0.05em; margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.35rem;">
            <span style="color: var(--color-navy);">✦</span> Ponto de situação
          </h4>
          <p class="proposta-desc" style="margin-bottom: 0; line-height: 1.55; color: #334155;">${escapeHtml(item.pontoSituacao)}</p>
        </div>
      </div>

      <div class="proposta-card-footer">
        <button type="button" class="btn-medida-ver" onclick="openEvidenceModal(${item.id})">
          VER DETALHES
        </button>
      </div>
    </article>
  `;
  }).join('');
}

/**
 * Janela Modal para visualização do conteúdo integral da proposta
 */
function setupEvidenceModal() {
  let modalOverlay = document.getElementById('evidenceModal');
  if (!modalOverlay) {
    modalOverlay = document.createElement('div');
    modalOverlay.id = 'evidenceModal';
    modalOverlay.className = 'modal-overlay';
    modalOverlay.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-header">
          <h3 class="modal-title" id="evidenceModalTitle">Detalhes da Medida</h3>
          <button class="modal-close-btn" id="evidenceModalClose" aria-label="Fechar">&times;</button>
        </div>
        <div class="modal-body" id="evidenceModalBody">
          <!-- Conteúdo dinâmico -->
        </div>
      </div>
    `;
    document.body.appendChild(modalOverlay);
  }

  const closeBtn = document.getElementById('evidenceModalClose');
  const closeModal = () => {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  window.openEvidenceModal = (id) => {
    const item = PROPOSTAS_DATA.find(p => p.id === id);
    if (!item) return;

    const modalTitle = document.getElementById('evidenceModalTitle');
    const modalBody = document.getElementById('evidenceModalBody');
    const badge = getEstadoBadge(item.estado);

    modalTitle.textContent = item.titulo;
    modalBody.innerHTML = `
      <div style="margin-bottom: 1.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
        <span class="proposta-category">${escapeHtml(item.categoria)}</span>
        <span class="status-badge ${badge.className}">
          <span class="status-dot"></span>
          ${badge.label}
        </span>
      </div>

      <div style="margin-bottom: 1.25rem;">
        <h4 style="font-size: 0.8125rem; text-transform: uppercase; color: #64748B; font-weight: 700; margin-bottom: 0.25rem; letter-spacing: 0.04em;">Âmbito Territorial</h4>
        <p style="color: #1D1744; font-weight: 600; margin: 0;">${escapeHtml(item.ambito || 'Concelho de Anadia')}</p>
      </div>

      <div style="margin-bottom: 1.35rem; background: #F8FAFC; padding: 1.15rem; border-radius: 8px; border-left: 3px solid var(--color-red);">
        <h4 style="font-size: 0.85rem; text-transform: uppercase; color: var(--color-navy); font-weight: 800; margin-bottom: 0.45rem; letter-spacing: 0.04em;">O que propus</h4>
        <p style="color: #334155; line-height: 1.65; margin: 0;">${escapeHtml(item.proposta)}</p>
      </div>

      <div style="margin-bottom: 1.5rem; background: #F8FAFC; padding: 1.15rem; border-radius: 8px; border-left: 3px solid var(--color-navy);">
        <h4 style="font-size: 0.85rem; text-transform: uppercase; color: var(--color-navy); font-weight: 800; margin-bottom: 0.45rem; letter-spacing: 0.04em;">Ponto de situação</h4>
        <p style="color: #334155; line-height: 1.65; margin: 0;">${escapeHtml(item.pontoSituacao)}</p>
      </div>

      <div style="display: flex; justify-content: flex-end; align-items: center; padding-top: 1.25rem; border-top: 1px solid #E2E8F0;">
        <button type="button" class="btn btn-outline btn-sm" onclick="document.getElementById('evidenceModalClose').click()">
          Fechar
        </button>
      </div>
    `;

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
}

/**
 * Função de escape para prevenir XSS
 */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
