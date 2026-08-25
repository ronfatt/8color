'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Home, Compass, Sparkles, History, User } from 'lucide-react'
import { cn } from '@/lib/utils'

export function BottomNav() {
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'HOME', icon: Home },
    { href: '/reading', label: 'READ', icon: Compass },
    { href: '/daily', label: 'DAILY', icon: Sparkles },
    { href: '/history', label: 'HISTORY', icon: History },
    { href: '/profile', label: 'PROFILE', icon: User },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden px-4 pb-4 pt-2">
      <nav className="glass-panel-glow max-w-md mx-auto rounded-full px-2 py-2 flex items-center justify-around border border-white/15">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href === '/reading' && (pathname === '/reveal' || pathname === '/result'))

          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'relative flex flex-col items-center justify-center min-w-[56px] min-h-[50px] rounded-full py-1 transition-all duration-200 select-none',
                isActive ? 'text-white' : 'text-white/40 hover:text-white/70'
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-active"
                  className="absolute inset-0 rounded-full bg-white/10 border border-white/20 shadow-[0_0_12px_rgba(255,255,255,0.2)]"
                  transition={{ type: 'spring', bounce: 0.25, duration: 0.4 }}
                />
              )}
              <Icon
                className={cn(
                  'w-5 h-5 transition-transform relative z-10',
                  isActive && 'scale-110'
                )}
              />
              <span className="text-[9px] font-mono tracking-widest uppercase mt-0.5 relative z-10 font-medium">
                {item.label}
              </span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
