export const i18n = {
  tower: 'torre',
  wall: 'muralha',
  resource: 'recurso',

  brick: 'tijolo',
  bricks: 'tijolos',
  gem: 'gema',
  gems: 'gemas',
  recruit: 'recruta',
  recruits: 'recrutas',

  quarry: 'pedreira', // i.e. brick production
  magic: 'magia', // i.e. gem production
  dungeon: 'masmorra', // i.e. recruit production

  'Your %s': 'Sua %s', // Your quarry/tower
  "Opponent's %s": '%s do oponente', // Opponent's quarry/tower

  '1 brick': '1 tijolo',
  '%s bricks': '%s tijolos', // 3 bricks
  '1 gem': '1 gema',
  '%s gems': '%s gemas', // 3 gems
  '1 recruit': '1 recruta',
  '%s recruits': '%s recrutas', // 3 recruits

  'This card costs %s': 'Essa carta custa %s', // This card costs 3 bricks

  // %ss = 'brick', %sp = 'bricks'
  'Your %sp': 'Seus %sp', // Your bricks
  "Opponent's %sp": '%sp do oponente', // Opponent's bricks

  '%s1. Reach %s2 to win': '%s1. Chegue a %s2 para vencer', // Your tower/bricks/gems/recruits. Reach 100 to win

  // %s = 'quarry', %ss = 'brick', %sp = 'bricks'
  '%s (%ss production)': '%s (produção de %ss)', // quarry (brick production)

  discarded: 'descartado',
  'Discard a card': 'Descartar uma carta',

  'You Win!': 'Você Venceu!',
  'You Lose!': 'Você Perdeu!',
  'Tie Game': 'Empate',

  Preferences: 'Preferências',
  ': ': ': ',
  'Your Name': 'Seu Nome',
  "Opponent's Name": 'Nome do Oponente',
  'Choose a Tavern (Preset Preferences)':
    'Escolha uma Taverna (Preferências Predefinidas)',
  Default: 'Padrão',
  Customized: 'Personalizado',
  'Starting Conditions': 'Condições Iniciais',
  'Victory Conditions': 'Condições de Vitória',
  'Other Preferences': 'Outras Preferências',
  'Cards in Hand': 'Cartas na Mão',

  'AI Type': 'Tipo de IA',
  Genius: 'Genial',
  Smart: 'Inteligente',
  Mediocre: 'Medíocre',
  Stupid: 'Estúpido',
  Idiotic: 'Idiota',

  Multiplayer: 'Multijogador',
  off: 'desligado',
  on: 'ligado',
  'Your ID': 'Seu ID',
  "Enter your opponent's ID": 'Insira o ID de seu oponente',
  Connect: 'Conectar',
  'Copied 📋✔️': 'Copiado 📋✔️',

  'Connecting to the network ⌛': 'Conectando à rede ⌛',
  'Connected to the network (but not to anyone) ✔️':
    'Conectado à rede (mas não à alguém) ✔️',
  'Connecting to ID %s ⌛': 'Conectando ao ID %s ⌛',
  "Connected to ID %s ✔️ You're the host 🏠":
    'Conectado ao ID %s ✔️ Você é o host 🏠',
  "Connected by ID %s ✔️ You're the guest 💼":
    'Conectado pelo ID %s ✔️ Você é o convidado 💼',
  'Connection failed ❌': 'Conexão falhou ❌',
  'Disconnected 🔌': 'Desconectado 🔌',
  'You are playing against computer AI':
    'Você está jogando contra a IA do computador',
  'You are playing against human': 'Você está jogando contra um humano',

  'You and your opponent are disconnected. Please go to "Preferences" and start a new game.':
    'Você e seu oponente estão desconectados. Por favor, vá até "Preferências" e inicie um novo jogo.',

  'Multiplayer Mode is experimental and works only for users behind non-symmetric NAT':
    'O modo Multiplayer é experimental e funciona apenas para usuários por trás de NAT não simétrico',

  Reset: 'Redefinir',
  'Apply & New Game': 'Aplicar & Novo Jogo',
  Cancel: 'Cancelar',

  Language: 'Idioma',

  'Volume & Visual': 'Volume & Visual',
  Volume: 'Volume',
  Mute: 'Mudo',

  Pixelation: 'Pixelação',
  Disable: 'Desativar',

  Help: 'Ajuda',
  'Toggle Full Screen': 'Tela Cheia',

  ERATHIAN: 'Usar Erathian [%s] (apenas para letras latinas)',

  'ArcoMage HD': 'ArcoMage HD',

  DESC: 'Clone HD, baseado em web e de código aberto do jogo de cartas Arcomage, da 3DO e NWC, lançado em 2000.',

  'Please go to %s to view more information (including %s1), star the repo and follow %s2 there.':
    'Por favor, acesse a %s para ver mais informações (incluindo %s1), marcar o repositório com estrela e seguir %s2.',

  'the GitHub project page': 'página do projeto no GitHub',

  'an informative tutorial image in English':
    'uma imagem de tutorial informativa em Inglês',

  'Game rules': 'Regras',

  GAMERULES: `As condições de vitória variam por taverna. Construa sua torre, destrua a torre de seu oponente ou colete recursos suficientes antes que seu oponente o faça.
  Grandes números amarelos nas colunas laterais são as produções. É este o número de novas unidades de um determinado recurso que você receberá na sua próxima vez. Pequenos números pretos nas colunas são os recursos. Este é o número de unidades que você tem disponível para gastar em sua vez atual.
  Cartas: Cada uma tem seu próprio custo para jogar, indicado em um pequeno círculo no canto inferior direito da carta. O custo será deduzido de seus recursos, de acordo com a cor da carta. Clique com o botão esquerdo do mouse em uma carta para jogá-la. Clique com o botão direito do mouse sobre uma carta para descartá-la sem jogar.
  Na coluna lateral, o vermelho representa seu gerador Pedreira, que produz Tijolos, o azul representa seu gerador Mágico que produz Gemas, e o verde representa seu gerador Masmorra, que produz Recrutas.`,

  'With no usable or discardable card, your opponent has surrendered':
    'Sem cartas usáveis ou descartaveis, seu oponente se rendeu',
  'With no usable or discardable card, you have surrendered':
    'Sem cartas usáveis ou descartáveis, você se rendeu',

  'Please rotate your device to landscape mode':
    'Por favor, rotacione seu dispositivo para o modo paisagem',
}
