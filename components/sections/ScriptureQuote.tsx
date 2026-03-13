'use client'

import { motion } from 'framer-motion'

interface ScriptureQuoteProps {
  quote: string
  reference: string
}

export function ScriptureQuote({ quote, reference }: ScriptureQuoteProps) {
  return (
    <section className="bg-navy py-20 relative overflow-hidden">
      {/* Giant decorative quote mark */}
      <span
        className="absolute top-0 left-1/2 -translate-x-1/2 font-playfair text-[22rem] leading-none text-gold/[0.03] select-none pointer-events-none"
        aria-hidden="true"
      >
        &ldquo;
      </span>

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-playfair italic text-cream leading-relaxed mb-6"
          style={{ fontSize: 'clamp(1.35rem, 3vw, 2rem)' }}
        >
          &ldquo;{quote}&rdquo;
        </motion.p>
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-cinzel text-[0.7rem] tracking-[0.25em] uppercase text-gold"
        >
          — {reference}
        </motion.span>
      </div>
    </section>
  )
}
