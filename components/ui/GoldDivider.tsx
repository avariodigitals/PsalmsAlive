import { cn } from '@/lib/utils'

export function GoldDivider({ className }: { className?: string }) {
  return (
    <div
      className={cn('w-12 h-[2px] bg-gold my-6', className)}
      aria-hidden="true"
    />
  )
}
