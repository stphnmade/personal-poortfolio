import { useRef, useState } from 'react'
import { useMotionValueEvent, useScroll } from 'motion/react'
import { CargoHold } from '@/app/components/CargoHold'
import { FreefallSection } from '@/app/components/FreefallSection'
import { BeachLanding } from '@/app/components/BeachLanding'
import { DropNoteModal } from '@/app/components/DropNoteModal'
import { PrimaryCTAButton } from '@/app/components/PrimaryCTAButton'
import { SkyCanvas } from '@/app/components/SkyCanvas'
import { CHAPTERS, getChapterForProgress } from '@/constants/chapters'
import { NOTE_PADDING } from '@/constants/zones'

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
  const [hasLanded, setHasLanded] = useState(false)

  const scrollRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const chapter = getChapterForProgress(latest)
    onActiveChapterChange?.(chapter.id)
    setHasLanded(latest >= CHAPTERS.find((c) => c.id === 'beach')!.start)
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
    const experienceChapter = CHAPTERS.find((c) => c.id === 'experience')
    if (!experienceChapter) return
    const container = scrollRef.current
    if (!container) return
    const maxScrollable =
      container.scrollHeight - (container.ownerDocument.defaultView?.innerHeight ?? 0)
    const target = experienceChapter.start * maxScrollable
    container.ownerDocument?.defaultView?.scrollTo({
      top: target,
      behavior: 'smooth',
    })
  }

  const freefallProjects = [
    {
      id: 'att',
      title: 'AT&T – [Your Role]',
      description: '[Add a concise impact sentence here]',
    },
    {
      id: 'ecornell',
      title: 'eCornell – [Your Role]',
      description: '[Add a concise impact sentence here]',
    },
    {
      id: 'cornell-music',
      title: 'Cornell Music Production – [Your Role]',
      description: '[Add a concise impact sentence here]',
    },
  ]

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
        <FreefallSection
          scrollYProgress={scrollYProgress}
          projects={freefallProjects}
          userNotes={notes}
          onOpenNote={() => setIsModalOpen(true)}
        />
        {hasLanded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-amber-50 to-amber-100">
            <div className="max-w-6xl">
              <BeachLanding projects={freefallProjects} userNotes={notes} />
            </div>
          </div>
        )}
      </div>

      {/* Fixed CTA for notes */}
      <div className="fixed bottom-8 right-8 z-40">
        <PrimaryCTAButton
          ctaId="cta-drop-note-fixed-story"
          onClick={() => setIsModalOpen(true)}
        >
          ✈ Drop a Note
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
