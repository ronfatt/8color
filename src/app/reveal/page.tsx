'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Reading } from '@/lib/state8/types'
import { getCurrentReading, saveCurrentReading } from '@/lib/storage'
import { createReadingEngine } from '@/lib/state8/readingEngine'
import { MirrorBoard } from '@/components/reading/MirrorBoard'
import confetti from 'canvas-confetti'

export default function RevealPage() {
  const router = useRouter()
  const [reading, setReading] = useState<Reading | null>(null)
  const [isAllRevealed, setIsAllRevealed] = useState(false)

  useEffect(() => {
    let current = getCurrentReading()
    if (!current || !current.mirrors || current.mirrors.length === 0) {
      current = createReadingEngine('我当下的真实状态与破局方向是什么？')
      saveCurrentReading(current)
    }

    // Set initial mirrors to unrevealed for fresh reveal experience
    const freshMirrors = current.mirrors.map((m) => ({ ...m, isRevealed: false }))
    const initialReading = { ...current, mirrors: freshMirrors }
    setReading(initialReading)
    setIsAllRevealed(false)
  }, [])

  if (!reading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-xs font-semibold text-slate-400 animate-pulse">
          正在布置镜像场域...
        </div>
      </div>
    )
  }

  const handleFlipAll = () => {
    if (!reading || isAllRevealed) return

    // Flip all 8 cards at once
    const updatedMirrors = reading.mirrors.map((m) => ({
      ...m,
      isRevealed: true,
    }))

    const updatedReading: Reading = {
      ...reading,
      mirrors: updatedMirrors,
    }

    setReading(updatedReading)
    saveCurrentReading(updatedReading)
    setIsAllRevealed(true)

    // Trigger celebratory particle effect
    try {
      setTimeout(() => {
        confetti({
          particleCount: 40,
          spread: 70,
          origin: { y: 0.55 },
          colors: ['#ca8a04', '#3b82f6', '#10b981', '#ef4444', '#8b5cf6', '#ec4899'],
          disableForReducedMotion: true,
        })
      }, 450)
    } catch {
      // ignore
    }
  }

  const handleComplete = () => {
    router.push('/result')
  }

  return (
    <div className="w-full flex-1 flex flex-col justify-center items-center py-2 sm:py-6">
      <MirrorBoard
        mirrors={reading.mirrors}
        isAllRevealed={isAllRevealed}
        onFlipAll={handleFlipAll}
        onComplete={handleComplete}
        question={reading.question}
      />
    </div>
  )
}
