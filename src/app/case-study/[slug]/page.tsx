"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { projects } from "@/lib/projects";
import { SmoothScroll } from "@/components/SmoothScroll";

export default function CaseStudyPage() {
  const params = useParams();
  const router = useRouter();
  const slug = typeof params.slug === 'string' ? params.slug : params.slug?.[0];
  const project = projects.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Project not found</h1>
        <Link href="/" className="ml-4 underline">Go back home</Link>
      </div>);

  }

  return (
    <SmoothScroll>
      <main className="bg-background min-h-screen text-foreground selection:bg-white selection:text-black">
        {/* Navigation / Back Button */}
        <nav className="fixed top-0 left-0 w-full z-50 p-6 lg:p-12 flex justify-between items-center mix-blend-difference pointer-events-none">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => router.back()}
            className="group flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-white pointer-events-auto">

            <div className="w-8 h-[1px] bg-white group-hover:w-12 transition-all" />
            Back
          </motion.button>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-[10px] font-bold uppercase tracking-[0.4em] text-white">

            {project.id} / {projects.length.toString().padStart(2, '0')}
          </motion.div>
        </nav>

        {/* Hero Section */}
        <section className="relative h-[90vh] overflow-hidden">
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
            className="absolute inset-0">

            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              className="object-cover grayscale brightness-50" />

          </motion.div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          
          <div className="relative h-full container mx-auto px-6 lg:px-24 flex flex-col justify-end pb-24 lg:pb-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}>

              <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-muted-foreground mb-6 block">
                {project.category}
              </span>
              <h1 className="text-[clamp(2rem,8vw,6.5rem)] font-black uppercase leading-[0.85] tracking-tighter syne-font mb-8">
                {project.title.split(' ').map((word, i) =>
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                    className="inline-block mr-4 last:mr-0">

                    {word}
                  </motion.span>
                )}
              </h1>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="container mx-auto px-6 lg:px-24 py-24 lg:py-48">
          <div className="grid lg:grid-cols-12 gap-16">
            {/* Meta Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-4 space-y-12">

              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground mb-4">Role</h4>
                <p className="text-xl">{project.details.role}</p>
              </div>
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground mb-4">Timeline</h4>
                <p className="text-xl">{project.details.timeline}</p>
              </div>
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground mb-4">Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.details.tech.map((t) =>
                  <span key={t} className="px-4 py-1.5 rounded-full border border-white/10 text-xs font-medium uppercase tracking-wider bg-white/5">
                      {t}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Narrative */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-8 space-y-24">

              <div>
                <h3 className="text-3xl lg:text-5xl font-bold uppercase tracking-tight mb-8 syne-font">The Overview</h3>
                <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed font-light">
                  {project.details.overview}
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-xl font-bold uppercase tracking-[0.2em] mb-6 border-b border-white/10 pb-4">The Challenge</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.details.challenge}
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold uppercase tracking-[0.2em] mb-6 border-b border-white/10 pb-4">The Solution</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.details.solution}
                  </p>
                </div>
              </div>

              <div className="bg-white/5 rounded-[2rem] p-8 lg:p-16 border border-white/5">
                <h3 className="text-3xl lg:text-5xl font-bold uppercase tracking-tight mb-12 syne-font text-center">Key Results</h3>
                <div className="grid md:grid-cols-3 gap-8">
                  {project.details.results.map((result, i) =>
                  <div key={i} className="text-center space-y-4">
                      <div className="text-4xl lg:text-6xl font-black opacity-20 italic">0{i + 1}</div>
                      <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground px-4">
                        {result}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer Navigation */}
        <section className="border-t border-white/5">
          <Link
            href={`/case-study/${projects[(projects.indexOf(project) + 1) % projects.length].slug}`}
            className="group block py-32 lg:py-48 text-center">

            <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-muted-foreground mb-8 block">
              Next Project
            </span>
            <h2 className="text-[clamp(2rem,8vw,6.5rem)] font-black uppercase leading-[0.8] tracking-tighter syne-font group-hover:italic transition-all">
              {projects[(projects.indexOf(project) + 1) % projects.length].title}
            </h2>
          </Link>
        </section>

        <style jsx>{`
          .syne-font {
            font-family: 'Syne', sans-serif;
          }
        `}</style>
      </main>
    </SmoothScroll>);

}