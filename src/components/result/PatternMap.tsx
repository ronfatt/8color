'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MirrorResult } from '@/types/state8'
import { GlassPanel } from '@/components/ui/GlassPanel'

interface PatternMapProps {
  mirrors: MirrorResult[]
  question: string
}

export function PatternMap({ mirrors, question }: PatternMapProps) {
  // 8 node angles around a circle (in radians / degrees)
  const nodeCount = 8
  const radius = 170 // Radius of circle in SVG coordinates
  const centerX = 240
  const centerY = 240

  const nodes = mirrors.map((mirror, index) => {
    // Start from top (-90 deg) and go clockwise
    const angle = (index * (360 / nodeCount) - 90) * (Math.PI / 180)
    const x = centerX + radius * Math.cos(angle)
    const y = centerY + radius * Math.sin(angle)
    return {
      mirror,
      x,
      y,
      angle,
    }
  })

  return (
    <GlassPanel variant="card" className="p-6 sm:p-8 my-10 overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6">
        <div>
          <span className="text-[10px] font-mono tracking-[0.25em] text-white/40 uppercase block">
            NEURAL TOPOLOGY
          </span>
          <h3 className="text-lg font-mono font-bold tracking-wider uppercase text-white">
            PATTERN INTELLIGENCE MAP
          </h3>
        </div>
        <div className="text-xs font-mono text-white/40 uppercase">
          8 NODES · 1 SYSTEM
        </div>
      </div>

      {/* SVG Neural Graph */}
      <div className="relative w-full max-w-[520px] aspect-square mx-auto flex items-center justify-center">
        <svg
          viewBox="0 0 480 480"
          className="w-full h-full filter drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]"
        >
          <defs>
            {/* Background Radar Rings */}
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
            </linearGradient>
          </defs>

          {/* Concentric Guide Circles */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius * 0.45}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeDasharray="4 4"
          />
          <circle
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
          />

          {/* Interconnecting perimeter web */}
          {nodes.map((node, i) => {
            const nextNode = nodes[(i + 1) % nodes.length]
            const crossNode = nodes[(i + 4) % nodes.length]
            return (
              <React.Fragment key={`web-${i}`}>
                {/* Perimeter Line */}
                <line
                  x1={node.x}
                  y1={node.y}
                  x2={nextNode.x}
                  y2={nextNode.y}
                  stroke={`rgba(${node.mirror.color.rgb}, 0.2)`}
                  strokeWidth="1"
                />
                {/* Subtle Cross Diagonal */}
                <line
                  x1={node.x}
                  y1={node.y}
                  x2={crossNode.x}
                  y2={crossNode.y}
                  stroke="rgba(255,255,255,0.03)"
                  strokeWidth="1"
                  strokeDasharray="2 4"
                />
                {/* Radial Line to Center */}
                <line
                  x1={centerX}
                  y1={centerY}
                  x2={node.x}
                  y2={node.y}
                  stroke={`rgba(${node.mirror.color.rgb}, 0.35)`}
                  strokeWidth="1.5"
                />
              </React.Fragment>
            )
          })}

          {/* Nodes */}
          {nodes.map((node) => {
            const { mirror, x, y } = node
            const isKey = mirror.position.id === 'key'

            return (
              <g key={mirror.position.id} className="cursor-pointer group">
                {/* Glow ring */}
                <circle
                  cx={x}
                  cy={y}
                  r={isKey ? 22 : 18}
                  fill={`rgba(${mirror.color.rgb}, 0.15)`}
                  stroke={`rgba(${mirror.color.rgb}, 0.6)`}
                  strokeWidth={isKey ? 2 : 1}
                  className="transition-all duration-300"
                />
                {/* Core node */}
                <circle
                  cx={x}
                  cy={y}
                  r={isKey ? 10 : 8}
                  fill={mirror.color.hex}
                  filter="drop-shadow(0 0 6px rgba(255,255,255,0.5))"
                />
                {/* Node Label Text */}
                <text
                  x={x}
                  y={y > centerY ? y + 26 : y - 20}
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="9"
                  fontFamily="monospace"
                  fontWeight="600"
                  letterSpacing="1px"
                >
                  {mirror.position.code} {mirror.position.name}
                </text>
                <text
                  x={x}
                  y={y > centerY ? y + 36 : y - 10}
                  textAnchor="middle"
                  fill={mirror.color.hex}
                  fontSize="8"
                  fontFamily="monospace"
                >
                  {mirror.color.name}
                </text>
              </g>
            )
          })}

          {/* Center Question Hub Node */}
          <circle
            cx={centerX}
            cy={centerY}
            r="38"
            fill="#121218"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="1.5"
          />
          <circle
            cx={centerX}
            cy={centerY}
            r="30"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeDasharray="3 3"
          />
          <text
            x={centerX}
            y={centerY - 6}
            textAnchor="middle"
            fill="#ffffff"
            fontSize="9"
            fontFamily="monospace"
            fontWeight="bold"
            letterSpacing="1.5px"
          >
            INQUIRY
          </text>
          <text
            x={centerX}
            y={centerY + 8}
            textAnchor="middle"
            fill="rgba(255,255,255,0.5)"
            fontSize="7"
            fontFamily="monospace"
          >
            STATE/8 CORE
          </text>
        </svg>
      </div>

      {/* Footer Info */}
      <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-white/50">
        <span>CENTER: {question}</span>
        <span>ORIENTATION: 8 VECTORS CONVERGED</span>
      </div>
    </GlassPanel>
  )
}
