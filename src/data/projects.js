// ─────────────────────────────────────────────────────────────
// Director's Cut — Project Data
// Cada projeto é uma "história" com capítulos narrativos.
// As fotos são as reais do Giovani, distribuídas para demo.
// ─────────────────────────────────────────────────────────────

const projects = [
  {
    slug: 'evento-corporativo-techfranca',
    title: 'TechFranca 2025',
    subtitle: 'Lançamento de Produto & Conferência',
    category: 'Corporativo',
    date: 'Novembro 2025',
    location: 'Franca, SP',
    cover: '/fotos/cel/thumb/_DSC7980.webp',
    coverFull: '/fotos/cel/full/_DSC7980.webp',
    gear: 'Sony A7IV · 24-70mm f/2.8 GM',
    filmStyle: 'Warm Tones · Cinematic',
    duration: '8 horas de cobertura',
    deliverables: '350+ fotos · Vídeo Highlights',
    testimonial: {
      text: 'Cobertura impecável do nosso evento de lançamento. Entregou no prazo, com qualidade altíssima.',
      author: 'Empresa Tech Franca',
    },
    chapters: [
      {
        id: 'bastidores',
        title: 'Bastidores',
        subtitle: 'Antes de tudo começar',
        description: 'Nos bastidores, cada detalhe importa. A montagem do palco, os últimos ajustes de iluminação, a tensão criativa que antecede o grande momento. É aqui que a história realmente começa.',
        photos: [
          { src: '/fotos/cel/full/_GMZ7530.webp', caption: 'Montagem do espaço' },
          { src: '/fotos/cel/full/_GMZ7571.webp', caption: 'Testes de luz e som' },
          { src: '/fotos/cel/full/_GMZ7572.webp', caption: 'Preparação final' },
        ],
      },
      {
        id: 'palco',
        title: 'O Palco',
        subtitle: 'O momento principal',
        description: 'As luzes se acendem. O público espera. É nesse instante que a câmera precisa estar pronta — porque a emoção não se repete. Cada expressão, cada gesto, capturado em alta resolução.',
        photos: [
          { src: '/fotos/cel/full/_GMZ7578.webp', caption: 'Apresentação principal' },
          { src: '/fotos/cel/full/_GMZ7586.webp', caption: 'Platéia engajada' },
          { src: '/fotos/cel/full/_GMZ7600.webp', caption: 'Speaker em ação' },
          { src: '/fotos/cel/full/_GMZ7603.webp', caption: 'Interação com o público' },
        ],
      },
      {
        id: 'detalhes',
        title: 'Os Detalhes',
        subtitle: 'O que os olhos não veem',
        description: 'As nuances que transformam um evento em uma experiência. A decoração impecável, o branding cuidadoso, os pequenos toques que mostram profissionalismo — tudo registrado.',
        photos: [
          { src: '/fotos/cel/full/_GMZ7605.webp', caption: 'Identidade visual do evento' },
          { src: '/fotos/cel/full/_GMZ8026.webp', caption: 'Ambientação e decoração' },
        ],
      },
      {
        id: 'conexoes',
        title: 'Conexões',
        subtitle: 'Pessoas, histórias, networking',
        description: 'No final, um evento corporativo é sobre pessoas. As conexões feitas, os sorrisos trocados, o brinde de celebração. São esses momentos que ficam na memória.',
        photos: [
          { src: '/fotos/cel/full/_GMZ7664.webp', caption: 'Networking entre profissionais' },
          { src: '/fotos/cel/full/_GMZ7668.webp', caption: 'Momento de celebração' },
          { src: '/fotos/cel/full/_GMZ7672.webp', caption: 'Brinde final' },
        ],
      },
    ],
  },

  {
    slug: 'ensaio-artistico-studio',
    title: 'Luz & Sombra',
    subtitle: 'Ensaio Artístico em Estúdio',
    category: 'Ensaios',
    date: 'Outubro 2025',
    location: 'Studio GM · Franca, SP',
    cover: '/fotos/cel/thumb/_GMZ8165.webp',
    coverFull: '/fotos/cel/full/_GMZ8165.webp',
    gear: 'Sony A7IV · 85mm f/1.4 GM',
    filmStyle: 'Moody · Low Key · Fine Art',
    duration: '3 horas de ensaio',
    deliverables: '80+ fotos editadas',
    testimonial: {
      text: 'Me deixou super à vontade durante o ensaio e o resultado superou todas as minhas expectativas. As fotos ficaram mágicas!',
      author: 'Fernanda Costa',
    },
    chapters: [
      {
        id: 'preparacao',
        title: 'Preparação',
        subtitle: 'O primeiro click',
        description: 'O ensaio começa antes da primeira foto. É no aquecimento, na conversa, no conforto que o resultado aparece. A câmera só captura o que a confiança permite.',
        photos: [
          { src: '/fotos/cel/full/_GMZ8176.webp', caption: 'Primeiros testes de luz' },
          { src: '/fotos/cel/full/_GMZ8212.webp', caption: 'Encontrando o ângulo certo' },
        ],
      },
      {
        id: 'retratos',
        title: 'Retratos',
        subtitle: 'Revelando essências',
        description: 'Em um retrato, o objetivo não é só registrar um rosto — é capturar uma personalidade. A lente de 85mm isola o sujeito, o fundo se dissolve, e o que resta é pura expressão humana.',
        photos: [
          { src: '/fotos/cel/full/_GMZ8221.webp', caption: 'Retrato em luz natural' },
          { src: '/fotos/cel/full/_GMZ8598.webp', caption: 'Composição e expressão' },
          { src: '/fotos/cel/full/_GMZ8612.webp', caption: 'Olhar cinematográfico' },
        ],
      },
      {
        id: 'arte',
        title: 'Arte Final',
        subtitle: 'O resultado que emociona',
        description: 'Depois de horas de work, os melhores frames emergem. É na edição que a magia se completa — os tons ajustados, o contraste perfeito, a imagem que conta uma história inteira em um único quadro.',
        photos: [
          { src: '/fotos/cel/full/_GMZ8618.webp', caption: 'Frame final selecionado' },
          { src: '/fotos/cel/full/_GMZ8656.webp', caption: 'A foto da sessão' },
        ],
      },
    ],
  },

  {
    slug: 'cobertura-gastronomia-sabores',
    title: 'Sabores em Foco',
    subtitle: 'Fotografia Gastronômica para Cardápio',
    category: 'Gastronomia',
    date: 'Setembro 2025',
    location: 'Restaurante Villa · Franca, SP',
    cover: '/fotos/cel/thumb/_GMZ7603.webp',
    coverFull: '/fotos/cel/full/_GMZ7603.webp',
    gear: 'Sony A7IV · 90mm f/2.8 Macro',
    filmStyle: 'Clean · Warm · Appetizing',
    duration: '5 horas de produção',
    deliverables: '60 pratos · 200 fotos editadas',
    testimonial: {
      text: 'As fotos dos pratos ficaram incríveis! O engajamento nas redes sociais aumentou 40% depois de atualizar o cardápio.',
      author: 'Chef Ricardo · Villa Restaurante',
    },
    chapters: [
      {
        id: 'mise-en-place',
        title: 'Mise en Place',
        subtitle: 'A cozinha como palco',
        description: 'Na gastronomia, tudo começa na preparação. Os ingredientes cuidadosamente dispostos, a bancada impecável, o chef em ação. A fotografia de food styling começa aqui.',
        photos: [
          { src: '/fotos/cel/full/_GMZ7578-1.webp', caption: 'Ingredientes selecionados' },
          { src: '/fotos/cel/full/_DSC7980.webp', caption: 'Chef em ação' },
        ],
      },
      {
        id: 'empratamento',
        title: 'Empratamento',
        subtitle: 'Arte em cada detalhe',
        description: 'O momento em que o prato ganha vida. A disposição de elementos, as cores, as texturas — cada detalhe foi pensado para ser irresistível tanto no prato quanto na foto.',
        photos: [
          { src: '/fotos/cel/full/_GMZ8165.webp', caption: 'Empratamento artístico' },
          { src: '/fotos/cel/full/_GMZ8026.webp', caption: 'Detalhes de apresentação' },
          { src: '/fotos/cel/full/_GMZ7605.webp', caption: 'Composição final' },
        ],
      },
      {
        id: 'resultado',
        title: 'O Cardápio',
        subtitle: 'Pronto para encantar',
        description: 'O resultado final: imagens que transformam um cardápio em uma experiência visual desejável. Fotos que fazem o cliente escolher antes mesmo de provar.',
        photos: [
          { src: '/fotos/cel/full/_GMZ7600.webp', caption: 'Prato signature' },
          { src: '/fotos/cel/full/_GMZ7530.webp', caption: 'Harmonia de sabores' },
        ],
      },
    ],
  },
]

export default projects

// Helper: encontrar projeto por slug
export function getProjectBySlug(slug) {
  return projects.find(p => p.slug === slug)
}

// Helper: obter todos os slugs
export function getAllSlugs() {
  return projects.map(p => p.slug)
}
