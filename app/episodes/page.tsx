import { safeGetAllEpisodes } from '@/lib/data'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GoldDivider } from '@/components/ui/GoldDivider'
import { EpisodeGrid } from '@/components/sections/EpisodeGrid'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Episodes',
  description: 'Browse all Psalms Alive episodes — short dramatic video stories inspired by the Book of Psalms.',
}

export const revalidate = 60

export default async function EpisodesPage() {
  const episodes = await safeGetAllEpisodes()

  const mapped = episodes.map((ep) => ({
    id: ep.id,
    slug: ep.slug,
    psalmNumber: ep.episodeFields.psalmNumber,
    psalmReference: ep.episodeFields.psalmReference,
    title: ep.title,
    description: ep.episodeFields.description,
    reflection: ep.episodeFields.reflection,
    videoUrl: ep.episodeFields.videoUrl || '',
    thumbnailGradient: ep.episodeFields.thumbnailGradient || 'from-[#0f1a2e] to-[#0a1020]',
    thumbnailImage: ep.featuredImage?.node?.sourceUrl || ep.episodeFields.thumbnailImage?.node?.sourceUrl || '',
    duration: ep.episodeFields.duration,
    featured: ep.episodeFields.featured,
    category: ep.psalmCategories?.nodes?.[0]?.name || ep.episodeFields.psalmReference,
  }))

  return (
    <>
      {/* Hero — single, no duplicate */}
      <section className="bg-navy pt-36 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(201,165,76,0.06)_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative">
          <SectionLabel className="text-center block">The Series</SectionLabel>
          <h1
            className="font-playfair font-bold text-cream leading-snug"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}
          >
            Watch the <em className="italic text-gold">Episodes</em>
          </h1>
          <GoldDivider className="mx-auto" />
          <p className="font-lato text-cream/60 text-lg max-w-2xl mx-auto leading-relaxed">
            Every episode explores a different Psalm through powerful visual storytelling.
            Filter by Psalm or search to find what speaks to your season.
          </p>
        </div>
      </section>

      {/* Episodes with filter */}
      <section className="bg-[#0d1e35] py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <EpisodeGrid episodes={mapped} showFilter={true} />
        </div>
      </section>
    </>
  )
}