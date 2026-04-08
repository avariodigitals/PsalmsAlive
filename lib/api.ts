/**
 * WordPress Headless CMS — GraphQL API Client
 * Connects Next.js frontend to cms.psalmsalive.com
 */

const WP_GRAPHQL_URL =
  process.env.NEXT_PUBLIC_WP_GRAPHQL_URL || 'https://cms.psalmsalive.com/graphql'

const WP_URL =
  process.env.NEXT_PUBLIC_WP_URL || 'https://cms.psalmsalive.com'

// ─── Core Fetcher ─────────────────────────────────────────────────────────────

async function fetchAPI<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  const res = await fetch(WP_GRAPHQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error(`WordPress API error: ${res.status} ${res.statusText}`)
  }

  const json = await res.json()

  if (json.errors) {
    console.error('GraphQL errors:', json.errors)
    throw new Error(json.errors[0]?.message || 'GraphQL query failed')
  }

  return json.data as T
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface WPEpisode {
  id: string
  slug: string
  title: string
  featuredImage?: {
    node: {
      sourceUrl: string
      altText: string
    }
  } | null
  psalmCategories?: {
    nodes: Array<{ name: string; slug: string }>
  }
  episodeFields: {
    psalmReference: string
    psalmNumber: number
    duration: string
    description: string
    reflection: string
    videoUrl: string
    thumbnailGradient: string
    thumbnailImage: { node: { sourceUrl: string } } | null
    featured: boolean
    latest: boolean
    publishStatus: string
    seoTitle: string
    seoDescription: string
  }
}

export interface WPSiteSettings {
  email: string
  youtube: string
  instagram: string
  facebook: string
  tagline: string
  footerText: string
}

// ─── Episode Fragment ──────────────────────────────────────────────────────────

const EPISODE_FIELDS = `
  id
  slug
  title
  featuredImage {
    node {
      sourceUrl
      altText
    }
  }
  psalmCategories {
    nodes {
      name
      slug
    }
  }
  episodeFields {
    psalmReference
    psalmNumber
    duration
    description
    reflection
    videoUrl
    thumbnailGradient
    thumbnailImage {
      node {
        sourceUrl
      }
    }
    featured
    latest
    publishStatus
    seoTitle
    seoDescription
  }
`

// ─── Episodes ─────────────────────────────────────────────────────────────────

export async function getAllEpisodes(): Promise<WPEpisode[]> {
  const data = await fetchAPI<{ episodes: { nodes: WPEpisode[] } }>(`
    query GetAllEpisodes {
      episodes(first: 100, where: { orderby: { field: DATE, order: DESC } }) {
        nodes {
          ${EPISODE_FIELDS}
        }
      }
    }
  `)
  // WordPress only returns published posts by default — no extra filter needed
  return data.episodes.nodes
}

export async function getFeaturedEpisode(): Promise<WPEpisode | null> {
  const episodes = await getAllEpisodes()
  return episodes.find((ep) => ep.episodeFields.featured) ?? episodes[0] ?? null
}

export async function getEpisodeBySlug(slug: string): Promise<WPEpisode | null> {
  const data = await fetchAPI<{ episode: WPEpisode | null }>(`
    query GetEpisodeBySlug($slug: ID!) {
      episode(id: $slug, idType: SLUG) {
        ${EPISODE_FIELDS}
      }
    }
  `, { slug })
  return data.episode
}

export async function getEpisodeSlugs(): Promise<string[]> {
  const episodes = await getAllEpisodes()
  return episodes.map((ep) => ep.slug)
}

export async function getPsalmCategories(): Promise<Array<{ name: string; slug: string }>> {
  try {
    const data = await fetchAPI<{ psalmCategories: { nodes: Array<{ name: string; slug: string }> } }>(`
      query GetPsalmCategories {
        psalmCategories(first: 200) {
          nodes {
            name
            slug
          }
        }
      }
    `)
    return data.psalmCategories.nodes
  } catch {
    return []
  }
}

// ─── Site Settings ─────────────────────────────────────────────────────────────

