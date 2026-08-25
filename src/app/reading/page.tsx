'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createMockReading } from '@/lib/pattern-engine'
import { saveCurrentReading } from '@/lib/storage'
import { QuestionInput } from '@/components/reading/QuestionInput'
import { CenteringScreen } from '@/components/reading/CenteringScreen'

export default function ReadingPage() {
  const router = useRouter()
  const [phase, setPhase] = useState<'ask' | 'centering'>('ask')
  const [question, setQuestion] = useState('')

  const handleQuestionSubmit = (enteredQuestion: string) => {
    setQuestion(enteredQuestion)
    // Create new mock reading and persist
    const newReading = createMockReading(enteredQuestion)
    saveCurrentReading(newReading)
    setPhase('centering')
  }

  const handleEnterMirrors = () => {
    router.push('/reveal')
  }

  return (
    <div className="w-full flex-1 flex flex-col justify-center items-center px-4 py-8">
      {phase === 'ask' && (
        <QuestionInput onSubmit={handleQuestionSubmit} initialValue={question} />
      )}

      {phase === 'centering' && (
        <CenteringScreen
          question={question}
          onEnter={handleEnterMirrors}
        />
      )}
    </div>
  )
}
