/**
 * WordPress Headless CMS — GraphQL API Client
 * Connects Next.js frontend to cms.psalmsalive.com
 */

const WP_GRAPHQL_URL =
  process.env.NEXT_PUBLIC_WP_GRAPHQL_URL || 'https://cms.psalmsalive.com/graphql'

// ─── Core Fetcher ────────────────────────────────────────────────────────────

async function fetchAPI<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  const res = await fetch(WP_GRAPHQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 }, // ISR: revalidate every 60 seconds
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
  episodeFields: {
    psalmReference: string
    psalmNumber: number
    duration: string
    description: string
    reflection: string
    videoUrl: string
    thumbnailGradient: string
    featured: boolean
    latest: boolean
    publishStatus: string
    seoTitle: string
    seoDescription: string
  }
}

export interface WPSiteSettings {
  siteSettingsFields: {
    email: string
    youtubeUrl: string
    instagramUrl: string
    facebookUrl: string
    tagline: string
    footerText: string
  }
}

export interface WPContactMessage {
  name: string
  email: string
  message: string
}

// ─── Episodes ─────────────────────────────────────────────────────────────────

export async function getAllEpisodes(): Promise<WPEpisode[]> {
  const data = await fetchAPI<{ episodes: { nodes: WPEpisode[] } }>(`
    query GetAllEpisodes {
      episodes(first: 50, where: { orderby: { field: DATE, order: DESC } }) {
        nodes {
          id
          slug
          title
          episodeFields {
            psalmReference
            psalmNumber
            duration
            description
            reflection
            videoUrl
            thumbnailGradient
            featured
            latest
            publishStatus
            seoTitle
            seoDescription
          }
        }
      }
    }
  `)
  return data.episodes.nodes.filter(
    (ep) => ep.episodeFields.publishStatus === 'published'
  )
}

export async function getFeaturedEpisode(): Promise<WPEpisode | null> {
  const episodes = await getAllEpisodes()
  return episodes.find((ep) => ep.episodeFields.featured) ?? episodes[0] ?? null
}

export async function getEpisodeBySlug(slug: string): Promise<WPEpisode | null> {
  const data = await fetchAPI<{ episode: WPEpisode | null }>(`
    query GetEpisodeBySlug($slug: ID!) {
      episode(id: $slug, idType: SLUG) {
        id
        slug
        title
        episodeFields {
          psalmReference
          psalmNumber
          duration
          description
          reflection
          videoUrl
          thumbnailGradient
          featured
          latest
          publishStatus
          seoTitle
          seoDescription
        }
      }
    }
  `, { slug })
  return data.episode
}

export async function getEpisodeSlugs(): Promise<string[]> {
  const episodes = await getAllEpisodes()
  return episodes.map((ep) => ep.slug)
}

// ─── Site Settings ─────────────────────────────────────────────────────────────

export async function getSiteSettings(): Promise<WPSiteSettings | null> {
  try {
    const data = await fetchAPI<{ siteSettings: WPSiteSettings }>(`
      query GetSiteSettings {
        siteSettings {
          siteSettingsFields {
            email
            youtubeUrl
            instagramUrl
            facebookUrl
            tagline
            footerText
          }
        }
      }
    `)
    return data.siteSettings
  } catch {
    return null
  }
}

// ─── Contact Form ──────────────────────────────────────────────────────────────

export async function submitContactForm(data: WPContactMessage): Promise<boolean> {
  // Fluent Forms handles this via REST API, not GraphQL
  const FLUENT_FORMS_URL =
    process.env.NEXT_PUBLIC_WP_URL
      ? `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/fluentform/v1/submit`
      : 'https://cms.psalmsalive.com/wp-json/fluentform/v1/submit'

  const formId = process.env.NEXT_PUBLIC_FLUENT_FORM_ID || '1'

  const formData = new FormData()
  formData.append('form_id', formId)
  formData.append('names[first_name]', data.name)
  formData.append('email', data.email)
  formData.append('message', data.message)

  const res = await fetch(FLUENT_FORMS_URL, {
    method: 'POST',
    body: formData,
  })

  return res.ok
}

// ─── Fallback: Static Data (used while WordPress is not yet connected) ────────

