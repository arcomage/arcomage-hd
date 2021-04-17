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

  // %ss = 'brick', %sp = 'bricks'
  'Your %sp': 'Tus %sp', // Your bricks
  "Opponent's %sp": '%sp del adversario', // Opponent's bricks

  // %s = 'quarry', %ss = 'brick', %sp = 'bricks'
  '%s (%ss production)': '%s (producción de %sp)', // quarry (brick production)

  // %ss = 'brick', %sp = 'bricks'
  'This card costs %s': 'Esta carta cuesta %s', // This card costs 3 bricks

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
  Default: 'Por defecto',
  Customized: 'Personalizado',
  'Starting Conditions': 'Condiciones de inicio',
  'Victory Conditions': 'Condiciones de victoria',
  'Other Preferences': 'Otras Preferencias',
  'Cards in Hand': 'Cartas en la mano',
  'AI Type': 'Tipo de IA',

  Multiplayer: 'Multijugador',
  off: 'desactivado',
  on: 'habilitado',
  'Your ID': 'Tu ID',
  "Enter your opponent's ID": 'Introduce el ID de tu oponente',
  Connect: 'Conectar',
  'Copied 📋✔️': 'Copiado 📋✔️',

  'Connecting to the network ⌛': 'Connecting to the network ⌛',
  'Connected to the network (but not to anyone) ✔️':
    'Connected to the network (but not to anyone) ✔️',
  'Connecting to ID %s ⌛': 'Connecting to ID %s ⌛',
  "Connected to ID %s ✔️ You're the host 🏠":
    "Connected to ID %s ✔️ You're the host 🏠",
  "Connected by ID %s ✔️ You're the guest 💼":
    "Connected by ID %s ✔️ You're the guest 💼",
  'Connection failed ❌': 'Conexión fallida ❌',
  'Disconnected 🔌': 'Desconectado 🔌',
  'You are playing against computer AI': 'Estás jugando contra la IA del ordenador',
  'You are playing against human': 'Juegas contra un humano',

  'Your opponent is disconnected. The current game will continue and your opponent will be replaced by computer AI.':
    'Su oponente está desconectado. La partida actual continuará y tu oponente será reemplazado por la IA del ordenador.',

  Reset: 'Reiniciar',
  'Apply & New Game': 'Aplicar y Nuevo Juego',
  Cancel: 'Cancelar',

  Language: 'Idioma',
  Volume: 'Volumen',
  Mute: 'Silenciar',
  Help: 'Ayuda',
  'Toggle Full Screen': 'Activar la pantalla completa',

  ERATHIAN: 'Usar Erathian [%s] (sólo para letras latinas)',

  'ArcoMage HD': 'ArcoMage HD',

  DESC:
    'Clon HD de código abierto basado en la web del juego de cartas Arcomage de 3DO y NWC del año 2000',

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
