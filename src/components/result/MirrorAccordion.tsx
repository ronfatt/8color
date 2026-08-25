'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Sparkles, HelpCircle, Eye } from 'lucide-react'
import { MirrorResult } from '@/types/state8'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { cn } from '@/lib/utils'

interface MirrorAccordionProps {
  mirrors: MirrorResult[]
}

export function MirrorAccordion({ mirrors }: MirrorAccordionProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0) // Expand first by default

  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <div className="space-y-3.5 my-8">
      <div className="flex items-center justify-between px-1 mb-2">
        <span className="text-xs font-mono tracking-[0.25em] text-white/40 uppercase">
          EIGHT MIRRORS DECONSTRUCTION
        </span>
        <button
          onClick={() => setExpandedIndex(expandedIndex === null ? 0 : null)}
          className="text-xs font-mono text-white/40 hover:text-white transition-colors cursor-pointer uppercase"
        >
          {expandedIndex === null ? 'Expand Active' : 'Collapse All'}
        </button>
      </div>

      {mirrors.map((mirror, index) => {
        const isExpanded = expandedIndex === index
        const { position, color, analysis } = mirror
        const isKey = position.id === 'key'

        return (
          <GlassPanel
            key={position.id}
            variant="card"
            style={{
              borderColor: isExpanded ? `rgba(${color.rgb}, 0.35)` : 'rgba(255, 255, 255, 0.08)',
            }}
            className={cn(
              'overflow-hidden transition-all duration-300',
              isKey && 'border-l-4'
            )}
          >
            {/* Header Trigger */}
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer transition-colors hover:bg-white/[0.02]"
            >
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                {/* Code & Dot */}
                <div
                  className="w-8 h-8 rounded-full border flex-shrink-0 flex items-center justify-center font-mono text-xs font-bold"
                  style={{
                    borderColor: `rgba(${color.rgb}, 0.5)`,
                    backgroundColor: `rgba(${color.rgb}, 0.1)`,
                    color: color.hex,
                  }}
                >
                  {position.code}
                </div>

                {/* Position Title & Color */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono font-bold tracking-wider uppercase text-white">
                      {position.name}
                    </span>
                    <span className="text-xs text-white/40 font-mono">
                      / {position.chinese}
                    </span>
                    <span
                      className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full border ml-1 hidden sm:inline"
                      style={{
                        borderColor: `rgba(${color.rgb}, 0.3)`,
                        backgroundColor: `rgba(${color.rgb}, 0.08)`,
                        color: color.hex,
                      }}
                    >
                      {color.name} · {color.state}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-white/60 truncate mt-0.5">
                    {analysis.summary}
                  </p>
                </div>
              </div>

              {/* Expand Icon */}
              <div className="flex items-center gap-3 flex-shrink-0 ml-2">
                <span
                  className="text-xs font-mono font-semibold sm:hidden"
                  style={{ color: color.hex }}
                >
                  {color.state}
                </span>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-white/40 group-hover:text-white"
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </div>
            </button>

            {/* Expandable Details */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <div className="px-5 pb-5 pt-2 border-t border-white/[0.06] space-y-4">
                    {/* Meaning / Position Definition */}
                    <div className="text-xs text-white/50 font-mono">
                      Domain: <span className="text-white/80">{position.subtitle}</span> — {position.description}
                    </div>

                    {/* Pattern Observation */}
                    <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                      <div className="text-[10px] font-mono tracking-widest text-white/40 uppercase mb-1 flex items-center gap-1.5">
                        <Eye className="w-3 h-3 text-white/70" />
                        <span>Observed Pattern In This Mirror</span>
                      </div>
                      <p className="text-sm text-white/85 leading-relaxed">
                        {analysis.patternObservation}
                      </p>
                    </div>

                    {/* Reflection Question */}
                    <div
                      className="p-3.5 rounded-xl border backdrop-blur-md"
                      style={{
                        backgroundColor: `rgba(${color.rgb}, 0.05)`,
                        borderColor: `rgba(${color.rgb}, 0.25)`,
                      }}
                    >
                      <div
                        className="text-[10px] font-mono tracking-widest uppercase mb-1 flex items-center gap-1.5"
                        style={{ color: color.hex }}
                      >
                        <HelpCircle className="w-3 h-3" />
                        <span>Self-Inquiry Question</span>
                      </div>
                      <p className="text-sm font-medium text-white/95 italic">
                        &ldquo;{analysis.reflectionQuestion}&rdquo;
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassPanel>
        )
      })}
    </div>
  )
}
