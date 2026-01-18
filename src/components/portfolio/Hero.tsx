"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import SplitType from "split-type"
import { motion, useScroll, useTransform } from "framer-motion"
import { AmbientCanvas } from "./AmbientCanvas"

export function Hero({ startAnimation }: { startAnimation?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const knotRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  
  const y1 = useTransform(scrollY, [0, 500], [0, -100])
  const y2 = useTransform(scrollY, [0, 500], [0, -200])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  useEffect(() => {
    if (!startAnimation) return

    let titleSplit: SplitType | null = null

    const ctx = gsap.context(() => {
      if (!titleRef.current) return

      titleSplit = new SplitType(titleRef.current, { types: "chars" })

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } })

      tl.set(containerRef.current, { opacity: 1 })
      
      tl.from(titleSplit.chars, {
        y: 100,
        opacity: 0,
        rotateX: -90,
        stagger: 0.02,
        duration: 1.5,
      }, 0.2)

      tl.from(".hero-reveal", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
      }, 0.8)

      // 360° rotation animation for glass knot - creates fake 3D rotation effect
      if (knotRef.current) {
        gsap.to(knotRef.current, {
          rotate: 360,
          duration: 20,
          ease: "none",
          repeat: -1,
        })
      }
    }, containerRef)

    return () => {
      ctx.revert()
      titleSplit?.revert()
    }
  }, [startAnimation])

  return (
    <section 
      ref={containerRef} 
      className="relative flex min-h-screen w-full flex-col items-center justify-center px-6 pt-32 pb-24 opacity-0 lg:px-24 overflow-hidden"
    >
      
      <motion.div 
        style={{ opacity }}
        className="relative z-10 w-full max-w-[1600px] flex flex-col items-center"
      >
        <div className="flex flex-col items-center text-center">
            <motion.div 
              style={{ y: y1 }}
              className="mb-6 hero-reveal"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-muted-foreground">
                Architecting Digital Experiences • From Concept to Cloud • India
              </span>
            </motion.div>
            
            <div className="relative mb-12 inline-block">
              {/* Rotating glass knot background - creates 3D rotation illusion */}
              <div 
                ref={knotRef}
                className="absolute inset-0 pointer-events-none overflow-visible"
                style={{
                  backgroundImage: 'url(/glass-knot.png)',
                  backgroundSize: '80%',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  transformOrigin: 'center center',
                  width: '200%',
                  height: '200%',
                  left: '-50%',
                  top: '-35%',
                  opacity: 0.5,
                  mixBlendMode: 'screen',
                }}
              />
              <h1 
                ref={titleRef} 
                className="relative text-[clamp(4rem,15vw,14rem)] leading-[0.85] font-black uppercase tracking-[-0.05em] perspective-1000 text-foreground"
                style={{
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <span>Sahil</span> <br />
                <span className="italic font-normal text-muted-foreground">Kashyap</span>
              </h1>
            </div>


          <motion.div 
            style={{ y: y2 }}
            className="max-w-2xl hero-reveal"
          >
            <p className="text-lg md:text-xl text-foreground/80 font-normal leading-relaxed tracking-tight">
              Where <span className="text-foreground font-bold">aesthetic vision</span> meets <span className="text-foreground font-bold">technical precision</span>. Building end-to-end digital solutions that transform ideas into scalable, performant experiences. <span className="text-foreground font-bold">From concept to deployment, every detail matters</span>.
            </p>
          </motion.div>
          
          <div className="mt-16 flex flex-col items-center gap-6 hero-reveal">
            <button 
              onClick={() => {
                const element = document.getElementById("projects")
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" })
                }
              }}
              className="group relative px-10 py-4 border border-foreground/10 hover:border-foreground/40 transition-colors overflow-hidden"
            >
              <span className="relative z-10 text-[10px] font-bold uppercase tracking-[0.3em]">Explore Works</span>
              <motion.div 
                className="absolute inset-0 bg-foreground/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
              />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Atmospheric Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-px h-32 bg-linear-to-b from-transparent via-foreground to-transparent" />
        <div className="absolute bottom-1/4 right-1/4 w-px h-32 bg-linear-to-b from-transparent via-foreground to-transparent" />
      </div>
      
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-20">
        <div className="w-px h-12 bg-foreground animate-pulse" />
        <span className="text-[8px] uppercase tracking-[0.6em] font-medium">Scroll to Discover</span>
      </div>

      <style jsx>{`
        h1 {
          font-family: 'Syne', sans-serif;
        }
      `}</style>
    </section>
  )
}
