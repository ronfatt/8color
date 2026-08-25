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
    { href: '/', label: '首页', icon: Home },
    { href: '/reading', label: '觉察起牌', icon: Compass },
    { href: '/daily', label: '每日一照', icon: Sparkles },
    { href: '/history', label: '模式档案', icon: History },
    { href: '/profile', label: '关于', icon: User },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden px-3 pb-4 pt-1">
      <nav className="glass-panel-glow max-w-sm mx-auto rounded-full px-2 py-1.5 flex items-center justify-around border border-white/90 shadow-xl shadow-slate-300/40">
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
                'relative flex flex-col items-center justify-center min-w-[54px] min-h-[50px] rounded-full py-1 transition-all duration-200 select-none cursor-pointer',
                isActive ? 'text-slate-900 font-semibold' : 'text-slate-400 hover:text-slate-700'
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-active-light"
                  className="absolute inset-0 rounded-full bg-slate-900/[0.06] border border-slate-300/80 shadow-sm"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.35 }}
                />
              )}
              <Icon
                className={cn(
                  'w-5 h-5 transition-transform relative z-10',
                  isActive && 'scale-110 text-slate-900'
                )}
              />
              <span className="text-[10px] tracking-wide uppercase mt-0.5 relative z-10 font-medium">
                {item.label}
              </span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
