import type { CSSProperties } from 'react'

interface BorderBeamProps {
  duration?: number
  className?: string
}

export function BorderBeam({ duration = 5.4, className }: BorderBeamProps) {
  return (
    <span
      aria-hidden="true"
      className={['magic-border-beam', className].filter(Boolean).join(' ')}
      style={{ '--magic-beam-duration': `${duration}s` } as CSSProperties}
    />
  )
}
