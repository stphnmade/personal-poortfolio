import { useEffect, useMemo, useRef, useState } from 'react'
import { useMotionValueEvent, useScroll } from 'motion/react'
import { CHAPTERS, type ChapterId } from '@/constants/chapters'
import { ScrollProgress } from '@/app/components/magic/ScrollProgress'

interface NavigationSliderProps {
  mode: 'story' | 'recruiter'
  activeChapterId: ChapterId
}

export function NavigationSlider({ mode, activeChapterId }: NavigationSliderProps) {
  if (mode !== 'story') return null

  const [isVisibleWhileScrolling, setIsVisibleWhileScrolling] = useState(false)
  const [scrollProgressValue, setScrollProgressValue] = useState(0)
  const hideTimerRef = useRef<number | null>(null)
  const { scrollYProgress } = useScroll()

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setScrollProgressValue(latest)
  })

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

  const activeVisibleChapter = visibleStoryChapters[safeActiveVisibleIndex] ?? visibleStoryChapters[0]
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
    window.scrollTo({ top: targetTop, behavior: 'smooth' })
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

  return (
    <div
      className={`fixed right-4 top-1/2 z-50 -translate-y-1/2 transition-opacity duration-300 ${
        isVisibleWhileScrolling ? 'opacity-100' : 'opacity-70 hover:opacity-100'
      }`}
    >
      <ScrollProgress
        progress={scrollProgressValue}
        activeIndex={safeActiveVisibleIndex}
        markers={visibleStoryChapters.map((chapter) => ({
          id: chapter.id,
          label: chapter.navLabel,
        }))}
        onMarkerClick={(chapterId) => handleJump(chapterId as ChapterId)}
      />
      <button
        type="button"
        onClick={() => handleJump(activeVisibleChapter.id)}
        className="mt-2 w-full rounded-full border border-white/15 bg-black/35 px-2 py-1 text-[10px] font-semibold text-white/85 backdrop-blur transition-colors hover:bg-black/55"
        aria-label={`Jump to current chapter, ${activeVisibleChapter.navLabel}`}
        title={activeVisibleChapter.navLabel}
      >
        {safeActiveVisibleIndex + 1}/{total}
      </button>
    </div>
  )
}
