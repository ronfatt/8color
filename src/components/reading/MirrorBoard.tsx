'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MirrorResult } from '@/types/state8'
import { MirrorCard } from './MirrorCard'
import { ArrowRight, Sparkles } from 'lucide-react'
import { PrimaryButton } from '@/components/ui/PrimaryButton'

interface MirrorBoardProps {
  mirrors: MirrorResult[]
  isAllRevealed: boolean
  onFlipAll: () => void
  onComplete: () => void
  question: string
}

export function MirrorBoard({
  mirrors,
  isAllRevealed,
  onFlipAll,
  onComplete,
  question,
}: MirrorBoardProps) {
  // 3x3 Layout mappings:
  // Row 1: [0] 01 核心, [1] 02 心念, [2] 03 情绪
  // Row 2: [3] 04 行动, [CENTER] 翻牌, [4] 05 人际
  // Row 3: [5] 06 现实, [6] 07 阻碍, [7] 08 钥匙

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto px-2 py-2 flex flex-col items-center">
      {/* Top Question Banner */}
      <div className="text-center mb-3 sm:mb-4">
        <p className="text-xs text-slate-500 font-medium italic max-w-xs mx-auto truncate px-2">
          “{question}”
        </p>
      </div>

      {/* 3x3 Ring Grid Layout (9 cells) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-3 gap-x-2 gap-y-3 sm:gap-x-3.5 sm:gap-y-4 items-center justify-items-center w-full"
      >
        {/* Row 1, Col 1: Mirror 0 (01 核心) */}
        <MirrorCard
          mirror={mirrors[0]}
          flipDelay={0.0}
          onClick={!isAllRevealed ? onFlipAll : undefined}
        />

        {/* Row 1, Col 2: Mirror 1 (02 心念) */}
        <MirrorCard
          mirror={mirrors[1]}
          flipDelay={0.06}
          onClick={!isAllRevealed ? onFlipAll : undefined}
        />

        {/* Row 1, Col 3: Mirror 2 (03 情绪) */}
        <MirrorCard
          mirror={mirrors[2]}
          flipDelay={0.12}
          onClick={!isAllRevealed ? onFlipAll : undefined}
        />

        {/* Row 2, Col 1: Mirror 3 (04 行动) */}
        <MirrorCard
          mirror={mirrors[3]}
          flipDelay={0.18}
          onClick={!isAllRevealed ? onFlipAll : undefined}
        />

        {/* Row 2, Col 2: [CENTER] 翻牌金环交互中心 */}
        <div className="flex flex-col items-center justify-center w-full aspect-[9/15] max-w-[118px] sm:max-w-[145px]">
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.06 }}
            onClick={!isAllRevealed ? onFlipAll : onComplete}
            className="group relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex flex-col items-center justify-center cursor-pointer select-none transition-all"
          >
            {/* Gold Ink Brush Stroke Circle Ring */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-xs">
                <defs>
                  <linearGradient id="goldBrushGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#d97706" />
                    <stop offset="30%" stopColor="#fbbf24" />
                    <stop offset="70%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#b45309" />
                  </linearGradient>
                </defs>
                {/* Brush ring stroke */}
                <path
                  d="M 50,14 A 36,36 0 1,1 20,32"
                  fill="none"
                  stroke="url(#goldBrushGrad)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  className="transition-all duration-700"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="0.8"
                  strokeDasharray="2 3"
                  className="opacity-60 animate-spin-slow"
                />
              </svg>
            </div>

            {/* Inner Label */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center">
              <span className="text-xs sm:text-sm font-bold text-[#b45309] tracking-widest font-sans">
                {isAllRevealed ? '已揭晓' : '翻牌'}
              </span>
            </div>
          </motion.button>
        </div>

        {/* Row 2, Col 3: Mirror 4 (05 人际) */}
        <MirrorCard
          mirror={mirrors[4]}
          flipDelay={0.24}
          onClick={!isAllRevealed ? onFlipAll : undefined}
        />

        {/* Row 3, Col 1: Mirror 5 (06 现实) */}
        <MirrorCard
          mirror={mirrors[5]}
          flipDelay={0.30}
          onClick={!isAllRevealed ? onFlipAll : undefined}
        />

        {/* Row 3, Col 2: Mirror 6 (07 阻碍) */}
        <MirrorCard
          mirror={mirrors[6]}
          flipDelay={0.36}
          onClick={!isAllRevealed ? onFlipAll : undefined}
        />

        {/* Row 3, Col 3: Mirror 7 (08 钥匙) */}
        <MirrorCard
          mirror={mirrors[7]}
          flipDelay={0.42}
          onClick={!isAllRevealed ? onFlipAll : undefined}
        />
      </motion.div>

      {/* Bottom CTA after flipping all */}
      {isAllRevealed && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="mt-5 w-full max-w-xs text-center"
        >
          <PrimaryButton
            size="lg"
            onClick={onComplete}
            className="w-full"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            查看完整状态解构
          </PrimaryButton>
        </motion.div>
      )}
    </div>
  )
}
