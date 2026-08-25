'use client'

import React from 'react'
import { HistoryPatternSummary } from '@/lib/state8/types'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { AlertTriangle, Compass, Key, ShieldAlert } from 'lucide-react'

interface MonthlyPatternViewProps {
  summary: HistoryPatternSummary
}

export function MonthlyPatternView({ summary }: MonthlyPatternViewProps) {
  const { mostCommonKey, mostCommonBlock, mostCommonCategory, repeatingBlockAlert } = summary

  return (
    <div className="space-y-3">
      {/* 4 Block Matrix */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
        {/* Most common key */}
        <GlassPanel variant="card" className="p-3.5 space-y-1">
          <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase">
            <Key className="w-3 h-3 text-amber-500" />
            <span>高频钥匙状态</span>
          </div>
          <div className="text-base sm:text-lg font-bold text-slate-900">
            {mostCommonKey ? `${mostCommonKey.name} · ${mostCommonKey.state}` : '暂无数据'}
          </div>
          <div className="text-[11px] text-slate-500">
            {mostCommonKey ? mostCommonKey.actionAdvice : '完成起牌后生成'}
          </div>
        </GlassPanel>

        {/* Most common block */}
        <GlassPanel variant="card" className="p-3.5 space-y-1">
          <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase">
            <ShieldAlert className="w-3 h-3 text-rose-500" />
            <span>高频阻碍盲区</span>
          </div>
          <div className="text-base sm:text-lg font-bold text-slate-900">
            {mostCommonBlock ? `${mostCommonBlock.name} · ${mostCommonBlock.state}` : '暂无数据'}
          </div>
          <div className="text-[11px] text-slate-500">
            {mostCommonBlock ? '核心阻碍惯性' : '完成起牌后生成'}
          </div>
        </GlassPanel>

        {/* Question Focus */}
        <GlassPanel variant="card" className="p-3.5 space-y-1">
          <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase">
            <Compass className="w-3 h-3 text-blue-500" />
            <span>问题主聚焦点</span>
          </div>
          <div className="text-base sm:text-lg font-bold text-slate-900">
            {mostCommonCategory || '职场与抉择'}
          </div>
          <div className="text-[11px] text-slate-500">
            主要探究维度
          </div>
        </GlassPanel>

        {/* Recent Archetype */}
        <GlassPanel variant="card" className="p-3.5 space-y-1">
          <div className="text-[10px] font-bold text-slate-400 uppercase">
            主导模式形态
          </div>
          <div className="text-base sm:text-lg font-bold text-slate-900 truncate">
            {summary.recentArchetypes[0] || '结构重组型'}
          </div>
          <div className="text-[11px] text-slate-500">
            近期核心动态
          </div>
        </GlassPanel>
      </div>

      {/* Repeating Pattern Warning Alert */}
      {repeatingBlockAlert && (
        <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-xs space-y-1 animate-fadeIn">
          <div className="flex items-center gap-1.5 font-bold">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>重复模式预警（REPEATING PATTERN）</span>
          </div>
          <p className="leading-relaxed text-amber-950 font-normal pl-5">
            {repeatingBlockAlert.explanation}
          </p>
        </div>
      )}
    </div>
  )
}
