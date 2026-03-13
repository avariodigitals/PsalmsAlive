'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { PlayButton } from '@/components/ui/PlayButton'
import type { Episode } from '@/types'

interface EpisodeCardProps {
  episode: Episode
  index?: number
}

export function EpisodeCard({ episode, index = 0 }: EpisodeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
    >
      <Link
        href={`/episodes/${episode.slug}`}
        className="group block border border-gold/15 bg-cream/5 overflow-hidden hover:border-gold/45 transition-all duration-350 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)]"
      >
        {/* Thumbnail */}
        <div
          className={`aspect-video bg-gradient-to-br ${episode.thumbnailGradient} relative overflow-hidden flex items-center justify-center`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,165,76,0.08)_0%,transparent_70%)]" />

          <div className="relative z-10 text-center px-4">
            <span className="font-cinzel text-[0.62rem] tracking-[0.22em] uppercase text-gold block mb-1.5">
              {episode.psalmReference}
            </span>
            <p className="font-playfair text-cream text-base leading-snug mb-4">
              {episode.title}
            </p>
            <div className="flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <PlayButton size="sm" />
            </div>
          </div>

          {/* Always-visible play icon bottom-right */}
          <div className="absolute bottom-3 right-3 opacity-60 group-hover:opacity-0 transition-opacity duration-300">
            <div className="w-8 h-8 rounded-full bg-gold/80 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="#0B1F3A" className="w-3 h-3 ml-0.5">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </div>
          </div>

          {/* Duration badge */}
          {episode.duration && (
            <span className="absolute top-3 left-3 font-cinzel text-[0.55rem] tracking-[0.15em] uppercase text-cream/60 bg-navy/60 px-2 py-1">
              {episode.duration}
            </span>
          )}
        </div>

        {/* Card body */}
        <div className="p-4 border-t border-gold/10">
          <span className="font-cinzel text-[0.6rem] tracking-[0.2em] uppercase text-gold/70 block mb-1">
            {episode.psalmReference}
          </span>
          <h3 className="font-playfair text-cream text-base mb-1.5 group-hover:text-gold transition-colors duration-200">
            {episode.title}
          </h3>
          <p className="font-lato text-cream/45 text-xs leading-relaxed line-clamp-2">
            {episode.description}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}
