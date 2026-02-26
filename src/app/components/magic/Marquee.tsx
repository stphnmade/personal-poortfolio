import type { CSSProperties, ReactNode } from 'react'
import { cn } from '@/app/components/ui/utils'

interface MarqueeProps {
  items: ReactNode[]
  className?: string
  itemClassName?: string
  speedSeconds?: number
  pauseOnHover?: boolean
  reverse?: boolean
}

export function Marquee({
  items,
  className,
  itemClassName,
  speedSeconds = 22,
  pauseOnHover = true,
  reverse = false,
}: MarqueeProps) {
  const doubled = [...items, ...items]

  return (
    <div
      className={cn('magic-marquee', className)}
      data-reverse={reverse ? 'true' : 'false'}
      style={{ '--magic-marquee-duration': `${speedSeconds}s` } as CSSProperties}
    >
      <div className="magic-marquee-track" data-pause={pauseOnHover ? 'true' : 'false'}>
        <div className="flex items-center gap-2 pr-2">
          {doubled.map((item, index) => (
            <div key={`marquee-item-${index}`} className={itemClassName}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
