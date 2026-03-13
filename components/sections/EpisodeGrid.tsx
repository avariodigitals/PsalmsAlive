'use client'

import { motion } from 'framer-motion'
import { EpisodeCard } from './EpisodeCard'
import { SectionLabel } from '@/components/ui/SectionLabel'
import type { Episode } from '@/types'

interface EpisodeGridProps {
  episodes: Episode[]
  showHeader?: boolean
}

export function EpisodeGrid({ episodes, showHeader = true }: EpisodeGridProps) {
  return (
    <section id="episodes" className="bg-navy-mid py-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {showHeader && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <SectionLabel className="text-center block">The Series</SectionLabel>
            <h2 className="font-playfair font-semibold text-cream mb-4"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              Watch the Series
            </h2>
            <p className="font-lato text-cream/55 text-base max-w-xl mx-auto leading-relaxed">
              Every episode explores a different Psalm through dramatic storytelling —
              reflecting life&apos;s moments of struggle, faith, and hope.
            </p>
          </motion.div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {episodes.map((episode, i) => (
            <EpisodeCard key={episode.id} episode={episode} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
