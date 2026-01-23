import { motion } from 'motion/react'
import { CHAPTERS, type ChapterId } from '@/constants/chapters'
import { SUBSTANCE } from '@/constants/substance'

interface NavigationSliderProps {
  mode: 'story' | 'recruiter'
  activeChapterId: ChapterId
}

export function NavigationSlider({ mode, activeChapterId }: NavigationSliderProps) {
  const activeIndex = CHAPTERS.findIndex((c) => c.id === activeChapterId)
  const activeChapter = CHAPTERS[activeIndex] ?? CHAPTERS[0]
  const total = CHAPTERS.length

  const handleJump = (chapterId: ChapterId) => {
    const chapter = CHAPTERS.find((c) => c.id === chapterId)
    if (!chapter) return

    if (typeof window === 'undefined') return

    if (mode === 'story') {
      const doc = window.document
      const maxScrollable = doc.documentElement.scrollHeight - window.innerHeight
      const targetTop = chapter.start * maxScrollable
      window.scrollTo({ top: targetTop, behavior: 'smooth' })
    } else {
      const el = document.getElementById(chapter.recruiterAnchor)
      if (!el) return
      const rect = el.getBoundingClientRect()
      const currentTop = window.scrollY || window.pageYOffset
      const targetTop = currentTop + rect.top - 80 // offset for comfort
      window.scrollTo({ top: targetTop, behavior: 'smooth' })
    }
  }

  // Map chapter start positions (0-1) into slider track space (0-100%)
  const trackTop = 10
  const trackBottom = 90

  const getChapterPosition = (chapter: (typeof CHAPTERS)[number]) => {
    const mid = (chapter.start + chapter.end) / 2
    return trackTop + (trackBottom - trackTop) * mid
  }

  const activeTop = getChapterPosition(activeChapter)

  return (
    <div className="fixed left-6 top-1/2 z-50 -translate-y-1/2">
      <div className="relative h-80 w-12 text-[10px] text-gray-400">
        {/* Top / bottom labels only */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 text-center">
          <span className="uppercase tracking-[0.2em]">
            {mode === 'story'
              ? SUBSTANCE.chapters[0]?.storyLabel
              : SUBSTANCE.chapters[0]?.recruiterLabel}
          </span>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-center">
          <span className="uppercase tracking-[0.2em]">
            {mode === 'story'
              ? SUBSTANCE.chapters[SUBSTANCE.chapters.length - 1]?.storyLabel
              : SUBSTANCE.chapters[SUBSTANCE.chapters.length - 1]?.recruiterLabel}
          </span>
        </div>

        {/* Vertical track */}
        <div className="absolute left-1/2 top-[8%] h-[84%] w-px -translate-x-1/2 bg-[#0F5EAF]/40" />

        {/* Chapter click targets (invisible hit areas) */}
        {CHAPTERS.map((chapter) => {
          const top = getChapterPosition(chapter)
          return (
            <button
              key={chapter.id}
              type="button"
              onClick={() => handleJump(chapter.id)}
              className="absolute left-1/2 h-4 w-6 -translate-x-1/2 -translate-y-1/2"
              style={{ top: `${top}%` }}
              aria-label={chapter.label}
            />
          )
        })}

        {/* Active handle as a simple circle */}
        <motion.button
          type="button"
          onClick={() => handleJump(activeChapterId)}
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 focus:outline-none"
          style={{ top: `${activeTop}%` }}
          layout
        >
          <div className="h-3 w-3 rounded-full bg-[#0F86FF]" />
        </motion.button>
      </div>
    </div>
  )
}
