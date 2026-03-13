import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

const siteUrl = 'https://psalms-alive.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: 'Psalms Alive – Where Scripture Meets Story',
    template: '%s | Psalms Alive',
  },
  description:
    'Psalms Alive brings the Book of Psalms to life through short dramatic video episodes and comic-style visual storytelling. Watch, reflect, and grow in faith.',
  keywords: [
    'Psalms Alive',
    'Book of Psalms',
    'Bible storytelling',
    'faith videos',
    'Christian devotional',
    'scripture series',
    'visual Bible',
    'Psalm 23',
    'faith journey',
    'Atley Adejola',
    'Avario Digitals',
  ],
  authors: [{ name: 'Avario Digitals', url: siteUrl }],
  creator: 'Avario Digitals',
  publisher: 'Psalms Alive',

  // Canonical
  alternates: {
    canonical: siteUrl,
  },

  // Open Graph — controls WhatsApp, Facebook, LinkedIn previews
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'Psalms Alive – Where Scripture Meets Story',
    description:
      'Experience the Psalms through powerful visual storytelling. Short dramatic episodes and comic-style narratives that connect scripture with everyday life.',
    siteName: 'Psalms Alive',
    locale: 'en_US',
  },

  // Twitter / X card
  twitter: {
    card: 'summary_large_image',
    title: 'Psalms Alive – Where Scripture Meets Story',
    description:
      'Experience the Psalms through powerful visual storytelling. Short dramatic episodes that connect scripture with everyday life.',
    site: '@psalmsalive',
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Theme colour (browser tab bar on mobile)
  themeColor: '#0B1F3A',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}