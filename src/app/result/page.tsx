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
      current = createMockReading('Should I restructure the current project architecture?')
    }
    setReading(current)
    setIsSaved(Boolean(current.isSaved))
  }, [])

  if (!reading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-xs font-mono tracking-widest text-white/40 uppercase animate-pulse">
          SYNTHESIZING PATTERN FIELD...
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
        `STATE/8 Reading: "${question}" — Pattern: ${pattern.title} (${keyColor.name} · ${keyColor.state})`
      )
      setCopyFeedback(true)
      setTimeout(() => setCopyFeedback(false), 2500)
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 space-y-12">
      {/* 1. Header & Pattern Diagnosis */}
      <PatternHeader
        pattern={pattern}
        keyColor={keyColor}
        question={question}
      />

      {/* 2. Neural Pattern Map */}
      <PatternMap mirrors={mirrors} question={question} />

      {/* 3. Eight Mirrors Deep Deconstruction */}
      <MirrorAccordion mirrors={mirrors} />

      {/* 4. Final Key Resolution Spotlight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <GlassPanel
          variant="glow"
          glowColor={keyColor.glowHex}
          className="p-6 sm:p-10 relative overflow-hidden"
        >
          {/* Subtle background ambient blob */}
          <div
            className="absolute -top-32 -left-32 w-80 h-80 rounded-full blur-[100px] opacity-25 pointer-events-none"
            style={{ backgroundColor: keyColor.glowHex }}
          />

          <div className="max-w-3xl mx-auto text-center space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/15 text-xs font-mono tracking-widest uppercase text-white/70">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE RESOLVING VECTOR</span>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono tracking-[0.25em] uppercase text-white/40 block">
                THE KEY
              </span>
              <h2
                className="text-4xl sm:text-5xl font-mono font-black tracking-widest uppercase"
                style={{ color: keyColor.hex }}
              >
                {keyColor.name} · {keyColor.state}
              </h2>
            </div>

            {/* Directive Copy */}
            <p className="text-xl sm:text-2xl font-mono font-bold text-white tracking-wide uppercase pt-2">
              &ldquo;{pattern.coreAdvice}&rdquo;
            </p>

            {/* Deep Reflection */}
            <div
              className="p-4 sm:p-5 rounded-2xl border backdrop-blur-md max-w-xl mx-auto mt-4"
              style={{
                backgroundColor: `rgba(${keyColor.rgb}, 0.08)`,
                borderColor: `rgba(${keyColor.rgb}, 0.3)`,
              }}
            >
              <div
                className="text-[10px] font-mono tracking-widest uppercase mb-1"
                style={{ color: keyColor.hex }}
              >
                REFLECTION FOR ACTION
              </div>
              <p className="text-sm sm:text-base font-light text-white/90 italic">
                &ldquo;{pattern.deepReflection}&rdquo;
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <PrimaryButton
                size="lg"
                variant={isSaved ? 'secondary' : 'primary'}
                onClick={handleSaveReading}
                disabled={isSaved}
                icon={
                  isSaved ? (
                    <BookmarkCheck className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )
                }
              >
                {isSaved ? 'Reading Saved' : 'Save Reading'}
              </PrimaryButton>

              <Link href="/reading">
                <PrimaryButton
                  size="lg"
                  variant="outline"
                  icon={<RotateCcw className="w-4 h-4" />}
                >
                  Start Another
                </PrimaryButton>
              </Link>

              <button
                onClick={handleShare}
                className="p-3.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
                title="Copy pattern summary"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            {copyFeedback && (
              <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest animate-pulse">
                Pattern summary copied to clipboard
              </div>
            )}
          </div>
        </GlassPanel>
      </motion.div>
    </div>
  )
}
