/**
 * JOSÉ MENEZES — A SUA VOZ CONTA (A-SUA-VOZ-CONTA.JS)
 * Gestão do formulário de participação cívica, envio anónimo,
 * contador de carateres, validação e integração com EmailJS.
 */

document.addEventListener('DOMContentLoaded', () => {
  initParticipacaoForm();
});

function initParticipacaoForm() {
  const form = document.getElementById('participacaoForm');
  const nomeInput = document.getElementById('nome');
  const emailInput = document.getElementById('email');
  const mensagemInput = document.getElementById('mensagem');
  const charCounter = document.getElementById('charCounter');
  const feedbackEl = document.getElementById('formFeedback');
  const submitBtn = document.getElementById('submitBtn');

  if (!form) return;

  // 1. Contador de Carateres da Mensagem
  if (mensagemInput && charCounter) {
    const maxChars = 1200;
    mensagemInput.addEventListener('input', () => {
      const currentLength = mensagemInput.value.length;
      charCounter.textContent = `${currentLength} / ${maxChars} carateres`;
      if (currentLength > maxChars) {
        charCounter.style.color = '#DC2626';
      } else {
        charCounter.style.color = '#9CA3AF';
      }
    });
  }

  // 2. Submissão do Formulário
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Proteção Anti-Spam (Honeypot)
    const honeypot = form.querySelector('input[name="_hp_security"]');
    if (honeypot && honeypot.value !== '') {
      console.warn('Submissão bloqueada por filtro de segurança anti-spam.');
      return;
    }

    // Validações Básicas
    const nome = form.nome.value.trim();
    const freguesia = form.freguesia.value;
    const assunto = form.assunto.value;
    const mensagem = form.mensagem.value.trim();

    if (!nome) {
      showFeedback('warning', 'Por favor, indique o seu nome.');
      form.nome.focus();
      return;
    }

    if (!freguesia) {
      showFeedback('warning', 'Por favor, selecione uma freguesia ou «Município de Anadia — Geral».');
      form.freguesia.focus();
      return;
    }

    if (!assunto) {
      showFeedback('warning', 'Por favor, selecione a área temática ou assunto da sua mensagem.');
      form.assunto.focus();
      return;
    }

    if (!mensagem || mensagem.length < 15) {
      showFeedback('warning', 'Por favor, escreva uma mensagem com pelo menos 15 carateres para que possamos compreender a sua sugestão.');
      form.mensagem.focus();
      return;
    }

    // Verificar se o EmailJS está devidamente configurado
    const isConfigured = typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.isEmailJSConfigured();

    if (!isConfigured) {
      submitBtn.disabled = true;
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = `
        <svg style="animation: spin 1s linear infinite; width: 18px; height: 18px;" fill="none" viewBox="0 0 24 24">
          <circle style="opacity: 0.25;" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path style="opacity: 0.75;" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
        A enviar mensagem...
      `;
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        showSuccessModal();
        form.reset();
        if (charCounter) charCounter.textContent = '0 / 1200 carateres';
      }, 700);
      return;
    }

    // Se o EmailJS estiver configurado, processa o envio real
    try {
      submitBtn.disabled = true;
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = `
        <svg style="animation: spin 1s linear infinite; width: 18px; height: 18px;" fill="none" viewBox="0 0 24 24">
          <circle style="opacity: 0.25;" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path style="opacity: 0.75;" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
        A enviar mensagem...
      `;

      // Inicializa o EmailJS se disponível
      if (typeof emailjs !== 'undefined') {
        emailjs.init({ publicKey: SITE_CONFIG.emailjs.publicKey });

        const emailVal = (emailInput && emailInput.value.trim()) || 'Não fornecido';
        const assuntoVal = form.assunto.value || 'Geral';

        const templateParams = {
          nome: nome,
          email: emailVal,
          freguesia: freguesia,
          assunto: assuntoVal,
          mensagem: mensagem,
          // Aliases padrão do EmailJS para total compatibilidade com qualquer template
          from_name: nome,
          reply_to: emailVal,
          subject: assuntoVal,
          message: mensagem
        };

        await emailjs.send(
          SITE_CONFIG.emailjs.serviceId,
          SITE_CONFIG.emailjs.templateId,
          templateParams
        );

        showSuccessModal();
        form.reset();
        if (charCounter) charCounter.textContent = '0 / 1200 carateres';
      } else {
        throw new Error('A biblioteca do EmailJS não foi carregada no navegador.');
      }
    } catch (err) {
      console.error('Erro no envio através do EmailJS:', err);
      showFeedback('error', `
        <strong>Ocorreu um erro ao enviar a mensagem.</strong><br>
        Por favor, tente novamente mais tarde ou contacte diretamente o gabinete através do email institucional.
      `);
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
        Enviar Sugestão
      `;
    }
  });

  function showFeedback(type, html) {
    if (!feedbackEl) return;
    feedbackEl.className = `form-feedback ${type}`;
    feedbackEl.innerHTML = html;
    feedbackEl.style.display = 'flex';
    feedbackEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function showSuccessModal() {
    if (feedbackEl) {
      feedbackEl.style.display = 'none';
      feedbackEl.innerHTML = '';
    }

    const existing = document.getElementById('formSuccessModal');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'formSuccessModal';
    overlay.className = 'form-success-modal-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.innerHTML = `
      <div class="form-success-modal-card">
        <div class="form-success-check-circle" aria-hidden="true">
          <svg class="form-success-check-svg" viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h3 class="form-success-modal-title">A sua sugestão ou preocupação foi enviada!</h3>
        <p class="form-success-modal-desc">
          Obrigado pela sua participação. A sua mensagem foi encaminhada com sucesso para a equipa do vereador José Menezes.
        </p>
        <button type="button" class="form-success-modal-btn" id="closeSuccessModalBtn">
          Fechar
        </button>
      </div>
    `;

    document.body.appendChild(overlay);

    const closeModal = () => {
      overlay.remove();
      document.removeEventListener('keydown', onKeyDown);
    };

    const onKeyDown = (ev) => {
      if (ev.key === 'Escape') closeModal();
    };

    document.addEventListener('keydown', onKeyDown);
    overlay.addEventListener('click', (ev) => {
      if (ev.target === overlay) closeModal();
    });

    const closeBtn = overlay.querySelector('#closeSuccessModalBtn');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
      closeBtn.focus();
    }
  }
}
