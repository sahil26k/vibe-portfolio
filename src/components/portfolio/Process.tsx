"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const steps = [
  {
    number: "01",
    title: "Planning & Architecture",
    description: "Analyzing requirements, designing system architecture, and defining the technical roadmap for scalable solutions.",
    details: ["Requirements Analysis", "System Architecture", "Tech Stack Selection", "Database Design"],
    color: "bg-blue-500"
  },
  {
    number: "02",
    title: "Design & Prototyping",
    description: "Creating intuitive user interfaces, wireframes, and interactive prototypes that balance aesthetics with functionality.",
    details: ["UI/UX Design", "Wireframing", "Prototyping", "Design Systems"],
    color: "bg-purple-500"
  },
  {
    number: "03",
    title: "Frontend Development",
    description: "Building responsive, performant client-side applications with modern frameworks and best practices.",
    details: ["React/Next.js", "State Management", "API Integration", "Responsive Design"],
    color: "bg-emerald-500"
  },
  {
    number: "04",
    title: "Backend Development",
    description: "Developing robust server-side logic, RESTful APIs, database schemas, and business logic implementation.",
    details: ["API Development", "Database Design", "Authentication", "Server Logic"],
    color: "bg-orange-500"
  },
  {
    number: "05",
    title: "Integration & Testing",
    description: "Connecting frontend and backend systems, implementing comprehensive testing, and ensuring seamless functionality.",
    details: ["API Integration", "Unit Testing", "Integration Testing", "Bug Fixing"],
    color: "bg-rose-500"
  },
  {
    number: "06",
    title: "Deployment & DevOps",
    description: "Setting up CI/CD pipelines, deploying to cloud infrastructure, and implementing monitoring and maintenance.",
    details: ["CI/CD Setup", "Cloud Deployment", "Monitoring", "Performance Optimization"],
    color: "bg-indigo-500"
  }
]

export function Process() {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
  })

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"])

    return (
      <section id="process" ref={targetRef} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="absolute top-24 left-6 lg:left-24 z-10">
          <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-muted-foreground mb-4 block">Workflow</span>
          <h2 className="text-[clamp(2rem,8vw,5rem)] font-black uppercase tracking-tighter syne-font leading-[0.9]">
            The <span className="italic font-light text-muted-foreground/50">Delivery</span> <br />
            Architect
          </h2>
        </div>

        <motion.div style={{ x }} className="flex gap-12 px-6 lg:px-24">
          {/* Spacer to start cards after the title */}
          <div className="shrink-0 w-[40vw] lg:w-[30vw]" />
          
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative h-[450px] w-[350px] md:w-[450px] shrink-0 overflow-hidden bg-foreground/3 border border-foreground/5 p-8 md:p-12 transition-colors hover:bg-foreground/5"
            >
              <div className="absolute top-0 right-0 p-8">
                <span className="text-6xl md:text-8xl font-black opacity-5 group-hover:opacity-10 transition-opacity">
                  {step.number}
                </span>
              </div>
              
              <div className="relative h-full flex flex-col justify-between">
                <div>
                  <div className={`w-12 h-1 mb-8 ${step.color} opacity-50`} />
                  <h3 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter mb-6 syne-font leading-none">
                    {step.title}
                  </h3>
                  <p className="text-foreground/80 font-normal text-lg leading-relaxed mb-8">
                    {step.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {step.details.map((detail, i) => (
                    <span
                      key={i}
                      className="text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-foreground/20 bg-background/50 backdrop-blur-sm font-medium"
                    >
                      {detail}
                    </span>
                  ))}
                </div>
              </div>

              {/* Decorative corner */}
              <div className="absolute bottom-0 right-0 w-12 h-12 border-r border-b border-foreground/10 group-hover:border-foreground/30 transition-colors" />
            </div>
          ))}
          
          {/* Final Spacer */}
          <div className="shrink-0 w-[20vw]" />
        </motion.div>
      </div>

      <style jsx>{`
        .syne-font {
          font-family: 'Syne', sans-serif;
        }
      `}</style>
    </section>
  )
}
