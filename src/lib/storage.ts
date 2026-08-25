import { DailyState, Reading } from '@/types/state8'
import { STATE_COLORS } from './constants'

const STORAGE_KEYS = {
  CURRENT_READING: 'state8_current_reading',
  SAVED_READINGS: 'state8_saved_readings',
  DAILY_STATE: 'state8_daily_state',
  USER_PREFS: 'state8_user_preferences',
}

const INITIAL_MOCK_READINGS: Reading[] = [
  {
    id: 'mock_1',
    question: '我应该现在启动这个新项目，还是等待外部环境明朗？',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    mirrors: [],
    key: STATE_COLORS.orange,
    pattern: {
      title: '行动 → 时机',
      archetype: '战略蓄势型',
      summary: '外部客观条件仍在后台酝酿，急于求成反而会过早耗尽宝贵势能。',
      coreAdvice: '不要强行收割，静候果实成熟。',
      deepReflection: '如果等待不是被动懈怠，而是此刻最具杀伤力的策略呢？',
      energeticDynamic: {
        tension: '急于推进的心态与客观准备尚未就绪产生拉扯。',
        movement: '启动【橙·时机】，用耐性换取未来的绝对主动权。',
      },
    },
    isSaved: true,
  },
  {
    id: 'mock_2',
    question: '如何化解目前与合作伙伴之间的沟通隔阂？',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    mirrors: [],
    key: STATE_COLORS.blue,
    pattern: {
      title: '觉察 → 表达',
      archetype: '坦诚对齐型',
      summary: '当前最大的瓶颈在于未被言说的真实。一次清晰的对话胜过数周的周旋。',
      coreAdvice: '直面事实，用精准而平静的语言讲出真相。',
      deepReflection: '你一直推迟说出口的那句最真实的话是什么？',
      energeticDynamic: {
        tension: '主观猜忌遮蔽了真实的合作共识。',
        movement: '启动【蓝·表达】，打通信息孤岛，迅速校准方向。',
      },
    },
    isSaved: true,
  },
  {
    id: 'mock_3',
    question: '我是否需要对目前的产品架构做一次彻底调整？',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 11).toISOString(),
    mirrors: [],
    key: STATE_COLORS.green,
    pattern: {
      title: '强推 → 转化',
      archetype: '结构重组型',
      summary: '你可能正对一个需要灵活调转方向的事项，施加了过多的硬碰硬压力。',
      coreAdvice: '不要用力硬推，改换解决结构。',
      deepReflection: '如果改变的是达成的方法而不是最终目标，结果会怎样？',
      energeticDynamic: {
        tension: '原有刚性模式无法承受当下的扩张压力。',
        movement: '转向【绿·转化】，将阻力顺势转化为流动的生机。',
      },
    },
    isSaved: true,
  },
]

export function getCurrentReading(): Reading | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_READING)
    return raw ? JSON.parse(raw) : null
  } catch (e) {
    console.error('获取当前状态记录失败', e)
    return null
  }
}

export function saveCurrentReading(reading: Reading): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEYS.CURRENT_READING, JSON.stringify(reading))
  } catch (e) {
    console.error('保存当前状态记录失败', e)
  }
}

export function getSavedReadings(): Reading[] {
  if (typeof window === 'undefined') return INITIAL_MOCK_READINGS
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SAVED_READINGS)
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.SAVED_READINGS, JSON.stringify(INITIAL_MOCK_READINGS))
      return INITIAL_MOCK_READINGS
    }
    return JSON.parse(raw)
  } catch (e) {
    console.error('获取历史记录失败', e)
    return INITIAL_MOCK_READINGS
  }
}

export function addSavedReading(reading: Reading): void {
  if (typeof window === 'undefined') return
  try {
    const list = getSavedReadings()
    const updated = [{ ...reading, isSaved: true }, ...list.filter((r) => r.id !== reading.id)]
    localStorage.setItem(STORAGE_KEYS.SAVED_READINGS, JSON.stringify(updated))
  } catch (e) {
    console.error('保存记录失败', e)
  }
}

export function removeSavedReading(id: string): void {
  if (typeof window === 'undefined') return
  try {
    const list = getSavedReadings()
    const updated = list.filter((r) => r.id !== id)
    localStorage.setItem(STORAGE_KEYS.SAVED_READINGS, JSON.stringify(updated))
  } catch (e) {
    console.error('删除记录失败', e)
  }
}

export function getDailyState(): DailyState | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DAILY_STATE)
    return raw ? JSON.parse(raw) : null
  } catch (e) {
    console.error('获取每日状态失败', e)
    return null
  }
}

export function saveDailyState(daily: DailyState): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEYS.DAILY_STATE, JSON.stringify(daily))
  } catch (e) {
    console.error('保存每日状态失败', e)
  }
}
