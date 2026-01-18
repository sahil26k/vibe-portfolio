"use client"

import * as Accordion from "@radix-ui/react-accordion"
import { motion, AnimatePresence } from "framer-motion"
import { Plus } from "lucide-react"
import { useState } from "react"

const faqs = [
  {
    question: "What is your typical project timeline?",
    answer: "Most projects range from 4 to 8 weeks depending on complexity. Small brand identities might take less, while full-scale digital platforms require more intensive strategy and development cycles."
  },
  {
    question: "Do you offer post-launch support?",
    answer: "Yes, I provide dedicated support packages for maintenance, performance optimization, and incremental feature updates to ensure your digital asset stays ahead of the curve."
  },
  {
    question: "Can you work with existing brand guidelines?",
    answer: "Absolutely. I can either expand upon your current brand system or help you evolve it into a more robust digital-first identity while maintaining core brand equity."
  },
    {
      question: "How do we get started?",
      answer: "The process begins with a discovery call where we discuss your goals. Following that, I'll provide a detailed proposal and roadmap tailored to your specific needs."
    },
    {
      question: "What is your pricing model?",
      answer: "I primarily work on a project-based pricing model, which ensures transparency and alignment on deliverables. For ongoing partnerships, I also offer monthly retainer options."
    }
  ]

export function FAQ() {
  const [value, setValue] = useState<string | undefined>(undefined)

  return (
      <section className="py-24 px-6 lg:px-24 overflow-hidden" id="faq">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-5">
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-muted-foreground mb-4 block">Information</span>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] syne-font break-words">
              Curious <br />
              <span className="italic font-light">Minds</span>
            </h2>
            <p className="mt-8 text-foreground/70 font-medium max-w-xs leading-relaxed">
              Finding answers to common questions about collaboration, technical details, and the creative process.
            </p>
          </div>

          <div className="lg:col-span-7">
          <Accordion.Root
            type="single"
            collapsible
            value={value}
            onValueChange={setValue}
            className="w-full flex flex-col gap-4"
          >
            {faqs.map((faq, index) => (
              <Accordion.Item
                key={index}
                value={`item-${index}`}
                className="group border border-foreground/10 hover:border-foreground/20 transition-colors bg-foreground/[0.02]"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="w-full py-8 px-8 flex items-center justify-between text-left group-data-[state=open]:bg-foreground/[0.04] transition-colors">
                    <span className="text-lg md:text-xl font-bold tracking-tight pr-8">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: value === `item-${index}` ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: "circOut" }}
                      className="flex-shrink-0"
                    >
                      <Plus className="w-5 h-5 text-foreground/60" />
                    </motion.div>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <div className="px-8 pb-8 pt-0 text-foreground/80 font-normal leading-relaxed max-w-2xl text-lg">
                    {faq.answer}
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </div>

      <style jsx>{`
        .syne-font {
          font-family: 'Syne', sans-serif;
        }
      `}</style>
    </section>
  )
}
