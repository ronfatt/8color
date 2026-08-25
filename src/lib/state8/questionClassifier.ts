import { QuestionCategory, QuestionContext } from './types'

interface CategoryRule {
  category: QuestionCategory
  label: string
  keywords: string[]
  weight: number
}

const CATEGORY_RULES: CategoryRule[] = [
  {
    category: 'WORK',
    label: '职场与事业',
    keywords: [
      '工作', '辞职', '离职', '跳槽', '项目', '事业', '创业', '升职', '降薪',
      '老板', '领导', '同事', '公司', '业务', '客户', '面试', '岗位', '职业',
      'job', 'work', 'career', 'business', 'project', 'boss', 'hire', 'quit',
    ],
    weight: 1.2,
  },
  {
    category: 'MONEY',
    label: '财富与资产',
    keywords: [
      '钱', '财务', '投资', '买房', '理财', '收入', '负债', '资金', '借钱',
      '股票', '基金', '亏损', '盈利', '生意', '成本', '定价', '预算',
      'money', 'invest', 'finance', 'income', 'debt', 'salary', 'fund',
    ],
    weight: 1.2,
  },
  {
    category: 'LOVE',
    label: '情感与伴侣',
    keywords: [
      '恋爱', '感情', '喜欢', '爱', '分手', '结婚', '离婚', '前任', '复合',
      '男朋友', '女朋友', '老公', '老婆', '对象', '暗恋', '表白', '伴侣',
      'love', 'partner', 'marriage', 'breakup', 'date', 'relationship', 'crush',
    ],
    weight: 1.3,
  },
  {
    category: 'RELATIONSHIP',
    label: '人际与合作',
    keywords: [
      '合作', '人际', '朋友', '搭档', '合伙', '关系', '相处', '信任', '背叛',
      '冷战', '吵架', '隔阂', '误会', '社交',
      'friend', 'partner', 'trust', 'conflict', 'social', 'team',
    ],
    weight: 1.1,
  },
  {
    category: 'FAMILY',
    label: '家庭与亲人',
    keywords: [
      '父母', '爸妈', '妈妈', '爸爸', '孩子', '家庭', '亲戚', '子女', '长辈',
      'family', 'parent', 'mother', 'father', 'child', 'home',
    ],
    weight: 1.2,
  },
  {
    category: 'DECISION',
    label: '重大抉择',
    keywords: [
      '该不该', '选', '选择', '决定', '放弃', '去留', '是否', '还是', '左右为难',
      'choice', 'decide', 'decision', 'should', 'choose', 'either',
    ],
    weight: 1.0,
  },
  {
    category: 'TIMING',
    label: '时机与节奏',
    keywords: [
      '现在', '时机', '等等', '立刻', '马上', '时候', '什么时候', '节点', '快慢',
      'timing', 'now', 'wait', 'soon', 'when', 'time',
    ],
    weight: 1.0,
  },
  {
    category: 'CONFLICT',
    label: '对抗与破局',
    keywords: [
      '冲突', '对抗', '争执', '僵局', '诉讼', '纠纷', '谈判', '撕破脸', '对峙',
      'fight', 'dispute', 'negotiate', 'deadlock', 'struggle',
    ],
    weight: 1.1,
  },
  {
    category: 'SELF',
    label: '自我与身心',
    keywords: [
      '焦虑', '内耗', '迷茫', '抑郁', '疲惫', '状态', '自我', '内心', '失眠',
      '成长', '心态', '自我提升', '价值', '自信',
      'self', 'anxious', 'tired', 'lost', 'mental', 'growth',
    ],
    weight: 1.1,
  },
  {
    category: 'FUTURE',
    label: '未来与趋势',
    keywords: [
      '未来', '前景', '发展', '趋势', '走向', '明年', '长远', '希望',
      'future', 'trend', 'prospect', 'long-term',
    ],
    weight: 1.0,
  },
]

