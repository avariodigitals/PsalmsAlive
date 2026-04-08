'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, Filter, Play } from 'lucide-react'

export interface EpisodeCardData {
  id: string
  slug: string
  psalmNumber: number
  psalmReference: string
  title: string
  description: string
  reflection: string
  videoUrl: string
  thumbnailGradient: string
  thumbnailImage: string
  duration: string
  featured: boolean
  category?: string
}

interface Props {
  episodes: EpisodeCardData[]
  showFilter?: boolean
  limit?: number
}

export function EpisodeGrid({ episodes, showFilter = true, limit }: Props) {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Get unique categories from episodes
  const categories = useMemo(() => {
    const cats = new Set<string>()
    episodes.forEach((ep) => {
      if (ep.category) cats.add(ep.category)
      else if (ep.psalmReference) cats.add(ep.psalmReference)
    })
    return Array.from(cats).sort((a, b) => {
      const numA = parseInt(a.replace(/\D/g, ''))
      const numB = parseInt(b.replace(/\D/g, ''))
      return numA - numB
    })
  }, [episodes])

  // Filter episodes
  const filtered = useMemo(() => {
    let result = episodes

    if (selectedCategory !== 'all') {
      result = result.filter(
        (ep) =>
          ep.category === selectedCategory ||
          ep.psalmReference === selectedCategory
      )
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (ep) =>
          ep.title.toLowerCase().includes(q) ||
          ep.psalmReference.toLowerCase().includes(q) ||
          ep.description.toLowerCase().includes(q)
      )
    }

    return limit ? result.slice(0, limit) : result
  }, [episodes, selectedCategory, search, limit])

  return (
    <div>
      {/* Filter & Search Bar */}
      {showFilter && (
        <div className="flex flex-col sm:flex-row gap-3 mb-10">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold/50"
            />
            <input
              type="text"
              placeholder="Search episodes or Psalms..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-gold/20 text-cream placeholder:text-cream/30 font-lato text-sm pl-10 pr-4 py-3 focus:outline-none focus:border-gold/50 transition-colors duration-200"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold/50 pointer-events-none"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none bg-white/5 border border-gold/20 text-cream font-lato text-sm pl-10 pr-10 py-3 focus:outline-none focus:border-gold/50 transition-colors duration-200 cursor-pointer min-w-[180px]"
            >
              <option value="all" className="bg-navy">All Psalms</option>
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-navy">
                  {cat}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                <path d="M1 1l4 4 4-4" stroke="#C9A54C" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Results count */}
      {showFilter && (search || selectedCategory !== 'all') && (
        <p className="font-cinzel text-[0.65rem] tracking-[0.15em] uppercase text-gold/50 mb-6">
          {filtered.length} episode{filtered.length !== 1 ? 's' : ''} found
        </p>
      )}

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="font-playfair italic text-cream/40 text-xl">No episodes found.</p>
          <button
            onClick={() => { setSearch(''); setSelectedCategory('all') }}
            className="mt-4 font-cinzel text-[0.7rem] tracking-[0.15em] uppercase text-gold hover:text-gold-light transition-colors"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((ep) => (
            <EpisodeCard key={ep.id} episode={ep} />
          ))}
        </div>
      )}
    </div>
  )
}

function EpisodeCard({ episode }: { episode: EpisodeCardData }) {
  const thumbnailSrc =
    episode.thumbnailImage || ''

  return (
    <Link
      href={`/episodes/${episode.slug}`}
      className="group block bg-white/[0.03] border border-gold/15 overflow-hidden hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-[0_16px_40px_rgba(0,0,0,0.4)] transition-all duration-300"
    >
      {/* Thumbnail */}
      <div
        className={`relative aspect-video bg-gradient-to-br ${episode.thumbnailGradient} overflow-hidden`}
      >
        {thumbnailSrc ? (
          <Image
            src={thumbnailSrc}
            alt={episode.title}
            fill
            className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : null}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />

        {/* Psalm label */}
        <div className="absolute top-3 left-3">
          <span className="font-cinzel text-[0.6rem] tracking-[0.18em] uppercase text-gold bg-navy/70 px-2 py-1">
            {episode.psalmReference}
          </span>
        </div>

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-gold/80 flex items-center justify-center group-hover:bg-gold group-hover:scale-110 transition-all duration-300">
            <Play size={16} fill="#0B1F3A" className="text-navy ml-0.5" />
          </div>
        </div>

        {/* Duration */}
        {episode.duration && (
          <div className="absolute bottom-3 right-3">
            <span className="font-lato text-[0.68rem] text-cream/60 bg-navy/70 px-2 py-0.5">
              {episode.duration}
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4">
        <h3 className="font-playfair font-semibold text-cream text-base leading-snug mb-2 group-hover:text-gold transition-colors duration-200">
          {episode.title}
        </h3>
        <p className="font-lato text-cream/45 text-xs leading-relaxed line-clamp-2">
          {episode.description}
        </p>
      </div>
    </Link>
  )
}