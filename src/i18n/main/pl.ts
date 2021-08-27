export const i18n = {
  tower: 'wieża',
  wall: 'mur',
  resource: 'zasoby',

  brick: 'kamień',
  bricks: 'kamienie',
  gem: 'klejnot',
  gems: 'klejnoty',
  recruit: 'bestia',
  recruits: 'bestie',

  quarry: 'kamieniołom', // i.e. brick production
  magic: 'magia', // i.e. gem production
  dungeon: 'loch', // i.e. recruit production

  'Your %s': 'Twoja/Twój %s', // Your quarry/tower
  "Opponent's %s": '%s przeciwnika', // Opponent's quarry/tower

  // %ss = 'brick', %sp = 'bricks'
  'Your %sp': 'Twoje %sp', // Your bricks
  "Opponent's %sp": '%sp przeciwnika', // Opponent's bricks

  '%s1. Reach %s2 to win': '%s1. Osiągnij %s2, aby wygrać', // Your tower/bricks/gems/recruits. Reach 100 to win

  // %s = 'quarry', %ss = 'brick', %sp = 'bricks'
  '%s (%ss production)': '%s (produkcja %ss)', // quarry (brick production)

  // %ss = 'brick', %sp = 'bricks'
  'This card costs %s': 'Ta karta kosztuje %s', // This card costs 3 bricks

  discarded: 'odrzucona',
  'Discard a card': 'Odrzuæ kartê',

  'You Win!': 'Zwyciężyłeś!',
  'You Lose!': 'Przegrałeś',
  'Tie Game': 'Remis',

  Preferences: 'Preferencje',
  ': ': ': ',
  'Your Name': 'Twoje imię',
  "Opponent's Name": 'Imię przeciwnika',
  'Choose a Tavern (Preset Preferences)':
    'Wybierz tawernę (Wstępne ustawienia)',
  Default: 'Domyślne',
  Customized: 'Własne',
  'Starting Conditions': 'Warunki rozpoczęcia',
  'Victory Conditions': 'Warunki zwycięstwa',
  'Other Preferences': 'Inne opcje',
  'Cards in Hand': 'Karty w ręce',
  'AI Type': 'Typ komputera',

  Multiplayer: 'Wieloosobowa',
  off: 'wyłączony',
  on: 'włączony',
  'Your ID': 'Twoje ID',
  "Enter your opponent's ID": 'Wpisz ID przeciwnika',
  Connect: 'Połącz',
  'Copied 📋✔️': 'Skopiowane 📋✔️',

  'Connecting to the network ⌛': 'Connecting to the network ⌛',
  'Connected to the network (but not to anyone) ✔️':
    'Connected to the network (but not to anyone) ✔️',
  'Connecting to ID %s ⌛': 'Connecting to ID %s ⌛',
  "Connected to ID %s ✔️ You're the host 🏠":
    "Connected to ID %s ✔️ You're the host 🏠",
  "Connected by ID %s ✔️ You're the guest 💼":
    "Connected by ID %s ✔️ You're the guest 💼",
  'Connection failed ❌': 'Połączenie nie powiodło się ❌',
  'Disconnected 🔌': 'Rozłączono 🔌',
  'You are playing against computer AI': 'Grasz przeciwko komputerowi AI',
  'You are playing against human': 'Grasz przeciwko człowiekowi',

  'You and your opponent are disconnected. Please go to "Preferences" and start a new game.':
    'Ty i twój przeciwnik jesteście rozłączeni. Przejdź do "Preferencje" i rozpocznij nową grę.',

  'Multiplayer Mode is experimental and works only for users behind non-symmetric NAT':
    'Tryb multiplayer jest eksperymentalny i działa tylko dla użytkowników za niesymetrycznym NAT',

  Reset: 'Resetuj',
  'Apply & New Game': 'Akceptuj i zacznij grę',
  Cancel: 'Zakończ',

  Language: 'Język',
  Volume: 'Głośność',
  Mute: 'Wycisz',
  Help: 'Pomoc',
  'Toggle Full Screen': 'Pełny ekran',

  ERATHIAN: 'Użyj Erathian [%s] (tylko dla liter łacińskich)',

  'ArcoMage HD': 'ArcoMage HD',

  DESC: 'Sieciowy, otwartoźródłowy klon 3DO i gry karcianej Arcomage z 2000 roku firmy NWC',

  'Please go to %s to view more information (including %s1), star the repo and follow %s2 there.':
    'Proszę przejść do %s, aby zobaczyć więcej informacji (w tym %s1), uruchomić repo i śledzić %s2 tam.',

  'the GitHub project page': 'strona projektu na GitHubie',

  'an informative tutorial image in English':
    'obrazek instruktażowy w języku angielskim',

  'Game rules': 'Zasady gry',

  GAMERULES: `Warunki zwycięstwa są różne w zależności od miejsca, w którym gracie. Trzeba zbudować własną wieżę, zniszczyć wieżę przeciwnika lub zebrać wystarczająco dużo surowców zanim uczyni to twój przeciwnik.
Duże, żółte liczby w kolumnach to generatory. Od nich zależy ile jednostek danego surowca otrzymasz w następnej kolejce. Małe czarne liczby w kolumnach to surowce. Oznaczają ilość surowca, którą możesz wykorzystać podczas trwającej tury.
Karty: Każda z nich posiada odpowiednią wartość, oznaczoną małym kółkiem w prawym dolnym rogu. Ten koszt zostanie odjęty od posiadanych przez ciebie surowców - w zależności od tego, jakiego koloru jest dana karta. Kliknięcie na karcie lewym przyciskiem myszki spowoduje zagranie karty. Kliknięcie na niej prawym przyciskiem myszy spowoduje odłożenie karty bez zagrania jej.
Czerwony kolor oznacza generator kamieni, w którym powstaje surowiec zwany kamieniem. Kolor niebieski oznacza generator magii produkujący klejnoty, a zielony to generator stworzeń, w którym powstają bestie.`,

  'With no usable or discardable card, your opponent has surrendered':
    'Twój przeciwnik poddał się bez użytecznej lub możliwej do odrzucenia karty',
  'With no usable or discardable card, you have surrendered':
    'Nie posiadając żadnej możliwej do użycia lub odrzucenia karty, poddałeś się',

  'Please rotate your device to landscape mode':
    'Proszę obrócić urządzenie do trybu poziomego',
}
