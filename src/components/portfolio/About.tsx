"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const { scrollYProgress: textProgress } = useScroll({
    target: textRef,
    offset: ["start end", "center center"]
  })

  const scale = useTransform(scrollYProgress, [0, 0.3], [0.8, 1])
  const rotate = useTransform(scrollYProgress, [0, 0.3], [-3, 0])
  
  const word1X = useTransform(scrollYProgress, [0.1, 0.4], [-100, 0])
  const word2X = useTransform(scrollYProgress, [0.1, 0.4], [100, 0])
  const word3Y = useTransform(scrollYProgress, [0.15, 0.45], [80, 0])
  
  const lineScale = useTransform(scrollYProgress, [0.2, 0.5], [0, 1])
  
  const maskProgress = useTransform(textProgress, [0, 1], [0, 100])

  const stats = [
    { value: "01", label: "Performance First", desc: "Speed is a feature" },
    { value: "02", label: "Clean Architecture", desc: "Scalable by design" },
    { value: "03", label: "User Obsessed", desc: "Every detail matters" },
  ]

  return (
    <section id="approach" ref={sectionRef} className="relative z-10 py-24 lg:py-40 overflow-hidden">
      <motion.div 
        style={{ rotate: useTransform(scrollYProgress, [0, 1], [0, 180]) }}
        className="absolute top-20 right-[10%] w-32 h-32 border border-foreground/10 rounded-full"
      />
      <motion.div 
        style={{ rotate: useTransform(scrollYProgress, [0, 1], [0, -90]) }}
        className="absolute bottom-40 left-[5%] w-20 h-20 border border-foreground/5"
      />
      
      <div className="mx-auto max-w-[1600px] px-6 lg:px-24">
        <motion.div 
          style={{ scale, rotate }}
          className="mb-20 lg:mb-32"
        >
          <div className="overflow-hidden pb-2 lg:pb-4">
            <motion.div 
              style={{ x: word1X }}
              className="text-[clamp(3rem,15vw,14rem)] font-black uppercase leading-[0.8] tracking-tighter syne-font"
            >
              Build
            </motion.div>
          </div>
          <div className="overflow-hidden flex items-center gap-4 lg:gap-8">
            <motion.div 
              style={{ x: word2X }}
              className="text-[clamp(3rem,15vw,14rem)] font-black uppercase leading-[0.8] tracking-tighter syne-font text-foreground/20"
            >
              Break
            </motion.div>
            <motion.div 
              style={{ scaleX: lineScale }}
              className="h-[3px] lg:h-[6px] bg-foreground flex-1 origin-left"
            />
          </div>
          <div className="overflow-hidden pb-2 lg:pb-4">
            <motion.div 
              style={{ y: word3Y }}
              className="text-[clamp(3rem,15vw,14rem)] font-black uppercase leading-[0.8] tracking-tighter syne-font italic"
            >
              Refine
            </motion.div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div ref={textRef} className="relative">
            <motion.p 
              className="text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed"
              style={{
                backgroundImage: "linear-gradient(90deg, oklch(0.35 0.02 45) 50%, oklch(0.35 0.02 45 / 0.15) 50%)",
                backgroundSize: "200% 100%",
                backgroundPositionX: useTransform(maskProgress, (v) => `${100 - v}%`),
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              I don't just write code—I architect experiences. Every pixel choreographed, every interaction intentional. The best technology disappears into pure function.
            </motion.p>
            
            <motion.div 
              style={{ scaleY: useTransform(scrollYProgress, [0.3, 0.5], [0, 1]) }}
              className="absolute -left-4 lg:-left-8 top-0 bottom-0 w-[2px] bg-foreground/30 origin-top"
            />
          </div>

          <div className="flex flex-col gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-end justify-between border-b border-foreground/10 pb-6 group"
              >
                <span className="text-[clamp(3rem,8vw,6rem)] font-black leading-none syne-font group-hover:text-foreground/60 transition-colors duration-500">
                  {stat.value}
                </span>
                <div className="flex flex-col items-end text-right">
                  <span className="text-sm lg:text-base font-bold uppercase tracking-wider text-foreground mb-1">
                    {stat.label}
                  </span>
                  <span className="text-xs text-foreground/50">
                    {stat.desc}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
