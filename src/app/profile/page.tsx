'use client'

import React, { useState } from 'react'
import {
  User,
  Shield,
  Sliders,
  Sparkles,
  Trash2,
  HelpCircle,
  Layers,
} from 'lucide-react'
import { GlassPanel } from '@/components/ui/GlassPanel'

export default function ProfilePage() {
  const [ambientGlow, setAmbientGlow] = useState(true)
  const [clearMessage, setClearMessage] = useState('')

  const handleClearHistory = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('state8_saved_readings')
      localStorage.removeItem('state8_current_reading')
      setClearMessage('本地记录缓存已清空。')
      setTimeout(() => setClearMessage(''), 3000)
    }
  }

  return (
    <div className="w-full max-w-lg mx-auto py-4 space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-xs text-xs font-semibold text-slate-600">
          <User className="w-3.5 h-3.5" />
          <span>关于罗盘与偏好</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900">
          系统设置与理念
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xs mx-auto">
          本地状态引擎偏好与 STATE/8 觉察罗盘哲学
        </p>
      </div>

      {/* User Card */}
      <GlassPanel variant="glow" className="p-5 sm:p-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full border border-slate-200 bg-white shadow-sm flex items-center justify-center relative">
            <span className="w-3 h-3 rounded-full bg-slate-800 animate-pulse" />
            <div className="absolute inset-0 rounded-full bg-slate-300/30 blur-sm" />
          </div>

          <div className="space-y-1 flex-1">
            <div className="inline-block text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              觉察节点已激活
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              自主观察者 // 08
            </h2>
            <p className="text-xs text-slate-500 font-normal">
              第一轮原型系统 · 本地浏览器独立运行
            </p>
          </div>
        </div>
      </GlassPanel>

      {/* Preferences */}
      <GlassPanel variant="card" className="p-5 sm:p-6 space-y-5">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Sliders className="w-4 h-4 text-slate-700" />
          <h3 className="text-xs font-bold text-slate-900">
            交互与显示偏好
          </h3>
        </div>

        <div className="space-y-4">
          {/* Ambient Lighting */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-slate-500" />
                <span>动态背景光斑</span>
              </div>
              <p className="text-[11px] text-slate-400">后台缓慢流动的8色彩球</p>
            </div>
            <button
              onClick={() => setAmbientGlow(!ambientGlow)}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                ambientGlow ? 'bg-slate-900' : 'bg-slate-200'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                  ambientGlow ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Language / Theme */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-slate-800">
                界面语言 / 视觉主题
              </div>
              <p className="text-[11px] text-slate-400">纯中文 · 温暖明亮光感 (iOS App 体验)</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
              全中文 · 暖白
            </span>
          </div>

          {/* Reset Cache */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-red-600 flex items-center gap-1.5">
                <Trash2 className="w-3.5 h-3.5" />
                <span>清空本地历史记录</span>
              </div>
              <p className="text-[11px] text-slate-400">删除存储在当前浏览器中的起牌记录</p>
            </div>
            <button
              onClick={handleClearHistory}
              className="text-xs font-medium text-red-600 hover:text-red-700 px-3 py-1.5 rounded-lg border border-red-200 hover:bg-red-50 transition-colors cursor-pointer"
            >
              清理缓存
            </button>
          </div>

          {clearMessage && (
            <p className="text-xs font-semibold text-emerald-600 text-right animate-pulse">
              {clearMessage}
            </p>
          )}
        </div>
      </GlassPanel>

      {/* Manifesto */}
      <GlassPanel variant="subtle" className="p-5 sm:p-6 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200/80 pb-3">
          <Shield className="w-4 h-4 text-slate-700" />
          <h3 className="text-xs font-bold text-slate-900">
            STATE/8 觉察罗盘理念宣言
          </h3>
        </div>

        <div className="space-y-3 text-xs text-slate-600 leading-relaxed font-normal">
          <p className="font-bold text-slate-900 text-sm">
            未来未定，先看清现在。
          </p>
          <p>
            STATE/8 绝不是紫微斗数、塔罗牌、星座或传统算命工具。未来是由当下的无数选择动态生成的，无法被预言；真正可以被清晰读取的，是你当下所处的心力状态与行为模式。
          </p>
          <p>
            通过将一个具体问题置于 <strong>8种状态色彩</strong> 与 <strong>8面镜像维度</strong>（核心、心念、情绪、行动、人际、现实、阻碍、钥匙）中进行解构，罗盘帮助你跳出情绪内耗，精准锁定破局的关键钥匙。
          </p>

          <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 space-y-2 mt-3 shadow-2xs">
            <div className="text-[11px] font-bold text-slate-800">
              罗盘三项基本法则：
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-600">
              <li>01 · 不预言未来 — 只诊断当下的心念与行动模式。</li>
              <li>02 · 不迷信宿命 — 觉察带来清醒，清醒带来选择。</li>
              <li>03 · 顺势而调整 — 觉察规律，以巧劲化解刚性蛮力。</li>
            </ul>
          </div>
        </div>

        <div className="pt-3 text-center text-[10px] font-bold text-slate-400">
          STATE/8 ENGINE · 移动端版本 1.0 (第 1 轮)
        </div>
      </GlassPanel>
    </div>
  )
}
