'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MirrorResult } from '@/types/state8'
import { MirrorCard } from './MirrorCard'
import { Sparkles, RotateCw } from 'lucide-react'

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
  const allRevealed = revealedCount >= 8

  // 3x3 Grid Layout mapping (8 mirrors surrounding the center slot)
  // Index 0: Top-Left (Mirror 0 - 01 核心)
  // Index 1: Top-Center (Mirror 1 - 02 心念)
  // Index 2: Top-Right (Mirror 2 - 03 情绪)
  // Index 3: Middle-Left (Mirror 3 - 04 行动)
  // Index 4: Center Slot (翻牌圆环按钮)
  // Index 5: Middle-Right (Mirror 4 - 05 人际)
  // Index 6: Bottom-Left (Mirror 5 - 06 现实)
  // Index 7: Bottom-Center (Mirror 6 - 07 阻碍)
  // Index 8: Bottom-Right (Mirror 7 - 08 钥匙)

  const handleCenterClick = () => {
    if (currentRevealIndex < 8) {
      onRevealMirror(currentRevealIndex)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto px-1 sm:px-3">
      {/* Top Inquiry Banner */}
      <div className="text-center mb-3 sm:mb-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-slate-200 shadow-2xs text-xs font-semibold text-slate-700 mb-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span>八镜环照阵列 · 已翻开 {revealedCount} / 8</span>
        </div>

        <p className="text-xs text-slate-500 italic max-w-xs mx-auto truncate px-2">
          “{question}”
        </p>
      </div>

      {/* 3x3 Ring Grid Layout (9 cells) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-3 gap-2 sm:gap-3.5 items-center justify-items-center"
      >
        {/* Row 1, Col 1: Mirror 0 (01 核心) */}
        <MirrorCard
          mirror={mirrors[0]}
          isCurrentTarget={currentRevealIndex === 0}
          isLocked={currentRevealIndex < 0}
          onReveal={() => onRevealMirror(0)}
        />

        {/* Row 1, Col 2: Mirror 1 (02 心念) */}
        <MirrorCard
          mirror={mirrors[1]}
          isCurrentTarget={currentRevealIndex === 1}
          isLocked={currentRevealIndex < 1}
          onReveal={() => onRevealMirror(1)}
        />

        {/* Row 1, Col 3: Mirror 2 (03 情绪) */}
        <MirrorCard
          mirror={mirrors[2]}
          isCurrentTarget={currentRevealIndex === 2}
          isLocked={currentRevealIndex < 2}
          onReveal={() => onRevealMirror(2)}
        />

        {/* Row 2, Col 1: Mirror 3 (04 行动) */}
        <MirrorCard
          mirror={mirrors[3]}
          isCurrentTarget={currentRevealIndex === 3}
          isLocked={currentRevealIndex < 3}
          onReveal={() => onRevealMirror(3)}
        />

        {/* Row 2, Col 2: [CENTER] 翻牌触发聚焦点 */}
        <div className="flex flex-col items-center justify-center w-full aspect-[2/3] max-w-[125px] sm:max-w-[160px]">
          <motion.button
            whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 1.05 }}
            onClick={handleCenterClick}
            disabled={allRevealed}
            className="group relative w-18 h-18 sm:w-20 sm:h-20 rounded-full flex flex-col items-center justify-center cursor-pointer select-none transition-all"
          >
            {/* Golden brush ring effect */}
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-amber-400/80 group-hover:border-amber-500 animate-spin-slow" />
            <div className="absolute inset-1 rounded-full bg-gradient-to-tr from-amber-50 via-amber-100 to-amber-200/60 shadow-md flex items-center justify-center border border-amber-300" />

            {/* Inner Content */}
            <div className="relative z-10 flex flex-col items-center justify-center">
              <span className="text-sm sm:text-base font-bold text-amber-900 tracking-widest">
                {currentRevealIndex < 7 ? '翻牌' : currentRevealIndex === 7 ? '解钥' : '完成'}
              </span>
              <span className="text-[9px] text-amber-700/80 font-medium">
                {currentRevealIndex < 8 ? `第 0${currentRevealIndex + 1} 镜` : '已揭晓'}
              </span>
            </div>
          </motion.button>

          <span className="text-[10px] text-amber-700/70 font-semibold mt-2 text-center">
            点击中央或牌面
          </span>
        </div>

        {/* Row 2, Col 3: Mirror 4 (05 人际) */}
        <MirrorCard
          mirror={mirrors[4]}
          isCurrentTarget={currentRevealIndex === 4}
          isLocked={currentRevealIndex < 4}
          onReveal={() => onRevealMirror(4)}
        />

        {/* Row 3, Col 1: Mirror 5 (06 现实) */}
        <MirrorCard
          mirror={mirrors[5]}
          isCurrentTarget={currentRevealIndex === 5}
          isLocked={currentRevealIndex < 5}
          onReveal={() => onRevealMirror(5)}
        />

        {/* Row 3, Col 2: Mirror 6 (07 阻碍) */}
        <MirrorCard
          mirror={mirrors[6]}
          isCurrentTarget={currentRevealIndex === 6}
          isLocked={currentRevealIndex < 6}
          onReveal={() => onRevealMirror(6)}
        />

        {/* Row 3, Col 3: Mirror 7 (08 钥匙) */}
        <MirrorCard
          mirror={mirrors[7]}
          isCurrentTarget={currentRevealIndex === 7}
          isLocked={currentRevealIndex < 7}
          onReveal={() => onRevealMirror(7)}
        />
      </motion.div>
    </div>
  )
}
