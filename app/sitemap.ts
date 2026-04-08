import type { MetadataRoute } from "next"
import { getEpisodes, getPages, getPosts } from "@/lib/wordpress"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://psalmsalive.com"

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/faith-journey`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/episodes`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ]

  const [episodes, posts, pages] = await Promise.all([
    getEpisodes().catch(() => []),
    getPosts().catch(() => []),
    getPages().catch(() => []),
  ])

  const episodeRoutes: MetadataRoute.Sitemap = episodes.map((item: any) => ({
    url: `${siteUrl}/episodes/${item.slug}`,
    lastModified: new Date(item.modified || item.date),
    changeFrequency: "weekly",
    priority: 0.8,
  }))

  const postRoutes: MetadataRoute.Sitemap = posts.map((item: any) => ({
    url: `${siteUrl}/blog/${item.slug}`,
    lastModified: new Date(item.modified || item.date),
    changeFrequency: "weekly",
    priority: 0.7,
  }))

  const pageRoutes: MetadataRoute.Sitemap = pages
    .filter((item: any) => !["about", "contact"].includes(item.slug))
    .map((item: any) => ({
      url: `${siteUrl}/${item.slug}`,
      lastModified: new Date(item.modified || item.date),
      changeFrequency: "monthly",
      priority: 0.6,
    }))

  return [...staticRoutes, ...episodeRoutes, ...postRoutes, ...pageRoutes]
}