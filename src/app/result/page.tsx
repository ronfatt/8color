'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Bookmark, BookmarkCheck, RotateCcw, Sparkles, Share2 } from 'lucide-react'
import { Reading } from '@/types/state8'
import { getCurrentReading, addSavedReading } from '@/lib/storage'
import { createMockReading } from '@/lib/pattern-engine'
import { PatternHeader } from '@/components/result/PatternHeader'
import { PatternMap } from '@/components/result/PatternMap'
import { MirrorAccordion } from '@/components/result/MirrorAccordion'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { PrimaryButton } from '@/components/ui/PrimaryButton'

export default function ResultPage() {
  const router = useRouter()
  const [reading, setReading] = useState<Reading | null>(null)
  const [isSaved, setIsSaved] = useState(false)
  const [copyFeedback, setCopyFeedback] = useState(false)

  useEffect(() => {
    let current = getCurrentReading()
    if (!current) {
      current = createMockReading('我是否需要对目前的产品架构做一次彻底调整？')
    }
    setReading(current)
    setIsSaved(Boolean(current.isSaved))
  }, [])

  if (!reading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-xs font-semibold text-slate-400 animate-pulse">
          正在解构模式图谱...
        </div>
      </div>
    )
  }

  const { pattern, key: keyColor, question, mirrors } = reading

  const handleSaveReading = () => {
    if (!reading) return
    addSavedReading(reading)
    setIsSaved(true)
  }

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(
        `STATE/8 状态觉察：“${question}” — 模式：${pattern.title}（${keyColor.name} · ${keyColor.state}）`
      )
      setCopyFeedback(true)
      setTimeout(() => setCopyFeedback(false), 2500)
    }
  }

  return (
    <div className="w-full max-w-lg mx-auto py-3 sm:py-6 space-y-6 sm:space-y-8">
      {/* 1. Header & Pattern Diagnosis */}
      <PatternHeader
        pattern={pattern}
        keyColor={keyColor}
        question={question}
      />

      {/* 2. Neural Topology Graph */}
      <PatternMap mirrors={mirrors} question={question} />

      {/* 3. Eight Mirrors Breakdown */}
      <MirrorAccordion mirrors={mirrors} />

      {/* 4. Final Key Resolution Spotlight */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <GlassPanel
          variant="glow"
          className="p-5 sm:p-7 relative overflow-hidden"
        >
          {/* Subtle top ambient tint */}
          <div
            className="absolute -top-20 -left-20 w-60 h-60 rounded-full blur-3xl opacity-40 pointer-events-none"
            style={{ backgroundColor: keyColor.glowHex }}
          />

          <div className="text-center space-y-3.5 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-600">
              <Sparkles className="w-3.5 h-3.5" />
              <span>核心破局矢量</span>
            </div>

            <div className="space-y-0.5">
              <span className="text-xs font-bold text-slate-400 block tracking-widest">
                破局之钥
              </span>
              <h2
                className="text-3xl sm:text-4xl font-bold tracking-tight"
                style={{ color: keyColor.textColor }}
              >
                {keyColor.name} · {keyColor.state}
              </h2>
            </div>

            {/* Directive Copy */}
            <p className="text-lg sm:text-xl font-bold text-slate-900 leading-snug pt-1">
              “{pattern.coreAdvice}”
            </p>

            {/* Deep Reflection */}
            <div
              className="p-3.5 sm:p-4 rounded-2xl border max-w-sm mx-auto"
              style={{
                backgroundColor: keyColor.lightBg,
                borderColor: keyColor.lightBorder,
              }}
            >
              <div
                className="text-[10px] font-bold uppercase mb-1"
                style={{ color: keyColor.textColor }}
              >
                落地觉察提问
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-800 italic">
                “{pattern.deepReflection}”
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col gap-2.5 w-full max-w-xs mx-auto">
              <PrimaryButton
                size="lg"
                variant={isSaved ? 'secondary' : 'primary'}
                onClick={handleSaveReading}
                disabled={isSaved}
                className="w-full"
                icon={
                  isSaved ? (
                    <BookmarkCheck className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )
                }
              >
                {isSaved ? '已保存至档案' : '保存本次觉察'}
              </PrimaryButton>

              <div className="flex items-center gap-2 w-full">
                <Link href="/reading" className="flex-1">
                  <PrimaryButton
                    size="md"
                    variant="outline"
                    className="w-full"
                    icon={<RotateCcw className="w-3.5 h-3.5" />}
                  >
                    重新起牌
                  </PrimaryButton>
                </Link>

                <button
                  onClick={handleShare}
                  className="p-3 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 transition-colors cursor-pointer shadow-xs"
                  title="复制结果摘要"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {copyFeedback && (
              <div className="text-xs font-semibold text-emerald-600 tracking-wide animate-pulse">
                已复制觉察摘要至剪贴板
              </div>
            )}
          </div>
        </GlassPanel>
      </motion.div>
    </div>
  )
}
