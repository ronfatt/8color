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
        'flex flex-col items-center justify-center group',
        isInteractive && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      <motion.div
        whileHover={isInteractive ? { scale: 1.12 } : undefined}
        whileTap={isInteractive ? { scale: 0.94 } : undefined}
        animate={
          isBreathing
            ? {
                scale: [1, 1.06, 1],
                opacity: [0.85, 1, 0.85],
              }
            : undefined
        }
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative flex items-center justify-center"
        style={{ width: numSize, height: numSize }}
      >
        {/* Outer ambient atmospheric glow */}
        <div
          className="absolute inset-0 rounded-full blur-xl transition-opacity duration-500 opacity-60 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle, ${color.glowHex} 0%, rgba(${color.rgb}, 0.2) 60%, transparent 100%)`,
            transform: 'scale(1.4)',
          }}
        />

        {/* Mid translucent shell */}
        <div
          className="absolute inset-0 rounded-full border transition-all duration-300"
          style={{
            background: `radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.45) 0%, rgba(${color.rgb}, 0.75) 50%, rgba(${color.rgb}, 0.2) 100%)`,
            borderColor: `rgba(${color.rgb}, 0.5)`,
            boxShadow: `inset 0 0 16px rgba(255, 255, 255, 0.4), 0 0 20px rgba(${color.rgb}, 0.5)`,
          }}
        />

        {/* Highlight specular reflection */}
        <div className="absolute top-[18%] left-[22%] w-[24%] h-[18%] rounded-full bg-white/70 blur-[1px] transform -rotate-45" />

        {/* Tiny subtle center symbol */}
        <span className="relative z-10 text-[9px] font-mono tracking-tighter uppercase font-bold text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] opacity-0 group-hover:opacity-100 transition-opacity">
          {color.chinese}
        </span>
      </motion.div>

      {showLabel && (
        <div className="mt-2.5 text-center">
          <div className="text-[11px] font-mono tracking-widest uppercase font-semibold text-white/90">
            {color.name}
          </div>
          <div
            className="text-[10px] tracking-wider uppercase font-medium mt-0.5"
            style={{ color: color.hex }}
          >
            {color.state}
          </div>
        </div>
      )}
    </div>
  )
}
