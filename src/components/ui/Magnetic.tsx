"use client"

import React, { useRef, useEffect } from "react"
import gsap from "gsap"

export function Magnetic({ children, strength = 0.5 }: { children: React.ReactNode; strength?: number }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const xTo = gsap.quickTo(el, "x", { duration: 1, ease: "elastic.out(1, 0.3)" })
    const yTo = gsap.quickTo(el, "y", { duration: 1, ease: "elastic.out(1, 0.3)" })

    const mouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { width, height, left, top } = el.getBoundingClientRect()
      const x = clientX - (left + width / 2)
      const y = clientY - (top + height / 2)
      xTo(x * strength)
      yTo(y * strength)
    }

    const mouseLeave = () => {
      xTo(0)
      yTo(0)
    }

    el.addEventListener("mousemove", mouseMove)
    el.addEventListener("mouseleave", mouseLeave)

    return () => {
      el.removeEventListener("mousemove", mouseMove)
      el.removeEventListener("mouseleave", mouseLeave)
    }
  }, [strength])

  return (
    <div ref={containerRef} className="inline-block">
      {children}
    </div>
  )
}
