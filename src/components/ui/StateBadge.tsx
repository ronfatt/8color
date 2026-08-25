'use client'

import React from 'react'
import { StateColor } from '@/types/state8'
import { cn } from '@/lib/utils'

interface StateBadgeProps {
  color: StateColor
  size?: 'sm' | 'md' | 'lg'
  showKeywords?: boolean
  className?: string
  onClick?: () => void
}

export function StateBadge({
  color,
  size = 'md',
  showKeywords = false,
  className,
  onClick,
}: StateBadgeProps) {
  const sizeClasses = {
    sm: 'text-[11px] px-2.5 py-1 gap-1.5',
    md: 'text-xs px-3.5 py-1.5 gap-2',
    lg: 'text-sm px-4 py-2 gap-2.5',
  }[size]

  return (
    <div
      onClick={onClick}
      style={{
        borderColor: `rgba(${color.rgb}, 0.28)`,
        backgroundColor: `rgba(${color.rgb}, 0.08)`,
      }}
      className={cn(
        'inline-flex items-center rounded-full border backdrop-blur-md font-mono tracking-wider uppercase transition-all duration-200',
        onClick && 'cursor-pointer hover:scale-105',
        sizeClasses,
        className
      )}
    >
      <span
        className="rounded-full flex-shrink-0 animate-pulse"
        style={{
          backgroundColor: color.hex,
          boxShadow: `0 0 10px ${color.glowHex}`,
          width: size === 'sm' ? '6px' : size === 'md' ? '8px' : '10px',
          height: size === 'sm' ? '6px' : size === 'md' ? '8px' : '10px',
        }}
      />
      <span className="font-semibold text-white/90">{color.name}</span>
      <span className="text-white/40">·</span>
      <span style={{ color: color.hex }}>{color.state}</span>
      {showKeywords && (
        <>
          <span className="text-white/40 hidden sm:inline">·</span>
          <span className="text-white/60 font-sans normal-case hidden sm:inline text-xs">
            {color.keywords.slice(0, 2).join(' · ')}
          </span>
        </>
      )}
    </div>
  )
}
