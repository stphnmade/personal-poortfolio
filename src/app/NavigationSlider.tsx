import { CHAPTERS, type ChapterId } from '@/constants/chapters'

interface NavigationSliderProps {
  mode: 'story' | 'recruiter'
  activeChapterId: ChapterId
}

export function NavigationSlider({ mode, activeChapterId }: NavigationSliderProps) {
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

  return (
    <div className="fixed left-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md backdrop-blur">
      <div className="flex flex-col gap-1">
        {CHAPTERS.map((chapter) => {
          const isActive = chapter.id === activeChapterId
          return (
            <button
              key={chapter.id}
              type="button"
              onClick={() => handleJump(chapter.id)}
              className={`flex items-center gap-2 rounded-full px-2 py-1 text-xs ${
                isActive
                  ? 'bg-[#F19A3E] text-white'
                  : 'text-[#3B413C] hover:bg-muted'
              }`}
            >
              <span className="h-2 w-2 rounded-full bg-current" />
              <span className="hidden md:inline">{chapter.navLabel}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

