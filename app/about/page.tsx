import { SectionLabel } from '@/components/ui/SectionLabel'
import { GoldDivider } from '@/components/ui/GoldDivider'
import { CTASection } from '@/components/sections/CTASection'
import { ScriptureQuote } from '@/components/sections/ScriptureQuote'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About – Psalms Alive',
  description: 'The story behind Psalms Alive, created by Atley Adejola to bring the Book of Psalms to life through visual storytelling.',
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy pt-36 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(201,165,76,0.06)_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative">
          <SectionLabel className="text-center block">Our Story</SectionLabel>
          <h1
            className="font-playfair font-bold text-cream leading-snug"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}
          >
            The Story Behind{' '}
            <em className="italic text-gold">Psalms Alive</em>
          </h1>
          <GoldDivider className="mx-auto" />
          <p className="font-lato text-cream/60 text-lg max-w-2xl mx-auto leading-relaxed">
            A platform born from a simple vision — to make the Psalms easier to understand,
            relatable, and alive through visual storytelling.
          </p>
        </div>
      </section>

      {/* Story body */}
      <section className="bg-cream py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Decorative panel */}
            <div className="aspect-[4/5] bg-gradient-to-br from-navy via-[#122040] to-[#1a3560] flex items-center justify-center relative overflow-hidden sticky top-28">
              <div className="absolute inset-4 border border-gold/20" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,165,76,0.08)_0%,transparent_65%)]" />
              <div className="relative text-center px-8">
                <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="#C9A54C" strokeWidth="1" opacity="0.35" className="mx-auto mb-6">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                </svg>
                <p className="font-playfair italic text-gold/40 text-sm leading-relaxed">
                  &ldquo;Thy word is a lamp unto my feet, and a light unto my path.&rdquo;
                </p>
                <span className="font-cinzel text-gold/25 text-[0.58rem] tracking-[0.2em] uppercase mt-3 block">
                  Psalm 119:105
                </span>
              </div>
            </div>

            {/* Text content */}
            <div className="flex flex-col gap-6">
              <div>
                <SectionLabel>The Founder</SectionLabel>
                <h2 className="font-playfair font-semibold text-navy text-3xl mb-4">
                  Atley Adejola
                </h2>
                <GoldDivider />
                <p className="font-lato text-brown leading-relaxed mb-4">
                  Psalms Alive was born from a simple yet profound vision by Atley Adejola — to make
                  the Psalms easier to understand, relatable, and alive through visual storytelling.
                </p>
                <p className="font-lato text-brown leading-relaxed">
                  The Book of Psalms captures the full range of human emotions in raw, honest
                  conversation with God. Joy and sorrow. Faith and fear. Gratitude and lament.
                  These ancient words have comforted generations across thousands of years — and
                  Atley believed they could come alive in a new way for a new generation.
                </p>
              </div>

              <div>
                <SectionLabel>The Platform</SectionLabel>
                <h2 className="font-playfair font-semibold text-navy text-2xl mb-4">
                  Where Scripture Meets Story
                </h2>
                <GoldDivider />
                <p className="font-lato text-brown leading-relaxed mb-4">
                  Through short dramatic video episodes and comic-style visual narratives,
                  Psalms Alive presents scripture in a way that connects faith with everyday life.
                  Each episode explores a different Psalm — its historical context, its emotional
                  depth, and its personal application.
                </p>
                <p className="font-lato text-brown leading-relaxed">
                  The platform is designed to be a peaceful digital sanctuary — a place where
                  people can watch, reflect, and grow spiritually, wherever they are in their
                  faith journey.
                </p>
              </div>

              <div>
                <SectionLabel>The Vision</SectionLabel>
                <h2 className="font-playfair font-semibold text-navy text-2xl mb-4">
                  More Than a Series
                </h2>
                <GoldDivider />
                <p className="font-lato text-brown leading-relaxed">
                  Psalms Alive is more than a video series. It is a faith journey. A growing
                  library of visual devotionals, dramatic interpretations, and scripture-inspired
                  reflections — all designed to help people see how God&apos;s word speaks
                  directly to their personal experiences, emotions, and seasons of life.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <ScriptureQuote
        quote="He restoreth my soul: he leadeth me in the paths of righteousness for his name's sake."
        reference="Psalm 23:3"
      />
      <CTASection />
    </>
  )
}
