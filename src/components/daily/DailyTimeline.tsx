'use client'

import React from 'react'
import { DailyState } from '@/lib/state8/types'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { Moon, Calendar } from 'lucide-react'

interface DailyTimelineProps {
  history: DailyState[]
  onEveningReflection: (answer: 'YES' | 'A_LITTLE' | 'NOT_REALLY') => void
  currentEveningAnswer?: 'YES' | 'A_LITTLE' | 'NOT_REALLY'
}

export function DailyTimeline({
  history,
  onEveningReflection,
  currentEveningAnswer,
}: DailyTimelineProps) {
  return (
    <div className="space-y-4 my-4">
      {/* Evening Reflection */}
      <GlassPanel variant="card" className="p-4 sm:p-5 space-y-3">
        <div className="flex items-center gap-1.5 border-b border-slate-100 pb-2">
          <Moon className="w-4 h-4 text-indigo-600" />
          <h3 className="text-xs font-bold text-slate-900 tracking-wider uppercase">
            暮间回望 · 今天这个状态显现了吗？
          </h3>
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs">
          {[
            { key: 'YES', label: '明显显现' },
            { key: 'A_LITTLE', label: '隐约感知' },
            { key: 'NOT_REALLY', label: '没有出现' },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => onEveningReflection(item.key as any)}
              className={`py-2 px-2 rounded-xl border font-medium transition-all cursor-pointer ${
                currentEveningAnswer === item.key
                  ? 'bg-indigo-900 text-white border-indigo-900 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </GlassPanel>

      {/* 7-Day Timeline */}
      {history && history.length > 0 && (
        <GlassPanel variant="subtle" className="p-4 sm:p-5 space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
            <Calendar className="w-3.5 h-3.5" />
            <span>近期状态轨迹（最近 7 天）</span>
          </div>

          <div className="flex items-center justify-between gap-1 overflow-x-auto py-2">
            {history.slice(0, 7).map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1 min-w-[42px]">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center border shadow-xs"
                  style={{
                    backgroundColor: item.color.lightBg,
                    borderColor: item.color.lightBorder,
                  }}
                >
                  <span
                    className="text-xs font-bold font-sans"
                    style={{ color: item.color.textColor }}
                  >
                    {item.color.name}
                  </span>
                </div>

                <span className="text-[9px] text-slate-500 font-mono truncate max-w-[44px]">
                  {item.date.slice(5)}
                </span>
              </div>
            ))}
          </div>
        </GlassPanel>
      )}
    </div>
  )
}
