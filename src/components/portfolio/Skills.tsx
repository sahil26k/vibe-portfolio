"use client"

import React, { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const SKILLS = [
  // Languages
  { name: "JavaScript", category: "Languages" },
  { name: "TypeScript", category: "Languages" },
  { name: "Python", category: "Languages" },
  // Frontend
  { name: "React.js", category: "Frontend" },
  { name: "Gatsby", category: "Frontend" },
  { name: "PWA", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Framer Motion", category: "Frontend" },
  // Backend
  { name: "Node.js", category: "Backend" },
  { name: "Express.js", category: "Backend" },
  { name: "Fastify", category: "Backend" },
  { name: ".NET", category: "Backend" },
  { name: "Langchain", category: "Backend" },
  { name: "MCP", category: "Backend" },
  // Databases
  { name: "PostgreSQL", category: "Databases" },
  { name: "MongoDB", category: "Databases" },
  { name: "MySQL", category: "Databases" },
  { name: "SQL Server", category: "Databases" },
  { name: "Vector DB", category: "Databases" },
  // Cloud & DevOps
  { name: "AWS (EC2)", category: "Cloud" },
  { name: "Azure", category: "Cloud" },
  { name: "Docker", category: "DevOps" },
  { name: "Redis", category: "DevOps" },
  { name: "Linux", category: "DevOps" },
  // Tools
  { name: "Git", category: "Tools" },
  { name: "Postman", category: "Tools" },
  { name: "n8n", category: "Tools" },
  { name: "Termius", category: "Tools" },
]

// All rows have all skills - just different starting points for variety
const ROW1 = [...SKILLS]
const ROW2 = [...SKILLS]
const ROW3 = [...SKILLS]

export function Skills() {
  const containerRef = useRef<HTMLDivElement>(null)
  const slider1Ref = useRef<HTMLDivElement>(null)
  const slider2Ref = useRef<HTMLDivElement>(null)
  const slider3Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".skills-header", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1
      })

      // Row 1 - Moving Left (slower)
      if (slider1Ref.current) {
        const totalWidth = slider1Ref.current.scrollWidth / 2
        gsap.to(slider1Ref.current, {
          x: -totalWidth,
          duration: 50,
          ease: "none",
          repeat: -1,
        })
      }

      // Row 2 - Moving Right (faster)
      if (slider2Ref.current) {
        const totalWidth = slider2Ref.current.scrollWidth / 2
        gsap.fromTo(slider2Ref.current, 
          { x: -totalWidth },
          {
            x: 0,
            duration: 50,
            ease: "none",
            repeat: -1,
          }
        )
      }

      // Row 3 - Moving Left (medium speed)
      if (slider3Ref.current) {
        const totalWidth = slider3Ref.current.scrollWidth / 2
        gsap.to(slider3Ref.current, {
          x: -totalWidth,
          duration: 50,
          ease: "none",
          repeat: -1,
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative overflow-hidden">
      {/* Header */}
      <div className="mb-16 lg:mb-20 px-6 lg:px-24">
        <span className="skills-header text-[9px] font-bold uppercase tracking-[0.5em] text-muted-foreground mb-6 block">
          Section 03 / Arsenal
        </span>
        <h2 className="skills-header text-[clamp(2.5rem,8vw,6rem)] font-black uppercase leading-[0.85] tracking-tight syne-font">
          Tech Stack
        </h2>
      </div>

      {/* Row 1 - Moving Left */}
      <div className="relative mb-6 overflow-hidden">
        <div 
          ref={slider1Ref}
          className="flex gap-4 lg:gap-6"
          style={{ width: 'max-content' }}
        >
          {[...ROW1, ...ROW1].map((skill, index) => (
            <div
              key={`row1-${skill.name}-${index}`}
              className="skill-item group relative p-6 lg:p-8 border border-foreground/10 rounded-lg hover:border-foreground/30 transition-all duration-300 hover:bg-foreground/2 shrink-0 w-[200px] lg:w-[250px]"
            >
              <span className="text-[10px] uppercase tracking-widest text-foreground/40 mb-2 block">
                {skill.category}
              </span>
              <h3 className="text-lg lg:text-xl font-bold">
                {skill.name}
              </h3>
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-foreground group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 - Moving Right */}
      <div className="relative mb-6 overflow-hidden">
        <div 
          ref={slider2Ref}
          className="flex gap-4 lg:gap-6"
          style={{ width: 'max-content' }}
        >
          {[...ROW2, ...ROW2].map((skill, index) => (
            <div
              key={`row2-${skill.name}-${index}`}
              className="skill-item group relative p-6 lg:p-8 border border-foreground/10 rounded-lg hover:border-foreground/30 transition-all duration-300 hover:bg-foreground/2 shrink-0 w-[200px] lg:w-[250px]"
            >
              <span className="text-[10px] uppercase tracking-widest text-foreground/40 mb-2 block">
                {skill.category}
              </span>
              <h3 className="text-lg lg:text-xl font-bold">
                {skill.name}
              </h3>
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-foreground group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>

      {/* Row 3 - Moving Left */}
      <div className="relative overflow-hidden">
        <div 
          ref={slider3Ref}
          className="flex gap-4 lg:gap-6"
          style={{ width: 'max-content' }}
        >
          {[...ROW3, ...ROW3].map((skill, index) => (
            <div
              key={`row3-${skill.name}-${index}`}
              className="skill-item group relative p-6 lg:p-8 border border-foreground/10 rounded-lg hover:border-foreground/30 transition-all duration-300 hover:bg-foreground/2 shrink-0 w-[200px] lg:w-[250px]"
            >
              <span className="text-[10px] uppercase tracking-widest text-foreground/40 mb-2 block">
                {skill.category}
              </span>
              <h3 className="text-lg lg:text-xl font-bold">
                {skill.name}
              </h3>
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-foreground group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
