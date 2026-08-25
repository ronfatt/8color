'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, HelpCircle, ArrowRight } from 'lucide-react'
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
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-md transition-all"
        />

        {/* Modal Window / Mobile Bottom Sheet */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 60 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          className="relative z-10 w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border border-white"
        >
          <GlassPanel
            variant="glow"
            className="p-6 sm:p-7 relative overflow-hidden"
          >
            {/* Top ambient color tint */}
            <div
              className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl opacity-40 pointer-events-none"
              style={{ backgroundColor: color.glowHex }}
            />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="flex flex-col items-center text-center mt-2 mb-5">
              <ColorOrb color={color} size={82} isInteractive={false} />

              <div
                className="mt-3 px-3 py-0.5 rounded-full text-xs font-semibold"
                style={{
                  backgroundColor: color.lightBg,
                  color: color.textColor,
                  border: `1px solid ${color.lightBorder}`,
                }}
              >
                第 0{['white', 'purple', 'blue', 'pink', 'green', 'yellow', 'orange', 'red'].indexOf(color.id) + 1} 状态维度
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2 font-sans">
                {color.name} · {color.state}
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-1">
                {color.actionAdvice}
              </p>
            </div>

            {/* Body */}
            <div className="space-y-3.5">
              {/* Keywords */}
              <div className="p-3 rounded-2xl bg-slate-50/80 border border-slate-200/70">
                <div className="text-[10px] font-semibold text-slate-400 uppercase mb-1.5 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-slate-500" />
                  <span>核心状态关键词</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {color.keywords.map((kw) => (
                    <span
                      key={kw}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium text-slate-700 bg-white border border-slate-200/80 shadow-2xs"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {color.description}
              </p>

              {/* Reflection Question */}
              <div
                className="p-3.5 rounded-2xl border"
                style={{
                  backgroundColor: color.lightBg,
                  borderColor: color.lightBorder,
                }}
              >
                <div
                  className="text-[10px] font-bold uppercase mb-1 flex items-center gap-1"
                  style={{ color: color.textColor }}
                >
                  <HelpCircle className="w-3 h-3" />
                  <span>觉察提问</span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-slate-800 italic">
                  “{color.question}”
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                onClick={onClose}
                className="text-xs font-medium text-slate-400 hover:text-slate-700 px-3 py-2 cursor-pointer"
              >
                关闭
              </button>
              <Link href="/reading" className="flex-1 max-w-[200px]">
                <PrimaryButton size="sm" className="w-full" icon={<ArrowRight className="w-3.5 h-3.5" />}>
                  进入觉察起牌
                </PrimaryButton>
              </Link>
            </div>
          </GlassPanel>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
