import { ColorId, ColorRelationship, MirrorId, RelationshipType } from './types'

// Helper to create sorted key for 28 pairs
function pairKey(c1: ColorId, c2: ColorId): string {
  return [c1, c2].sort().join('-')
}

export const COLOR_RELATIONSHIPS_MAP: Record<string, ColorRelationship> = {
  // 1. white + purple
  [pairKey('white', 'purple')]: {
    colors: ['white', 'purple'],
    type: 'support',
    meaning: '清空杂念带来深层内观觉察。',
    dynamicStatement: '卸下成见后，直觉的洞见愈发清晰。',
  },
  // 2. white + blue
  [pairKey('white', 'blue')]: {
    colors: ['white', 'blue'],
    type: 'transition',
    meaning: '从彻底清空到重构清晰表达。',
    dynamicStatement: '在放下旧有预设后，才能讲出最纯粹真实的语言。',
  },
  // 3. white + pink
  [pairKey('white', 'pink')]: {
    colors: ['white', 'pink'],
    type: 'support',
    meaning: '放下执念后回归身心的温和接纳。',
    dynamicStatement: '释怀过往的消耗，给爱与喜悦留出滋养空间。',
  },
  // 4. white + green
  [pairKey('white', 'green')]: {
    colors: ['white', 'green'],
    type: 'transition',
    meaning: '彻底释放旧模式，开启生机盎然的新结构。',
    dynamicStatement: '旧篇章的终结正是新萌芽破土的起点。',
  },
  // 5. white + yellow
  [pairKey('white', 'yellow')]: {
    colors: ['white', 'yellow'],
    type: 'support',
    meaning: '在极简留白中建立精准的理性边界。',
    dynamicStatement: '删繁就简，让理性的衡量标准变得纯粹无瑕。',
  },
  // 6. white + orange
  [pairKey('white', 'orange')]: {
    colors: ['white', 'orange'],
    type: 'transition',
    meaning: '结束旧有动作，进入安静的蓄力休整期。',
    dynamicStatement: '清空当前的过度发力，在后台静候新的时机窗口。',
  },
  // 7. white + red
  [pairKey('white', 'red')]: {
    colors: ['white', 'red'],
    type: 'tension',
    meaning: '彻底放手与坚决推进之间的力量博弈。',
    dynamicStatement: '在“果断放弃”与“强力攻坚”之间存在拉扯。',
  },
  // 8. purple + blue
  [pairKey('purple', 'blue')]: {
    colors: ['purple', 'blue'],
    type: 'support',
    meaning: '内在直觉转化为外在清晰表达。',
    dynamicStatement: '心领神会，并能用准确客观的语言清晰传达。',
  },
  // 9. purple + pink
  [pairKey('purple', 'pink')]: {
    colors: ['purple', 'pink'],
    type: 'amplify',
    meaning: '觉察智慧与柔软共鸣的高频共振。',
    dynamicStatement: '以慈悲明澈的视角看待人事物，充满温润力量。',
  },
  // 10. purple + green
  [pairKey('purple', 'green')]: {
    colors: ['purple', 'green'],
    type: 'support',
    meaning: '看清深层规律从而进行优雅的结构调整。',
    dynamicStatement: '洞察全局架构后，微调手法即可顺势化解阻力。',
  },
  // 11. purple + yellow
  [pairKey('purple', 'yellow')]: {
    colors: ['purple', 'yellow'],
    type: 'support',
    meaning: '直觉洞见与严谨逻辑的完美互补。',
    dynamicStatement: '用直觉定大方向，用严谨理性制定推演步骤。',
  },
  // 12. purple + orange
  [pairKey('purple', 'orange')]: {
    colors: ['purple', 'orange'],
    type: 'support',
    meaning: '洞悉天时与节律，深谙从容等待之道。',
    dynamicStatement: '看清周期未至，能耐得住性子在暗处静观其变。',
  },
  // 13. purple + red
  [pairKey('purple', 'red')]: {
    colors: ['purple', 'red'],
    type: 'tension',
    meaning: '抽离观照与急切行动之间的张力。',
    dynamicStatement: '思考过于深远可能迟滞动作，而盲动又易破坏大局。',
  },
  // 14. blue + pink
  [pairKey('blue', 'pink')]: {
    colors: ['blue', 'pink'],
    type: 'support',
    meaning: '坦诚表达中蕴含着深切的关怀与共情。',
    dynamicStatement: '用最温柔的心，说最清晰真诚的话。',
  },
  // 15. blue + green
  [pairKey('blue', 'green')]: {
    colors: ['blue', 'green'],
    type: 'transition',
    meaning: '通过充分对话打破僵局，促成策略的灵活转向。',
    dynamicStatement: '沟通带来新信息，进而催生出全新的迭代路径。',
  },
  // 16. blue + yellow
  [pairKey('blue', 'yellow')]: {
    colors: ['blue', 'yellow'],
    type: 'support',
    meaning: '严密逻辑与精准表达的双重加持。',
    dynamicStatement: '条理极其分明，信息对齐高效且极具说服力。',
  },
  // 17. blue + orange
  [pairKey('blue', 'orange')]: {
    colors: ['blue', 'orange'],
    type: 'transition',
    meaning: '未到时机前先保持内部沟通与共识储备。',
    dynamicStatement: '在公开出牌之前，先在私下把关键信息全部校准。',
  },
  // 18. blue + red
  [pairKey('blue', 'red')]: {
    colors: ['blue', 'red'],
    type: 'transition',
    meaning: '从言语对话迅速升级为坚决的突破行动。',
    dynamicStatement: '说清事实后不再废话，用强有力的执行去落地。',
  },
  // 19. pink + green
  [pairKey('pink', 'green')]: {
    colors: ['pink', 'green'],
    type: 'support',
    meaning: '以愉悦温和的态度推动有机的自然生长。',
    dynamicStatement: '在轻松享受的氛围中，结构调整变得毫不费力。',
  },
  // 20. pink + yellow
  [pairKey('pink', 'yellow')]: {
    colors: ['pink', 'yellow'],
    type: 'tension',
    meaning: '情感关怀与冷酷理性标准之间的拉扯。',
    dynamicStatement: '在顾及情面与坚守铁律之间面临两难取舍。',
  },
  // 21. pink + orange
  [pairKey('pink', 'orange')]: {
    colors: ['pink', 'orange'],
    type: 'support',
    meaning: '在温润滋养的土壤中静待花开。',
    dynamicStatement: '给予彼此充分的情感耐心，不催熟、不拔苗助长。',
  },
  // 22. pink + red
  [pairKey('pink', 'red')]: {
    colors: ['pink', 'red'],
    type: 'tension',
    meaning: '温和接纳与刚烈进攻之间的反差。',
    dynamicStatement: '柔软的身心状态与刚硬的推进诉求产生激烈碰撞。',
  },
  // 23. green + yellow
  [pairKey('green', 'yellow')]: {
    colors: ['green', 'yellow'],
    type: 'support',
    meaning: '在理性边界之内进行富有弹性的敏捷调整。',
    dynamicStatement: '既有严谨的底线红线，又有极高的战术灵活性。',
  },
  // 24. green + orange
  [pairKey('green', 'orange')]: {
    colors: ['green', 'orange'],
    type: 'support',
    meaning: '在蓄势过程中不断微调自身姿态以适应当下。',
    dynamicStatement: '边等待边敏捷打磨，保持极佳的待发状态。',
  },
  // 25. green + red
  [pairKey('green', 'red')]: {
    colors: ['green', 'red'],
    type: 'tension',
    meaning: '灵活变通与蛮力硬推之间的策略冲突。',
    dynamicStatement: '明明只需调转方向，却习惯性选择用蛮力死磕。',
  },
  // 26. yellow + orange
  [pairKey('yellow', 'orange')]: {
    colors: ['yellow', 'orange'],
    type: 'support',
    meaning: '理性评估出手的最佳窗口期。',
    dynamicStatement: '冷静判断时令，在概率最高的关键时刻果断出手。',
  },
  // 27. yellow + red
  [pairKey('yellow', 'red')]: {
    colors: ['yellow', 'red'],
    type: 'transition',
    meaning: '理性推演完成后雷厉风行地执行。',
    dynamicStatement: '目标一旦确立便绝无犹豫，以极高效率执行到底。',
  },
  // 28. orange + red
  [pairKey('orange', 'red')]: {
    colors: ['orange', 'red'],
    type: 'tension',
    meaning: '耐性等待与急切行动之间的剧烈冲突。',
    dynamicStatement: '时机未成熟时的急于收割，往往会透支后续的潜能。',
  },
}

