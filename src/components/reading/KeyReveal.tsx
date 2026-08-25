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

  const handleTriggerReveal = () => {
    setIsRevealed(true)

    try {
      confetti({
        particleCount: 35,
        spread: 55,
        origin: { y: 0.6 },
        colors: [keyColor.hex, keyColor.glowHex, '#3b82f6', '#f59e0b'],
        disableForReducedMotion: true,
      })
    } catch {
      // ignore
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xl overflow-y-auto">
      {/* Ambient background bloom matching key color */}
      <AnimatePresence>
        {isRevealed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 0.6, scale: 1.4 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="absolute inset-0 pointer-events-none rounded-full blur-[100px]"
            style={{ backgroundColor: keyColor.glowHex }}
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-sm mx-auto text-center flex flex-col items-center">
        {/* Header */}
        <div className="mb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-slate-200 text-xs font-semibold text-slate-700 mb-2.5 shadow-sm">
            <Key className="w-3.5 h-3.5" />
            <span>第 8 面 · 钥匙镜像</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            前 7 面镜像已看清
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            最后一面钥匙，照亮通往突破的核心方向
          </p>
        </div>

        {/* Key Card Spotlight */}
        <div className="my-4 w-full max-w-[200px] aspect-[2/3] perspective-1000">
          <motion.div
            animate={{ rotateY: isRevealed ? 180 : 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full relative transform-style-3d rounded-3xl"
          >
            {/* Card Back (Locked) */}
            <div className="absolute inset-0 rounded-3xl backface-hidden glass-panel-glow border border-slate-300 p-5 flex flex-col items-center justify-between shadow-2xl">
              <div className="w-full flex justify-between text-xs font-bold text-slate-400">
                <span>08</span>
                <span>钥匙 / 钥</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full border border-slate-300 bg-slate-100 flex items-center justify-center shadow-md">
                  <Key className="w-6 h-6 text-slate-700 animate-pulse" />
                </div>
                <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase mt-2.5">
                  THE KEY
                </span>
              </div>

              <span className="text-[11px] font-bold text-slate-800 animate-pulse">
                等待揭晓
              </span>
            </div>

            {/* Card Front (Revealed) */}
            <div
              className="absolute inset-0 rounded-3xl backface-hidden rotate-y-180 p-5 flex flex-col items-center justify-between shadow-2xl overflow-hidden border-2"
              style={{
                borderColor: keyColor.hex,
                backgroundColor: '#ffffff',
                boxShadow: `0 12px 35px -5px rgba(${keyColor.rgb}, 0.35)`,
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
                    borderColor: keyColor.hex,
                    backgroundColor: keyColor.lightBg,
                    boxShadow: `0 4px 15px ${keyColor.glowHex}`,
                  }}
                >
                  <Sparkles className="w-6 h-6" style={{ color: keyColor.textColor }} />
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
        <div className="mt-5 w-full flex flex-col items-center gap-3">
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
              className="w-full flex flex-col items-center gap-3"
            >
              <GlassPanel variant="subtle" className="p-3 w-full text-center">
                <p className="text-xs text-slate-600 font-medium">
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
