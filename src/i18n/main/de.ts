export const i18n = {
  tower: 'Turm',
  wall: 'Wall',
  resource: 'Ressource',

  brick: 'Ziegel',
  bricks: 'Ziegel',
  gem: 'Edelstein',
  gems: 'Edelsteine',
  recruit: 'Rekrut',
  recruits: 'Rekruten',

  quarry: 'Steinbruch', // i.e. brick production
  magic: 'Magie', // i.e. gem production
  dungeon: 'Kerker', // i.e. recruit production

  'Your %s': 'Ihr(e) %s', // Your quarry/tower
  "Opponent's %s": '%s des Gegners', // Opponent's quarry/tower

  '1 brick': '1 Ziegel',
  '%s bricks': '%s Ziegel', // 3 bricks
  '1 gem': '1 Edelstein',
  '%s gems': '%s Edelsteine', // 3 gems
  '1 recruit': '1 Rekrut',
  '%s recruits': '%s Rekruten', // 3 recruits

  'This card costs %s': 'Diese Karte kostet %s', // This card costs 3 bricks

  // %ss = 'brick', %sp = 'bricks'
  'Your %sp': 'Ihre %sp', // Your bricks
  "Opponent's %sp": '%sp des Gegners', // Opponent's bricks

  '%s1. Reach %s2 to win': '%s1. Erreichen Sie %s2, um zu gewinnen', // Your tower/bricks/gems/recruits. Reach 100 to win

  // %s = 'quarry', %ss = 'brick', %sp = 'bricks'
  '%s (%ss production)': '%s (%ssproduktion)', // quarry (brick production)

  discarded: 'abgelegt',
  'Discard a card': 'Eine Karte ablegen',

  'You Win!': 'Sie gewinnen!',
  'You Lose!': 'Sie verlieren!',
  'Tie Game': 'Unentschieden Spiel',

  Preferences: 'Voreinstellungen',
  ': ': ': ',
  'Your Name': 'Ihr Name',
  "Opponent's Name": 'Name des Gegners',

  'Choose a Tavern (Preset Preferences)':
    'Taverne wählen (voreingestellte Einstellungen)',
  'Castle in Enroth': 'Schloss in Enroth',
  Antagarich: 'Antagarich',
  Jadame: 'Jadame',
  Default: 'Standard',
  Customized: 'Benutzerdefiniert',

  'Starting Conditions': 'Startbedingungen',
  'Victory Conditions': 'Siegbedingungen',
  'Other Preferences': 'Andere Voreinstellungen',
  'Cards in Hand': 'Karten auf der Hand',

  'AI Level': 'AI-Ebene',
  Genius: 'Genial',
  Smart: 'Klug',
  Mediocre: 'Mittelmäßig',
  Stupid: 'Dumm',
  Idiotic: 'Idiotisch',

  Multiplayer: 'Mehrspieler',
  off: 'deaktiviert',
  on: 'aktiviert',
  'Your ID': 'Ihre ID',
  "Enter your opponent's ID": 'Geben Sie die ID Ihres Gegners ein',
  Connect: 'Verbinden',
  'Copied 📋✔️': 'Kopiert 📋✔️',

  'Connecting to the network ⌛': 'Verbindung zum Netzwerk herstellen ⌛',
  'Connected to the network (but not to anyone) ✔️':
    'Verbunden mit dem Netzwerk (aber mit niemandem) ✔️',
  'Connecting to ID %s ⌛': 'Verbindung zur ID %s herstellen ⌛',
  "Connected to ID %s ✔️ You're the host 🏠":
    'Verbunden zur ID %s ✔️ Sie sind der Host 🏠',
  "Connected by ID %s ✔️ You're the guest 💼":
    'Verbunden durch ID %s ✔️ Sie sind der Gast 💼',
  'Connection failed ❌': 'Verbindung fehlgeschlagen ❌',
  'Disconnected 🔌': 'Getrennt 🔌',
  'You are playing against computer AI': 'Sie spielen gegen eine Computer-KI',
  'You are playing against human': 'Sie spielen gegen einen Menschen',

  'You and your opponent are disconnected. Please go to "Preferences" and start a new game.':
    'Sie und Ihr Gegner sind nicht verbunden. Bitte gehen Sie zu "Voreinstellungen" und starten Sie ein neues Spiel.',

  'Multiplayer Mode is experimental and works only for users behind non-symmetric NAT':
    'Der Multiplayer-Modus ist experimentell und funktioniert nur für Benutzer hinter nicht-symmetrischem NAT',

  Reset: 'Zurücksetzen',
  'Apply & New Game': 'Anwenden & Neues Spiel',
  Cancel: 'Abbrechen',

  Language: 'Sprache',

  'Volume & Visual': 'Lautstärke & Optik',
  Volume: 'Lautstärke',
  Mute: 'Stummschalten',

  Pixelation: 'Verpixelung',
  Disable: 'Deaktivieren',

  Help: 'Hilfe',
  'Toggle Full Screen': 'Vollbild umschalten',

  ERATHIAN: 'Erathian [%s] verwenden (nur Sprachen mit lateinischer Schrift)',

  'ArcoMage HD': 'ArcoMage HD',

  DESC: 'Webbasierter kostenloser Open-Source HD Klon des 3DO- und NWC-Kartenspiels Arcomage aus dem Jahr 2000',

  'Please go to %s to view more information (including %s1), star the repo and follow %s2 there.':
    'Bitte gehen Sie zu %s, um weitere Informationen (einschließlich %s1) zu sehen, markieren Sie das Repo und folgen Sie %s2 dorthin.',

  'the GitHub project page': 'die GitHub-Projektseite',

  'an informative tutorial image in English':
    'ein informatives Anleitungsbild in Englisch',

  'Game rules': 'Spielregeln',

  GAMERULES: `Die Siegbedingungen variieren je nach Taverne. Baut Euren Turm, zerstört den Turm des Gegners oder sammelt ausreichend Ressourcen, bevor es Euer Gegner tut.
Die großen gelben Zahlen in einer Spalte stellen die Generatoren dar. Diese Zahlen geben an, wie viele Einheiten einer bestimmten Ressource Euch in der nächsten Runde zur Verfügung stehen. Die kleinen schwarzen Zahlen in einer Spalte geben die Ressourcen selbst an. Sie zeigen, wie viele Einheiten einer Ressource Ihr in dieser Runde verbrauchen könnt.
Karten: Jede Karte benötigt bestimmte Ressourcen, um ausgespielt werden zu können. Diese sind in einem kleinen Kreis in der unteren rechten Ecke der Karte angegeben. Die Kosten werden von Euren Ressourcen entsprechend der Farbe der Karte abgezogen. Mit einem Linksklick wird die Karte ausgespielt, mit einem Rechtsklick wird sie abgelegt, ohne ausgespielt worden zu sein.
Rot stellt Euren Ziegel-Generator dar, der Ziegel-Ressourcen erzeugt, blau den Magie-Generator, der Edelstein-Ressourcen erzeugt und grün den Monster-Generator, der Monster-Ressourcen erzeugt.`,

  'With no usable or discardable card, your opponent has surrendered':
    'Ohne verwendbare oder ablegbare Karte hat Ihr Gegner kapituliert',
  'With no usable or discardable card, you have surrendered':
    'Ohne verwendbare oder ablegbare Karte haben Sie aufgegeben',

  'Please rotate your device to landscape mode':
    'Bitte drehen Sie Ihr Gerät in das Querformat',
}
