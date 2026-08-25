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

  // 8 Petal Colors on the back emblem
  const petalColors = [
    '#f8fafc', // white
    '#a855f7', // purple
    '#3b82f6', // blue
    '#ec4899', // pink
    '#22c55e', // green
    '#eab308', // yellow
    '#f97316', // orange
    '#ef4444', // red
  ]

  return (
    <div className="flex flex-col items-center select-none w-full">
      {/* 3D Card Container */}
      <div
        onClick={handleClick}
        className={cn(
          'relative w-full aspect-[2/3] max-w-[125px] sm:max-w-[160px] rounded-2xl perspective-1000 transition-all duration-300',
          !isRevealed && isCurrentTarget && 'cursor-pointer hover:scale-[1.04] active:scale-[0.97]',
          isLocked && 'opacity-50 cursor-not-allowed',
          !isRevealed && !isCurrentTarget && !isLocked && 'opacity-65 cursor-not-allowed'
        )}
      >
        <motion.div
          animate={{ rotateY: isRevealed ? 180 : 0 }}
          transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
          className="w-full h-full relative transform-style-3d rounded-2xl"
        >
          {/* ================= CARD BACK (暖金琥珀·八色花瓣牌背) ================= */}
          <div
            className={cn(
              'absolute inset-0 rounded-2xl backface-hidden flex flex-col items-center justify-between p-2.5 sm:p-3.5',
              'bg-gradient-to-b from-[#ca8a04] via-[#b45309] to-[#92400e] text-white shadow-md border border-amber-300/40',
              isCurrentTarget && 'ring-3 ring-amber-400 shadow-xl shadow-amber-500/30 scale-[1.02]'
            )}
          >
            {/* Top Indicator */}
            <div className="w-full flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-amber-100/70">
                {position.code}
              </span>
              {isLocked ? (
                <Lock className="w-3 h-3 text-amber-200/60" />
              ) : isCurrentTarget ? (
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-90" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                </span>
              ) : null}
            </div>

            {/* Central 8-Petal Pinwheel Flower Motif */}
            <div className="flex flex-col items-center justify-center my-auto">
              <div className="relative w-11 h-11 sm:w-14 sm:h-14 flex items-center justify-center">
                {/* 8 colored petals radiating */}
                <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-sm">
                  {petalColors.map((hex, i) => {
                    const rotation = i * 45
                    return (
                      <g key={i} transform={`rotate(${rotation} 50 50)`}>
                        <path
                          d="M50,15 C55,25 60,38 50,50 C40,38 45,25 50,15 Z"
                          fill={hex}
                          stroke="rgba(255,255,255,0.4)"
                          strokeWidth="1"
                        />
                      </g>
                    )
                  })}
                  {/* Gold center disc */}
                  <circle cx="50" cy="50" r="8" fill="#fef08a" stroke="#d97706" strokeWidth="2" />
                </svg>
              </div>

              <span className="text-[9px] font-bold tracking-widest text-amber-100/90 uppercase mt-1">
                8MIRROR
              </span>
            </div>

            {/* Bottom Status */}
            <div className="text-center w-full">
              {isCurrentTarget ? (
                <span className="text-[10px] font-bold text-white animate-pulse tracking-wide bg-black/20 px-2 py-0.5 rounded-full">
                  轻触翻牌
                </span>
              ) : (
                <span className="text-[9px] text-amber-200/70 font-medium">
                  {position.name}
                </span>
              )}
            </div>
          </div>

          {/* ================= CARD FRONT (翻开后的彩瓣卡面) ================= */}
          <div
            className={cn(
              'absolute inset-0 rounded-2xl backface-hidden rotate-y-180 flex flex-col items-center justify-between p-2.5 sm:p-3.5 overflow-hidden',
              'border shadow-lg'
            )}
            style={{
              backgroundColor: '#ffffff',
              borderColor: color.hex,
              boxShadow: `0 8px 24px -4px rgba(${color.rgb}, 0.35)`,
            }}
          >
            {/* Background Watermark Petal Artwork */}
            <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
              <svg viewBox="0 0 100 100" className="w-full h-full scale-150 transform translate-x-4 -translate-y-4">
                <path
                  d="M50,10 C65,30 80,45 50,75 C20,45 35,30 50,10 Z"
                  fill={color.hex}
                />
                <path
                  d="M80,30 C90,50 85,75 50,65 C40,40 60,25 80,30 Z"
                  fill={color.hex}
                />
              </svg>
            </div>

            {/* Top Bar */}
            <div className="w-full flex items-center justify-between relative z-10">
              <span className="text-[10px] font-mono font-bold text-slate-400">
                {position.code}
              </span>
              <span
                className="text-[10px] font-bold px-1.5 py-0.5 rounded-md"
                style={{
                  backgroundColor: color.lightBg,
                  color: color.textColor,
                  border: `1px solid ${color.lightBorder}`,
                }}
              >
                {position.name}
              </span>
            </div>

            {/* Center Symbol & State */}
            <div className="flex flex-col items-center justify-center text-center relative z-10 my-auto">
              {/* White flower emblem with colored petals */}
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mb-1 flex items-center justify-center shadow-sm"
                style={{
                  backgroundColor: color.hex,
                }}
              >
                <svg viewBox="0 0 100 100" className="w-7 h-7">
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                    <g key={i} transform={`rotate(${angle} 50 50)`}>
                      <path
                        d="M50,18 C54,26 58,36 50,48 C42,36 46,26 50,18 Z"
                        fill="#ffffff"
                      />
                    </g>
                  ))}
                  <circle cx="50" cy="50" r="7" fill={color.lightBg} />
                </svg>
              </div>

              <h4 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 font-sans mt-0.5">
                {color.name} · {color.state}
              </h4>
              <p
                className="text-[11px] font-medium"
                style={{ color: color.textColor }}
              >
                {color.keywords.slice(0, 2).join(' / ')}
              </p>
            </div>

            {/* Bottom Subtitle */}
            <div className="text-center w-full relative z-10 pt-1 border-t border-slate-100">
              <div className="text-[10px] font-medium text-slate-500 truncate">
                {position.subtitle}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Subtitle below Card */}
      <div className="mt-1 text-center">
        <span className="text-xs font-bold text-slate-800 block">
          {position.code} {position.name}
        </span>
      </div>
    </div>
  )
}
