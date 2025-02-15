export const i18n = {
  tower: 'Вежа',
  wall: 'Стіна',
  resource: 'Ресурс',

  brick: 'цеглина',
  bricks: 'Цегла',
  gem: 'самоцвіт',
  gems: 'Самоцвіти',
  recruit: 'істота',
  recruits: 'Істоти',

  quarry: "Кар'єр", // i.e. brick production
  magic: 'Магія', // i.e. gem production
  dungeon: 'Підземення', // i.e. recruit production

  'Your %s': 'Ваш %s', // Your quarry/tower
  "Opponent's %s": 'Ворожий %s', // Opponent's quarry/tower

  '1 brick': '1 цеглина',
  '%s bricks': '%s цеглини', // 3 bricks
  '1 gem': '1 самоцвіт',
  '%s gems': '%s самоцвіти', // 3 gems
  '1 recruit': '1 істота',
  '%s recruits': '%s істоти', // 3 recruits

  'This card costs %s': 'Ця карта коштує %s', // This card costs 3 bricks
  allUnusableTip:
    'Усі карти непридатні для використання, ви повинні скинути картку, клацнувши на ній правою кнопкою миші або утримуючи її',

  // %ss = 'brick', %sp = 'bricks'
  'Your %sp': 'Ваші %sp', // Your bricks
  "Opponent's %sp": 'Ворожі %sp', // Opponent's bricks

  '%s1. Reach %s2 to win': '%s1. Отримате %s2, щоб перемогти', // Your tower/bricks/gems/recruits = n. Reach 100 to win

  // %s = 'quarry', %ss = 'brick', %sp = 'bricks'
  '%s (%ss production)': '%s (%ss виробництво)', // quarry (brick production)

  discarded: 'скинута',
  'Discard a card': 'Скинути карту',

  'You Win!': 'Ви перемогли!',
  'You Lose!': 'Ви програли!',
  'Tie Game': 'Нічия!',

  '%s has reached the victory condition': '%s досягла умови перемоги', // %s = 'Your tower', "Opponent's tower"
  '%s have reached the victory condition': '%s досягли умови перемоги', // %s = 'Your bricks', "Opponent's bricks", "Your gems", ...
  'Your opponent has no tower left': 'У вашого супротивника не залишилося вежі',
  'You have no tower left': 'У вас не залишилося вежі',

  'Review cards': 'Перегляньте картки',
  'Hide cards': 'Сховайте картки',

  '. ': '. ',

  Preferences: 'Налаштування',
  ': ': ': ',
  'Your Name': "Ваше ім'я",
  "Opponent's Name": "Ім'я опонента",

  'Choose a Tavern (Preset Preferences)': 'Оберіть таверну (набір налаштувань)',
  'Castle in Enroth': 'Замок в Енроті',
  Antagarich: 'Антагарич',
  Jadame: 'Джадам',
  Default: 'Типово',
  Customized: 'Користувацькі',

  'Starting Conditions': 'Стартові умови',
  'Victory Conditions': 'Умови перемоги',

  'Minimum is starting %s1 + 1 = %s0': 'Мінімум: початкова %s1 + 1 = %s0',
  'Minimum is MAX(%s1+%s2, %s3+%s4, %s5+%s6) + 1 = %s0':
    'Мінімум: MAX(%s1+%s2, %s3+%s4, %s5+%s6) + 1 = %s0',

  'Other Preferences': 'Інші налаштування',
  'Cards in Hand': 'Карт в руці',

  'AI Level': 'Рівень ШІ',
  Genius: 'Геній',
  Smart: 'Рощумний',
  Mediocre: 'Посередній',
  Stupid: 'Тупак',
  Idiotic: 'Ідіотичний',

  Multiplayer: 'Мультиплеєр',
  off: 'off',
  on: 'on',
  'Your ID': 'Ваш ID',
  "Enter your opponent's ID": 'Введіть ID опонента',
  Connect: "З'єднання",
  Copy: 'Копія',
  'Copied 📋✅': 'Скопійовано 📋✅',

  'Connecting to the network ⌛': "З'єднання з мережею ⌛",
  'Connected to the network (but not to anyone) 🟡':
    "З'єднання з мережею (але не з кімнатою) 🟡",
  'Connecting to ID %s ⌛': "З'єднання з ID %s ⌛",
  "Connected to ID %s ✅ You're the host 🏠": "З'єднано з ID %s ✅ Ви хост 🏠",
  "Connected by ID %s ✅ You're the guest 💼":
    "З'єднано з ID %s ✅ Ви гість 💼",
  'Connection failed ❌': "З'єднання не вдалося ❌",
  'Disconnected 🔌': "З'єднання разірвано 🔌",
  'You are playing against computer AI': 'Ви граєте проти ШІ',
  'You are playing against human': 'Ви граете проти людини',

  'You and your opponent are disconnected. Please go to "Preferences" and start a new game.':
    'Ви і ваш опонент відключені. Будь ласка, перейдіть в розділ «Налаштування» і почніть нову гру.',

  'Multiplayer Mode is experimental and works only for users behind non-symmetric NAT':
    'Багатокористувацький режим є експериментальним і працює лише для користувачів за несиметричним NAT',

  Reset: 'Скинути',
  'Apply & New Game': 'Застосувати і почати гру', // or "Почати игру!"
  Cancel: 'Відміна',

  Language: 'Мова',

  'Sound & Graphics': 'Звук і Графіка',
  Sound: 'Звук',
  Volume: 'Гучність',
  Mute: 'Тихо',
  'Stereo Sound': 'Стерео звук',
  Graphics: 'Графіка',
  'Disable animation': 'Вимкнути анімацію',
  Pixelation: 'Пікселізація',
  'Visual Preset': 'Візуальний пресет',
  'Filter may slow down the game': 'Фільтр може сповільнити гру',

  Normal: 'Нормальний',
  Vibrant: 'Яскравий',
  'Black and white': 'Чорно-білий',
  Nostalgia: 'Ностальгія',
  Bright: 'Яскравий',
  Dark: 'Темний',

  Brightness: 'Яскравість',
  Contrast: 'Контраст',
  Grayscale: 'Відтінки сірого',
  Sepia: 'Сепія',
  Saturate: 'Насичення',
  Hue: 'Відтінок',
  Invert: 'Інвертувати',
  Opacity: 'Непрозорість',

  Twist: 'Крутити',
  Grain: 'Зерновий',

  Filters: 'фільтри',

  Help: 'Допомога',
  'Toggle Full Screen': 'Повноекранний режим',

  'Bold font': 'Жирний шрифт',
  ERATHIAN: 'Використовувати Ерафійський %s (лише мови латинського шрифту)',

  'ArcoMage HD': 'Аркомаг HD',

  DESC: 'Безкоштовна та OpenSource веб-версія гри Arcomage, що була випущена 3DO і New World Computing в 2000 році',

  'Please go to %s to view more information (including %s1), star the repo and follow %s2 there.':
    'Будь ласка, відвідайте %s щоб дізнатися більше інформації (включаючи %s1), додайте репозиторій в обране і підпишіться на %s2.',

  'the GitHub project page': 'сторінку проекта на GitHub',

  'an informative tutorial image in English':
    'інформативну учебну картинку английскою мовою',

  'Game rules': 'Правила гри',

  GAMERULES: `Умови перемоги залежать від обраної Таверни. Є три способи перемогти - побудувати свою Вежу до певного рівня, назбирати певну кількість ресурсів або знищити Вежу опонента. Існтує три типа ресурсів - Цегла, Самоцвіти і Істоти. Цеглу обпалюють в Кар'єрі, Самоцвіти створюють Магією, Істот розводять в Підземеллях.
На кожному джерелі ресурсів є два числа. Маленьке чорне число - це кількість одиниць цього ресурсу що є у вас на цей момент. Велике жовте число - це кількість одиниць цього ресурса ви отримаєте на початку свого наступного ходу.
Кожен хід вы можете зіграти одну карту або скинути її з руки, пропустивши хід. Щоб зіграти, клацність на ній лівою клавішою мишки, щоб скинути - правою. На кожній карті написана її вартість - в правому нижньому кутку. Коли ви граєте карту, ви витрачаєте вказану кількість одного з ресурсів. На чернові карти витрачається Цегла, на сині - Самоцвіти, на зелені - Істоти.`,

  'With no usable or discardable card, your opponent has surrendered':
    'Якщо у опонента немає можливості ні зіграти, ні скинути карту - він автоматично здається',
  'With no usable or discardable card, you have surrendered':
    'Якщо у вас немає можливості ні зіграти, ні скинути карту - вм автоматично здаєтеся',

  'Please rotate your device to landscape mode':
    'Будь ласка, поверніть прилад в альбомний режим',
}
