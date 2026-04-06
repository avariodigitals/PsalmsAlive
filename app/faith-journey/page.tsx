import { getFaithJourneyContent } from '@/lib/api'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GoldDivider } from '@/components/ui/GoldDivider'
import { CTASection } from '@/components/sections/CTASection'
import { Heart, BookOpen, Users } from 'lucide-react'
import type { Metadata } from 'next'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Faith Journey',
  description: 'Explore faith reflections and devotional content inspired by the Psalms.',
}

const defaults = {
  pageHeadline: 'Faith for Every Season',
  introText: 'The Psalms remind us that every human emotion can be brought before God — the joy, the doubt, the grief, and the gratitude. Psalms Alive was created to help you see your own story reflected in scripture.',
  hopeTitle: 'Hope',
  hopeText: 'Every Psalm carries hope — even in its most anguished verses. These stories help you hold onto yours through every season.',
  reflectionTitle: 'Reflection',
  reflectionText: 'Each episode comes with a devotional takeaway, inviting you to pause and reflect on your own faith walk.',
  communityTitle: 'Community',
  communityText: 'Join a growing community of believers finding encouragement through shared stories of scripture and real life.',
}

export default async function FaithJourneyPage() {
  const content = await getFaithJourneyContent()
  const c = {
    pageHeadline: content?.pageHeadline || defaults.pageHeadline,
    introText: content?.introText || defaults.introText,
    hopeTitle: content?.hopeTitle || defaults.hopeTitle,
    hopeText: content?.hopeText || defaults.hopeText,
    reflectionTitle: content?.reflectionTitle || defaults.reflectionTitle,
    reflectionText: content?.reflectionText || defaults.reflectionText,
    communityTitle: content?.communityTitle || defaults.communityTitle,
    communityText: content?.communityText || defaults.communityText,
  }

  const pillars = [
    { title: c.hopeTitle, text: c.hopeText, Icon: Heart },
    { title: c.reflectionTitle, text: c.reflectionText, Icon: BookOpen },
    { title: c.communityTitle, text: c.communityText, Icon: Users },
  ]

  return (
    <>
      {/* Hero */}
      <section className="bg-navy pt-36 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(201,165,76,0.06)_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative">
          <SectionLabel className="text-center block">Faith Journey</SectionLabel>
          <h1 className="font-playfair font-bold text-cream leading-snug" style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}>
            Faith for <em className="italic text-gold">Every Season</em>
          </h1>
          <GoldDivider className="mx-auto" />
          <p className="font-lato text-cream/60 text-lg max-w-2xl mx-auto leading-relaxed">
            {c.introText}
          </p>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-cream py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map(({ title, text, Icon }) => (
              <div key={title} className="p-8 border border-gold/20 border-t-4 border-t-gold bg-white hover:-translate-y-1 transition-transform duration-300">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-5">
                  <Icon size={20} className="text-gold" strokeWidth={1.5} />
                </div>
                <h3 className="font-playfair font-semibold text-navy text-xl mb-3">{title}</h3>
                <p className="font-lato text-brown text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}