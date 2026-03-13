'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { PlayButton } from '@/components/ui/PlayButton'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GoldDivider } from '@/components/ui/GoldDivider'
import type { Episode } from '@/types'

interface FeaturedEpisodeProps {
  episode: Episode
}

export function FeaturedEpisode({ episode }: FeaturedEpisodeProps) {
  return (
    <section className="bg-navy py-24">
      {/* Subtle cross-hatch pattern */}
      <div
        className="absolute left-0 right-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23C9A54C' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <SectionLabel>Featured Episode</SectionLabel>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.45fr_1fr] gap-10 lg:gap-16 items-center">
          {/* Video thumbnail */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className={`aspect-video bg-gradient-to-br ${episode.thumbnailGradient} relative overflow-hidden flex items-center justify-center group cursor-pointer`}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,165,76,0.1)_0%,transparent_65%)] group-hover:opacity-150 transition-opacity duration-500" />

            <div className="relative z-10 text-center">
              <span className="font-cinzel text-[0.7rem] tracking-[0.22em] uppercase text-gold block mb-2">
                {episode.psalmReference}
              </span>
              <p className="font-playfair text-cream text-2xl mb-6 px-8 leading-snug">
                {episode.title}
              </p>
              <PlayButton size="lg" />
            </div>

            {/* Bottom label */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <span className="font-cinzel text-[0.58rem] tracking-[0.2em] uppercase text-cream/40">
                {episode.duration && `${episode.duration} · `}{episode.psalmReference}
              </span>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <SectionLabel light>Latest Episode</SectionLabel>
            <h2
              className="font-playfair font-semibold text-cream leading-snug mb-4"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)' }}
            >
              {episode.title}
            </h2>

            <GoldDivider />

            <p className="font-lato text-cream/60 leading-relaxed text-sm mb-6">
              {episode.description}
            </p>

            {/* Scripture pull quote */}
            <div className="border-l-[3px] border-gold pl-5 py-1 mb-8 bg-gold/5">
              <p className="font-playfair italic text-gold-light text-base leading-relaxed">
                &ldquo;{episode.reflection}&rdquo;
              </p>
            </div>

            <Link
              href={`/episodes/${episode.slug}`}
              className="inline-flex font-cinzel text-[0.72rem] tracking-[0.14em] uppercase bg-gold text-navy px-7 py-3.5 hover:bg-gold-light transition-all duration-300 active:scale-95"
            >
              Watch Episode
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
