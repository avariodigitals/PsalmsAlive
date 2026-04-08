const WP_BASE = process.env.WORDPRESS_API_URL

if (!WP_BASE) {
  throw new Error("WORDPRESS_API_URL is not set")
}

export async function getEpisodes() {
  const res = await fetch(`${WP_BASE}/episodes?_embed`, {
    next: { tags: ["episodes"] },
  })

  if (!res.ok) {
    throw new Error("Failed to fetch episodes")
  }

  return res.json()
}

export async function getEpisodeBySlug(slug: string) {
  const res = await fetch(`${WP_BASE}/episodes?slug=${slug}&_embed`, {
    next: { tags: [`episode-${slug}`] },
  })

  if (!res.ok) {
    throw new Error("Failed to fetch episode")
  }

  const data = await res.json()
  return data[0] || null
}

export async function getPages() {
  const res = await fetch(`${WP_BASE}/pages`, {
    next: { tags: ["pages"] },
  })

  if (!res.ok) {
    throw new Error("Failed to fetch pages")
  }

  return res.json()
}

export async function getPosts() {
  const res = await fetch(`${WP_BASE}/posts?_embed`, {
    next: { tags: ["posts"] },
  })

  if (!res.ok) {
    throw new Error("Failed to fetch posts")
  }

  return res.json()
}