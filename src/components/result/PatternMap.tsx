'use client'

import React, { useState } from 'react'
import { MirrorResult } from '@/lib/state8/types'
import { getColorRelationship } from '@/lib/state8/relationships'
import { GlassPanel } from '@/components/ui/GlassPanel'

interface PatternMapProps {
  mirrors: MirrorResult[]
  question: string
}

export function PatternMap({ mirrors, question }: PatternMapProps) {
  const [activeNode, setActiveNode] = useState<MirrorResult | null>(null)

  const nodeCount = 8
  const radius = 155
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

  const keyMirror = mirrors.find((m) => m.position.id === 'key')

  return (
    <GlassPanel variant="card" className="p-4 sm:p-6 my-6 overflow-hidden">
      <div className="flex items-center justify-between gap-2 mb-3">
        <div>
          <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase block">
            NEURAL PATTERN TOPOLOGY
          </span>
          <h3 className="text-sm sm:text-base font-bold text-slate-900">
            八维关系动能图谱
          </h3>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-medium text-slate-400">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-0.5 bg-emerald-500 rounded-full" /> 协同
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-0.5 border-t border-dashed border-amber-500" /> 张力
          </span>
        </div>
      </div>

      {/* SVG Neural Topology Graph */}
      <div className="relative w-full max-w-[440px] aspect-square mx-auto flex items-center justify-center">
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
            stroke="rgba(203, 213, 225, 0.5)"
            strokeDasharray="3 3"
          />
          <circle
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="none"
            stroke="rgba(203, 213, 225, 0.7)"
          />

          {/* Differentiated Relationship Lines */}
          {nodes.map((node, i) => {
            const nextNode = nodes[(i + 1) % nodes.length]
            const crossNode = nodes[(i + 4) % nodes.length]

            const relPerimeter = getColorRelationship(node.mirror.color.id, nextNode.mirror.color.id)
            const relCross = getColorRelationship(node.mirror.color.id, crossNode.mirror.color.id)

            const isKeyNode = node.mirror.position.id === 'key'

            return (
              <React.Fragment key={`web-${i}`}>
                {/* Perimeter Line */}
                <line
                  x1={node.x}
                  y1={node.y}
                  x2={nextNode.x}
                  y2={nextNode.y}
                  stroke={relPerimeter.type === 'tension' ? '#f59e0b' : `rgba(${node.mirror.color.rgb}, 0.35)`}
                  strokeWidth={relPerimeter.type === 'tension' ? '1.5' : '1.2'}
                  strokeDasharray={relPerimeter.type === 'tension' ? '4 4' : undefined}
                />

                {/* Cross Diagonal */}
                <line
                  x1={node.x}
                  y1={node.y}
                  x2={crossNode.x}
                  y2={crossNode.y}
                  stroke={relCross.type === 'tension' ? 'rgba(245, 158, 11, 0.4)' : 'rgba(226, 232, 240, 0.6)'}
                  strokeWidth="1"
                  strokeDasharray={relCross.type === 'tension' ? '3 3' : '2 3'}
                />

                {/* Radial to Center Hub */}
                <line
                  x1={centerX}
                  y1={centerY}
                  x2={node.x}
                  y2={node.y}
                  stroke={isKeyNode ? '#2563eb' : `rgba(${node.mirror.color.rgb}, 0.45)`}
                  strokeWidth={isKeyNode ? '2.5' : '1.5'}
                />
              </React.Fragment>
            )
          })}

          {/* Nodes */}
          {nodes.map((node) => {
            const { mirror, x, y } = node
            const isKey = mirror.position.id === 'key'
            const isSelected = activeNode?.position.id === mirror.position.id

            return (
              <g
                key={mirror.position.id}
                className="cursor-pointer"
                onClick={() => setActiveNode(mirror)}
              >
                {/* Outer Ring */}
                <circle
                  cx={x}
                  cy={y}
                  r={isKey ? 23 : 18}
                  fill={mirror.color.lightBg}
                  stroke={mirror.color.hex}
                  strokeWidth={isKey ? 2.5 : isSelected ? 2.5 : 1.5}
                />
                {/* Core Dot */}
                <circle
                  cx={x}
                  cy={y}
                  r={isKey ? 9 : 6.5}
                  fill={mirror.color.hex}
                />
                {/* Label */}
                <text
                  x={x}
                  y={y > centerY ? y + 21 : y - 15}
                  textAnchor="middle"
                  fill="#0f172a"
                  fontSize="10"
                  fontWeight="bold"
                >
                  {mirror.position.name}
                </text>
                <text
                  x={x}
                  y={y > centerY ? y + 32 : y - 5}
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

          {/* Center Question Hub */}
          <circle
            cx={centerX}
            cy={centerY}
            r="35"
            fill="#ffffff"
            stroke="#64748b"
            strokeWidth="1.5"
            className="filter drop-shadow-sm"
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
            问题核心
          </text>
        </svg>
      </div>

      {/* Interactive Node Tooltip Card */}
      {activeNode ? (
        <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1 animate-fadeIn">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900">
              {activeNode.position.name}位 · 【{activeNode.color.name} · {activeNode.color.state}】
            </span>
            <button
              onClick={() => setActiveNode(null)}
              className="text-[10px] text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              收起
            </button>
          </div>
          <p className="text-slate-600 leading-relaxed font-normal">
            {activeNode.interpretation.meaning}
          </p>
        </div>
      ) : (
        <div className="mt-2 text-center text-[10px] text-slate-400">
          轻触任意节点，查看该维度的能量含义与对齐关系
        </div>
      )}
    </GlassPanel>
  )
}
