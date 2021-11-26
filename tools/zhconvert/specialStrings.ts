// zh hans to hant customized conversion. Proceeded before opencc conversion
// <hans>: <hans or hant>
export const specialStrings: Record<string, string> = {
  魔幻牌: '圆法师',
  砖头: '砖块',
  怪物: '魔兽',
  城堡: '塔楼',
  恩洛斯: '安罗斯',
  贾丹姆: '贾达密',
}

// zh hans to hant customized conversion. Proceeded after opencc conversion
// <hant>: <hant>
export const specialStringsAfter: Record<string, string> = {
  裝置: '設備',
  安羅斯的塔樓: '安羅斯的城堡',
  碎巖: '碎岩',
}
