'use client'

import React, { useState } from 'react'
import { ReadingFeedback } from '@/lib/state8/types'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { updateReadingFeedback } from '@/lib/storage'
import { Check, HeartHandshake } from 'lucide-react'

interface ResonanceFeedbackProps {
  readingId: string
  initialFeedback?: ReadingFeedback
}

export function ResonanceFeedback({ readingId, initialFeedback }: ResonanceFeedbackProps) {
  const [feedback, setFeedback] = useState<ReadingFeedback | undefined>(initialFeedback)
  const [submitted, setSubmitted] = useState(Boolean(initialFeedback?.resonance))

  const handleSelectResonance = (resonance: 'VERY_MUCH' | 'SOMEWHAT' | 'NOT_REALLY') => {
    const updated: ReadingFeedback = {
      ...(feedback || {}),
      resonance,
      timestamp: Date.now(),
    }
    setFeedback(updated)
    setSubmitted(true)
    updateReadingFeedback(readingId, updated)
  }

  const handleSelectOutcome = (outcome: 'HELPED' | 'CHANGED' | 'UNRESOLVED' | 'NOT_REALLY' | any) => {
    if (!feedback) return
    const updated: ReadingFeedback = {
      ...feedback,
      outcome,
    }
    setFeedback(updated)
    updateReadingFeedback(readingId, updated)
  }

  return (
    <GlassPanel variant="card" className="p-4 sm:p-5 my-6 space-y-4">
      {/* 1. Resonance Question */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
          <HeartHandshake className="w-4 h-4 text-slate-700" />
          <span>本次状态解构对你有启发共鸣吗？</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => handleSelectResonance('VERY_MUCH')}
            className={`py-2 px-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
              feedback?.resonance === 'VERY_MUCH'
                ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            非常有共鸣
          </button>
          <button
            onClick={() => handleSelectResonance('SOMEWHAT')}
            className={`py-2 px-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
              feedback?.resonance === 'SOMEWHAT'
                ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            部分符合
          </button>
          <button
            onClick={() => handleSelectResonance('NOT_REALLY')}
            className={`py-2 px-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
              feedback?.resonance === 'NOT_REALLY'
                ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            感受不明显
          </button>
        </div>
      </div>

      {/* 2. Retrospective Outcome Question */}
      {submitted && (
        <div className="pt-3 border-t border-slate-100 space-y-2 animate-fadeIn">
          <div className="text-[11px] font-bold text-slate-500 uppercase">
            后续追踪 · 后来怎么样了？
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs">
            {[
              { key: 'HELPED', label: '很有帮助' },
              { key: 'CHANGED', label: '局面改变' },
              { key: 'UNRESOLVED', label: '仍在胶着' },
              { key: 'NOT_RELEVANT', label: '暂无关联' },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => handleSelectOutcome(item.key)}
                className={`py-1.5 px-2 rounded-lg border text-[11px] font-medium transition-all cursor-pointer ${
                  feedback?.outcome === item.key
                    ? 'bg-slate-800 text-white border-slate-800'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </GlassPanel>
  )
}
