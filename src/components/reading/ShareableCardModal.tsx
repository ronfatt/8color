'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, Check } from 'lucide-react'
import { Reading } from '@/lib/state8/types'

interface ShareableCardModalProps {
  reading: Reading
  onClose: () => void
}

export function ShareableCardModal({ reading, onClose }: ShareableCardModalProps) {
  const [copied, setCopied] = React.useState(false)
  const pattern = reading.analysis?.primaryPattern || {
    name: 'FORCE → SHIFT',
    archetype: '结构重组型',
    coreAdvice: '不要用力硬推，改换解决结构。',
  }
  const keyColor = reading.key
  const blockMirror = reading.mirrors.find((m) => m.position.id === 'block')

  const handleCopyText = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(
        `8MIRROR｜八镜 状态觉察\n模式：${pattern.name}\n阻碍：${blockMirror?.color.name} · ${blockMirror?.color.state}\n钥匙：${keyColor.name} · ${keyColor.state}\n指引：“${pattern.coreAdvice}”`
      )
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xl overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0"
        />

        {/* 9:16 Card Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative z-10 w-full max-w-[340px] aspect-[9/16] bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col justify-between p-6 text-slate-900 select-none"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          {/* Top Logo */}
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full border border-slate-300 bg-slate-100 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
            </div>
            <span className="text-xs font-mono font-black tracking-widest text-slate-800">
              8MIRROR
            </span>
          </div>

          {/* Center Pattern Display */}
          <div className="space-y-4 my-auto text-center">
            <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase block">
              PERSONAL PATTERN
            </span>

            <h2 className="text-3xl font-black tracking-tight text-slate-900">
              {pattern.name}
            </h2>

            <div className="inline-block px-2.5 py-0.5 rounded-full bg-slate-100 text-[11px] font-semibold text-slate-600">
              【{pattern.archetype}】
            </div>

            {/* Block & Key Badges */}
            <div className="grid grid-cols-2 gap-2 pt-2 text-left">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[9px] font-bold text-slate-400 block uppercase">阻碍 / BLOCK</span>
                <span className="text-xs font-bold text-slate-800">
                  {blockMirror?.color.name} · {blockMirror?.color.state}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[9px] font-bold text-slate-400 block uppercase">钥匙 / KEY</span>
                <span className="text-xs font-bold text-slate-800">
                  {keyColor.name} · {keyColor.state}
                </span>
              </div>
            </div>

            {/* Core Quote */}
            <div className="p-3.5 rounded-xl border bg-gradient-to-b from-slate-50 to-white mt-3">
              <p className="text-xs font-bold text-slate-900 leading-snug">
                “{pattern.coreAdvice}”
              </p>
            </div>
          </div>

          {/* Bottom Footer Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[9px] font-mono text-slate-400 tracking-wider">
              8MIRROR · 八镜 觉察罗盘
            </span>

            <button
              onClick={handleCopyText}
              className="px-3 py-1.5 rounded-full bg-slate-900 text-white text-xs font-medium flex items-center gap-1 cursor-pointer hover:bg-slate-800 transition-colors"
            >
              {copied ? <Check className="w-3 h-3" /> : <Sparkles className="w-3 h-3" />}
              <span>{copied ? '已复制' : '复制卡片'}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
