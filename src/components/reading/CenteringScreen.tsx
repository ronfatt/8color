'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Eye } from 'lucide-react'
import { PrimaryButton } from '@/components/ui/PrimaryButton'

interface CenteringScreenProps {
  question: string
  onEnter: () => void
}

export function CenteringScreen({ question, onEnter }: CenteringScreenProps) {
  const [canProceed, setCanProceed] = useState(false)

  useEffect(() => {
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
      transition={{ duration: 0.6 }}
      className="min-h-[65vh] flex flex-col items-center justify-center text-center px-4 max-w-lg mx-auto select-none"
    >
      {/* Target Question Display */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="mb-8"
      >
        <span className="text-xs font-semibold text-slate-400 mb-2 block tracking-widest">
          你的觉察意图
        </span>
        <blockquote className="text-xl sm:text-2xl font-medium text-slate-900 leading-relaxed max-w-md mx-auto">
          “{question}”
        </blockquote>
      </motion.div>

      {/* Gentle Luminous Pulse Circle */}
      <div className="relative my-6 flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.7, 1],
            opacity: [0.4, 0.08, 0.4],
          }}
          transition={{
            duration: 3.6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute w-40 h-40 rounded-full border border-slate-300/80 bg-slate-200/20 blur-[1px]"
        />

        <motion.div
          animate={{
            scale: [1, 1.35, 1],
            opacity: [0.6, 0.2, 0.6],
          }}
          transition={{
            duration: 3.6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.4,
          }}
          className="absolute w-28 h-28 rounded-full border border-slate-400/40 bg-white/50"
        />

        {/* Central Core Eye */}
        <motion.div
          animate={{
            scale: [0.96, 1.05, 0.96],
            boxShadow: [
              '0 4px 20px rgba(148, 163, 184, 0.3)',
              '0 8px 30px rgba(100, 116, 139, 0.45)',
              '0 4px 20px rgba(148, 163, 184, 0.3)',
            ],
          }}
          transition={{
            duration: 3.6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-18 h-18 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center z-10"
        >
          <Eye className="w-6 h-6 text-slate-700 animate-pulse" />
        </motion.div>
      </div>

      {/* Instructions */}
      <div className="mt-6 space-y-1.5">
        <h2 className="text-sm font-bold tracking-widest text-slate-800 uppercase">
          专注当下 · 保持静心
        </h2>
        <p className="text-xs text-slate-500 font-normal">
          停留在问题本身，先不要急于在脑海中寻找答案
        </p>
      </div>

      {/* Enter Action */}
      <div className="mt-10 min-h-[52px] w-full flex items-center justify-center">
        {canProceed ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="w-full"
          >
            <PrimaryButton
              size="lg"
              onClick={onEnter}
              className="w-full max-w-xs mx-auto"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              开启八面镜像
            </PrimaryButton>
          </motion.div>
        ) : (
          <div className="text-xs font-medium text-slate-400 animate-pulse">
            正在调频状态场域...
          </div>
        )}
      </div>
    </motion.div>
  )
}
