'use client'

import React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface PrimaryButtonProps extends HTMLMotionProps<'button'> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glow'
  size?: 'sm' | 'md' | 'lg'
  glowColor?: string
  icon?: React.ReactNode
}

export function PrimaryButton({
  children,
  className,
  variant = 'primary',
  size = 'md',
  glowColor,
  icon,
  disabled,
  ...props
}: PrimaryButtonProps) {
  const sizeClasses = {
    sm: 'h-10 px-4 text-xs tracking-wider',
    md: 'h-12 px-6 text-sm tracking-wide font-medium',
    lg: 'h-13 sm:h-14 px-8 text-base tracking-wide font-medium',
  }[size]

  const variantClasses = {
    primary:
      'bg-slate-900 text-white font-medium hover:bg-slate-800 shadow-md shadow-slate-900/15 hover:shadow-lg hover:shadow-slate-900/25 border border-slate-900',
    secondary:
      'bg-white/90 text-slate-800 hover:bg-white border border-slate-200/80 shadow-sm hover:shadow-md backdrop-blur-md',
    outline:
      'bg-transparent text-slate-700 hover:text-slate-900 border border-slate-300/80 hover:border-slate-500 hover:bg-white/50',
    ghost:
      'bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/60 border border-transparent',
    glow: 'bg-white/95 text-slate-900 border border-slate-200 shadow-lg shadow-slate-200/60 backdrop-blur-xl',
  }[variant]

  const customGlowStyle: React.CSSProperties = glowColor
    ? {
        boxShadow: `0 8px 24px -4px ${glowColor}55`,
        borderColor: `${glowColor}aa`,
      }
    : {}

  return (
    <motion.button
      whileTap={disabled ? undefined : { scale: 0.97 }}
      whileHover={disabled ? undefined : { scale: 1.015 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      disabled={disabled}
      style={customGlowStyle}
      className={cn(
        'relative inline-flex items-center justify-center gap-2 rounded-full transition-all duration-200 select-none cursor-pointer',
        'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none',
        sizeClasses,
        variantClasses,
        className
      )}
      {...props}
    >
      {icon && <span className="opacity-90">{icon}</span>}
      <span>{children}</span>
    </motion.button>
  )
}
