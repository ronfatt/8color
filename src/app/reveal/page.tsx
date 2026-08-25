'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Reading } from '@/types/state8'
import { getCurrentReading, saveCurrentReading } from '@/lib/storage'
import { createMockReading } from '@/lib/pattern-engine'
import { MirrorBoard } from '@/components/reading/MirrorBoard'
import { KeyReveal } from '@/components/reading/KeyReveal'

export default function RevealPage() {
  const router = useRouter()
  const [reading, setReading] = useState<Reading | null>(null)
  const [currentRevealIndex, setCurrentRevealIndex] = useState(0) // 0 to 7
  const [showKeyMoment, setShowKeyMoment] = useState(false)

  useEffect(() => {
    // Load existing reading or fallback to a fresh demo reading
    let current = getCurrentReading()
    if (!current || !current.mirrors || current.mirrors.length === 0) {
      current = createMockReading('What is the true pattern beneath my current path?')
      saveCurrentReading(current)
    }
    setReading(current)

    // Calculate how many mirrors are already revealed if resuming
    const revealedCount = current.mirrors.filter((m) => m.isRevealed).length
    setCurrentRevealIndex(revealedCount)

    if (revealedCount >= 7) {
      setShowKeyMoment(true)
    }
  }, [])

  if (!reading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-xs font-mono tracking-widest text-white/40 uppercase animate-pulse">
          INITIALIZING PATTERN FIELD...
        </div>
      </div>
    )
  }

  const handleRevealMirror = (index: number) => {
    if (!reading) return

    const updatedMirrors = [...reading.mirrors]
    updatedMirrors[index] = {
      ...updatedMirrors[index],
      isRevealed: true,
    }

    const updatedReading: Reading = {
      ...reading,
      mirrors: updatedMirrors,
    }

    setReading(updatedReading)
    saveCurrentReading(updatedReading)

    const nextIndex = index + 1
    setCurrentRevealIndex(nextIndex)

    // When 7 mirrors are revealed (indices 0 through 6), trigger Key moment
    if (nextIndex === 7) {
      setTimeout(() => {
        setShowKeyMoment(true)
      }, 600)
    }
  }

  const handleKeyComplete = () => {
    if (!reading) return
    // Mark key as revealed as well
    const updatedMirrors = reading.mirrors.map((m) => ({ ...m, isRevealed: true }))
    const updatedReading = { ...reading, mirrors: updatedMirrors }
    setReading(updatedReading)
    saveCurrentReading(updatedReading)

    router.push('/result')
  }

  return (
    <div className="w-full flex-1 flex flex-col justify-center items-center py-6 sm:py-10">
      <MirrorBoard
        mirrors={reading.mirrors}
        currentRevealIndex={currentRevealIndex}
        onRevealMirror={handleRevealMirror}
        question={reading.question}
      />

      {/* Focal Key Moment Overlay */}
      {showKeyMoment && (
        <KeyReveal
          keyMirror={reading.mirrors[7]}
          onComplete={handleKeyComplete}
        />
      )}
    </div>
  )
}
