import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { VideoPlayer } from '@/components/sections/VideoPlayer'
import { ReflectionSection } from '@/components/sections/ReflectionSection'
import { ShareSection } from '@/components/sections/ShareSection'
import { EpisodeGrid } from '@/components/sections/EpisodeGrid'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GoldDivider } from '@/components/ui/GoldDivider'
import { episodes, getEpisodeBySlug } from '@/lib/episodes'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return episodes.map((e) => ({ slug: e.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const episode = getEpisodeBySlug(slug)
  if (!episode) return { title: 'Episode Not Found – Psalms Alive' }
  return {
    title: `${episode.title} (${episode.psalmReference}) – Psalms Alive`,
    description: episode.description,
  }
}

export default async function EpisodeDetailPage({ params }: Props) {
  const { slug } = await params
  const episode = getEpisodeBySlug(slug)
  if (!episode) notFound()

  const otherEpisodes = episodes.filter((e) => e.slug !== slug).slice(0, 3)

  return (
    <>
      {/* Back nav */}
      <div className="bg-navy pt-24 pb-0">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-6">
          <Link
            href="/episodes"
            className="inline-flex items-center gap-2 font-cinzel text-[0.65rem] tracking-[0.18em] uppercase text-cream/50 hover:text-gold transition-colors duration-200 mb-8"
          >
            <ArrowLeft size={14} />
            All Episodes
          </Link>
        </div>

        {/* Episode header */}
        <div className="max-w-6xl mx-auto px-6 lg:px-8 pb-10">
          <SectionLabel>{episode.psalmReference}</SectionLabel>
          <h1
            className="font-playfair font-bold text-cream leading-snug mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            {episode.title}
          </h1>
          <GoldDivider />
          {episode.duration && (
            <span className="font-cinzel text-[0.62rem] tracking-[0.2em] uppercase text-gold/60">
              {episode.duration}
            </span>
          )}
        </div>
      </div>

      {/* Video */}
      <div className="bg-navy-dark">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <VideoPlayer
            videoUrl={episode.videoUrl}
            thumbnailGradient={episode.thumbnailGradient}
            title={episode.title}
            psalmReference={episode.psalmReference}
          />
        </div>
      </div>

      {/* Description */}
      <section className="bg-cream py-16">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <SectionLabel>About This Episode</SectionLabel>
          <p className="font-lato text-brown text-base leading-relaxed">
            {episode.description}
          </p>
        </div>
      </section>

      {/* Reflection */}
      <ReflectionSection
        psalmReference={episode.psalmReference}
        reflection={episode.reflection}
      />

      {/* Share */}
      <ShareSection title={episode.title} slug={episode.slug} />

      {/* More episodes */}
      {otherEpisodes.length > 0 && (
        <div className="bg-navy-mid">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-16 pb-4">
            <SectionLabel>Continue Watching</SectionLabel>
            <h2 className="font-playfair font-semibold text-cream text-2xl mb-10">
              More Episodes
            </h2>
          </div>
          <EpisodeGrid episodes={otherEpisodes} showHeader={false} />
        </div>
      )}
    </>
  )
}
