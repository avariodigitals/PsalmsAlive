import Link from 'next/link'
import { SectionLabel } from '@/components/ui/SectionLabel'

export default function NotFound() {
  return (
    <section className="bg-navy min-h-screen flex items-center justify-center text-center px-6">
      <div>
        <SectionLabel className="text-center block mb-4">404</SectionLabel>
        <h1 className="font-playfair font-bold text-cream text-5xl mb-4">
          Page Not Found
        </h1>
        <div className="w-12 h-px bg-gold mx-auto mb-6" />
        <p className="font-lato text-cream/50 text-base mb-10 max-w-sm mx-auto leading-relaxed">
          &ldquo;Even though I walk through the darkest valley…&rdquo; — let us help
          you find your way back.
        </p>
        <Link
          href="/"
          className="inline-flex font-cinzel text-[0.72rem] tracking-[0.14em] uppercase bg-gold text-navy px-7 py-3.5 hover:bg-gold-light transition-all duration-300 active:scale-95"
        >
          Return Home
        </Link>
      </div>
    </section>
  )
}
