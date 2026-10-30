/**
 * CONFIGURAÇÃO GERAL DO WEBSITE — JOSÉ MENEZES
 * 
 * Este ficheiro centraliza as definições do website, hiperligações e
 * chaves de integração externas (EmailJS e WhatsApp).
 * 
 * Substitua os valores abaixo pelos seus dados reais quando disponíveis.
 */

const SITE_CONFIG = {
  // Identificação Institucional
  nome: "José Menezes",
  cargo: "Vereador da Câmara Municipal de Anadia",
  partido: "CHEGA",
  municipio: "Anadia",
  distrito: "Aveiro",
  anoMandato: "2025–2029",

  // Hiperligação Oficial de Inscrição de Militantes
  linkInscricaoMilitante: "https://portalchega.pt/",

  // Hiperligação da Comunidade WhatsApp
  // Substitua pela hiperligação de convite real do seu grupo WhatsApp
  // Exemplo: "https://chat.whatsapp.com/ExemploDeLinkDeConvite"
  whatsappInviteUrl: "https://chat.whatsapp.com/SEU_LINK_DE_CONVITE_AQUI",

  // Redes Sociais Oficiais (substitua pelos perfis reais)
  redesSociais: {
    facebook: "https://www.facebook.com/josemenezes.anadia",
    instagram: "https://www.instagram.com/josemenezes.anadia",
    youtube: "https://www.youtube.com/@josemenezesanadia",
    x: "https://x.com/josemenezes_an"
  },

  // Contactos Institucionais
  contacto: {
    gabinete: "Câmara Municipal de Anadia — Gabinete da Vereação",
    morada: "Praça do Município, 3780-215 Anadia",
    emailInstitucional: "vereador.josemenezes@cm-anadia.pt" // Email demonstrativo / institucional
  },

  /**
   * INTEGRAÇÃO EMAILJS (Página "A Sua Voz Conta")
   * 
   * Para ativar o envio de emails:
   * 1. Crie conta gratuita em https://www.emailjs.com/
   * 2. Crie um Email Service (ex: Gmail, Outlook)
   * 3. Crie um Email Template e defina as variáveis:
   *    - {{from_name}}  (Nome do cidadão ou "Anónimo")
   *    - {{reply_to}}   (Email para resposta, se indicado)
   *    - {{freguesia}}  (Freguesia selecionada)
   *    - {{assunto}}    (Tema da mensagem)
   *    - {{mensagem}}   (Texto da sugestão ou preocupação)
   * 4. Cole abaixo a sua Public Key, Service ID e Template ID.
   */
  emailjs: {
    publicKey: "dau5nWAgyHd-t3k5t",
    serviceId: "service_4zs6hy8",
    templateId: "template_74w1pu3"
  },

  /**
   * Verifica se o EmailJS já tem credenciais reais configuradas.
   * Não simula sucesso se estiver com as chaves predefinidas.
   */
  isEmailJSConfigured: function() {
    return (
      this.emailjs.publicKey &&
      this.emailjs.publicKey !== "SUA_PUBLIC_KEY_AQUI" &&
      this.emailjs.serviceId &&
      this.emailjs.serviceId !== "SEU_SERVICE_ID_AQUI" &&
      this.emailjs.templateId &&
      this.emailjs.templateId !== "SEU_TEMPLATE_ID_AQUI"
    );
  },

  /**
   * Verifica se o WhatsApp já tem link configurado
   */
  isWhatsAppConfigured: function() {
    return (
      this.whatsappInviteUrl &&
      !this.whatsappInviteUrl.includes("SEU_LINK_DE_CONVITE_AQUI")
    );
  }
};

// Exporta globalmente para o browser
window.SITE_CONFIG = SITE_CONFIG;
