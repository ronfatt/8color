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

    // Trigger subtle, elegant particles
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        colors: [keyColor.hex, '#ffffff', keyColor.glowHex],
        disableForReducedMotion: true,
      })
    } catch {
      // ignore
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl overflow-y-auto">
      {/* Ambient background bloom matching key color once revealed */}
      <AnimatePresence>
        {isRevealed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.45, scale: 1.5 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute inset-0 pointer-events-none rounded-full blur-[120px]"
            style={{
              backgroundColor: keyColor.glowHex,
            }}
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-md mx-auto text-center flex flex-col items-center">
        {/* Step Indicator Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-mono tracking-[0.25em] uppercase text-white/90 mb-3">
            <Key className="w-3.5 h-3.5" />
            <span>THE 8TH MIRROR</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-mono font-bold tracking-widest uppercase text-white">
            7 MIRRORS SEEN
          </h2>
          <p className="text-sm font-mono text-white/50 tracking-wider mt-1">
            One remains. The pivot point of the pattern.
          </p>
        </div>

        {/* Focal Key Card Showcase */}
        <div className="my-6 w-full max-w-[220px] aspect-[2/3] perspective-1000">
          <motion.div
            animate={{ rotateY: isRevealed ? 180 : 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full relative transform-style-3d rounded-3xl"
          >
            {/* Card Back (Locked) */}
            <div className="absolute inset-0 rounded-3xl backface-hidden glass-panel-glow border border-white/30 p-6 flex flex-col items-center justify-between shadow-[0_0_40px_rgba(255,255,255,0.15)]">
              <div className="w-full flex justify-between text-xs font-mono text-white/40">
                <span>08</span>
                <span>KEY / 钥</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border border-white/40 bg-white/10 flex items-center justify-center shadow-[0_0_25px_rgba(255,255,255,0.25)]">
                  <Key className="w-7 h-7 text-white animate-pulse" />
                </div>
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/50 mt-3">
                  THE KEY
                </span>
              </div>

              <span className="text-[10px] font-mono tracking-widest uppercase text-white/60 animate-pulse">
                AWAITING UNLOCK
              </span>
            </div>

            {/* Card Front (Revealed Bloom) */}
            <div
              className="absolute inset-0 rounded-3xl backface-hidden rotate-y-180 glass-panel border p-6 flex flex-col items-center justify-between shadow-2xl overflow-hidden"
              style={{
                borderColor: `rgba(${keyColor.rgb}, 0.8)`,
                boxShadow: `0 0 50px 5px rgba(${keyColor.rgb}, 0.45)`,
                background: `radial-gradient(circle at 50% 25%, rgba(${keyColor.rgb}, 0.3) 0%, rgba(10, 10, 14, 0.98) 85%)`,
              }}
            >
              <div className="w-full flex justify-between text-xs font-mono font-semibold" style={{ color: keyColor.hex }}>
                <span>08</span>
                <span>KEY / 钥</span>
              </div>

              <div className="flex flex-col items-center">
                <div
                  className="w-16 h-16 rounded-full border mb-4 flex items-center justify-center"
                  style={{
                    borderColor: keyColor.hex,
                    backgroundColor: `rgba(${keyColor.rgb}, 0.3)`,
                    boxShadow: `0 0 25px ${keyColor.glowHex}`,
                  }}
                >
                  <Sparkles className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-3xl font-mono font-bold tracking-widest uppercase text-white">
                  {keyColor.name}
                </h3>
                <div
                  className="text-base font-mono tracking-[0.2em] uppercase font-semibold mt-1"
                  style={{ color: keyColor.hex }}
                >
                  {keyColor.state}
                </div>
                <p className="text-xs text-white/60 font-mono mt-1">
                  {keyColor.actionChinese}
                </p>
              </div>

              <div className="text-xs font-mono tracking-widest text-white/50 uppercase">
                THE RESOLVING VECTOR
              </div>
            </div>
          </motion.div>
        </div>

        {/* Action Controls */}
        <div className="mt-6 w-full flex flex-col items-center gap-3">
          {!isRevealed ? (
            <PrimaryButton
              size="lg"
              onClick={handleTriggerReveal}
              className="w-full max-w-[260px]"
              glowColor="#ffffff"
            >
              Reveal The Key
            </PrimaryButton>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="w-full flex flex-col items-center gap-3"
            >
              <GlassPanel variant="subtle" className="p-3.5 w-full mb-1 text-center">
                <p className="text-xs font-light text-white/80">
                  Key unlocked: <span className="font-semibold text-white uppercase">{keyColor.name} · {keyColor.state}</span>
                </p>
              </GlassPanel>

              <PrimaryButton
                size="lg"
                onClick={onComplete}
                className="w-full max-w-[280px]"
                glowColor={keyColor.glowHex}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Synthesize Pattern
              </PrimaryButton>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
