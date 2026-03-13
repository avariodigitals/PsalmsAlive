import Link from 'next/link'

const footerNav = {
  Explore: [
    { label: 'Home', href: '/' },
    { label: 'Episodes', href: '/episodes' },
    { label: 'About', href: '/about' },
    { label: 'Faith Journey', href: '/faith-journey' },
  ],
  Connect: [
    { label: 'Contact Us', href: '/contact' },
    { label: 'YouTube', href: '#' },
    { label: 'Instagram', href: '#' },
    { label: 'Facebook', href: '#' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-[#060f1d] border-t border-gold/10">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-4 group w-fit">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#C9A54C"
                strokeWidth="1.5"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
              <span className="font-playfair text-cream text-lg">
                Psalms<span className="text-gold italic"> Alive</span>
              </span>
            </Link>
            <p className="font-lato text-cream/40 text-sm leading-relaxed max-w-xs">
              A faith storytelling platform bringing the Book of Psalms to life through
              dramatic visual storytelling. Created by Atley Adejola.
            </p>
          </div>

          {/* Nav columns */}
          {Object.entries(footerNav).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="font-cinzel text-[0.65rem] tracking-[0.22em] uppercase text-gold mb-5">
                {heading}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-lato text-cream/45 text-sm hover:text-gold transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-cream/6 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-lato text-cream/25 text-xs">
            © {new Date().getFullYear()} Psalms Alive · Created by Atley Adejola · All rights reserved.
          </p>
          <p className="font-cinzel text-gold/30 text-[0.6rem] tracking-[0.2em] uppercase">
            Where Scripture Meets Story
          </p>
        </div>
      </div>
    </footer>
  )
}
