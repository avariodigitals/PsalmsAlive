'use client'

import { cn } from '@/lib/utils'
import { type ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center font-cinzel tracking-widest uppercase transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold disabled:opacity-50 disabled:pointer-events-none cursor-pointer'

    const variants = {
      primary:
        'bg-gold text-navy hover:bg-gold-light active:scale-[0.98] shadow-md hover:shadow-lg',
      outline:
        'border border-cream/40 text-cream hover:border-gold hover:text-gold bg-transparent',
      ghost:
        'text-gold hover:text-gold-light bg-transparent underline-offset-4 hover:underline',
    }

    const sizes = {
      sm: 'text-[0.65rem] px-4 py-2.5',
      md: 'text-[0.72rem] px-6 py-3',
      lg: 'text-[0.78rem] px-8 py-4',
    }

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
export { Button }