export const STATIC_EPISODES = [
  {
    id: '1',
    slug: 'the-shepherds-promise',
    title: "The Shepherd's Promise",
    episodeFields: {
      psalmReference: 'Psalm 23',
      psalmNumber: 23,
      duration: '8 min',
      description:
        'A story of trust and divine guidance in uncertain seasons. When David faced the valley of shadows, he did not face it alone.',
      reflection:
        'Where are you placing your trust in this season? The Shepherd who led David is the same Shepherd walking with you today.',
      videoUrl: '',
      thumbnailGradient: 'from-[#0f1a2e] to-[#0a1020]',
      featured: true,
      latest: true,
      publishStatus: 'published',
      seoTitle: "The Shepherd's Promise | Psalm 23 | Psalms Alive",
      seoDescription: 'Watch The Shepherd\'s Promise — a visual story inspired by Psalm 23.',
    },
  },
  {
    id: '2',
    slug: 'light-in-darkness',
    title: 'Light in Darkness',
    episodeFields: {
      psalmReference: 'Psalm 27',
      psalmNumber: 27,
      duration: '7 min',
      description:
        'David cries out from a place of fear — surrounded by enemies, facing uncertainty. Yet he makes a bold declaration.',
      reflection:
        'What are you afraid of today? The Lord is your light. You do not have to face your darkest moments alone.',
      videoUrl: '',
      thumbnailGradient: 'from-[#0d1a2a] to-[#1a2e45]',
      featured: false,
      latest: false,
      publishStatus: 'published',
      seoTitle: 'Light in Darkness | Psalm 27 | Psalms Alive',
      seoDescription: 'Watch Light in Darkness — a visual story inspired by Psalm 27.',
    },
  },
  {
    id: '3',
    slug: 'god-our-refuge',
    title: 'God Our Refuge',
    episodeFields: {
      psalmReference: 'Psalm 46',
      psalmNumber: 46,
      duration: '9 min',
      description:
        'When the earth gives way and mountains fall into the sea, the sons of Korah declare one truth: God is our refuge.',
      reflection:
        'In what area of your life do you need to be still and know that He is God?',
      videoUrl: '',
      thumbnailGradient: 'from-[#111a0f] to-[#1e2d1a]',
      featured: false,
      latest: false,
      publishStatus: 'published',
      seoTitle: 'God Our Refuge | Psalm 46 | Psalms Alive',
      seoDescription: 'Watch God Our Refuge — a visual story inspired by Psalm 46.',
    },
  },
  {
    id: '4',
    slug: 'under-his-wings',
    title: 'Under His Wings',
    episodeFields: {
      psalmReference: 'Psalm 91',
      psalmNumber: 91,
      duration: '10 min',
      description:
        'A story of protection, presence, and the shelter only found in God. Psalm 91 has comforted generations.',
      reflection:
        'Are you living under His shadow or trying to stand in your own strength?',
      videoUrl: '',
      thumbnailGradient: 'from-[#1a1208] to-[#2a1e0c]',
      featured: false,
      latest: false,
      publishStatus: 'published',
      seoTitle: 'Under His Wings | Psalm 91 | Psalms Alive',
      seoDescription: 'Watch Under His Wings — a visual story inspired by Psalm 91.',
    },
  },
  {
    id: '5',
    slug: 'the-keeper-of-israel',
    title: 'The Keeper of Israel',
    episodeFields: {
      psalmReference: 'Psalm 121',
      psalmNumber: 121,
      duration: '6 min',
      description:
        'A pilgrim lifts his eyes to the hills and asks the ancient question: where does my help come from?',
      reflection:
        'Where do you look for help? This episode reminds us that our help comes from the Lord.',
      videoUrl: '',
      thumbnailGradient: 'from-[#0a1525] to-[#152540]',
      featured: false,
      latest: false,
      publishStatus: 'published',
      seoTitle: 'The Keeper of Israel | Psalm 121 | Psalms Alive',
      seoDescription: 'Watch The Keeper of Israel — a visual story inspired by Psalm 121.',
    },
  },
  {
    id: '6',
    slug: 'known-completely',
    title: 'Known Completely',
    episodeFields: {
      psalmReference: 'Psalm 139',
      psalmNumber: 139,
      duration: '8 min',
      description:
        'Before a word is on your tongue, He knows it. Psalm 139 is the most intimate Psalm — a meditation on being fully known.',
      reflection:
        'How does it change things to know that God sees you completely and still chooses you?',
      videoUrl: '',
      thumbnailGradient: 'from-[#181010] to-[#2a1a1a]',
      featured: false,
      latest: false,
      publishStatus: 'published',
      seoTitle: 'Known Completely | Psalm 139 | Psalms Alive',
      seoDescription: 'Watch Known Completely — a visual story inspired by Psalm 139.',
    },
  },
]