import { cn } from '@/lib/utils'

interface SectionLabelProps {
  children: React.ReactNode
  className?: string
  light?: boolean
}

export function SectionLabel({ children, className, light }: SectionLabelProps) {
  return (
    <span
      className={cn(
        'font-cinzel text-[0.68rem] tracking-[0.28em] uppercase block mb-3',
        light ? 'text-gold/80' : 'text-gold',
        className
      )}
    >
      {children}
    </span>
  )
}
