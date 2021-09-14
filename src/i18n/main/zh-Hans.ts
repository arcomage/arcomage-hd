export const i18n = {
  tower: '城堡',
  wall: '城墙',
  resource: '资源',

  brick: '砖头',
  bricks: '砖头',
  gem: '宝石',
  gems: '宝石',
  recruit: '怪物',
  recruits: '怪物',

  quarry: '砖头产量', // i.e. brick production
  magic: '宝石产量', // i.e. gem production
  dungeon: '怪物产量', // i.e. recruit production

  'Your %s': '你的%s', // Your quarry/tower
  "Opponent's %s": '对手的%s', // Opponent's quarry/tower

  '1 brick': '1块砖头',
  '%s bricks': '%s块砖头', // 3 bricks
  '1 gem': '1颗宝石',
  '%s gems': '%s颗宝石', // 3 gems
  '1 recruit': '1头怪物',
  '%s recruits': '%s头怪物', // 3 recruits

  'This card costs %s': '打这张牌将消耗%s', // This card costs 3 bricks

  // %ss = 'brick', %sp = 'bricks'
  'Your %sp': '你的%sp', // Your bricks
  "Opponent's %sp": '对手的%sp', // Opponent's bricks

  '%s1. Reach %s2 to win': '%s1。达到%s2即可胜利', // Your tower/bricks/gems/recruits. Reach 100 to win

  // %s = 'quarry', %ss = 'brick', %sp = 'bricks'
  '%s (%ss production)': '%s', // quarry (brick production)

  discarded: '弃牌',
  'Discard a card': '丢弃一张牌',

  'You Win!': '你赢了!',
  'You Lose!': '你输了!',
  'Tie Game': '握手言和',

  Preferences: '设置',
  ': ': '：',
  'Your Name': '你的名字',
  "Opponent's Name": '对手名字',
  'Choose a Tavern (Preset Preferences)': '选择酒馆（预设设置）',
  Default: '默认',
  Customized: '自定义',
  'Starting Conditions': '起始条件',
  'Victory Conditions': '胜利条件',
  'Other Preferences': '其他设置',
  'Cards in Hand': '手中牌数量',
  'AI Type': 'AI类型',

  Multiplayer: '二人对战模式',
  off: '停用',
  on: '启用',
  'Your ID': '你的ID',
  "Enter your opponent's ID": '输入对手ID',
  Connect: '连接',
  'Copied 📋✔️': '已复制 📋✔️',

  'Connecting to the network ⌛': '正在连接到网络 ⌛',
  'Connected to the network (but not to anyone) ✔️':
    '已连接到网络（但未连接任何人） ✔️',
  'Connecting to ID %s ⌛': '正在连接到ID %s ⌛',
  "Connected to ID %s ✔️ You're the host 🏠": '已连接到ID %s ✔️ 你是主机 🏠',
  "Connected by ID %s ✔️ You're the guest 💼": '已连接到ID %s ✔️ 你是客户机 💼',
  'Connection failed ❌': '连接失败 ❌',
  'Disconnected 🔌': '连接断开 🔌',
  'You are playing against computer AI': '你正在对战电脑AI',
  'You are playing against human': '你正在对战网友',

  'You and your opponent are disconnected. Please go to "Preferences" and start a new game.':
    '你和对手已断开连接。请进入“设置”窗口并开始新游戏。',

  'Multiplayer Mode is experimental and works only for users behind non-symmetric NAT':
    '二人对战模式是测试版，只对非对称NAT用户有效',

  Reset: '重置',
  'Apply & New Game': '应用设置并新开一局',
  Cancel: '取消',

  Language: '语言',
  Volume: '音量',
  Mute: '静音',
  Help: '帮助',
  'Toggle Full Screen': '切换全屏模式',

  ERATHIAN: '使用埃拉西亚文字 [%s]（只对拉丁字母有效）',

  'ArcoMage HD': '魔幻牌HD',

  DESC: 'Web 浏览器版本的 3DO/NWC 2000年卡牌游戏魔幻牌的开源高清克隆',

  'Please go to %s to view more information (including %s1), star the repo and follow %s2 there.':
    '请访问%s查看更多信息（包括%s1），欢迎给其加星并关注%s2。',

  'the GitHub project page': 'GitHub项目页面',

  'an informative tutorial image in English': '游戏界面英文示意图',

  'Game rules': '以下是游戏规则',

  GAMERULES: `每个旅店玩牌的胜利条件各不相同。反正就是要把自己的城堡造好，摧毁对方的城堡，或者赶在对手之前收集到足够的资源。
黄色的大数字是产量计数器，它代表你们下个回合可以得到的资源的数量。黑色的小数字表示现有资源，也就是本回合你们可以使用的资源数量。
牌：每张牌右下角小圆圈里面的数字表明它的资源消耗量。消耗的资源种类由每张牌的颜色而定。左键点击一张牌即可出牌。右键点击一张牌表示弃牌。
红色的“采石场”生产砖头，蓝色的“魔法阵”生产宝石，绿色的“地下城”生产怪物。`,

  'With no usable or discardable card, your opponent has surrendered':
    '没有任何牌可以使用或丢弃，你的对手被迫投降了',
  'With no usable or discardable card, you have surrendered':
    '没有任何牌可以使用或丢弃，你被迫投降了',

  'Please rotate your device to landscape mode': '请将您的设备旋转到横向模式',
}
