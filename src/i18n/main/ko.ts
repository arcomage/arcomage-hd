export const i18n = {
  tower: '탑',
  wall: '성벽',
  resource: '자원',

  brick: '벽돌',
  bricks: '벽돌',
  gem: '보석',
  gems: '보석',
  recruit: '병사',
  recruits: '병사',

  quarry: '채석장', // i.e. brick production
  magic: '마법', // i.e. gem production
  dungeon: '던전', // i.e. recruit production

  'Your %s': '당신의 %s', // Your quarry/tower
  "Opponent's %s": '상대의 %s', // Opponent's quarry/tower

  '1 brick': '벽돌 1개',
  '%s bricks': '벽돌 %s개', // 3 bricks
  '1 gem': '보석 1개',
  '%s gems': '보석 %s개', // 3 gems
  '1 recruit': '병사 1명',
  '%s recruits': '병사 %s명', // 3 recruits

  'This card costs %s': '이 카드는 %s가 필요합니다', // This card costs 3 bricks
  allUnusableTip:
    '모든 카드를 사용할 수 없습니다. 카드를 우클릭하거나 길게 눌러서 버려야 합니다',

  // %ss = 'brick', %sp = 'bricks'
  'Your %sp': '당신의 %sp', // Your bricks
  "Opponent's %sp": '상대의 %sp', // Opponent's bricks

  '%s1. Reach %s2 to win': '%s1. %s2에 도달하면 승리합니다', // Your tower/bricks/gems/recruits = n. Reach 100 to win

  // %s = 'quarry', %ss = 'brick', %sp = 'bricks'
  '%s (%ss production)': '%s (%ss 생산)', // quarry (brick production)

  discarded: '버려짐',
  'Discard a card': '카드 버리기',

  'You Win!': '승리!',
  'You Lose!': '패배!',
  'Tie Game': '무승부',

  '%s has reached the victory condition': '%s가 승리 조건에 도달했습니다', // %s = 'Your tower', "Opponent's tower"
  '%s have reached the victory condition': '%s가 승리 조건에 도달했습니다', // %s = 'Your bricks', "Opponent's bricks", "Your gems", ...
  'Your opponent has no tower left': '상대의 탑이 남아있지 않습니다',
  'You have no tower left': '당신의 탑이 남아있지 않습니다',

  'Review cards': '카드 검토',
  'Hide cards': '카드 숨기기',

  '. ': '. ',

  Preferences: '설정',
  ': ': ': ',
  'Your Name': '당신의 이름',
  "Opponent's Name": '상대의 이름',

  'Choose a Tavern (Preset Preferences)': '선술집 선택 (사전 설정)',
  'Castle in Enroth': '엔로스의 성',
  Antagarich: '안타가리치',
  Jadame: '자데임',
  Default: '기본값',
  Customized: '사용자 지정',

  'Starting Conditions': '시작 조건',
  'Victory Conditions': '승리 조건',

  'Minimum is starting %s1 + 1 = %s0': '최소값은 시작 %s1 + 1 = %s0',
  'Minimum is MAX(%s1+%s2, %s3+%s4, %s5+%s6) + 1 = %s0':
    '최소값은 MAX(%s1+%s2, %s3+%s4, %s5+%s6) + 1 = %s0',

  'Other Preferences': '기타 설정',
  'Cards in Hand': '손에 든 카드',

  'AI Level': 'AI 난이도',
  Genius: '천재',
  Smart: '똑똑함',
  Mediocre: '평범함',
  Stupid: '어리석음',
  Idiotic: '바보',

  Multiplayer: '멀티플레이어',
  off: '끄기',
  on: '켜기',
  'Your ID': '당신의 ID',
  "Enter your opponent's ID": '상대의 ID 입력',
  Connect: '연결',
  Copy: '복사',
  'Copied 📋✅': '복사됨 📋✅',

  'Connecting to the network ⌛': '네트워크에 연결 중 ⌛',
  'Connected to the network (but not to anyone) 🟡':
    '네트워크에 연결됨 (하지만 아무와도 연결되지 않음) 🟡',
  'Connecting to ID %s ⌛': 'ID %s에 연결 중 ⌛',
  "Connected to ID %s ✅ You're the host 🏠":
    'ID %s에 연결됨 ✅ 당신이 호스트입니다 🏠',
  "Connected by ID %s ✅ You're the guest 💼":
    'ID %s로 연결됨 ✅ 당신이 게스트입니다 💼',
  'Connection failed ❌': '연결 실패 ❌',
  'Disconnected 🔌': '연결 끊김 🔌',
  'You are playing against computer AI': '컴퓨터 AI와 플레이 중입니다',
  'You are playing against human': '인간과 플레이 중입니다',

  'You and your opponent are disconnected. Please go to "Preferences" and start a new game.':
    '당신과 상대가 연결이 끊어졌습니다. "설정"으로 가서 새 게임을 시작하세요.',

  'Multiplayer Mode is experimental and works only for users behind non-symmetric NAT':
    '멀티플레이어 모드는 실험적이며 비대칭 NAT 뒤에 있는 사용자에게만 작동합니다',

  Reset: '재설정',
  'Apply & New Game': '적용 및 새 게임',
  Cancel: '취소',

  Language: '언어',

  'Sound & Graphics': '사운드 및 그래픽',
  Sound: '사운드',
  Volume: '볼륨',
  Mute: '음소거',
  'Stereo Sound': '스테레오 사운드',
  Graphics: '그래픽',
  'Disable animation': '애니메이션 비활성화',
  Pixelation: '픽셀화',
  'Visual Preset': '시각 프리셋',
  'Filter may slow down the game': '필터가 게임을 느리게 할 수 있습니다',

  Normal: '일반',
  Vibrant: '생생함',
  'Black and white': '흑백',
  Nostalgia: '향수',
  Bright: '밝음',
  Dark: '어둠',

  Brightness: '밝기',
  Contrast: '대비',
  Grayscale: '그레이스케일',
  Sepia: '세피아',
  Saturate: '채도',
  Hue: '색상',
  Invert: '반전',
  Opacity: '불투명도',

  Twist: '비틀기',
  Grain: '그레인',

  Filters: '필터',

  Help: '도움말',
  'Toggle Full Screen': '전체 화면 전환',
  GitHub: 'GitHub',

  'Bold font': '굵은 글꼴',
  ERATHIAN: '에라시안 문자 %s 사용 (라틴 문자 언어만)',

  'ArcoMage HD': '아르코메이지 HD',

  DESC: '3DO와 NWC의 2000년 카드 게임 아르코메이지의 웹 기반 무료 오픈소스 HD 클론',

  'Please go to %s to view more information (including %s1), star the repo and follow %s2 there.':
    '더 많은 정보(포함: %s1)를 보려면 %s로 가서 저장소에 별표를 달고 %s2를 팔로우하세요.',

  'the GitHub project page': 'GitHub 프로젝트 페이지',

  'an informative tutorial image in English':
    '영어로 된 정보 제공 튜토리얼 이미지',

  'Game rules': '게임 규칙',

  GAMERULES: `승리 조건은 선술집마다 다릅니다. 상대보다 먼저 탑을 건설하거나, 상대의 탑을 파괴하거나, 충분한 자원을 수집하세요.
열의 큰 노란색 숫자는 생산량입니다. 이것은 다음 턴에 받을 특정 자원의 새로운 단위 수입니다. 열의 작은 검은색 숫자는 자원입니다. 이것은 현재 턴에 사용할 수 있는 단위 수입니다.
카드: 각 카드는 플레이하는 데 비용이 있으며, 카드 오른쪽 하단 모서리의 작은 원으로 표시됩니다. 비용은 카드의 색상에 따라 자원에서 공제됩니다. 카드를 왼쪽 클릭하면 카드를 플레이합니다. 카드를 오른쪽 클릭하면 플레이하지 않고 버립니다.
빨간색은 벽돌 자원을 생산하는 채석장 생성기를 나타내고, 파란색은 보석 자원을 생산하는 마법 생성기를 나타내며, 녹색은 병사 자원을 생산하는 던전 생성기를 나타냅니다.`,

  'With no usable or discardable card, your opponent has surrendered':
    '사용 가능하거나 버릴 수 있는 카드가 없어 상대가 항복했습니다',
  'With no usable or discardable card, you have surrendered':
    '사용 가능하거나 버릴 수 있는 카드가 없어 당신이 항복했습니다',
  'With no usable or discardable card, you must surrender. Open the "%s1" window and click "%s2" (or ask your opponent to do so)':
    '사용 가능하거나 버릴 수 있는 카드가 없어 항복해야 합니다. "%s1" 창을 열고 "%s2"를 클릭하세요 (또는 상대에게 요청하세요)',
  // %s1 and %s2 do not need to be translated. %s1 = 'Preferences' ; %s2 = 'Apply & New Game'

  'Please rotate your device to landscape mode':
    '기기를 가로 모드로 회전하세요',
}
