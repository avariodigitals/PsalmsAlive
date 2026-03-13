'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { SectionLabel } from '@/components/ui/SectionLabel'

export function CTASection() {
  return (
    <section className="bg-gradient-to-br from-navy via-[#0f2444] to-[#1a3358] py-28 relative overflow-hidden">
      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,165,76,0.1)_0%,transparent_65%)] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <SectionLabel className="text-center block mb-4">Begin Today</SectionLabel>
          <h2
            className="font-playfair font-bold text-cream leading-snug mb-5"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}
          >
            Walk the{' '}
            <em className="italic text-gold">Journey</em>
          </h2>
          <p className="font-lato text-cream/60 text-base leading-relaxed mb-10 max-w-lg mx-auto">
            Watch how scripture comes alive through powerful storytelling.
            Every Psalm has a story. Every story has your name in it.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/episodes"
              className="font-cinzel text-[0.72rem] tracking-[0.14em] uppercase bg-gold text-navy px-8 py-4 hover:bg-gold-light transition-all duration-300 active:scale-95 shadow-md"
            >
              Start Watching
            </Link>
            <Link
              href="/contact"
              className="font-cinzel text-[0.72rem] tracking-[0.14em] uppercase border border-cream/30 text-cream px-8 py-4 hover:border-gold hover:text-gold transition-all duration-300"
            >
              Get in Touch
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
