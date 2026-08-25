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
    sm: 'text-xs px-2.5 py-1 gap-1.5',
    md: 'text-xs sm:text-sm px-3.5 py-1.5 gap-2',
    lg: 'text-sm sm:text-base px-4 py-2 gap-2.5',
  }[size]

  return (
    <div
      onClick={onClick}
      style={{
        borderColor: color.lightBorder,
        backgroundColor: color.lightBg,
        color: color.textColor,
      }}
      className={cn(
        'inline-flex items-center rounded-full border shadow-sm backdrop-blur-md font-medium tracking-wide transition-all duration-200',
        onClick && 'cursor-pointer hover:scale-105',
        sizeClasses,
        className
      )}
    >
      <span
        className="rounded-full flex-shrink-0"
        style={{
          backgroundColor: color.hex,
          boxShadow: `0 0 8px ${color.glowHex}`,
          width: size === 'sm' ? '7px' : size === 'md' ? '8px' : '10px',
          height: size === 'sm' ? '7px' : size === 'md' ? '8px' : '10px',
        }}
      />
      <span className="font-semibold">{color.name}</span>
      <span className="opacity-40">·</span>
      <span className="font-bold">{color.state}</span>
      {showKeywords && (
        <>
          <span className="opacity-40 hidden sm:inline">·</span>
          <span className="opacity-80 font-normal text-xs hidden sm:inline">
            {color.keywords.slice(0, 2).join(' · ')}
          </span>
        </>
      )}
    </div>
  )
}
