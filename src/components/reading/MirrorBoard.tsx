'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MirrorResult } from '@/types/state8'
import { MirrorCard } from './MirrorCard'

interface MirrorBoardProps {
  mirrors: MirrorResult[]
  currentRevealIndex: number // 0 to 7
  onRevealMirror: (index: number) => void
  question: string
}

export function MirrorBoard({
  mirrors,
  currentRevealIndex,
  onRevealMirror,
  question,
}: MirrorBoardProps) {
  const revealedCount = mirrors.filter((m) => m.isRevealed).length

  return (
    <div className="w-full max-w-6xl mx-auto px-2 sm:px-4">
      {/* Top Header & Question Pill */}
      <div className="text-center mb-8 sm:mb-10">
        {/* Progress Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel-subtle border border-white/15 text-xs font-mono tracking-widest uppercase text-white/80 mb-3">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span>
            {revealedCount} / 8 MIRRORS REVEALED
          </span>
        </div>

        {/* Question Header */}
        <p className="text-sm sm:text-base text-white/50 italic max-w-xl mx-auto truncate px-4">
          &ldquo;{question}&rdquo;
        </p>
      </div>

      {/* 2 x 4 Grid Desktop / Responsive Mobile Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 justify-items-center"
      >
        {mirrors.map((mirror, index) => {
          const isCurrentTarget = index === currentRevealIndex
          const isLocked = index > currentRevealIndex
          // KEY is at index 7, locked until 0-6 are revealed
          const isKeyLocked = index === 7 && currentRevealIndex < 7

          return (
            <MirrorCard
              key={mirror.position.id}
              mirror={mirror}
              isCurrentTarget={isCurrentTarget && !isKeyLocked}
              isLocked={isLocked || isKeyLocked}
              onReveal={() => onRevealMirror(index)}
            />
          )
        })}
      </motion.div>
    </div>
  )
}
