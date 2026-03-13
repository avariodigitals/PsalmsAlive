'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: wire to API route or service (e.g. Resend, Formspree)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <p className="font-playfair italic text-gold text-2xl mb-3">
          Thank you, {form.name}.
        </p>
        <p className="font-lato text-brown text-sm">
          We&apos;ll be in touch with you soon. Grace and peace.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-xl mx-auto">
      <div>
        <label className="font-cinzel text-[0.65rem] tracking-[0.2em] uppercase text-brown block mb-2">
          Your Name
        </label>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          placeholder="Full name"
          className="w-full border border-brown/20 bg-white px-4 py-3 font-lato text-navy text-sm placeholder:text-brown/30 focus:outline-none focus:border-gold transition-colors duration-200"
        />
      </div>
      <div>
        <label className="font-cinzel text-[0.65rem] tracking-[0.2em] uppercase text-brown block mb-2">
          Email Address
        </label>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          placeholder="your@email.com"
          className="w-full border border-brown/20 bg-white px-4 py-3 font-lato text-navy text-sm placeholder:text-brown/30 focus:outline-none focus:border-gold transition-colors duration-200"
        />
      </div>
      <div>
        <label className="font-cinzel text-[0.65rem] tracking-[0.2em] uppercase text-brown block mb-2">
          Message
        </label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          placeholder="Share your thoughts, prayer requests, or inquiries..."
          className="w-full border border-brown/20 bg-white px-4 py-3 font-lato text-navy text-sm placeholder:text-brown/30 focus:outline-none focus:border-gold transition-colors duration-200 resize-none"
        />
      </div>
      <button
        type="submit"
        className="self-start flex items-center gap-2 font-cinzel text-[0.72rem] tracking-[0.14em] uppercase bg-gold text-navy px-7 py-3.5 hover:bg-gold-light transition-all duration-300 active:scale-95"
      >
        <Send size={14} />
        Send Message
      </button>
    </form>
  )
}
