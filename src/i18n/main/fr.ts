export const i18n = {
  tower: 'tour',
  wall: 'mur',
  resource: 'ressource',

  brick: 'brique',
  bricks: 'briques',
  gem: 'gemme',
  gems: 'gemmes',
  recruit: 'recrue',
  recruits: 'recrues',

  quarry: 'carrière', // i.e. brick production
  magic: 'magie', // i.e. gem production
  dungeon: 'donjon', // i.e. recruit production

  'Your %s': 'Votre %s', // Your quarry/tower
  "Opponent's %s": '%s de l’adversaire', // Opponent's quarry/tower

  '1 brick': '1 brique',
  '%s bricks': '%s briques', // 3 bricks
  '1 gem': '1 gemme',
  '%s gems': '%s gemmes', // 3 gems
  '1 recruit': '1 recrue',
  '%s recruits': '%s recrues', // 3 recruits

  'This card costs %s': 'Cette carte coûte %s', // This card costs 3 bricks

  // %ss = 'brick', %sp = 'bricks'
  'Your %sp': 'Vos %sp', // Your bricks
  "Opponent's %sp": '%sp de l’adversaire', // Opponent's bricks

  '%s1. Reach %s2 to win': '%s1. Atteignez %s2 pour gagner', // Your tower/bricks/gems/recruits. Reach 100 to win

  // %s = 'quarry', %ss = 'brick', %sp = 'bricks'
  '%s (%ss production)': '%s (production de %sp)', // quarry (brick production)

  discarded: 'se défausser',
  'Discard a card': 'Se défausser',

  'You Win!': 'Vous avez gagné',
  'You Lose!': 'Vous avez perdu',
  'Tie Game': 'Match nul',

  Preferences: 'Préférences',
  ': ': '\u00A0: ',
  'Your Name': 'Votre nom',
  "Opponent's Name": 'Nom de l’adversaire',

  'Choose a Tavern (Preset Preferences)':
    'Choisissez une taverne (préférences prédéfinies)',
  'Castle in Enroth': 'Château à Enroth',
  Antagarich: 'Antagarich',
  Jadame: 'Jadame',
  Default: 'Par défaut',
  Customized: 'Personnalisé',

  'Starting Conditions': 'Conditions de départ',
  'Victory Conditions': 'Conditions de victoire',
  'Other Preferences': 'Autres préférences',
  'Cards in Hand': 'Cartes en main',

  'AI Level': 'Niveau d’IA',
  Genius: 'Génial',
  Smart: 'Intelligent',
  Mediocre: 'Médiocre',
  Stupid: 'Stupide',
  Idiotic: 'Idiot',

  Multiplayer: 'Multijoueur',
  off: 'désactivé',
  on: 'activé',
  'Your ID': 'Votre ID',
  "Enter your opponent's ID": 'Entrez l’ID de votre adversaire',
  Connect: 'Connectez',
  'Copied 📋✔️': 'Copié 📋✔️',

  'Connecting to the network ⌛': 'Connexion au réseau en cours ⌛',
  'Connected to the network (but not to anyone) ✔️':
    'Connecté au réseau (mais pas à quelqu’un) ✔️',
  'Connecting to ID %s ⌛': 'Connexion à l’ID en cours ⌛',
  "Connected to ID %s ✔️ You're the host 🏠":
    'Connecté à l’ID %s ✔️ Vous êtes l’hôte 🏠',
  "Connected by ID %s ✔️ You're the guest 💼":
    'Connecté par ID %s ✔️ Vous êtes l’invité 💼',
  'Connection failed ❌': 'La connexion a échoué ❌',
  'Disconnected 🔌': 'Déconnecté 🔌',
  'You are playing against computer AI':
    'Vous jouez contre l’IA de votre ordinateur',
  'You are playing against human': 'Vous jouez contre un humain',

  'You and your opponent are disconnected. Please go to "Preferences" and start a new game.':
    'Vous et votre adversaire êtes déconnectés. Veuillez aller dans "Préférences" et commencer un nouveau jeu.',

  'Multiplayer Mode is experimental and works only for users behind non-symmetric NAT':
    'Le mode multijoueur est expérimental et ne fonctionne que pour les utilisateurs derrière un NAT non symétrique',

  Reset: 'Réinitialiser',
  'Apply & New Game': 'Appliquer & Nouveau jeu',
  Cancel: 'Annuler',

  Language: 'Langue',

  'Sound & Graphics': 'Son & Image',
  Sound: 'Son',
  Volume: 'Volume',
  Mute: 'Sourdine',
  'Stereo Sound': 'Son stéréo',
  Graphics: 'Image',
  Pixelation: 'Pixelation',
  'Visual Preset': 'Préréglage visuel',
  'Filter may slow down the game': 'Le filtre peut ralentir le jeu',

  Normal: 'Normal',
  Vibrant: 'Vibrant',
  Gray: 'Gris',
  Nostalgia: 'Nostalgie',
  Bright: 'Lumineux',
  Dark: 'Sombre',

  Brightness: 'Luminosité',
  Contrast: 'Contraste',
  Grayscale: 'Niveaux de gris',
  Sepia: 'Sépia',
  Saturate: 'Saturation',
  Hue: 'Teinte',
  Invert: 'Inverser',
  Opacity: 'Opacité',

  Twist: 'Tordre',
  Grain: 'Grain',

  Filters: 'Filtres',

  Help: 'Aide',
  'Toggle Full Screen': 'Basculer en plein écran',

  ERATHIAN: 'Utiliser Erathian [%s] (langues à caractères latins uniquement)',

  'ArcoMage HD': 'ArcoMage HD',

  DESC: 'Clone HD web gratuit et open source du jeu de cartes Arcomage de 3DO et NWC en 2000',

  'Please go to %s to view more information (including %s1), star the repo and follow %s2 there.':
    'Merci d’aller à %s pour voir plus d’informations (y compris %s1), star le repo et suivre %s2 là.',

  'the GitHub project page': 'la page du projet GitHub',

  'an informative tutorial image in English':
    'une image tutorielle informative en anglais',

  'Game rules': 'Les règles du jeu',

  GAMERULES: `Les conditions de victoire diffèrent selon les auberges. Pour remporter la partie, vous devez généralement être le premier à construire votre tour, détruire la tour adverse ou amasser plus de ressources que l’adversaire.
Les chiffres jaunes sont vos productions. Il s’agit du nombre d’unités d’une ressource que vous amassez à chaque tour. Les chiffres noirs sont les ressources elles-mêmes. Il s’agit des unités dont vous disposez et que vous pouvez dépenser.
Cartes\u00A0: chaque carte requiert un certain nombre de ressources pour pouvoir être utilisée, indiqué dans l’angle inférieur droit de la carte. Le coût d’utilisation est soustrait aux ressources selon la couleur de la carte. Cliquez sur une carte avec le bouton gauche de la souris pour la jouer. Cliquez sur une carte avec le bouton droit de la souris pour se défausser.
En Rouge, votre Carrière qui produit des Briques. En Bleu, votre Magie qui produit des Gemmes. En Vert, votre Donjon qui produit des Recrues.`,

  'With no usable or discardable card, your opponent has surrendered':
    'Sans carte utilisable ou défaussable, votre adversaire a capitulé',
  'With no usable or discardable card, you have surrendered':
    'Sans carte utilisable ou défaussable, vous avez capitulé',

  'Please rotate your device to landscape mode':
    'Veuillez faire pivoter votre appareil en mode paysage',
}
