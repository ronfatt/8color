export type ColorId =
  | 'white'
  | 'purple'
  | 'blue'
  | 'pink'
  | 'green'
  | 'yellow'
  | 'orange'
  | 'red'

export type MirrorId =
  | 'core'
  | 'mind'
  | 'emotion'
  | 'action'
  | 'relation'
  | 'reality'
  | 'block'
  | 'key'

export interface StateColor {
  id: ColorId
  name: string // e.g. "白"
  state: string // e.g. "释放"
  keywords: string[] // e.g. ["清空", "放下", "重置", "归零"]
  question: string // e.g. "在继续前进之前，有什么需要先彻底清空？"
  description: string
  actionAdvice: string
  hex: string
  glowHex: string
  rgb: string
  lightBg: string
  lightBorder: string
  textColor: string
}

export interface MirrorPosition {
  id: MirrorId
  index: number // 1-8
  code: string // e.g. "01"
  name: string // e.g. "核心"
  subtitle: string // e.g. "事情真正的本质"
  description: string
  guidePrompt: string
}

export interface MirrorResult {
  position: MirrorPosition
  color: StateColor
  isRevealed: boolean
  analysis: {
    summary: string
    patternObservation: string
    reflectionQuestion: string
  }
}

export interface PatternSynthesis {
  title: string // e.g. "强推 → 转化"
  archetype: string // e.g. "结构重组型"
  summary: string // e.g. "你可能正在对一个需要调整方向的事情施加过多硬性压力。"
  coreAdvice: string // e.g. "不要用力硬推，改换解决结构。"
  deepReflection: string // e.g. "如果改变的是达成的方法而不是最终目标，结果会怎样？"
  energeticDynamic: {
    tension: string
    movement: string
  }
}

export interface Reading {
  id: string
  question: string
  createdAt: string
  mirrors: MirrorResult[]
  key: StateColor
  pattern: PatternSynthesis
  isSaved?: boolean
}

export interface DailyState {
  date: string
  color: StateColor
  reflection: string
  timestamp: number
}

export interface HistoryStats {
  totalReadings: number
  mostFrequentKey: StateColor | null
  colorDistribution: Record<ColorId, number>
}
