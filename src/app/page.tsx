"use client"

import { useState } from "react"
import { SmoothScroll } from "@/components/SmoothScroll"
import { Navbar } from "@/components/portfolio/Navbar"
import { Hero } from "@/components/portfolio/Hero"
import { About } from "@/components/portfolio/About"
import { Skills } from "@/components/portfolio/Skills"
import { Projects } from "@/components/portfolio/Projects"
import { Process } from "@/components/portfolio/Process"
import { Experience } from "@/components/portfolio/Experience"
import { FAQ } from "@/components/portfolio/FAQ"
import { Contact } from "@/components/portfolio/Contact"
import { Preloader } from "@/components/portfolio/Preloader"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <SmoothScroll>
      <Preloader onComplete={() => setIsLoading(false)} />
      <main className={`relative min-h-screen text-foreground transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Navbar startAnimation={!isLoading} />
        <Hero startAnimation={!isLoading} />
        <About />
        <Projects />
        <Process />
        <Skills />
        <Experience />
        <FAQ />
        <Contact />
      </main>
    </SmoothScroll>
  )
}
