'use client'

import React from 'react'
import { NextActionPlan } from '@/lib/state8/types'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { Zap, ShieldAlert, Eye } from 'lucide-react'

interface NextActionCardProps {
  actionPlan: NextActionPlan
}

export function NextActionCard({ actionPlan }: NextActionCardProps) {
  if (!actionPlan) return null

  return (
    <GlassPanel variant="glow" className="p-5 sm:p-6 my-6 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
        <h3 className="text-xs font-bold text-slate-900 tracking-wider uppercase">
          下一步行动罗盘 · 三层指引
        </h3>
        <span className="text-[10px] font-semibold text-slate-400">
          NOW · AVOID · NOTICE
        </span>
      </div>

      <div className="space-y-3">
        {/* NOW */}
        <div className="p-3.5 rounded-2xl bg-emerald-50/90 border border-emerald-200/80 space-y-1">
          <div className="flex items-center gap-1.5 text-emerald-800 text-xs font-bold uppercase">
            <Zap className="w-3.5 h-3.5" />
            <span>即刻动作（NOW）</span>
          </div>
          <p className="text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed pl-5">
            {actionPlan.now}
          </p>
        </div>

        {/* AVOID */}
        <div className="p-3.5 rounded-2xl bg-amber-50/90 border border-amber-200/80 space-y-1">
          <div className="flex items-center gap-1.5 text-amber-800 text-xs font-bold uppercase">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>避免惯性（AVOID）</span>
          </div>
          <p className="text-xs sm:text-sm text-amber-950 font-normal leading-relaxed pl-5">
            {actionPlan.avoid}
          </p>
        </div>

        {/* NOTICE */}
        <div className="p-3.5 rounded-2xl bg-blue-50/90 border border-blue-200/80 space-y-1">
          <div className="flex items-center gap-1.5 text-blue-800 text-xs font-bold uppercase">
            <Eye className="w-3.5 h-3.5" />
            <span>觉察留心（NOTICE）</span>
          </div>
          <p className="text-xs sm:text-sm text-blue-950 font-normal leading-relaxed pl-5">
            {actionPlan.notice}
          </p>
        </div>
      </div>
    </GlassPanel>
  )
}
