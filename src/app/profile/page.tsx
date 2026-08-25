'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  User,
  Shield,
  Sliders,
  Globe,
  Moon,
  Volume2,
  Trash2,
  ExternalLink,
  Sparkles,
  Info,
} from 'lucide-react'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { PrimaryButton } from '@/components/ui/PrimaryButton'

export default function ProfilePage() {
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [hapticsEnabled, setHapticsEnabled] = useState(true)
  const [ambientGlow, setAmbientGlow] = useState(true)
  const [language, setLanguage] = useState<'EN' | 'ZH'>('EN')
  const [clearMessage, setClearMessage] = useState('')

  const handleClearHistory = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('state8_saved_readings')
      localStorage.removeItem('state8_current_reading')
      setClearMessage('Local reading cache cleared.')
      setTimeout(() => setClearMessage(''), 3000)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/5 border border-white/15 text-xs font-mono tracking-[0.25em] uppercase text-white/70">
          <User className="w-3.5 h-3.5" />
          <span>SYSTEM & PREFERENCES</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-mono font-black tracking-wider uppercase text-white text-gradient-white">
          PROFILE
        </h1>
        <p className="text-sm sm:text-base text-white/50 font-light max-w-md mx-auto">
          Local engine preferences and STATE/8 philosophical manifesto.
        </p>
      </div>

      {/* User Identity Panel */}
      <GlassPanel variant="glow" className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-20 h-20 rounded-full border border-white/20 bg-white/5 flex items-center justify-center relative shadow-[0_0_20px_rgba(255,255,255,0.15)]">
            <span className="w-4 h-4 rounded-full bg-white animate-pulse" />
            <div className="absolute inset-0 rounded-full bg-white/10 blur-md" />
          </div>

          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="inline-block text-[10px] font-mono tracking-widest text-emerald-400 uppercase bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              ACTIVE PATTERN NODE
            </div>
            <h2 className="text-2xl font-mono font-bold tracking-wider uppercase text-white">
              OBSERVER // 08
            </h2>
            <p className="text-xs font-mono text-white/50 tracking-wide">
              Round 01 Prototype · Session Local Storage
            </p>
          </div>
        </div>
      </GlassPanel>

      {/* Engine Settings */}
      <GlassPanel variant="card" className="p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2 border-b border-white/10 pb-4">
          <Sliders className="w-4 h-4 text-white/70" />
          <h3 className="text-sm font-mono font-bold tracking-widest uppercase text-white">
            ENGINE PREFERENCES
          </h3>
        </div>

        <div className="space-y-5">
          {/* Language */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-sm font-mono uppercase text-white flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-white/60" />
                <span>Language / 语言</span>
              </div>
              <p className="text-xs text-white/40">Primary reflection vocabulary</p>
            </div>
            <div className="flex items-center gap-1 p-1 rounded-full bg-white/5 border border-white/10 font-mono text-xs">
              <button
                onClick={() => setLanguage('EN')}
                className={`px-3 py-1 rounded-full cursor-pointer transition-colors ${
                  language === 'EN' ? 'bg-white text-black font-semibold' : 'text-white/60 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('ZH')}
                className={`px-3 py-1 rounded-full cursor-pointer transition-colors ${
                  language === 'ZH' ? 'bg-white text-black font-semibold' : 'text-white/60 hover:text-white'
                }`}
              >
                中文
              </button>
            </div>
          </div>

          {/* Theme */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-sm font-mono uppercase text-white flex items-center gap-2">
                <Moon className="w-3.5 h-3.5 text-white/60" />
                <span>Visual Theme</span>
              </div>
              <p className="text-xs text-white/40">Obsidian Black Glass (Locked)</p>
            </div>
            <span className="text-xs font-mono text-white/60 uppercase px-3 py-1 rounded-full bg-white/5 border border-white/10">
              OBSIDIAN
            </span>
          </div>

          {/* Ambient Lighting */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-sm font-mono uppercase text-white flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-white/60" />
                <span>Ambient Orb Motion</span>
              </div>
              <p className="text-xs text-white/40">Slow breathing background particles</p>
            </div>
            <button
              onClick={() => setAmbientGlow(!ambientGlow)}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                ambientGlow ? 'bg-white' : 'bg-white/20'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-black transition-transform ${
                  ambientGlow ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Reset Cache */}
          <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
            <div className="space-y-0.5">
              <div className="text-sm font-mono uppercase text-red-300 flex items-center gap-2">
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear Local Cache</span>
              </div>
              <p className="text-xs text-white/40">Deletes saved readings from this browser</p>
            </div>
            <button
              onClick={handleClearHistory}
              className="text-xs font-mono tracking-wider uppercase text-red-400 hover:text-red-300 px-3 py-1.5 rounded-lg border border-red-500/30 hover:bg-red-500/10 transition-colors cursor-pointer"
            >
              Clear Data
            </button>
          </div>

          {clearMessage && (
            <p className="text-xs font-mono text-emerald-400 uppercase tracking-widest animate-pulse text-right">
              {clearMessage}
            </p>
          )}
        </div>
      </GlassPanel>

      {/* Manifesto & Philosophy of STATE/8 */}
      <GlassPanel variant="subtle" className="p-6 sm:p-10 space-y-6">
        <div className="flex items-center gap-2 border-b border-white/10 pb-4">
          <Shield className="w-4 h-4 text-white/70" />
          <h3 className="text-sm font-mono font-bold tracking-widest uppercase text-white">
            ABOUT STATE/8 & MANIFESTO
          </h3>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-white/70 font-light leading-relaxed">
          <p>
            <strong className="text-white font-mono uppercase tracking-wider block mb-1">
              DON&apos;T PREDICT THE FUTURE. READ THE PATTERN.
            </strong>
            STATE/8 is not a fortune-telling tool, nor does it rely on astrology, zodiac signs, tarot archetypes, or chakras. Future events are indeterminate; what is fixed and readable is the energetic and mental posture you hold right now.
          </p>

          <p>
            By mapping one single question through <strong>8 Color States</strong> and <strong>8 Mirror Dimensions</strong> (Core, Mind, Emotion, Action, Relation, Reality, Block, Key), STATE/8 exposes where momentum is leaking and identifies the exact pivot state required for alignment.
          </p>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2 mt-4">
            <div className="text-[11px] font-mono tracking-widest text-white uppercase font-bold">
              CORE AXIOMS:
            </div>
            <ul className="list-disc list-inside space-y-1 font-mono text-xs text-white/60">
              <li>01 · No future prediction — only present pattern diagnosis.</li>
              <li>02 · Motion must support meaning, never gratuitous flash.</li>
              <li>03 · Awareness dissolves friction faster than brute force.</li>
            </ul>
          </div>
        </div>

        <div className="pt-4 text-center text-xs font-mono text-white/30 tracking-widest uppercase">
          STATE/8 ENGINE · VERSION 1.0.0 (ROUND 01)
        </div>
      </GlassPanel>
    </div>
  )
}
