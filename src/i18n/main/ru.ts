export const i18n = {
  tower: 'Башня',
  wall: 'Стена',
  resource: 'Ресурс',

  brick: 'кирпич',
  bricks: 'Кирпичи',
  gem: 'самоцвет',
  gems: 'Самоцветы',
  recruit: 'существо',
  recruits: 'Существа',

  quarry: 'Карьер', // i.e. brick production
  magic: 'Магия', // i.e. gem production
  dungeon: 'Подземелье', // i.e. recruit production

  'Your %s': 'Ваша %s', // Your quarry/tower
  "Opponent's %s": '%s противника', // Opponent's quarry/tower

  '1 brick': '1 кирпич',
  '%s bricks': '%s кирпичи', // 3 bricks
  '1 gem': '1 самоцвет',
  '%s gems': '%s самоцветы', // 3 gems
  '1 recruit': '1 существо',
  '%s recruits': '%s существа', // 3 recruits

  'This card costs %s': 'Эта карта стоит %s', // This card costs 3 bricks
  allUnusableTip:
    'Все карты бесполезны, вы должны сбросить карту, щелкнув правой кнопкой мыши или удерживая ее',

  // %ss = 'brick', %sp = 'bricks'
  'Your %sp': 'Ваши %sp', // Your bricks
  "Opponent's %sp": '%sp противника', // Opponent's bricks

  '%s1. Reach %s2 to win': '%s1. Достань %s2, чтобы выиграть', // Your tower/bricks/gems/recruits = n. Reach 100 to win

  // %s = 'quarry', %ss = 'brick', %sp = 'bricks'
  '%s (%ss production)': '%s (%ss производство)', // quarry (brick production)

  discarded: 'сброшена',
  'Discard a card': 'Сбросить карту',

  'You Win!': 'Вы победили!',
  'You Lose!': 'Вы проиграли!',
  'Tie Game': 'Ничья!',

  Preferences: 'Настройки',
  ': ': ': ',
  'Your Name': 'Ваше имя',
  "Opponent's Name": 'Имя противника',

  'Choose a Tavern (Preset Preferences)': 'Выберите Таверну (набор настроек)',
  'Castle in Enroth': 'Замок в Энроте',
  Antagarich: 'Антагрич',
  Jadame: 'Джадам',
  Default: 'По умолчанию',
  Customized: 'Пользовательская',

  'Starting Conditions': 'Стартовые условия',
  'Victory Conditions': 'Условия победы',

  'Minimum is starting %s1 + 1 = %s0': 'Минимум: начальное %s1 + 1 = %s0',
  'Minimum is MAX(%s1+%s2, %s3+%s4, %s5+%s6) + 1 = %s0':
    'Минимум: MAX(%s1+%s2, %s3+%s4, %s5+%s6) + 1 = %s0',

  'Other Preferences': 'Другие настройки',
  'Cards in Hand': 'Карт в руке',

  'AI Level': 'Уровень ИИ',
  Genius: 'Гений',
  Smart: 'Умный',
  Mediocre: 'Посредственный',
  Stupid: 'Тупой',
  Idiotic: 'Идиотский',

  Multiplayer: 'Мультиплеер',
  off: 'off',
  on: 'on',
  'Your ID': 'Ваш ID',
  "Enter your opponent's ID": 'Введите ID оппонента',
  Connect: 'Соединение',
  'Copied 📋✅': 'Скопировано 📋✅',

  'Connecting to the network ⌛': 'Соединение с сетью ⌛',
  'Connected to the network (but not to anyone) 🟡':
    'Соединено с сетью (но ни к кому) 🟡',
  'Connecting to ID %s ⌛': 'Соединение с ID %s ⌛',
  "Connected to ID %s ✅ You're the host 🏠": 'Соединено с ID %s ✅ Вы хост 🏠',
  "Connected by ID %s ✅ You're the guest 💼":
    'Соединено с ID %s ✅ Вы гость 💼',
  'Connection failed ❌': 'Соединение не удалось ❌',
  'Disconnected 🔌': 'Соединение разорвано 🔌',
  'You are playing against computer AI': 'Вы играете против ИИ',
  'You are playing against human': 'Вы играете против человека',

  'You and your opponent are disconnected. Please go to "Preferences" and start a new game.':
    'Вы и ваш оппонент отключены. Пожалуйста, перейдите в раздел «Настройки» и начните новую игру.',

  'Multiplayer Mode is experimental and works only for users behind non-symmetric NAT':
    'Многопользовательский режим является экспериментальным и работает только для пользователей за несимметричным NAT',

  Reset: 'Сброс',
  'Apply & New Game': 'Применить и начать игру', // or "Начать игру!"
  Cancel: 'Отмена',

  Language: 'Язык',

  'Sound & Graphics': 'Звук и Графика',
  Sound: 'Звук',
  Volume: 'Громкость',
  Mute: 'Заглушить',
  'Stereo Sound': 'Стереозвук',
  Graphics: 'Графика',
  'Disable animation': 'Отключить анимацию',
  Pixelation: 'Пикселизация',
  'Visual Preset': 'Визуальный пресет',
  'Filter may slow down the game': 'Фильтр может замедлить игру',

  Normal: 'Обычный',
  Vibrant: 'Яркий',
  'Black and white': 'Чёрно-белое',
  Nostalgia: 'Ностальгия',
  Bright: 'Яркий',
  Dark: 'Темный',

  Brightness: 'Яркость',
  Contrast: 'Контраст',
  Grayscale: 'Оттенки серого',
  Sepia: 'Сепия',
  Saturate: 'Насыщать',
  Hue: 'Оттенок',
  Invert: 'Инвертировать',
  Opacity: 'Непрозрачность',

  Twist: 'Крутить',
  Grain: 'Зерно',

  Filters: 'Фильтры',

  Help: 'Помощь',
  'Toggle Full Screen': 'Полноэкранный режим',

  'Bold font': 'Жирный шрифт',
  ERATHIAN: 'Использовать Эрафийский %s (только языки латинской графики)',

  'ArcoMage HD': 'Аркомаг HD', // "Аркомаг" name is well known in Russia in its RU version, since just like Gwent (known in Russia as Гвинт), it was first introduced as a minigame inside another game, so they had to translate the name

  DESC: 'Бесплатная и опенсорсная веб-версия игры Arcomage, выпущенной 3DO и New World Computing в 2000 году',

  'Please go to %s to view more information (including %s1), star the repo and follow %s2 there.':
    'Чтобы узнать больше (включая %s1), посетите %s, добавьте репозиторий в избранное и подпишитесь на %s2.',

  'the GitHub project page': 'страницу проекта на GitHub',

  'an informative tutorial image in English':
    'информативная учебная картинка на английском языке',

  'Game rules': 'Правила игры',

  GAMERULES: `Условия победы зависят от выбранной Таверны. Есть три способа - отстроить свою Башню до определенного уровня, накопить определенное количество ресурсов или уничтожить Башню противника.
Существует три типа ресурсов - Кирпичи, Самоцветы и Существа. Кирпичи обжигают в Карьере, Самоцветы создаются Магией, Существ разводят в Подземелье. На каждом источнике ресурсов есть две цифры. Маленькая черная цифра - то, сколько единиц этого ресурса есть у вас в данный момент. Большая желтая - то, сколько единиц этого ресурса вы получите в начале своего следующего хода.
Каждый ход вы можете сыграть одну карту или сбросить её с руки, пропустив ход. Чтобы сыграть, щелкните на ней левой клавишей, чтобы сбросить - правой. На каждой карте написана ее стоимость - в правом нижнем углу. Когда вы играете карту, вы расходуете указанное количество одного из ресурсов. На красные карты расходуются Кирпичи, на синие - Самоцветы, на зеленые - Существа.`,

  'With no usable or discardable card, your opponent has surrendered':
    'Если у противника нет возможности ни сыграть, ни сбросить карту, он автоматически сдается',
  'With no usable or discardable card, you have surrendered':
    'Если у вас нет возможности ни сыграть, ни сбросить карту, вы автоматически сдаетесь',

  'Please rotate your device to landscape mode':
    'Пожалуйста, поверните устройство в альбомный режим',
}
