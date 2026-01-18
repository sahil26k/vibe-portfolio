"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { projects, Project } from "@/lib/projects"
import { ArrowUpRight, ExternalLink } from "lucide-react"

interface CardProps {
  project: Project
  index: number
  progress: any
  range: [number, number]
  targetScale: number
}

const Card = ({ project, index, progress, range, targetScale }: CardProps) => {
  const container = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  
  const scale = useTransform(progress, range, [1, targetScale])
  
  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0 px-4 lg:px-6">
      <motion.div 
        style={{ 
          scale,
          top: `calc(10vh + ${index * 35}px)`,
        }}
        className="relative h-[75vh] w-full max-w-7xl origin-top"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Main Card Container */}
        <div className="relative h-full w-full rounded-[2rem] lg:rounded-[3rem] overflow-hidden border border-white/[0.08] bg-[#0a0a0a]">
          
          {/* Background Image with Parallax */}
          <motion.div 
            className="absolute inset-0"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a]/50" />
          </motion.div>

          {/* Floating Tech Pills - Top Right */}
          <div className="absolute top-6 right-6 lg:top-10 lg:right-10 z-20">
            <div className="flex flex-wrap gap-2 justify-end max-w-[200px]">
              {project.details.tech.slice(0, 3).map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white/70"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Project Number - Giant Watermark */}
          <div className="absolute -bottom-10 -right-4 lg:-bottom-16 lg:-right-8 text-[20rem] lg:text-[30rem] font-black leading-none select-none pointer-events-none syne-font text-white/[0.02]">
            {project.id}
          </div>

          {/* Content Grid */}
          <div className="relative z-10 h-full flex flex-col justify-end p-6 lg:p-12">
            
            {/* Category Tag */}
            <motion.div 
              className="mb-6 flex items-center gap-3"
              animate={{ x: isHovered ? 10 : 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="w-8 h-[1px] bg-white/30" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/50">
                {project.category}
              </span>
            </motion.div>

            {/* Title with Reveal Animation */}
            <div className="overflow-hidden mb-4">
              <motion.h3 
                className="text-5xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.85] syne-font text-white"
                animate={{ y: isHovered ? -5 : 0 }}
                transition={{ duration: 0.4 }}
              >
                {project.title}
              </motion.h3>
            </div>

            {/* Description */}
            <motion.p 
              className="text-white/60 text-base lg:text-lg leading-relaxed max-w-xl mb-8"
              animate={{ opacity: isHovered ? 1 : 0.7 }}
              transition={{ duration: 0.4 }}
            >
              {project.description}
            </motion.p>

            {/* Bottom Row - Stats & CTA */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              
              {/* Quick Stats */}
              <div className="flex gap-8 lg:gap-12">
                <div className="group">
                  <span className="block text-[10px] uppercase tracking-widest text-white/40 mb-1">Role</span>
                  <span className="text-sm lg:text-base font-medium text-white/80">{project.details.role}</span>
                </div>
                <div className="group">
                  <span className="block text-[10px] uppercase tracking-widest text-white/40 mb-1">Timeline</span>
                  <span className="text-sm lg:text-base font-medium text-white/80">{project.details.timeline}</span>
                </div>
              
              </div>

              {/* CTA Button */}
              <Link 
                href={`/case-study/${project.slug}`}
                className="group relative w-fit"
                style={{ position: 'relative', top: '-400px' }}
              >
                <motion.div 
                  className="relative flex items-center gap-4 px-8 py-4 bg-white text-black rounded-full overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Button Background Animation */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-white via-gray-100 to-white"
                    animate={{ x: isHovered ? "100%" : "-100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  
                  <span className="relative z-10 text-[11px] font-bold uppercase tracking-[0.3em]">
                    View Case Study
                  </span>
                  <ArrowUpRight className="relative z-10 w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
                </motion.div>
              </Link>
            </div>
          </div>

          {/* Hover Border Glow */}
          <AnimatePresence>
            {isHovered && (
              <motion.div 
                className="absolute inset-0 rounded-[3rem] pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  background: `linear-gradient(135deg, ${project.color}40 0%, transparent 50%, ${project.color}20 100%)`,
                }}
              />
            )}
          </AnimatePresence>

          {/* Corner Decorations */}
          <div className="absolute top-6 left-6 lg:top-10 lg:left-10 w-12 h-12 lg:w-16 lg:h-16 border-l-2 border-t-2 border-white/10 rounded-tl-2xl" />
          <div className="absolute bottom-6 right-6 lg:bottom-10 lg:right-10 w-12 h-12 lg:w-16 lg:h-16 border-r-2 border-b-2 border-white/10 rounded-br-2xl" />
        </div>
      </motion.div>
    </div>
  )
}

export function Projects() {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  })

    return (
      <section id="projects" ref={container} className="relative">
      {/* Section Header */}
      <div className="h-[50vh] flex flex-col justify-center px-6 lg:px-24">
        <div className="max-w-5xl">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-bold uppercase tracking-[0.6em] text-muted-foreground mb-6 block"
          >
            Phase 02 / Curation
          </motion.span>
          
          <div className="overflow-hidden pb-2 lg:pb-4">
            <motion.h2 
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2rem,12vw,10rem)] font-black uppercase leading-[0.8] tracking-tight syne-font"
            >
              Curated
            </motion.h2>
          </div>
          <div className="overflow-hidden pb-2 lg:pb-4">
            <motion.h2 
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2rem,12vw,10rem)] font-light italic uppercase leading-[0.8] tracking-tight syne-font text-foreground/20"
            >
              Artifacts
            </motion.h2>
          </div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-muted-foreground font-light text-xl max-w-xl leading-relaxed"
          >
            A meticulous selection of architectural systems and digital ecosystems designed for performance.
          </motion.p>
        </div>
      </div>

      {/* Cards Container */}
      <div className="relative pb-[10vh]">
        {projects.map((project, i) => {
          const targetScale = 1 - ((projects.length - i) * 0.04)
          const start = i * 0.25
          const end = 1
          
          return (
            <Card 
              key={project.id} 
              index={i} 
              project={project} 
              progress={scrollYProgress} 
              range={[start, end]} 
              targetScale={targetScale}
            />
          )
        })}
      </div>
    </section>
  )
}
