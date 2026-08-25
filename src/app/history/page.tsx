'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { History as HistoryIcon, Compass, BarChart2 } from 'lucide-react'
import { Reading } from '@/types/state8'
import { getSavedReadings } from '@/lib/storage'
import { STATE_COLORS } from '@/lib/constants'
import { HistoryCard } from '@/components/history/HistoryCard'
import { HistoryDetailModal } from '@/components/history/HistoryDetailModal'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { PrimaryButton } from '@/components/ui/PrimaryButton'
import Link from 'next/link'

export default function HistoryPage() {
  const [readings, setReadings] = useState<Reading[]>([])
  const [selectedReading, setSelectedReading] = useState<Reading | null>(null)

  useEffect(() => {
    setReadings(getSavedReadings())
  }, [])

  const totalCount = readings.length

  const stats = [
    { label: '历史觉察总数', value: `${totalCount}`, note: '次模式记录' },
    { label: '最高频钥匙', value: '橙 · 时机', note: '蓄势深耕占优', color: STATE_COLORS.orange },
    { label: '主导拉扯卡点', value: '红 · 强推', note: '避免硬碰硬', color: STATE_COLORS.red },
    { label: '活跃人际状态', value: '蓝 · 表达', note: '坦诚对齐共识', color: STATE_COLORS.blue },
  ]

  const patternDistribution = [
    { name: '橙 · 时机 (蓄力酝酿)', count: 5, pct: 42, color: STATE_COLORS.orange },
    { name: '绿 · 转化 (结构调整)', count: 4, pct: 33, color: STATE_COLORS.green },
    { name: '蓝 · 表达 (真实沟通)', count: 2, pct: 17, color: STATE_COLORS.blue },
    { name: '紫 · 觉察 (抽离内观)', count: 1, pct: 8, color: STATE_COLORS.purple },
  ]

  return (
    <div className="w-full max-w-lg mx-auto py-4 space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-xs text-xs font-semibold text-slate-600">
          <HistoryIcon className="w-3.5 h-3.5" />
          <span>模式归档与统计</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900">
          你的模式档案
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xs mx-auto">
          记录过往核心困惑、高频出现的盲点与破局钥匙状态
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
        {stats.map((stat, idx) => (
          <GlassPanel key={idx} variant="card" className="p-3.5 sm:p-4 space-y-1">
            <div className="text-[10px] font-bold text-slate-400">
              {stat.label}
            </div>
            <div
              className="text-lg sm:text-xl font-bold"
              style={{ color: stat.color ? stat.color.textColor : '#0f172a' }}
            >
              {stat.value}
            </div>
            <div className="text-[11px] text-slate-500">
              {stat.note}
            </div>
          </GlassPanel>
        ))}
      </div>

      {/* Pattern Distribution Bar */}
      <GlassPanel variant="glow" className="p-4 sm:p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5">
            <BarChart2 className="w-4 h-4 text-slate-700" />
            <h3 className="text-xs font-bold text-slate-900">
              钥匙状态分布比例
            </h3>
          </div>
          <span className="text-[10px] text-slate-400">
            当月统计
          </span>
        </div>

        <div className="space-y-3">
          {patternDistribution.map((item) => (
            <div key={item.name} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">{item.name}</span>
                <span className="text-slate-400 font-mono">{item.count}次 ({item.pct}%)</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/80">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{
                    backgroundColor: item.color.hex,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </GlassPanel>

      {/* Reading Archive List */}
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
