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
 * Sincronização dos links de configuração global (Redes Sociais, WhatsApp, etc.)
 */
function initGlobalLinks() {
  if (typeof SITE_CONFIG === 'undefined') return;

  // Atualizar hiperligações de WhatsApp
  document.querySelectorAll('[data-config-link="whatsapp"]').forEach(el => {
    el.setAttribute('href', SITE_CONFIG.whatsappInviteUrl);
    if (!SITE_CONFIG.isWhatsAppConfigured()) {
      el.addEventListener('click', (e) => {
        // Se a hiperligação direta ainda não estiver definida, apresenta mensagem institucional
        if (SITE_CONFIG.whatsappInviteUrl.includes('SEU_LINK_DE_CONVITE_AQUI')) {
          e.preventDefault();
          alert('Comunidade WhatsApp José Menezes:\n\nO acesso à comunidade exclusiva está a ser disponibilizado. Para qualquer questão ou envio de mensagem direta, utilize a página «A Sua Voz Conta».');
        }
      });
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
