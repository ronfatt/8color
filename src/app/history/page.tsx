'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { History as HistoryIcon, Sparkles, Compass, TrendingUp, BarChart2 } from 'lucide-react'
import { Reading } from '@/types/state8'
import { getSavedReadings } from '@/lib/storage'
import { STATE_COLORS } from '@/lib/constants'
import { HistoryCard } from '@/components/history/HistoryCard'
import { HistoryDetailModal } from '@/components/history/HistoryDetailModal'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { StateBadge } from '@/components/ui/StateBadge'
import { PrimaryButton } from '@/components/ui/PrimaryButton'
import Link from 'next/link'

export default function HistoryPage() {
  const [readings, setReadings] = useState<Reading[]>([])
  const [selectedReading, setSelectedReading] = useState<Reading | null>(null)

  useEffect(() => {
    setReadings(getSavedReadings())
  }, [])

  // Distribution stats
  const totalCount = readings.length
  const mostFrequentKey = STATE_COLORS.orange

  const stats = [
    { label: 'Total Inquiries', value: `${totalCount}`, note: 'Reflections recorded' },
    { label: 'Most Frequent Key', value: 'ORANGE', note: 'TIMING dominance', color: STATE_COLORS.orange },
    { label: 'Dominant Friction', value: 'RED', note: 'Premature Force', color: STATE_COLORS.red },
    { label: 'Active Relational State', value: 'BLUE', note: 'VOICE required', color: STATE_COLORS.blue },
  ]

  const patternDistribution = [
    { name: 'TIMING (ORANGE)', count: 5, pct: 42, color: STATE_COLORS.orange },
    { name: 'SHIFT (GREEN)', count: 4, pct: 33, color: STATE_COLORS.green },
    { name: 'VOICE (BLUE)', count: 2, pct: 17, color: STATE_COLORS.blue },
    { name: 'INSIGHT (PURPLE)', count: 1, pct: 8, color: STATE_COLORS.purple },
  ]

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/5 border border-white/15 text-xs font-mono tracking-[0.25em] uppercase text-white/70">
          <HistoryIcon className="w-3.5 h-3.5" />
          <span>ARCHIVE & METRICS</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-mono font-black tracking-wider uppercase text-white text-gradient-white">
          YOUR PATTERNS
        </h1>
        <p className="text-sm sm:text-base text-white/50 font-light max-w-md mx-auto">
          Historical overview of recurring states, core blindspots, and key vector directions.
        </p>
      </div>

      {/* Monthly Pattern Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, idx) => (
          <GlassPanel key={idx} variant="card" className="p-5 sm:p-6 space-y-2">
            <div className="text-[10px] font-mono tracking-widest text-white/40 uppercase">
              {stat.label}
            </div>
            <div
              className="text-2xl sm:text-3xl font-mono font-bold uppercase tracking-wider"
              style={{ color: stat.color ? stat.color.hex : '#ffffff' }}
            >
              {stat.value}
            </div>
            <div className="text-xs text-white/50 font-mono">
              {stat.note}
            </div>
          </GlassPanel>
        ))}
      </div>

      {/* Minimalist Pattern Frequency Distribution */}
      <GlassPanel variant="glow" className="p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-white/70" />
            <h3 className="text-sm font-mono font-bold tracking-widest uppercase text-white">
              KEY FREQUENCY DISTRIBUTION
            </h3>
          </div>
          <span className="text-xs font-mono text-white/40 uppercase">
            CURRENT CYCLE
          </span>
        </div>

        <div className="space-y-4">
          {patternDistribution.map((item) => (
            <div key={item.name} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-white/80">{item.name}</span>
                <span className="text-white/40">{item.count} readings ({item.pct}%)</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{
                    backgroundColor: item.color.hex,
                    boxShadow: `0 0 10px ${item.color.glowHex}`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </GlassPanel>

      {/* Reading Archive List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-mono tracking-[0.25em] text-white/40 uppercase">
            RECORDED INQUIRIES ({readings.length})
          </span>
          <Link
            href="/reading"
            className="text-xs font-mono text-white/50 hover:text-white transition-colors uppercase"
          >
            + New Reading
          </Link>
        </div>

        {readings.length === 0 ? (
          <GlassPanel variant="subtle" className="p-12 text-center space-y-4">
            <p className="text-sm text-white/50 font-light">
              No readings archived yet. Begin your first inquiry to map your pattern.
            </p>
            <Link href="/reading">
              <PrimaryButton size="md" icon={<Compass className="w-4 h-4" />}>
                Start A Reading
              </PrimaryButton>
            </Link>
          </GlassPanel>
        ) : (
          <div className="space-y-3">
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
