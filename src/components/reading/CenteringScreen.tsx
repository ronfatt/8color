'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Eye, ArrowRight } from 'lucide-react'
import { PrimaryButton } from '@/components/ui/PrimaryButton'

interface CenteringScreenProps {
  question: string
  onEnter: () => void
}

export function CenteringScreen({ question, onEnter }: CenteringScreenProps) {
  const [canProceed, setCanProceed] = useState(false)

  useEffect(() => {
    // Reveal enter button after 2.4 seconds of centering breath
    const timer = setTimeout(() => {
      setCanProceed(true)
    }, 2400)

    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 max-w-3xl mx-auto select-none"
    >
      {/* Target Question Display */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mb-12"
      >
        <span className="text-xs font-mono tracking-[0.25em] uppercase text-white/40 mb-3 block">
          Your Inquiry
        </span>
        <blockquote className="text-2xl sm:text-3xl md:text-4xl font-light text-white leading-relaxed tracking-wide italic max-w-2xl mx-auto drop-shadow-md">
          &ldquo;{question}&rdquo;
        </blockquote>
      </motion.div>

      {/* Breathing Central Orb Pulse */}
      <div className="relative my-8 flex items-center justify-center">
        {/* Outer expanding pulse rings */}
        <motion.div
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.3, 0.05, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute w-44 h-44 rounded-full border border-white/20 blur-[2px]"
        />

        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.5, 0.15, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
          className="absolute w-32 h-32 rounded-full border border-white/30"
        />

        {/* Central Core Breathing Eye */}
        <motion.div
          animate={{
            scale: [0.95, 1.08, 0.95],
            boxShadow: [
              '0 0 20px rgba(255,255,255,0.2)',
              '0 0 50px rgba(255,255,255,0.5)',
              '0 0 20px rgba(255,255,255,0.2)',
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/40 flex items-center justify-center"
        >
          <Eye className="w-7 h-7 text-white/80 animate-pulse" />
        </motion.div>
      </div>

      {/* Centering Direction Copy */}
      <div className="mt-8 space-y-2">
        <h2 className="text-sm font-mono tracking-[0.3em] uppercase text-white/70">
          HOLD THE QUESTION
        </h2>
        <p className="text-xs sm:text-sm text-white/40 font-light">
          Stay with the question. Do not seek the answer yet.
        </p>
      </div>

      {/* Button Appearance */}
      <div className="mt-12 min-h-[56px] flex items-center justify-center">
        {canProceed ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <PrimaryButton
              size="lg"
              onClick={onEnter}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Enter The Mirrors
            </PrimaryButton>
          </motion.div>
        ) : (
          <div className="text-[11px] font-mono tracking-widest text-white/30 uppercase animate-pulse">
            Aligning pattern field...
          </div>
        )}
      </div>
    </motion.div>
  )
}
