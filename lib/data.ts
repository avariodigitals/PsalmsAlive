/**
 * WordPress Data Fetcher
 * WordPress first, falls back to static data if unreachable.
 */

import {
  getAllEpisodes,
  getFeaturedEpisode,
  getEpisodeBySlug,
  getEpisodeSlugs,
  STATIC_EPISODES,
  type WPEpisode,
} from './api'

export async function safeGetAllEpisodes(): Promise<WPEpisode[]> {
  try {
    const episodes = await getAllEpisodes()
    if (episodes && episodes.length > 0) return episodes
    return STATIC_EPISODES
  } catch (err) {
    console.warn('WordPress not reachable — using static fallback:', err)
    return STATIC_EPISODES
  }
}

export async function safeGetFeaturedEpisode(): Promise<WPEpisode | null> {
  try {
    const episode = await getFeaturedEpisode()
    if (episode) return episode
    return STATIC_EPISODES.find((e) => e.episodeFields.featured) ?? STATIC_EPISODES[0]
  } catch {
    return STATIC_EPISODES.find((e) => e.episodeFields.featured) ?? STATIC_EPISODES[0]
  }
}

export async function safeGetEpisodeBySlug(slug: string): Promise<WPEpisode | null> {
  try {
    const episode = await getEpisodeBySlug(slug)
    if (episode) return episode
    return STATIC_EPISODES.find((e) => e.slug === slug) ?? null
  } catch {
    return STATIC_EPISODES.find((e) => e.slug === slug) ?? null
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