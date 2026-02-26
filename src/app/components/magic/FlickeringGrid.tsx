import { useMemo } from 'react'
import type { CSSProperties } from 'react'
import { cn } from '@/app/components/ui/utils'

interface FlickeringGridProps {
  className?: string
  cellCount?: number
  gridSize?: number
}

export function FlickeringGrid({
  className,
  cellCount = 26,
  gridSize = 34,
}: FlickeringGridProps) {
  const cells = useMemo(
    () =>
      Array.from({ length: cellCount }).map((_, index) => {
        const seed = Math.abs(Math.sin((index + 1) * 91.337))
        const seed2 = Math.abs(Math.cos((index + 1) * 47.213))
        const seed3 = Math.abs(Math.sin((index + 1) * 19.871))
        return {
          key: `flicker-cell-${index}`,
          left: `${8 + seed * 84}%`,
          top: `${6 + seed2 * 86}%`,
          size: 2 + Math.round(seed3 * 2),
          delay: `${(seed * 2.3).toFixed(2)}s`,
          duration: `${(1.8 + seed2 * 2.2).toFixed(2)}s`,
        }
      }),
    [cellCount],
  )

  return (
    <div
      aria-hidden="true"
      className={cn('magic-flickering-grid pointer-events-none', className)}
      style={{ '--magic-grid-size': `${gridSize}px` } as CSSProperties}
    >
      {cells.map((cell) => (
        <span
          key={cell.key}
          className="magic-flickering-cell"
          style={{
            left: cell.left,
            top: cell.top,
            width: `${cell.size}px`,
            height: `${cell.size}px`,
            animationDelay: cell.delay,
            animationDuration: cell.duration,
          }}
        />
      ))}
    </div>
  )
}
