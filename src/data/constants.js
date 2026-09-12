// src/data/constants.js - hub central. Dados pesados ficam nos sub-módulos abaixo.
export * from './animations.js'
export * from './timeline.js'
export * from './fotos.js'
export * from './cartas.js'
export * from './conquistas.js'
export * from './mapa.js'
export * from './capitulos.js'
export * from './raridades.js'

// src/data/constants.js

/** URL pública do site (https://dominio.com, sem barra no final). Fallback do sitemap se SITE_URL não estiver no .env / CI. */
export const SITE_ORIGIN = 'https://ourstory.antonaji.com.br'

/** Nome dela hoje (textos legais, créditos). */
export const NOME_ELA_COMPLETO = 'Maysa Sophia Ferreira da Silva'

/**
 * Nome que vocês já combinaram (ex.: pra quando casarem).
 * Usado no slide “Futuro” e onde quiser celebrar esse combinado.
 */
export const NOME_ELA_FUTURO = 'Maysa Sophia Ferreira da Silva Antonaji'

/** Contador: 04/03/2026 00:00 (meia-noite do dia do namoro). */
export const INICIO_NAMORO = new Date(2026, 2, 4, 0, 0, 0)


/** Passagens exibidas no slide “Versículo” - `tipo`: numerados | destaque */
export const PASSAGENS_BIBLICAS = [
  {
    id: '1cor13',
    titulo: '1 Coríntios 13:4–7',
    principal: true,
    tipo: 'numerados',
    versiculos: [
      { n: '4', texto: 'O amor é paciente, o amor é bondoso. Não inveja, não se vangloria, não se orgulha.' },
      { n: '5', texto: 'Não maltrata, não procura seus interesses, não se ira facilmente, não guarda rancor.' },
      { n: '6', texto: 'O amor não se alegra com a injustiça, mas se alegra com a verdade.' },
      { n: '7', texto: 'Tudo sofre, tudo crê, tudo espera, tudo suporta.' },
    ],
    nota: 'Esse é um dos versículos mais importantes da nossa história, gravado na nossa aliança.',
  },
  {
    id: 'ec4',
    titulo: 'Eclesiastes 4:9–12',
    tipo: 'numerados',
    versiculos: [
      { n: '9', texto: 'Melhor é serem dois do que um, porque têm melhor paga do seu trabalho.' },
      { n: '10', texto: 'Porque, se um cair, o outro levanta o seu companheiro; mas ai do que estiver só; pois, caindo, não haverá outro que o levante.' },
      { n: '11', texto: 'Também, se dois dormirem juntos, eles se aquentarão; mas um só, como se aquentará?' },
      { n: '12', texto: 'E, se alguém prevalecer contra um, os dois lhe resistirão; e o cordão de três dobras não se quebra tão depressa.' },
    ],
    nota: 'Com você, eu nunca caminho sozinho. Somos mais fortes juntos.',
  },
  {
    id: 'col314',
    titulo: 'Colossenses 3:14',
    tipo: 'destaque',
    citacao: 'Acima de tudo, revistam-se do amor, que é o elo perfeito.',
    reflexao: 'O amor como aquilo que sustenta e mantém o relacionamento firme.',
  },
  {
    id: 'ef528',
    titulo: 'Efésios 5:28',
    tipo: 'destaque',
    citacao: 'Assim devem os maridos amar as suas próprias mulheres, como a seus próprios corpos. Quem ama a sua mulher, ama-se a si mesmo.',
    reflexao: 'Minha promessa é te amar como Cristo amou a Igreja, com entrega, cuidado e fidelidade.',
  },
  {
    id: 'pv1914',
    titulo: 'Provérbios 19:14',
    tipo: 'destaque',
    citacao: 'A casa e os bens são herança dos pais; porém do Senhor vem a esposa prudente.',
    reflexao:
      'O que se herda pode ser medido; o que Deus une não. Você não é um acaso na minha vida - é presente dEle, sabedoria que abençoa o lar e o caminho. Gratidão por cuidar do nosso amor com o coração e com a fé.',
  },
  {
    id: 'gn224',
    titulo: 'Gênesis 2:24',
    tipo: 'destaque',
    citacao:
      'Portanto deixará o homem o seu pai e a sua mãe, e apegar-se-á à sua mulher, e serão ambos uma carne.',
    reflexao:
      'O desenho de Deus para o amor: prioridade um no outro, vínculo que não se divide. É isso que eu quero viver com você - unidade de verdade, com Cristo no centro.',
  },
  {
    id: '1pe37',
    titulo: '1 Pedro 3:7',
    tipo: 'destaque',
    citacao:
      'Do mesmo modo vocês, maridos, sejam sábios no convívio com suas mulheres e tratem-nas com honra, como parte mais frágil e co-herdeiras do dom da graça da vida, de forma que não sejam interrompidas as suas orações.',
    reflexao:
      'Honra e cuidado não são opcionais - são o jeito de amar que abre espaço pra Deus no meio da gente. Quero ser esse marido: presente, respeitoso e grato por caminhar contigo na mesma herança.',
  },
  {
    id: 'ct87',
    titulo: 'Cânticos 8:7',
    tipo: 'destaque',
    citacao:
      'As muitas águas não poderiam apagar este amor, nem os rios afogá-lo.',
    reflexao:
      'Nada que vier vai ser forte o suficiente pra apagar o que Deus acendeu entre nós. Eu te escolho na água calma e te escolho na tempestade.',
  },
  {
    id: 'sl128',
    titulo: 'Salmos 128:1–4',
    tipo: 'numerados',
    versiculos: [
      { n: '1', texto: 'Bem-aventurado aquele que teme ao Senhor e anda nos seus caminhos.' },
      { n: '2', texto: 'Pois comerás do trabalho das tuas mãos; feliz serás, e te irá bem.' },
      { n: '3', texto: 'A tua mulher será como a videira frutífera aos lados da tua casa; os teus filhos como plantas de oliveira à roda da tua mesa.' },
      { n: '4', texto: 'Eis que assim será abençoado o homem que teme ao Senhor.' },
    ],
    nota: 'Quando leio isso, só consigo imaginar nosso futuro com Deus no centro.',
  },
]

