import { motion, type MotionValue, useTransform } from 'motion/react'
import { CHAPTERS } from '@/constants/chapters'

interface SkyCanvasProps {
  scrollYProgress: MotionValue<number>
}

const EXPERIENCE = CHAPTERS.find((c) => c.id === 'experience')!
const LANDING = CHAPTERS.find((c) => c.id === 'landing')!

export function SkyCanvas({ scrollYProgress }: SkyCanvasProps) {
  const skyProgress = useTransform(
    scrollYProgress,
    [EXPERIENCE.start, LANDING.end],
    [0, 1],
  )

  const tintOpacity = useTransform(skyProgress, [0.8, 1], [0, 1])
  const cloudNearX = useTransform(skyProgress, [0, 1], [0, -120])
  const cloudFarX = useTransform(skyProgress, [0, 1], [0, -60])
  const birdX = useTransform(skyProgress, [0, 1], [80, -80])
  const birdY = useTransform(skyProgress, [0, 1], [-40, 40])

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-gradient-to-b from-[#8EC5FC] via-[#CFE9FF] to-[#E4F2FF]">
      {/* Warm tint as we approach the beach */}
      <motion.div
        className="absolute inset-0 bg-[#FFF7E6]"
        style={{ opacity: tintOpacity }}
      />

      {/* Far clouds */}
      <motion.div
        className="absolute left-[-25%] top-[15%] h-40 w-96 rounded-full bg-white/70 blur-sm"
        style={{ x: cloudFarX }}
      />
      <motion.div
        className="absolute right-[-30%] top-[35%] h-28 w-72 rounded-full bg-white/70 blur-sm"
        style={{ x: cloudFarX }}
      />

      {/* Near clouds */}
      <motion.div
        className="absolute left-[-15%] top-[55%] h-40 w-[28rem] rounded-full bg-white/90 blur-[2px]"
        style={{ x: cloudNearX }}
      />
      <motion.div
        className="absolute right-[-20%] top-[8%] h-32 w-[22rem] rounded-full bg-white/90 blur-[2px]"
        style={{ x: cloudNearX }}
      />

      {/* Bird silhouette */}
      <motion.div
        className="absolute left-1/2 top-1/4"
        style={{ x: birdX, y: birdY }}
      >
        <div className="relative h-4 w-6">
          <div className="absolute left-0 top-1/2 h-1.5 w-3 -translate-y-1/2 -rotate-12 rounded-full bg-white" />
          <div className="absolute right-0 top-1/2 h-1.5 w-3 -translate-y-1/2 rotate-12 rounded-full bg-white" />
        </div>
      </motion.div>
    </div>
  )
}
