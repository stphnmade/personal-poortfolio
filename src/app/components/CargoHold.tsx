import { motion, useTransform, type MotionValue } from 'motion/react'
import { CHAPTERS } from '@/constants/chapters'

interface CargoHoldProps {
  scrollYProgress: MotionValue<number>
  onJump: () => void
}

export function CargoHold({ scrollYProgress, onJump }: CargoHoldProps) {
  const about = CHAPTERS.find((c) => c.id === 'about')!
  const doors = CHAPTERS.find((c) => c.id === 'doors')!

  const planeWallLeftX = useTransform(
    scrollYProgress,
    [about.start, doors.end],
    [0, -1000],
  )
  const planeWallRightX = useTransform(
    scrollYProgress,
    [about.start, doors.end],
    [0, 1000],
  )
  const contentOpacity = useTransform(
    scrollYProgress,
    [about.start, doors.start, doors.end, doors.end + 0.05],
    [0, 1, 1, 0],
  )

  return (
    <motion.div
      className="sticky top-0 flex h-[100vh] items-center justify-center overflow-hidden bg-transparent"
    >
      {/* Plane Interior - Layer A */}
      <motion.div
        style={{ x: planeWallLeftX }}
        className="absolute left-0 z-20 h-full w-1/2 bg-gradient-to-br from-[#3B413C] to-[#22272B]"
      >
        {/* Left door details */}
        <div className="relative flex h-full w-full items-center justify-center">
          <div className="absolute inset-y-10 left-6 flex flex-col justify-between">
            <div className="flex gap-2">
              <span className="h-2 w-2 rounded-full bg-[#59A96A]" />
              <span className="h-2 w-2 rounded-full bg-[#F19A3E]" />
              <span className="h-2 w-2 rounded-full bg-[#DD403A]" />
            </div>
            <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-300/70">
              About Manifest
            </div>
          </div>
          <div className="absolute right-4 top-1/2 h-24 w-3 -translate-y-1/2 rounded-full bg-[#2B3237] shadow-inner" />
        </div>
      </motion.div>
      <motion.div
        style={{ x: planeWallRightX }}
        className="absolute right-0 z-20 h-full w-1/2 bg-gradient-to-bl from-[#3B413C] to-[#22272B]"
      >
        {/* Right door details */}
        <div className="relative flex h-full w-full items-center justify-center">
          <div className="absolute inset-y-12 right-8 flex flex-col items-end justify-between">
            <div className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-gray-200">
              Jump Bay 01
            </div>
            <div className="text-[10px] text-gray-300">
              [Short about-me snippet here]
            </div>
          </div>
          <div className="absolute left-4 top-1/2 h-20 w-1.5 -translate-y-1/2 rounded-full bg-[#2B3237]" />
        </div>
      </motion.div>

      {/* Manifest Card - Layer B */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="z-10 max-w-md rounded-xl border-t-4 border-[#DD403A] bg-white/95 p-8 shadow-xl"
      >
        <h1 className="text-h2-sans font-bold text-[#3B413C]">
          MANIFEST: [YOUR NAME]
        </h1>
        <p className="text-annotation-script text-[#DD403A] -rotate-2 mt-2">
          Ready for deployment...
        </p>
        <p className="text-body-sans mt-4 text-[#3B413C]">
          [One-line hook about what you build – replace this with your own copy.]
        </p>
        <p className="text-body-sans mt-2 text-[#3B413C]">
          [Short two-sentence journey summary about how you got here.]
        </p>

        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="flex items-center justify-center animate-bounce">
            <span className="text-body-sans text-[#F19A3E]">SCROLL TO JUMP</span>
          </div>
          {/* Layer C - Interactive Trigger */}
          <button
            type="button"
            onClick={onJump}
            className="px-8 py-3 rounded-full bg-[#59A96A] text-white font-medium shadow-[0_0_30px_rgba(89,169,106,0.7)] hover:shadow-[0_0_40px_rgba(89,169,106,0.9)] hover:scale-105 active:scale-95 transition-transform transition-shadow"
          >
            JUMP
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
