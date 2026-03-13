'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GoldDivider } from '@/components/ui/GoldDivider'

export function VisionSection() {
  return (
    <section className="bg-cream py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — Decorative illustration panel */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-gradient-to-br from-navy via-[#122040] to-[#1a3560] flex items-center justify-center relative overflow-hidden">
              {/* Inner decorative border */}
              <div className="absolute inset-4 border border-gold/20" />
              {/* Radial light */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,165,76,0.08)_0%,transparent_65%)]" />
              {/* Open Bible SVG */}
              <div className="relative z-10 flex flex-col items-center">
                <svg
                  width="96"
                  height="96"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#C9A54C"
                  strokeWidth="1"
                  opacity="0.35"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
                <p className="font-cinzel text-gold/25 text-[0.6rem] tracking-[0.25em] uppercase mt-6">
                  Psalms Alive
                </p>
              </div>
            </div>

            {/* Offset accent block */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gold/10 border border-gold/20 hidden lg:block" />
          </motion.div>

          {/* Right — Text */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <SectionLabel className="text-gold">The Vision</SectionLabel>
            <h2
              className="font-playfair font-semibold text-navy leading-[1.2] mb-0"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Where Scripture{' '}
              <em className="italic text-gold">Meets Story</em>
            </h2>

            <GoldDivider />

            <p className="font-lato text-brown text-base leading-relaxed mb-5">
              The Psalms are filled with the deepest expressions of the human heart —
              joy, sorrow, faith, fear, gratitude, and hope. Written in moments of
              crisis, celebration, and longing, they speak a language every generation
              understands.
            </p>
            <p className="font-lato text-brown text-base leading-relaxed mb-8">
              Psalms Alive was created by Atley Adejola to help people experience
              these timeless words in a way that feels real and relatable. Through
              short visual stories and dramatic interpretations, each episode invites
              viewers to see how the message of the Psalms speaks to everyday life.
            </p>

            <Link
              href="/about"
              className="inline-flex font-cinzel text-[0.72rem] tracking-[0.14em] uppercase bg-navy text-cream px-7 py-3.5 hover:bg-navy/80 transition-all duration-300 active:scale-95"
            >
              Our Story
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
