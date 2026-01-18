"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

interface PreloaderProps {
  onComplete?: () => void
}

export function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete()
      },
    })

    // Brief hold before curtain reveal
    tl.to({}, { duration: 0.5 })

    tl.to(".preloader-curtain", {
      scaleY: 0,
      duration: 1.4,
      stagger: 0.1,
      transformOrigin: "top",
      ease: "expo.inOut",
    })

    tl.to(containerRef.current, {
      display: "none",
      duration: 0,
    })

    return () => {
      tl.kill()
    }
  }, [onComplete])

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-transparent pointer-events-auto overflow-hidden"
    >
      <div className="absolute inset-0 flex">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className="preloader-curtain relative h-full flex-1 bg-foreground"
          />
        ))}
      </div>
    </div>
  )
}
