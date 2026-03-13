import { EpisodeGrid } from '@/components/sections/EpisodeGrid'
import { CTASection } from '@/components/sections/CTASection'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GoldDivider } from '@/components/ui/GoldDivider'
import { episodes } from '@/lib/episodes'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Episodes – Psalms Alive',
  description:
    'Browse all episodes of Psalms Alive — dramatic visual stories inspired by the Book of Psalms.',
}

export default function EpisodesPage() {
  return (
    <>
      <section className="bg-navy pt-36 pb-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
          <SectionLabel className="text-center block">The Series</SectionLabel>
          <h1
            className="font-playfair font-bold text-cream leading-snug"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}
          >
            All Episodes
          </h1>
          <GoldDivider className="mx-auto" />
          <p className="font-lato text-cream/55 text-base max-w-xl mx-auto leading-relaxed">
            Short dramatic stories inspired by the Book of Psalms — each episode a
            window into scripture and a mirror for your own faith journey.
          </p>
        </div>
      </section>

      <EpisodeGrid episodes={episodes} showHeader={false} />
      <CTASection />
    </>
  )
}
