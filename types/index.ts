export interface Episode {
  id: string
  slug: string
  psalmNumber: number
  psalmReference: string
  title: string
  description: string
  reflection: string
  videoUrl?: string
  thumbnailGradient: string
  duration?: string
  featured?: boolean
}

export interface NavLink {
  label: string
  href: string
}

export interface SocialShare {
  platform: 'whatsapp' | 'facebook' | 'twitter' | 'copy'
  label: string
  url: string
}
