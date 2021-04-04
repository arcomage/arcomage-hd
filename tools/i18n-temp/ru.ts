export const i18n = {
  tower: 'Башня',
  wall: 'Стена',
  resource: 'Ресурс', // where is this used? couldn't find

  bricks: 'Камень', 
  gems: 'Самоцветы',
  recruits: 'Существа', 

  quarry: 'Карьер', 
  magic: 'Магия',
  dungeon: 'Подземелье', // i wonder what kind of recruits you can get in a dungeon ;)

  discarded: 'сброшена',
  'Discard a card': 'Сбросить карту',

  'You Win!': 'Вы победили!',
  'You Lose!': 'Вы проиграли!',
  'Tie Game': 'Ничья!',

  Preferences: 'Настройки',
  'Your Name:': 'Ваше имя:',
  "Opponent's Name:": "Имя противника:",
  'Choose a Tavern (Preset Preferences):':
    'Выберите Таверну (набор настроек):',
  Default: 'По умолчанию',
  Customized: 'Пользовательская',
  'Starting Conditions': 'Стартовые условия',
  'Victory Conditions': 'Условия победы',
  'Other Preferences': 'Другие настройки',
  'Cards in Hand': 'Карт в руке',
  'AI Type': 'Тип ИИ', // couldn't find ingame
  'Apply & New Game': 'Применить и начать игру', // 7 symbols longer, may want to use just "Начать игру!" instead if the button doesn't stretch
  Cancel: 'Отмена',

  Language: 'Язык',
  Volume: 'Громкость',
  Mute: 'Заглушить',
  Help: 'Помощь',
  'Toggle Full Screen': 'Полноэкранный режим',

  ERATHIAN: 'Использовать Эрафийский [%s] (только для латиницы)', //probably not needed in RU locale at all

  'ArcoMage HD': 'Аркомаг HD', // "Аркомаг" name is well known in Russia in its RU version, since just like Gwent (known in Russia as Гвинт), it was first introduced as a minigame inside another game, so they had to translate the name  

  DESC:
    "опенсорсная веб-версия игры Arcomage, выпущенной 3DO и New World Computing в 2000 году", //name already mentions it's HD, and "Arcomage" fits perfectly here in english

  'Please go to %s to view more information, star the repo and follow %s there.':
    'Чтобы узнать больше, посетите %s, добавьте репозиторий в избранное и подпишитесь на %s.',

  'the GitHub project page': 'страницу проекта на GitHub',

  'Below is a brief presentation of the rules:':
    'Правила игры:', // because full is too long here "Ниже вы можете найти краткое изложение правил:", and pretty pointless too, might even want to shorten it in source lang

  GAMERULES: `Условия победы зависят от выбранной Таверны. Есть три способа - отстроить свою Башню до определенного уровня, накопить определенное количество ресурсов или уничтожить Башню противника.
Существует три типа ресурсов - Камень, Самоцветы и Существа. Камень добывают в Карьере, Самоцветы создаются Магией, Существ разводят в Подземелье. На каждом источнике ресурсов есть две цифры. Маленькая черная цифра - то, сколько единиц этого ресурса есть у вас в данный момент. Большая желтая - то, сколько единиц этого ресурса вы получите в начале своего следующего хода.
Каждый ход вы можете сыграть одну карту или сбросить её с руки, пропустив ход. Чтобы сыграть, щелкните на ней левой клавишей, чтобы сбросить - правой. На каждой карте написана ее стоимость - в правом нижнем углу. Когда вы играете карту, вы расходуете указанное количество одного из ресурсов. На красные карты расходуется Камень, на синие - Самоцветы, на зеленые - Существа.`,

  'With no usable or discardable card, your opponent has surrendered':
    'With no usable or discardable card, your opponent has surrendered',
  'With no usable or discardable card, you have surrendered':
    'With no usable or discardable card, you have surrendered',
}
