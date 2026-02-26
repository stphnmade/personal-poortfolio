import { cn } from '@/app/components/ui/utils'

interface ScrollProgressMarker {
  id: string
  label: string
}

interface ScrollProgressProps {
  progress: number
  markers: ScrollProgressMarker[]
  activeIndex: number
  onMarkerClick?: (id: string) => void
  className?: string
}

export function ScrollProgress({
  progress,
  markers,
  activeIndex,
  onMarkerClick,
  className,
}: ScrollProgressProps) {
  const clampedProgress = Math.max(0, Math.min(1, progress))
  const total = Math.max(1, markers.length)

  return (
    <div
      className={cn(
        'relative w-14 rounded-2xl border border-white/15 bg-black/35 p-3 backdrop-blur',
        className,
      )}
      aria-label="Story scroll progress"
    >
      <div className="relative mx-auto h-64 w-8">
        <div className="absolute left-1/2 top-2 bottom-2 w-px -translate-x-1/2 bg-white/15" />
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-2 w-px -translate-x-1/2 bg-gradient-to-b from-[#59A96A] via-[#0F86FF] to-[#F19A3E]"
          style={{ height: `${Math.max(0, clampedProgress * (100 - 12))}%` }}
        />

        {markers.map((marker, index) => {
          const denominator = Math.max(1, total - 1)
          const topPct = 8 + ((84 * index) / denominator)
          const isCurrent = index === activeIndex
          const isComplete = index < activeIndex
          return (
            <button
              key={marker.id}
              type="button"
              onClick={() => onMarkerClick?.(marker.id)}
              className="group absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ top: `${topPct}%` }}
              aria-label={`Go to ${marker.label}`}
              title={marker.label}
            >
              <span
                className={cn(
                  'block h-3 w-3 rounded-full border transition-all duration-200',
                  isCurrent
                    ? 'scale-110 border-[#59A96A] bg-[#59A96A] shadow-[0_0_12px_rgba(89,169,106,0.5)]'
                    : isComplete
                    ? 'border-[#0F86FF] bg-[#0F86FF]'
                    : 'border-white/35 bg-white/15 group-hover:bg-white/30',
                )}
              />
            </button>
          )
        })}
      </div>

      <div className="mt-2 text-center text-[10px] font-semibold text-white/90">
        {Math.round(clampedProgress * 100)}%
      </div>
    </div>
  )
}
