import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { CHAPTERS, type ChapterId } from '@/constants/chapters'

interface NavigationSliderProps {
  mode: 'story' | 'recruiter'
  activeChapterId: ChapterId
}

export function NavigationSlider({ mode, activeChapterId }: NavigationSliderProps) {
  if (mode !== 'story') return null

  const [isVisibleWhileScrolling, setIsVisibleWhileScrolling] = useState(false)
  const hideTimerRef = useRef<number | null>(null)

  const visibleStoryChapters = useMemo(
    () => CHAPTERS.filter((chapter) => chapter.id !== 'doors'),
    [],
  )

  const activeOriginalIndex = CHAPTERS.findIndex((chapter) => chapter.id === activeChapterId)
  const safeActiveOriginalIndex = activeOriginalIndex >= 0 ? activeOriginalIndex : 0

  const safeActiveVisibleIndex = useMemo(() => {
    let activeIdx = 0
    for (let i = 0; i < visibleStoryChapters.length; i += 1) {
      const chapter = visibleStoryChapters[i]
      const originalIndex = CHAPTERS.findIndex((item) => item.id === chapter.id)
      if (originalIndex <= safeActiveOriginalIndex) {
        activeIdx = i
      }
    }
    return activeIdx
  }, [safeActiveOriginalIndex, visibleStoryChapters])

  const activeVisibleChapter =
    visibleStoryChapters[safeActiveVisibleIndex] ?? visibleStoryChapters[0]
  const total = visibleStoryChapters.length

  const handleJump = (chapterId: ChapterId) => {
    const chapter = CHAPTERS.find((c) => c.id === chapterId)
    if (!chapter) return

    if (typeof window === 'undefined') return

    const doc = window.document
    const maxScrollable = doc.documentElement.scrollHeight - window.innerHeight
    const targetProgress =
      chapter.id === 'landing' ? 1 : chapter.start
    const targetTop = targetProgress * maxScrollable
    window.scrollTo({ top: targetTop, behavior: 'auto' })
  }

  useEffect(() => {
    if (typeof window === 'undefined') return

    const showThenHide = () => {
      setIsVisibleWhileScrolling(true)
      if (hideTimerRef.current !== null) {
        window.clearTimeout(hideTimerRef.current)
      }
      hideTimerRef.current = window.setTimeout(() => {
        setIsVisibleWhileScrolling(false)
      }, 900)
    }

    window.addEventListener('scroll', showThenHide, { passive: true })

    return () => {
      window.removeEventListener('scroll', showThenHide)
      if (hideTimerRef.current !== null) {
        window.clearTimeout(hideTimerRef.current)
      }
    }
  }, [])

  const trackTop = 10
  const trackBottom = 90
  const denominator = Math.max(1, total - 1)
  const getChapterPositionByIndex = (index: number) =>
    trackTop + ((trackBottom - trackTop) * index) / denominator
  const activeTop = getChapterPositionByIndex(safeActiveVisibleIndex)

  return (
    <div
      className={`fixed left-6 top-1/2 z-50 -translate-y-1/2 transition-opacity duration-300 ${
        isVisibleWhileScrolling ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <div className="relative h-60 w-14">
        <div className="absolute left-1/2 top-[8%] h-[84%] w-px -translate-x-1/2 bg-white/20" />

        {visibleStoryChapters.map((chapter, index) => {
          const top = getChapterPositionByIndex(index)
          const isCompleteOrCurrent = index <= safeActiveVisibleIndex
          const isCurrent = index === safeActiveVisibleIndex
          return (
            <button
              key={chapter.id}
              type="button"
              onClick={() => handleJump(chapter.id)}
              className="absolute left-1/2 h-4 w-10 -translate-x-1/2 -translate-y-1/2"
              style={{ top: `${top}%` }}
              aria-label={`Go to step ${index + 1}`}
            >
              <span
                className={`mx-auto block h-1 rounded-full transition-all duration-200 ${
                  isCurrent
                    ? 'w-8 bg-[#59A96A]'
                    : isCompleteOrCurrent
                    ? 'w-6 bg-[#0F86FF]'
                    : 'w-5 bg-white/35'
                }`}
              />
            </button>
          )
        })}

        <motion.button
          type="button"
          onClick={() => handleJump(activeVisibleChapter.id)}
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 focus:outline-none"
          style={{ top: `${activeTop}%` }}
          layout
        >
          <div className="h-3 w-3 rounded-full bg-[#0F86FF]" />
        </motion.button>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[130%] rounded-full border border-white/15 bg-black/35 px-2 py-0.5 text-[10px] font-semibold text-white/85">
          {safeActiveVisibleIndex + 1}/{total}
        </div>
      </div>
    </div>
  )
}