export const SPOTIFY_URLS = [
  'https://open.spotify.com/embed/track/3pinR9iFoRAZvqirrRm4os',
  'https://open.spotify.com/embed/track/7FOPTUmEJ3ByYW9ag9cZJ3',
  'https://open.spotify.com/embed/track/0uwaiApk6k7k9POyFjTKeR',
  'https://open.spotify.com/embed/track/6ccKu0LwJzOhLAxBwP2PTk',
  'https://open.spotify.com/embed/track/2WViLEKp7hWDJQbowxqzba',
  'https://open.spotify.com/embed/track/0A8K5i1KBtY3ztMETimVCK',
  'https://open.spotify.com/embed/track/1DLKuppSYytOuxhtI6KBGu',
  'https://open.spotify.com/embed/track/352FuGmGJClPjojSYjNrXG',
  'https://open.spotify.com/embed/track/1og6YRY01JKaIDjSGVM8FZ',
  'https://open.spotify.com/embed/track/3PlKQNlbL4767rND3HnqSI',
  'https://open.spotify.com/embed/track/6eDApnV9Jdb1nYahOlbbUh',
  'https://open.spotify.com/embed/track/5FbcIkgUDNt6mZdDVFwVyE',
  'https://open.spotify.com/embed/track/3kNT9msV6JCFz6NnmDcyp2',
  'https://open.spotify.com/embed/track/01Z18LIRXx7QHzWp2QpDaE',
]


export const SLIDE_IDS = [
  'intro', 'timer', 'antesdepois', 'musica', 'carta', 'tags',
  'versiculo', 'momentos',
  'historia', 'mapa',
  'presentefotos',
  'promessas', 'motivos', 'futuro', 'recado', 'creditos', 'cartas', 'bucketlist', 'conquistas', 'final',
]

/**
 * 100 motivos para amar - exibidos no slide "Motivos".
 * ✏️ Edite, adicione ou remova à vontade.
 */
