import { HeroSection } from '@/components/sections/HeroSection'
import { FeaturedEpisode } from '@/components/sections/FeaturedEpisode'
import { VisionSection } from '@/components/sections/VisionSection'
import { EpisodeGrid } from '@/components/sections/EpisodeGrid'
import { ScriptureQuote } from '@/components/sections/ScriptureQuote'
import { FaithJourneySection } from '@/components/sections/FaithJourneySection'
import { CTASection } from '@/components/sections/CTASection'
import { episodes, getFeaturedEpisode } from '@/lib/episodes'

export default function HomePage() {
  const featured = getFeaturedEpisode()

  return (
    <>
      <HeroSection featuredEpisode={featured} />
      <FeaturedEpisode episode={featured} />
      <VisionSection />
      <EpisodeGrid episodes={episodes} />
      <ScriptureQuote
        quote="The Lord is my shepherd; I shall not want. He maketh me to lie down in green pastures: he leadeth me beside the still waters."
        reference="Psalm 23:1–2"
      />
      <FaithJourneySection />
      <CTASection />
    </>
  )
}
