'use client'

import { motion } from 'framer-motion'
import { Heart, BookOpen, Users } from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GoldDivider } from '@/components/ui/GoldDivider'

const pillars = [
  {
    icon: Heart,
    title: 'Hope',
    body: 'Every Psalm carries hope — even in its most anguished verses. These stories help you hold onto yours through every season.',
  },
  {
    icon: BookOpen,
    title: 'Reflection',
    body: 'Each episode comes with a devotional takeaway, inviting you to pause and reflect on your own walk of faith.',
  },
  {
    icon: Users,
    title: 'Community',
    body: 'Join a growing community of believers finding encouragement through shared stories of scripture and real life.',
  },
]

export function FaithJourneySection() {
  return (
    <section id="faith-journey" className="bg-cream py-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <SectionLabel className="text-center block">Faith Journey</SectionLabel>
          <h2
            className="font-playfair font-semibold text-navy leading-snug mb-0"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Faith for{' '}
            <em className="italic text-gold">Every Season</em>
          </h2>
          <GoldDivider className="mx-auto" />
          <p className="font-lato text-brown leading-relaxed">
            The Psalms remind us that every human emotion can be brought before God —
            the joy, the doubt, the grief, and the gratitude. Psalms Alive was created
            to help you see your own story reflected in scripture.
          </p>
        </motion.div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="bg-white border border-gold/15 border-t-[3px] border-t-gold p-8 hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-5">
                  <Icon size={20} stroke="#C9A54C" strokeWidth={1.5} />
                </div>
                <h3 className="font-playfair font-medium text-navy text-xl mb-3">
                  {pillar.title}
                </h3>
                <p className="font-lato text-brown text-sm leading-relaxed">{pillar.body}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
