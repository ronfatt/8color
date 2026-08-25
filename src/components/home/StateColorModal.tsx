'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, HelpCircle } from 'lucide-react'
import { StateColor } from '@/types/state8'
import { ColorOrb } from '@/components/ui/ColorOrb'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { PrimaryButton } from '@/components/ui/PrimaryButton'
import Link from 'next/link'

interface StateColorModalProps {
  color: StateColor | null
  onClose: () => void
}

export function StateColorModal({ color, onClose }: StateColorModalProps) {
  if (!color) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-xl transition-all"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-lg"
        >
          <GlassPanel
            variant="glow"
            glowColor={color.glowHex}
            className="p-6 sm:p-8 relative overflow-hidden"
          >
            {/* Ambient Background Gradient for this color */}
            <div
              className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-30 pointer-events-none"
              style={{ backgroundColor: color.glowHex }}
            />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header / Orb showcase */}
            <div className="flex flex-col items-center text-center mt-2 mb-6">
              <ColorOrb color={color} size={90} isInteractive={false} />

              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest uppercase text-white/80">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: color.hex }}
                />
                <span>STATE 0{['white', 'purple', 'blue', 'pink', 'green', 'yellow', 'orange', 'red'].indexOf(color.id) + 1}</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-bold font-mono tracking-widest uppercase text-white mt-2">
                {color.name}
              </h3>
              <div
                className="text-lg font-mono tracking-[0.2em] uppercase font-semibold mt-0.5"
                style={{ color: color.hex }}
              >
                {color.state} · {color.chinese}
              </div>
              <p className="text-xs text-white/50 font-mono uppercase tracking-wider mt-1">
                {color.actionChinese}
              </p>
            </div>

            {/* Content Body */}
            <div className="space-y-4">
              {/* Keywords */}
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="text-[10px] font-mono tracking-widest text-white/40 uppercase mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  <span>Key Frequencies</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {color.keywords.map((kw) => (
                    <span
                      key={kw}
                      className="px-2.5 py-1 rounded-md text-xs font-medium text-white/90 bg-white/5 border border-white/10"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-white/70 leading-relaxed font-light">
                {color.description}
              </p>

              {/* Reflection Question */}
              <div
                className="p-4 rounded-xl border backdrop-blur-md"
                style={{
                  backgroundColor: `rgba(${color.rgb}, 0.06)`,
                  borderColor: `rgba(${color.rgb}, 0.25)`,
                }}
              >
                <div className="text-[10px] font-mono tracking-widest uppercase mb-1 flex items-center gap-1.5" style={{ color: color.hex }}>
                  <HelpCircle className="w-3 h-3" />
                  <span>Pattern Question</span>
                </div>
                <p className="text-sm font-medium text-white/95 italic">
                  &ldquo;{color.question}&rdquo;
                </p>
              </div>
            </div>

            {/* Footer Action */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
              <button
                onClick={onClose}
                className="text-xs font-mono tracking-wider uppercase text-white/40 hover:text-white transition-colors px-3 py-2 cursor-pointer"
              >
                Dismiss
              </button>
              <Link href="/reading" className="flex-1 max-w-[200px]">
                <PrimaryButton size="sm" className="w-full">
                  Read In Pattern
                </PrimaryButton>
              </Link>
            </div>
          </GlassPanel>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