export async function getSiteSettings(): Promise<WPSiteSettings | null> {
  try {
    const res = await fetch(`${WP_URL}/wp-json/psalmsalive/v1/settings`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

// ─── Contact Form ──────────────────────────────────────────────────────────────

export async function submitContactForm(data: {
  name: string
  email: string
  message: string
}): Promise<boolean> {
  const res = await fetch(`${WP_URL}/wp-json/psalmsalive/v1/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.ok
}

// ─── Page Content ─────────────────────────────────────────────────────────────

export interface WPHomepageContent {
  heroHeadline: string
  heroSubheadline: string
  heroButtonText: string
  visionHeadline: string
  visionBody: string
  ctaHeadline: string
  ctaSubtext: string
  scriptureQuote: string
  scriptureReference: string
}

export interface WPAboutContent {
  pageHeadline: string
  founderName: string
  founderBio: string
  platformDescription: string
  visionText: string
  scriptureQuote: string
  scriptureReference: string
}

export interface WPFaithJourneyContent {
  pageHeadline: string
  introText: string
  hopeTitle: string
  hopeText: string
  reflectionTitle: string
  reflectionText: string
  communityTitle: string
  communityText: string
}

export async function getHomepageContent(): Promise<WPHomepageContent | null> {
  try {
    const res = await fetch(WP_GRAPHQL_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `query GetHomepage {
          pages(where: { title: "Home" }) {
            nodes {
              homepageFields {
                heroHeadline heroSubheadline heroButtonText
                visionHeadline visionBody ctaHeadline ctaSubtext
                scriptureQuote scriptureReference
              }
            }
          }
        }`
      }),
      cache: 'no-store',
    })
    const json = await res.json()
    if (json.errors || !json.data) return null
    return json.data.pages?.nodes?.[0]?.homepageFields ?? null
  } catch { return null }
}

export async function getAboutContent(): Promise<WPAboutContent | null> {
  try {
    const res = await fetch(WP_GRAPHQL_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `query GetAbout {
          pages(where: { title: "About" }) {
            nodes {
              aboutFields {
                pageHeadline founderName founderBio
                platformDescription visionText
                scriptureQuote scriptureReference
              }
            }
          }
        }`
      }),
      cache: 'no-store',
    })
    const json = await res.json()
    if (json.errors || !json.data) return null
    return json.data.pages?.nodes?.[0]?.aboutFields ?? null
  } catch { return null }
}

export async function getFaithJourneyContent(): Promise<WPFaithJourneyContent | null> {
  try {
    const res = await fetch(WP_GRAPHQL_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `query GetFaithJourney {
          pages(where: { title: "Faith Journey" }) {
            nodes {
              faithJourneyFields {
                pageHeadline introText
                hopeTitle hopeText
                reflectionTitle reflectionText
                communityTitle communityText
              }
            }
          }
        }`
      }),
      cache: 'no-store',
    })
    const json = await res.json()
    if (json.errors || !json.data) return null
    return json.data.pages?.nodes?.[0]?.faithJourneyFields ?? null
  } catch { return null }
}

// ─── Static Fallback Data ─────────────────────────────────────────────────────

export const STATIC_EPISODES: WPEpisode[] = [
  {
    id: '1', slug: 'the-shepherds-promise', title: "The Shepherd's Promise",
    featuredImage: null, psalmCategories: { nodes: [{ name: 'Psalm 23', slug: 'psalm-23' }] },
    episodeFields: {
      psalmReference: 'Psalm 23', psalmNumber: 23, duration: '8 min',
      description: 'A story of trust and divine guidance in uncertain seasons.',
      reflection: 'Where are you placing your trust in this season?',
      videoUrl: '', thumbnailGradient: 'from-[#0f1a2e] to-[#0a1020]', thumbnailImage: null,
      featured: true, latest: true, publishStatus: 'published',
      seoTitle: "The Shepherd's Promise | Psalm 23 | Psalms Alive",
      seoDescription: "Watch The Shepherd's Promise — a visual story inspired by Psalm 23.",
    },
  },
  {
    id: '2', slug: 'light-in-darkness', title: 'Light in Darkness',
    featuredImage: null, psalmCategories: { nodes: [{ name: 'Psalm 27', slug: 'psalm-27' }] },
    episodeFields: {
      psalmReference: 'Psalm 27', psalmNumber: 27, duration: '7 min',
      description: 'David cries out from a place of fear, yet makes a bold declaration.',
      reflection: 'What are you afraid of today? The Lord is your light.',
      videoUrl: '', thumbnailGradient: 'from-[#0d1a2a] to-[#1a2e45]', thumbnailImage: null,
      featured: false, latest: false, publishStatus: 'published',
      seoTitle: 'Light in Darkness | Psalm 27 | Psalms Alive',
      seoDescription: 'Watch Light in Darkness — a visual story inspired by Psalm 27.',
    },
  },
  {
    id: '3', slug: 'god-our-refuge', title: 'God Our Refuge',
    featuredImage: null, psalmCategories: { nodes: [{ name: 'Psalm 46', slug: 'psalm-46' }] },
    episodeFields: {
      psalmReference: 'Psalm 46', psalmNumber: 46, duration: '9 min',
      description: 'When the earth gives way, the sons of Korah declare: God is our refuge.',
      reflection: 'In what area of your life do you need to be still?',
      videoUrl: '', thumbnailGradient: 'from-[#111a0f] to-[#1e2d1a]', thumbnailImage: null,
      featured: false, latest: false, publishStatus: 'published',
      seoTitle: 'God Our Refuge | Psalm 46 | Psalms Alive',
      seoDescription: 'Watch God Our Refuge — a visual story inspired by Psalm 46.',
    },
  },
  {
    id: '4', slug: 'under-his-wings', title: 'Under His Wings',
    featuredImage: null, psalmCategories: { nodes: [{ name: 'Psalm 91', slug: 'psalm-91' }] },
    episodeFields: {
      psalmReference: 'Psalm 91', psalmNumber: 91, duration: '10 min',
      description: 'A story of protection, presence, and the shelter found only in God.',
      reflection: 'Are you living under His shadow or in your own strength?',
      videoUrl: '', thumbnailGradient: 'from-[#1a1208] to-[#2a1e0c]', thumbnailImage: null,
      featured: false, latest: false, publishStatus: 'published',
      seoTitle: 'Under His Wings | Psalm 91 | Psalms Alive',
      seoDescription: 'Watch Under His Wings — a visual story inspired by Psalm 91.',
    },
  },
  {
    id: '5', slug: 'the-keeper-of-israel', title: 'The Keeper of Israel',
    featuredImage: null, psalmCategories: { nodes: [{ name: 'Psalm 121', slug: 'psalm-121' }] },
    episodeFields: {
      psalmReference: 'Psalm 121', psalmNumber: 121, duration: '6 min',
      description: 'A pilgrim lifts his eyes to the hills: where does my help come from?',
      reflection: 'Where do you look for help? Our help comes from the Lord.',
      videoUrl: '', thumbnailGradient: 'from-[#0a1525] to-[#152540]', thumbnailImage: null,
      featured: false, latest: false, publishStatus: 'published',
      seoTitle: 'The Keeper of Israel | Psalm 121 | Psalms Alive',
      seoDescription: 'Watch The Keeper of Israel — a visual story inspired by Psalm 121.',
    },
  },
  {
    id: '6', slug: 'known-completely', title: 'Known Completely',
    featuredImage: null, psalmCategories: { nodes: [{ name: 'Psalm 139', slug: 'psalm-139' }] },
    episodeFields: {
      psalmReference: 'Psalm 139', psalmNumber: 139, duration: '8 min',
      description: 'Before a word is on your tongue, He knows it. You are fully known.',
      reflection: 'How does it change things to know God sees you completely?',
      videoUrl: '', thumbnailGradient: 'from-[#181010] to-[#2a1a1a]', thumbnailImage: null,
      featured: false, latest: false, publishStatus: 'published',
      seoTitle: 'Known Completely | Psalm 139 | Psalms Alive',
      seoDescription: 'Watch Known Completely — a visual story inspired by Psalm 139.',
    },
  },
]