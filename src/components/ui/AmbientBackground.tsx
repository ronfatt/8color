'use client'

import React, { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { STATE_COLOR_LIST } from '@/lib/constants'

export function AmbientBackground() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 60 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      const x = (e.clientX / innerWidth - 0.5) * 30
      const y = (e.clientY / innerHeight - 0.5) * 30
      mouseX.set(x)
      mouseY.set(y)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  if (!isClient) {
    return <div className="fixed inset-0 bg-[#f8f9fc] -z-50" />
  }

  const orbConfig = [
    { color: STATE_COLOR_LIST[0], x: '10%', y: '15%', size: 340, duration: 18, delay: 0 },
    { color: STATE_COLOR_LIST[1], x: '78%', y: '10%', size: 400, duration: 22, delay: 1 },
    { color: STATE_COLOR_LIST[2], x: '88%', y: '60%', size: 360, duration: 20, delay: 2 },
    { color: STATE_COLOR_LIST[3], x: '15%', y: '78%', size: 420, duration: 24, delay: 3 },
    { color: STATE_COLOR_LIST[4], x: '50%', y: '20%', size: 300, duration: 19, delay: 4 },
    { color: STATE_COLOR_LIST[5], x: '65%', y: '85%', size: 380, duration: 23, delay: 5 },
    { color: STATE_COLOR_LIST[6], x: '8%', y: '45%', size: 320, duration: 21, delay: 6 },
    { color: STATE_COLOR_LIST[7], x: '82%', y: '35%', size: 350, duration: 25, delay: 7 },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-50 bg-[#f8f9fc]">
      {/* Subtle Texture */}
      <div className="absolute inset-0 bg-grain opacity-60" />

      {/* Floating 8-color luminous pastel orbital system */}
      <motion.div
        style={{ x: smoothX, y: smoothY }}
        className="absolute inset-0 w-full h-full"
      >
        {orbConfig.map((orb) => (
          <motion.div
            key={orb.color.id}
            initial={{ opacity: 0.25 }}
            animate={{
              x: [0, 20, -15, 10, 0],
              y: [0, -25, 15, -10, 0],
              scale: [1, 1.08, 0.96, 1.04, 1],
              opacity: [0.35, 0.55, 0.38, 0.6, 0.35],
            }}
            transition={{
              duration: orb.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: orb.delay,
            }}
            className="absolute rounded-full blur-[100px] transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: orb.x,
              top: orb.y,
              width: orb.size,
              height: orb.size,
              backgroundColor: orb.color.glowHex,
            }}
          />
        ))}
      </motion.div>

      {/* Warm ambient daylight diffusion layer */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.7)_0%,rgba(248,249,252,0.6)_60%,rgba(241,245,249,0.85)_100%)]" />
    </div>
  )
}