export function classifyQuestion(questionText: string): QuestionContext {
  const cleanText = questionText.toLowerCase().trim()
  const matches: Array<{ category: QuestionCategory; label: string; score: number; keywords: string[] }> = []

  CATEGORY_RULES.forEach((rule) => {
    const matchedKeywords: string[] = []
    rule.keywords.forEach((kw) => {
      if (cleanText.includes(kw.toLowerCase())) {
        matchedKeywords.push(kw)
      }
    })

    if (matchedKeywords.length > 0) {
      const score = matchedKeywords.length * rule.weight
      matches.push({
        category: rule.category,
        label: rule.label,
        score,
        keywords: matchedKeywords,
      })
    }
  })

  // Sort descending by score
  matches.sort((a, b) => b.score - a.score)

  if (matches.length === 0) {
    return {
      primary: 'GENERAL',
      primaryLabel: '综合情境',
      confidence: 0.6,
      keywords: [],
    }
  }

  const primaryMatch = matches[0]
  const secondaryMatch = matches.length > 1 ? matches[1] : undefined

  return {
    primary: primaryMatch.category,
    primaryLabel: primaryMatch.label,
    secondary: secondaryMatch?.category,
    secondaryLabel: secondaryMatch?.label,
    confidence: Math.min(0.95, 0.65 + primaryMatch.score * 0.1),
    keywords: primaryMatch.keywords,
  }
}

/**
 * Contextual Action Adapter: Tailors copy to specific category
 */
export function getContextAwareAdvice(
  category: QuestionCategory,
  keyColorId: string,
  baseAdvice: string
): string {
  if (category === 'WORK') {
    if (keyColorId === 'red') return '在职场推进中，落实一项实质性的专业执行动作。'
    if (keyColorId === 'green') return '换一个更敏捷轻量的协作或交付结构，不要死磕硬杠。'
    if (keyColorId === 'blue') return '与关键决策者对齐预期与事实，用清晰数据说话。'
    if (keyColorId === 'orange') return '守住基本盘耐性蓄力，等待更具优势的职场节点。'
    if (keyColorId === 'yellow') return '列出明确的权责与KPI标准，果断划清工作边界。'
    if (keyColorId === 'white') return '及时对无效益的项目止损，为核心业务腾出资源。'
    if (keyColorId === 'purple') return '站在行业宏观视角复盘业务格局，认清底层规律。'
    if (keyColorId === 'pink') return '注重团队人际信任与氛围，以柔性共情凝聚战力。'
  }

  if (category === 'LOVE' || category === 'RELATIONSHIP') {
    if (keyColorId === 'red') return '主动打破关系中的暧昧与迟疑，坦荡做出决定。'
    if (keyColorId === 'blue') return '不带防御地开展一次真实对话，把心底话讲清楚。'
    if (keyColorId === 'pink') return '放下心理戒备与骄傲，允许彼此的柔软与温情流动。'
    if (keyColorId === 'green') return '调整彼此的相处距离与互动模式，建立更舒适的新契约。'
    if (keyColorId === 'white') return '放下对旧模式的执念，给彼此留出体面的空间。'
    if (keyColorId === 'yellow') return '坚守个人尊严与健康边界，对不合理要求说不。'
    if (keyColorId === 'orange') return '给对方留出自我思考的时间，不强求即时的答案。'
    if (keyColorId === 'purple') return '看清关系中彼此投射的内在阴影，从自省中破局。'
  }

  if (category === 'MONEY') {
    if (keyColorId === 'yellow') return '严格审视财务收支与风控红线，坚决剔除高风险敞口。'
    if (keyColorId === 'orange') return '守好现金流储备，在宏观周期筑底期耐心潜伏。'
    if (keyColorId === 'red') return '只在你完全能掌控的确定性收益点上果断下注。'
    if (keyColorId === 'white') return '果断斩断持续亏损的负资产，不要恋战沉没成本。'
    if (keyColorId === 'green') return '重组资产或收入结构，拓展更多元轻量的变现渠道。'
  }

  return baseAdvice
}
