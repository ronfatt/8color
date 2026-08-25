'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Key, Sparkles, ArrowRight } from 'lucide-react'
import { MirrorResult, StateColor } from '@/types/state8'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { PrimaryButton } from '@/components/ui/PrimaryButton'
import confetti from 'canvas-confetti'

interface KeyRevealProps {
  keyMirror: MirrorResult
  onComplete: () => void
}

export function KeyReveal({ keyMirror, onComplete }: KeyRevealProps) {
  const [isRevealed, setIsRevealed] = useState(false)
  const keyColor: StateColor = keyMirror.color

  const petalColors = [
    '#f8fafc',
    '#a855f7',
    '#3b82f6',
    '#ec4899',
    '#22c55e',
    '#eab308',
    '#f97316',
    '#ef4444',
  ]

  const handleTriggerReveal = () => {
    setIsRevealed(true)

    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        colors: [keyColor.hex, keyColor.glowHex, '#3b82f6', '#f59e0b'],
        disableForReducedMotion: true,
      })
    } catch {
      // ignore
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/45 backdrop-blur-xl overflow-y-auto">
      {/* Ambient background bloom matching key color */}
      <AnimatePresence>
        {isRevealed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 0.7, scale: 1.5 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="absolute inset-0 pointer-events-none rounded-full blur-[110px]"
            style={{ backgroundColor: keyColor.glowHex }}
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-sm mx-auto text-center flex flex-col items-center">
        {/* Header */}
        <div className="mb-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/95 border border-slate-200 text-xs font-semibold text-slate-700 mb-2 shadow-sm">
            <Key className="w-3.5 h-3.5 text-amber-600" />
            <span>第 8 面 · 钥匙镜像</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white drop-shadow-sm">
            前 7 面镜像已看清
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 mt-1">
            最后一面钥匙，照亮通往突破的核心方向
          </p>
        </div>

        {/* Key Card Spotlight */}
        <div className="my-3 w-full max-w-[190px] aspect-[2/3] perspective-1000">
          <motion.div
            animate={{ rotateY: isRevealed ? 180 : 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full relative transform-style-3d rounded-3xl"
          >
            {/* Card Back (Locked) */}
            <div className="absolute inset-0 rounded-3xl backface-hidden bg-gradient-to-b from-[#ca8a04] via-[#b45309] to-[#92400e] text-white p-5 flex flex-col items-center justify-between shadow-2xl border-2 border-amber-300">
              <div className="w-full flex justify-between text-xs font-bold text-amber-200">
                <span>08</span>
                <span>钥匙 / 钥</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow">
                    {petalColors.map((hex, i) => {
                      const rotation = i * 45
                      return (
                        <g key={i} transform={`rotate(${rotation} 50 50)`}>
                          <path
                            d="M50,15 C55,25 60,38 50,50 C40,38 45,25 50,15 Z"
                            fill={hex}
                            stroke="rgba(255,255,255,0.4)"
                            strokeWidth="1"
                          />
                        </g>
                      )
                    })}
                    <circle cx="50" cy="50" r="9" fill="#fef08a" stroke="#d97706" strokeWidth="2" />
                  </svg>
                </div>
                <span className="text-[10px] font-bold tracking-widest text-amber-100 uppercase mt-2">
                  8MIRROR KEY
                </span>
              </div>

              <span className="text-xs font-bold text-white bg-black/25 px-3 py-1 rounded-full animate-pulse">
                等待揭晓
              </span>
            </div>

            {/* Card Front (Revealed) */}
            <div
              className="absolute inset-0 rounded-3xl backface-hidden rotate-y-180 p-5 flex flex-col items-center justify-between shadow-2xl overflow-hidden border-2"
              style={{
                borderColor: keyColor.hex,
                backgroundColor: '#ffffff',
                boxShadow: `0 12px 35px -5px rgba(${keyColor.rgb}, 0.45)`,
              }}
            >
              <div className="w-full flex justify-between text-xs font-bold" style={{ color: keyColor.textColor }}>
                <span>08</span>
                <span>钥匙 / 钥</span>
              </div>

              <div className="flex flex-col items-center">
                <div
                  className="w-14 h-14 rounded-full border mb-3 flex items-center justify-center shadow-md"
                  style={{
                    backgroundColor: keyColor.hex,
                  }}
                >
                  <svg viewBox="0 0 100 100" className="w-8 h-8">
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                      <g key={i} transform={`rotate(${angle} 50 50)`}>
                        <path
                          d="M50,18 C54,26 58,36 50,48 C42,36 46,26 50,18 Z"
                          fill="#ffffff"
                        />
                      </g>
                    ))}
                    <circle cx="50" cy="50" r="7" fill={keyColor.lightBg} />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold text-slate-900">
                  {keyColor.name} · {keyColor.state}
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {keyColor.actionAdvice}
                </p>
              </div>

              <div className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                破局关键矢量
              </div>
            </div>
          </motion.div>
        </div>

        {/* Action Button */}
        <div className="mt-4 w-full flex flex-col items-center gap-2.5">
          {!isRevealed ? (
            <PrimaryButton
              size="lg"
              onClick={handleTriggerReveal}
              className="w-full max-w-[240px]"
            >
              揭示破局钥匙
            </PrimaryButton>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="w-full flex flex-col items-center gap-2.5"
            >
              <GlassPanel variant="subtle" className="p-2.5 w-full text-center bg-white/90">
                <p className="text-xs text-slate-700 font-medium">
                  解锁钥匙状态：<span className="font-bold text-slate-900">{keyColor.name} · {keyColor.state}</span>
                </p>
              </GlassPanel>

              <PrimaryButton
                size="lg"
                onClick={onComplete}
                className="w-full max-w-[240px]"
                glowColor={keyColor.glowHex}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                生成完整状态解构
              </PrimaryButton>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
