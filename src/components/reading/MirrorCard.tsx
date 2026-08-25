'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Lock, Sparkles } from 'lucide-react'
import { MirrorResult } from '@/types/state8'
import { cn } from '@/lib/utils'

interface MirrorCardProps {
  mirror: MirrorResult
  isCurrentTarget: boolean
  isLocked: boolean
  onReveal: () => void
  disabled?: boolean
}

export function MirrorCard({
  mirror,
  isCurrentTarget,
  isLocked,
  onReveal,
  disabled = false,
}: MirrorCardProps) {
  const { position, color, isRevealed } = mirror
  const isKey = position.id === 'key'

  const handleClick = () => {
    if (!isRevealed && isCurrentTarget && !disabled) {
      onReveal()
    }
  }

  return (
    <div className="flex flex-col items-center select-none w-full">
      {/* 3D Card Container */}
      <div
        onClick={handleClick}
        className={cn(
          'relative w-full aspect-[2/3] max-w-[155px] sm:max-w-[180px] rounded-2xl perspective-1000 transition-all duration-300',
          !isRevealed && isCurrentTarget && 'cursor-pointer hover:scale-[1.03] active:scale-[0.98]',
          isLocked && 'opacity-40 cursor-not-allowed',
          !isRevealed && !isCurrentTarget && !isLocked && 'opacity-60 cursor-not-allowed'
        )}
      >
        <motion.div
          animate={{ rotateY: isRevealed ? 180 : 0 }}
          transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
          className="w-full h-full relative transform-style-3d rounded-2xl"
        >
          {/* ================= CARD BACK (UNREVEALED) ================= */}
          <div
            className={cn(
              'absolute inset-0 rounded-2xl backface-hidden flex flex-col items-center justify-between p-3.5 sm:p-4',
              'bg-white/90 backdrop-blur-xl border border-slate-200 shadow-md',
              isCurrentTarget && 'border-slate-400 ring-2 ring-slate-300 shadow-lg shadow-slate-200/80 bg-white'
            )}
          >
            {/* Top Indicator */}
            <div className="w-full flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-slate-400">
                {position.code}
              </span>
              {isLocked ? (
                <Lock className="w-3 h-3 text-slate-300" />
              ) : isCurrentTarget ? (
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-800 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-900" />
                </span>
              ) : null}
            </div>

            {/* Central Symbol */}
            <div className="flex flex-col items-center justify-center">
              <div
                className={cn(
                  'w-10 h-10 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center transition-all duration-200',
                  isCurrentTarget
                    ? 'border-slate-400 bg-slate-100 shadow-inner'
                    : 'border-slate-200 bg-slate-50'
                )}
              >
                <div className="w-3.5 h-3.5 rounded-full border border-slate-400 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                </div>
              </div>
              <span className="text-[9px] font-bold tracking-widest text-slate-400 uppercase mt-1.5">
                8MIRROR
              </span>
            </div>

            {/* Bottom Status */}
            <div className="text-center w-full">
              {isCurrentTarget ? (
                <span className="text-[10px] font-bold text-slate-900 animate-pulse tracking-wide">
                  轻触翻开
                </span>
              ) : isLocked ? (
                <span className="text-[9px] text-slate-400">
                  {isKey ? '锁定中' : '等待'}
                </span>
              ) : (
                <span className="text-[9px] text-slate-400">
                  待翻开
                </span>
              )}
            </div>
          </div>

          {/* ================= CARD FRONT (REVEALED) ================= */}
          <div
            className={cn(
              'absolute inset-0 rounded-2xl backface-hidden rotate-y-180 flex flex-col items-center justify-between p-3.5 sm:p-4 overflow-hidden',
              'border shadow-lg'
            )}
            style={{
              borderColor: color.lightBorder,
              backgroundColor: '#ffffff',
              boxShadow: `0 8px 24px -4px rgba(${color.rgb}, 0.25)`,
            }}
          >
            {/* Top ambient color gradient */}
            <div
              className="absolute -top-8 -right-8 w-24 h-24 rounded-full blur-xl opacity-50 pointer-events-none"
              style={{ backgroundColor: color.glowHex }}
            />

            {/* Top Number & Tag */}
            <div className="w-full flex items-center justify-between relative z-10">
              <span className="text-[10px] font-mono font-bold text-slate-400">
                {position.code}
              </span>
              <span
                className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: color.lightBg,
                  color: color.textColor,
                  border: `1px solid ${color.lightBorder}`,
                }}
              >
                {position.name}
              </span>
            </div>

            {/* Center State Showcase */}
            <div className="flex flex-col items-center justify-center text-center relative z-10">
              {/* Luminous Orb Badge */}
              <div
                className="w-10 h-10 rounded-full border mb-2 flex items-center justify-center shadow-md"
                style={{
                  borderColor: color.hex,
                  backgroundColor: color.lightBg,
                  boxShadow: `0 2px 10px ${color.glowHex}`,
                }}
              >
                <Sparkles className="w-4 h-4" style={{ color: color.textColor }} />
              </div>

              <h4 className="text-xl sm:text-2xl font-bold tracking-wide text-slate-900 font-sans">
                {color.name} · {color.state}
              </h4>
              <p
                className="text-xs font-medium mt-0.5"
                style={{ color: color.textColor }}
              >
                {color.keywords.slice(0, 2).join(' / ')}
              </p>
            </div>

            {/* Bottom Position Label */}
            <div className="text-center w-full relative z-10 pt-1.5 border-t border-slate-100">
              <div className="text-[10px] font-bold text-slate-700">
                {position.subtitle}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Subtitle below Card */}
      <div className="mt-2 text-center">
        <span className="text-xs font-bold text-slate-800 block">
          {position.code} {position.name}
        </span>
        <span className="text-[10px] text-slate-400 block font-normal">
          {position.subtitle}
        </span>
      </div>
    </div>
  )
}
