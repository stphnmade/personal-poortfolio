import { cn } from '@/app/components/ui/utils'

interface RetroGridProps {
  className?: string
}

export function RetroGrid({ className }: RetroGridProps) {
  return (
    <div aria-hidden="true" className={cn('magic-retro-grid', className)}>
      <div className="magic-retro-grid-glow" />
      <div className="magic-retro-grid-plane" />
    </div>
  )
}
