import { safeGetAllEpisodes, safeGetFeaturedEpisode } from '@/lib/data'
import { HeroSection } from '@/components/sections/HeroSection'
import { FeaturedEpisode } from '@/components/sections/FeaturedEpisode'
import { VisionSection } from '@/components/sections/VisionSection'
import { EpisodeGrid } from '@/components/sections/EpisodeGrid'
import { ScriptureQuote } from '@/components/sections/ScriptureQuote'
import { FaithJourneySection } from '@/components/sections/FaithJourneySection'
import { CTASection } from '@/components/sections/CTASection'
import Link from 'next/link'

export const revalidate = 60

function mapEpisode(ep: Awaited<ReturnType<typeof safeGetAllEpisodes>>[0]) {
  return {
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
  }
}

export default async function HomePage() {
  const [episodes, featuredEpisode] = await Promise.all([
    safeGetAllEpisodes(),
    safeGetFeaturedEpisode(),
  ])

  const mapped = episodes.map(mapEpisode)
  const featured = featuredEpisode ? mapEpisode(featuredEpisode) : mapped[0]

  // Latest 6 episodes — newest first, no filter UI on homepage
  const latestSix = mapped.slice(0, 6)

  return (
    <>
      <HeroSection featuredEpisode={featured} />
      <FeaturedEpisode episode={featured} />
      <VisionSection />

      {/* Latest Episodes — max 6, no duplicate header */}
      <section className="bg-[#0d1e35] py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="font-cinzel text-[0.7rem] tracking-[0.22em] uppercase text-gold block mb-3">
              Latest Episodes
            </span>
            <h2
              className="font-playfair font-semibold text-cream"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Watch the Series
            </h2>
            <p className="font-lato text-cream/50 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
              Every episode explores a different Psalm through storytelling — reflecting
              life&apos;s moments of struggle, faith, and hope.
            </p>
          </div>

          {/* No filter on homepage, limit 6 */}
          <EpisodeGrid episodes={latestSix} showFilter={false} />

          {/* View all link if more than 6 */}
          {mapped.length > 6 && (
            <div className="text-center mt-12">
              <Link
                href="/episodes"
                className="font-cinzel text-[0.75rem] tracking-[0.18em] uppercase text-gold border border-gold/30 px-8 py-3.5 hover:bg-gold hover:text-navy transition-all duration-300"
              >
                View All Episodes ({mapped.length})
              </Link>
            </div>
          )}
        </div>
      </section>

      <ScriptureQuote
        quote="The Lord is my shepherd; I shall not want. He maketh me to lie down in green pastures."
        reference="Psalm 23:1"
      />
      <FaithJourneySection />
      <CTASection />
    </>
  )
}