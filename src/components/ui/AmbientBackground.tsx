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
      const x = (e.clientX / innerWidth - 0.5) * 40
      const y = (e.clientY / innerHeight - 0.5) * 40
      mouseX.set(x)
      mouseY.set(y)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  if (!isClient) {
    return <div className="fixed inset-0 bg-[#08080a] -z-50" />
  }

  // Define orbital positions and animation offsets for the 8 colors
  const orbConfig = [
    { color: STATE_COLOR_LIST[0], x: '15%', y: '20%', size: 380, duration: 18, delay: 0 },
    { color: STATE_COLOR_LIST[1], x: '75%', y: '15%', size: 420, duration: 22, delay: 1 },
    { color: STATE_COLOR_LIST[2], x: '85%', y: '65%', size: 360, duration: 20, delay: 2 },
    { color: STATE_COLOR_LIST[3], x: '20%', y: '75%', size: 440, duration: 24, delay: 3 },
    { color: STATE_COLOR_LIST[4], x: '45%', y: '25%', size: 320, duration: 19, delay: 4 },
    { color: STATE_COLOR_LIST[5], x: '60%', y: '80%', size: 400, duration: 23, delay: 5 },
    { color: STATE_COLOR_LIST[6], x: '10%', y: '45%', size: 340, duration: 21, delay: 6 },
    { color: STATE_COLOR_LIST[7], x: '80%', y: '40%', size: 390, duration: 25, delay: 7 },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-50 bg-[#070709]">
      {/* Subtle Noise / Grid Texture */}
      <div className="absolute inset-0 bg-grain opacity-40 mix-blend-overlay" />

      {/* Floating 8-color orbital system */}
      <motion.div
        style={{ x: smoothX, y: smoothY }}
        className="absolute inset-0 w-full h-full"
      >
        {orbConfig.map((orb, index) => (
          <motion.div
            key={orb.color.id}
            initial={{ opacity: 0.15 }}
            animate={{
              x: [0, 25, -20, 15, 0],
              y: [0, -30, 20, -15, 0],
              scale: [1, 1.1, 0.95, 1.05, 1],
              opacity: [0.12, 0.22, 0.14, 0.25, 0.12],
            }}
            transition={{
              duration: orb.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: orb.delay,
            }}
            className="absolute rounded-full blur-[90px] transform -translate-x-1/2 -translate-y-1/2"
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

      {/* Central vignette and dark obsidian depth field */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(8,8,10,0.4)_0%,rgba(8,8,10,0.85)_70%,rgba(8,8,10,0.98)_100%)]" />
    </div>
  )
}
