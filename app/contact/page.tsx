import { ContactForm } from '@/components/sections/ContactForm'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GoldDivider } from '@/components/ui/GoldDivider'
import { Mail, Youtube, Instagram, Facebook } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact – Psalms Alive',
  description: 'Get in touch with the Psalms Alive community. Share your story, ask questions, or join the journey.',
}

const socials = [
  { label: 'YouTube', icon: Youtube, href: '#', handle: '@PsalmsAlive' },
  { label: 'Instagram', icon: Instagram, href: '#', handle: '@psalms.alive' },
  { label: 'Facebook', icon: Facebook, href: '#', handle: 'Psalms Alive' },
]

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy pt-36 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(201,165,76,0.06)_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative">
          <SectionLabel className="text-center block">Community</SectionLabel>
          <h1
            className="font-playfair font-bold text-cream leading-snug"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}
          >
            Connect With{' '}
            <em className="italic text-gold">Us</em>
          </h1>
          <GoldDivider className="mx-auto" />
          <p className="font-lato text-cream/60 text-lg max-w-2xl mx-auto leading-relaxed">
            Whether you have a question, a prayer request, or simply want to share
            how Psalms Alive has impacted your faith journey — we&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact layout */}
      <section className="bg-cream py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-16">

            {/* Left — info */}
            <div>
              <SectionLabel>Reach Out</SectionLabel>
              <h2 className="font-playfair font-semibold text-navy text-3xl mb-4">
                We&apos;d love to hear your story
              </h2>
              <GoldDivider />
              <p className="font-lato text-brown text-sm leading-relaxed mb-8">
                Psalms Alive is more than a platform — it is a community of people
                walking through real life with scripture as their guide. Share your
                thoughts, questions, or feedback with us.
              </p>

              {/* Email */}
              <div className="flex items-start gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail size={16} stroke="#C9A54C" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-cinzel text-[0.62rem] tracking-[0.18em] uppercase text-gold mb-1">
                    Email Us
                  </p>
                  <a
                    href="mailto:hello@psalmsalive.com"
                    className="font-lato text-brown text-sm hover:text-gold transition-colors duration-200"
                  >
                    hello@psalmsalive.com
                  </a>
                </div>
              </div>

              {/* Socials */}
              <div>
                <p className="font-cinzel text-[0.62rem] tracking-[0.2em] uppercase text-gold mb-4">
                  Follow the Journey
                </p>
                <div className="flex flex-col gap-3">
                  {socials.map((s) => {
                    const Icon = s.icon
                    return (
                      <a
                        key={s.label}
                        href={s.href}
                        className="flex items-center gap-3 group"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="w-9 h-9 border border-gold/20 flex items-center justify-center group-hover:border-gold group-hover:bg-gold/5 transition-all duration-200">
                          <Icon size={14} className="text-brown/60 group-hover:text-gold transition-colors duration-200" strokeWidth={1.5} />
                        </div>
                        <div>
                          <p className="font-cinzel text-[0.6rem] tracking-[0.15em] uppercase text-brown/50 group-hover:text-gold transition-colors duration-200">
                            {s.label}
                          </p>
                          <p className="font-lato text-xs text-brown/40">{s.handle}</p>
                        </div>
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Right — form */}
            <div>
              <SectionLabel>Send a Message</SectionLabel>
              <h2 className="font-playfair font-semibold text-navy text-2xl mb-6">
                Get in Touch
              </h2>
              <ContactForm />
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
