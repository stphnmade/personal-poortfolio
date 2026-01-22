import { useEffect, useState } from 'react'
import { ModeToggle } from '@/app/ModeToggle'
import { StoryModeRoot } from '@/app/StoryModeRoot'
import { RecruiterModeRoot } from '@/app/RecruiterModeRoot'
import { CHAPTERS, type ChapterId } from '@/constants/chapters'
import { NavigationSlider } from '@/app/NavigationSlider'

export default function App() {
  const [mode, setMode] = useState<'story' | 'recruiter'>('story')
  const [activeChapterId, setActiveChapterId] = useState<ChapterId>('about')

  useEffect(() => {
    if (typeof window === 'undefined') return
    const saved = window.localStorage.getItem('portfolio-mode')
    if (saved === 'story' || saved === 'recruiter') {
      setMode(saved)
    }
  }, [])

  const handleToggleMode = (next: 'story' | 'recruiter') => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem('portfolio-mode', next)
    setMode(next)
    window.location.reload()
  }

  return (
    <div className="w-full bg-background text-foreground">
      <ModeToggle mode={mode} onToggle={handleToggleMode} />
      <NavigationSlider mode={mode} activeChapterId={activeChapterId} />
      {mode === 'story' ? (
        <StoryModeRoot
          onActiveChapterChange={(id) => setActiveChapterId(id as ChapterId)}
        />
      ) : (
        <RecruiterModeRoot />
      )}
    </div>
  )
}
