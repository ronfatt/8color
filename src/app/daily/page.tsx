'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, RotateCw, Calendar, ArrowRight, Quote } from 'lucide-react'
import { STATE_COLOR_LIST, STATE_COLORS } from '@/lib/constants'
import { DailyState, StateColor } from '@/types/state8'
import { getDailyState, saveDailyState } from '@/lib/storage'
import { ColorOrb } from '@/components/ui/ColorOrb'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { PrimaryButton } from '@/components/ui/PrimaryButton'
import Link from 'next/link'

export default function DailyPage() {
  const [dailyState, setDailyState] = useState<DailyState | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)

  const dateObj = new Date()
  const todayFormatted = `${dateObj.getFullYear()}年${dateObj.getMonth() + 1}月${dateObj.getDate()}日`

  const dailyReflections: Record<string, string[]> = {
    white: [
      '留意今天有什么旧预期需要及时放下，给内心腾出空白。',
      '卸下一个背负已久的执念，尝试从零重新审视。',
      '在增添新任务之前，先果断删除一项无意义的消耗。',
    ],
    purple: [
      '留意那些你内心早就清楚、却一直未曾承认的事实。',
      '以旁观者的视角静观自身的情绪起伏，不加批判。',
      '相信内在直觉的沉静判断，不被外界的嘈杂所带偏。',
    ],
    blue: [
      '今天试着不带情绪、坦诚地说出一句最真实的心声。',
      '用心倾听他人言语背后的真正诉求与意图。',
      '在妥协演变为内耗前，清晰界定好自己的边界。',
    ],
    pink: [
      '在你习惯性紧绷的地方，注入一份温和与轻盈。',
      '允许温暖的情感流动，融化心中筑起的坚硬防备。',
      '以由衷的善意对待自己的疲惫，接纳不完美。',
    ],
    green: [
      '方法只需微调5%，就能顺势化解蛮力无法攻克的难题。',
      '顺应阻力调整航向，而不是一味硬碰硬。',
      '寻找更优雅的突破切入点，保持策略的敏捷与弹性。',
    ],
    yellow: [
      '列出清晰的评估标准，坚决砍掉三项非核心干扰。',
      '区分什么是真正的要事，什么是焦虑带来的假性紧迫。',
      '果断做出那项你一直犹豫不决的取舍。',
    ],
    orange: [
      '耐心的等待并非懈怠，而是保持敏锐、深度蓄能。',
      '静待果实自然成熟，切忌过早收割。',
      '在外部时机未明朗前，沉下心把内功打磨扎实。',
    ],
    red: [
      '今天迈出那个你反复思虑、迟迟未决的关键第一步。',
      '停止空想，用坚定的执行力给一件悬而未决的事收尾。',
      '行动创造真实的引力，唯有执行能击碎所有疑虑。',
    ],
  }

  const getRandomReflection = (color: StateColor): string => {
    const list = dailyReflections[color.id] || [color.question]
    return list[Math.floor(Math.random() * list.length)]
  }

  useEffect(() => {
    const saved = getDailyState()
    if (saved) {
      setDailyState(saved)
    } else {
      const initialColor = STATE_COLORS.purple
      const initial: DailyState = {
        date: todayFormatted,
        color: initialColor,
        reflection: getRandomReflection(initialColor),
        timestamp: Date.now(),
      }
      setDailyState(initial)
      saveDailyState(initial)
    }
  }, [todayFormatted])

  const handleDrawToday = () => {
    setIsDrawing(true)
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * STATE_COLOR_LIST.length)
      const randomColor = STATE_COLOR_LIST[randomIndex]
      const newDaily: DailyState = {
        date: todayFormatted,
        color: randomColor,
        reflection: getRandomReflection(randomColor),
        timestamp: Date.now(),
      }
      setDailyState(newDaily)
      saveDailyState(newDaily)
      setIsDrawing(false)
    }, 550)
  }

  if (!dailyState) return null

  const { color } = dailyState

  return (
    <div className="w-full max-w-lg mx-auto py-4 space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-xs text-xs font-semibold text-slate-600">
          <Calendar className="w-3.5 h-3.5" />
          <span>{todayFormatted}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900">
          每日一照 · 晨间状态
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xs mx-auto">
          校准你今天的核心心理状态与行动基调
        </p>
      </div>

      {/* Main Daily State Orb Card */}
      <GlassPanel
        variant="glow"
        className="p-6 sm:p-8 text-center relative overflow-hidden"
      >
        {/* Top ambient color tint */}
        <div
          className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl opacity-40 pointer-events-none"
          style={{ backgroundColor: color.glowHex }}
        />

        <div className="flex flex-col items-center space-y-5">
          {/* Luminous Orb */}
          <div className="my-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={color.id}
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                <ColorOrb color={color} size={96} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Color & State Info */}
          <div className="space-y-1">
            <span className="text-xs font-bold tracking-widest text-slate-400 block uppercase">
              今日主导状态
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              {color.name} · {color.state}
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {color.actionAdvice}
            </p>
          </div>

          {/* Reflection Card */}
          <div
            className="p-4 rounded-2xl border w-full"
            style={{
              backgroundColor: color.lightBg,
              borderColor: color.lightBorder,
            }}
          >
            <div
              className="text-[10px] font-bold uppercase mb-1.5 flex items-center justify-center gap-1"
              style={{ color: color.textColor }}
            >
              <Quote className="w-3.5 h-3.5" />
              <span>今日觉察心语</span>
            </div>
            <p className="text-sm font-medium text-slate-800 leading-relaxed italic">
              “{dailyState.reflection}”
            </p>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col gap-2.5 w-full max-w-xs">
            <PrimaryButton
              size="lg"
              onClick={handleDrawToday}
              disabled={isDrawing}
              glowColor={color.glowHex}
              className="w-full"
              icon={<RotateCw className={`w-4 h-4 ${isDrawing ? 'animate-spin' : ''}`} />}
            >
              {isDrawing ? '正在感知状态...' : '重抽今日状态'}
            </PrimaryButton>

            <Link href="/reading" className="w-full">
              <PrimaryButton
                size="md"
                variant="outline"
                className="w-full"
                icon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                带着此状态去起牌
              </PrimaryButton>
            </Link>
          </div>
        </div>
      </GlassPanel>
    </div>
  )
}