export const MOTIVOS_TE_AMO = [
  'Porque você me aproxima de Deus.',
  'Porque seu sorriso muda meu dia.',
  'Porque você cuida de quem ama.',
  'Porque você me faz querer ser melhor.',
  'Porque você me traz paz.',
  'Porque você acredita em mim.',
  'Porque você me incentiva a crescer.',
  'Porque seu abraço parece casa.',
  'Porque você é gentil com as pessoas.',
  'Porque você tem um coração enorme.',
  'Porque você me faz rir até nos dias difíceis.',
  'Porque você me escuta de verdade.',
  'Porque você é forte mesmo quando acha que não é.',
  'Porque tenho certeza que você vai ser a mãe mais incrível do mundo.',
  'Porque você ama a Deus acima de tudo.',
  'Porque você me faz sentir amado.',
  'Porque você é carinhosa nos detalhes.',
  'Porque você se preocupa comigo.',
  'Porque você ora por mim.',
  'Porque você me inspira.',
  'Porque você é linda por dentro e por fora.',
  'Porque você é sincera.',
  'Porque você me entende.',
  'Porque você me acolhe nos meus dias ruins.',
  'Porque você comemora minhas conquistas.',
  'Porque você me ajuda a enxergar o lado bom das coisas.',
  'Porque você tem um sorriso encantador.',
  'Porque sua voz me acalma.',
  'Porque você é dedicada.',
  'Porque você é determinada.',
  'Porque você é uma mulher admirável.',
  'Porque você me faz sentir especial.',
  'Porque você me faz sonhar com o futuro.',
  'Porque você é meu porto seguro.',
  'Porque você é paciente comigo.',
  'Porque você tem um coração sensível.',
  'Porque você valoriza a família.',
  'Porque você me aceita como eu sou.',
  'Porque você me ajuda a ser uma versão melhor de mim.',
  'Porque você é companheira.',
  'Porque você me apoia nos meus projetos.',
  'Porque você me faz acreditar no amor.',
  'Porque você me ensina coisas novas.',
  'Porque você se importa com os pequenos detalhes.',
  'Porque você não desiste facilmente.',
  'Porque você é corajosa.',
  'Porque você tem uma fé inspiradora.',
  'Porque você me faz sentir em paz.',
  'Porque você cuida tão bem das suas irmãs.',
  'Porque você tem um jeito único de demonstrar amor.',
  'Porque você alegra meus dias.',
  'Porque você me faz sorrir sem perceber.',
  'Porque você é verdadeira.',
  'Porque você me trata com respeito.',
  'Porque você é doce.',
  'Porque você tem um coração puro.',
  'Porque você é uma bênção na minha vida.',
  'Porque você me faz sentir em casa.',
  'Porque você compartilha seus sonhos comigo.',
  'Porque você me permite compartilhar os meus.',
  'Porque você é minha melhor amiga.',
  'Porque você me entende até quando não consigo me explicar.',
  'Porque você me mostra o amor de Deus através das suas atitudes.',
  'Porque você se preocupa com quem está ao seu redor.',
  'Porque você tem um olhar que transmite carinho.',
  'Porque você é especial de um jeito impossível de explicar.',
  'Porque você é forte nos momentos difíceis.',
  'Porque você me dá motivos para agradecer todos os dias.',
  'Porque você me ajuda a enxergar propósito nas coisas.',
  'Porque você me incentiva espiritualmente.',
  'Porque você é humilde.',
  'Porque você me faz sentir importante.',
  'Porque você se importa com meus sentimentos.',
  'Porque você me ajuda a enfrentar os desafios.',
  'Porque você é dedicada àquilo que ama.',
  'Porque você tem um coração de serva.',
  'Porque você me inspira a amar mais.',
  'Porque você me inspira a perdoar mais.',
  'Porque você me inspira a confiar mais em Deus.',
  'Porque você tem um jeito lindo de demonstrar gratidão.',
  'Porque você se alegra com as coisas simples.',
  'Porque você faz qualquer lugar ficar melhor.',
  'Porque você me ajuda a encontrar calma no caos.',
  'Porque você é uma mulher virtuosa.',
  'Porque você me faz querer construir uma vida ao seu lado.',
  'Porque você me faz acreditar que vale a pena lutar pelo amor.',
  'Porque você me faz sentir orgulho.',
  'Porque você é uma resposta das minhas orações.',
  'Porque você me faz enxergar beleza na rotina.',
  'Porque você é paciente com a Duda.',
  'Porque você tem um amor genuíno pelas pessoas.',
  'Porque você me ensina através do exemplo.',
  'Porque você me faz sentir amado mesmo nos meus dias mais difíceis.',
  'Porque você nunca deixa de tentar.',
  'Porque você é uma guerreira.',
  'Porque você me ajuda a ser um homem melhor.',
  'Porque você tornou minha vida mais bonita.',
  'Porque você faz parte dos meus melhores sonhos.',
  'Porque eu admiro a mulher que você é.',
  'Porque, depois de tudo isso, eu continuo encontrando novos motivos para te amar todos os dias. ❤️',
]

/**
 * Créditos finais - estilo encerramento de filme.
 * ✏️ Edite nomes e notas conforme quiser.
 */
