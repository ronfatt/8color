'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, Sparkles } from 'lucide-react'
import { Reading } from '@/lib/state8/types'
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
  const formattedDate = `${dateObj.getFullYear()}年${dateObj.getMonth() + 1}月${dateObj.getDate()}日`
  const patternName = reading.analysis?.primaryPattern?.name || 'FORCE → SHIFT'
  const coreAdvice = reading.analysis?.primaryPattern?.coreAdvice || reading.key.actionAdvice
  const deepReflection = reading.analysis?.primaryPattern?.deepReflection || reading.key.question

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/35 backdrop-blur-md transition-all"
        />

        {/* Modal Sheet */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 60 }}
          className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-white"
        >
          <GlassPanel variant="glow" className="p-5 sm:p-8 relative">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="mb-6 pr-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>{formattedDate}</span>
                <span>·</span>
                <span>历史觉察记录</span>
              </div>

              <blockquote className="text-lg sm:text-xl font-bold text-slate-900 mb-3 leading-relaxed">
                “{reading.question}”
              </blockquote>

              <div className="flex flex-wrap items-center gap-2.5">
                <div className="text-xs font-bold text-slate-400">
                  模式形态：
                </div>
                <span className="text-sm font-bold text-slate-900">
                  {patternName}
                </span>
                <StateBadge color={reading.key} size="sm" />
              </div>
            </div>

            {/* Core Advice Summary */}
            <div
              className="p-4 rounded-2xl border mb-6"
              style={{
                backgroundColor: reading.key.lightBg,
                borderColor: reading.key.lightBorder,
              }}
            >
              <div
                className="text-[10px] font-bold uppercase mb-1 flex items-center gap-1"
                style={{ color: reading.key.textColor }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>核心破局矢量</span>
              </div>
              <p className="text-base sm:text-lg font-bold text-slate-900">
                {coreAdvice}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 italic mt-1">
                “{deepReflection}”
              </p>
            </div>

            {/* Mirrors Accordion & Map */}
            {reading.mirrors && reading.mirrors.length > 0 && (
              <div className="space-y-6">
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
