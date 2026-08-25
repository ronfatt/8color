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
    { href: '/', label: '首页', icon: Compass },
    { href: '/reading', label: '觉察起牌', icon: Activity },
    { href: '/daily', label: '每日一照', icon: Sparkles },
    { href: '/history', label: '模式档案', icon: History },
    { href: '/profile', label: '关于罗盘', icon: User },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-40 hidden md:block">
      <div className="max-w-4xl mx-auto px-6 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3 select-none transition-transform hover:scale-[1.01]"
        >
          <div className="relative w-8 h-8 rounded-full border border-slate-300/80 bg-white/90 shadow-sm flex items-center justify-center backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
            <div className="absolute inset-0 rounded-full bg-slate-400/20 blur-sm" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base tracking-wider text-slate-900 font-mono">
              8MIRROR
            </span>
            <span className="text-[10px] text-slate-500 font-medium -mt-1 tracking-widest">
              八镜 · 个人状态罗盘
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-1 p-1 rounded-full bg-white/80 backdrop-blur-xl border border-slate-200/80 shadow-sm">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href === '/reading' && (pathname === '/reveal' || pathname === '/result'))

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 select-none flex items-center gap-1.5',
                  isActive ? 'text-slate-900 font-semibold' : 'text-slate-500 hover:text-slate-800'
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="desktop-nav-active-light"
                    className="absolute inset-0 rounded-full bg-slate-900/5 border border-slate-300/60 shadow-sm"
                    transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Right Action */}
        <Link
          href="/reading"
          className="px-4 py-1.5 rounded-full bg-slate-900 text-white hover:bg-slate-800 text-xs font-medium tracking-wide shadow-sm hover:shadow transition-all"
        >
          开始觉察
        </Link>
      </div>
    </header>
  )
}
