'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'subtle' | 'glow' | 'card'
  glowColor?: string
}

export function GlassPanel({
  children,
  className,
  variant = 'default',
  glowColor,
  style,
  ...props
}: GlassPanelProps) {
  const variantClass = {
    default: 'glass-panel',
    subtle: 'glass-panel-subtle',
    glow: 'glass-panel-glow',
    card: 'glass-card',
  }[variant]

  const customStyle: React.CSSProperties = {
    ...style,
    ...(glowColor
      ? {
          boxShadow: `0 0 40px -10px ${glowColor}33, 0 8px 32px 0 rgba(0, 0, 0, 0.5)`,
          borderColor: `${glowColor}40`,
        }
      : {}),
  }

  return (
    <div
      className={cn(
        'rounded-2xl transition-all duration-300',
        variantClass,
        className
      )}
      style={customStyle}
      {...props}
    >
      {children}
    </div>
  )
}
