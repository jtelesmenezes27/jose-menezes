/**
 * JOSÉ MENEZES — SCRIPT PRINCIPAL (MAIN.JS)
 * Gestão de navegação móvel, links globais, modais e utilitários
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initGlobalLinks();
  initVideoPlayerModal();
  initReunioesAccordion();
});

/**
 * Inicialização do Menu Móvel (Hamburger Drawer)
 */
function initMobileNav() {
  const navToggle = document.getElementById('navToggle');
  const navbar = document.getElementById('navbar');
  let backdrop = document.querySelector('.nav-backdrop');

  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'nav-backdrop';
    document.body.appendChild(backdrop);
  }

  if (navToggle && navbar) {
    const toggleMenu = () => {
      const isOpen = navbar.classList.contains('open');
      if (isOpen) {
        navbar.classList.remove('open');
        navToggle.classList.remove('open');
        backdrop.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      } else {
        navbar.classList.add('open');
        navToggle.classList.add('open');
        backdrop.classList.add('open');
        navToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
      }
    };

    navToggle.addEventListener('click', toggleMenu);
    backdrop.addEventListener('click', toggleMenu);

    // Fechar ao clicar numa ligação
    navbar.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (navbar.classList.contains('open')) {
          toggleMenu();
        }
      });
    });
  }
}

/**
 * Apresenta aviso informativo quando o grupo de WhatsApp ainda não está disponível
 */
function showWhatsAppIndisponivelModal() {
  const existing = document.getElementById('whatsappUnavailableModal');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'whatsappUnavailableModal';
  overlay.className = 'form-success-modal-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');

  overlay.innerHTML = `
    <div class="form-success-modal-card" style="border-top: 5px solid #25D366; max-width: 480px;">
      <div class="form-success-check-circle" style="background-color: #E8FBF0; border-color: #86EFAC; color: #25D366;">
        <svg width="38" height="38" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z"/>
        </svg>
      </div>
      <h3 class="form-success-modal-title" style="color: var(--color-navy, #1D1744); margin-bottom: 0.75rem;">
        Grupo de WhatsApp em Breve
      </h3>
      <p class="form-success-modal-desc" style="color: #4B5563; font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;">
        O grupo oficial da comunidade de WhatsApp ainda não se encontra disponível. Estamos a finalizar os preparativos para disponibilizar este espaço muito em breve a todos os munícipes.<br><br>
        Entretanto, pode enviar diretamente as suas sugestões, preocupações ou mensagens a José Menezes através da página «A Sua Voz Conta».
      </p>
      <div style="display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap;">
        <a href="a-sua-voz-conta.html" class="form-success-modal-btn" style="text-decoration: none; background-color: var(--color-red, #D9232E); padding: 0.75rem 1.4rem;">
          Ir para «A Sua Voz Conta» →
        </a>
        <button type="button" class="form-success-modal-btn" id="btnCloseWhatsAppModal" style="background-color: #6B7280; padding: 0.75rem 1.4rem;">
          Entendido
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  const close = () => overlay.remove();
  overlay.querySelector('#btnCloseWhatsAppModal').addEventListener('click', close);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });
}

/**
 * Sincronização dos links de configuração global (Redes Sociais, WhatsApp, etc.)
 */
function initGlobalLinks() {
  if (typeof SITE_CONFIG === 'undefined') return;

  // Atualizar hiperligações de WhatsApp
  document.querySelectorAll('[data-config-link="whatsapp"]').forEach(el => {
    if (!SITE_CONFIG.isWhatsAppConfigured()) {
      el.setAttribute('href', 'javascript:void(0);');
      el.removeAttribute('target');
      el.addEventListener('click', (e) => {
        e.preventDefault();
        showWhatsAppIndisponivelModal();
      });
    } else {
      el.setAttribute('href', SITE_CONFIG.whatsappInviteUrl);
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener noreferrer');
    }
  });

  // Atualizar hiperligação de Inscrição de Militantes
  if (SITE_CONFIG.linkInscricaoMilitante) {
    document.querySelectorAll('[data-config-link="militante"]').forEach(el => {
      el.setAttribute('href', SITE_CONFIG.linkInscricaoMilitante);
    });
  }

  // Atualizar redes sociais
  const socialLinks = {
    'facebook': SITE_CONFIG.redesSociais?.facebook,
    'instagram': SITE_CONFIG.redesSociais?.instagram,
    'youtube': SITE_CONFIG.redesSociais?.youtube,
    'x': SITE_CONFIG.redesSociais?.x
  };

  Object.keys(socialLinks).forEach(network => {
    const url = socialLinks[network];
    if (url) {
      document.querySelectorAll(`[data-config-link="${network}"]`).forEach(el => {
        el.setAttribute('href', url);
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener noreferrer');
      });
    }
  });
}

/**
 * Modal para reprodução de vídeos do YouTube
 */
function initVideoPlayerModal() {
  let modalOverlay = document.getElementById('videoModal');
  if (!modalOverlay) {
    modalOverlay = document.createElement('div');
    modalOverlay.id = 'videoModal';
    modalOverlay.className = 'modal-overlay';
    modalOverlay.innerHTML = `
      <div class="modal-dialog" style="max-width: 800px; background: #0A0D14; border: 1px solid #334155;">
        <div class="modal-header" style="border-bottom-color: #1F2937;">
          <h3 class="modal-title" id="videoModalTitle" style="color: #FFFFFF; font-size: 1.15rem;">Vídeo</h3>
          <button class="modal-close-btn" id="videoModalClose" aria-label="Fechar">&times;</button>
        </div>
        <div class="modal-body" style="padding: 0;">
          <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
            <iframe id="videoIframe" src="" style="position: absolute; top:0; left: 0; width: 100%; height: 100%; border: 0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modalOverlay);
  }

  const closeBtn = document.getElementById('videoModalClose');
  const iframe = document.getElementById('videoIframe');
  const modalTitle = document.getElementById('videoModalTitle');

  const closeModal = () => {
    modalOverlay.classList.remove('open');
    if (iframe) iframe.src = '';
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  // Função global para abrir vídeo
  window.openVideoModal = (youtubeId, title) => {
    if (modalTitle) modalTitle.textContent = title || 'Intervenção Autárquica';
    if (iframe) {
      iframe.src = `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`;
    }
    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
}

/**
 * Utilitário para escapar HTML contra XSS
 */
function escapeHtml(string) {
  if (!string) return '';
  const div = document.createElement('div');
  div.textContent = string;
  return div.innerHTML;
}
window.escapeHtml = escapeHtml;

/**
 * Acordeão da página Reuniões (Ordens do Dia e Atas)
 * Apenas uma secção aberta em cada momento.
 * Ambas fechadas inicialmente.
 * Clicar na aberta fecha-a.
 */
function initReunioesAccordion() {
  const accordion = document.getElementById('reunioesAccordion');
  if (!accordion) return;

  const items = accordion.querySelectorAll('.accordion-item');

  items.forEach(item => {
    const btn = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');
    if (!btn || !content) return;

    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';

      // Fecha todos os itens
      items.forEach(otherItem => {
        const otherBtn = otherItem.querySelector('.accordion-header');
        const otherContent = otherItem.querySelector('.accordion-content');
        if (otherBtn && otherContent) {
          otherBtn.setAttribute('aria-expanded', 'false');
          otherContent.hidden = true;
          otherItem.classList.remove('is-open');
        }
      });

      // Se não estava aberto, abre este
      if (!isExpanded) {
        btn.setAttribute('aria-expanded', 'true');
        content.hidden = false;
        item.classList.add('is-open');
      }
    });
  });
}
