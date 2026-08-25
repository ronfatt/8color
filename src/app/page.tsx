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
      title: 'ASK',
      chinese: '立念',
      description: 'Hold one clear question. Focus on a single decision, relationship, or crossroad.',
      icon: HelpCircle,
    },
    {
      step: '02',
      title: 'REVEAL',
      chinese: '映照',
      description: 'Eight mirrors expose the hidden tension, emotional baseline, and structural reality.',
      icon: Layers,
    },
    {
      step: '03',
      title: 'READ',
      chinese: '解钥',
      description: 'One key state reveals where to move next. Not prediction — conscious vector alignment.',
      icon: Sparkles,
    },
  ]

  return (
    <div className="w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 space-y-24 md:space-y-36 my-6 md:my-12">
      {/* ================= HERO SECTION ================= */}
      <section className="relative w-full max-w-5xl mx-auto flex flex-col items-center text-center pt-8 md:pt-16">
        {/* Subtle pill tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel-subtle border border-white/15 text-xs font-mono tracking-[0.3em] uppercase text-white/70 mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span>PERSONAL PATTERN ENGINE</span>
        </motion.div>

        {/* Big Editorial Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-mono font-black tracking-[0.15em] uppercase text-white drop-shadow-[0_0_35px_rgba(255,255,255,0.2)] text-gradient-white"
        >
          STATE/8
        </motion.h1>

        {/* Subtitle & Core Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 space-y-3 max-w-2xl"
        >
          <p className="text-lg sm:text-2xl md:text-3xl font-light text-white/90 tracking-wide">
            Read the pattern beneath the question.
          </p>
          <div className="text-xs sm:text-sm font-mono tracking-[0.3em] uppercase text-white/50 pt-1">
            8 COLORS · 8 MIRRORS · 1 KEY
          </div>
          <p className="text-xs sm:text-sm font-mono text-white/40 italic">
            &ldquo;未来未定，先看清现在。&rdquo;
          </p>
        </motion.div>

        {/* Primary Call To Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Link href="/reading" className="w-full sm:w-auto">
            <PrimaryButton
              size="lg"
              className="w-full sm:w-auto min-w-[240px]"
              icon={<Compass className="w-5 h-5" />}
            >
              Start A Reading
            </PrimaryButton>
          </Link>

          <Link href="/daily" className="w-full sm:w-auto">
            <PrimaryButton
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto min-w-[180px]"
              icon={<Sparkles className="w-4 h-4" />}
            >
              Explore Today
            </PrimaryButton>
          </Link>
        </motion.div>

        {/* Anti-Mysticism Guarantee Footnote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-12 flex items-center gap-2 text-[11px] font-mono text-white/30 tracking-widest uppercase"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Non-predictive · Decision intelligence · Cognitive clarity</span>
        </motion.div>
      </section>

      {/* ================= SECTION 02: HOW IT WORKS ================= */}
      <section className="w-full max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-white/40 block mb-2">
            METHODOLOGY
          </span>
          <h2 className="text-3xl sm:text-4xl font-mono font-bold tracking-widest uppercase text-white">
            HOW IT WORKS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <GlassPanel
                  variant="card"
                  className="p-8 h-full flex flex-col justify-between group hover:border-white/30 relative overflow-hidden"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono tracking-[0.25em] text-white/40">
                        {item.step}
                      </span>
                      <div className="w-9 h-9 rounded-full bg-white/5 group-hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/70 group-hover:text-white transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-mono font-bold tracking-wider uppercase text-white flex items-center gap-2">
                        <span>{item.title}</span>
                        <span className="text-xs font-mono text-white/40 font-normal">
                          / {item.chinese}
                        </span>
                      </h3>
                    </div>

                    <p className="text-sm text-white/65 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/[0.06] text-[10px] font-mono tracking-widest text-white/30 uppercase">
                    PHASE {item.step} FLOW
                  </div>
                </GlassPanel>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* ================= SECTION 03: THE EIGHT STATES ================= */}
      <section className="w-full max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-white/40 block mb-2">
            DESIGN TOKENS
          </span>
          <h2 className="text-3xl sm:text-4xl font-mono font-bold tracking-widest uppercase text-white">
            THE EIGHT STATES
          </h2>
          <p className="text-xs sm:text-sm text-white/50 mt-2 font-mono">
            Tap any state to inspect its reflection frequency & action matrix.
          </p>
        </div>

        {/* Desktop: Horizontal Layout / Mobile: 2 x 4 Grid */}
        <GlassPanel variant="glow" className="p-6 sm:p-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 sm:gap-4 justify-items-center">
            {STATE_COLOR_LIST.map((color) => (
              <ColorOrb
                key={color.id}
                color={color}
                size={72}
                showLabel
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
        </GlassPanel>
      </section>

      {/* ================= BOTTOM TEASER CTA ================= */}
      <section className="w-full max-w-4xl mx-auto text-center pb-8">
        <GlassPanel variant="subtle" className="p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-xl mx-auto space-y-4">
            <h3 className="text-2xl sm:text-3xl font-mono font-bold tracking-wider uppercase text-white">
              Ready to clarify your position?
            </h3>
            <p className="text-sm text-white/60 font-light leading-relaxed">
              Don’t force outcomes through friction. Expose the structural pattern and discover the key vector.
            </p>
            <div className="pt-4 flex justify-center">
              <Link href="/reading">
                <PrimaryButton size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                  Begin Inquiry
                </PrimaryButton>
              </Link>
            </div>
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
