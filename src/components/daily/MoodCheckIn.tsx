'use client'

import React from 'react'
import { DailyMood } from '@/lib/state8/types'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { Smile } from 'lucide-react'

interface MoodCheckInProps {
  selectedMood?: DailyMood
  onSelectMood: (mood: DailyMood) => void
}

const MOODS: Array<{ id: DailyMood; label: string; desc: string }> = [
  { id: 'CALM', label: '平静', desc: '心绪宁静从容' },
  { id: 'HEAVY', label: '沉重', desc: '疲惫负担感' },
  { id: 'FOCUSED', label: '专注', desc: '目标清晰聚焦' },
  { id: 'RESTLESS', label: '浮躁', desc: '焦虑急切多变' },
  { id: 'UNSURE', label: '犹豫', desc: '摇摆拿不定主意' },
  { id: 'ENERGIZED', label: '饱满', desc: '充满推进动力' },
]

export function MoodCheckIn({ selectedMood, onSelectMood }: MoodCheckInProps) {
  return (
    <GlassPanel variant="card" className="p-4 sm:p-5 space-y-3">
      <div className="flex items-center gap-1.5 border-b border-slate-100 pb-2">
        <Smile className="w-4 h-4 text-slate-700" />
        <h3 className="text-xs font-bold text-slate-900 tracking-wider uppercase">
          晨间感知 · 你此刻的状态是？
        </h3>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {MOODS.map((m) => {
          const isSelected = selectedMood === m.id
          return (
            <button
              key={m.id}
              onClick={() => onSelectMood(m.id)}
              className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="text-xs font-bold">{m.label}</div>
              <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                {m.desc}
              </div>
            </button>
          )
        })}
      </div>
    </GlassPanel>
  )
}
