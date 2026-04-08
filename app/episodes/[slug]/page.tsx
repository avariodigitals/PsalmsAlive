import { safeGetEpisodeBySlug, safeGetEpisodeSlugs } from '@/lib/data'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GoldDivider } from '@/components/ui/GoldDivider'
import { VideoPlayer } from '@/components/sections/VideoPlayer'
import { ReflectionSection } from '@/components/sections/ReflectionSection'
import { ShareSection } from '@/components/sections/ShareSection'
import { CTASection } from '@/components/sections/CTASection'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export const revalidate = 0

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await safeGetEpisodeSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const ep = await safeGetEpisodeBySlug(slug)

  if (!ep) {
    return {
      title: 'Episode Not Found',
      description: 'This episode could not be found.',
    }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://psalmsalive.com'
  const canonicalUrl = `${siteUrl}/episodes/${ep.slug}`

  const title =
    ep.episodeFields.seoTitle ||
    `${ep.title} | ${ep.episodeFields.psalmReference}`

  const description =
    ep.episodeFields.seoDescription ||
    ep.episodeFields.description ||
    'Watch this Psalms Alive episode and reflect on the message of the Psalm.'

  const image =
    ep.episodeFields.thumbnailImage?.node?.sourceUrl ||
    `${siteUrl}/og-image.jpg`

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Psalms Alive',
      type: 'article',
      images: [
        {
          url: image,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}

export default async function EpisodePage({ params }: Props) {
  const { slug } = await params
  const ep = await safeGetEpisodeBySlug(slug)

  if (!ep) notFound()

  const thumbnailImage = ep.episodeFields.thumbnailImage?.node?.sourceUrl || ''

  const episode = {
    id: ep.id,
    slug: ep.slug,
    psalmNumber: ep.episodeFields.psalmNumber,
    psalmReference: ep.episodeFields.psalmReference,
    title: ep.title,
    description: ep.episodeFields.description,
    reflection: ep.episodeFields.reflection,
    videoUrl: ep.episodeFields.videoUrl || '',
    thumbnailGradient:
      ep.episodeFields.thumbnailGradient || 'from-[#0f1a2e] to-[#0a1020]',
    thumbnailImage,
    duration: ep.episodeFields.duration,
    featured: ep.episodeFields.featured,
  }

  return (
    <>
      <section
        className={`bg-gradient-to-br ${episode.thumbnailGradient} pt-36 pb-16 relative overflow-hidden`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(201,165,76,0.08)_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative">
          <SectionLabel>{episode.psalmReference}</SectionLabel>
          <h1
            className="font-playfair font-bold text-cream leading-snug mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            {episode.title}
          </h1>
          <GoldDivider />
          <p className="font-lato text-cream/60 text-lg leading-relaxed max-w-2xl">
            {episode.description}
          </p>
          {episode.duration && (
            <p className="font-cinzel text-gold/60 text-xs tracking-widest uppercase mt-4">
              {episode.duration} · {episode.psalmReference}
            </p>
          )}
        </div>
      </section>

      <section className="bg-navy py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <VideoPlayer
            videoUrl={episode.videoUrl}
            title={episode.title}
            thumbnailGradient={episode.thumbnailGradient}
            psalmReference={episode.psalmReference}
          />
        </div>
      </section>

      <ReflectionSection
        reflection={episode.reflection}
        psalmReference={episode.psalmReference}
      />

      <ShareSection title={episode.title} slug={episode.slug} />

      <CTASection />
    </>
  )
}