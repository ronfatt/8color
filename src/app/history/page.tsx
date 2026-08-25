'use client'

import React, { useState, useEffect } from 'react'
import { History as HistoryIcon, Compass } from 'lucide-react'
import { Reading } from '@/lib/state8/types'
import { getSavedReadings } from '@/lib/storage'
import { analyzeReadingHistory } from '@/lib/state8/historyEngine'
import { HistoryCard } from '@/components/history/HistoryCard'
import { HistoryDetailModal } from '@/components/history/HistoryDetailModal'
import { MonthlyPatternView } from '@/components/history/MonthlyPatternView'
import { ColorFrequencyCloud } from '@/components/history/ColorFrequencyCloud'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { PrimaryButton } from '@/components/ui/PrimaryButton'
import Link from 'next/link'

export default function HistoryPage() {
  const [readings, setReadings] = useState<Reading[]>([])
  const [selectedReading, setSelectedReading] = useState<Reading | null>(null)

  useEffect(() => {
    setReadings(getSavedReadings())
  }, [])

  const summary = analyzeReadingHistory(readings)

  return (
    <div className="w-full max-w-lg mx-auto py-4 space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-xs text-xs font-semibold text-slate-600">
          <HistoryIcon className="w-3.5 h-3.5" />
          <span>模式归档与记忆追踪</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900">
          你的模式档案
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xs mx-auto">
          记录过往核心困惑、高频出现的盲点与破局钥匙状态
        </p>
      </div>

      {/* 1. Monthly Recurring Pattern Insights */}
      <MonthlyPatternView summary={summary} />

      {/* 2. Color Frequency Cloud / Ring */}
      <ColorFrequencyCloud frequencies={summary.colorFrequencies} />

      {/* 3. Reading Archive List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-slate-400">
            已归档的觉察记录 ({readings.length})
          </span>
          <Link
            href="/reading"
            className="text-xs font-bold text-slate-700 hover:text-slate-900 transition-colors"
          >
            + 新起一牌
          </Link>
        </div>

        {readings.length === 0 ? (
          <GlassPanel variant="subtle" className="p-8 text-center space-y-3">
            <p className="text-xs text-slate-500">
              暂无历史觉察记录。立即开始你的第一次状态映射吧。
            </p>
            <Link href="/reading">
              <PrimaryButton size="md" icon={<Compass className="w-4 h-4" />}>
                开始状态觉察
              </PrimaryButton>
            </Link>
          </GlassPanel>
        ) : (
          <div className="space-y-2.5">
            {readings.map((reading) => (
              <HistoryCard
                key={reading.id}
                reading={reading}
                onClick={() => setSelectedReading(reading)}
              />
            ))}
          </div>
        )}
      </div>

      {/* History Detail Modal */}
      <HistoryDetailModal
        reading={selectedReading}
        onClose={() => setSelectedReading(null)}
      />
    </div>
  )
}
