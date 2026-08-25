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
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
  }).toUpperCase()

  return (
    <GlassPanel
      variant="card"
      onClick={onClick}
      className="p-5 sm:p-6 cursor-pointer group hover:border-white/30"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left info: Date & Question */}
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-2 text-xs font-mono text-white/40 uppercase">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formattedDate}</span>
            <span>·</span>
            <span className="text-white/70 font-semibold">{reading.pattern.title}</span>
          </div>

          <h3 className="text-base sm:text-lg font-light text-white group-hover:text-white/90 transition-colors">
            &ldquo;{reading.question}&rdquo;
          </h3>

          <p className="text-xs text-white/50 line-clamp-1 font-light">
            {reading.pattern.summary}
          </p>
        </div>

        {/* Right info: Key badge & Action */}
        <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/[0.06]">
          <StateBadge color={reading.key} size="sm" />
          <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/50 group-hover:text-white transition-colors">
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </GlassPanel>
  )
}
