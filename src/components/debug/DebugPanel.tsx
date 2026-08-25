'use client'

import React, { useState, useEffect } from 'react'
import { Reading } from '@/lib/state8/types'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { Terminal, ChevronDown, ChevronUp } from 'lucide-react'

interface DebugPanelProps {
  reading: Reading
}

export function DebugPanel({ reading }: DebugPanelProps) {
  const [showDebug, setShowDebug] = useState(false)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      if (params.get('debug') === 'true') {
        setShowDebug(true)
      }
    }
  }, [])

  if (!showDebug) return null

  const { analysis } = reading

  return (
    <GlassPanel variant="card" className="p-4 my-6 border-dashed border-slate-400 bg-slate-50/95 font-mono text-xs">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between text-slate-800 font-bold cursor-pointer"
      >
        <div className="flex items-center gap-1.5">
          <Terminal className="w-4 h-4 text-emerald-600" />
          <span>ENGINE V2 DEBUG PANEL (?debug=true)</span>
        </div>
        {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {expanded && (
        <div className="mt-3 pt-3 border-t border-slate-200 space-y-2 text-[11px] text-slate-700">
          <div>
            <span className="font-bold text-slate-900">Question Category: </span>
            {analysis.questionContext.primary} ({analysis.questionContext.primaryLabel}) · Confidence: {Math.round(analysis.questionContext.confidence * 100)}%
          </div>
          <div>
            <span className="font-bold text-slate-900">Keywords Detected: </span>
            {analysis.questionContext.keywords.join(', ') || 'None'}
          </div>
          <div>
            <span className="font-bold text-slate-900">Block → Key Archetype: </span>
            {analysis.primaryPattern.name} ({analysis.primaryPattern.chineseName})
          </div>
          <div>
            <span className="font-bold text-slate-900">Core → Key Alignment: </span>
            {analysis.coreKeyAnalysis.alignmentType}
          </div>
          <div>
            <span className="font-bold text-slate-900">Mind ↔ Emotion Tension: </span>
            {analysis.tensionAnalysis?.relationshipType} ({analysis.tensionAnalysis?.statement})
          </div>
          <div>
            <span className="font-bold text-slate-900">Pattern Tags: </span>
            {analysis.tags.join(' · ')}
          </div>
        </div>
      )}
    </GlassPanel>
  )
}
