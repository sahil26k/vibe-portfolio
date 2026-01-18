"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function Navbar({ startAnimation }: { startAnimation?: boolean }) {
  const [scrolled, setScrolled] = useState(false)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <nav className={`fixed top-0 z-50 w-full px-6 py-10 transition-all duration-700 ease-in-out lg:px-12 ${scrolled ? "py-6 bg-background/80 backdrop-blur-xl" : "py-10"}`}>
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={startAnimation ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="mx-auto flex max-w-[1800px] items-center justify-between"
            >
            <div 
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group flex flex-col cursor-pointer"
            >
                <span className="text-sm font-black uppercase tracking-[0.3em] leading-none text-foreground group-hover:text-foreground/70 transition-colors">
                  Sahil <span className="italic font-normal text-muted-foreground">Kashyap</span>
                </span>
                <div className="h-px w-0 bg-foreground group-hover:w-full transition-all duration-500 mt-1" />
              </div>
              
              <div className="flex items-center gap-12">
                <button 
                  onClick={() => scrollToSection("contact")}
                  className="group relative overflow-hidden text-[11px] font-bold uppercase tracking-[0.4em] text-foreground/60 hover:text-foreground transition-colors"
                >
                  <span className="inline-block transition-transform duration-500 group-hover:-translate-y-full">Approach</span>
                  <span className="absolute left-0 top-full inline-block transition-transform duration-500 group-hover:-translate-y-full text-foreground">Approach</span>
                </button>
              </div>
          </motion.div>
          
          <motion.div 
            className="absolute bottom-0 left-0 h-px bg-foreground/10"
            style={{
              width: "100%",
              scaleX: 0,
              transformOrigin: "0%",
            }}
            animate={{ scaleX: scrolled ? 1 : 0 }}
          />
      </nav>
    </>
  )
}
