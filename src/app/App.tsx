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

    const requestedMode = new URLSearchParams(window.location.search).get('mode')
    const savedMode = window.localStorage.getItem('portfolio-mode')
    if (requestedMode === 'story' || requestedMode === 'recruiter') {
      setMode(requestedMode)
      window.localStorage.setItem('portfolio-mode', requestedMode)
      return
    }
    if (savedMode === 'story' || savedMode === 'recruiter') {
      setMode(savedMode)
    }
  }, [])

  const handleToggleMode = (next: 'story' | 'recruiter') => {
    setMode(next)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('portfolio-mode', next)
      const url = new URL(window.location.href)
      url.searchParams.set('mode', next)
      window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`)
    }
  }

  useEffect(() => {
    if (typeof document === 'undefined' || typeof window === 'undefined') return
    document.documentElement.classList.toggle('dark', theme === 'dark')
    window.localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  useEffect(() => {
    if (typeof document === 'undefined') return

    document.body.dataset.viewMode = mode
    document.body.dataset.theme = theme
    document.documentElement.dataset.viewMode = mode
  }, [mode, theme])

  useEffect(() => {
    if (typeof document === 'undefined') return

    return () => {
      delete document.body.dataset.viewMode
      delete document.body.dataset.theme
      delete document.documentElement.dataset.viewMode
      document.body.classList.remove('story-scroll-locked')
      document.body.style.top = ''
    }
  }, [])

  return (
    <div className="app-shell min-h-screen w-full bg-background text-foreground">
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
