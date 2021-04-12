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

  'Your %s': 'Твой %s', // Your quarry/tower
  "Opponent's %s": 'карьер %s', // Opponent's quarry/tower

  // %ss = 'brick', %sp = 'bricks'
  'Your %sp': 'Ваши %sp', // Your bricks
  "Opponent's %sp": 'кирпичи %sp', // Opponent's bricks

  // %s = 'quarry', %ss = 'brick', %sp = 'bricks'
  '%s (%ss production)': '%s (%ss производство)', // quarry (brick production)

  // %ss = 'brick', %sp = 'bricks'
  'This card costs %s': 'Эта карта стоит %s', // This card costs 3 bricks

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
  Default: 'По умолчанию',
  Customized: 'Пользовательская',
  'Starting Conditions': 'Стартовые условия',
  'Victory Conditions': 'Условия победы',
  'Other Preferences': 'Другие настройки',
  'Cards in Hand': 'Карт в руке',
  'AI Type': 'Тип ИИ',
  'Apply & New Game': 'Применить и начать игру', // or "Начать игру!"
  Cancel: 'Отмена',

  Language: 'Язык',
  Volume: 'Громкость',
  Mute: 'Заглушить',
  Help: 'Помощь',
  'Toggle Full Screen': 'Полноэкранный режим',

  ERATHIAN: 'Использовать Эрафийский [%s] (только для латиницы)',

  'ArcoMage HD': 'Аркомаг HD', // "Аркомаг" name is well known in Russia in its RU version, since just like Gwent (known in Russia as Гвинт), it was first introduced as a minigame inside another game, so they had to translate the name

  DESC:
    'опенсорсная веб-версия игры Arcomage, выпущенной 3DO и New World Computing в 2000 году',

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
