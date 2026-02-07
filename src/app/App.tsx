import { useEffect, useState } from 'react'
import { ModeToggle } from '@/app/ModeToggle'
import { StoryModeRoot } from '@/app/StoryModeRoot'
import { RecruiterModeRoot } from '@/app/RecruiterModeRoot'
import { type ChapterId } from '@/constants/chapters'
import { NavigationSlider } from '@/app/NavigationSlider'

export default function App() {
  const [mode, setMode] = useState<'story' | 'recruiter'>('story')
  const [activeChapterId, setActiveChapterId] = useState<ChapterId>('about')
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    if (typeof window === 'undefined') return
    const savedTheme = window.localStorage.getItem('portfolio-theme')
    if (savedTheme === 'dark' || savedTheme === 'light') {
      setTheme(savedTheme)
    }
  }, [])

  const handleToggleMode = (next: 'story' | 'recruiter') => {
    setMode(next)
  }

  useEffect(() => {
    if (typeof document === 'undefined' || typeof window === 'undefined') return
    document.documentElement.classList.toggle('dark', theme === 'dark')
    window.localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  return (
    <div className="w-full bg-background text-foreground">
      <ModeToggle
        mode={mode}
        theme={theme}
        onToggle={handleToggleMode}
        onThemeToggle={() =>
          setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
        }
      />
      {mode === 'story' && (
        <NavigationSlider mode={mode} activeChapterId={activeChapterId} />
      )}
      {mode === 'story' ? (
        <StoryModeRoot
          theme={theme}
          onActiveChapterChange={(id) => setActiveChapterId(id as ChapterId)}
        />
      ) : (
        <RecruiterModeRoot />
      )}
    </div>
  )
}
