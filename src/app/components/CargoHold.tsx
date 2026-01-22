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
    [about.start, doors.start],
    [1, 0],
  )

  return (
    <motion.div
      className="h-[100vh] sticky top-0 flex items-center justify-center overflow-hidden bg-[#F5F5F5]"
    >
      {/* Plane Interior - Layer A */}
      <motion.div
        style={{ x: planeWallLeftX }}
        className="absolute left-0 w-1/2 h-full bg-[#3B413C] z-20"
      />
      <motion.div
        style={{ x: planeWallRightX }}
        className="absolute right-0 w-1/2 h-full bg-[#3B413C] z-20"
      />

      {/* Manifest Card - Layer B */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="z-10 p-8 bg-white shadow-xl max-w-md border-t-4 border-[#DD403A]"
      >
        <h1 className="text-h2-sans font-bold text-[#3B413C]">
          MANIFEST: [YOUR NAME]
        </h1>
        <p className="text-annotation-script text-[#DD403A] -rotate-2 mt-2">
          Ready for deployment...
        </p>
        <p className="text-body-sans mt-4 text-[#3B413C]">
          I build immersive digital experiences through code and design.
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
