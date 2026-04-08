import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://psalmsalive.com'

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

  alternates: {
    canonical: siteUrl,
  },

  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'Psalms Alive – Where Scripture Meets Story',
    description:
      'Experience the Psalms through powerful visual storytelling. Short dramatic episodes and comic-style narratives that connect scripture with everyday life.',
    siteName: 'Psalms Alive',
    locale: 'en_US',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Psalms Alive – Where Scripture Meets Story',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Psalms Alive – Where Scripture Meets Story',
    description:
      'Experience the Psalms through powerful visual storytelling. Short dramatic episodes that connect scripture with everyday life.',
    site: '@psalmsalive',
    images: [`${siteUrl}/og-image.jpg`],
  },

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

  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png' }],
    other: [
      { rel: 'android-chrome-192x192', url: '/android-chrome-192x192.png' },
      { rel: 'android-chrome-512x512', url: '/android-chrome-512x512.png' },
    ],
  },
}

export const generateViewport = (): Viewport => {
  return {
    themeColor: '#0B1F3A',
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />

        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  )
}