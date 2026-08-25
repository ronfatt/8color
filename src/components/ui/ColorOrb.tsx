'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { StateColor } from '@/types/state8'
import { cn } from '@/lib/utils'

interface ColorOrbProps {
  color: StateColor
  size?: number | string
  isInteractive?: boolean
  isBreathing?: boolean
  className?: string
  onClick?: () => void
  showLabel?: boolean
}

export function ColorOrb({
  color,
  size = 64,
  isInteractive = true,
  isBreathing = true,
  className,
  onClick,
  showLabel = false,
}: ColorOrbProps) {
  const numSize = typeof size === 'number' ? size : 64

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center group select-none',
        isInteractive && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      <motion.div
        whileHover={isInteractive ? { scale: 1.1 } : undefined}
        whileTap={isInteractive ? { scale: 0.95 } : undefined}
        animate={
          isBreathing
            ? {
                scale: [1, 1.05, 1],
                opacity: [0.9, 1, 0.9],
              }
            : undefined
        }
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative flex items-center justify-center"
        style={{ width: numSize, height: numSize }}
      >
        {/* Soft Ambient Pastel Glow */}
        <div
          className="absolute inset-0 rounded-full blur-lg transition-opacity duration-300 opacity-70 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle, ${color.glowHex} 0%, rgba(${color.rgb}, 0.3) 60%, transparent 100%)`,
            transform: 'scale(1.35)',
          }}
        />

        {/* Translucent Crystal Core */}
        <div
          className="absolute inset-0 rounded-full border transition-all duration-300 shadow-md"
          style={{
            background: `radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.95) 0%, rgba(${color.rgb}, 0.65) 55%, rgba(${color.rgb}, 0.3) 100%)`,
            borderColor: `rgba(${color.rgb}, 0.5)`,
            boxShadow: `inset 0 2px 6px rgba(255, 255, 255, 0.8), 0 4px 12px rgba(${color.rgb}, 0.35)`,
          }}
        />

        {/* Specular Highlight */}
        <div className="absolute top-[16%] left-[22%] w-[26%] h-[20%] rounded-full bg-white/90 blur-[0.5px] transform -rotate-45" />

        {/* Center Chinese Character Label */}
        <span
          className="relative z-10 text-xs font-bold text-slate-800 drop-shadow-sm font-sans"
        >
          {color.name}
        </span>
      </motion.div>

      {showLabel && (
        <div className="mt-2.5 text-center">
          <div className="text-xs font-bold text-slate-800 tracking-wide">
            {color.name} · {color.state}
          </div>
          <div className="text-[11px] text-slate-500 font-normal mt-0.5">
            {color.keywords.slice(0, 2).join(' / ')}
          </div>
        </div>
      )}
    </div>
  )
}
