'use client'

import { cn } from '@/lib/utils'

interface PlayButtonProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
}

export function PlayButton({ size = 'md', className, onClick }: PlayButtonProps) {
  const sizes = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
  }
  const iconSizes = { sm: 'w-4 h-4', md: 'w-5 h-5', lg: 'w-8 h-8' }

  return (
    <button
      onClick={onClick}
      aria-label="Play episode"
      className={cn(
        'rounded-full bg-gold/90 hover:bg-gold flex items-center justify-center',
        'transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg',
        sizes[size],
        className
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="#0B1F3A"
        className={cn('ml-[3px]', iconSizes[size])}
      >
        <polygon points="5,3 19,12 5,21" />
      </svg>
    </button>
  )
}
