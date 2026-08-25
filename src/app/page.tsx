'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Compass, Sparkles, HelpCircle, Layers, ShieldCheck } from 'lucide-react'
import { STATE_COLOR_LIST } from '@/lib/constants'
import { StateColor } from '@/types/state8'
import { ColorOrb } from '@/components/ui/ColorOrb'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { PrimaryButton } from '@/components/ui/PrimaryButton'
import { StateColorModal } from '@/components/home/StateColorModal'

export default function HomePage() {
  const [selectedColor, setSelectedColor] = useState<StateColor | null>(null)

  const steps = [
    {
      step: '01',
      title: '立念',
      subtitle: '明确当下问题',
      description: '专注在一个清晰具体的困惑、抉择或人际处境上，不泛化、不分散。',
      icon: HelpCircle,
    },
    {
      step: '02',
      title: '映照',
      subtitle: '八面镜像映射',
      description: '通过核心、心念、情绪、行动等八个维度，逐一映照深层阻碍与盲区。',
      icon: Layers,
    },
    {
      step: '03',
      title: '解钥',
      subtitle: '看清破局矢量',
      description: '最后一面钥匙指示下一步最需要调动的状态，顺势破局，而非蛮力硬磕。',
      icon: Sparkles,
    },
  ]

  return (
    <div className="w-full flex flex-col items-center space-y-12 sm:space-y-16 my-4 sm:my-8">
      {/* ================= HERO SECTION ================= */}
      <section className="w-full flex flex-col items-center text-center pt-2 sm:pt-6">
        {/* Subtle pill tag */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/80 border border-slate-200 shadow-xs text-xs font-semibold text-slate-600 mb-4"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-slate-800 animate-pulse" />
          <span>8MIRROR｜八镜 · 个人状态罗盘</span>
        </motion.div>

        {/* Brand Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-mono font-black tracking-widest text-slate-900 drop-shadow-xs"
        >
          8MIRROR
        </motion.h1>

        {/* Subtitle & Core Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-3 space-y-2 max-w-md"
        >
          <p className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
            未来未定，先看清现在。
          </p>
          <div className="text-xs font-bold text-slate-400 tracking-widest uppercase">
            8 种状态 · 8 面镜像 · 1 把钥匙
          </div>
          <p className="text-xs text-slate-500 font-normal">
            不测算命运，只解构你当下的心念与行动模式
          </p>
        </motion.div>

        {/* Primary CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-7 flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs"
        >
          <Link href="/reading" className="w-full">
            <PrimaryButton
              size="lg"
              className="w-full"
              icon={<Compass className="w-4 h-4" />}
            >
              开始状态觉察
            </PrimaryButton>
          </Link>

          <Link href="/daily" className="w-full">
            <PrimaryButton
              size="lg"
              variant="secondary"
              className="w-full"
              icon={<Sparkles className="w-4 h-4" />}
            >
              抽今日状态
            </PrimaryButton>
          </Link>
        </motion.div>

        {/* Anti-Mysticism Footnote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-6 flex items-center gap-1.5 text-[11px] text-slate-400 font-medium"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
          <span>非命理占卜 · 决策清醒觉察 · 现代认知工具</span>
        </motion.div>
      </section>

      {/* ================= SECTION 02: 8 STATES PREVIEW ================= */}
      <section className="w-full">
        <div className="text-center mb-4">
          <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase block mb-1">
            状态色彩系统
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            八重生命状态
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            点击任意状态球，查看对应的心力频率与觉察提问
          </p>
        </div>

        {/* 2 x 4 Grid for mobile friendliness */}
        <GlassPanel variant="glow" className="p-4 sm:p-6">
          <div className="grid grid-cols-4 gap-y-4 gap-x-2 justify-items-center">
            {STATE_COLOR_LIST.map((color) => (
              <ColorOrb
                key={color.id}
                color={color}
                size={58}
                showLabel
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
        </GlassPanel>
      </section>

      {/* ================= SECTION 03: HOW IT WORKS ================= */}
      <section className="w-full">
        <div className="text-center mb-4">
          <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase block mb-1">
            运作机制
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            如何看清模式
          </h2>
        </div>

        <div className="space-y-3">
          {steps.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <GlassPanel
                  variant="card"
                  className="p-4.5 flex items-start gap-3.5 group hover:border-slate-400"
                >
                  <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-700 flex-shrink-0 font-mono font-bold text-sm">
                    {item.step}
                  </div>

                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900">
                        {item.title}
                      </h3>
                      <span className="text-xs text-slate-400 font-normal">
                        · {item.subtitle}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </GlassPanel>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* ================= BOTTOM TEASER CTA ================= */}
      <section className="w-full pb-4">
        <GlassPanel variant="subtle" className="p-6 text-center space-y-3">
          <h3 className="text-lg font-bold text-slate-900">
            准备好梳理内心的困惑了吗？
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
            不必在原地内耗。只需提出一个问题，让八面镜像照亮通往钥匙的路径。
          </p>
          <div className="pt-2 flex justify-center">
            <Link href="/reading" className="w-full max-w-xs">
              <PrimaryButton size="lg" className="w-full" icon={<ArrowRight className="w-4 h-4" />}>
                开启当下觉察
              </PrimaryButton>
            </Link>
          </div>
        </GlassPanel>
      </section>

      {/* State Detail Modal */}
      <StateColorModal
        color={selectedColor}
        onClose={() => setSelectedColor(null)}
      />
    </div>
  )
}
