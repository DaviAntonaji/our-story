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

/**
 * Memórias dos mêsversários (aparecem no slide do tempo depois da data).
 * Inclua novos blocos conforme forem acontecendo.
 */
export const MESESVERSARIOS = [
  {
    id: 1,
    data: new Date(2026, 3, 4, 0, 0, 0, 0),
    titulo: '1º mês 🤍',
    resumo: [
      'Sábado de manhã, piquenique na praça da entrada da cidade - só nós dois, comida boa e aquele clima leve que a gente ama.',
    ],
  },
  {
    id: 2,
    data: new Date(2026, 4, 1, 0, 0, 0, 0),
    titulo: '2º mês 🤍',
    resumo: [
      'Sexta-feira na praça da entrada - adiantamos três dias pra comemorar. Troca de presentes com muito significado: flores, cartinha feita a mão, docinhos e um anel solitário como promessa. Você me deu um potinho cheio de beijinhos marcados e uma cartinha linda. Tapioca na avenida, docinhos e canteiro central pra fechar o dia.',
    ],
  },
]

/** Passagens exibidas no slide “Versículo” - `tipo`: numerados | destaque */
export const PASSAGENS_BIBLICAS = [
  {
    id: '1cor13',
    titulo: '1 Coríntios 13:4–7',
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
]

export const FOTOS = [
  // Pedido de namoro
  '/imgs/photos/pedido_namoro/1.jpg', '/imgs/photos/pedido_namoro/2.jpg', '/imgs/photos/pedido_namoro/3.jpg',
  '/imgs/photos/pedido_namoro/4.jpg', '/imgs/photos/pedido_namoro/5.jpg', '/imgs/photos/pedido_namoro/6.jpg',
  '/imgs/photos/pedido_namoro/7.jpg', '/imgs/photos/pedido_namoro/8.jpg', '/imgs/photos/pedido_namoro/9.jpg',
  // Conversa com seus pais
  '/imgs/photos/conversa_com_seus_pais/10.jpeg', '/imgs/photos/conversa_com_seus_pais/11.jpeg',
  '/imgs/photos/conversa_com_seus_pais/12.jpeg', '/imgs/photos/conversa_com_seus_pais/13.jpeg',
  // Shopping com meus pais
  '/imgs/photos/shopping_com_meus_pais/14.jpg', '/imgs/photos/shopping_com_meus_pais/15.jpg',
  // Primeira Santa Ceia
  '/imgs/photos/primeira_santa_ceia/16.jpg',
  // Momentos aleatórios
  '/imgs/photos/momentos_aleatorios/17.jpg',
  // Cafeteria Koike
  '/imgs/photos/cafeteria_koike/18.jpg', '/imgs/photos/cafeteria_koike/19.jpg',
  '/imgs/photos/cafeteria_koike/20.jpg', '/imgs/photos/cafeteria_koike/21.jpg', '/imgs/photos/cafeteria_koike/22.jpg',
  // Primeiro pós-culto
  '/imgs/photos/primeiro-pos-culto/23.jpg',
  // Primeira vez no Tips / Pizzaria juntos
  '/imgs/photos/primeira-vez-no-tips-pizzaria-juntos/24.jpg', '/imgs/photos/primeira-vez-no-tips-pizzaria-juntos/25.jpg',
  '/imgs/photos/primeira-vez-no-tips-pizzaria-juntos/26.jpg', '/imgs/photos/primeira-vez-no-tips-pizzaria-juntos/27.jpg',
  '/imgs/photos/primeira-vez-no-tips-pizzaria-juntos/28.jpg', '/imgs/photos/primeira-vez-no-tips-pizzaria-juntos/29.jpg',
  '/imgs/photos/primeira-vez-no-tips-pizzaria-juntos/30.jpg', '/imgs/photos/primeira-vez-no-tips-pizzaria-juntos/31.jpg',
  '/imgs/photos/primeira-vez-no-tips-pizzaria-juntos/32.jpg',
  // Almoço nos seus avós
  '/imgs/photos/almoco_nos_seus_avos/33.jpg',
  // Pós-culto com nossas irmãs
  '/imgs/photos/pos_culto_com_nossas_irmas/34.jpg', '/imgs/photos/pos_culto_com_nossas_irmas/35.jpg',
  '/imgs/photos/pos_culto_com_nossas_irmas/36.jpg', '/imgs/photos/pos_culto_com_nossas_irmas/37.jpg',
  '/imgs/photos/pos_culto_com_nossas_irmas/38.jpg', '/imgs/photos/pos_culto_com_nossas_irmas/39.jpg',
  '/imgs/photos/pos_culto_com_nossas_irmas/40.jpg', '/imgs/photos/pos_culto_com_nossas_irmas/41.jpg',
  '/imgs/photos/pos_culto_com_nossas_irmas/42.jpg',
  // Primeira visita sua na minha casa
  '/imgs/photos/primeira_visita_sua_na_minha_casa/43.jpg', '/imgs/photos/primeira_visita_sua_na_minha_casa/44.jpg',
  // Visita culto IPI
  '/imgs/photos/visita_culto_ipi/45.jpg', '/imgs/photos/visita_culto_ipi/46.jpg',
  // Primeiro cinema
  '/imgs/photos/primeiro_cinema/47.jpg', '/imgs/photos/primeiro_cinema/48.jpg', '/imgs/photos/primeiro_cinema/49.jpg',
  // Primeiro mêsversário - piquenique
  '/imgs/photos/primeiro_mesversario_piquinique/50.jpg', '/imgs/photos/primeiro_mesversario_piquinique/51.jpg',
  '/imgs/photos/primeiro_mesversario_piquinique/52.jpg', '/imgs/photos/primeiro_mesversario_piquinique/53.jpg',
  // Pós-culto combinando na praça
  '/imgs/photos/posculto_combinando_na_praca/54.jpg', '/imgs/photos/posculto_combinando_na_praca/55.jpg',
  '/imgs/photos/posculto_combinando_na_praca/56.jpg', '/imgs/photos/posculto_combinando_na_praca/57.jpg',
  '/imgs/photos/posculto_combinando_na_praca/58.jpg', '/imgs/photos/posculto_combinando_na_praca/59.jpg',
  '/imgs/photos/posculto_combinando_na_praca/60.jpg',
  // 2º mêsversário
  '/imgs/photos/segundo_mesversario/IMG_2835.jpg', '/imgs/photos/segundo_mesversario/IMG_2849.jpg',
  // 2º mêsversário - dia 2
  '/imgs/photos/segundo_mesversario_dia2/IMG_2868.jpg', '/imgs/photos/segundo_mesversario_dia2/IMG_2870.jpg',
  '/imgs/photos/segundo_mesversario_dia2/IMG_2872.jpg', '/imgs/photos/segundo_mesversario_dia2/IMG_2879.jpg',
  '/imgs/photos/segundo_mesversario_dia2/IMG_2882.jpg',
]

/**
 * Flores que eu te dei- cada item = data, texto em 1ª pessoa e foto(s).
 * - `imagem`: string (uma foto no bloco).
 * - `imagens`: array de 2–4 URLs (mesmo espaço, grid automático: 2 colunas; 3 = duas em cima e uma embaixo; 4 = grade 2×2).
 * Se os dois existirem, `imagens` tem prioridade.
 * `data` (opcional): linha de data exibida acima do título.
 */
export const SESSAO_FOTOS_PRESENTE = {
  titulo: 'Flores que eu te dei',
  subtitulo:
    'Eu te dei cada buquê com um significado. É só o começo- eu quero te dar muitas flores ainda.',
  itens: [
    {
      id: 'sf1',
      data: '4 de março de 2026',
      imagens: ['/imgs/flowers/Rosa%201.jpeg', '/imgs/flowers/Rosa%202.jpeg'],
      titulo: 'Rosas vermelhas',
      paras: [
        'Eu te dei rosas vermelhas porque elas dizem o que muitas vezes eu só consigo sentir no peito: amor profundo, paixão, desejo e admiração. É o símbolo clássico do romance- "eu te amo", encanto, respeito e gratidão.',
        'Eu quis que você soubesse da minha paixão de verdade e do amor que eu pretendo fazer durar. O vermelho vivo é desejo e entrega; o mais fechado, a paixão que eu sinto fundo em mim.',
        'Esse buquê foi o do pedido de namoro- um dos momentos mais especiais da nossa história, e eu te dei de coração.',
      ],
    },
    {
      id: 'sf2',
      data: '7 de março de 2026',
      imagens: [
        '/imgs/flowers/Girassol%201.jpeg',
        '/imgs/flowers/Girassol%202.jpeg',
        '/imgs/flowers/Girassol%203.jpeg',
        '/imgs/flowers/Girassol%204.jpeg',
      ],
      titulo: 'Dois girassóis',
      paras: [
        'Eu te dei dois girassóis- duas flores de propósito, porque o número importava: dois pra dizer amor recíproco, lealdade e união.',
        'Tem a "teoria do girassol": na ausência de sol, elas se voltam uma pra outra em vez de ficarem só mirando o alto. Presentear com dois girassóis carrega isso- lealdade e parceria. O significado que eu quis te passar é esse: mesmo na escuridão, você é a minha luz. A gente se apoia e se ilumina nos dias mais difíceis.',
        'Quando falta luz, eu me viro pra você- e quero que você saiba que pode virar pra mim. Adoração, fidelidade, cumplicidade; reciprocidade de verdade e amor que fica. Dois juntos lembram união rara, força e vida compartilhada- foi assim que eu quis te presentear.',
        'Eu te dei no Dia das Mulheres- no mesmo dia em que eu fui conversar com seus pais sobre o namoro. Dois marcos que eu guardei no mesmo dia.',
      ],
    },
    {
      id: 'sf3',
      data: '13 de março de 2026',
      imagens: ['/imgs/flowers/Orquidea%201.jpeg', '/imgs/flowers/Orquidea%202.jpeg'],
      titulo: 'Orquídea branca',
      paras: [
        'Eu te dei orquídea branca porque ela carrega pureza, paz, inocência, elegância e um ar de sofisticação leve. Eu quis te dizer eternidade, amor duradouro e sinceridade- gratidão e carinho puro, sem artifício.',
        'Foi num dia comum, sem data especial no calendário- eu te dei só porque eu queria ver sua alegria.',
      ],
    },
    {
      id: 'sf4',
      data: '10 de abril de 2026',
      imagens: [
        '/imgs/flowers/Azaleia%201.jpeg',
        '/imgs/flowers/Azaleia%202.jpeg',
        '/imgs/flowers/Azaleia%203.jpeg',
        '/imgs/flowers/Azaleia%204.jpeg',
      ],
      titulo: 'Azaleia rosa',
      paras: [
        'Eu te dei azaleia rosa porque ela fala de delicadeza, graça, feminilidade, amor à natureza e afeto terno. Eu quis te dizer admiração e apreço sincero- e um pouco de equilíbrio e renovação.',
        'No Feng Shui ela costuma associar-se à suavidade; por aqui ela aparece bastante nos jardins- leve e viva, como eu queria que chegasse até você.',
        'Eu te dei num dia comum também, sem ocasião especial no calendário.',
      ],
    },
  ],
}

export const SLIDE_IDS = [
  'intro', 'timer', 'antesdepois', 'musica', 'carta', 'tags',
  'versiculo', 'momentos',
  'historia',
  'presentefotos',
  'promessas', 'futuro', 'recado', 'final',
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

/** Emoji de ambiente por slide (mesma ordem que SLIDE_IDS). glow = bruma na cor do gradiente do fundo. */
export const SLIDE_AMBIENCE = [
  { emoji: '🌹', glow: 'rgba(251, 113, 133, 0.42)' },
  { emoji: '⏳', glow: 'rgba(212, 175, 55, 0.38)' },
  { emoji: '🌗', glow: 'rgba(52, 211, 153, 0.42)' },
  { emoji: '🎵', glow: 'rgba(167, 139, 250, 0.4)' },
  { emoji: '💌', glow: 'rgba(252, 211, 77, 0.38)' },
  { emoji: '✨', glow: 'rgba(244, 114, 182, 0.4)' },
  { emoji: '✝️', glow: 'rgba(129, 140, 248, 0.42)' },
  { emoji: '📸', glow: 'rgba(167, 139, 250, 0.28)' },
  { emoji: '📖', glow: 'rgba(212, 175, 55, 0.36)' },
  { emoji: '💐', glow: 'rgba(251, 182, 193, 0.36)' },
  { emoji: '🌿', glow: 'rgba(52, 211, 153, 0.38)' },
  { emoji: '🌅', glow: 'rgba(59, 130, 246, 0.4)' },
  { emoji: '💬', glow: 'rgba(244, 114, 182, 0.35)' },
  { emoji: '💝', glow: 'rgba(251, 113, 133, 0.45)' },
]

export const TIMELINE = [
  {
    data: '13–15 de fevereiro de 2026',
    titulo: 'Onde tudo começou',
    icon: '⛺',
    paras: [
      'Foi no acampamento da Comunidade Apascentar que começamos a nos aproximar de verdade, conversando mais e conhecendo melhor o estilo um do outro.',
    ],
  },
  {
    data: '20 de fevereiro de 2026',
    titulo: 'Quando você se apaixonou por mim',
    icon: '💕',
    paras: [
      'Eu não sabia o quão mal você estava naquele dia... Você estava mal ao ponto de qualquer coisa te fazer chorar...',
      'Você só disse: "estou meio desanimada hoje..." Não revelou o real peso que estava sentindo...',
      'E quando comecei a conversar com você sobre Deus, e passagens sobre não desanimar, sobre cansar... Você chorou na hora - e foi só depois, já namorando, que você me contou que foi ali que percebeu que estava apaixonada por mim.',
    ],
  },
  {
    data: '04 de março de 2026',
    titulo: 'Início do nosso namoro',
    icon: '💍',
    paras: [
      'Começou quando combinamos de sair no João Julhão às 18h. Cheguei exatamente às 18:00 e já combinei com o garçom todo o roteiro do que iria acontecer. Quando você chegou com a Talita, estava linda… e ali meu coração já acelerou.',
      'Fomos até a mesa que eu já tinha deixado separada, planejando deixar você sentada de costas para a cozinha, para que não visse nada do que estava sendo preparado.',
      'Foi uma conversa natural e descontraída, principalmente com as perguntas que você começou a fazer - sobre família, estabilidade, educação financeira… tudo isso enquanto comíamos filé mignon à parmegiana.',
      'Até que chegou o momento que eu tinha combinado com os garçons. Terminamos de comer, pedi a sobremesa, e o garçom chegou trazendo junto o buquê e as alianças.',
      'Seus olhos brilhando como se quisesse chorar, sua bochecha tremendo de alegria… você estava tão feliz. E naquele instante você me tornou o homem mais feliz do mundo.',
      'Depois disso, te levei pela primeira vez até a sua casa a sós. Quando você me abraçou, eu senti que aquele abraço era bom demais… e percebi que era exatamente ali que eu sempre quero estar.',
    ],
  },
  {
    data: '07 de março de 2026',
    titulo: 'Nosso primeiro beijo',
    icon: '🌹',
    paras: [
      'Foi a noite em que conversei com seus pais. Eles fizeram uma torta de frango que estava simplesmente maravilhosa - com certeza uma das melhores que já comi na vida.',
      'Tivemos uma conversa muito boa, e naquele momento eles nos autorizaram a namorar de verdade. Foi um momento muito especial para mim. E foi também nesse dia que demos o nosso primeiro beijo.',
      'Depois fomos ao aniversário do Wagner. Fomos recebidos ao som de "Aquilo que Parecia Impossível" - aquilo deixou a noite ainda mais marcante.',
      'Nesse dia também te entreguei seus presentes de Dia das Mulheres: um livro, dois girassóis, um porta-retrato com nossa foto favorita do pedido, fotos reveladas e polaroides para a capinha do celular.',
    ],
  },
  {
    data: '08 de março de 2026',
    titulo: 'Você conheceu meus pais',
    icon: '👨‍👩‍👧',
    paras: [
      'Fomos ao shopping às 12h, comemos batata recheada, vimos livros na livraria, a loja de itens coreanos, tomamos sorvete… foi um momento incrível contigo.',
      'Meus pais te amaram, te acharam muito linda, carismática, e ficaram muito felizes pelo nosso relacionamento.',
      'Na volta, com meu pai dirigindo, fiquei arrumando seu cabelo, dando apoio com o braço para você descansar e fazendo carinho… Cada momento foi marcante.',
    ],
  },
  {
    data: '09 de março de 2026',
    titulo: 'Um cuidado simples ❤️',
    icon: '🍫',
    paras: [
      'No domingo à noite você começou a sentir uma dorzinha. Na segunda, comentou que estava incomodando bastante, mas estava com vergonha de me dizer o que era.',
      'Quando você falou isso, eu já imaginei e perguntei se poderia passar aí depois do serviço, só pra te ver um pouquinho.',
      'Passei rapidinho: levei uma caixinha de bombom, ficamos conversando, abracei você, dei alguns beijinhos e fiz carinho. Você disse que foi um momento muito feliz e que te ajudou a se sentir melhor.',
    ],
  },
  {
    data: '11 de março de 2026',
    titulo: 'Nossa primeira Santa Ceia juntos',
    icon: '✝️',
    paras: [
      'Tivemos um alinhamento com todos os ministérios da igreja e, durante o encontro, aconteceu também a Santa Ceia. Sem ter sido algo planejado, acabou sendo a primeira Santa Ceia que participamos juntos.',
      'Durante o dia eu estava preocupado pensando em como te levar, pois estava chovendo o dia inteiro. No fim, seu pai nos deu um voto de confiança e deixou irmos normalmente - o que tornou tudo ainda mais especial.',
      'Poder estar ali com você, participando de um momento tão importante na presença de Deus, marcou muito o meu coração.',
      'E teve também uma "briguinha" porque eu não deixei você abrir a porta do carro - eu queria abrir para você. Saí todo animado para abrir a porta e segurar sua mão quando você desceu. Foi um gesto pequeno, mas cuidar de você assim me deixa muito feliz. ❤️',
    ],
  },
  {
    data: '14 de março de 2026',
    titulo: 'Nossa primeira cafeteria ☕',
    icon: '☕',
    paras: [
      'Fui te buscar de carro num sábado à tarde, do jeito que eu gosto, estar com você, te levar e cuidar de você. E ainda foi a nossa primeira vez indo juntos numa cafeteria.',
      'Passamos um pouco de frio por causa do ar-condicionado gelado kkk, mas até isso acabou sendo bom pra ficar mais pertinho. Tomamos cappuccino, dividimos um pão com manteiga na chapa e um pão com requeijão e bacon na chapa também. Pra fechar, uma panqueca de Nutella com morango que tava boa demais.',
      'Depois, fomos pra praça da igreja e ficamos num banquinho, abraçados, conversando, fazendo carinho e rindo juntos. Foi daqueles momentos simples, mas que fazem tudo valer a pena.',
      'Na volta, ainda passamos no The Best Açaí e montamos um copo pra Duda. Quando fomos entregar, ela ficou tímida, mas depois você me contou que ela gostou muito e agradeceu. Achei isso muito bonitinho.',
    ],
  },
  {
    data: '15 de março de 2026',
    titulo: 'Nosso primeiro pós-culto 🙏',
    icon: '✝️',
    paras: [
      'Foi um culto muito abençoado. E foi a primeira vez que fui buscar você e a Duda de carro para irmos juntos à igreja. Quando cheguei na sua casa, você me deu um presente lindo, feito completamente a mão - um livrinho feito a mão que se vira página por página, cheio de mensagens fofas, com desenhos seus em cada parte... E dentro ainda tinha uma carta enorme que abria em sanfona, palavra por palavra escrita com tanto amor. Li cada trecho com um carinho imenso, e fiquei tão feliz - porque dinheiro nenhum no mundo compra um presente assim. Tão perfeito, tão detalhado, tão você. Só de lembrar daquele momento eu me emociono. Guardei cada detalhe no coração.',
      'Tivemos a Santa Ceia, e dessa vez conseguimos trocar o pão e o suco direitinho, sem ninguém atrapalhar kkk.',
      'O culto terminou um pouco mais tarde, você avisou seus pais e então tivemos nosso primeiro pós-culto juntos: eu, você e nossa chaveirinho kkkkk. Fomos no Tips perto da igreja, escolhemos nossos lanches e pedimos juntos, e ficamos lá comendo, conversando e rindo muito juntos.',
      'Foi especial de um jeito único - o primeiro de muitos pós-cultos!',
    ],
  },
  {
    data: '22 de março de 2026',
    titulo: 'Um dia cheio de graça',
    icon: '🙏',
    paras: [
      'O dia começou de forma especial: passamos praticamente o dia todo na casa dos seus avós, num almoço que foi muito divertido, engraçado e cheio de alegria. Comida boa, boas risadas, exatamente o tipo de dia que faz tudo valer a pena.',
      'No culto, teve uma mensagem que te marcou muito... Percebi que você estava quase chorando, abalada por dentro. Te abracei e oramos juntos ali mesmo - foi um momento lindo e muito real entre nós.',
      'No final do culto, tivemos uma conversa com o pastor: explicamos como o nosso relacionamento começou, e ele orou e abençoou o que estamos construindo juntos. Sentir essa aprovação e cobertura espiritual foi algo que ficou gravado no meu coração.',
      'Depois fomos ao The Best Açaí com as duas chaveirinhas - Amanda e Duda. As duas ficaram bem amigas nesse dia, e foi tão gostoso ver isso acontecer. Tomamos açaí, nos divertimos muito, e foi daqueles momentos simples que guardam um calor especial.',
      'Na volta, percebi você bem preocupada... Você preferiu conversar comigo pelo WhatsApp depois, e fiz o possível pra te consolar. A preocupação era sobre o tempo, a sensação de não estar dando conta de tudo. Fico feliz por poder estar do seu lado mesmo nessas horas - e por você confiar em mim com o que sente.',
    ],
  },
  {
    data: '28 de março de 2026',
    titulo: 'Um dia de primeiras vezes',
    icon: '🏠',
    paras: [
      'Hoje foi um dia muito especial, cheio de primeiras vezes e momentos simples que acabaram se tornando inesquecíveis.',
      'Foi a primeira vez que você veio na minha casa. A gente tomou um café da tarde com meus pais, conversou, riu… aquele clima leve, gostoso, que dá uma sensação boa só de lembrar. E ainda trouxemos a Duda pra ficar brincando com a Amanda, o que deixou tudo ainda mais divertido.',
      'Mais tarde, fomos visitar o culto de jovens da IPI, da Naomi. Não foi só uma visita… foi daqueles momentos que marcam por dentro.',
      'A palavra foi em Isaías 59:1-4, e falava sobre como nada pode nos separar do amor de Deus, a não ser o pecado. Foi forte ouvir e lembrar que Deus continua o mesmo, que a mão dEle não está encolhida e que Ele sempre ouve nosso clamor… mas que o pecado pode, sim, nos afastar da presença dEle.',
      'Falou também sobre o que é o pecado - tudo aquilo que fazemos ou deixamos de fazer que entristece o coração de Deus. E mesmo sabendo o que é certo, muitas vezes a gente escolhe errado. Mas também trouxe algo muito importante: sempre existe o caminho de volta.',
      'Arrependimento de verdade, reconhecer que precisamos dEle, e voltar pra presença… porque é lá que a gente encontra tudo. Foi um culto que mexeu muito comigo. Senti Deus tocando meu coração de uma forma muito real.',
      'Depois disso, fomos comer pastel… e foi um momento leve depois de algo tão profundo. Eu pedi de frango com queijo e você de palmito com queijo. Foi engraçado (e fofo) ver você queimando a boca no pastel no começo, mesmo tentando disfarçar depois kkkkk.',
      'No final, a gente até aprendeu uma lição: pastel de palmito com queijo pode ser meio enjoativo mesmo 😅',
      'Foi um dia completo. Começou leve, ficou profundo, terminou divertido… e tudo isso ao seu lado.',
    ],
  },
  {
    data: '29 de março de 2026',
    titulo: 'Nossa primeira viagem com a família',
    icon: '🌊',
    paras: [
      'Hoje foi um daqueles dias que a gente sabe, no fundo, que vai guardar pra sempre.',
      'E o mais louco é que tudo aconteceu do nada. Por volta das 11:00 você me mandou mensagem avisando que iam viajar e perguntou se eu queria ir também. Falei que ia ver com meus pais, resolvi tudo rápido, e quando vi já estava aí às 12:00, pronto pra ir. Sem pensar muito… e, com certeza, foi a melhor decisão que eu tomei hoje.',
      'Foi a nossa primeira viagem juntos com a sua família. Estavam seus pais, a Valentina, seu tio e seus avós em um carro… e no outro, eu, você e a Duda. Só isso já fazia tudo parecer especial, mas o dia conseguiu ser ainda mais.',
      'Passamos a tarde na represa de Sandovalina, e foi simplesmente incrível. Teve risada, teve vôlei, teve aqueles momentos simples que, quando é com a pessoa certa, viram tudo.',
      'Mas, sem dúvida, uma das partes mais bonitas do dia foi lá na água… quando você ganhou seus giros de princesa. Pode parecer algo pequeno pra quem vê de fora, mas pra mim foi um daqueles momentos que ficam marcados. Ver seu sorriso, leve, feliz, sendo você… é o tipo de coisa que faz tudo valer a pena.',
      'À noite rolou nosso primeiro pós-culto com a turma toda: fomos na Pizzadoro comer porção de frango, peixe, arroz, vinagrete e o resto que a mesa pediu. Simples, gostoso, com todo mundo junto.',
      'Foi um dia leve, divertido, cheio de vida… e que com certeza merece um espaço especial na nossa história.',
      'Um dia simples, inesperado… mas perfeito do jeito que tinha que ser: com você.',
    ],
  },
  {
    data: '03 de abril de 2026',
    titulo: 'Nosso primeiro cinema juntos <3',
    icon: '🎬',
    paras: [
      'Hoje foi um daqueles dias que dá vontade de guardar pra sempre 🤍',
      'Comecei te buscando às 14:00, e já ali o coração tava feliz só de te ver. Te entreguei seus presentinhos de Páscoa e também do nosso primeiro mês-versário (mesmo sendo no dia seguinte hehe). Preparei tudo com carinho: uma cestinha com ursinho de pelúcia, flores artificiais pra durarem bastante (igual o que eu quero com a gente), chocolates, um chaveiro combinando com nossas iniciais e a data do nosso começo… e claro, um ovo de Páscoa 🍫',
      'Depois ficamos um tempinho na praça da entrada da cidade, conversando e curtindo aquele momento tranquilo juntos. Lá pelas 15:00 fomos pro Prudenshopping, onde andamos bastante, passamos no Carrefour e tomamos uma casquinha mista 🍦',
      'Mais tarde, às 16:30, fomos pegar pipoca e refri pra viver um momento especial: nosso primeiro cinema juntos 🎬 Assistimos Super Mario Galaxy com a família da Talita e da Kelli também por lá, o que deixou tudo ainda mais leve e divertido.',
      'Depois do filme, demos mais uma voltinha (já que o Carrefour era praticamente a única loja aberta por conta do feriado), e então voltamos pra Pirapó. O combinado inicial era você estar em casa às 21:30, mas conversando com sua mãe ela autorizou a gente ficar até as 23:00 - com uma condição especial: levar um lanche de 30cm do Subway pra ela kkkkk.',
      'Pra fechar o dia, ficamos na praça do centro conversando com a turma, comendo um churros e aproveitando cada segundo.',
      'Foi um dia simples, mas ao mesmo tempo incrível… cheio de risadas, carinho e momentos que fizeram tudo valer a pena. 🤍',
    ],
  },
  {
    data: '04 de abril de 2026',
    titulo: 'Nosso primeiro mês juntos 🤍',
    icon: '🤍',
    paras: [
      'Hoje foi um dia especial… nosso primeiro mês juntos. E, mais uma vez, eu só consigo começar agradecendo a Deus por tudo que a gente viveu hoje - pelas coisas boas, pelos aprendizados e até pelos momentos mais difíceis, que também fizeram parte do nosso crescimento.',
      'O dia começou comigo te buscando às 9:00 pra gente fazer nosso piquenique na praça da entrada da cidade. Já ali começaram nossos "imprevistos" kkkkk… eu esqueci o perfume que a gente tinha combinado de usar no ursinho pra ficar com meu cheiro, e quando estávamos chegando você percebeu que tinha esquecido a aliança.',
      'Voltamos pra sua casa pra buscar, e naquele momento eu vi que você ficou mal… ainda mais com a reação da sua mãe. Mas ali, conversando com você, eu só queria que você entendesse uma coisa: a aliança nunca foi sobre algo físico. Ela é um símbolo, mas o mais importante é o que a gente carrega no coração - nosso compromisso, nossa promessa e aquilo que a gente tem diante de Deus. E se alguém "poderia" ficar chateado com isso, seria eu… mas eu não estava. Ver seu sorriso depois disso aqueceu muito meu coração 🤍',
      'Depois voltamos e montamos nosso piquenique. E mais uma vez, o Davi aqui deu seus jeitos kkkkk… na hora de fazer o chá, eu simplesmente trouxe a erva errada (pra coar, em vez de sachê). Resultado: fui correndo no restaurante ali perto buscar uma coca de 1 litro pra salvar nosso momento 😂 Mesmo assim, deu tudo certo. Comemos nosso pão de brioche com alface, tomate, presunto e queijo, e aproveitamos aquele tempinho juntos.',
      'E então veio um dos momentos mais especiais do meu dia… o presente que você me deu. A "Bíblia carregada". Sério… eu nunca recebi algo tão significativo na minha vida. Uma Bíblia personalizada, com a nossa foto, com versículos marcados, com intenção, com cuidado… com amor. Mesmo você achando que não estava "pronta", pra mim ela já era perfeita.',
      'E o nosso combinado de você "carregar" ela durante a semana, e a gente trocar antes e depois dos cultos… isso é simplesmente lindo. Porque mostra que o nosso relacionamento não é só sobre a gente, é sobre Deus no centro de tudo. E o momento que tivemos ali, compartilhando a Palavra um com o outro, foi único.',
      'Também tivemos um momento mais delicado… mas que, ao mesmo tempo, mostrou muito sobre quem a gente é e quem queremos ser. A gente percebeu, a tempo, e escolheu fazer o certo. E mais do que isso, escolhemos a verdade. Quando você me perguntou se devia contar ou não, pra mim ficou muito claro: tudo que é escondido pode gerar uma quebra muito maior lá na frente. E o nosso relacionamento não foi feito pra ser baseado em medo, mas em verdade, respeito e transparência.',
      'Eu fiquei muito preocupado naquele momento… mas ali também aconteceu algo muito especial: foi a primeira vez que a gente se consolou pessoalmente. E isso me marcou muito. Porque mostrou que, mesmo nas dificuldades, a gente cuida um do outro, se apoia e permanece junto.',
      'Hoje não foi um dia "perfeito"… mas foi real. E talvez seja exatamente isso que torna tudo tão especial. Porque não é sobre viver só momentos bons, mas sobre viver tudo juntos, com Deus no centro, aprendendo, crescendo e se fortalecendo a cada dia.',
      'Obrigado por esse primeiro mês. Obrigado por ser quem você é. E obrigado, Deus, por me permitir viver tudo isso com você 🤍',
    ],
  },
  {
    data: '06 de abril de 2026',
    titulo: 'Nosso propósito de crescimento espiritual',
    icon: '📖',
    paras: [
      'Nesse dia, começamos um propósito espiritual juntos: uma decisão intencional de crescer com Deus em parceria, fortalecendo nossa fé individual e o nosso relacionamento ao mesmo tempo.',
      'Assumimos isso como uma aliança espiritual, não apenas emocional. Nosso objetivo ficou claro: viver o namoro com Deus no centro, com fundamento e direção.',
      'Definimos um propósito de 40 dias (06/04/2026 a 15/05/2026), com devocional em conjunto, jejum aos sábados e domingos (das 7h às 9h), oração diária às 3h da madrugada e gratidão no fim de cada dia.',
      'Também colocamos nossos temas de oração: intimidade com Deus, comunhão entre nós, santidade, futuro, propósito, princípios, constância, blindagem espiritual, cura de feridas e cuidado um com o outro.',
      'E deixamos dois combinados no coração: se falharmos em algum dia, recomeçamos no dia seguinte; e isso não seria só por 40 dias, mas o começo de um estilo de vida com Deus no centro.',
    ],
  },
  {
    data: '09 de abril de 2026',
    titulo: 'Quando a voz virou lar',
    icon: '📞',
    paras: [
      'Nesse dia, você tava um pouco preocupada… e o nosso boa noite foi diferente. Em vez de mensagem, a gente ficou em ligação, ouvindo a voz um do outro.',
      'Foi simples, mas teve algo especial ali. A calma veio, o carinho ficou… e sem perceber, a partir desse dia, nossos boa noites nunca mais foram só digitados. Viraram rotina em ligação, deixando tudo ainda mais próximo, mais nosso.',
    ],
  },
  {
    data: '10–12 de abril de 2026',
    titulo: 'Quando a gente escolheu confiar',
    icon: '🤝',
    paras: [
      'Nesses dias, a gente deu um passo importante.',
      'Na madrugada de quinta pra sexta, tivemos nossa ligação mais longa até então… 2h e meia juntos, até 03:09. Foi um momento intenso, meio difícil no começo, mas necessário. Mesmo com medo e inseguranças, a gente não correu - a gente ficou.',
      'E na madrugada de sábado pro domingo, fomos ainda mais longe… até quase 5h da manhã, abrindo nossos passados, nossas dores, e principalmente, nossa vontade de fazer dar certo.',
      'Ali, a gente não só se conheceu melhor… a gente começou a se cuidar de verdade. Fortalecendo algo que já tava nascendo forte: nós.',
    ],
  },
  {
    data: '12 de abril de 2026',
    titulo: 'Nosso primeiro pós-culto com seus pais',
    icon: '🍕',
    paras: [
      'Depois do culto, tivemos nosso primeiro momento juntos com seus pais… e foi leve do jeitinho que tinha que ser. A gente saiu, foi na pizzaria, riu bastante e aproveitou cada segundo.',
      'Teve pizza de catufrango, pizzadoro… mas o melhor mesmo foi o clima. Sua irmã caçula mais preocupada em brincar no pula-pula do que comer deixou tudo ainda mais engraçado e especial.',
      'Foi uma noite simples, mas muito boa. Daquelas que aquecem o coração sem esforço.',
      'E pra melhorar, ainda ganhamos uns minutinhos a mais juntos… era pra você estar em casa 22:30, mas ficamos até 23:05 hehe. Pequenos detalhes que fizeram tudo ficar ainda mais especial.',
    ],
  },
  {
    data: '20 de abril de 2026',
    titulo: 'Nosso primeiro filminho juntos em casa',
    icon: '🤍',
    paras: [
      'Assistimos Como Eu Era Antes de Você, com pipoca de microondas, refri, fini… e um brigadeiro simplesmente absurdo de bom que você fez (e que eu, claro, dei um sumiço em metade em 2 segundos 😅).',
      'O filme foi lindo… só aquele final que pegou pesado né kkkkk, mas mesmo assim ficou ainda mais especial por ser com você.',
      'Enquanto isso, nossas irmãs fazendo festa do pijama, deixando tudo ainda mais leve e cheio de alegria.',
      'Foi simples, foi tranquilo… mas foi perfeito. Filminho de romance com o meu amor, com beijinhos e comidinha gostosa - do jeitinho que eu gosto, do jeitinho que a gente é. 🤍',
    ],
  },
  {
    data: '01 de maio de 2026',
    titulo: 'Nosso 2º mêsversário 🤍',
    icon: '💍',
    paras: [
      'Nosso segundo mês completaria no dia 04 de maio, mas resolvemos comemorar na sexta-feira, dia 01 - adiantamos três dias pra não esperar até segunda. E foi a melhor decisão.',
      'Começamos na praça da entrada da cidade, onde fizemos a troca dos presentes. Ali a gente parou, conversou, respirou junto… foi um desses momentos simples que carregam muito peso.',
      'Eu te entreguei uma caixinha cheia de significado: flores, uma cartinha escrita a mão - a minha primeira - um monte de docinhos e, no fundo de tudo, o seu anel solitário. Uma promessa real de que você é única, e que eu te escolho todos os dias.',
      'Você me deu um presente que eu jamais vou esquecer: uma cartinha cheia de amor e um potinho cheio de beijinhos seus, marcados em papéis com mensagens fofas. Simples, cuidadoso, completamente você - eu amei cada detalhe.',
      'Depois fomos até a avenida comer tapioca, ainda naquele clima leve de quem acabou de trocar algo tão especial. Eu ainda passei e comprei uns docinhos pra você, porque você merece.',
      'Fechamos o dia na praça, no canteiro central da avenida - só a gente, o fim de tarde e tudo aquilo que a gente já construiu em dois meses.',
      'Dois meses que parecem muito mais pelo que a gente já viveu. E esse anel no seu dedo é só o começo de tudo que ainda vem por aí. 🤍',
    ],
  },
  {
    data: '07 de maio de 2026',
    titulo: 'Seu primeiro aniversário ao meu lado 🎂',
    icon: '🎂',
    paras: [
      'Seu primeiro aniversário sendo meu - e o primeiro que eu vivi sendo seu. Um dia que eu esperei com o coração cheio, querendo que cada minuto te lembrasse o quanto você é amada.',
      'Tudo começou às 00:00 em ponto. Assim que o relógio virou, eu te mandei um textinho de aniversário escrito do jeitinho que eu sentia naquele momento - e fiz um story só pra você, pro mundo inteiro saber que aquele dia tinha dona. Eu queria ser o primeiro a te dizer parabéns. Eu queria que você dormisse já sabendo o quanto é especial pra mim.',
      'De manhã, ainda meio sonolento, recebi sua mensagem aflita: você ia perder o ônibus pra escola. Não pensei duas vezes - me arrumei em 5 minutos (literalmente), peguei o carro e te avisei que já estava saindo pra te buscar. Te levei pra escola, ganhamos um tempinho só nosso no caminho, e por mais corrido que tenha sido, foi um dos pedacinhos mais bonitos do dia. Cuidar de você no seu aniversário, mesmo nas coisas pequenas, foi um privilégio que eu não trocaria por nada.',
      'À noite, antes do culto, chegou o momento que eu vinha guardando. Te entreguei seus presentes, um por um, vendo seu rosto se iluminar em cada caixinha. O primeiro: um colar com a frase "Para minha futura esposa" - porque eu não queria que ele fosse só uma joia, queria que ele fosse uma promessa. Pra você usar perto do peito e lembrar que o meu sim já tá decidido há muito tempo. Em seguida, um par de brincos delicados e um colar menorzinho que combina com o primeiro - dois caminhando juntos, igual a gente.',
      'E ainda tinha mais: o presente da minha mãe pra você. Aquele cuidado que vai além de mim - uma família inteira escolhendo te receber, te celebrar, te chamar de nossa. Eu sei o quanto isso te marcou, e me marcou ainda mais ver você sendo amada por quem eu amo.',
      'Fomos pro culto juntos, e ali, na presença de Deus, eu agradeci por mais um ano da sua vida e pela graça de poder estar do seu lado nesse. Não tem presente material que se compare a isso - poder orar por você no dia em que Deus te trouxe ao mundo é algo que eu vou guardar pra sempre.',
      'E quando o dia já parecia perfeito, ele ainda nos deu o melhor pra última hora: nossa primeira ligação de vídeo. A primeira de todas. Você foi me mostrando seu quartinho enquanto arrumava as coisas, depois foi comer alguma coisa, trocou de roupa, foi se ajeitando pra dormir...',
      'A gente acabou dormindo em ligação - eu apaguei primeiro kkkkk, e você desligou depois, com aquele cuidado que só você tem. Foi simples e foi gigante ao mesmo tempo. Porque "boa noite" deixou de ser distância naquele dia: virou presença, virou colo, virou a sensação de que a gente nunca mais ia dormir sozinho de verdade.',
      'Foi o seu primeiro aniversário comigo, mas no meu coração foi como se já fizesse tempo. E que venham todos os outros - cada 7 de maio, eu quero ser o primeiro a te abraçar, o primeiro a te dizer parabéns, o primeiro a te lembrar do quanto você é amada por mim e por Deus. 🤍',
    ],
  },
]


// ─── Framer Motion variants ────────────────────────────────
export const staggerV = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}
export const upV = {
  hidden: { opacity: 0, y: 38 },
  show: { opacity: 1, y: 0, transition: { duration: 0.52, ease: [0.25, 0.1, 0.25, 1] } },
}
export const scaleV = {
  hidden: { opacity: 0, scale: 0.80 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.52, ease: [0.34, 1.56, 0.64, 1] } },
}
export const fadeV = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5 } },
}
