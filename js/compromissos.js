/**
 * JOSÉ MENEZES — MEDIDAS CONCRETIZADAS (COMPROMISSOS.JS)
 * Apresentação exclusiva de propostas e medidas com implementação confirmada.
 * Sem estatísticas ou contadores.
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
 * Renderiza exclusivamente as propostas com estado 'Implementada'
 */
function renderPropostas() {
  const container = document.getElementById('propostasContainer');
  if (!container) return;

  // Filtragem estrita: apenas medidas cuja implementação esteja confirmada
  const concretizadas = PROPOSTAS_DATA.filter(p => {
    if (p.estado !== 'Implementada') return false;

    if (!currentSearch) return true;
    return p.titulo.toLowerCase().includes(currentSearch) ||
           p.descricao.toLowerCase().includes(currentSearch) ||
           p.categoria.toLowerCase().includes(currentSearch) ||
           (p.ambito && p.ambito.toLowerCase().includes(currentSearch));
  });

  if (concretizadas.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1.5rem; background: #FFFFFF; border: 1px dashed #CBD5E1; border-radius: 8px;">
        <svg style="width: 44px; height: 44px; color: #94A3B8; margin: 0 auto 1rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h4 style="font-size: 1.15rem; font-weight: 700; color: #1D1744; margin-bottom: 0.5rem;">Nenhuma medida encontrada</h4>
        <p style="color: #64748B; font-size: 0.9375rem; margin: 0;">Não foram encontradas medidas concretizadas correspondentes ao termo pesquisado.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = concretizadas.map(item => `
    <article class="proposta-card">
      <div class="proposta-card-header">
        <span class="proposta-category">${escapeHtml(item.categoria)}</span>
        <span class="status-badge status-implementada">
          <span class="status-dot"></span>
          IMPLEMENTADA
        </span>
      </div>

      <div class="proposta-card-body">
        <h3 class="proposta-title">${escapeHtml(item.titulo)}</h3>
        <p class="proposta-desc">${escapeHtml(item.descricao)}</p>
        
        ${item.data ? `
          <div class="proposta-date-row">
            <span class="proposta-date-label">Concretização:</span>
            <strong class="proposta-date-val">${escapeHtml(item.data)}</strong>
          </div>
        ` : ''}
      </div>

      <div class="proposta-card-footer">
        <button type="button" class="btn-medida-ver" onclick="openEvidenceModal(${item.id})">
          VER
        </button>
      </div>
    </article>
  `).join('');
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
          <h3 class="modal-title" id="evidenceModalTitle">Detalhes da Medida Concretizada</h3>
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

    modalTitle.textContent = item.titulo;
    modalBody.innerHTML = `
      <div style="margin-bottom: 1.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
        <span class="proposta-category">${escapeHtml(item.categoria)}</span>
        <span class="status-badge status-implementada">
          <span class="status-dot"></span>
          IMPLEMENTADA
        </span>
      </div>

      <div style="margin-bottom: 1.25rem;">
        <h4 style="font-size: 0.8125rem; text-transform: uppercase; color: #64748B; font-weight: 700; margin-bottom: 0.25rem; letter-spacing: 0.04em;">Âmbito Territorial</h4>
        <p style="color: #1D1744; font-weight: 600; margin: 0;">${escapeHtml(item.ambito || 'Concelho de Anadia')}</p>
      </div>

      <div style="margin-bottom: 1.5rem;">
        <h4 style="font-size: 0.8125rem; text-transform: uppercase; color: #64748B; font-weight: 700; margin-bottom: 0.35rem; letter-spacing: 0.04em;">Descrição Integral da Medida</h4>
        <p style="color: #475569; line-height: 1.65; margin: 0;">${escapeHtml(item.descricao)}</p>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 1.25rem; border-top: 1px solid #E2E8F0;">
        <span style="font-size: 0.8125rem; color: #64748B;">
          Data de Concretização: <strong>${escapeHtml(item.data || 'Registada')}</strong>
        </span>
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
