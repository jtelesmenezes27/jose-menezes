/**
 * DADOS DEMONSTRATIVOS — COMPROMISSOS ELEITORAIS E PROPOSTAS
 * 
 * NOTA IMPORTANTE:
 * Os dados contidos neste ficheiro são exemplos ilustrativos para demonstrar o
 * funcionamento e a apresentação visual do website.
 * Não constituem factos ou realizações atribuídas a José Menezes.
 * Os dados reais definitivos serão inseridos posteriormente.
 * 
 * Estados disponíveis:
 * - "Implementada"
 * - "Em execução"
 * - "Em análise"
 * - "Não implementada"
 */

const PROPOSTAS_DATA = [
  {
    id: 1,
    titulo: "Transparência Total nas Deliberações e Contratos Públicos",
    categoria: "Transparência & Gestão",
    descricao: "Disponibilização pública e integral em formato aberto de todas as atas, contratos e despesas municipais no portal da autarquia, acessível a qualquer cidadão.",
    estado: "Implementada",
    data: "Fevereiro 2026",
    ambito: "Concelho de Anadia",
    evidencia: "Deliberação de Câmara n.º 14/2026 — Criação do Separador de Transparência Aberta",
    documentoUrl: "assets/docs/exemplo-deliberacao-transparencia.pdf"
  },
  {
    id: 2,
    titulo: "Plano Municipal de Apoio à Fixação de Médicos de Família",
    categoria: "Saúde & Bem-Estar",
    descricao: "Proposta de incentivos à instalação de médicos de família no concelho, com comparticipação de habitação e apoio à modernização dos centros de saúde.",
    estado: "Em execução",
    data: "Janeiro 2026",
    ambito: "Concelho de Anadia",
    evidencia: "Grupo de trabalho conjunto com a Administração Regional de Saúde em fase de regulamentação.",
    documentoUrl: "assets/docs/exemplo-proposta-medicos.pdf"
  },
  {
    id: 3,
    titulo: "Isenção e Redução do IMI Familiar para Jovens Casais",
    categoria: "Habitação & Economia",
    descricao: "Fixação da taxa mínima de IMI no concelho e majoração do desconto IMI Familiar para famílias com dependentes a cargo na compra de habitação própria e permanente.",
    estado: "Em execução",
    data: "Dezembro 2025",
    ambito: "Concelho de Anadia",
    evidencia: "Aprovado na Assembleia Municipal o alargamento da dedução por dependente para o orçamento em vigor.",
    documentoUrl: "assets/docs/exemplo-documento-imi.pdf"
  },
  {
    id: 4,
    titulo: "Requalificação da Rede Viária e Caminhos Agrícolas Inter-Freguesias",
    categoria: "Vias & Infraestruturas",
    descricao: "Levantamento e plano de pavimentação urgente dos troços viários degradados nas zonas rurais e de ligação entre as diversas freguesias do concelho.",
    estado: "Em análise",
    data: "Março 2026",
    ambito: "Freguesias Rurais",
    evidencia: "Apresentado requerimento formal para mapeamento de prioridades pelo setor de obras municipais.",
    documentoUrl: "assets/docs/exemplo-requerimento-vias.pdf"
  },
  {
    id: 5,
    titulo: "Auditoria Externa às Contas e Concessões Municipais",
    categoria: "Transparência & Gestão",
    descricao: "Realização de uma auditoria financeira e jurídica independente a todos os contratos de concessão em curso no município de Anadia nos últimos anos.",
    estado: "Em análise",
    data: "Janeiro 2026",
    ambito: "Município de Anadia",
    evidencia: "Proposta submetida a discussão em Reunião de Câmara para análise pelo executivo.",
    documentoUrl: "assets/docs/exemplo-proposta-auditoria.pdf"
  },
  {
    id: 6,
    titulo: "Criação do Conselho Municipal de Segurança e Vigilância Ativa",
    categoria: "Segurança & Proteção",
    descricao: "Reforço da articulação com a GNR, reforço de meios nas zonas industriais e implementação de iluminação LED inteligente em pontos críticos.",
    estado: "Em execução",
    data: "Novembro 2025",
    ambito: "Concelho de Anadia",
    evidencia: "Aprovada por unanimidade a reativação do Conselho Municipal de Segurança com reuniões periódicas.",
    documentoUrl: "assets/docs/exemplo-conselho-seguranca.pdf"
  },
  {
    id: 7,
    titulo: "Incentivos Fiscais à Criação de Emprego nas Zonas Industriais",
    categoria: "Economia & Emprego",
    descricao: "Pacote de benefícios fiscais municipais para empresas que criem postos de trabalho permanentes para residentes do concelho de Anadia.",
    estado: "Implementada",
    data: "Outubro 2025",
    ambito: "Zonas Industriais de Anadia",
    evidencia: "Regulamento Municipal de Apoio ao Investimento publicado em Diário da República.",
    documentoUrl: "assets/docs/exemplo-regulamento-investimento.pdf"
  },
  {
    id: 8,
    titulo: "Gabinete Móvel de Proximidade Autárquica às 10 Freguesias",
    categoria: "Proximidade Cívica",
    descricao: "Iniciativa de atendimento descentralizado e regular aos cidadãos nas sedes de todas as 10 freguesias do concelho para auscultação direta de problemas.",
    estado: "Implementada",
    data: "Setembro 2025",
    ambito: "10 Freguesias de Anadia",
    evidencia: "Calendário de atendimento quinzenal divulgado nas juntas de freguesia.",
    documentoUrl: "assets/docs/exemplo-gabinete-movel.pdf"
  },
  {
    id: 9,
    titulo: "Redução Substancial das Tarifas Municipais de Água e Saneamento",
    categoria: "Ambiente & Serviços Básicos",
    descricao: "Revisão em baixa das taxas fixas e variáveis dos serviços de água e saneamento cobradas às famílias de Anadia.",
    estado: "Não implementada",
    data: "Fevereiro 2026",
    ambito: "Concelho de Anadia",
    evidencia: "Proposta rejeitada pela maioria governativa da Câmara Municipal em votação orçamental.",
    documentoUrl: "assets/docs/exemplo-votacao-tarifas.pdf"
  },
  {
    id: 10,
    titulo: "Programa Municipal de Transporte Escolar Gratuito Alargado",
    categoria: "Educação & Juventude",
    descricao: "Extensão da gratuitidade dos passes de transporte escolar a todos os níveis de ensino básico e secundário para deslocações dentro do concelho.",
    estado: "Em análise",
    data: "Abril 2026",
    ambito: "Concelho de Anadia",
    evidencia: "Estudo de impacto orçamental solicitado aos serviços municipais de educação.",
    documentoUrl: "assets/docs/exemplo-transporte-escolar.pdf"
  },
  {
    id: 11,
    titulo: "Apoio Direto às Associações Culturais, Desportivas e Humanitárias",
    categoria: "Cultura & Desporto",
    descricao: "Critérios objetivos e transparentes para a atribuição de subsídios às associações e corporações de bombeiros voluntários do concelho.",
    estado: "Em execução",
    data: "Janeiro 2026",
    ambito: "Concelho de Anadia",
    evidencia: "Novo regulamento de apoio ao associativismo em fase de discussão pública.",
    documentoUrl: "assets/docs/exemplo-associativismo.pdf"
  },
  {
    id: 12,
    titulo: "Transmissão Direta em Vídeo das Sessões de Câmara e Assembleia",
    categoria: "Transparência & Gestão",
    descricao: "Transmissão integral em direto via internet (YouTube/Facebook) de todas as reuniões públicas da Câmara Municipal e sessões da Assembleia Municipal.",
    estado: "Não implementada",
    data: "Outubro 2025",
    ambito: "Concelho de Anadia",
    evidencia: "Aguardando aprovação de parecer técnico sobre equipamentos de gravação.",
    documentoUrl: "assets/docs/exemplo-transmissao-sessoes.pdf"
  }
];

window.PROPOSTAS_DATA = PROPOSTAS_DATA;
