import { ColorId, HistoryPatternSummary, Reading, StateColor } from './types'
import { STATE_COLORS } from './colors'

export function analyzeReadingHistory(readings: Reading[]): HistoryPatternSummary {
  if (!readings || readings.length === 0) {
    return {
      totalReadings: 0,
      mostCommonKey: null,
      mostCommonBlock: null,
      mostCommonCategory: null,
      colorFrequencies: {
        white: 0,
        purple: 0,
        blue: 0,
        pink: 0,
        green: 0,
        yellow: 0,
        orange: 0,
        red: 0,
      },
      recentArchetypes: [],
    }
  }

  const keyCounts: Record<ColorId, number> = {
    white: 0,
    purple: 0,
    blue: 0,
    pink: 0,
    green: 0,
    yellow: 0,
    orange: 0,
    red: 0,
  }

  const blockCounts: Record<ColorId, number> = {
    white: 0,
    purple: 0,
    blue: 0,
    pink: 0,
    green: 0,
    yellow: 0,
    orange: 0,
    red: 0,
  }

  const relationCounts: Record<ColorId, number> = {
    white: 0,
    purple: 0,
    blue: 0,
    pink: 0,
    green: 0,
    yellow: 0,
    orange: 0,
    red: 0,
  }

  const categoryCounts: Record<string, number> = {}
  const recentArchetypes: string[] = []

  readings.forEach((r) => {
    if (r.key && r.key.id) {
      keyCounts[r.key.id] = (keyCounts[r.key.id] || 0) + 1
    }

    const blockMirror = r.mirrors?.find((m) => m.position.id === 'block')
    if (blockMirror?.color?.id) {
      blockCounts[blockMirror.color.id] = (blockCounts[blockMirror.color.id] || 0) + 1
    }

    const relationMirror = r.mirrors?.find((m) => m.position.id === 'relation')
    if (relationMirror?.color?.id) {
      relationCounts[relationMirror.color.id] = (relationCounts[relationMirror.color.id] || 0) + 1
    }

    if (r.analysis?.questionContext?.primaryLabel) {
      const cat = r.analysis.questionContext.primaryLabel
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1
    }

    if (r.analysis?.primaryPattern?.name) {
      recentArchetypes.push(r.analysis.primaryPattern.name)
    }
  })

  // Find most common Key
  let maxKeyId: ColorId = 'orange'
  let maxKeyCount = 0
  Object.entries(keyCounts).forEach(([id, count]) => {
    if (count > maxKeyCount) {
      maxKeyCount = count
      maxKeyId = id as ColorId
    }
  })

  // Find most common Block
  let maxBlockId: ColorId = 'red'
  let maxBlockCount = 0
  Object.entries(blockCounts).forEach(([id, count]) => {
    if (count > maxBlockCount) {
      maxBlockCount = count
      maxBlockId = id as ColorId
    }
  })

  // Find most common Category
  let maxCategory: string | null = null
  let maxCatCount = 0
  Object.entries(categoryCounts).forEach(([cat, count]) => {
    if (count > maxCatCount) {
      maxCatCount = count
      maxCategory = cat
    }
  })

  // Repeating Pattern Check in recent readings (last 3-5)
  const recentSlice = readings.slice(0, 5)
  const recentBlockCounts: Record<string, number> = {}
  recentSlice.forEach((r) => {
    const b = r.mirrors?.find((m) => m.position.id === 'block')
    if (b?.color?.id) {
      recentBlockCounts[b.color.id] = (recentBlockCounts[b.color.id] || 0) + 1
    }
  })

  let repeatingBlockAlert: { color: StateColor; count: number; explanation: string } | undefined
  Object.entries(recentBlockCounts).forEach(([id, count]) => {
    if (count >= 2) {
      const color = STATE_COLORS[id as ColorId]
      let explanation = `近期在阻碍位多次出现【${color.name}·${color.state}】。`
      if (id === 'red') {
        explanation += '你可能习惯性地通过加大压力或加快速度来对抗不确定性，反而导致阻力倍增。'
      } else if (id === 'yellow') {
        explanation += '过度追求确定性与完美主义反复出现，导致决策进程多次陷入分析瘫痪。'
      } else if (id === 'blue') {
        explanation += '沟通回避与未明说的真实反复成为阻碍，建议主动开启对话。'
      } else if (id === 'white') {
        explanation += '对沉没成本的不舍与难以放手，正在反复消耗你的新机会窗口。'
      } else {
        explanation += `请留心在面对困难时，是否正重复陷入【${color.state}】的负向惯性。`
      }

      repeatingBlockAlert = {
        color,
        count,
        explanation,
      }
    }
  })

  return {
    totalReadings: readings.length,
    mostCommonKey: STATE_COLORS[maxKeyId],
    mostCommonBlock: STATE_COLORS[maxBlockId],
    mostCommonCategory: maxCategory || '职场与抉择',
    repeatingBlockAlert,
    colorFrequencies: keyCounts,
    recentArchetypes: recentArchetypes.slice(0, 5),
  }
}
