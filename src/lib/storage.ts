import { DailyState, Reading, ReadingFeedback } from './state8/types'
import { createReadingEngine } from './state8/readingEngine'

const STORAGE_KEYS = {
  CURRENT_READING: 'state8_current_reading',
  READINGS: 'state8_readings',
  DAILY: 'state8_daily',
  FEEDBACK: 'state8_feedback',
  SETTINGS: 'state8_settings',
}

// Generate rich initial mock readings using readingEngine so they match full schema
function getInitialMockReadings(): Reading[] {
  const r1 = createReadingEngine('我应该现在启动这个新项目，还是等待外部环境明朗？', [
    'purple', 'yellow', 'pink', 'red', 'blue', 'green', 'red', 'orange'
  ])
  r1.id = 'mock_1'
  r1.isSaved = true
  r1.createdAt = new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString()

  const r2 = createReadingEngine('如何化解目前与合作伙伴之间的沟通隔阂？', [
    'blue', 'purple', 'pink', 'orange', 'yellow', 'white', 'purple', 'blue'
  ])
  r2.id = 'mock_2'
  r2.isSaved = true
  r2.createdAt = new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString()

  const r3 = createReadingEngine('我是否需要对目前的产品架构做一次彻底调整？', [
    'green', 'yellow', 'pink', 'red', 'blue', 'white', 'red', 'green'
  ])
  r3.id = 'mock_3'
  r3.isSaved = true
  r3.createdAt = new Date(Date.now() - 1000 * 60 * 60 * 24 * 11).toISOString()

  return [r1, r2, r3]
}

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
  if (typeof window === 'undefined') return getInitialMockReadings()
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.READINGS)
    if (!raw) {
      const initial = getInitialMockReadings()
      localStorage.setItem(STORAGE_KEYS.READINGS, JSON.stringify(initial))
      return initial
    }
    return JSON.parse(raw)
  } catch (e) {
    console.error('获取历史记录失败', e)
    return getInitialMockReadings()
  }
}

export function addSavedReading(reading: Reading): void {
  if (typeof window === 'undefined') return
  try {
    const list = getSavedReadings()
    const updated = [{ ...reading, isSaved: true }, ...list.filter((r) => r.id !== reading.id)]
    localStorage.setItem(STORAGE_KEYS.READINGS, JSON.stringify(updated))
  } catch (e) {
    console.error('保存记录失败', e)
  }
}

export function updateReadingFeedback(readingId: string, feedback: ReadingFeedback): void {
  if (typeof window === 'undefined') return
  try {
    const list = getSavedReadings()
    const updated = list.map((r) => {
      if (r.id === readingId) {
        return { ...r, feedback }
      }
      return r
    })
    localStorage.setItem(STORAGE_KEYS.READINGS, JSON.stringify(updated))

    // If current reading matches, update it too
    const current = getCurrentReading()
    if (current && current.id === readingId) {
      saveCurrentReading({ ...current, feedback })
    }
  } catch (e) {
    console.error('更新反馈失败', e)
  }
}

export function removeSavedReading(id: string): void {
  if (typeof window === 'undefined') return
  try {
    const list = getSavedReadings()
    const updated = list.filter((r) => r.id !== id)
    localStorage.setItem(STORAGE_KEYS.READINGS, JSON.stringify(updated))
  } catch (e) {
    console.error('删除记录失败', e)
  }
}

export function getDailyState(): DailyState | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DAILY)
    return raw ? JSON.parse(raw) : null
  } catch (e) {
    console.error('获取每日状态失败', e)
    return null
  }
}

export function saveDailyState(daily: DailyState): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEYS.DAILY, JSON.stringify(daily))
  } catch (e) {
    console.error('保存每日状态失败', e)
  }
}

export function getDailyHistory(): DailyState[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem('state8_daily_history')
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function addDailyHistory(daily: DailyState): void {
  if (typeof window === 'undefined') return
  try {
    const list = getDailyHistory()
    const filtered = list.filter((d) => d.date !== daily.date)
    const updated = [daily, ...filtered].slice(0, 14) // keep last 14 days
    localStorage.setItem('state8_daily_history', JSON.stringify(updated))
  } catch (e) {
    console.error('保存每日历史失败', e)
  }
}
