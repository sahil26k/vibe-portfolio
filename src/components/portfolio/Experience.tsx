"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Badge } from "@/components/ui/badge"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const experience = [
  {
    id: "work",
    label: "Work",
    items: [
      {
        year: "2024",
        endYear: "Present",
        role: "Associate Software Developer",
        company: "Cloudzent Technology",
        location: "India",
        description: "Architecting enterprise-scale .NET solutions and high-performance MERN stack applications for global clients.",
        highlights: [
          "Led development of microservices architecture",
          "Reduced API response time by 40%",
          "Mentored junior developers"
        ],
        tags: ["MERN", "AWS", ".NET", "Microservices", "AI/ML"],
      },
    ]
  },
  {
    id: "education",
    label: "Education",
    items: [
      {
        year: "2020",
        endYear: "2024",
        role: "B.Tech Computer Science",
        company: "Parul Institute",
        location: "Gujarat, India",
        description: "Deep-diving into algorithms, data structures, and modern software engineering paradigms.",
        highlights: [
          "CGPA: 8.5/10",
          "Published research paper on Robotics",
          "Led technical club"
        ],
        tags: ["DSA", "Full-Stack", "Research"],
      },
      {
        year: "2019",
        endYear: "2020",
        role: "Senior Secondary (XII)",
        company: "Kendriya Vidyalaya",
        location: "India",
        description: "Foundation in science and mathematics, developing an early passion for logic and problem-solving.",
        highlights: [
          "Science stream with Computer Science",
          "92% aggregate score",
          "School tech lead"
        ],
        tags: ["Mathematics", "Physics", "Foundation"],
      },
    ]
  },
]

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState("work")
  const [expandedItem, setExpandedItem] = useState<number | null>(0)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      gsap.from(".exp-animate", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        ease: "power3.out"
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    setExpandedItem(0)
  }, [activeTab])

  const currentCategory = experience.find(e => e.id === activeTab)

  return (
    <section id="archive" ref={containerRef} className="relative py-32 lg:py-48 px-6 lg:px-24">
      {/* Header */}
      <div className="mb-16 lg:mb-24">
        <span className="exp-animate text-[9px] font-bold uppercase tracking-[0.5em] text-muted-foreground mb-6 block">
          Section 04 / Chronicle
        </span>
        <h2 className="exp-animate text-[clamp(2.5rem,8vw,6rem)] font-black uppercase leading-[0.85] tracking-tight syne-font mb-8">
          Journey
        </h2>
      </div>

      {/* Tabs Navigation */}
      <div className="exp-animate mb-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-transparent border border-foreground/10 p-1 h-auto gap-1">
            {experience.map((cat) => (
              <TabsTrigger
                key={cat.id}
                value={cat.id}
                className="data-[state=active]:bg-foreground data-[state=active]:text-background px-6 py-3 text-sm font-bold uppercase tracking-wider rounded-md transition-all duration-300"
              >
                {cat.label}
                <Badge variant="outline" className="ml-2 text-[10px] px-1.5 py-0 data-[state=active]:border-background/30">
                  {cat.items.length}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>

          {experience.map((cat) => (
            <TabsContent key={cat.id} value={cat.id} className="mt-12">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr,2fr] gap-8 lg:gap-16">
                {/* Left: Timeline Navigation */}
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-px bg-foreground/10" />
                  
                  <div className="space-y-2">
                    {cat.items.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => setExpandedItem(index)}
                        className={`relative w-full text-left pl-10 pr-4 py-4 rounded-lg transition-all duration-500 group ${
                          expandedItem === index 
                            ? "bg-foreground text-background" 
                            : "hover:bg-foreground/5"
                        }`}
                      >
                        {/* Timeline dot */}
                        <div className={`absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                          expandedItem === index 
                            ? "bg-background border-background scale-125" 
                            : "bg-background border-foreground/30 group-hover:border-foreground"
                        }`} />
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <span className={`text-xs font-mono ${expandedItem === index ? "text-background/60" : "text-foreground/40"}`}>
                              {item.year} — {item.endYear}
                            </span>
                            <h4 className="font-bold text-base mt-0.5">{item.role}</h4>
                          </div>
                          <svg 
                            className={`w-4 h-4 transition-transform duration-300 ${expandedItem === index ? "rotate-0" : "-rotate-90"}`}
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right: Expanded Content */}
                <div className="relative min-h-[600px]">
                  {cat.items.map((item, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-all duration-500 ${
                        expandedItem === index 
                          ? "opacity-100 translate-y-0 pointer-events-auto" 
                          : "opacity-0 translate-y-8 pointer-events-none"
                      }`}
                    >
                      <div className="h-full border border-foreground/10 rounded-2xl p-8 lg:p-12 bg-foreground/[0.02]">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-8">
                          <div>
                            <HoverCard>
                              <HoverCardTrigger asChild>
                                <h3 className="text-2xl lg:text-3xl font-bold cursor-help underline decoration-foreground/20 underline-offset-4">
                                  {item.company}
                                </h3>
                              </HoverCardTrigger>
                              <HoverCardContent className="w-80">
                                <div className="space-y-2">
                                  <h4 className="font-bold">{item.company}</h4>
                                  <p className="text-sm text-muted-foreground">{item.location}</p>
                                  <p className="text-sm">{item.description}</p>
                                </div>
                              </HoverCardContent>
                            </HoverCard>
                            <p className="text-foreground/50 mt-1">{item.location}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-4xl lg:text-5xl font-black syne-font">{item.year}</span>
                            <p className="text-xs text-foreground/40 uppercase tracking-wider mt-1">{item.endYear}</p>
                          </div>
                        </div>

                        {/* Role */}
                        <div className="mb-8">
                          <span className="text-xs uppercase tracking-widest text-foreground/40 mb-2 block">Position</span>
                          <p className="text-xl lg:text-2xl font-semibold">{item.role}</p>
                        </div>

                        {/* Description */}
                        <p className="text-foreground/60 leading-relaxed mb-8 max-w-xl">
                          {item.description}
                        </p>

                        {/* Highlights */}
                        <div className="mb-8">
                          <span className="text-xs uppercase tracking-widest text-foreground/40 mb-4 block">Key Highlights</span>
                          <ul className="space-y-3">
                            {item.highlights.map((highlight, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 flex-shrink-0" />
                                <span className="text-foreground/80">{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {item.tags.map((tag) => (
                            <Badge 
                              key={tag}
                              variant="outline"
                              className="px-3 py-1 text-xs font-medium uppercase tracking-wider"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>


    </section>
  )
}
