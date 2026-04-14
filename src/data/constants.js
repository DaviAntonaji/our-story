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
]

export const FOTOS = [
  '/imgs/photos/1.jpg', '/imgs/photos/2.jpg', '/imgs/photos/3.jpg',
  '/imgs/photos/4.jpg', '/imgs/photos/5.jpg', '/imgs/photos/6.jpg',
  '/imgs/photos/7.jpg', '/imgs/photos/8.jpg', '/imgs/photos/9.jpg',
  '/imgs/photos/10.jpeg', '/imgs/photos/11.jpeg', '/imgs/photos/12.jpeg',
  '/imgs/photos/13.jpeg', '/imgs/photos/14.jpg', '/imgs/photos/15.jpg',
  '/imgs/photos/16.jpg', '/imgs/photos/17.jpg', '/imgs/photos/18.jpg',
  '/imgs/photos/19.jpg', '/imgs/photos/20.jpg', '/imgs/photos/21.jpg', '/imgs/photos/22.jpg',
  '/imgs/photos/23.jpg', '/imgs/photos/24.jpg', '/imgs/photos/25.jpg', '/imgs/photos/26.jpg',
  '/imgs/photos/27.jpg', '/imgs/photos/28.jpg', '/imgs/photos/29.jpg', '/imgs/photos/30.jpg',
  '/imgs/photos/31.jpg', '/imgs/photos/32.jpg', '/imgs/photos/33.jpg', "/imgs/photos/34.jpg",
  '/imgs/photos/35.jpg', '/imgs/photos/36.jpg', '/imgs/photos/37.jpg', "/imgs/photos/38.jpg",
  '/imgs/photos/39.jpg', '/imgs/photos/40.jpg', '/imgs/photos/41.jpg', "/imgs/photos/42.jpg",
  '/imgs/photos/43.jpg', '/imgs/photos/44.jpg', '/imgs/photos/45.jpg', '/imgs/photos/46.jpg',
  '/imgs/photos/47.jpg', '/imgs/photos/48.jpg', '/imgs/photos/49.jpg',
  '/imgs/photos/50.jpg', '/imgs/photos/51.jpg', '/imgs/photos/52.jpg', '/imgs/photos/53.jpg',
  '/imgs/photos/54.jpg', '/imgs/photos/55.jpg', '/imgs/photos/56.jpg', '/imgs/photos/57.jpg',
  '/imgs/photos/58.jpg'
]

export const SLIDE_IDS = [
  'intro', 'timer', 'musica', 'carta', 'tags',
  'versiculo', 'momentos',
  'historia',
  'promessas', 'futuro', 'recado', 'final',
]

/** Emoji de ambiente por slide (mesma ordem que SLIDE_IDS). glow = bruma na cor do gradiente do fundo. */
export const SLIDE_AMBIENCE = [
  { emoji: '🌹', glow: 'rgba(251, 113, 133, 0.42)' },
  { emoji: '⏳', glow: 'rgba(212, 175, 55, 0.38)' },
  { emoji: '🎵', glow: 'rgba(167, 139, 250, 0.4)' },
  { emoji: '💌', glow: 'rgba(252, 211, 77, 0.38)' },
  { emoji: '✨', glow: 'rgba(244, 114, 182, 0.4)' },
  { emoji: '✝️', glow: 'rgba(129, 140, 248, 0.42)' },
  { emoji: '📸', glow: 'rgba(167, 139, 250, 0.28)' },
  { emoji: '📖', glow: 'rgba(212, 175, 55, 0.36)' },
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
      'Depois do filme, demos mais uma voltinha (já que o Carrefour era praticamente a única loja aberta por conta do feriado), e então voltamos pra Pirapó. Pra fechar o dia, ficamos na praça do centro conversando com a turma, comendo um churros e aproveitando cada segundo.',
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
      'Na madrugada de sexta pra sábado, tivemos nossa ligação mais longa até então… 2h e meia juntos, até 03:09. Foi um momento intenso, meio difícil no começo, mas necessário. Mesmo com medo e inseguranças, a gente não correu - a gente ficou.',
      'E na madrugada seguinte, fomos ainda mais longe… até quase 5h da manhã, abrindo nossos passados, nossas dores, e principalmente, nossa vontade de fazer dar certo.',
      'Ali, a gente não só se conheceu melhor… a gente começou a se cuidar de verdade. Fortalecendo algo que já tava nascendo forte: nós.',
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
