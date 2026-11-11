/**
 * DADOS OFICIAIS — MEDIDAS CONCRETIZADAS E EM ANDAMENTO
 * Medidas e propostas autárquicas de José Menezes no concelho de Anadia.
 * 
 * Estados disponíveis:
 * - "Concretizada"
 * - "Parcialmente concretizada"
 * - "Em andamento"
 */

const PROPOSTAS_DATA = [
  {
    id: 1,
    titulo: "Piscina municipal ao ar livre",
    categoria: "Lazer & Desporto",
    proposta: "Defendi a criação de uma praia fluvial ou de uma piscina municipal ao ar livre, mediante avaliação da viabilidade das duas opções. O objetivo é proporcionar um espaço de lazer seguro e acessível para famílias e jovens.",
    pontoSituacao: "O Presidente da Câmara informou que está em curso um estudo para a piscina municipal ao ar livre, tendo excluído a opção de praia fluvial. Continuarei a acompanhar o processo e a defender a sua concretização.",
    estado: "Em andamento",
    data: "Mandato 2025–2029",
    ambito: "Concelho de Anadia"
  },
  {
    id: 2,
    titulo: "Parques de autocaravanas",
    categoria: "Turismo & Economia",
    proposta: "Propus a criação de parques de autocaravanas na Curia; em Vilarinho do Bairro (junto ao recinto da Feira Medieval) e nas Termas de Vale da Mó, para melhorar o acolhimento de visitantes e dinamizar o turismo e o comércio local.",
    pontoSituacao: "O Presidente da Câmara concordou com a proposta e delegou na Vereadora Dra. Cristina o acompanhamento do estudo. Continuarei a acompanhar o desenvolvimento do processo.",
    estado: "Em andamento",
    data: "Mandato 2025–2029",
    ambito: "Curia, Vilarinho do Bairro e Vale da Mó"
  },
  {
    id: 3,
    titulo: "Pavilhão dos Desportos ao serviço do basquetebol e das escolas",
    categoria: "Desporto & Educação",
    proposta: "Durante a campanha, defendi a utilização do Pavilhão dos Desportos para a prática de basquetebol e para as aulas de Educação Física, colocando este equipamento ao serviço dos clubes e da comunidade escolar.",
    pontoSituacao: "Esta utilização já é uma realidade. O Pavilhão dos Desportos acolhe o basquetebol e as aulas de Educação Física, dando resposta às necessidades dos desportistas e dos alunos.",
    estado: "Concretizada",
    data: "Concretizada",
    ambito: "Concelho de Anadia"
  },
  {
    id: 4,
    titulo: "IMI no mínimo e alargamento da isenção",
    categoria: "Habitação & Fiscalidade",
    proposta: "Defendi a manutenção da taxa de IMI no mínimo e o alargamento da isenção de três para cinco anos, nos casos aplicáveis, para aliviar os encargos das famílias com a habitação.",
    pontoSituacao: "A manutenção da taxa de IMI no mínimo e o alargamento da isenção para cinco anos são hoje uma realidade, nos casos aplicáveis.",
    estado: "Concretizada",
    data: "Concretizada",
    ambito: "Concelho de Anadia"
  },
  {
    id: 5,
    titulo: "150 apartamentos a custos controlados",
    categoria: "Habitação & Juventude",
    proposta: "Assumi o compromisso de promover a disponibilização de 150 apartamentos a custos controlados ao longo do mandato, para facilitar o acesso à habitação e ajudar a fixar jovens e famílias em Anadia.",
    pontoSituacao: "Em 2026, consegui captar investimento privado para 62 apartamentos, cuja entrega está praticamente concluída. Destes, 20 destinam-se a jovens que recorrem ao financiamento a 100%. É um avanço no compromisso de promover os 150 apartamentos ao longo do mandato.",
    estado: "Parcialmente concretizada",
    data: "2026 — Em curso",
    ambito: "Concelho de Anadia"
  },
  {
    id: 6,
    titulo: "Gabinete de Apoio ao Investimento",
    categoria: "Economia & Empreendedorismo",
    proposta: "Propus a criação de um Gabinete de Apoio ao Investimento para acompanhar empresas e empreendedores, facilitar os processos municipais e atrair projetos que criem emprego e dinamizem a economia de Anadia.",
    pontoSituacao: "A criação do gabinete está em curso. Continuarei a acompanhar o processo até à sua concretização, para que empresas e empreendedores tenham um apoio mais próximo no desenvolvimento dos seus projetos.",
    estado: "Em andamento",
    data: "Mandato 2025–2029",
    ambito: "Concelho de Anadia"
  }
];

if (typeof window !== 'undefined') {
  window.PROPOSTAS_DATA = PROPOSTAS_DATA;
}
