'use client'

import React from 'react'
import { PatternSignal } from '@/lib/state8/types'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { AlertCircle, ArrowRightCircle, CheckCircle2, Sparkles } from 'lucide-react'

interface PatternSignalsProps {
  signals: PatternSignal[]
}

export function PatternSignals({ signals }: PatternSignalsProps) {
  if (!signals || signals.length === 0) return null

  const getIcon = (type: PatternSignal['type']) => {
    switch (type) {
      case 'tension':
        return <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
      case 'shift':
        return <ArrowRightCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
      case 'alignment':
      case 'opportunity':
        return <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0" />
    }
  }

  return (
    <GlassPanel variant="card" className="p-4 sm:p-5 my-6 space-y-3">
      <div className="flex items-center gap-1.5 border-b border-slate-100 pb-2">
        <Sparkles className="w-4 h-4 text-slate-700" />
        <h3 className="text-xs font-bold text-slate-900 tracking-wider uppercase">
          模式关键信号检测
        </h3>
      </div>

      <div className="space-y-2.5">
        {signals.map((signal) => (
          <div
            key={signal.id}
            className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50/80 border border-slate-200/70 text-xs"
          >
            <div className="mt-0.5">{getIcon(signal.type)}</div>
            <div className="flex-1 space-y-0.5">
              <div className="font-bold text-slate-900">{signal.title}</div>
              <p className="text-slate-600 leading-relaxed font-normal">
                {signal.statement}
              </p>
            </div>
          </div>
        ))}
      </div>
    </GlassPanel>
  )
}