export function getColorRelationship(c1: ColorId, c2: ColorId): ColorRelationship {
  if (c1 === c2) {
    return {
      colors: [c1, c2],
      type: 'amplify',
      meaning: '同频共振与能量叠加。',
      dynamicStatement: '同一状态的强化往往使其特质变得尤为鲜明。',
    }
  }
  const key = pairKey(c1, c2)
  return (
    COLOR_RELATIONSHIPS_MAP[key] || {
      colors: [c1, c2],
      type: 'neutral',
      meaning: '两两状态相互观照。',
      dynamicStatement: '在不同维度上提供互补视角。',
    }
  )
}

export const KEY_MIRROR_PAIRS: Array<{
  source: MirrorId
  target: MirrorId
  label: string
  weight: number
}> = [
  { source: 'block', target: 'key', label: '阻碍 ↔ 钥匙', weight: 1.0 },
  { source: 'core', target: 'key', label: '核心 ↔ 钥匙', weight: 0.9 },
  { source: 'mind', target: 'emotion', label: '心念 ↔ 情绪', weight: 0.85 },
  { source: 'action', target: 'reality', label: '行动 ↔ 现实', weight: 0.8 },
  { source: 'relation', target: 'emotion', label: '人际 ↔ 情绪', weight: 0.75 },
  { source: 'core', target: 'mind', label: '核心 ↔ 心念', weight: 0.7 },
  { source: 'core', target: 'emotion', label: '核心 ↔ 情绪', weight: 0.7 },
  { source: 'reality', target: 'key', label: '现实 ↔ 钥匙', weight: 0.7 },
]
