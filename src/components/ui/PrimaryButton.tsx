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
    md: 'h-12 px-6 text-sm tracking-widest',
    lg: 'h-14 px-8 text-base tracking-widest font-medium',
  }[size]

  const variantClasses = {
    primary:
      'bg-white text-black font-semibold hover:bg-slate-100 shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:shadow-[0_0_35px_rgba(255,255,255,0.45)] border border-white/80',
    secondary:
      'bg-white/10 text-white hover:bg-white/15 backdrop-blur-md border border-white/15 hover:border-white/30',
    outline:
      'bg-transparent text-white/90 hover:text-white border border-white/20 hover:border-white/50 hover:bg-white/5',
    ghost:
      'bg-transparent text-white/70 hover:text-white hover:bg-white/5 border border-transparent',
    glow: 'bg-white/10 text-white border border-white/30 backdrop-blur-xl',
  }[variant]

  const customGlowStyle: React.CSSProperties = glowColor
    ? {
        boxShadow: `0 0 30px ${glowColor}55`,
        borderColor: `${glowColor}88`,
      }
    : {}

  return (
    <motion.button
      whileTap={disabled ? undefined : { scale: 0.97 }}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      disabled={disabled}
      style={customGlowStyle}
      className={cn(
        'relative inline-flex items-center justify-center gap-2.5 rounded-full uppercase transition-all duration-300 select-none cursor-pointer',
        'disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none',
        sizeClasses,
        variantClasses,
        className
      )}
      {...props}
    >
      {icon && <span className="opacity-80">{icon}</span>}
      <span>{children}</span>
    </motion.button>
  )
}
