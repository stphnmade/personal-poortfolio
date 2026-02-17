import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'
import { FaPaperPlane } from 'react-icons/fa'
import { FreefallSection } from '@/app/components/FreefallSection'
import { BeachLanding } from '@/app/components/BeachLanding'
import { DropNoteModal } from '@/app/components/DropNoteModal'
import { CHAPTERS, getChapterForProgress, type ChapterId } from '@/constants/chapters'
import { SUBSTANCE } from '@/constants/substance'
import { loadNotes, saveNote, type StoryNote } from '@/app/services/storyNotes'

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
  const [notes, setNotes] = useState<StoryNote[]>([])
  const [activeScene, setActiveScene] = useState<'freefall' | 'landing'>('freefall')
  const activeChapterRef = useRef<ChapterId | null>(null)

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
    const nextScene = latest < LANDING_CHAPTER.start ? 'freefall' : 'landing'
    setActiveScene((prev) => (prev === nextScene ? prev : nextScene))
  })

  const handleDropNote = (message: string, author: string) => {
    const trimmedMessage = message.trim()
    const trimmedAuthor = author.trim()
    if (!trimmedMessage) return

    const optimisticNote: StoryNote = {
      id: crypto.randomUUID(),
      message: trimmedMessage,
      author: trimmedAuthor,
      createdAt: new Date().toISOString(),
    }
    setNotes((prev) => [...prev, optimisticNote])

    void saveNote(optimisticNote)
      .then((persistedNote) => {
        setNotes((prev) =>
          prev.map((note) =>
            note.id === optimisticNote.id ? persistedNote : note,
          ),
        )
      })
      .catch(() => {
        setNotes((prev) =>
          prev.filter((note) => note.id !== optimisticNote.id),
        )
      })
  }

  const freefallProjects = SUBSTANCE.experience.map((exp) => ({
    id: exp.id,
    title: `${exp.org}, ${exp.role}`,
    description: exp.oneLineImpact,
  }))

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  useEffect(() => {
    let isCancelled = false

    const hydrateNotes = async () => {
      const storedNotes = await loadNotes()
      if (!isCancelled) {
        setNotes(storedNotes)
      }
    }

    void hydrateNotes()

    return () => {
      isCancelled = true
    }
  }, [])

  return (
    <div className="relative h-[800vh] bg-background">
      {/* Global story viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {activeScene === 'freefall' && (
          <FreefallSection
            scrollYProgress={scrollYProgress}
            userNotes={notes}
            theme={theme}
            onOpenNote={() => setIsModalOpen(true)}
          />
        )}
        {activeScene === 'landing' && (
          <motion.div
            className="absolute inset-0 flex items-end justify-center pointer-events-none"
            style={{ opacity: landingOpacity }}
          >
            <div className="pointer-events-auto flex h-full w-full items-end">
              <BeachLanding
                projects={freefallProjects}
                userNotes={notes}
                theme={theme}
              />
            </div>
          </motion.div>
        )}
      </div>

      {/* Fixed CTA for notes */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          aria-label="Drop a sky note"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-[#59A96A] text-[#08120A] shadow-lg transition-all duration-200 hover:scale-105 hover:bg-[#4C975D] active:scale-95"
          data-cta-id="cta-drop-note-fixed-story"
        >
          <FaPaperPlane className="h-4 w-4" />
        </button>
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
