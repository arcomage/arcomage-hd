export const i18n = {
  tower: 'tower',
  wall: 'wall',
  resource: 'resource',

  brick: 'brick',
  bricks: 'bricks',
  gem: 'gem',
  gems: 'gems',
  recruit: 'recruit',
  recruits: 'recruits',

  quarry: 'quarry', // i.e. brick production
  magic: 'magic', // i.e. gem production
  dungeon: 'dungeon', // i.e. recruit production

  'Your %s': 'Your %s', // Your quarry/tower
  "Opponent's %s": "Opponent's %s", // Opponent's quarry/tower

  '1 brick': '1 brick',
  '%s bricks': '%s bricks', // 3 bricks
  '1 gem': '1 gem',
  '%s gems': '%s gems', // 3 gems
  '1 recruit': '1 recruit',
  '%s recruits': '%s recruits', // 3 recruits

  'This card costs %s': 'This card costs %s', // This card costs 3 bricks

  // %ss = 'brick', %sp = 'bricks'
  'Your %sp': 'Your %sp', // Your bricks
  "Opponent's %sp": "Opponent's %sp", // Opponent's bricks

  '%s1. Reach %s2 to win': '%s1. Reach %s2 to win', // Your tower/bricks/gems/recruits. Reach 100 to win

  // %s = 'quarry', %ss = 'brick', %sp = 'bricks'
  '%s (%ss production)': '%s (%ss production)', // quarry (brick production)

  discarded: 'discarded',
  'Discard a card': 'Discard a card',

  'You Win!': 'You Win!',
  'You Lose!': 'You Lose!',
  'Tie Game': 'Tie Game',

  Preferences: 'Preferences',
  ': ': ': ',
  'Your Name': 'Your Name',
  "Opponent's Name": "Opponent's Name",

  'Choose a Tavern (Preset Preferences)':
    'Choose a Tavern (Preset Preferences)',
  'Castle in Enroth': 'Castle in Enroth',
  Antagarich: 'Antagarich',
  Jadame: 'Jadame',
  Default: 'Default',
  Customized: 'Customized',

  'Starting Conditions': 'Starting Conditions',
  'Victory Conditions': 'Victory Conditions',
  'Other Preferences': 'Other Preferences',
  'Cards in Hand': 'Cards in Hand',

  'AI Level': 'AI Level',
  Genius: 'Genius',
  Smart: 'Smart',
  Mediocre: 'Mediocre',
  Stupid: 'Stupid',
  Idiotic: 'Idiotic',

  Multiplayer: 'Multiplayer',
  off: 'off',
  on: 'on',
  'Your ID': 'Your ID',
  "Enter your opponent's ID": "Enter your opponent's ID",
  Connect: 'Connect',
  'Copied 📋✔️': 'Copied 📋✔️',

  'Connecting to the network ⌛': 'Connecting to the network ⌛',
  'Connected to the network (but not to anyone) ✔️':
    'Connected to the network (but not to anyone) ✔️',
  'Connecting to ID %s ⌛': 'Connecting to ID %s ⌛',
  "Connected to ID %s ✔️ You're the host 🏠":
    "Connected to ID %s ✔️ You're the host 🏠",
  "Connected by ID %s ✔️ You're the guest 💼":
    "Connected by ID %s ✔️ You're the guest 💼",
  'Connection failed ❌': 'Connection failed ❌',
  'Disconnected 🔌': 'Disconnected 🔌',
  'You are playing against computer AI': 'You are playing against computer AI',
  'You are playing against human': 'You are playing against human',

  'You and your opponent are disconnected. Please go to "Preferences" and start a new game.':
    'You and your opponent are disconnected. Please go to "Preferences" and start a new game.',

  'Multiplayer Mode is experimental and works only for users behind non-symmetric NAT':
    'Multiplayer Mode is experimental and works only for users behind non-symmetric NAT',

  Reset: 'Reset',
  'Apply & New Game': 'Apply & New Game',
  Cancel: 'Cancel',

  Language: 'Language',

  'Volume & Visual': 'Volume & Visual',
  Volume: 'Volume',
  Mute: 'Mute',

  Pixelation: 'Pixelation',
  Disable: 'Disable',

  Help: 'Help',
  'Toggle Full Screen': 'Toggle Full Screen',

  ERATHIAN: 'Use Erathian [%s] (latin script languages only)',

  'ArcoMage HD': 'ArcoMage HD',

  DESC: "Web-based free and open source HD clone of 3DO and NWC's 2000 card game Arcomage",

  'Please go to %s to view more information (including %s1), star the repo and follow %s2 there.':
    'Please go to %s to view more information (including %s1), star the repo and follow %s2 there.',

  'the GitHub project page': 'the GitHub project page',

  'an informative tutorial image in English':
    'an informative tutorial image in English',

  'Game rules': 'Game rules',

  GAMERULES: `Victory conditions vary per tavern. Build your tower, destroy your opponent's tower, or collect enough resources before your opponent does.
Large yellow numbers in column are the productions. This is how many new units of a particular resource you will receive on your next turn. Small black numbers in column are the resources. This is how many units you have available to spend on your current turn.
Cards: Each have their own cost to play, indicated in a small circle in the lower right corner of the card. The cost will be deducted from your resources according to the color of the card. Left click on a card plays the card. Right click on a card to discard without playing.
Red represents your Quarry Generator which produces your Brick resources, blue represents your Magic Generator which produces Gem resources, green represents your Dungeon generator which produces Recruit resources.`,

  'With no usable or discardable card, your opponent has surrendered':
    'With no usable or discardable card, your opponent has surrendered',
  'With no usable or discardable card, you have surrendered':
    'With no usable or discardable card, you have surrendered',

  'Please rotate your device to landscape mode':
    'Please rotate your device to landscape mode',
}
