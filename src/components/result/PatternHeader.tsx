'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { PatternSynthesis, StateColor } from '@/types/state8'
import { StateBadge } from '@/components/ui/StateBadge'

interface PatternHeaderProps {
  pattern: PatternSynthesis
  keyColor: StateColor
  question: string
}

export function PatternHeader({ pattern, keyColor, question }: PatternHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center max-w-xl mx-auto mb-8 sm:mb-12"
    >
      {/* Question Tag */}
      <div className="inline-block px-4 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs text-slate-600 italic mb-4 max-w-md truncate shadow-2xs">
        “{question}”
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold tracking-widest uppercase text-slate-400 block">
          当前状态模式解析
        </span>

        {/* Pattern Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 font-sans">
          {pattern.title}
        </h1>

        {/* Pattern Archetype */}
        <div className="text-xs sm:text-sm font-semibold tracking-wider text-slate-500">
          【{pattern.archetype}】
        </div>

        {/* Diagnosis Summary */}
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed pt-2 font-normal">
          {pattern.summary}
        </p>
      </div>

      {/* Key State Badge */}
      <div className="mt-6 flex items-center justify-center gap-2.5">
        <div className="text-xs font-bold text-slate-400">
          破局关键状态：
        </div>
        <StateBadge color={keyColor} size="lg" showKeywords />
      </div>
    </motion.div>
  )
}
