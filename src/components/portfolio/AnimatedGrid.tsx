"use client"

import React, { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function AnimatedGrid() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 -z-10 overflow-hidden bg-background pointer-events-none"
    >
        {/* Primary Grid */}
        <div 
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `
              linear-gradient(to right, oklch(0.35 0.02 45 / 0.3) 1px, transparent 1px),
              linear-gradient(to bottom, oklch(0.35 0.02 45 / 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Secondary Fine Grid */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, oklch(0.35 0.02 45 / 0.2) 1px, transparent 1px),
              linear-gradient(to bottom, oklch(0.35 0.02 45 / 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '8px 8px',
          }}
        />

      {/* Animated Glowing Lines */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`h-line-${i}`}
              className="absolute h-px w-full bg-linear-to-r from-transparent via-accent/30 to-transparent"

            initial={{ top: `${(i + 1) * 20}%`, left: '-100%' }}
            animate={{
              left: '100%',
              transition: {
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "linear",
                delay: i * 1.5
              }
            }}
          />
        ))}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`v-line-${i}`}
              className="absolute w-px h-full bg-linear-to-b from-transparent via-accent/30 to-transparent"

            initial={{ left: `${(i + 1) * 15}%`, top: '-100%' }}
            animate={{
              top: '100%',
              transition: {
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "linear",
                delay: i * 2
              }
            }}
          />
        ))}
      </div>

        {/* Subtle vignette - matches beige background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,oklch(0.90_0.015_75)_90%)]" />
      
      {/* Subtle Scanline Effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 0.2) 50%)',
          backgroundSize: '100% 4px',
        }}
      />
    </div>
  )
}
