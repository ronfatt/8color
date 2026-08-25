'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
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
    '我应该继续推进这个项目，还是调转方向？',
    '目前合作陷入僵局，真正的盲点在哪里？',
    '面对即将到来的选择，我内心最真实的顾虑是什么？',
    '我是该立刻据理力争，还是先沉下心静观其变？',
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (question.trim()) {
      onSubmit(question.trim())
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full max-w-lg mx-auto"
    >
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/[0.05] border border-slate-200 text-xs font-semibold text-slate-600 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-800 animate-pulse" />
          <span>第一步 · 明确立念</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-2">
          你心中此刻正为什么困惑？
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-normal">
          请聚焦在一件具体的决策、人际关系或当下的处境上
        </p>
      </div>

      <GlassPanel variant="glow" className="p-5 sm:p-7">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value.slice(0, maxLength))}
              placeholder="例如：“我该如何打破目前工作推进上的停滞？”"
              rows={4}
              autoFocus
              className="w-full bg-slate-50/90 text-slate-900 placeholder-slate-400 rounded-2xl border border-slate-200/90 p-4 text-base focus:outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200/50 resize-none transition-all leading-relaxed"
            />
            {/* Character Counter */}
            <div className="absolute bottom-3 right-3 text-xs font-mono text-slate-400">
              <span className={question.length >= maxLength ? 'text-orange-500 font-bold' : ''}>
                {question.length}
              </span>
              <span>/{maxLength}</span>
            </div>
          </div>

          {/* Sample Prompts */}
          <div>
            <div className="text-[11px] font-semibold text-slate-400 uppercase mb-2 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-slate-500" />
              <span>或点击参考常见觉察问题</span>
            </div>
            <div className="space-y-1.5">
              {sampleQuestions.map((sample) => (
                <button
                  type="button"
                  key={sample}
                  onClick={() => setQuestion(sample)}
                  className="w-full text-left text-xs text-slate-600 hover:text-slate-900 bg-white/80 hover:bg-white border border-slate-200/80 rounded-xl px-3 py-2.5 transition-all shadow-2xs cursor-pointer"
                >
                  {sample}
                </button>
              ))}
            </div>
          </div>

          {/* Submit CTA */}
          <div className="pt-2">
            <PrimaryButton
              type="submit"
              size="lg"
              disabled={!question.trim()}
              className="w-full"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              继续 · 沉浸觉察
            </PrimaryButton>
          </div>
        </form>
      </GlassPanel>
    </motion.div>
  )
}
