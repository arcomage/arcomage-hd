import { DataCardsType, DataCardEffectPersonType } from '../types/dataCard'

const set = (
  person: DataCardEffectPersonType,
  prop: keyof DataCardEffectPersonType,
  to: number,
) => {
  person[prop] = to > 0 ? to : 0
}

const change = (
  person: DataCardEffectPersonType,
  prop: keyof DataCardEffectPersonType,
  diff: number,
) => {
  set(person, prop, person[prop] + diff)
}

const damage = (person: DataCardEffectPersonType, n: number) => {
  const d = person.wall - n
  change(person, 'wall', -n)
  if (d < 0) {
    change(person, 'tower', d)
  }
}

const cards: DataCardsType = [
  {
    // name: 'Brick Shortage',
    // desc: 'All players lose 8 bricks',
    type: 0,
    cost: 0,
    prob: 1,
    effect: (p, o) => {
      change(p, 'bricks', -8)
      change(o, 'bricks', -8)
    },
  },
  {
    // name: 'Lucky Cache',
    // desc: '+2 Bricks. +2 Gems. Play again',
    type: 0,
    cost: 0,
    prob: 1,
    special: { playagain: true },
    effect: (p, o) => {
      change(p, 'bricks', 2)
      change(p, 'gems', 2)
    },
  },
  {
    // name: 'Friendly Terrain',
    // desc: '+1 Wall. Play again',
    type: 0,
    cost: 1,
    prob: 2,
    special: { playagain: true },
    effect: (p, o) => {
      change(p, 'wall', 1)
    },
  },
  {
    // name: 'Miners',
    // desc: '+1 Quarry',
    type: 0,
    cost: 3,
    prob: 2,
    effect: (p, o) => {
      change(p, 'brickProd', 1)
    },
  },
  {
    // name: 'Mother Lode',
    // desc: 'If quarry < enemy quarry, +2 quarry. Else, +1 quarry',
    type: 0,
    cost: 4,
    prob: 1,
    effect: (p, o) => {
      if (p.brickProd < o.brickProd) {
        change(p, 'brickProd', 2)
      } else {
        change(p, 'brickProd', 1)
      }
    },
  },
  {
    // name: 'Dwarven Miners',
    // desc: '+4 Wall, +1 quarry',
    type: 0,
    cost: 7,
    prob: 1,
    effect: (p, o) => {
      change(p, 'wall', 4)
      change(p, 'brickProd', 1)
    },
  },
  {
    // name: 'Work Overtime',
    // desc: '+5 Wall. You lose 6 gems',
    type: 0,
    cost: 2,
    prob: 2,
    effect: (p, o) => {
      change(p, 'wall', 5)
      change(p, 'gems', -6)
    },
  },
  {
    // name: 'Copping the Tech',
    // desc: 'If quarry < enemy quarry, quarry = enemy quarry',
    type: 0,
    cost: 5,
    prob: 1,
    effect: (p, o) => {
      if (p.brickProd < o.brickProd) {
        set(p, 'brickProd', o.brickProd)
      }
    },
  },
  {
    // name: 'Basic Wall',
    // desc: '+3 Wall',
    type: 0,
    cost: 2,
    prob: 2,
    effect: (p, o) => {
      change(p, 'wall', 3)
    },
  },
  {
    // name: 'Sturdy Wall',
    // desc: '+4 Wall',
    type: 0,
    cost: 3,
    prob: 1,
    effect: (p, o) => {
      change(p, 'wall', 4)
    },
  },
  {
    // name: 'Innovations',
    // desc: "+1 To all player's quarrys, you gain 4 gems",
    type: 0,
    cost: 2,
    prob: 1,
    effect: (p, o) => {
      change(p, 'brickProd', 1)
      change(o, 'brickProd', 1)
      change(p, 'gems', 4)
    },
  },
  {
    // name: 'Foundations',
    // desc: 'If wall = 0, +6 wall, else +3 wall',
    type: 0,
    cost: 3,
    prob: 2,
    effect: (p, o) => {
      change(p, 'wall', p.wall === 0 ? 6 : 3)
    },
  },
  {
    // name: 'Tremors',
    // desc: 'All walls take 5 damage. Play again',
    type: 0,
    cost: 7,
    prob: 1,
    special: { playagain: true },
    effect: (p, o) => {
      change(p, 'wall', -5)
      change(o, 'wall', -5)
    },
  },
  {
    // name: 'Secret Room',
    // desc: '+1 Magic. Play again',
    type: 0,
    cost: 8,
    prob: 1,
    special: { playagain: true },
    effect: (p, o) => {
      change(p, 'gemProd', 1)
    },
  },
  {
    // name: 'Earthquake',
    // desc: "-1 To all player's quarrys",
    type: 0,
    cost: 0,
    prob: 1,
    effect: (p, o) => {
      change(p, 'brickProd', -1)
      change(o, 'brickProd', -1)
    },
  },
  {
    // name: 'Big Wall',
    // desc: '+6 Wall',
    type: 0,
    cost: 5,
    prob: 2,
    effect: (p, o) => {
      change(p, 'wall', 6)
    },
  },
  {
    // name: 'Collapse!',
    // desc: '-1 Enemy quarry',
    type: 0,
    cost: 4,
    prob: 1,
    effect: (p, o) => {
      change(o, 'brickProd', -1)
    },
  },
  {
    // name: 'New Equipment',
    // desc: '+2 Quarry',
    type: 0,
    cost: 6,
    prob: 1,
    effect: (p, o) => {
      change(p, 'brickProd', 2)
    },
  },
  {
    // name: 'Strip Mine',
    // desc: '-1 Quarry. +10 Wall. You gain 5 gems',
    type: 0,
    cost: 0,
    prob: 1,
    effect: (p, o) => {
      change(p, 'brickProd', -1)
      change(p, 'wall', 10)
      change(p, 'gems', 5)
    },
  },
  {
    // name: 'Reinforced Wall',
    // desc: '+8 Wall',
    type: 0,
    cost: 8,
    prob: 2,
    effect: (p, o) => {
      change(p, 'wall', 8)
    },
  },
  {
    // name: 'Porticulus',
    // desc: '+5 Wall, +1 dungeon',
    type: 0,
    cost: 9,
    prob: 1,
    effect: (p, o) => {
      change(p, 'wall', 5)
      change(p, 'recruitProd', 1)
    },
  },
  {
    // name: 'Crystal Rocks',
    // desc: '+7 Wall, gain 7 gems',
    type: 0,
    cost: 9,
    prob: 1,
    effect: (p, o) => {
      change(p, 'wall', 7)
      change(p, 'gems', 7)
    },
  },
  {
    // name: 'Harmonic Ore',
    // desc: '+6 Wall, +3 tower',
    type: 0,
    cost: 11,
    prob: 1,
    effect: (p, o) => {
      change(p, 'wall', 6)
      change(p, 'tower', 3)
    },
  },
  {
    // name: 'Mondo Wall',
    // desc: '+12 Wall',
    type: 0,
    cost: 13,
    prob: 1,
    effect: (p, o) => {
      change(p, 'wall', 12)
    },
  },
  {
    // name: 'Focused Designs',
    // desc: '+8 Wall, +5 tower',
    type: 0,
    cost: 15,
    prob: 1,
    effect: (p, o) => {
      change(p, 'wall', 8)
      change(p, 'tower', 5)
    },
  },
  {
    // name: 'Great Wall',
    // desc: '+15 Wall',
    type: 0,
    cost: 16,
    prob: 1,
    effect: (p, o) => {
      change(p, 'wall', 15)
    },
  },
  {
    // name: 'Rock Launcher',
    // desc: '+6 Wall. 10 Damage to enemy',
    type: 0,
    cost: 18,
    prob: 1,
    effect: (p, o) => {
      change(p, 'wall', 6)
      damage(o, 10)
    },
  },
  {
    // name: "Dragon's Heart",
    // desc: '+20 Wall. +8 Tower',
    type: 0,
    cost: 24,
    prob: 1,
    effect: (p, o) => {
      change(p, 'wall', 20)
      change(p, 'tower', 8)
    },
  },
  {
    // name: 'Forced Labor',
    // desc: '+9 Wall, lose 5 recruits',
    type: 0,
    cost: 7,
    prob: 1,
    effect: (p, o) => {
      change(p, 'wall', 9)
      change(p, 'recruits', -5)
    },
  },
  {
    // name: 'Rock Garden',
    // desc: '+1 Wall. +1 Tower. +2 Recruits',
    type: 0,
    cost: 1,
    prob: 1,
    effect: (p, o) => {
      change(p, 'wall', 1)
      change(p, 'tower', 1)
      change(p, 'recruits', 2)
    },
  },
  {
    // name: 'Flood Water',
    // desc: 'Player(s) w/lowest wall are -1 Dungeon and 2 damage to tower',
    type: 0,
    cost: 6,
    prob: 1,
    effect: (p, o) => {
      if (o.wall < p.wall) {
        change(o, 'recruitProd', -1)
        change(o, 'tower', -2)
      } else if (p.wall === o.wall) {
        change(o, 'recruitProd', -1)
        change(o, 'tower', -2)
        change(p, 'recruitProd', -1)
        change(p, 'tower', -2)
      } else {
        change(p, 'recruitProd', -1)
        change(p, 'tower', -2)
      }
    },
  },
  {
    // name: 'Barracks',
    // desc: '+6 Recruits, +6 wall. If dungeon < enemy dungeon, +1 dungeon',
    type: 0,
    cost: 10,
    prob: 1,
    effect: (p, o) => {
      change(p, 'recruits', 6)
      change(p, 'wall', 6)
      if (p.recruitProd < o.recruitProd) {
        change(p, 'recruitProd', 1)
      }
    },
  },
  {
    // name: 'Battlements',
    // desc: '+7 Wall, 6 damage to enemy',
    type: 0,
    cost: 14,
    prob: 1,
    effect: (p, o) => {
      change(p, 'wall', 7)
      damage(o, 6)
    },
  },
  {
    // name: 'Shift',
    // desc: 'Switch your wall with enemy wall',
    type: 0,
    cost: 17,
    prob: 1,
    effect: (p, o) => {
      const pWallOriginal = p.wall
      set(p, 'wall', o.wall)
      set(o, 'wall', pWallOriginal)
    },
  },
  {
    // name: 'Quartz',
    // desc: '+1 Tower. Play again',
    type: 1,
    cost: 1,
    prob: 2,
    special: { playagain: true },
    effect: (p, o) => {
      change(p, 'tower', 1)
    },
  },
  {
    // name: 'Smoky Quartz',
    // desc: '1 Damage to enemy tower. Play again',
    type: 1,
    cost: 2,
    prob: 1,
    special: { playagain: true },
    effect: (p, o) => {
      change(o, 'tower', -1)
    },
  },
  {
    // name: 'Amethyst',
    // desc: '+3 Tower',
    type: 1,
    cost: 2,
    prob: 2,
    effect: (p, o) => {
      change(p, 'tower', 3)
    },
  },
  {
    // name: 'Spell Weavers',
    // desc: '+1 Magic',
    type: 1,
    cost: 3,
    prob: 2,
    effect: (p, o) => {
      change(p, 'gemProd', 1)
    },
  },
  {
    // name: 'Prism',
    // desc: 'Draw 1 card. Discard 1 card. Play again',
    type: 1,
    cost: 2,
    prob: 1,
    special: { drawDiscardPlayagain: true },
    effect: (p, o) => {},
  },
  {
    // name: 'Lodestone',
    // desc: "+3 Tower. This card can't be discarded without playing it",
    type: 1,
    cost: 5,
    prob: 1,
    special: { undiscardable: true },
    effect: (p, o) => {
      change(p, 'tower', 3)
    },
  },
  {
    // name: 'Solar Flare',
    // desc: '+2 Tower. 2 Damage to enemy tower',
    type: 1,
    cost: 4,
    prob: 1,
    effect: (p, o) => {
      change(p, 'tower', 2)
      change(o, 'tower', -2)
    },
  },
  {
    // name: 'Crystal Matrix',
    // desc: '+1 Magic. +3 Tower. +1 Enemy tower',
    type: 1,
    cost: 6,
    prob: 1,
    effect: (p, o) => {
      change(p, 'gemProd', 1)
      change(p, 'tower', 3)
      change(o, 'tower', 1)
    },
  },
  {
    // name: 'Gemstone Flaw',
    // desc: '3 Damage to enemy tower',
    type: 1,
    cost: 2,
    prob: 2,
    effect: (p, o) => {
      change(o, 'tower', -3)
    },
  },
  {
    // name: 'Ruby',
    // desc: '+5 Tower',
    type: 1,
    cost: 3,
    prob: 2,
    effect: (p, o) => {
      change(p, 'tower', 5)
    },
  },
  {
    // name: 'Gem Spear',
    // desc: '5 Damage to enemy tower',
    type: 1,
    cost: 4,
    prob: 1,
    effect: (p, o) => {
      change(o, 'tower', -5)
    },
  },
  {
    // name: 'Power Burn',
    // desc: '5 Damage to your tower. +2 Magic',
    type: 1,
    cost: 3,
    prob: 1,
    effect: (p, o) => {
      change(p, 'tower', -5)
      change(p, 'gemProd', 2)
    },
  },
  {
    // name: 'Harmonic Vibe',
    // desc: '+1 Magic. +3 Tower. +3 Wall',
    type: 1,
    cost: 7,
    prob: 1,
    effect: (p, o) => {
      change(p, 'gemProd', 1)
      change(p, 'tower', 3)
      change(p, 'wall', 3)
    },
  },
  {
    // name: 'Parity',
    // desc: "All player's magic equals the highest player's magic",
    type: 1,
    cost: 7,
    prob: 1,
    effect: (p, o) => {
      const max = Math.max(o.gemProd, p.gemProd)
      set(p, 'gemProd', max)
      set(o, 'gemProd', max)
    },
  },
  {
    // name: 'Emerald',
    // desc: '+8 Tower',
    type: 1,
    cost: 6,
    prob: 2,
    effect: (p, o) => {
      change(p, 'tower', 8)
    },
  },
  {
    // name: 'Pearl of Wisdom',
    // desc: '+5 Tower. +1 Magic',
    type: 1,
    cost: 9,
    prob: 1,
    effect: (p, o) => {
      change(p, 'tower', 5)
      change(p, 'gemProd', 1)
    },
  },
  {
    // name: 'Shatterer',
    // desc: '-1 Magic. 9 Damage to enemy tower',
    type: 1,
    cost: 8,
    prob: 1,
    effect: (p, o) => {
      change(p, 'gemProd', -1)
      change(o, 'tower', -9)
    },
  },
  {
    // name: 'Crumblestone',
    // desc: '+5 Tower. Enemy loses 6 bricks',
    type: 1,
    cost: 7,
    prob: 1,
    effect: (p, o) => {
      change(p, 'tower', 5)
      change(o, 'bricks', -6)
    },
  },
  {
    // name: 'Sapphire',
    // desc: '+11 Tower',
    type: 1,
    cost: 10,
    prob: 2,
    effect: (p, o) => {
      change(p, 'tower', 11)
    },
  },
  {
    // name: 'Discord',
    // desc: '7 Damage to all towers, all players magic -1',
    type: 1,
    cost: 5,
    prob: 1,
    effect: (p, o) => {
      change(p, 'tower', -7)
      change(o, 'tower', -7)
      change(p, 'gemProd', -1)
      change(o, 'gemProd', -1)
    },
  },
  {
    // name: 'Fire Ruby',
    // desc: '+6 Tower. 4 Damage to enemy tower',
    type: 1,
    cost: 13,
    prob: 1,
    effect: (p, o) => {
      change(p, 'tower', 6)
      change(o, 'tower', -4)
    },
  },
  {
    // name: "Quarry's Help",
    // desc: '+7 Tower. Lose 10 bricks',
    type: 1,
    cost: 4,
    prob: 1,
    effect: (p, o) => {
      change(p, 'tower', 7)
      change(p, 'bricks', -10)
    },
  },
  {
    // name: 'Crystal Shield',
    // desc: '+8 Tower. +3 Wall',
    type: 1,
    cost: 12,
    prob: 1,
    effect: (p, o) => {
      change(p, 'tower', 8)
      change(p, 'wall', 3)
    },
  },
  {
    // name: 'Empathy Gem',
    // desc: '+8 Tower. +1 Dungeon',
    type: 1,
    cost: 14,
    prob: 1,
    effect: (p, o) => {
      change(p, 'tower', 8)
      change(p, 'recruitProd', 1)
    },
  },
  {
    // name: 'Diamond',
    // desc: '+15 Tower',
    type: 1,
    cost: 16,
    prob: 1,
    effect: (p, o) => {
      change(p, 'tower', 15)
    },
  },
  {
    // name: 'Sanctuary',
    // desc: '+10 Tower. +5 Wall, gain 5 recruits',
    type: 1,
    cost: 15,
    prob: 1,
    effect: (p, o) => {
      change(p, 'tower', 10)
      change(p, 'wall', 5)
      change(p, 'recruits', 5)
    },
  },
  {
    // name: 'Lava Jewel',
    // desc: '+12 Tower. 6 Damage to enemy',
    type: 1,
    cost: 17,
    prob: 1,
    effect: (p, o) => {
      change(p, 'tower', 12)
      damage(o, 6)
    },
  },
  {
    // name: "Dragon's Eye",
    // desc: '+20 Tower',
    type: 1,
    cost: 21,
    prob: 1,
    effect: (p, o) => {
      change(p, 'tower', 20)
    },
  },
  {
    // name: 'Crystallize',
    // desc: '+11 Tower. -6 Wall',
    type: 1,
    cost: 8,
    prob: 1,
    effect: (p, o) => {
      change(p, 'tower', 11)
      change(p, 'wall', -6)
    },
  },
  {
    // name: 'Bag of Baubles',
    // desc: 'If tower < enemy tower, +2 tower. Else +1 tower',
    type: 1,
    cost: 0,
    prob: 1,
    effect: (p, o) => {
      if (p.tower < o.tower) {
        change(p, 'tower', 2)
      } else {
        change(p, 'tower', 1)
      }
    },
  },
  {
    // name: 'Rainbow',
    // desc: '+1 Tower to all players. You gain 3 gems',
    type: 1,
    cost: 0,
    prob: 1,
    effect: (p, o) => {
      change(p, 'tower', 1)
      change(o, 'tower', 1)
      change(p, 'gems', 3)
    },
  },
  {
    // name: 'Apprentice',
    // desc: '+4 Tower, you lose 3 recruits, 2 damage to enemy tower',
    type: 1,
    cost: 5,
    prob: 1,
    effect: (p, o) => {
      change(p, 'tower', 4)
      change(p, 'recruits', -3)
      damage(o, 2)
    },
  },
  {
    // name: 'Lightning Shard',
    // desc: 'If Tower > enemy wall, 8 damage to enemy tower. Else 8 damage',
    type: 1,
    cost: 11,
    prob: 1,
    effect: (p, o) => {
      if (p.tower > o.wall) {
        change(o, 'tower', -8)
      } else {
        damage(o, 8)
      }
    },
  },
  {
    // name: 'Phase Jewel',
    // desc: '+13 Tower. +6 Recruits. +6 Bricks',
    type: 1,
    cost: 18,
    prob: 1,
    effect: (p, o) => {
      change(p, 'tower', 13)
      change(p, 'recruits', 6)
      change(p, 'bricks', 6)
    },
  },
  {
    // name: 'Mad Cow Disease',
    // desc: 'All players lose 6 recruits',
    type: 2,
    cost: 0,
    prob: 1,
    effect: (p, o) => {
      change(p, 'recruits', -6)
      change(o, 'recruits', -6)
    },
  },
  {
    // name: 'Faerie',
    // desc: '2 Damage. Play again',
    type: 2,
    cost: 1,
    prob: 2,
    special: { playagain: true },
    effect: (p, o) => {
      damage(o, 2)
    },
  },
  {
    // name: 'Moody Goblins',
    // desc: '4 Damage. You lose 3 gems',
    type: 2,
    cost: 1,
    prob: 2,
    special: {},
    effect: (p, o) => {
      damage(o, 4)
      change(p, 'gems', -3)
    },
  },
  {
    // name: 'Minotaur',
    // desc: '+1 Dungeon',
    type: 2,
    cost: 3,
    prob: 1,
    effect: (p, o) => {
      change(p, 'recruitProd', 1)
    },
  },
  {
    // name: 'Elven Scout',
    // desc: 'Draw 1 card. Discard 1 card. Play again',
    type: 2,
    cost: 2,
    prob: 1,
    special: { drawDiscardPlayagain: true },
    effect: (p, o) => {},
  },
  {
    // name: 'Goblin Mob',
    // desc: '6 Damage. You take 3 damage',
    type: 2,
    cost: 3,
    prob: 2,
    special: {},
    effect: (p, o) => {
      damage(o, 6)
      damage(p, 3)
    },
  },
  {
    // name: 'Goblin Archers',
    // desc: '3 Damage to enemy tower. You take 1 damage',
    type: 2,
    cost: 4,
    prob: 1,
    effect: (p, o) => {
      change(o, 'tower', -3)
      damage(p, 1)
    },
  },
  {
    // name: 'Shadow Faerie',
    // desc: '2 Damage to enemy tower. Play again',
    type: 2,
    cost: 6,
    prob: 1,
    special: { playagain: true },
    effect: (p, o) => {
      change(o, 'tower', -2)
    },
  },
  {
    // name: 'Orc',
    // desc: '5 Damage',
    type: 2,
    cost: 3,
    prob: 2,
    special: {},
    effect: (p, o) => {
      damage(o, 5)
    },
  },
  {
    // name: 'Dwarves',
    // desc: '4 Damage. +3 Wall',
    type: 2,
    cost: 5,
    prob: 2,
    effect: (p, o) => {
      damage(o, 4)
      change(p, 'wall', 3)
    },
  },
  {
    // name: 'Little Snakes',
    // desc: '4 Damage to enemy tower',
    type: 2,
    cost: 6,
    prob: 1,
    effect: (p, o) => {
      change(o, 'tower', -4)
    },
  },
  {
    // name: 'Troll Trainer',
    // desc: '+2 Dungeon',
    type: 2,
    cost: 7,
    prob: 2,
    effect: (p, o) => {
      change(p, 'recruitProd', 2)
    },
  },
  {
    // name: 'Tower Gremlin',
    // desc: '2 Damage. +4 Tower. +2 Wall',
    type: 2,
    cost: 8,
    prob: 1,
    effect: (p, o) => {
      damage(o, 2)
      change(p, 'tower', 4)
      change(p, 'wall', 2)
    },
  },
  {
    // name: 'Full Moon',
    // desc: "+1 to all player's dungeon. You gain 3 recruits",
    type: 2,
    cost: 0,
    prob: 1,
    effect: (p, o) => {
      change(p, 'recruitProd', 1)
      change(o, 'recruitProd', 1)
      change(p, 'recruits', 3)
    },
  },
  {
    // name: 'Slasher',
    // desc: '6 Damage',
    type: 2,
    cost: 5,
    prob: 1,
    effect: (p, o) => {
      damage(o, 6)
    },
  },
  {
    // name: 'Ogre',
    // desc: '7 Damage',
    type: 2,
    cost: 6,
    prob: 2,
    effect: (p, o) => {
      damage(o, 7)
    },
  },
  {
    // name: 'Rabid Sheep',
    // desc: '6 Damage. Enemy loses 3 recruits',
    type: 2,
    cost: 6,
    prob: 1,
    effect: (p, o) => {
      damage(o, 6)
      change(o, 'recruits', -3)
    },
  },
  {
    // name: 'Imp',
    // desc: '6 Damage. All players lose 5 bricks, gems and recruits',
    type: 2,
    cost: 5,
    prob: 1,
    effect: (p, o) => {
      damage(o, 6)
      change(p, 'bricks', -5)
      change(p, 'gems', -5)
      change(p, 'recruits', -5)
      change(o, 'bricks', -5)
      change(o, 'gems', -5)
      change(o, 'recruits', -5)
    },
  },
  {
    // name: 'Spizzer',
    // desc: 'If enemy wall = 0, 10 damage, else 6 damage',
    type: 2,
    cost: 8,
    prob: 1,
    effect: (p, o) => {
      if (o.wall === 0) {
        damage(o, 10)
      } else {
        damage(o, 6)
      }
    },
  },
  {
    // name: 'Werewolf',
    // desc: '9 Damage',
    type: 2,
    cost: 9,
    prob: 1,
    effect: (p, o) => {
      damage(o, 9)
    },
  },
  {
    // name: 'Corrosion Cloud',
    // desc: 'If enemy wall > 0, 10 damage, else 7 damage',
    type: 2,
    cost: 11,
    prob: 1,
    effect: (p, o) => {
      if (o.wall > 0) {
        damage(o, 10)
      } else {
        damage(o, 7)
      }
    },
  },
  {
    // name: 'Unicorn',
    // desc: 'If magic > enemy magic, 12 damage, else 8 damage',
    type: 2,
    cost: 9,
    prob: 1,
    effect: (p, o) => {
      if (p.gemProd > o.gemProd) {
        damage(o, 12)
      } else {
        damage(o, 8)
      }
    },
  },
  {
    // name: 'Elven Archers',
    // desc: 'If wall > enemy wall, 6 damage to enemy tower, else 6 damage',
    type: 2,
    cost: 10,
    prob: 1,
    effect: (p, o) => {
      if (p.wall > o.wall) {
        change(o, 'tower', -6)
      } else {
        damage(o, 6)
      }
    },
  },
  {
    // name: 'Succubus',
    // desc: '5 Damage to enemy tower, enemy loses 8 recruits',
    type: 2,
    cost: 14,
    prob: 1,
    effect: (p, o) => {
      change(o, 'tower', -5)
      change(o, 'recruits', -8)
    },
  },
  {
    // name: 'Rock Stompers',
    // desc: '8 Damage, -1 enemy quarry',
    type: 2,
    cost: 11,
    prob: 1,
    effect: (p, o) => {
      damage(o, 8)
      change(o, 'brickProd', -1)
    },
  },
  {
    // name: 'Thief',
    // desc: 'Enemy loses 10 gems, 5 bricks, you gain 1/2 amt. round up',
    type: 2,
    cost: 12,
    prob: 1,
    effect: (p, o) => {
      change(p, 'gems', Math.ceil((o.gems >= 10 ? 10 : o.gems) / 2))
      change(p, 'bricks', Math.ceil((o.bricks >= 5 ? 5 : o.bricks) / 2))
      change(o, 'gems', -10)
      change(o, 'bricks', -5)
    },
  },
  {
    // name: 'Stone Giant',
    // desc: '10 Damage. +4 Wall',
    type: 2,
    cost: 15,
    prob: 1,
    effect: (p, o) => {
      damage(o, 10)
      change(p, 'wall', 4)
    },
  },
  {
    // name: 'Vampire',
    // desc: '10 Damage. Enemy loses 5 recruits, -1 enemy dungeon',
    type: 2,
    cost: 17,
    prob: 1,
    effect: (p, o) => {
      damage(o, 10)
      change(o, 'recruits', -5)
      change(o, 'recruitProd', -1)
    },
  },
  {
    // name: 'Dragon',
    // desc: '20 Damage. Enemy loses 10 gems, -1 enemy dungeon',
    type: 2,
    cost: 25,
    prob: 1,
    effect: (p, o) => {
      damage(o, 20)
      change(o, 'gems', -10)
      change(o, 'recruitProd', -1)
    },
  },
  {
    // name: 'Spearman',
    // desc: 'If wall > enemy wall do 3 damage else do 2 damage',
    type: 2,
    cost: 2,
    prob: 1,
    effect: (p, o) => {
      if (p.wall > o.wall) {
        damage(o, 3)
      } else {
        damage(o, 2)
      }
    },
  },
  {
    // name: 'Gnome',
    // desc: '3 Damage. +1 Gem',
    type: 2,
    cost: 2,
    prob: 1,
    effect: (p, o) => {
      damage(o, 3)
      change(p, 'gems', 1)
    },
  },
  {
    // name: 'Berserker',
    // desc: '8 Damage. 3 Damage to your tower',
    type: 2,
    cost: 4,
    prob: 1,
    effect: (p, o) => {
      damage(o, 8)
      change(p, 'tower', -3)
    },
  },
  {
    // name: 'Warlord',
    // desc: '13 Damage. You lose 3 gems',
    type: 2,
    cost: 13,
    prob: 1,
    effect: (p, o) => {
      damage(o, 13)
      change(p, 'gems', -3)
    },
  },
  {
    // name: 'Pegasus Lancer',
    // desc: '12 Damage to enemy tower',
    type: 2,
    cost: 18,
    prob: 1,
    effect: (p, o) => {
      change(o, 'tower', -12)
    },
  },
]

export default cards
