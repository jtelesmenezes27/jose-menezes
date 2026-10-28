/**
 * DADOS DEMONSTRATIVOS — REUNIÕES DE CÂMARA MUNICIPAL DE ANADIA
 * 
 * NOTA IMPORTANTE:
 * Os registos abaixo são exemplos demonstrativos para visualização da estrutura
 * cronológica e detalhe das reuniões quinzenais.
 * Não constituem registos oficiais nem declarações reais de José Menezes.
 * Os dados reais e atas definitivas serão fornecidos posteriormente.
 */

const REUNIOES_DATA = [
  {
    id: 1,
    dataISO: "2026-10-23",
    dataExtenso: "23 de Outubro de 2026",
    ano: 2026,
    numero: "Reunião Ordinária n.º 20/2026",
    titulo: "Debate sobre o Orçamento Municipal e Execução das Obras nas Freguesias",
    resumo: "Sessão focada na análise do estado de execução orçamental do 3.º trimestre, com intervenção incisiva sobre os atrasos nas obras viárias e a necessidade de apoio reforçado aos pequenos produtores da Bairrada.",
    intervencaoDestaque: "«Exigimos rigor absoluto no cumprimento dos prazos das empreitadas públicas e garantia de que nenhuma freguesia do concelho fica esquecida nas dotações de investimento.»",
    propostasApresentadas: [
      {
        titulo: "Auditoria intercalar aos prazos das empreitadas de pavimentação",
        descricao: "Criação de relatório detalhado sobre as derrogações de prazo concedidas nas estradas municipais.",
        estado: "Aprovada"
      },
      {
        titulo: "Linha extraordinária de apoio a vitivinicultores afetados por intempéries",
        descricao: "Comparticipação municipal de emergência para recuperação de infraestruturas agrícolas.",
        estado: "Em Análise"
      }
    ],
    documentos: [
      { nome: "Ordem de Trabalhos n.º 20/2026", tipo: "PDF", url: "assets/docs/exemplo-ordem-trabalhos-20.pdf" },
      { nome: "Intervenção Prévia do Vereador José Menezes", tipo: "PDF", url: "assets/docs/exemplo-intervencao-20.pdf" }
    ]
  },
  {
    id: 2,
    dataISO: "2026-10-09",
    dataExtenso: "9 de Outubro de 2026",
    ano: 2026,
    numero: "Reunião Ordinária n.º 19/2026",
    titulo: "Reforço da Segurança e Manutenção dos Equipamentos Escolares",
    resumo: "Discussão das condições das escolas do 1.º ciclo do concelho, com foco na renovação dos sistemas de aquecimento e pavimentos exteriores, além do policiamento de proximidade.",
    intervencaoDestaque: "«O conforto e a segurança das nossas crianças nas escolas de Anadia não podem ser negociáveis. É preciso investir onde é prioritário.»",
    propostasApresentadas: [
      {
        titulo: "Plano urgente de climatização das salas de aula do 1.º Ciclo",
        descricao: "Substituição de equipamentos obsoletos antes do início do inverno.",
        estado: "Aprovada"
      },
      {
        titulo: "Instalação de passadeiras elevadas junto a todos os polos escolares",
        descricao: "Medida de acalmia de tráfego para prevenção de atropelamentos.",
        estado: "Em Execução"
      }
    ],
    documentos: [
      { nome: "Resumo Deliberativo n.º 19/2026", tipo: "PDF", url: "assets/docs/exemplo-resumo-19.pdf" }
    ]
  },
  {
    id: 3,
    dataISO: "2026-09-25",
    dataExtenso: "25 de Setembro de 2026",
    ano: 2026,
    numero: "Reunião Ordinária n.º 18/2026",
    titulo: "Tarifário de Água, Resíduos e Saneamento para o Exercício Seguinte",
    resumo: "Votação da proposta de revisão tarifária dos serviços municipalizados. Voto contra o aumento de encargos para as famílias e apresentação de proposta de congelamento de taxas.",
    intervencaoDestaque: "«Num contexto de inflação e pressão sobre os rendimentos familiares, o município de Anadia deve dar o exemplo e não sobrecarregar as faturas da água e resíduos.»",
    propostasApresentadas: [
      {
        titulo: "Congelamento das tarifas de água e saneamento para o escalão doméstico",
        descricao: "Manutenção dos valores sem indexação ao IPC como medida de alívio fiscal.",
        estado: "Rejeitada"
      },
      {
        titulo: "Bonificação especial de 25% para agregados familiares numerosos",
        descricao: "Alargamento do escalão social da tarifa de resíduos urbanos.",
        estado: "Em Análise"
      }
    ],
    documentos: [
      { nome: "Declaração de Voto — Tarifários Municipais", tipo: "PDF", url: "assets/docs/exemplo-declaracao-voto-tarifas.pdf" }
    ]
  },
  {
    id: 4,
    dataISO: "2026-09-11",
    dataExtenso: "11 de Setembro de 2026",
    ano: 2026,
    numero: "Reunião Ordinária n.º 17/2026",
    titulo: "Apoio às Juntas de Freguesia e Distribuição de Equipamento Operacional",
    resumo: "Apresentação de proposta para reforço das verbas dos autos de transferência de competências para as 10 freguesias do concelho, garantindo autonomia na limpeza e conservação de vias.",
    intervencaoDestaque: "«As freguesias são a linha da frente do poder autárquico. Transferir competências sem transferir os meios financeiros adequados é estrangular os presidentes de junta.»",
    propostasApresentadas: [
      {
        titulo: "Majoração de 15% nos acordos de execução com as freguesias",
        descricao: "Aumento das transferências correntes para limpeza de bermas e pequenas reparações.",
        estado: "Aprovada"
      }
    ],
    documentos: [
      { nome: "Proposta de Deliberação — Finanças Locais", tipo: "PDF", url: "assets/docs/exemplo-proposta-freguesias.pdf" }
    ]
  },
  {
    id: 5,
    dataISO: "2026-08-28",
    dataExtenso: "28 de Agosto de 2026",
    ano: 2026,
    numero: "Reunião Ordinária n.º 16/2026",
    titulo: "Balanço da Época Balnear e Promoção Termal na Região da Curia",
    resumo: "Discussão das estratégias de dinamização turística e termal de Curia e Tamengos, requalificação dos espaços verdes públicos e atração de investimento privado de qualidade.",
    intervencaoDestaque: "«A Curia é uma marca de prestígio nacional de Anadia que necessita de um plano estratégico de revitalização contínua e não apenas de intervenções pontuais.»",
    propostasApresentadas: [
      {
        titulo: "Criação do Programa 'Revitalizar a Curia e Termas'",
        descricao: "Estudo de benefícios fiscais e urbanísticos para reabilitação do edificado histórico termal.",
        estado: "Em Análise"
      }
    ],
    documentos: [
      { nome: "Ata da Reunião n.º 16/2026", tipo: "PDF", url: "assets/docs/exemplo-ata-16.pdf" }
    ]
  },
  {
    id: 6,
    dataISO: "2026-07-24",
    dataExtenso: "24 de Julho de 2026",
    ano: 2026,
    numero: "Reunião Ordinária n.º 14/2026",
    titulo: "Prevenção de Incêndios Florestais e Meios de Apoio aos Bombeiros",
    resumo: "Intervenção sobre a limpeza de faixas de gestão de combustível nas zonas florestais e apoio extraordinário à Associação Humanitária dos Bombeiros Voluntários de Anadia.",
    intervencaoDestaque: "«Apoiar os nossos bombeiros é proteger vidas e bens. A autarquia tem de estar presente com meios técnicos e suporte financeiro atempado.»",
    propostasApresentadas: [
      {
        titulo: "Subsídio extraordinário para combustível e manutenção de viaturas dos Bombeiros",
        descricao: "Reforço de 20.000€ para suporte ao Dispositivo Especial de Combate a Incêndios.",
        estado: "Aprovada"
      }
    ],
    documentos: [
      { nome: "Deliberação de Apoio aos Bombeiros n.º 14/2026", tipo: "PDF", url: "assets/docs/exemplo-apoio-bombeiros.pdf" }
    ]
  }
];

window.REUNIOES_DATA = REUNIOES_DATA;
