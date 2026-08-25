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
  name: string
  state: string
  chinese: string
  actionChinese: string
  keywords: string[]
  question: string
  description: string
  hex: string
  glowHex: string
  rgb: string // e.g. "248, 250, 252"
  accentClass: string
  borderClass: string
  bgClass: string
  glowClass: string
}

export interface MirrorPosition {
  id: MirrorId
  index: number // 1-8
  code: string // e.g. "01"
  name: string // e.g. "CORE"
  chinese: string // e.g. "心"
  subtitle: string // e.g. "事情真正的核心"
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
  title: string // e.g. "FORCE → SHIFT" or "INSIGHT OVER ACTION"
  archetype: string // e.g. "The Conscious Realignment"
  summary: string // e.g. "You may be pushing a situation that needs adjustment, not more pressure."
  coreAdvice: string // e.g. "Do not push harder. Change the structure."
  deepReflection: string // e.g. "What would happen if you changed the method instead of the goal?"
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
  positionDominance: {
    blockColor: StateColor | null
    coreColor: StateColor | null
  }
}
