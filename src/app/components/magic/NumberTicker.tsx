import { useEffect, useRef, useState } from 'react'
import { cn } from '@/app/components/ui/utils'

interface NumberTickerProps {
  value: number
  className?: string
  durationMs?: number
  prefix?: string
  suffix?: string
}

export function NumberTicker({
  value,
  className,
  durationMs = 900,
  prefix = '',
  suffix = '',
}: NumberTickerProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const start = performance.now()
    const from = 0
    const to = value

    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(1, elapsed / durationMs)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayValue(Math.round(from + (to - from) * eased))
      if (progress < 1) {
        rafRef.current = window.requestAnimationFrame(tick)
      }
    }

    rafRef.current = window.requestAnimationFrame(tick)
    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current)
      }
    }
  }, [durationMs, value])

  return (
    <span className={cn('tabular-nums', className)}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  )
}
