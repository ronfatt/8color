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
  const [currentRevealIndex, setCurrentRevealIndex] = useState(0)
  const [showKeyMoment, setShowKeyMoment] = useState(false)

  useEffect(() => {
    let current = getCurrentReading()
    if (!current || !current.mirrors || current.mirrors.length === 0) {
      current = createMockReading('我当下的真实状态与破局方向是什么？')
      saveCurrentReading(current)
    }
    setReading(current)

    const revealedCount = current.mirrors.filter((m) => m.isRevealed).length
    setCurrentRevealIndex(revealedCount)

    if (revealedCount >= 7) {
      setShowKeyMoment(true)
    }
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

    if (nextIndex === 7) {
      setTimeout(() => {
        setShowKeyMoment(true)
      }, 550)
    }
  }

  const handleKeyComplete = () => {
    if (!reading) return
    const updatedMirrors = reading.mirrors.map((m) => ({ ...m, isRevealed: true }))
    const updatedReading = { ...reading, mirrors: updatedMirrors }
    setReading(updatedReading)
    saveCurrentReading(updatedReading)

    router.push('/result')
  }

  return (
    <div className="w-full flex-1 flex flex-col justify-center items-center py-2 sm:py-6">
      <MirrorBoard
        mirrors={reading.mirrors}
        currentRevealIndex={currentRevealIndex}
        onRevealMirror={handleRevealMirror}
        question={reading.question}
      />

      {/* Key Moment Overlay */}
      {showKeyMoment && (
        <KeyReveal
          keyMirror={reading.mirrors[7]}
          onComplete={handleKeyComplete}
        />
      )}
    </div>
  )
}
