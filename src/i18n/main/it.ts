export const i18n = {
  tower: 'torre',
  wall: 'muro',
  resource: 'risorsa',

  brick: 'mattone',
  bricks: 'mattoni',
  gem: 'gemma',
  gems: 'gemme',
  recruit: 'recluta',
  recruits: 'reclute',

  quarry: 'cava', // i.e. brick production
  magic: 'magia', // i.e. gem production
  dungeon: 'dungeon', // i.e. recruit production

  'Your %s': 'Il tuo/La tua %s', // Your quarry/tower
  "Opponent's %s": "%s dell'avversario", // Opponent's quarry/tower

  '1 brick': '1 mattone',
  '%s bricks': '%s mattoni', // 3 bricks
  '1 gem': '1 gemma',
  '%s gems': '%s gemme', // 3 gems
  '1 recruit': '1 recluta',
  '%s recruits': '%s reclute', // 3 recruits

  'This card costs %s': 'Questa carta costa %s', // This card costs 3 bricks

  // %ss = 'brick', %sp = 'bricks'
  'Your %sp': 'I tuoi/Le tue %sp', // Your bricks
  "Opponent's %sp": "%sp dell'avversario", // Opponent's bricks

  '%s1. Reach %s2 to win': '%s1. Raggiungere %s2 per vincere', // Your tower/bricks/gems/recruits. Reach 100 to win

  // %s = 'quarry', %ss = 'brick', %sp = 'bricks'
  '%s (%ss production)': '%s (produzione di %sp)', // quarry (brick production)

  discarded: 'scartata',
  'Discard a card': 'Scartare una carta',

  'You Win!': 'Tu vinci!',
  'You Lose!': 'Tu perdi!',
  'Tie Game': 'Gioco del pareggio',

  Preferences: 'Preferenze',
  ': ': ': ',
  'Your Name': 'Il tuo nome',
  "Opponent's Name": "Nome dell'avversario",

  'Choose a Tavern (Preset Preferences)':
    'Scegli una taverna (Preferenze preimpostate)',
  'Castle in Enroth': 'Castello a Enroth',
  Antagarich: 'Antagarich',
  Jadame: 'Jadame',
  Default: 'Predefinite',
  Customized: 'Personalizzato',

  'Starting Conditions': 'Condizioni di partenza',
  'Victory Conditions': 'Condizioni di vittoria',
  'Other Preferences': 'Altre preferenze',
  'Cards in Hand': 'Carte in mano',

  'AI Level': 'Livello AI',
  Genius: 'Geniale',
  Smart: 'Intelligente',
  Mediocre: 'Mediocre',
  Stupid: 'Stupido',
  Idiotic: 'Idiota',

  Multiplayer: 'Multigiocatore',
  off: 'disabilitato',
  on: 'abilitato',
  'Your ID': 'Il tuo ID',
  "Enter your opponent's ID": "Inserisci l'ID del tuo avversario",
  Connect: 'Collega',
  'Copied 📋✔️': 'Copiato 📋✔️',

  'Connecting to the network ⌛': 'Connettendo alla rete ⌛',
  'Connected to the network (but not to anyone) ✔️':
    'Connesso alla rete (ma non a nessuno) ✔️',
  'Connecting to ID %s ⌛': 'Connettendo a ID %s ⌛',
  "Connected to ID %s ✔️ You're the host 🏠":
    'Connesso a ID %s ✔️ Tu sei il padrone 🏠',
  "Connected by ID %s ✔️ You're the guest 💼":
    "Connesso da ID %s ✔️ Tu sei l'ospite 💼",
  'Connection failed ❌': 'Connessione fallita ❌',
  'Disconnected 🔌': 'Disconnesso 🔌',
  'You are playing against computer AI':
    "Stai giocando contro l'IA del computer",
  'You are playing against human': 'Stai giocando contro un umano',

  'You and your opponent are disconnected. Please go to "Preferences" and start a new game.':
    'Tu e il tuo avversario siete disconnessi. Vai su "Preferenze" e inizia una nuova partita.',

  'Multiplayer Mode is experimental and works only for users behind non-symmetric NAT':
    'La modalità multiplayer è sperimentale e funziona solo per gli utenti dietro NAT non simmetrico',

  Reset: 'Ripristina',
  'Apply & New Game': 'Applica & Nuova partita',
  Cancel: 'Annulla',

  Language: 'Lingua',

  'Volume & Visual': 'Volume & Visuale',
  Volume: 'Volume',
  Mute: 'Muto',

  Pixelation: 'Pixelation',
  Disable: 'Disabilitare',

  Help: 'Aiuto',
  'Toggle Full Screen': 'Alterna schermo intero',

  ERATHIAN: 'Usa Erathian [%s] (solo lingue con scrittura latina)',

  'ArcoMage HD': 'ArcoMage HD',

  DESC: 'Clone HD open source basato sul web del gioco di carte Arcomage del 2000 di 3DO e NWC',

  'Please go to %s to view more information (including %s1), star the repo and follow %s2 there.':
    'Si prega di andare su %s per vedere maggiori informazioni (incluso %s1), startare il repo e seguire %s2 lì.',

  'the GitHub project page': 'la pagina del progetto GitHub',

  'an informative tutorial image in English':
    "un'immagine tutorial informativa in inglese",

  'Game rules': 'Regole del gioco',

  GAMERULES: `Le regole per vincere variano di osteria in osteria. Occorre costruire la propria torre, distruggere la torre dell’avversario, o raccogliere abbastanza risorse prima dell’avversario.
I grandi numeri gialli incolonnati rappresentano i generatori. Si tratta di quante nuove unità di una risorsa particolare riceverete al prossimo turno. I piccoli numeri neri incolonnati sono le risorse. Si tratta di quante unità avete a disposizione durante il turno in corso.
Carte: il costo di ogni carta è indicato nell’angolo destro inferiore della carta. Il costo della carta giocata viene sottratto dalle risorse secondo il colore della carta. Per giocare la carta fare clic sul tasto sinistro. Per scartare senza giocare fare clic sul tasto destro.
il rosso rappresenta il Generatore Pietra, che produce i Mattoni; il blu rappresenta il Generatore Magia, che produce le Gemme; il verde rappresenta il Generatore Zoo, che produce gli Animali.`,

  'With no usable or discardable card, your opponent has surrendered':
    'Senza carte utilizzabili o scartate, il tuo avversario si è arreso',
  'With no usable or discardable card, you have surrendered':
    'Senza carte utilizzabili o scartate, ti sei arreso',

  'Please rotate your device to landscape mode':
    'Si prega di ruotare il dispositivo in modalità orizzontale',
}
