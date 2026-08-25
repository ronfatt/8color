'use client'

import React from 'react'
import { MirrorResult } from '@/types/state8'
import { GlassPanel } from '@/components/ui/GlassPanel'

interface PatternMapProps {
  mirrors: MirrorResult[]
  question: string
}

export function PatternMap({ mirrors, question }: PatternMapProps) {
  const nodeCount = 8
  const radius = 160
  const centerX = 230
  const centerY = 230

  const nodes = mirrors.map((mirror, index) => {
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
    <GlassPanel variant="card" className="p-5 sm:p-7 my-8 overflow-hidden">
      <div className="flex items-center justify-between gap-2 mb-4">
        <div>
          <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase block">
            模式拓扑结构
          </span>
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            八维状态认知图谱
          </h3>
        </div>
        <div className="text-xs font-semibold text-slate-400">
          8 维状态 · 1 体协同
        </div>
      </div>

      {/* SVG Neural Topology Graph */}
      <div className="relative w-full max-w-[460px] aspect-square mx-auto flex items-center justify-center">
        <svg
          viewBox="0 0 460 460"
          className="w-full h-full filter drop-shadow-sm"
        >
          {/* Concentric Guide Circles */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius * 0.45}
            fill="none"
            stroke="rgba(203, 213, 225, 0.6)"
            strokeDasharray="3 3"
          />
          <circle
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="none"
            stroke="rgba(203, 213, 225, 0.8)"
          />

          {/* Lines */}
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
                  stroke={`rgba(${node.mirror.color.rgb}, 0.35)`}
                  strokeWidth="1.5"
                />
                {/* Cross Line */}
                <line
                  x1={node.x}
                  y1={node.y}
                  x2={crossNode.x}
                  y2={crossNode.y}
                  stroke="rgba(226, 232, 240, 0.7)"
                  strokeWidth="1"
                  strokeDasharray="2 3"
                />
                {/* Radial to Center */}
                <line
                  x1={centerX}
                  y1={centerY}
                  x2={node.x}
                  y2={node.y}
                  stroke={`rgba(${node.mirror.color.rgb}, 0.5)`}
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
                  r={isKey ? 22 : 17}
                  fill={mirror.color.lightBg}
                  stroke={mirror.color.hex}
                  strokeWidth={isKey ? 2.5 : 1.5}
                />
                {/* Core dot */}
                <circle
                  cx={x}
                  cy={y}
                  r={isKey ? 8 : 6}
                  fill={mirror.color.hex}
                />
                {/* Labels */}
                <text
                  x={x}
                  y={y > centerY ? y + 22 : y - 16}
                  textAnchor="middle"
                  fill="#0f172a"
                  fontSize="10"
                  fontWeight="bold"
                >
                  {mirror.position.name}
                </text>
                <text
                  x={x}
                  y={y > centerY ? y + 33 : y - 6}
                  textAnchor="middle"
                  fill={mirror.color.textColor}
                  fontSize="9"
                  fontWeight="600"
                >
                  {mirror.color.name}·{mirror.color.state}
                </text>
              </g>
            )
          })}

          {/* Center Hub */}
          <circle
            cx={centerX}
            cy={centerY}
            r="36"
            fill="#ffffff"
            stroke="#94a3b8"
            strokeWidth="1.5"
            className="filter drop-shadow-md"
          />
          <text
            x={centerX}
            y={centerY - 4}
            textAnchor="middle"
            fill="#0f172a"
            fontSize="10"
            fontWeight="bold"
          >
            立念原点
          </text>
          <text
            x={centerX}
            y={centerY + 9}
            textAnchor="middle"
            fill="#64748b"
            fontSize="8"
          >
            核心问题
          </text>
        </svg>
      </div>

      {/* Footer Info */}
      <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
        <span className="truncate max-w-xs">原点：{question}</span>
        <span>状态：已聚合并解构</span>
      </div>
    </GlassPanel>
  )
}
