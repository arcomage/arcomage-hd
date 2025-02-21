export const i18n = {
  tower: '塔',
  wall: '壁',
  resource: '資源',

  brick: 'レンガ',
  bricks: 'レンガ',
  gem: '宝石',
  gems: '宝石',
  recruit: '怪獣',
  recruits: '怪獣',

  quarry: '採石場', // i.e. brick production
  magic: '魔法', // i.e. gem production
  dungeon: 'ダンジョン', // i.e. recruit production

  'Your %s': 'あなたの%s', // Your quarry/tower
  "Opponent's %s": '相手の%s', // Opponent's quarry/tower

  '1 brick': '1つのレンガ',
  '%s bricks': '%sつのレンガ', // 3 bricks
  '1 gem': '1つの宝石',
  '%s gems': '%sつの宝石', // 3 gems
  '1 recruit': '1体の怪獣',
  '%s recruits': '%s体の怪獣', // 3 recruits

  'This card costs %s': 'このカードのコストは%sです', // This card costs 3 bricks
  allUnusableTip:
    'すべてのカードは使用不可です。カードを右クリックまたは長押しして破棄する必要があります',

  // %ss = 'brick', %sp = 'bricks'
  'Your %sp': 'あなたの%sp', // Your bricks
  "Opponent's %sp": '相手の%sp', // Opponent's bricks

  '%s1. Reach %s2 to win': '%s1。勝つために%s2に到達する', // Your tower/bricks/gems/recruits = n. Reach 100 to win

  // %s = 'quarry', %ss = 'brick', %sp = 'bricks'
  '%s (%ss production)': '%s（%ssの生産）', // quarry (brick production)

  discarded: '廃棄',
  'Discard a card': 'カードを捨てる',

  'You Win!': '勝利！',
  'You Lose!': '負け！',
  'Tie Game': '引き分け',

  '%s has reached the victory condition': '%sは勝利条件に達しました', // %s = 'Your tower', "Opponent's tower"
  '%s have reached the victory condition': '%sは勝利条件に達しました', // %s = 'Your bricks', "Opponent's bricks", "Your gems", ...
  'Your opponent has no tower left': '対戦相手にはタワーが残っていません',
  'You have no tower left': 'あなたにはタワーが残っていません',

  'Review cards': 'カードを確認する',
  'Hide cards': 'カードを隠す',

  '. ': '。',

  Preferences: '設定',
  ': ': '：',
  'Your Name': 'あなたの名前',
  "Opponent's Name": '相手の名前',

  'Choose a Tavern (Preset Preferences)': '居酒屋を選ぶ（プリセット設定）',
  'Castle in Enroth': 'エンロスの城',
  Antagarich: 'アンタガリッチ',
  Jadame: 'ジャデイム',
  Default: 'デフォルト',
  Customized: 'カスタマイズ',

  'Starting Conditions': '開始条件',
  'Victory Conditions': '勝利条件',

  'Minimum is starting %s1 + 1 = %s0': '最小値は開始%s1 + 1 = %s0',
  'Minimum is MAX(%s1+%s2, %s3+%s4, %s5+%s6) + 1 = %s0':
    '最小値は MAX(%s1+%s2, %s3+%s4, %s5+%s6) + 1 = %s0',

  'Other Preferences': 'その他の設定',
  'Cards in Hand': '手札のカード数',

  'AI Level': 'AIレベル',
  Genius: '天才',
  Smart: '賢い',
  Mediocre: '平凡',
  Stupid: 'バカ',
  Idiotic: '白痴',

  Multiplayer: '対戦モード',
  off: '無効',
  on: '有効',
  'Your ID': 'あなたのID',
  "Enter your opponent's ID": '相手のIDを入力する',
  Connect: '接続',
  Copy: 'コピー',
  'Copied 📋✅': 'コピー済み 📋✅',

  'Connecting to the network ⌛': 'ネットワークに接続する ⌛',
  'Connected to the network (but not to anyone) 🟡':
    'ネットワークに接続され（誰にも接続されていません） 🟡',
  'Connecting to ID %s ⌛': 'ID %s に接続 ⌛',
  "Connected to ID %s ✅ You're the host 🏠":
    'ID %s に接続 ✅ あなたはホスト 🏠',
  "Connected by ID %s ✅ You're the guest 💼":
    'ID %s で接続 ✅ あなたはゲスト 💼',
  'Connection failed ❌': '接続に失敗しました ❌',
  'Disconnected 🔌': '切断されました 🔌',
  'You are playing against computer AI':
    'あなたはコンピューターAIと対戦しています',
  'You are playing against human': 'あなたは人間と対戦しています',

  'You and your opponent are disconnected. Please go to "Preferences" and start a new game.':
    'あなたとあなたの相手は切断されています。「設定」に移動して、新しいゲームを開始してください。',

  'Multiplayer Mode is experimental and works only for users behind non-symmetric NAT':
    '対戦モードは実験的なものであり、非対称NATの背後にいるユーザーに対してのみ機能します',

  Reset: 'リセット',
  'Apply & New Game': '適用＆新しいゲームを開始',
  Cancel: 'キャンセル',

  Language: '言語',

  'Sound & Graphics': '音と視覚',
  Sound: '音',
  Volume: '音量',
  Mute: 'ミュート',
  'Stereo Sound': '立体音',
  Graphics: '視覚',
  'Disable animation': 'アニメーションを無効にする',
  Pixelation: 'ピクセル化',
  'Visual Preset': '視覚プリセット',
  'Filter may slow down the game': 'フィルターでゲームが遅くなることがある',

  Normal: '通常',
  Vibrant: '鮮やか',
  'Black and white': '黒白',
  Nostalgia: '懐かしさ',
  Bright: '明るい',
  Dark: '暗い',

  Brightness: '輝度',
  Contrast: '対比',
  Grayscale: 'グレースケール',
  Sepia: 'セピア',
  Saturate: '飽和する',
  Hue: '色相',
  Invert: '反転',
  Opacity: '不透明度',

  Twist: 'ねじれ',
  Grain: '粒状',

  Filters: 'フィルタ',

  Help: 'ヘルプ',
  'Toggle Full Screen': 'フルスクリーン切り替え',
  GitHub: 'GitHub',

  'Bold font': '太字フォント',
  ERATHIAN: 'エラシアン文字 %s を使用します（ラテン文字の言語のみ）',

  'ArcoMage HD': 'アーコメイジHD',

  DESC: '3DOおよびNWCの2000カードゲームArcomageのWebベースの無料のオープンソース高解像度クローン',

  'Please go to %s to view more information (including %s1), star the repo and follow %s2 there.':
    '%sに移動して詳細情報（%s1を含む）を表示し、リポジトリにスターを付けて、そこで%s2をフォローしてください。',

  'the GitHub project page': 'GitHubプロジェクトページ',

  'an informative tutorial image in English': '英語の有益なチュートリアル画像',

  'Game rules': 'ゲームのルール',

  GAMERULES: `勝利条件は居酒屋ごとに異なります。敵がやる前に、塔を建てたり、敵の塔を破壊したり、十分な資源を集めたりしてください。
列の大きな黄色の数字は作品です。これは、次のターンに受け取る特定のリソースの新しいユニットの数です。列の小さな黒い数字がリソースです。これは、あなたが現在のターンに費やすことができるユニットの数です。
カード：カードの右下隅にある小さな円で示されているように、それぞれに独自のプレイコストがあります。費用はカードの色に応じてリソースから差し引かれます。カードを左クリックすると、カードが再生されます。カードを右クリックして、プレイせずに捨てます。
赤はブリックリソースを生成する採石場ジェネレーターを表し、青は宝石リソースを生成する魔法ジェネレーターを表し、緑は怪獣リソースを生成するダンジョンジェネレーターを表します。`,

  'With no usable or discardable card, your opponent has surrendered':
    '使用可能または破棄可能なカードがないため、相手は降伏しました',
  'With no usable or discardable card, you have surrendered':
    '使用可能または廃棄可能なカードがないため、あなたは降伏しました',
  'With no usable or discardable card, you must surrender. Open the "%s1" window and click "%s2" (or ask your opponent to do so)':
    '使用可能または廃棄可能なカードがないため、降伏する必要があります。「%s1」ウィンドウを開いて「%s2」をクリックしてください (または相手にそうするように依頼してください)',
  // %s1 and %s2 do not need to be translated. %s1 = 'Preferences' ; %s2 = 'Apply & New Game'

  'Please rotate your device to landscape mode':
    'デバイスを横向きモードに回転させてください',
}
