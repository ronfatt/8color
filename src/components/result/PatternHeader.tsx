'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { PatternAnalysis, StateColor } from '@/lib/state8/types'
import { StateBadge } from '@/components/ui/StateBadge'
import { Compass, Flame, ShieldAlert, Key, HelpCircle } from 'lucide-react'

interface PatternHeaderProps {
  analysis: PatternAnalysis
  keyColor: StateColor
  question: string
}

export function PatternHeader({ analysis, keyColor, question }: PatternHeaderProps) {
  const { primaryPattern, fourLayerSummary, questionContext } = analysis

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center max-w-xl mx-auto space-y-6"
    >
      {/* Question Context Pill & Original Question */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-600 shadow-2xs">
          <Compass className="w-3.5 h-3.5 text-slate-500" />
          <span>{questionContext.primaryLabel}</span>
          {questionContext.secondaryLabel && (
            <>
              <span className="opacity-40">·</span>
              <span>{questionContext.secondaryLabel}</span>
            </>
          )}
        </div>

        <blockquote className="text-base sm:text-lg font-bold text-slate-900 leading-snug px-3">
          “{question}”
        </blockquote>
      </div>

      {/* Main Pattern Archetype Header */}
      <div className="space-y-2 pt-1">
        <span className="text-[11px] font-bold tracking-widest uppercase text-slate-400 block">
          当前状态模式解析
        </span>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 font-sans">
          {primaryPattern.name}
        </h1>

        <div className="text-xs sm:text-sm font-semibold tracking-wider text-slate-500">
          【{primaryPattern.chineseName} · {primaryPattern.archetype}】
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto pt-1">
          {primaryPattern.summary}
        </p>
      </div>

      {/* Key State Badge Spotlight */}
      <div className="flex items-center justify-center gap-2">
        <div className="text-xs font-bold text-slate-400">
          破局钥匙：
        </div>
        <StateBadge color={keyColor} size="lg" showKeywords />
      </div>

      {/* 4-Layer Diagnostic Summary Cards */}
      <div className="grid grid-cols-1 gap-2.5 text-left pt-2">
        {/* 1. CORE */}
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase">
            <HelpCircle className="w-3.5 h-3.5 text-indigo-500" />
            <span>核心本意（CORE）</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-800 font-medium pl-5 leading-relaxed">
            {fourLayerSummary.core}
          </p>
        </div>

        {/* 2. TENSION */}
        <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/80 shadow-2xs space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 uppercase">
            <Flame className="w-3.5 h-3.5 text-amber-600" />
            <span>内在拉扯（TENSION）</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-800 font-medium pl-5 leading-relaxed">
            {fourLayerSummary.tension}
          </p>
        </div>

        {/* 3. BLOCK */}
        <div className="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-200/80 shadow-2xs space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 uppercase">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
            <span>主要卡点（BLOCK）</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-800 font-medium pl-5 leading-relaxed">
            {fourLayerSummary.block}
          </p>
        </div>

        {/* 4. KEY */}
        <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 shadow-2xs space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 uppercase">
            <Key className="w-3.5 h-3.5 text-emerald-600" />
            <span>破局支点（KEY）</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-900 font-bold pl-5 leading-relaxed">
            {fourLayerSummary.key}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
