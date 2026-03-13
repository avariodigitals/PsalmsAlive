'use client'

import { useState } from 'react'
import { Share2, Check, Copy } from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'

interface ShareSectionProps {
  title: string
  slug: string
}

export function ShareSection({ title, slug }: ShareSectionProps) {
  const [copied, setCopied] = useState(false)
  const url = typeof window !== 'undefined'
    ? `${window.location.origin}/episodes/${slug}`
    : `https://psalmsalive.com/episodes/${slug}`

  const copyLink = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareLinks = [
    {
      label: 'WhatsApp',
      color: 'hover:bg-[#25D366]/10 hover:border-[#25D366]/40 hover:text-[#25D366]',
      href: `https://wa.me/?text=${encodeURIComponent(`Watch "${title}" on Psalms Alive: ${url}`)}`,
    },
    {
      label: 'Facebook',
      color: 'hover:bg-[#1877F2]/10 hover:border-[#1877F2]/40 hover:text-[#1877F2]',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      label: 'Twitter / X',
      color: 'hover:bg-white/10 hover:border-white/40 hover:text-white',
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${title}" — Psalms Alive`)}&url=${encodeURIComponent(url)}`,
    },
  ]

  return (
    <section className="bg-cream py-14">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Share2 size={16} className="text-gold" />
          <SectionLabel className="mb-0">Share This Episode</SectionLabel>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          {shareLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`font-cinzel text-[0.65rem] tracking-[0.15em] uppercase px-5 py-2.5 border border-brown/20 text-brown transition-all duration-300 ${s.color}`}
            >
              {s.label}
            </a>
          ))}
          <button
            onClick={copyLink}
            className="font-cinzel text-[0.65rem] tracking-[0.15em] uppercase px-5 py-2.5 border border-brown/20 text-brown hover:bg-gold/10 hover:border-gold/40 hover:text-gold transition-all duration-300 flex items-center gap-2"
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
        </div>
      </div>
    </section>
  )
}
