'use client'

import { useState } from 'react'
import { PlayButton } from '@/components/ui/PlayButton'

interface VideoPlayerProps {
  videoUrl?: string
  thumbnailGradient: string
  title: string
  psalmReference: string
}

export function VideoPlayer({
  videoUrl,
  thumbnailGradient,
  title,
  psalmReference,
}: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false)

  if (videoUrl && playing) {
    return (
      <div className="aspect-video w-full bg-navy-dark">
        <iframe
          src={videoUrl}
          title={title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  return (
    <div
      className={`aspect-video bg-gradient-to-br ${thumbnailGradient} relative flex items-center justify-center group cursor-pointer`}
      onClick={() => setPlaying(true)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && setPlaying(true)}
      aria-label={`Play ${title}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,165,76,0.1)_0%,transparent_65%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />

      <div className="relative z-10 text-center">
        <span className="font-cinzel text-[0.68rem] tracking-[0.22em] uppercase text-gold block mb-2">
          {psalmReference}
        </span>
        <p className="font-playfair text-cream text-2xl mb-6 px-8 leading-snug">{title}</p>
        <PlayButton size="lg" />
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
    </div>
  )
}
