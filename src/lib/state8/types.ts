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

export type QuestionCategory =
  | 'WORK'
  | 'MONEY'
  | 'LOVE'
  | 'RELATIONSHIP'
  | 'FAMILY'
  | 'SELF'
  | 'DECISION'
  | 'TIMING'
  | 'CONFLICT'
  | 'FUTURE'
  | 'GENERAL'

export type RelationshipType =
  | 'support'
  | 'tension'
  | 'transition'
  | 'amplify'
  | 'neutral'

export type DailyMood =
  | 'CALM'
  | 'HEAVY'
  | 'FOCUSED'
  | 'RESTLESS'
  | 'UNSURE'
  | 'ENERGIZED'

export interface StateColor {
  id: ColorId
  name: string // e.g. "白"
  state: string // e.g. "释放"
  keywords: string[]
  question: string
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

export interface InterpretationCell {
  colorId: ColorId
  mirrorId: MirrorId
  title: string
  meaning: string
  lightExpression: string
  shadowExpression: string
  reflectionQuestion: string
  actionSuggestion: string
  tags: string[]
  contextScore?: {
    support: number
    tension: number
    urgency: number
    clarity: number
  }
}

export interface ColorRelationship {
  colors: [ColorId, ColorId]
  type: RelationshipType
  meaning: string
  dynamicStatement: string
}

export interface QuestionContext {
  primary: QuestionCategory
  primaryLabel: string
  secondary?: QuestionCategory
  secondaryLabel?: string
  confidence: number
  keywords: string[]
}

export interface PatternArchetype {
  id: string
  name: string // e.g. "FORCE → SHIFT"
  chineseName: string // e.g. "强推 → 转化"
  archetype: string // e.g. "结构重组型"
  summary: string
  coreAdvice: string
  deepReflection: string
  tags: string[]
}

export interface BlockKeyAnalysis {
  blockColor: StateColor
  keyColor: StateColor
  patternArchetype: PatternArchetype
  tensionStatement: string
  recommendation: string
}

export interface CoreKeyAnalysis {
  coreColor: StateColor
  keyColor: StateColor
  isAligned: boolean
  alignmentType: 'ALIGNMENT' | 'SHIFT_REQUIRED' | 'COMPLEMENTARY'
  statement: string
}

export interface RelationshipAnalysis {
  sourceMirror: MirrorId
  targetMirror: MirrorId
  sourceColor: StateColor
  targetColor: StateColor
  relationshipType: RelationshipType
  statement: string
}

export interface PatternSignal {
  id: string
  title: string
  type: 'tension' | 'shift' | 'alignment' | 'opportunity'
  statement: string
}

export interface NextActionPlan {
  now: string
  avoid: string
  notice: string
}

export interface FourLayerSummary {
  core: string
  tension: string
  block: string
  key: string
}

export interface PatternAnalysis {
  primaryPattern: PatternArchetype
  secondaryPattern?: PatternArchetype
  fourLayerSummary: FourLayerSummary
  blockKeyAnalysis: BlockKeyAnalysis
  coreKeyAnalysis: CoreKeyAnalysis
  tensionAnalysis?: RelationshipAnalysis
  signals: PatternSignal[]
  nextAction: NextActionPlan
  questionContext: QuestionContext
  confidence: number
  tags: string[]
}

export interface MirrorResult {
  position: MirrorPosition
  color: StateColor
  isRevealed: boolean
  interpretation: InterpretationCell
  isDominantExpression?: 'light' | 'shadow'
}

export interface ReadingFeedback {
  resonance: 'VERY_MUCH' | 'SOMEWHAT' | 'NOT_REALLY'
  timestamp: number
  outcome?: 'HELPED' | 'CHANGED' | 'UNRESOLVED' | 'NOT_RELEVANT'
  outcomeNote?: string
}

export interface Reading {
  id: string
  question: string
  createdAt: string
  mirrors: MirrorResult[]
  key: StateColor
  analysis: PatternAnalysis
  feedback?: ReadingFeedback
  isSaved?: boolean
}

export interface DailyState {
  date: string
  mood?: DailyMood
  color: StateColor
  reflection: string
  action: string
  timestamp: number
  eveningReflection?: 'YES' | 'A_LITTLE' | 'NOT_REALLY'
}

export interface HistoryPatternSummary {
  totalReadings: number
  mostCommonKey: StateColor | null
  mostCommonBlock: StateColor | null
  mostCommonCategory: string | null
  repeatingBlockAlert?: {
    color: StateColor
    count: number
    explanation: string
  }
  repeatingRelationAlert?: {
    color: StateColor
    count: number
    explanation: string
  }
  colorFrequencies: Record<ColorId, number>
  recentArchetypes: string[]
}
