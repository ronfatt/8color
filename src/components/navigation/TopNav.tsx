'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Compass, Sparkles, History, User, Activity } from 'lucide-react'
import { cn } from '@/lib/utils'

export function TopNav() {
  const pathname = usePathname()

  const navItems = [
    { href: '/reading', label: 'READING', icon: Compass },
    { href: '/daily', label: 'DAILY', icon: Sparkles },
    { href: '/history', label: 'HISTORY', icon: History },
    { href: '/profile', label: 'PROFILE', icon: User },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-40 hidden md:block">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3 select-none transition-transform hover:scale-[1.02]"
        >
          <div className="relative w-8 h-8 rounded-full border border-white/20 bg-white/5 flex items-center justify-center backdrop-blur-md group-hover:border-white/50 transition-colors">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <div className="absolute inset-0 rounded-full bg-white/10 blur-sm group-hover:bg-white/30 transition-colors" />
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-base font-bold tracking-[0.25em] text-white uppercase text-gradient-white">
              STATE/8
            </span>
            <span className="text-[9px] font-mono tracking-widest text-white/40 uppercase -mt-1">
              Pattern Engine
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-1.5 p-1.5 rounded-full glass-panel-subtle border border-white/10">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href === '/reading' && (pathname === '/reveal' || pathname === '/result'))

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative px-5 py-2 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-200 select-none flex items-center gap-2',
                  isActive ? 'text-white' : 'text-white/50 hover:text-white/80'
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="desktop-nav-active"
                    className="absolute inset-0 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <Link
            href="/reading"
            className="px-4 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-xs font-mono tracking-wider uppercase text-white/90 transition-all duration-200 hover:border-white/40 flex items-center gap-2"
          >
            <Activity className="w-3.5 h-3.5 text-white/70" />
            <span>Enter Pattern</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
