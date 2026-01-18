"use client"

import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react"
import { useState, useEffect } from "react"

export function Contact() {
  const [gmtTime, setGmtTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const gmtTimeString = now.toLocaleTimeString("en-GB", {
        timeZone: "UTC",
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
      setGmtTime(gmtTimeString)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000) // Update every second

    return () => clearInterval(interval)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

    return (
      <footer id="contact" className="py-24 px-6 lg:px-24 border-t border-foreground/5">
        <div className="mx-auto max-w-[1600px]">

          <div className="mb-32">
            <span className="mb-12 block text-[9px] font-bold uppercase tracking-[0.5em] text-muted-foreground">Section 05 / Finale</span>
            <h2 className="text-[clamp(3rem,12vw,14rem)] font-black uppercase leading-[0.85] tracking-tight">
              Initiate <br /> <span className="text-muted-foreground italic font-normal">The Dialogue.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-32 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <a 
                href="mailto:sahil26dec02@gmail.com" 
                className="group relative flex items-center justify-between border-b border-foreground/20 py-16 transition-all duration-700 hover:border-foreground"
                onMouseEnter={() => window.dispatchEvent(new CustomEvent("eye-excited-start"))}
                onMouseLeave={() => window.dispatchEvent(new CustomEvent("eye-excited-end"))}
              >
                <span className="text-2xl font-normal uppercase tracking-tight md:text-4xl lg:text-6xl group-hover:italic transition-all duration-700">
                  sahil26dec02@gmail.com
                </span>
                <div className="relative overflow-hidden hidden md:block">
                  <ArrowUpRight className="h-12 w-12 transition-transform duration-700 group-hover:translate-x-full group-hover:-translate-y-full" />
                  <ArrowUpRight className="absolute top-0 left-0 h-12 w-12 -translate-x-full translate-y-full transition-transform duration-700 group-hover:translate-x-0 group-hover:translate-y-0" />
                </div>
              </a>
              
              <div className="mt-24 flex flex-wrap gap-12">
                {[
                  { name: "LinkedIn", href: "https://www.linkedin.com/in/sahil-kashyap-0809a0135/" }
               
                ].map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    target="_blank" 
                    className="group relative text-[10px] font-bold uppercase tracking-[0.4em] text-foreground/60 hover:text-foreground transition-colors overflow-hidden"
                    onMouseEnter={() => window.dispatchEvent(new CustomEvent("eye-excited-start"))}
                    onMouseLeave={() => window.dispatchEvent(new CustomEvent("eye-excited-end"))}
                  >
                    <span className="inline-block transition-transform duration-500 group-hover:-translate-y-full">{link.name}</span>
                    <span className="absolute left-0 top-full inline-block transition-transform duration-500 group-hover:-translate-y-full text-foreground">{link.name}</span>
                  </a>
                ))}
              </div>
            </div>
          
          <div className="flex flex-col justify-end lg:col-span-4 lg:items-end">
            <button 
              onClick={scrollToTop}
              className="group relative flex h-40 w-40 items-center justify-center rounded-full border border-foreground/10 transition-all duration-700 hover:border-foreground"
            >
              <div className="absolute inset-0 bg-foreground scale-0 group-hover:scale-100 transition-transform duration-700 rounded-full" />
              <span className="relative z-10 text-[9px] font-black uppercase tracking-[0.3em] group-hover:text-background transition-colors duration-700">Back to Top</span>
            </button>
          </div>
        </div>

        <div className="mt-48 flex flex-col items-center justify-between gap-12 border-t border-foreground/5 pt-12 md:flex-row">
          <div className="text-[9px] font-bold uppercase tracking-[0.5em] text-muted-foreground">
            © {new Date().getFullYear()} Sahil Kashyap
          </div>
          <div className="flex flex-col md:flex-row gap-8 text-[9px] font-bold uppercase tracking-[0.5em] text-muted-foreground">
            <div className="flex gap-2">
              <span className="text-foreground/20">LOC</span>
              <span>28.4089° N, 77.0378° E</span>
            </div>
            <div className="flex gap-2">
              <span className="text-foreground/20">GMT</span>
              <span>{gmtTime || "--:--"}</span>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        h2 {
          font-family: 'Syne', sans-serif;
        }
      `}</style>
    </footer>
  )
}
