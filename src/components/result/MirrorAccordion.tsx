'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle, Eye } from 'lucide-react'
import { MirrorResult } from '@/types/state8'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { cn } from '@/lib/utils'

interface MirrorAccordionProps {
  mirrors: MirrorResult[]
}

export function MirrorAccordion({ mirrors }: MirrorAccordionProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <div className="space-y-3 my-6">
      <div className="flex items-center justify-between px-1 mb-2">
        <span className="text-xs font-bold text-slate-400 tracking-wider">
          八面镜像详细解构
        </span>
        <button
          onClick={() => setExpandedIndex(expandedIndex === null ? 0 : null)}
          className="text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
        >
          {expandedIndex === null ? '展开第一项' : '折叠全部'}
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
              borderColor: isExpanded ? color.lightBorder : 'rgba(226, 232, 240, 0.8)',
            }}
            className={cn(
              'overflow-hidden transition-all duration-200',
              isKey && 'border-l-4'
            )}
          >
            {/* Header Trigger */}
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full p-3.5 sm:p-4.5 flex items-center justify-between text-left cursor-pointer transition-colors hover:bg-slate-50/50"
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* Code & Dot */}
                <div
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border flex-shrink-0 flex items-center justify-center font-bold text-xs"
                  style={{
                    borderColor: color.lightBorder,
                    backgroundColor: color.lightBg,
                    color: color.textColor,
                  }}
                >
                  {position.code}
                </div>

                {/* Position Title & Color */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">
                      {position.name}
                    </span>
                    <span className="text-xs text-slate-400 font-normal">
                      · {position.subtitle}
                    </span>
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full ml-1 hidden sm:inline"
                      style={{
                        backgroundColor: color.lightBg,
                        color: color.textColor,
                        border: `1px solid ${color.lightBorder}`,
                      }}
                    >
                      {color.name} · {color.state}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 truncate mt-0.5">
                    {analysis.summary}
                  </p>
                </div>
              </div>

              {/* Expand Icon */}
              <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                <span
                  className="text-xs font-semibold sm:hidden"
                  style={{ color: color.textColor }}
                >
                  {color.state}
                </span>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-slate-400"
                >
                  <ChevronDown className="w-4 h-4" />
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
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                >
                  <div className="px-4 pb-4 pt-1 border-t border-slate-100 space-y-3">
                    {/* Domain Definition */}
                    <div className="text-xs text-slate-500 font-normal">
                      镜像属性：<span className="font-semibold text-slate-700">{position.subtitle}</span> — {position.description}
                    </div>

                    {/* Pattern Observation */}
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                      <div className="text-[10px] font-bold text-slate-400 uppercase mb-1 flex items-center gap-1">
                        <Eye className="w-3 h-3 text-slate-500" />
                        <span>该维度的状态投射</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                        {analysis.patternObservation}
                      </p>
                    </div>

                    {/* Reflection Question */}
                    <div
                      className="p-3 rounded-xl border"
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
                        <span>自我觉察提问</span>
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-slate-800 italic">
                        “{analysis.reflectionQuestion}”
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
