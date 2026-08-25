import { DailyState, Reading, StateColor } from '@/types/state8'
import { STATE_COLORS } from './constants'

const STORAGE_KEYS = {
  CURRENT_READING: 'state8_current_reading',
  SAVED_READINGS: 'state8_saved_readings',
  DAILY_STATE: 'state8_daily_state',
  USER_PREFS: 'state8_user_preferences',
}

// Initial mock history so the history page already looks rich on first visit
const INITIAL_MOCK_READINGS: Reading[] = [
  {
    id: 'mock_1',
    question: 'Should I launch the new initiative now or wait for market shift?',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    mirrors: [],
    key: STATE_COLORS.orange,
    pattern: {
      title: 'ACT → TIMING',
      archetype: 'The Strategic Incubation',
      summary: 'The conditions are ripening in the background. Premature release will exhaust your momentum.',
      coreAdvice: 'Do not force the harvest. Protect the charge.',
      deepReflection: 'What if waiting is not inaction, but the most aggressive strategy available?',
      energeticDynamic: {
        tension: 'Urgency collides with incomplete setup.',
        movement: 'Allowing ORANGE grants timing leverage.',
      },
    },
    isSaved: true,
  },
  {
    id: 'mock_2',
    question: 'How do I resolve the deadlock with my collaborator?',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    mirrors: [],
    key: STATE_COLORS.blue,
    pattern: {
      title: 'INSIGHT → VOICE',
      archetype: 'The Unfiltered Truth',
      summary: 'The primary bottleneck is unexpressed reality. Direct speech clears what weeks of negotiation cannot.',
      coreAdvice: 'Name what is actually happening. Use precise truth.',
      deepReflection: 'What is the one sentence you have been afraid to speak plainly?',
      energeticDynamic: {
        tension: 'Subtle resentments cloud the objective task.',
        movement: 'BLUE voice aligns consensus immediately.',
      },
    },
    isSaved: true,
  },
  {
    id: 'mock_3',
    question: 'Should I restructure the current project architecture?',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 11).toISOString(),
    mirrors: [],
    key: STATE_COLORS.green,
    pattern: {
      title: 'FORCE → SHIFT',
      archetype: 'The Structural Realignment',
      summary: 'You may be pushing a situation that needs adjustment, not more pressure.',
      coreAdvice: 'Do not push harder. Change the structure.',
      deepReflection: 'What would happen if you changed the method instead of the goal?',
      energeticDynamic: {
        tension: 'Over-exertion against fixed patterns.',
        movement: 'Pivoting to GREEN converts resistance into flow.',
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
    console.error('Failed to get current reading', e)
    return null
  }
}

export function saveCurrentReading(reading: Reading): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEYS.CURRENT_READING, JSON.stringify(reading))
  } catch (e) {
    console.error('Failed to save current reading', e)
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
    console.error('Failed to get saved readings', e)
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
    console.error('Failed to add saved reading', e)
  }
}

export function removeSavedReading(id: string): void {
  if (typeof window === 'undefined') return
  try {
    const list = getSavedReadings()
    const updated = list.filter((r) => r.id !== id)
    localStorage.setItem(STORAGE_KEYS.SAVED_READINGS, JSON.stringify(updated))
  } catch (e) {
    console.error('Failed to remove saved reading', e)
  }
}

export function getDailyState(): DailyState | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DAILY_STATE)
    return raw ? JSON.parse(raw) : null
  } catch (e) {
    console.error('Failed to get daily state', e)
    return null
  }
}

export function saveDailyState(daily: DailyState): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEYS.DAILY_STATE, JSON.stringify(daily))
  } catch (e) {
    console.error('Failed to save daily state', e)
  }
}
