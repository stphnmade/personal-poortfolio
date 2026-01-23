import { useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { FaPaperPlane } from 'react-icons/fa'
import { CargoHold } from '@/app/components/CargoHold'
import { FreefallSection } from '@/app/components/FreefallSection'
import { BeachLanding } from '@/app/components/BeachLanding'
import { DropNoteModal } from '@/app/components/DropNoteModal'
import { PrimaryCTAButton } from '@/app/components/PrimaryCTAButton'
import { SkyCanvas } from '@/app/components/SkyCanvas'
import { CHAPTERS, getChapterForProgress } from '@/constants/chapters'
import { SUBSTANCE } from '@/constants/substance'

interface Note {
  id: string
  message: string
  author: string
}

interface StoryModeRootProps {
  onActiveChapterChange?: (chapterId: string) => void
}

export function StoryModeRoot({ onActiveChapterChange }: StoryModeRootProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [notes, setNotes] = useState<Note[]>([])
  const [landingProgress, setLandingProgress] = useState(0)
  const [isInLanding, setIsInLanding] = useState(false)
  const noteCopy = SUBSTANCE.story.globalUI.noteDrop

  const scrollRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const chapter = getChapterForProgress(latest)
    onActiveChapterChange?.(chapter.id)
    const landing = CHAPTERS.find((c) => c.id === 'landing')!
    const range = landing.end - landing.start
    const raw = (latest - landing.start) / range
    const clamped = Math.max(0, Math.min(1, raw))
    setLandingProgress(clamped)
    // Once we are meaningfully into the landing chapter,
    // unmount the freefall overlay so clicks reach the beach crates.
    setIsInLanding(clamped > 0.15)
  })

  const handleDropNote = (message: string, author: string) => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      message,
      author,
    }
    setNotes((prev) => [...prev, newNote])
  }

  const handleJumpToFreefall = () => {
    const landingChapter = CHAPTERS.find((c) => c.id === 'landing')
    if (!landingChapter) return
    const container = scrollRef.current
    if (!container) return
    const maxScrollable =
      container.scrollHeight - (container.ownerDocument.defaultView?.innerHeight ?? 0)
    const target = landingChapter.start * maxScrollable
    container.ownerDocument?.defaultView?.scrollTo({
      top: target,
      behavior: 'smooth',
    })
  }

  const freefallProjects = SUBSTANCE.experience.map((exp) => ({
    id: exp.id,
    title: `${exp.org}, ${exp.role}`,
    description: exp.oneLineImpact,
  }))

  return (
    <div ref={scrollRef} className="relative h-[800vh] bg-background">
      {/* Global story viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <SkyCanvas scrollYProgress={scrollYProgress} />
        {/* Cargo Hold / Doors / Freefall are handled inside these components based on progress */}
        <CargoHold
          scrollYProgress={scrollYProgress}
          onJump={handleJumpToFreefall}
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
          style={{ opacity: landingProgress }}
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
