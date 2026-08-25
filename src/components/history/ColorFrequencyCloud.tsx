'use client'

import React from 'react'
import { ColorId } from '@/lib/state8/types'
import { STATE_COLORS, STATE_COLOR_LIST } from '@/lib/state8/colors'
import { GlassPanel } from '@/components/ui/GlassPanel'

interface ColorFrequencyCloudProps {
  frequencies: Record<ColorId, number>
}

export function ColorFrequencyCloud({ frequencies }: ColorFrequencyCloudProps) {
  // Find max count for scaling
  const maxCount = Math.max(1, ...Object.values(frequencies))

  return (
    <GlassPanel variant="glow" className="p-4 sm:p-5 my-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-bold text-slate-900 tracking-wider uppercase">
          状态色彩频率分布
        </h3>
        <span className="text-[10px] text-slate-400 font-medium">
          出现频次加权
        </span>
      </div>

      {/* 8 Orb Grid / Cloud */}
      <div className="grid grid-cols-4 gap-3 justify-items-center">
        {STATE_COLOR_LIST.map((color) => {
          const count = frequencies[color.id] || 0
          // scale between 36px and 54px based on frequency
          const size = Math.round(38 + (count / maxCount) * 16)

          return (
            <div key={color.id} className="flex flex-col items-center gap-1">
              <div
                className="rounded-full flex items-center justify-center border transition-all duration-300 shadow-sm"
                style={{
                  width: size,
                  height: size,
                  backgroundColor: color.lightBg,
                  borderColor: color.lightBorder,
                  boxShadow: count > 0 ? `0 4px 14px rgba(${color.rgb}, 0.3)` : 'none',
                }}
              >
                <span
                  className="font-bold text-xs font-sans"
                  style={{ color: color.textColor }}
                >
                  {color.name}
                </span>
              </div>

              <span className="text-[10px] text-slate-500 font-mono">
                {count} 次
              </span>
            </div>
          )
        })}
      </div>
    </GlassPanel>
  )
}
