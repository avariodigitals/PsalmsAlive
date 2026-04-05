/**
 * Safe data fetcher
 * Returns WordPress data when CMS is connected,
    * and falls back to static data when not connected or on fetch errors.
 */

import {
  getAllEpisodes,
  getFeaturedEpisode,
  getEpisodeBySlug,
  getEpisodeSlugs,
  STATIC_EPISODES,
  type WPEpisode,
} from './api'

const WP_CONNECTED = !!(
  process.env.NEXT_PUBLIC_WP_GRAPHQL_URL &&
  process.env.NEXT_PUBLIC_WP_GRAPHQL_URL !== 'https://cms.psalmsalive.com/graphql'
)

export async function safeGetAllEpisodes(): Promise<WPEpisode[]> {
  if (!WP_CONNECTED) return STATIC_EPISODES as unknown as WPEpisode[]
  try {
    return await getAllEpisodes()
  } catch {
    console.warn('WordPress not reachable — using static episode data')
    return STATIC_EPISODES as unknown as WPEpisode[]
  }
}

export async function safeGetFeaturedEpisode(): Promise<WPEpisode | null> {
  if (!WP_CONNECTED) {
    return (STATIC_EPISODES.find((e) => e.episodeFields.featured) ??
      STATIC_EPISODES[0]) as unknown as WPEpisode
  }
  try {
    return await getFeaturedEpisode()
  } catch {
    return (STATIC_EPISODES[0] as unknown as WPEpisode)
  }
}

export async function safeGetEpisodeBySlug(slug: string): Promise<WPEpisode | null> {
  if (!WP_CONNECTED) {
    return (STATIC_EPISODES.find((e) => e.slug === slug) ?? null) as unknown as WPEpisode | null
  }
  try {
    return await getEpisodeBySlug(slug)
  } catch {
    return (STATIC_EPISODES.find((e) => e.slug === slug) ?? null) as unknown as WPEpisode | null
  }
}

export async function safeGetEpisodeSlugs(): Promise<string[]> {
  if (!WP_CONNECTED) return STATIC_EPISODES.map((e) => e.slug)
  try {
    return await getEpisodeSlugs()
  } catch {
    return STATIC_EPISODES.map((e) => e.slug)
  }
}