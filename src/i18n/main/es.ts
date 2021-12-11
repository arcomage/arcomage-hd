export const i18n = {
  tower: 'torre',
  wall: 'muro',
  resource: 'recurso',

  brick: 'ladrillo',
  bricks: 'ladrillos',
  gem: 'gema',
  gems: 'gemas',
  recruit: 'miembro',
  recruits: 'miembros',

  quarry: 'cantera', // i.e. brick production
  magic: 'magia', // i.e. gem production
  dungeon: 'mazmorra', // i.e. recruit production

  'Your %s': 'Tu %s', // Your quarry/tower
  "Opponent's %s": '%s del adversario', // Opponent's quarry/tower

  '1 brick': '1 ladrillo',
  '%s bricks': '%s ladrillos', // 3 bricks
  '1 gem': '1 gema',
  '%s gems': '%s gemas', // 3 gems
  '1 recruit': '1 miembro',
  '%s recruits': '%s miembros', // 3 recruits

  'This card costs %s': 'Esta carta cuesta %s', // This card costs 3 bricks

  // %ss = 'brick', %sp = 'bricks'
  'Your %sp': 'Tus %sp', // Your bricks
  "Opponent's %sp": '%sp del adversario', // Opponent's bricks

  '%s1. Reach %s2 to win': '%s1. Llega a %s2 para ganar', // Your tower/bricks/gems/recruits. Reach 100 to win

  // %s = 'quarry', %ss = 'brick', %sp = 'bricks'
  '%s (%ss production)': '%s (producción de %sp)', // quarry (brick production)

  discarded: 'descartado',
  'Discard a card': 'Descartar una carta',

  'You Win!': '¡Tú ganas!',
  'You Lose!': '¡Tú pierdes!',
  'Tie Game': 'Juego empatado',

  Preferences: 'Preferencias',
  ': ': ': ',
  'Your Name': 'Tu nombre',
  "Opponent's Name": 'Nombre del oponente',

  'Choose a Tavern (Preset Preferences)':
    'Elige una taberna (Preferencias preestablecidas)',
  'Castle in Enroth': 'Castillo en Enroth',
  Antagarich: 'Antagarich',
  Jadame: 'Jadame',
  Default: 'Por defecto',
  Customized: 'Personalizado',

  'Starting Conditions': 'Condiciones de inicio',
  'Victory Conditions': 'Condiciones de victoria',
  'Other Preferences': 'Otras Preferencias',
  'Cards in Hand': 'Cartas en la mano',

  'AI Level': 'Nivel de IA',
  Genius: 'Genio',
  Smart: 'Inteligente',
  Mediocre: 'Mediocre',
  Stupid: 'Estúpido',
  Idiotic: 'Idiota',

  Multiplayer: 'Multijugador',
  off: 'desactivado',
  on: 'habilitado',
  'Your ID': 'Tu ID',
  "Enter your opponent's ID": 'Introduce el ID de tu oponente',
  Connect: 'Conectar',
  'Copied 📋✅': 'Copiado 📋✅',

  'Connecting to the network ⌛': 'Conectando a la red ⌛',
  'Connected to the network (but not to anyone) 🟡':
    'Conectado a la red (pero no a nadie) 🟡',
  'Connecting to ID %s ⌛': 'Conectando a ID %s ⌛',
  "Connected to ID %s ✅ You're the host 🏠":
    'Conectado a ID %s ✅ Eres el anfitrión 🏠',
  "Connected by ID %s ✅ You're the guest 💼":
    'Conectado por ID %s ✅ Eres el invitado 💼',
  'Connection failed ❌': 'Conexión fallida ❌',
  'Disconnected 🔌': 'Desconectado 🔌',
  'You are playing against computer AI':
    'Estás jugando contra la IA del ordenador',
  'You are playing against human': 'Juegas contra un humano',

  'You and your opponent are disconnected. Please go to "Preferences" and start a new game.':
    'Usted y su oponente están desconectados. Por favor, vaya a "Preferencias" y comience una nuevo juego.',

  'Multiplayer Mode is experimental and works only for users behind non-symmetric NAT':
    'El modo multijugador es experimental y sólo funciona para usuarios detrás de un NAT no simétrico',

  Reset: 'Reiniciar',
  'Apply & New Game': 'Aplicar y Nuevo Juego',
  Cancel: 'Cancelar',

  Language: 'Idioma',

  'Sound & Graphics': 'Sonido y Gráficos',
  Sound: 'Sonido',
  Volume: 'Volumen',
  Mute: 'Silenciar',
  'Stereo Sound': 'Sonido Estéreo',
  Graphics: 'Gráficos',
  Pixelation: 'Pixelación',
  'Visual Preset': 'Preajuste visual',
  'Filter may slow down the game': 'El filtro puede ralentizar el juego',

  Normal: 'Normal',
  Vibrant: 'Vibrante',
  Gray: 'Gris',
  Nostalgia: 'Nostalgia',
  Bright: 'Brillante',
  Dark: 'Oscuro',

  Brightness: 'Luminosidad',
  Contrast: 'Contraste',
  Grayscale: 'Escala de grises',
  Sepia: 'Sepia',
  Saturate: 'Saturar',
  Hue: 'Tono',
  Invert: 'Invertir',
  Opacity: 'Opacidad',

  Twist: 'Giro',
  Grain: 'Grano',

  Filters: 'Filtros',

  Help: 'Ayuda',
  'Toggle Full Screen': 'Activar la pantalla completa',

  ERATHIAN: 'Usar Erathian [%s] (sólo lenguas de escritura latina)',

  'ArcoMage HD': 'ArcoMage HD',

  DESC: 'Clon HD web gratuito y de código abierto del juego de cartas Arcomage de 3DO y NWC del año 2000',

  'Please go to %s to view more information (including %s1), star the repo and follow %s2 there.':
    'Por favor, vaya a %s para ver más información (incluyendo %s1), inicie el repo y siga a %s2 allí.',

  'the GitHub project page': 'la página del proyecto en GitHub',

  'an informative tutorial image in English':
    'una imagen tutorial informativa en inglés',

  'Game rules': 'Reglas del juego',

  GAMERULES: `Las condiciones de victoria varían según la posada. Para ganar hay que construir una torre, destruir la del adversario o reunir recursos suficientes antes que el adversario.
Los números grandes amarillos de la columna son los generadores. Indican el número de unidades nuevas de un recurso en particular que recibirás en el próximo turno. Los números pequeños negros de la columna son los recursos. Indica el número de unidades que puedes gastar en el turno actual.
Cartas: Cada una cuesta un número de recursos, que se indica con un círculo pequeño en la esquina inferior derecha de la carta. El coste se restará de tus recursos según el color de la carta. Al hacer clic con el botón izquierdo se juega la carta. Al hacer clic con el botón derecho se descarta y no se juega.
El rojo representa el Generador de Cantera, que produce los recursos de Ladrillos; el azul representa el Generador de Magia, que produce los recursos de Gemas; el verde representa el Generador Zoológico, que produce los recursos de Bestias.`,

  'With no usable or discardable card, your opponent has surrendered':
    'Sin carta utilizable o descartable, tu oponente se ha rendido',
  'With no usable or discardable card, you have surrendered':
    'Sin carta utilizable o descartable, te has rendido',

  'Please rotate your device to landscape mode':
    'Por favor, gire su dispositivo en modo horizontal',
}
