'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, HelpCircle, Sparkles } from 'lucide-react'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { PrimaryButton } from '@/components/ui/PrimaryButton'

interface QuestionInputProps {
  onSubmit: (question: string) => void
  initialValue?: string
}

export function QuestionInput({ onSubmit, initialValue = '' }: QuestionInputProps) {
  const [question, setQuestion] = useState(initialValue)
  const maxLength = 180

  const sampleQuestions = [
    'Should I continue this project or pivot direction?',
    'What is the blindspot in my current negotiation?',
    'Why am I feeling resistance to this upcoming transition?',
    'Should I speak up now or hold my position in silence?',
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (question.trim()) {
      onSubmit(question.trim())
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest uppercase text-white/70 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          <span>PHASE 01 · INQUIRY</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-mono font-bold tracking-wider uppercase text-white mb-3 text-gradient-white">
          What is on your mind?
        </h1>
        <p className="text-sm sm:text-base text-white/50 font-light">
          Keep it focused on one situation, relationship, or decision.
        </p>
      </div>

      <GlassPanel variant="glow" className="p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value.slice(0, maxLength))}
              placeholder="“Should I continue this project?”"
              rows={4}
              autoFocus
              className="w-full bg-black/40 text-white placeholder-white/25 rounded-xl border border-white/15 p-4 sm:p-5 text-base sm:text-lg focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/30 resize-none transition-all font-light leading-relaxed tracking-wide"
            />
            {/* Character Counter */}
            <div className="absolute bottom-3 right-3 text-xs font-mono text-white/40">
              <span className={question.length >= maxLength ? 'text-orange-400' : ''}>
                {question.length}
              </span>
              <span>/{maxLength}</span>
            </div>
          </div>

          {/* Quick Starter Prompts */}
          <div>
            <div className="text-[11px] font-mono tracking-widest text-white/40 uppercase mb-2.5 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              <span>Or select an archetype question</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {sampleQuestions.map((sample) => (
                <button
                  type="button"
                  key={sample}
                  onClick={() => setQuestion(sample)}
                  className="text-left text-xs text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg px-3 py-2 transition-colors cursor-pointer"
                >
                  {sample}
                </button>
              ))}
            </div>
          </div>

          {/* Action button */}
          <div className="pt-2 flex justify-end">
            <PrimaryButton
              type="submit"
              size="lg"
              disabled={!question.trim()}
              className="w-full sm:w-auto min-w-[200px]"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Continue
            </PrimaryButton>
          </div>
        </form>
      </GlassPanel>
    </motion.div>
  )
}
