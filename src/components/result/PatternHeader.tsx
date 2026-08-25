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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
    >
      {/* Subdued Question Reminder */}
      <div className="inline-block px-4 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs text-white/50 italic mb-6 max-w-xl truncate">
        &ldquo;{question}&rdquo;
      </div>

      <div className="space-y-3">
        <span className="text-xs font-mono tracking-[0.3em] uppercase text-white/40 block">
          YOUR CURRENT PATTERN
        </span>

        {/* Dynamic Pattern Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-mono font-black tracking-wider uppercase text-white text-gradient-white">
          {pattern.title}
        </h1>

        {/* Pattern Archetype */}
        <div className="text-sm font-mono tracking-[0.2em] uppercase text-white/60">
          [{pattern.archetype}]
        </div>

        {/* Core Diagnosis Summary */}
        <p className="text-base sm:text-lg text-white/80 font-light max-w-2xl mx-auto leading-relaxed pt-2">
          {pattern.summary}
        </p>
      </div>

      {/* Key State Badge Spotlight */}
      <div className="mt-8 flex items-center justify-center gap-3">
        <div className="text-xs font-mono tracking-widest uppercase text-white/40">
          PRIMARY KEY:
        </div>
        <StateBadge color={keyColor} size="lg" showKeywords />
      </div>
    </motion.div>
  )
}
