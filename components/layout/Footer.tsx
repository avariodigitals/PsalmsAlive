import Link from 'next/link'
import Image from 'next/image'
import { getSiteSettings } from '@/lib/api'

const exploreLinks = [
  { label: 'Home', href: '/' },
  { label: 'Episodes', href: '/episodes' },
  { label: 'About', href: '/about' },
  { label: 'Faith Journey', href: '/faith-journey' },
]

export async function Footer() {
  const settings = await getSiteSettings()

  const connectLinks = [
    { label: 'Contact Us', href: '/contact' },
    { label: 'YouTube', href: settings?.youtube || '#youtube' },
    { label: 'Instagram', href: settings?.instagram || '#instagram' },
    { label: 'Facebook', href: settings?.facebook || '#facebook' },
  ]

  const email = settings?.email || 'info@psalmsalive.com'
  const tagline = settings?.tagline || 'Where Scripture Meets Story'

  return (
    <footer className="bg-[#060f1d] border-t border-gold/10">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <Link href="/" className="flex items-center mb-4 w-fit group">
              <Image src="/logo.png" alt="Psalms Alive" width={130} height={46} className="h-9 w-auto opacity-90 group-hover:opacity-100 transition-opacity duration-200" />
            </Link>
            <p className="font-lato text-cream/40 text-sm leading-relaxed max-w-xs">
              A faith storytelling platform bringing the Book of Psalms to life through dramatic visual storytelling. Created by{' '}
              <a href="https://avariodigitals.com/" target="_blank" rel="noopener noreferrer" className="text-gold/60 hover:text-gold transition-colors duration-200">Avario Digitals</a>.
            </p>
          </div>
          <div>
            <h4 className="font-cinzel text-[0.65rem] tracking-[0.22em] uppercase text-gold mb-5">Explore</h4>
            <ul className="flex flex-col gap-3">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="font-lato text-cream/45 text-sm hover:text-gold transition-colors duration-200">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-cinzel text-[0.65rem] tracking-[0.22em] uppercase text-gold mb-5">Connect</h4>
            <ul className="flex flex-col gap-3">
              {connectLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="font-lato text-cream/45 text-sm hover:text-gold transition-colors duration-200">{link.label}</Link>
                </li>
              ))}
              <li>
                <a href={`mailto:${email}`} className="font-lato text-cream/45 text-sm hover:text-gold transition-colors duration-200">{email}</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-cream/6 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-lato text-cream/25 text-xs">
            © {new Date().getFullYear()} Psalms Alive · Created by{' '}
            <a href="https://avariodigitals.com/" target="_blank" rel="noopener noreferrer" className="hover:text-gold/60 transition-colors duration-200">Avario Digitals</a>
            {' '}· All rights reserved.
          </p>
          <p className="font-cinzel text-gold/30 text-[0.6rem] tracking-[0.2em] uppercase">{tagline}</p>
        </div>
      </div>
    </footer>
  )
}