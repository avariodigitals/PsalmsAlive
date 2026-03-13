import { FaithJourneySection } from '@/components/sections/FaithJourneySection'
import { ScriptureQuote } from '@/components/sections/ScriptureQuote'
import { CTASection } from '@/components/sections/CTASection'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GoldDivider } from '@/components/ui/GoldDivider'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Faith Journey – Psalms Alive',
  description: 'Reflect on how the Psalms speak to your personal faith journey through every season of life.',
}

const seasons = [
  {
    psalm: 'Psalm 23',
    season: 'In Uncertain Seasons',
    text: 'When the path ahead is unclear, the Shepherd does not abandon His sheep. He walks ahead, beside, and behind. This Psalm teaches us that trust is not the absence of fear — it is the decision to keep walking anyway.',
  },
  {
    psalm: 'Psalm 46',
    season: 'In Times of Crisis',
    text: 'When everything shakes — relationships, health, finances, hope — God remains unmoved. "Be still and know" is not a passive command. It is an invitation to release our grip and trust His.',
  },
  {
    psalm: 'Psalm 27',
    season: 'When Fear Closes In',
    text: 'David wrote Psalm 27 while surrounded by enemies. Yet he declared one desire above all else: to dwell in the house of the Lord. Our deepest safety is not in our circumstances — it is in His presence.',
  },
  {
    psalm: 'Psalm 139',
    season: 'In Seasons of Identity',
    text: 'Before a word forms on your tongue, He knows it. Before you were born, He saw you. You are not an accident, a mystery, or a mistake. You are fully known, fully seen, and fully loved.',
  },
  {
    psalm: 'Psalm 91',
    season: 'When You Need Protection',
    text: 'The shelter of the Most High is not a physical fortress — it is a spiritual reality. When we abide in Him, we do not face the storms alone. His presence is our protection.',
  },
  {
    psalm: 'Psalm 121',
    season: 'On Long Journeys',
    text: 'The pilgrim lifts their eyes to the hills and asks: where does my help come from? The answer comes immediately — not from the mountains, but from the Maker of mountains. He who keeps you never sleeps.',
  },
]

export default function FaithJourneyPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy pt-36 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_60%,rgba(201,165,76,0.06)_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative">
          <SectionLabel className="text-center block">Devotional Reflections</SectionLabel>
          <h1
            className="font-playfair font-bold text-cream leading-snug"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}
          >
            Faith for{' '}
            <em className="italic text-gold">Every Season</em>
          </h1>
          <GoldDivider className="mx-auto" />
          <p className="font-lato text-cream/60 text-lg max-w-2xl mx-auto leading-relaxed">
            The Psalms were written in the middle of real life — not from a place of
            perfect peace, but from the trenches of human experience. They speak to
            every season you will ever face.
          </p>
        </div>
      </section>

      {/* Seasonal reflections grid */}
      <section className="bg-cream py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {seasons.map((item, i) => (
              <div
                key={i}
                className="border border-gold/15 border-t-[3px] border-t-gold bg-white p-8 hover:-translate-y-1 transition-transform duration-300"
              >
                <span className="font-cinzel text-[0.62rem] tracking-[0.22em] uppercase text-gold block mb-2">
                  {item.psalm}
                </span>
                <h3 className="font-playfair font-medium text-navy text-xl mb-4 leading-snug">
                  {item.season}
                </h3>
                <div className="w-8 h-px bg-gold mb-4" />
                <p className="font-lato text-brown text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ScriptureQuote
        quote="I lift up my eyes to the mountains — where does my help come from? My help comes from the Lord, the Maker of heaven and earth."
        reference="Psalm 121:1–2"
      />

      <FaithJourneySection />
      <CTASection />
    </>
  )
}
