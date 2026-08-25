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
    <div className="flex flex-col items-center select-none group w-full">
      {/* 3D Flip Container */}
      <div
        onClick={handleClick}
        className={cn(
          'relative w-full aspect-[2/3] max-w-[170px] sm:max-w-[190px] rounded-2xl perspective-1000 transition-all duration-300',
          !isRevealed && isCurrentTarget && 'cursor-pointer hover:scale-[1.03]',
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
              'absolute inset-0 rounded-2xl backface-hidden flex flex-col items-center justify-between p-4 sm:p-5',
              'glass-panel border border-white/15 bg-gradient-to-b from-white/[0.08] to-transparent shadow-xl',
              isCurrentTarget && 'border-white/40 ring-2 ring-white/20 shadow-[0_0_25px_rgba(255,255,255,0.15)]'
            )}
          >
            {/* Top Indicator */}
            <div className="w-full flex items-center justify-between">
              <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">
                {position.code}
              </span>
              {isLocked ? (
                <Lock className="w-3 h-3 text-white/30" />
              ) : isCurrentTarget ? (
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                </span>
              ) : null}
            </div>

            {/* Central STATE/8 Symbol */}
            <div className="flex flex-col items-center justify-center">
              <div
                className={cn(
                  'w-12 h-12 sm:w-14 sm:h-14 rounded-full border flex items-center justify-center transition-all duration-300',
                  isCurrentTarget
                    ? 'border-white/60 bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                    : 'border-white/20 bg-white/5'
                )}
              >
                <div className="w-4 h-4 rounded-full border border-white/40 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
                </div>
              </div>
              <span className="text-[9px] font-mono tracking-[0.25em] text-white/30 uppercase mt-2.5">
                STATE/8
              </span>
            </div>

            {/* Bottom Status Prompt */}
            <div className="text-center w-full">
              {isCurrentTarget ? (
                <span className="text-[10px] font-mono tracking-widest text-white uppercase animate-pulse">
                  TAP TO REVEAL
                </span>
              ) : isLocked ? (
                <span className="text-[9px] font-mono tracking-widest text-white/30 uppercase">
                  {isKey ? 'LOCKED KEY' : 'WAITING'}
                </span>
              ) : (
                <span className="text-[9px] font-mono tracking-widest text-white/40 uppercase">
                  IN QUEUE
                </span>
              )}
            </div>
          </div>

          {/* ================= CARD FRONT (REVEALED) ================= */}
          <div
            className={cn(
              'absolute inset-0 rounded-2xl backface-hidden rotate-y-180 flex flex-col items-center justify-between p-4 sm:p-5 overflow-hidden',
              'glass-panel border shadow-2xl'
            )}
            style={{
              borderColor: `rgba(${color.rgb}, 0.5)`,
              boxShadow: `0 0 35px -5px rgba(${color.rgb}, 0.35), inset 0 0 20px rgba(${color.rgb}, 0.15)`,
              background: `radial-gradient(circle at 50% 25%, rgba(${color.rgb}, 0.18) 0%, rgba(14, 14, 18, 0.95) 85%)`,
            }}
          >
            {/* Ambient Interior Glow */}
            <div
              className="absolute -top-12 -right-12 w-28 h-28 rounded-full blur-2xl opacity-40 pointer-events-none"
              style={{ backgroundColor: color.glowHex }}
            />

            {/* Top: Number & Mirror Name */}
            <div className="w-full flex items-center justify-between relative z-10">
              <span className="text-[10px] font-mono tracking-widest uppercase font-semibold text-white/60">
                {position.code}
              </span>
              <span
                className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-full border"
                style={{
                  color: color.hex,
                  borderColor: `rgba(${color.rgb}, 0.35)`,
                  backgroundColor: `rgba(${color.rgb}, 0.1)`,
                }}
              >
                {position.chinese}
              </span>
            </div>

            {/* Center: Color & State */}
            <div className="flex flex-col items-center justify-center text-center relative z-10">
              {/* Luminous Orb Badge */}
              <div
                className="w-10 h-10 rounded-full border mb-3 flex items-center justify-center"
                style={{
                  borderColor: `rgba(${color.rgb}, 0.6)`,
                  background: `radial-gradient(circle, ${color.hex} 0%, rgba(${color.rgb}, 0.4) 60%, transparent 100%)`,
                  boxShadow: `0 0 16px ${color.glowHex}`,
                }}
              >
                <Sparkles className="w-4 h-4 text-white drop-shadow" />
              </div>

              <h4 className="text-xl sm:text-2xl font-mono font-bold tracking-widest uppercase text-white">
                {color.name}
              </h4>
              <p
                className="text-sm font-mono tracking-[0.2em] uppercase font-semibold mt-0.5"
                style={{ color: color.hex }}
              >
                {color.state}
              </p>
            </div>

            {/* Bottom: Position Label */}
            <div className="text-center w-full relative z-10 pt-2 border-t border-white/10">
              <div className="text-[10px] font-mono tracking-[0.2em] text-white/80 uppercase font-medium">
                {position.name}
              </div>
              <div className="text-[9px] text-white/40 font-mono mt-0.5">
                {position.subtitle}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* External Subtitle below Card */}
      <div className="mt-2.5 text-center">
        <span className="text-[11px] font-mono tracking-widest uppercase text-white/70 block">
          {position.name}
        </span>
        <span className="text-[10px] text-white/40 font-sans block">
          {position.chinese} · {position.subtitle}
        </span>
      </div>
    </div>
  )
}
