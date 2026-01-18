"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

export function CursorTracker3D({ position = "fixed" }: { position?: "fixed" | "absolute" }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isBlinking, setIsBlinking] = useState(false)
  const [leftEyeHovered, setLeftEyeHovered] = useState(false)
  const [rightEyeHovered, setRightEyeHovered] = useState(false)
  const [isExcited, setIsExcited] = useState(false)
  const [isSad, setIsSad] = useState(false)
  
  // Motion values for smooth spring animations
  const leftEyeX = useMotionValue(0)
  const leftEyeY = useMotionValue(0)
  const rightEyeX = useMotionValue(0)
  const rightEyeY = useMotionValue(0)
  
  // Spring animations for smooth following
  const leftEyeXSpring = useSpring(leftEyeX, { stiffness: 400, damping: 25 })
  const leftEyeYSpring = useSpring(leftEyeY, { stiffness: 400, damping: 25 })
  const rightEyeXSpring = useSpring(rightEyeX, { stiffness: 400, damping: 25 })
  const rightEyeYSpring = useSpring(rightEyeY, { stiffness: 400, damping: 25 })

  // Random blinking animation
  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    let blinkTimeoutId: NodeJS.Timeout

    const scheduleBlink = () => {
      // Random interval between 2-6 seconds for natural blinking
      const delay = Math.random() * 4000 + 2000
      
      timeoutId = setTimeout(() => {
        setIsBlinking(true)
        
        // Blink duration (eyes close and open)
        blinkTimeoutId = setTimeout(() => {
          setIsBlinking(false)
          scheduleBlink() // Schedule next blink
        }, 150) // Quick blink duration
      }, delay)
    }

    scheduleBlink()
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      if (blinkTimeoutId) clearTimeout(blinkTimeoutId)
    }
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const containerCenterX = rect.left + rect.width / 2
      const containerCenterY = rect.top + rect.height / 2

      // Calculate distance from container center to cursor
      const dx = e.clientX - containerCenterX
      const dy = e.clientY - containerCenterY
      
      // Calculate angle for accurate tracking
      const angle = Math.atan2(dy, dx)
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      // Use viewport diagonal for normalization - more accurate
      const viewportDiagonal = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2)
      const normalizedDistance = Math.min(1, (distance / viewportDiagonal) * 2)

      // Calculate eye position (constrained within eye socket)
      // Increase max movement for better visibility
      const maxEyeMovement = 8 // pixels
      const eyeX = Math.cos(angle) * normalizedDistance * maxEyeMovement
      const eyeY = Math.sin(angle) * normalizedDistance * maxEyeMovement

      // Update motion values (spring will animate smoothly)
      leftEyeX.set(eyeX)
      leftEyeY.set(eyeY)
      rightEyeX.set(eyeX)
      rightEyeY.set(eyeY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [leftEyeX, leftEyeY, rightEyeX, rightEyeY])

  // Listen for excited emotion events from social/email links
  useEffect(() => {
    const handleExcitedStart = () => setIsExcited(true)
    const handleExcitedEnd = () => setIsExcited(false)

    window.addEventListener("eye-excited-start", handleExcitedStart)
    window.addEventListener("eye-excited-end", handleExcitedEnd)

    return () => {
      window.removeEventListener("eye-excited-start", handleExcitedStart)
      window.removeEventListener("eye-excited-end", handleExcitedEnd)
    }
  }, [])

  // Detect when cursor leaves the website/viewport - make eyes sad
  useEffect(() => {
    const handleMouseLeave = () => setIsSad(true)
    const handleMouseEnter = () => setIsSad(false)

    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className={`${position} hidden lg:block bottom-8 right-8 w-24 h-24 lg:w-32 lg:h-32 pointer-events-none z-50 flex items-center justify-center`}
    >
      <div className="relative w-full h-full flex items-center justify-center gap-3 lg:gap-4">
        {/* Left Eye */}
        <div 
          className="relative w-12 h-12 lg:w-16 lg:h-16 pointer-events-auto cursor-pointer"
          onMouseEnter={() => setLeftEyeHovered(true)}
          onMouseLeave={() => setLeftEyeHovered(false)}
        >
          {/* Cute eyelashes */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 flex gap-0.5">
            <div className="w-0.5 h-1.5 bg-foreground/30 rounded-full" />
            <div className="w-0.5 h-2 bg-foreground/30 rounded-full" />
            <div className="w-0.5 h-1.5 bg-foreground/30 rounded-full" />
          </div>
          
          {/* Soft eye socket */}
          <div className="absolute inset-0 rounded-full bg-linear-to-b from-pink-200/20 via-purple-200/10 to-transparent border-2 border-pink-300/30" />
          
          {/* Upper eyelid - cute curved */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-1/2 rounded-t-full bg-pink-200/20"
            animate={{
              scaleY: isBlinking ? 1 : 0,
            }}
            transition={{
              duration: 0.15,
              ease: "easeInOut",
            }}
          />
          
          {/* Big cute eye white */}
          <motion.div
            className="absolute inset-[3px] rounded-full bg-white border-2 border-pink-200/40 overflow-hidden"
            style={{
              x: leftEyeXSpring,
              y: leftEyeYSpring,
            }}
            animate={{
              scaleY: isBlinking ? 0.05 : leftEyeHovered ? 0.3 : isSad ? 0.85 : 1,
              scale: isExcited ? 1.2 : isSad ? 0.95 : 1,
            }}
            transition={{
              duration: 0.15,
              ease: "easeInOut",
            }}
          >
            {/* Watery/glossy overlay when sad */}
            <motion.div
              className="absolute inset-0 rounded-full bg-linear-to-b from-blue-200/20 to-transparent pointer-events-none"
              animate={{
                opacity: isSad ? 0.6 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
            {/* Big cute iris - pastel colors */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-8 h-8 lg:w-10 lg:h-10 rounded-full -translate-x-1/2 -translate-y-1/2 overflow-hidden"
              style={{
                x: useTransform(leftEyeXSpring, (val: number) => val * 0.25),
                y: useTransform(leftEyeYSpring, (val: number) => (isSad ? 3 : val * 0.25)),
              }}
              animate={{
                scale: isExcited ? 1.25 : isSad ? 0.9 : 1,
              }}
              transition={{
                duration: 0.2,
                ease: "easeOut",
              }}
            >
              {/* Soft pastel iris gradient */}
              <div className="absolute inset-0 bg-linear-to-br from-pink-300/70 via-purple-300/60 to-blue-300/70 rounded-full" />
              {/* Soft iris highlight */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_35%,rgba(255,255,255,0.5),transparent_60%)] rounded-full" />
            </motion.div>
            
            {/* Big cute pupil - anime style */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-4 h-4 lg:w-5 lg:h-5 rounded-full bg-foreground/90 -translate-x-1/2 -translate-y-1/2"
              style={{
                x: useTransform(leftEyeXSpring, (val: number) => val * 0.35),
                y: useTransform(leftEyeYSpring, (val: number) => (isSad ? 4 : val * 0.35)),
              }}
              animate={{
                scale: isExcited ? 1.3 : isSad ? 0.85 : 1,
              }}
              transition={{
                duration: 0.2,
                ease: "easeOut",
              }}
            />
            
            {/* Big cute highlight - sparkle effect */}
            <motion.div
              className="absolute top-1/4 left-1/3 w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-white -translate-x-1/2 -translate-y-1/2"
              style={{
                x: useTransform(leftEyeXSpring, (val: number) => val * 0.15),
                y: useTransform(leftEyeYSpring, (val: number) => val * 0.15),
              }}
              animate={{
                opacity: isSad ? 0 : 1,
                scale: isSad ? 0.5 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
            {/* Secondary sparkle */}
            <motion.div
              className="absolute top-1/3 right-1/4 w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-white/70 -translate-x-1/2 -translate-y-1/2"
              style={{
                x: useTransform(leftEyeXSpring, (val: number) => val * 0.1),
                y: useTransform(leftEyeYSpring, (val: number) => val * 0.1),
              }}
              animate={{
                opacity: isSad ? 0 : 1,
                scale: isSad ? 0.5 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
          
          {/* Tears when sad */}
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: 0 }}
            animate={{
              opacity: isSad ? 1 : 0,
              y: isSad ? 4 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Tear drop 1 - left */}
            <motion.div
              className="absolute w-1.5 h-3 lg:w-2 lg:h-4 rounded-b-full bg-linear-to-b from-blue-200/80 to-blue-400/60 shadow-sm"
              style={{ left: '-5px', top: '2px' }}
              animate={{
                y: isSad ? [0, 3, 0] : 0,
                scale: isSad ? [1, 1.1, 1] : 1,
              }}
              transition={{
                duration: 1.8,
                repeat: isSad ? Infinity : 0,
                ease: "easeInOut",
              }}
            />
            {/* Tear drop 2 - right */}
            <motion.div
              className="absolute w-1.5 h-3 lg:w-2 lg:h-4 rounded-b-full bg-linear-to-b from-blue-200/80 to-blue-400/60 shadow-sm"
              style={{ right: '-5px', top: '2px' }}
              animate={{
                y: isSad ? [0, 3, 0] : 0,
                scale: isSad ? [1, 1.1, 1] : 1,
              }}
              transition={{
                duration: 1.8,
                repeat: isSad ? Infinity : 0,
                ease: "easeInOut",
                delay: 0.4,
              }}
            />
            {/* Watery shine effect */}
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-1 lg:w-1 lg:h-1.5 bg-white/50 rounded-full blur-[1px]"
              animate={{
                opacity: isSad ? [0.3, 0.7, 0.3] : 0,
              }}
              transition={{
                duration: 1.5,
                repeat: isSad ? Infinity : 0,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>

        {/* Right Eye */}
        <div 
          className="relative w-12 h-12 lg:w-16 lg:h-16 pointer-events-auto cursor-pointer"
          onMouseEnter={() => setRightEyeHovered(true)}
          onMouseLeave={() => setRightEyeHovered(false)}
        >
          {/* Cute eyelashes */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 flex gap-0.5">
            <div className="w-0.5 h-1.5 bg-foreground/30 rounded-full" />
            <div className="w-0.5 h-2 bg-foreground/30 rounded-full" />
            <div className="w-0.5 h-1.5 bg-foreground/30 rounded-full" />
          </div>
          
          {/* Soft eye socket */}
          <div className="absolute inset-0 rounded-full bg-linear-to-b from-pink-200/20 via-purple-200/10 to-transparent border-2 border-pink-300/30" />
          
          {/* Upper eyelid - cute curved */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-1/2 rounded-t-full bg-pink-200/20"
            animate={{
              scaleY: isBlinking ? 1 : 0,
            }}
            transition={{
              duration: 0.15,
              ease: "easeInOut",
            }}
          />
          
          {/* Big cute eye white */}
          <motion.div
            className="absolute inset-[3px] rounded-full bg-white border-2 border-pink-200/40 overflow-hidden"
            style={{
              x: rightEyeXSpring,
              y: rightEyeYSpring,
            }}
            animate={{
              scaleY: isBlinking ? 0.05 : rightEyeHovered ? 0.3 : isSad ? 0.85 : 1,
              scale: isExcited ? 1.2 : isSad ? 0.95 : 1,
            }}
            transition={{
              duration: 0.15,
              ease: "easeInOut",
            }}
          >
            {/* Watery/glossy overlay when sad */}
            <motion.div
              className="absolute inset-0 rounded-full bg-linear-to-b from-blue-200/20 to-transparent pointer-events-none"
              animate={{
                opacity: isSad ? 0.6 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
            {/* Big cute iris - pastel colors */}
            <motion.div
                className="absolute top-1/2 left-1/2 w-8 h-8 lg:w-10 lg:h-10 rounded-full -translate-x-1/2 -translate-y-1/2 overflow-hidden"
              style={{
                x: useTransform(rightEyeXSpring, (val: number) => val * 0.25),
                y: useTransform(rightEyeYSpring, (val: number) => (isSad ? 3 : val * 0.25)),
              }}
              animate={{
                scale: isExcited ? 1.25 : isSad ? 0.9 : 1,
              }}
                transition={{
                  duration: 0.2,
                  ease: "easeOut",
                }}
              >
              {/* Soft pastel iris gradient */}
              <div className="absolute inset-0 bg-linear-to-br from-pink-300/70 via-purple-300/60 to-blue-300/70 rounded-full" />
              {/* Soft iris highlight */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_35%,rgba(255,255,255,0.5),transparent_60%)] rounded-full" />
            </motion.div>
            
            {/* Big cute pupil - anime style */}
            <motion.div
                className="absolute top-1/2 left-1/2 w-4 h-4 lg:w-5 lg:h-5 rounded-full bg-foreground/90 -translate-x-1/2 -translate-y-1/2"
              style={{
                x: useTransform(rightEyeXSpring, (val: number) => val * 0.35),
                y: useTransform(rightEyeYSpring, (val: number) => (isSad ? 4 : val * 0.35)),
              }}
              animate={{
                scale: isExcited ? 1.3 : isSad ? 0.85 : 1,
              }}
                transition={{
                  duration: 0.2,
                  ease: "easeOut",
                }}
            />
            
              {/* Big cute highlight - sparkle effect */}
              <motion.div
                className="absolute top-1/4 left-1/3 w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-white -translate-x-1/2 -translate-y-1/2"
                style={{
                  x: useTransform(rightEyeXSpring, (val: number) => val * 0.15),
                  y: useTransform(rightEyeYSpring, (val: number) => val * 0.15),
                }}
                animate={{
                  opacity: isSad ? 0 : 1,
                  scale: isSad ? 0.5 : 1,
                }}
                transition={{ duration: 0.3 }}
              />
              {/* Secondary sparkle */}
              <motion.div
                className="absolute top-1/3 right-1/4 w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-white/70 -translate-x-1/2 -translate-y-1/2"
                style={{
                  x: useTransform(rightEyeXSpring, (val: number) => val * 0.1),
                  y: useTransform(rightEyeYSpring, (val: number) => val * 0.1),
                }}
                animate={{
                  opacity: isSad ? 0 : 1,
                  scale: isSad ? 0.5 : 1,
                }}
                transition={{ duration: 0.3 }}
              />
          </motion.div>
          
          {/* Tears when sad */}
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: 0 }}
            animate={{
              opacity: isSad ? 1 : 0,
              y: isSad ? 4 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Tear drop 1 - left */}
            <motion.div
              className="absolute w-1.5 h-3 lg:w-2 lg:h-4 rounded-b-full bg-linear-to-b from-blue-200/80 to-blue-400/60 shadow-sm"
              style={{ left: '-5px', top: '2px' }}
              animate={{
                y: isSad ? [0, 3, 0] : 0,
                scale: isSad ? [1, 1.1, 1] : 1,
              }}
              transition={{
                duration: 1.8,
                repeat: isSad ? Infinity : 0,
                ease: "easeInOut",
              }}
            />
            {/* Tear drop 2 - right */}
            <motion.div
              className="absolute w-1.5 h-3 lg:w-2 lg:h-4 rounded-b-full bg-linear-to-b from-blue-200/80 to-blue-400/60 shadow-sm"
              style={{ right: '-5px', top: '2px' }}
              animate={{
                y: isSad ? [0, 3, 0] : 0,
                scale: isSad ? [1, 1.1, 1] : 1,
              }}
              transition={{
                duration: 1.8,
                repeat: isSad ? Infinity : 0,
                ease: "easeInOut",
                delay: 0.4,
              }}
            />
            {/* Watery shine effect */}
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-1 lg:w-1 lg:h-1.5 bg-white/50 rounded-full blur-[1px]"
              animate={{
                opacity: isSad ? [0.3, 0.7, 0.3] : 0,
              }}
              transition={{
                duration: 1.5,
                repeat: isSad ? Infinity : 0,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
