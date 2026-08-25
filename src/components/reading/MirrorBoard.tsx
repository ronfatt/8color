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
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4">
      {/* Top Header & Progress */}
      <div className="text-center mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-slate-200 shadow-sm text-xs font-semibold text-slate-700 mb-2.5">
          <span className="w-2 h-2 rounded-full bg-slate-800 animate-pulse" />
          <span>已映照 {revealedCount} / 8 面镜像</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-500 italic max-w-md mx-auto truncate px-3">
          “{question}”
        </p>
      </div>

      {/* 2 x 4 Grid / Mobile Ergonomic Grid */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-5 justify-items-center"
      >
        {mirrors.map((mirror, index) => {
          const isCurrentTarget = index === currentRevealIndex
          const isLocked = index > currentRevealIndex
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
