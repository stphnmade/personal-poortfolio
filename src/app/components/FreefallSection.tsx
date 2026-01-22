import { useEffect, useState } from 'react'
import { motion, useTransform, type MotionValue } from 'motion/react'
import { CHAPTERS } from '@/constants/chapters'

interface FreefallSectionProps {
  scrollYProgress: MotionValue<number>
  projects: {
    id: string
    title: string
    description: string
  }[]
  userNotes: {
    id: string
    message: string
    author: string
  }[]
  onOpenNote: () => void
}

interface FreefallProjectBillboardProps {
  project: {
    id: string
    title: string
    description: string
  }
  index: number
  progress: MotionValue<number>
}

interface FallingObjectProps {
  id: string
  content: string
  progress: MotionValue<number>
}

const EXPERIENCE = CHAPTERS.find((c) => c.id === 'experience')!
const TOOLS = CHAPTERS.find((c) => c.id === 'tools')!
const FREEFALL_START_PROGRESS = EXPERIENCE.start
const FREEFALL_END_PROGRESS = TOOLS.end

export function FreefallSection({
  scrollYProgress,
  projects,
  userNotes,
  onOpenNote,
}: FreefallSectionProps) {
  const freefallProgress = useTransform(
    scrollYProgress,
    [FREEFALL_START_PROGRESS, FREEFALL_END_PROGRESS],
    [0, 1],
  )

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [viewport, setViewport] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePos({ x: event.clientX, y: event.clientY })
    }
    const handleResize = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight })
    }

    handleResize()
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const rotateX =
    ((mousePos.y - viewport.height / 2) || 0) * 0.05
  const rotateY =
    ((mousePos.x - viewport.width / 2) || 0) * -0.05

  const skyTintOpacity = useTransform(freefallProgress, [0.8, 1], [0, 1])

  return (
    <div className="relative h-[500vh] bg-[#F5F5F5] overflow-hidden">
      {/* Sunny tint as we approach the beach */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 bg-[#FFF7E6]"
        style={{ opacity: skyTintOpacity }}
      />

      {/* THE SKYDIVER (Sticky Anchor) */}
      <motion.div
        layoutId="parachute"
        className="sticky top-1/2 left-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
        style={{
          rotateX,
          rotateY,
        }}
      >
        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-[#3B413C] text-center text-sm font-medium text-white shadow-2xl">
          ME
        </div>
        <p className="text-annotation-script mt-4 text-center text-[#DD403A]">
          Falling for you...
        </p>
      </motion.div>

      {/* PROJECT BILLBOARDS */}
      {projects.map((project, index) => (
        <FreefallProjectBillboard
          key={project.id}
          project={project}
          index={index}
          progress={freefallProgress}
        />
      ))}

      {/* USER NOTES (Atmospheric Litter) */}
      {userNotes.map((note) => (
        <FallingObject
          key={note.id}
          id={note.id}
          content={
            note.author ? `${note.message} — ${note.author}` : note.message
          }
          progress={freefallProgress}
        />
      ))}

      {/* Paper plane note trigger */}
      <button
        type="button"
        onClick={onOpenNote}
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#DD403A] text-xl text-white shadow-lg hover:scale-105 active:scale-95"
        aria-label="Drop a note"
      >
        ✈
      </button>
    </div>
  )
}

function FreefallProjectBillboard({
  project,
  index,
  progress,
}: FreefallProjectBillboardProps) {
  const start = 0.2 + index * 0.2
  const end = start + 0.1

  const y = useTransform(progress, [start, end], [1000, -1000])
  const opacity = useTransform(
    progress,
    [start, start + 0.02, end - 0.02, end],
    [0, 1, 1, 0],
  )
  const scale = useTransform(progress, [start, end], [0.8, 1.2])

  return (
    <motion.div
      layoutId={`project-${project.id}`}
      style={{ y, opacity, scale }}
      className="absolute left-[20%] z-20 w-[60%] transform-gpu rounded-xl border-2 border-[#3B413C] bg-white p-8 shadow-2xl"
    >
      <h2 className="text-h2-sans font-bold text-[#3B413C]">
        {project.title}
      </h2>
      <p className="text-body-sans mt-2 text-[#3B413C]/80">
        {project.description}
      </p>
      <button
        className="mt-4 px-6 py-2 text-body-sans uppercase tracking-[0.2em] text-white"
        style={{ backgroundColor: '#59A96A' }}
      >
        Inspect Details
      </button>
    </motion.div>
  )
}

function FallingObject({ id, content, progress }: FallingObjectProps) {
  const [startX] = useState(() => Math.random() * 80 + 10) // 10% to 90%
  const [rotation] = useState(() => Math.random() * 360)
  const [endY] = useState(() => Math.random() * 200 - 100)

  const y = useTransform(progress, [0, 0.9, 1], [2000, -5000, endY])

  return (
    <motion.div
      layoutId={`note-${id}`}
      style={{ y, left: `${startX}%`, rotate: rotation }}
      className="absolute z-10 w-32 transform-gpu rounded-md border border-[#F19A3E] bg-[#F5F5F5] p-3 shadow-md"
    >
      <p className="text-annotation-script text-xs leading-tight text-[#3B413C]">
        "{content}"
      </p>
    </motion.div>
  )
}
