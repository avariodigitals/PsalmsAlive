/**
 * WordPress Data Fetcher
 * Fetches from WordPress GraphQL API with static fallback
 */

import {
  getAllEpisodes,
  getFeaturedEpisode,
  getEpisodeBySlug,
  getEpisodeSlugs,
  STATIC_EPISODES,
  type WPEpisode,
} from './api'

// WordPress is connected — fetch live data, fall back to static if unreachable
export async function safeGetAllEpisodes(): Promise<WPEpisode[]> {
  try {
    const episodes = await getAllEpisodes()
    if (episodes && episodes.length > 0) return episodes
    return STATIC_EPISODES as unknown as WPEpisode[]
  } catch {
    console.warn('WordPress GraphQL not reachable — using static data')
    return STATIC_EPISODES as unknown as WPEpisode[]
  }
}

export async function safeGetFeaturedEpisode(): Promise<WPEpisode | null> {
  try {
    const episode = await getFeaturedEpisode()
    if (episode) return episode
    return (STATIC_EPISODES.find((e) => e.episodeFields.featured) ??
      STATIC_EPISODES[0]) as unknown as WPEpisode
  } catch {
    return (STATIC_EPISODES.find((e) => e.episodeFields.featured) ??
      STATIC_EPISODES[0]) as unknown as WPEpisode
  }
}

export async function safeGetEpisodeBySlug(slug: string): Promise<WPEpisode | null> {
  try {
    const episode = await getEpisodeBySlug(slug)
    if (episode) return episode
    return (STATIC_EPISODES.find((e) => e.slug === slug) ?? null) as unknown as WPEpisode | null
  } catch {
    return (STATIC_EPISODES.find((e) => e.slug === slug) ?? null) as unknown as WPEpisode | null
  }
}

export async function safeGetEpisodeSlugs(): Promise<string[]> {
  try {
    const slugs = await getEpisodeSlugs()
    if (slugs && slugs.length > 0) return slugs
    return STATIC_EPISODES.map((e) => e.slug)
  } catch {
    return STATIC_EPISODES.map((e) => e.slug)
  }
}