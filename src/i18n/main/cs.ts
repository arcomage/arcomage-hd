export const i18n = {
  tower: 'věž',
  wall: 'zed',
  resource: 'suroviny',

  brick: 'cihla',
  bricks: 'cihly',
  gem: 'drahokam',
  gems: 'drahokamy',
  recruit: 'příšera',
  recruits: 'příšery',

  quarry: 'těžba', // i.e. brick production
  magic: 'magic', // i.e. gem production
  dungeon: 'jeskyně', // i.e. recruit production

  'Your %s': 'Tvůj/Tvoje %s', // Your quarry/tower
  "Opponent's %s": '%s soupeře', // Opponent's quarry/tower

  // %ss = 'brick', %sp = 'bricks'
  'Your %sp': 'Váš/Vaše %sp', // Your bricks
  "Opponent's %sp": '%sp soupeře', // Opponent's bricks

  '%s1. Reach %s2 to win': '%s1. Reach %s2 to win', // Your tower/bricks/gems/recruits. Reach 100 to win

  // %s = 'quarry', %ss = 'brick', %sp = 'bricks'
  '%s (%ss production)': '%s (výroba %ss)', // quarry (brick production)

  // %ss = 'brick', %sp = 'bricks'
  'This card costs %s': 'Tato karta stojí %s', // This card costs 3 bricks

  discarded: 'odložená',
  'Discard a card': 'Odhoďte kartu',

  'You Win!': 'Vyhrál jsi!',
  'You Lose!': 'Prohrál jsi!',
  'Tie Game': 'Remízová hra',

  Preferences: 'Předvolby',
  ': ': ': ',
  'Your Name': 'Vaše jméno',
  "Opponent's Name": 'Jméno soupeře',
  'Choose a Tavern (Preset Preferences)':
    'Vyberte hospodu (přednastavené předvolby)',
  Default: 'Výchozí',
  Customized: 'Přizpůsobené',
  'Starting Conditions': 'Počáteční podmínky',
  'Victory Conditions': 'Podmínky vítězství',
  'Other Preferences': 'Další předvolby',
  'Cards in Hand': 'Karty v ruce',
  'AI Type': 'Typ AI',

  Multiplayer: 'Více hráčů',
  off: 'zakázáno',
  on: 'povoleno',
  'Your ID': 'Vaše ID',
  "Enter your opponent's ID": 'Zadejte ID soupeře',
  Connect: 'Připojit',
  'Copied 📋✔️': 'Zkopírováno 📋✔️',

  'Connecting to the network ⌛': 'Connecting to the network ⌛',
  'Connected to the network (but not to anyone) ✔️':
    'Connected to the network (but not to anyone) ✔️',
  'Connecting to ID %s ⌛': 'Connecting to ID %s ⌛',
  "Connected to ID %s ✔️ You're the host 🏠":
    "Connected to ID %s ✔️ You're the host 🏠",
  "Connected by ID %s ✔️ You're the guest 💼":
    "Connected by ID %s ✔️ You're the guest 💼",
  'Connection failed ❌': 'Připojení se nezdařilo ❌',
  'Disconnected 🔌': 'Odpojeno 🔌',
  'You are playing against computer AI': 'Hrajete proti počítačové AI',
  'You are playing against human': 'Hrajete proti člověku',

  'Your opponent is disconnected. Please go to "Preferences" and start a new game.':
    'Your opponent is disconnected. Please go to "Preferences" and start a new game.',

  'Multiplayer Mode is experimental and unstable':
    'Režim pro více hráčů je experimentální a nestabilní',

  Reset: 'Reset',
  'Apply & New Game': 'Použít a nová hra',
  Cancel: 'Zrušit',

  Language: 'Jazyk',
  Volume: 'Hlasitost',
  Mute: 'Ztlumit',
  Help: 'Nápověda',
  'Toggle Full Screen': 'Přepnout na celou obrazovku',

  ERATHIAN: 'Používejte Erathian [%s] (pouze pro písmena latinky)',

  'ArcoMage HD': 'ArcoMage HD',

  DESC:
    'Webový open source HD klon karetní hry Arcomage pro 3DO a NWC z roku 2000',

  'Please go to %s to view more information (including %s1), star the repo and follow %s2 there.':
    'Pro zobrazení dalších informací (včetně %s1) přejděte na %s, označte repozitář hvězdičkou a sledujte %s2.',

  'the GitHub project page': 'stránka projektu GitHub',

  'an informative tutorial image in English':
    'informativní výukový obrázek v angličtině',

  'Please go to %s to view more information, star the repo and follow %s there.':
    'Pro zobrazení dalších informací přejděte na %s, označte repozitář hvězdičkou a sledujte %s.',

  'Game rules': 'Pravidla hry',

  GAMERULES: `Podmínky vítězství jsou v každém hostinci různé. Stavíš svojí věž a snažíš se zničit věž protivníka nebo se snažíš nashromáždit stanovené množství zdrojů dříve, než to udělá tvůj protivník.
Velká žlutá čísla v sloupcích jsou generátory. Ty určují, kolik nových jednotek jednotlivých zdrojů ti přibude v dalším tahu. Malá černá čísla v sloupcích jsou tvoje zásoby zdrojů. Ty určují, kolik jednotek budeš moci utratit v tomto tahu.
Karty: Každá má svou cenu pro zahrání. Ta je značena v kroužku v pravém dolním rohu karty. Tato hodnota bude odečtena z tvých zdrojů podle barvy karty. Levým kliknutím kartu vynášíš do hry. Pravým kliknutím na kartě ji odhodíš z ruky.
Cihly se generují v červeném generátoru těžby, drahokamy v modrém generátoru magie a příšery v zelené jeskyni.`,

  'With no usable or discardable card, your opponent has surrendered':
    'Bez použitelné nebo vyřazitelné karty se váš soupeř vzdal',
  'With no usable or discardable card, you have surrendered':
    'Bez použitelné nebo vyřazitelné karty jste se vzdali',

  'Please rotate your device to landscape mode':
    'Otočte zařízení do režimu na šířku',
}
