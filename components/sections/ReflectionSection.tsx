'use client'

import { motion } from 'framer-motion'
import { GoldDivider } from '@/components/ui/GoldDivider'
import { SectionLabel } from '@/components/ui/SectionLabel'

interface ReflectionSectionProps {
  psalmReference: string
  reflection: string
}

export function ReflectionSection({ psalmReference, reflection }: ReflectionSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="bg-navy py-16"
    >
      <div className="max-w-2xl mx-auto px-6 text-center">
        <SectionLabel className="text-center block">Reflection</SectionLabel>
        <h3 className="font-playfair font-semibold text-cream text-2xl mb-4">
          What does {psalmReference} teach us?
        </h3>
        <GoldDivider className="mx-auto" />
        <p className="font-playfair italic text-gold-light text-lg leading-relaxed">
          &ldquo;{reflection}&rdquo;
        </p>
      </div>
    </motion.section>
  )
}
