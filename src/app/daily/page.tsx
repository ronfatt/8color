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

  const todayFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).toUpperCase()

  const dailyReflections: Record<string, string[]> = {
    white: [
      'Notice what needs to be released today to create empty space for clarity.',
      'Drop an assumption you have carried throughout the week.',
      'Clear your immediate slate before adding a single new task.',
    ],
    purple: [
      'Notice what you already know but have not acknowledged.',
      'Step back and observe your own reactions without judgment.',
      'Trust the silent baseline of intuition over noisy arguments.',
    ],
    blue: [
      'Speak one clean, unambiguous truth today without justification.',
      'Listen for the hidden intention behind someone else’s words.',
      'Articulate your boundary before compromise becomes resentment.',
    ],
    pink: [
      'Bring warmth and genuine ease to where you normally apply tension.',
      'Allow connection to soften an area where you have built armor.',
      'Treat your own emotional fatigue with unconditional kindness.',
    ],
    green: [
      'A 5% shift in method will dissolve what effort cannot force.',
      'Adapt to the friction instead of pushing against it.',
      'Look for the elegant side door rather than banging on the gate.',
    ],
    yellow: [
      'Apply clean criteria and eliminate three non-essential distractions.',
      'Distinguish between genuine urgency and emotional turbulence.',
      'Make the trade-off you have been avoiding.',
    ],
    orange: [
      'Patience is not passive waiting; it is active incubation.',
      'Let the fruit ripen before forcing the harvest.',
      'Build internal charge while the external conditions align.',
    ],
    red: [
      'Take the single decisive action you have been over-deliberating.',
      'Close the loop on an open project today.',
      'Execution illuminates the next step faster than speculation.',
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
      // Default to purple insight
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
    }, 600)
  }

  if (!dailyState) return null

  const { color } = dailyState

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/5 border border-white/15 text-xs font-mono tracking-[0.25em] uppercase text-white/70">
          <Calendar className="w-3.5 h-3.5" />
          <span>{todayFormatted}</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-mono font-black tracking-wider uppercase text-white text-gradient-white">
          DAILY STATE
        </h1>
        <p className="text-sm sm:text-base text-white/50 font-light max-w-md mx-auto">
          Your ambient energetic orientation for today. Align your actions with this state.
        </p>
      </div>

      {/* Central Daily State Orb Panel */}
      <GlassPanel
        variant="glow"
        glowColor={color.glowHex}
        className="p-8 sm:p-14 text-center relative overflow-hidden"
      >
        {/* Background glow bloom */}
        <div
          className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-[90px] opacity-30 pointer-events-none"
          style={{ backgroundColor: color.glowHex }}
        />

        <div className="flex flex-col items-center max-w-xl mx-auto space-y-6">
          {/* Luminous Orb */}
          <div className="my-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={color.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <ColorOrb color={color} size={110} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Color & State Name */}
          <div className="space-y-1">
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-white/40 block">
              TODAY&apos;S ALIGNMENT
            </span>
            <h2 className="text-4xl sm:text-5xl font-mono font-bold tracking-widest uppercase text-white">
              {color.name}
            </h2>
            <div
              className="text-xl font-mono tracking-[0.25em] uppercase font-semibold"
              style={{ color: color.hex }}
            >
              {color.state} · {color.chinese}
            </div>
            <p className="text-xs font-mono text-white/40 uppercase tracking-wider mt-1">
              {color.actionChinese}
            </p>
          </div>

          {/* Daily Reflection Quote Box */}
          <div
            className="p-6 rounded-2xl border backdrop-blur-md w-full relative"
            style={{
              backgroundColor: `rgba(${color.rgb}, 0.07)`,
              borderColor: `rgba(${color.rgb}, 0.25)`,
            }}
          >
            <div
              className="text-[10px] font-mono tracking-widest uppercase mb-2 flex items-center justify-center gap-1.5"
              style={{ color: color.hex }}
            >
              <Quote className="w-3.5 h-3.5" />
              <span>DAILY CONTEMPLATION</span>
            </div>
            <p className="text-base sm:text-lg font-light text-white leading-relaxed italic">
              &ldquo;{dailyState.reflection}&rdquo;
            </p>
          </div>

          {/* Draw Button & Direct to Reading */}
          <div className="pt-4 flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
            <PrimaryButton
              size="lg"
              onClick={handleDrawToday}
              disabled={isDrawing}
              glowColor={color.glowHex}
              icon={<RotateCw className={`w-4 h-4 ${isDrawing ? 'animate-spin' : ''}`} />}
            >
              {isDrawing ? 'Sampling State...' : "Draw Today's State"}
            </PrimaryButton>

            <Link href="/reading">
              <PrimaryButton
                size="lg"
                variant="outline"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Inquire Deeper
              </PrimaryButton>
            </Link>
          </div>
        </div>
      </GlassPanel>
    </div>
  )
}
