import { ColorId } from './types'
import { createReadingEngine } from './readingEngine'

export interface TestCase {
  id: string
  name: string
  question: string
  presetColors: ColorId[] // [core, mind, emotion, action, relation, reality, block, key]
  expectedCategory: string
  expectedArchetype: string
}

export const TEST_CASES: TestCase[] = [
  {
    id: 'case_01',
    name: '项目强推转结构 (FORCE → SHIFT)',
    question: '我是否应该继续强行推进这个陷入停滞的项目？',
    presetColors: ['purple', 'yellow', 'pink', 'red', 'blue', 'green', 'red', 'green'],
    expectedCategory: 'WORK',
    expectedArchetype: 'FORCE → SHIFT',
  },
  {
    id: 'case_02',
    name: '内觉洞察转表达 (SENSE → SPEAK)',
    question: '我应该向伴侣坦白我心中一直未说的真实想法吗？',
    presetColors: ['pink', 'purple', 'blue', 'orange', 'yellow', 'white', 'purple', 'blue'],
    expectedCategory: 'LOVE',
    expectedArchetype: 'SENSE → SPEAK',
  },
  {
    id: 'case_03',
    name: '纠结犹豫转明辨 (CONFUSE → DISCERN)',
    question: '我该不该在当前节点选择辞职跳槽？',
    presetColors: ['yellow', 'blue', 'white', 'green', 'pink', 'red', 'orange', 'yellow'],
    expectedCategory: 'WORK',
    expectedArchetype: 'CONFUSE → DISCERN',
  },
  {
    id: 'case_04',
    name: '过度思辨转决断 (THINK → ACT)',
    question: '面对谈判僵局，我该如何打破对方的拖延？',
    presetColors: ['red', 'blue', 'yellow', 'orange', 'purple', 'green', 'blue', 'red'],
    expectedCategory: 'CONFLICT',
    expectedArchetype: 'THINK → ACT',
  },
  {
    id: 'case_05',
    name: '执念不舍转蓄势 (CHASE → WAIT)',
    question: '为什么我总感觉精力被过度透支却难有成效？',
    presetColors: ['white', 'yellow', 'red', 'blue', 'green', 'purple', 'white', 'orange'],
    expectedCategory: 'SELF',
    expectedArchetype: 'CHASE → WAIT',
  },
  {
    id: 'case_06',
    name: '犹疑不决转小步验证 (DOUBT → VERIFY)',
    question: '我应该拿出一笔大额资金投资这个新生意吗？',
    presetColors: ['orange', 'yellow', 'purple', 'red', 'blue', 'white', 'yellow', 'green'],
    expectedCategory: 'MONEY',
    expectedArchetype: 'DOUBT → VERIFY',
  },
  {
    id: 'case_07',
    name: '执念放手转归零 (HOLD → RELEASE)',
    question: '我该如何面对这次惨痛的失败与损失？',
    presetColors: ['pink', 'blue', 'yellow', 'orange', 'red', 'green', 'pink', 'white'],
    expectedCategory: 'SELF',
    expectedArchetype: 'HOLD → RELEASE',
  },
  {
    id: 'case_08',
    name: '隐匿沉默转勇敢表达 (HIDE → EXPRESS)',
    question: '在明天的全员高管会议上，我是否应当据理力争？',
    presetColors: ['purple', 'blue', 'pink', 'yellow', 'green', 'white', 'blue', 'blue'],
    expectedCategory: 'WORK',
    expectedArchetype: 'HIDE → EXPRESS',
  },
  {
    id: 'case_09',
    name: '盲动急躁转从容蓄势 (PUSH → PAUSE)',
    question: '我是不是在与现实硬刚，导致大家都很疲惫？',
    presetColors: ['red', 'green', 'yellow', 'blue', 'pink', 'white', 'red', 'orange'],
    expectedCategory: 'DECISION',
    expectedArchetype: 'PUSH → PAUSE',
  },
  {
    id: 'case_10',
    name: '彻底抗拒转全然归零 (RESIST → RELEASE)',
    question: '当我失去了一切依靠，该如何重新从零出发？',
    presetColors: ['white', 'purple', 'blue', 'pink', 'green', 'yellow', 'white', 'white'],
    expectedCategory: 'SELF',
    expectedArchetype: 'RESIST → RELEASE',
  },
]

export function runEngineTestCases() {
  const results = TEST_CASES.map((tc) => {
    const reading = createReadingEngine(tc.question, tc.presetColors)
    const actual = reading.analysis.primaryPattern.name
    const passed = actual === tc.expectedArchetype
    return {
      id: tc.id,
      name: tc.name,
      passed,
      actualArchetype: actual,
      expectedArchetype: tc.expectedArchetype,
      category: reading.analysis.questionContext.primary,
    }
  })

  return results
}

// Self-executing runner for CLI verification
if (typeof process !== 'undefined' && process.argv && process.argv[1]?.includes('testCases')) {
  console.log('=== RUNNING 8MIRROR INTELLIGENCE ENGINE V2 TEST SUITE ===')
  const results = runEngineTestCases()
  let allPassed = true
  results.forEach((r) => {
    const status = r.passed ? '✓ PASSED' : '✗ FAILED'
    if (!r.passed) allPassed = false
    console.log(`${status} [${r.id}] ${r.name} -> Cat: ${r.category} | Expected: ${r.expectedArchetype} | Actual: ${r.actualArchetype}`)
  })
  console.log('=========================================================')
  console.log(allPassed ? 'ALL 10 TEST CASES PASSED SUCCESSFULLY!' : 'SOME TEST CASES FAILED!')
}