export const CREDITOS = [
  {
    categoria: 'Uma mensagem que mudou tudo',
    itens: [
      {
        papel: 'A mãe que não deixou ignorar o coitado',
        nome: 'Sua mãe',
        nota: 'Sem aquela resposta, nada disso teria começado. Obrigado do fundo do coração.',
      },
    ],
  },
  {
    categoria: 'O pedido de namoro',
    itens: [
      {
        papel: 'A cúmplice que tornou tudo possível',
        nome: 'Talita',
        nota: 'Ajudou a nos aproximar, ajudou a escolher as alianças, os lugares, e esteve em cada detalhe que fez esse amor acontecer',
      },
      {
        papel: 'Garçom que entrou no plano sem hesitar',
        nome: 'Garçom do João Julhão',
        nota: 'Por fazer a cena mais especial acontecer do jeito certo',
      },
    ],
  },
  {
    categoria: 'Parte da nossa história',
    itens: [
      {
        papel: 'Onde dois corações começaram a se aproximar',
        nome: 'Comunidade Apascentar',
        nota: 'O acampamento de fevereiro de 2026 que plantou tudo isso',
      },
    ],
  },
  {
    categoria: 'Direção geral',
    itens: [
      {
        papel: 'Autor, Diretor e Realizador',
        nome: 'Deus',
        nota: 'Que escreveu essa história muito antes da gente e cuidou de cada detalhe do caminho',
      },
    ],
  },
]

/** Bloco Antes de Você / Depois de Você (slide dedicado). */
export const ANTES_DEPOIS = {
  antesTitulo: 'Antes de Você',
  depoisTitulo: 'Depois de Você',
  antes: [
    'Corria atrás dos meus objetivos, mas muitas vezes no automático',
    'A fé existia, mas nem sempre guiava minhas decisões',
    'Conquistas eram importantes, mas faltava algo que preenchesse de verdade',
    'Dias bons… mas sem alguém pra dividir tudo de forma completa',
    'Sabia onde queria chegar, mas não com quem construir',
  ],
  depois: [
    'Minha vida ganhou sentido, direção e propósito de verdade',
    'Passei a viver com Deus no centro e com o coração mais alinhado',
    'Não é mais só sobre conquistar… é sobre construir juntos',
    'Encontrei paz, leveza e um amor que me aproxima de quem eu quero ser',
    'Hoje eu não caminho sozinho… eu tenho você, e isso muda tudo',
    'Sonhos deixaram de ser só meus - agora são nossos 💍',
  ],
}

/**
 * Ambiência que cai em cada capítulo (mesma ordem de SLIDE_IDS).
 * `shape` vem de components/animations/Shapes.jsx; `tint` é a cor da forma.
 */
export const SLIDE_AMBIENCE = [
  { shape: 'petal', tint: 'rgba(196, 96, 118, 0.55)' },  // intro
  { shape: 'seed',  tint: 'rgba(156, 111, 56, 0.42)' },  // timer
  { shape: 'leaf',  tint: 'rgba(111, 133, 112, 0.50)' }, // antes & depois
  { shape: 'note',  tint: 'rgba(196, 162, 240, 0.60)' }, // musica
  { shape: 'petal', tint: 'rgba(176, 101, 74, 0.42)' },  // carta
  { shape: 'star',  tint: 'rgba(212, 105, 127, 0.48)' }, // tags
  { shape: 'drop',  tint: 'rgba(156, 111, 56, 0.45)' },  // versiculo
  { shape: 'petal', tint: 'rgba(240, 162, 176, 0.45)' }, // momentos (escuro)
  { shape: 'seed',  tint: 'rgba(176, 101, 74, 0.40)' },  // historia
  { shape: 'star',  tint: 'rgba(230, 180, 101, 0.42)' }, // mapa (escuro)
  { shape: 'petal', tint: 'rgba(212, 105, 127, 0.50)' }, // flores
  { shape: 'leaf',  tint: 'rgba(111, 133, 112, 0.52)' }, // promessas
  { shape: 'heart', tint: 'rgba(196, 96, 118, 0.42)' },  // motivos
  { shape: 'drop',  tint: 'rgba(198, 130, 74, 0.48)' },  // futuro
  { shape: 'petal', tint: 'rgba(176, 101, 74, 0.40)' },  // recado
  { shape: 'star',  tint: 'rgba(230, 180, 101, 0.38)' }, // creditos (escuro)
  { shape: 'seed',  tint: 'rgba(224, 176, 106, 0.42)' }, // cartas (escuro)
  { shape: 'leaf',  tint: 'rgba(111, 133, 112, 0.50)' }, // bucketlist
  { shape: 'star',  tint: 'rgba(240, 199, 106, 0.48)' }, // conquistas (escuro)
  { shape: 'heart', tint: 'rgba(196, 96, 118, 0.50)' },  // final
]

/**
 * Lugares da nossa história exibidos no slide "Mapa".
 * coords: [lat, lng]  (copiado do Google Maps / OpenStreetMap)
 * foto: caminho relativo a /public
 */
