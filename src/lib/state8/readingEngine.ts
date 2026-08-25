import {
  BlockKeyAnalysis,
  ColorId,
  CoreKeyAnalysis,
  FourLayerSummary,
  MirrorId,
  MirrorResult,
  NextActionPlan,
  PatternAnalysis,
  PatternSignal,
  QuestionContext,
  Reading,
  RelationshipAnalysis,
  StateColor,
} from './types'
import { STATE_COLORS, STATE_COLOR_LIST } from './colors'
import { MIRROR_POSITION_LIST } from './mirrors'
import { INTERPRETATION_CELLS } from './interpretations'
import { getColorRelationship } from './relationships'
import { getBlockToKeyPattern } from './patterns'
import { classifyQuestion, getContextAwareAdvice } from './questionClassifier'

/**
 * Fisher-Yates Shuffle
 */
export function shuffleColors(colors: StateColor[] = STATE_COLOR_LIST): StateColor[] {
  const arr = [...colors]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

/**
 * Analyze Block -> Key Relationship (Core Pillar)
 */
export function analyzeBlockToKey(blockColor: StateColor, keyColor: StateColor): BlockKeyAnalysis {
  const archetype = getBlockToKeyPattern(blockColor.id, keyColor.id)
  const rel = getColorRelationship(blockColor.id, keyColor.id)

  let tensionStatement = ''
  if (blockColor.id === keyColor.id) {
    tensionStatement = `阻碍与钥匙均落在【${blockColor.name}·${blockColor.state}】，说明此维度的极致表现既是症结也是药方。`
  } else {
    tensionStatement = `阻碍在【${blockColor.name}·${blockColor.state}】（${blockColor.keywords[0]}），钥匙在【${keyColor.name}·${keyColor.state}】（${keyColor.keywords[0]}）。${rel.dynamicStatement}`
  }

  return {
    blockColor,
    keyColor,
    patternArchetype: archetype,
    tensionStatement,
    recommendation: archetype.coreAdvice,
  }
}

/**
 * Analyze Core -> Key Alignment
 */
export function analyzeCoreToKey(coreColor: StateColor, keyColor: StateColor): CoreKeyAnalysis {
  if (coreColor.id === keyColor.id) {
    return {
      coreColor,
      keyColor,
      isAligned: true,
      alignmentType: 'ALIGNMENT',
      statement: `核心本意与破局钥匙高度共振（均为【${coreColor.name}·${coreColor.state}】），顺从你的原初意图即可破局。`,
    }
  }

  const rel = getColorRelationship(coreColor.id, keyColor.id)
  if (rel.type === 'support' || rel.type === 'transition') {
    return {
      coreColor,
      keyColor,
      isAligned: true,
      alignmentType: 'COMPLEMENTARY',
      statement: `核心【${coreColor.name}】与钥匙【${keyColor.name}】呈良性互补，解决手段有力支撑了底层初心。`,
    }
  }

  return {
    coreColor,
    keyColor,
    isAligned: false,
    alignmentType: 'SHIFT_REQUIRED',
    statement: `核心渴望（${coreColor.name}）与当下钥匙（${keyColor.name}）存在姿态差，必须调换破局策略。`,
  }
}

/**
 * Detect Tension between Mind and Emotion
 */
export function detectMindEmotionTension(
  mindColor: StateColor,
  emotionColor: StateColor
): RelationshipAnalysis {
  const rel = getColorRelationship(mindColor.id, emotionColor.id)

  let statement = ''
  if (mindColor.id === emotionColor.id) {
    statement = `心念与情绪同在【${mindColor.name}·${mindColor.state}】，身心感受高度合一，无明显内在拉扯。`
  } else if (rel.type === 'tension') {
    statement = `心念在计算【${mindColor.name}·${mindColor.state}】，但潜意识情绪已偏向【${emotionColor.name}·${emotionColor.state}】，存在内在认知与感受的拉扯。`
  } else {
    statement = `心念【${mindColor.name}】与情绪【${emotionColor.name}】自然协同，思维能够体谅接纳真实感受。`
  }

  return {
    sourceMirror: 'mind',
    targetMirror: 'emotion',
    sourceColor: mindColor,
    targetColor: emotionColor,
    relationshipType: rel.type,
    statement,
  }
}

/**
 * Synthesize 4-Layer Summary (CORE, TENSION, BLOCK, KEY)
 */
export function generateFourLayerSummary(
  mirrors: MirrorResult[],
  blockKey: BlockKeyAnalysis,
  mindEmotion: RelationshipAnalysis,
  coreKey: CoreKeyAnalysis,
  qContext: QuestionContext
): FourLayerSummary {
  const coreResult = mirrors.find((m) => m.position.id === 'core')
  const coreColor = coreResult?.color || STATE_COLORS.purple

  const coreStatement = `你想要推进此事，但核心在于【${coreColor.name}·${coreColor.state}】（${coreResult?.interpretation.meaning.slice(0, 36)}…）。`
  const tensionStatement = mindEmotion.statement
  const blockStatement = `当前卡点在于【${blockKey.blockColor.name}·${blockKey.blockColor.state}】（${blockKey.blockColor.actionAdvice}）。`
  const keyStatement = getContextAwareAdvice(qContext.primary, blockKey.keyColor.id, blockKey.recommendation)

  return {
    core: coreStatement,
    tension: tensionStatement,
    block: blockStatement,
    key: keyStatement,
  }
}

/**
 * Generate "What To Do Next" Action Plan (NOW, AVOID, NOTICE)
 */
export function generateNextActionPlan(
  blockColor: StateColor,
  keyColor: StateColor,
  qContext: QuestionContext
): NextActionPlan {
  // NOW: concrete immediate move
  const nowAction = getContextAwareAdvice(qContext.primary, keyColor.id, keyColor.actionAdvice)

  // AVOID: block habit to stop
  const avoidAction = `切勿陷入【${blockColor.name}】的负向惯性（${blockColor.keywords.slice(0, 2).join(' / ')}），避免用旧动作引发反作用力。`

  // NOTICE: observation trigger
  const noticeAction = `留意你在做出决定后，内心的微躁感或犹豫是否自然消退。`

  return {
    now: nowAction,
    avoid: avoidAction,
    notice: noticeAction,
  }
}

/**
 * Generate top 3 high-impact Pattern Signals
 */
export function generatePatternSignals(
  mindEmotion: RelationshipAnalysis,
  blockKey: BlockKeyAnalysis,
  coreKey: CoreKeyAnalysis
): PatternSignal[] {
  const signals: PatternSignal[] = []

  // Signal 1: Mind vs Emotion
  signals.push({
    id: 'mind_emotion',
    title: '心念 ↔ 情绪',
    type: mindEmotion.relationshipType === 'tension' ? 'tension' : 'alignment',
    statement: mindEmotion.statement,
  })

  // Signal 2: Block vs Key
  signals.push({
    id: 'block_key',
    title: '阻碍 ↔ 钥匙',
    type: 'shift',
    statement: `由【${blockKey.blockColor.state}】转向【${blockKey.keyColor.state}】：${blockKey.patternArchetype.summary}`,
  })

  // Signal 3: Core vs Key
  signals.push({
    id: 'core_key',
    title: '核心 ↔ 钥匙',
    type: coreKey.isAligned ? 'opportunity' : 'tension',
    statement: coreKey.statement,
  })

  return signals.slice(0, 3)
}

/**
 * Full Reading Engine Core Method
 */
export function createReadingEngine(
  question: string,
  presetColors?: ColorId[]
): Reading {
  const qContext = classifyQuestion(question)

  // Assign colors (either from preset for deterministic testing, or randomly shuffled)
  let assignedColors: StateColor[]
  if (presetColors && presetColors.length === 8) {
    assignedColors = presetColors.map((id) => STATE_COLORS[id])
  } else {
    assignedColors = shuffleColors()
  }

  // Build 8 Mirrors with 64-cell interpretations
  const mirrors: MirrorResult[] = MIRROR_POSITION_LIST.map((pos, index) => {
    const color = assignedColors[index]
    const cell = INTERPRETATION_CELLS[pos.id][color.id]
    return {
      position: pos,
      color,
      isRevealed: false,
      interpretation: cell,
      isDominantExpression: pos.id === 'block' ? 'shadow' : 'light',
    }
  })

  const coreMirror = mirrors.find((m) => m.position.id === 'core')!
  const mindMirror = mirrors.find((m) => m.position.id === 'mind')!
  const emotionMirror = mirrors.find((m) => m.position.id === 'emotion')!
  const blockMirror = mirrors.find((m) => m.position.id === 'block')!
  const keyMirror = mirrors.find((m) => m.position.id === 'key')!

  const blockKeyAnalysis = analyzeBlockToKey(blockMirror.color, keyMirror.color)
  const coreKeyAnalysis = analyzeCoreToKey(coreMirror.color, keyMirror.color)
  const mindEmotionTension = detectMindEmotionTension(mindMirror.color, emotionMirror.color)
  const signals = generatePatternSignals(mindEmotionTension, blockKeyAnalysis, coreKeyAnalysis)
  const fourLayerSummary = generateFourLayerSummary(
    mirrors,
    blockKeyAnalysis,
    mindEmotionTension,
    coreKeyAnalysis,
    qContext
  )
  const nextAction = generateNextActionPlan(blockMirror.color, keyMirror.color, qContext)

  const patternAnalysis: PatternAnalysis = {
    primaryPattern: blockKeyAnalysis.patternArchetype,
    fourLayerSummary,
    blockKeyAnalysis,
    coreKeyAnalysis,
    tensionAnalysis: mindEmotionTension,
    signals,
    nextAction,
    questionContext: qContext,
    confidence: qContext.confidence,
    tags: [
      ...blockKeyAnalysis.patternArchetype.tags,
      qContext.primaryLabel,
      keyMirror.color.state,
    ],
  }

  return {
    id: `reading_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    question: question.trim() || '我当下的真实状态与破局方向是什么？',
    createdAt: new Date().toISOString(),
    mirrors,
    key: keyMirror.color,
    analysis: patternAnalysis,
    isSaved: false,
  }
}
