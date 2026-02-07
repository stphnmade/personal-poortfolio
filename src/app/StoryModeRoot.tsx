import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'
import { FaPaperPlane } from 'react-icons/fa'
import { CargoHold } from '@/app/components/CargoHold'
import { FreefallSection } from '@/app/components/FreefallSection'
import { BeachLanding } from '@/app/components/BeachLanding'
import { DropNoteModal } from '@/app/components/DropNoteModal'
import { PrimaryCTAButton } from '@/app/components/PrimaryCTAButton'
import { SkyCanvas } from '@/app/components/SkyCanvas'
import { CHAPTERS, getChapterForProgress, type ChapterId } from '@/constants/chapters'
import { SUBSTANCE } from '@/constants/substance'

interface Note {
  id: string
  message: string
  author: string
}

interface StoryModeRootProps {
  theme: 'dark' | 'light'
  onActiveChapterChange?: (chapterId: string) => void
}

const LANDING_CHAPTER = CHAPTERS.find((c) => c.id === 'landing')!
export function StoryModeRoot({
  theme,
  onActiveChapterChange,
}: StoryModeRootProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [notes, setNotes] = useState<Note[]>([])
  const [isInLanding, setIsInLanding] = useState(false)
  const activeChapterRef = useRef<ChapterId | null>(null)
  const noteCopy = SUBSTANCE.story.globalUI.noteDrop

  const { scrollYProgress } = useScroll()
  const landingProgress = useTransform(
    scrollYProgress,
    [LANDING_CHAPTER.start, LANDING_CHAPTER.end],
    [0, 1],
  )
  const landingOpacity = useSpring(landingProgress, {
    stiffness: 220,
    damping: 34,
    mass: 0.5,
  })

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const chapter = getChapterForProgress(latest)
    if (chapter.id !== activeChapterRef.current) {
      activeChapterRef.current = chapter.id
      onActiveChapterChange?.(chapter.id)
    }
    const range = LANDING_CHAPTER.end - LANDING_CHAPTER.start
    const raw = (latest - LANDING_CHAPTER.start) / range
    const clamped = Math.max(0, Math.min(1, raw))
    // Once we are meaningfully into the landing chapter,
    // unmount the freefall overlay so clicks reach the beach crates.
    const nextInLanding = clamped > 0.15
    setIsInLanding((prev) => (prev === nextInLanding ? prev : nextInLanding))
  })

  const handleDropNote = (message: string, author: string) => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      message,
      author,
    }
    setNotes((prev) => [...prev, newNote])
  }

  const freefallProjects = SUBSTANCE.experience.map((exp) => ({
    id: exp.id,
    title: `${exp.org}, ${exp.role}`,
    description: exp.oneLineImpact,
  }))

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  return (
    <div className="relative h-[800vh] bg-background">
      {/* Global story viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <SkyCanvas scrollYProgress={scrollYProgress} />
        {/* Cargo Hold / Doors / Freefall are handled inside these components based on progress */}
        <CargoHold
          scrollYProgress={scrollYProgress}
          theme={theme}
        />
        {!isInLanding && (
          <FreefallSection
            scrollYProgress={scrollYProgress}
            userNotes={notes}
            onOpenNote={() => setIsModalOpen(true)}
          />
        )}
        <motion.div
          className="absolute inset-0 flex items-end justify-center pointer-events-none"
          style={{ opacity: landingOpacity }}
        >
          <div className="pointer-events-auto flex h-full w-full items-end">
            <BeachLanding projects={freefallProjects} userNotes={notes} />
          </div>
        </motion.div>
      </div>

      {/* Fixed CTA for notes */}
      <div className="fixed bottom-8 right-8 z-40">
        <PrimaryCTAButton
          ctaId="cta-drop-note-fixed-story"
          onClick={() => setIsModalOpen(true)}
        >
          <FaPaperPlane />
          {noteCopy.cta}
        </PrimaryCTAButton>
      </div>

      {/* Drop Note Modal */}
      <DropNoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleDropNote}
      />
    </div>
  )
}
