'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, Sparkles } from 'lucide-react'
import { Reading } from '@/types/state8'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { StateBadge } from '@/components/ui/StateBadge'
import { MirrorAccordion } from '@/components/result/MirrorAccordion'
import { PatternMap } from '@/components/result/PatternMap'

interface HistoryDetailModalProps {
  reading: Reading | null
  onClose: () => void
}

export function HistoryDetailModal({ reading, onClose }: HistoryDetailModalProps) {
  if (!reading) return null

  const dateObj = new Date(reading.createdAt)
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).toUpperCase()

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-2xl transition-all"
        />

        {/* Content Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl"
        >
          <GlassPanel variant="glow" className="p-6 sm:p-10 relative">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="mb-8 pr-8">
              <div className="flex items-center gap-2 text-xs font-mono text-white/40 uppercase mb-3">
                <Calendar className="w-3.5 h-3.5" />
                <span>{formattedDate}</span>
                <span>·</span>
                <span>ARCHIVED READING</span>
              </div>

              <blockquote className="text-xl sm:text-2xl font-light text-white italic mb-4 leading-relaxed">
                &ldquo;{reading.question}&rdquo;
              </blockquote>

              <div className="flex flex-wrap items-center gap-3">
                <div className="text-xs font-mono tracking-widest uppercase text-white/40">
                  PATTERN:
                </div>
                <span className="text-sm font-mono font-bold tracking-wider text-white uppercase">
                  {reading.pattern.title}
                </span>
                <StateBadge color={reading.key} size="sm" />
              </div>
            </div>

            {/* Core Advice Summary */}
            <div
              className="p-5 rounded-2xl border backdrop-blur-md mb-8"
              style={{
                backgroundColor: `rgba(${reading.key.rgb}, 0.08)`,
                borderColor: `rgba(${reading.key.rgb}, 0.3)`,
              }}
            >
              <div
                className="text-[10px] font-mono tracking-widest uppercase mb-1 flex items-center gap-1.5"
                style={{ color: reading.key.hex }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>CORE DIRECTIVE</span>
              </div>
              <p className="text-base sm:text-lg font-mono font-bold text-white uppercase tracking-wide">
                {reading.pattern.coreAdvice}
              </p>
              <p className="text-xs sm:text-sm text-white/70 italic mt-1 font-light">
                &ldquo;{reading.pattern.deepReflection}&rdquo;
              </p>
            </div>

            {/* If reading has mirrors, show accordion and pattern map */}
            {reading.mirrors && reading.mirrors.length > 0 && (
              <div className="space-y-8">
                <PatternMap mirrors={reading.mirrors} question={reading.question} />
                <MirrorAccordion mirrors={reading.mirrors} />
              </div>
            )}
          </GlassPanel>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
