'use client'

import React from 'react'
import { ArrowRight, Calendar } from 'lucide-react'
import { Reading } from '@/types/state8'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { StateBadge } from '@/components/ui/StateBadge'

interface HistoryCardProps {
  reading: Reading
  onClick: () => void
}

export function HistoryCard({ reading, onClick }: HistoryCardProps) {
  const dateObj = new Date(reading.createdAt)
  const formattedDate = `${dateObj.getMonth() + 1}月${dateObj.getDate()}日`

  return (
    <GlassPanel
      variant="card"
      onClick={onClick}
      className="p-4 sm:p-5 cursor-pointer group hover:border-slate-400"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left info */}
        <div className="space-y-1.5 flex-1">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formattedDate}</span>
            <span>·</span>
            <span className="text-slate-800 font-bold">{reading.pattern.title}</span>
          </div>

          <h3 className="text-sm sm:text-base font-semibold text-slate-900 group-hover:text-slate-700 transition-colors">
            “{reading.question}”
          </h3>

          <p className="text-xs text-slate-500 line-clamp-1">
            {reading.pattern.summary}
          </p>
        </div>

        {/* Right info */}
        <div className="flex items-center justify-between sm:justify-end gap-2.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
          <StateBadge color={reading.key} size="sm" />
          <div className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors">
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </GlassPanel>
  )
}
