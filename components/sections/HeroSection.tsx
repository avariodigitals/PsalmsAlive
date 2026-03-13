'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { PlayButton } from '@/components/ui/PlayButton'
import type { Episode } from '@/types'

interface HeroSectionProps {
  featuredEpisode: Episode
}

export function HeroSection({ featuredEpisode }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center bg-navy overflow-hidden pt-[70px]">
      {/* Background layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/95 to-[#1a3358]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(201,165,76,0.06)_0%,transparent_60%)]" />
        {/* Subtle dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'radial-gradient(circle, #C9A54C 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — text */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-cinzel text-[0.68rem] tracking-[0.3em] uppercase text-gold flex items-center gap-3 mb-6"
            >
              <span className="w-8 h-px bg-gold inline-block" />
              A Faith Storytelling Platform
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-playfair font-bold text-cream leading-[1.06] mb-6"
              style={{ fontSize: 'clamp(3.2rem, 7vw, 5.5rem)' }}
            >
              Psalms
              <br />
              <em className="text-gold italic">Alive</em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="font-lato text-cream/65 text-lg leading-relaxed max-w-md mb-10"
            >
              Experience the Psalms through powerful visual storytelling that
              connects scripture with everyday life. Watch, reflect, and grow.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/episodes"
                className="font-cinzel text-[0.72rem] tracking-[0.14em] uppercase bg-gold text-navy px-7 py-3.5 hover:bg-gold-light transition-all duration-300 active:scale-95 shadow-md"
              >
                Watch the Series
              </Link>
              <Link
                href="/about"
                className="font-cinzel text-[0.72rem] tracking-[0.14em] uppercase border border-cream/30 text-cream px-7 py-3.5 hover:border-gold hover:text-gold transition-all duration-300"
              >
                Our Vision
              </Link>
            </motion.div>
          </div>

          {/* Right — Featured episode card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="hidden lg:block"
          >
            <div className="border border-gold/20 bg-cream/5 backdrop-blur-sm overflow-hidden">
              {/* Thumb */}
              <div
                className={`aspect-video bg-gradient-to-br ${featuredEpisode.thumbnailGradient} flex items-center justify-center relative`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,165,76,0.1)_0%,transparent_65%)]" />
                <div className="relative text-center">
                  <span className="font-cinzel text-[0.68rem] tracking-[0.22em] uppercase text-gold block mb-2">
                    {featuredEpisode.psalmReference}
                  </span>
                  <p className="font-playfair text-cream text-xl mb-5 px-6">
                    {featuredEpisode.title}
                  </p>
                  <PlayButton size="lg" />
                </div>
              </div>

              {/* Card body */}
              <div className="p-5">
                <span className="font-cinzel text-[0.62rem] tracking-[0.2em] uppercase text-gold block mb-1.5">
                  Latest Episode · {featuredEpisode.psalmReference}
                </span>
                <h3 className="font-playfair text-cream text-lg mb-1.5">
                  {featuredEpisode.title}
                </h3>
                <p className="font-lato text-cream/50 text-xs leading-relaxed line-clamp-2">
                  {featuredEpisode.description}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy to-transparent" />
    </section>
  )
}
