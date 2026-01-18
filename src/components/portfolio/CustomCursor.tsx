"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

  export function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null)
    const ringRef = useRef<HTMLDivElement>(null)
    const [isActive, setIsActive] = useState(false)


  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // Initialize GSAP quickSetters for high performance
    const dotX = gsap.quickSetter(dot, "x", "px")
    const dotY = gsap.quickSetter(dot, "y", "px")
    const ringX = gsap.quickSetter(ring, "x", "px")
    const ringY = gsap.quickSetter(ring, "y", "px")

    const mouse = { x: 0, y: 0 }
    const pos = { x: 0, y: 0 }
    const ringPos = { x: 0, y: 0 }

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      
      // Move dot immediately
      dotX(mouse.x)
      dotY(mouse.y)
      
      if (!isActive) {
        setIsActive(true)
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 })
      }
    }

    // Smooth trailing for the ring
    const ticker = () => {
      const dt = 1.0 - Math.pow(1.0 - 0.15, gsap.ticker.deltaRatio())
      
      ringPos.x += (mouse.x - ringPos.x) * dt
      ringPos.y += (mouse.y - ringPos.y) * dt
      
      ringX(ringPos.x)
      ringY(ringPos.y)
    }

    gsap.ticker.add(ticker)
    window.addEventListener("mousemove", onMouseMove)

    const onMouseEnterInteractive = (e: MouseEvent) => {
      gsap.to(ring, {
        scale: 2.5,
        backgroundColor: "white",
        mixBlendMode: "difference",
        duration: 0.4,
        ease: "power3.out",
      })
      gsap.to(dot, {
        scale: 0,
        duration: 0.2,
      })
    }

    const onMouseLeaveInteractive = () => {
      gsap.to(ring, {
        scale: 1,
        backgroundColor: "transparent",
        mixBlendMode: "difference",
        duration: 0.4,
        ease: "power3.out",
      })
      gsap.to(dot, {
        scale: 1,
        duration: 0.2,
      })
    }

    const refreshInteractions = () => {
      const interactives = document.querySelectorAll('a, button, .interactive')
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnterInteractive as any)
        el.addEventListener("mouseleave", onMouseLeaveInteractive as any)
      })
    }

    refreshInteractions()
    
    const observer = new MutationObserver(refreshInteractions)
    observer.observe(document.body, { childList: true, subtree: true })

    // Hide default cursor
    document.body.style.cursor = "none"
    const style = document.createElement("style")
    style.id = "custom-cursor-style"
    style.innerHTML = `
      a, button, .interactive {
        cursor: none !important;
      }
    `
    document.head.appendChild(style)

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      gsap.ticker.remove(ticker)
      observer.disconnect()
      document.body.style.cursor = "auto"
      const existingStyle = document.getElementById("custom-cursor-style")
      if (existingStyle && existingStyle.parentNode) {
        existingStyle.parentNode.removeChild(existingStyle)
      }
    }
  }, [])

  return (
    <>
      {/* Outer Ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[10000] flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-foreground/30 mix-blend-difference opacity-0"
        style={{ willChange: "transform, scale" }}
      />

      {/* Inner Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[10001] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent opacity-0"
        style={{ willChange: "transform" }}
      />
    </>
  )
}
