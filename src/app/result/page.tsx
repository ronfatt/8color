'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Bookmark, BookmarkCheck, RotateCcw, Sparkles, Share2, Image as ImageIcon } from 'lucide-react'
import { Reading } from '@/lib/state8/types'
import { getCurrentReading, addSavedReading } from '@/lib/storage'
import { createReadingEngine } from '@/lib/state8/readingEngine'
import { PatternHeader } from '@/components/result/PatternHeader'
import { PatternSignals } from '@/components/result/PatternSignals'
import { NextActionCard } from '@/components/result/NextActionCard'
import { PatternMap } from '@/components/result/PatternMap'
import { MirrorAccordion } from '@/components/result/MirrorAccordion'
import { ResonanceFeedback } from '@/components/result/ResonanceFeedback'
import { ShareableCardModal } from '@/components/reading/ShareableCardModal'
import { DebugPanel } from '@/components/debug/DebugPanel'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { PrimaryButton } from '@/components/ui/PrimaryButton'

export default function ResultPage() {
  const router = useRouter()
  const [reading, setReading] = useState<Reading | null>(null)
  const [isSaved, setIsSaved] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)

  useEffect(() => {
    let current = getCurrentReading()
    if (!current || !current.analysis) {
      current = createReadingEngine('我是否需要对目前的产品架构做一次彻底调整？')
    }
    setReading(current)
    setIsSaved(Boolean(current.isSaved))
  }, [])

  if (!reading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-xs font-semibold text-slate-400 animate-pulse">
          正在合成智能模式图谱...
        </div>
      </div>
    )
  }

  const { analysis, key: keyColor, question, mirrors } = reading
  const { primaryPattern } = analysis

  const handleSaveReading = () => {
    if (!reading) return
    addSavedReading(reading)
    setIsSaved(true)
  }

  return (
    <div className="w-full max-w-lg mx-auto py-3 sm:py-6 space-y-6 sm:space-y-8">
      {/* 1. Header, Question Context, & 4-Layer Summary */}
      <PatternHeader
        analysis={analysis}
        keyColor={keyColor}
        question={question}
      />

      {/* 2. Top Pattern Signals */}
      <PatternSignals signals={analysis.signals} />

      {/* 3. Action Compass: NOW, AVOID, NOTICE */}
      <NextActionCard actionPlan={analysis.nextAction} />

      {/* 4. Neural Topology Graph */}
      <PatternMap mirrors={mirrors} question={question} />

      {/* 5. Eight Mirrors Detailed Breakdown with Light & Shadow */}
      <MirrorAccordion mirrors={mirrors} />

      {/* 6. Final Key Resolution Spotlight */}
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
          {/* Top ambient glow */}
          <div
            className="absolute -top-20 -left-20 w-60 h-60 rounded-full blur-3xl opacity-40 pointer-events-none"
            style={{ backgroundColor: keyColor.glowHex }}
          />

          <div className="text-center space-y-3.5 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-600">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>终局破局钥匙</span>
            </div>

            <div className="space-y-0.5">
              <span className="text-xs font-bold text-slate-400 block tracking-widest">
                THE KEY
              </span>
              <h2
                className="text-3xl sm:text-4xl font-bold tracking-tight"
                style={{ color: keyColor.textColor }}
              >
                {keyColor.name} · {keyColor.state}
              </h2>
            </div>

            {/* Directive Copy */}
            <p className="text-base sm:text-lg font-bold text-slate-900 leading-snug pt-1">
              “{primaryPattern.coreAdvice}”
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
                “{primaryPattern.deepReflection}”
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
                  onClick={() => setShowShareModal(true)}
                  className="px-3.5 py-2.5 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  title="生成 9:16 分享卡片"
                >
                  <ImageIcon className="w-4 h-4 text-slate-600" />
                  <span>生成卡片</span>
                </button>
              </div>
            </div>
          </div>
        </GlassPanel>
      </motion.div>

      {/* 7. Resonance & Retrospective Feedback */}
      <ResonanceFeedback
        readingId={reading.id}
        initialFeedback={reading.feedback}
      />

      {/* 8. Dev Mode Debug Inspection (?debug=true) */}
      <DebugPanel reading={reading} />

      {/* Shareable Card Modal */}
      {showShareModal && (
        <ShareableCardModal
          reading={reading}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </div>
  )
}
