import { SUBSTANCE } from '@/constants/substance'
import { FaMoon, FaSun } from 'react-icons/fa'

interface ModeToggleProps {
  mode: 'story' | 'recruiter'
  theme: 'dark' | 'light'
  onToggle: (next: 'story' | 'recruiter') => void
  onThemeToggle: () => void
}

export function ModeToggle({
  mode,
  theme,
  onToggle,
  onThemeToggle,
}: ModeToggleProps) {
  const copy = SUBSTANCE.story.globalUI.modeToggle
  const isStory = mode === 'story'
  const isDark = theme === 'dark'

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center gap-2 rounded-full border px-3 py-2 shadow-md backdrop-blur ${
        isDark
          ? 'border-white/15 bg-[#0E151B]/85 text-[#ECF3F7]'
          : 'border-black/10 bg-white/85 text-[#3B413C]'
      }`}
    >
      <button
        type="button"
        onClick={() => !isStory && onToggle('story')}
        className={`text-xs font-medium px-2 py-1 rounded-full ${
          isStory
            ? 'bg-[#59A96A] text-white'
            : isDark
            ? 'text-[#ECF3F7]'
            : 'text-[#3B413C]'
        }`}
        title={copy.tooltip}
      >
        {copy.story}
      </button>
      <span className="text-xs text-muted-foreground">/</span>
      <button
        type="button"
        onClick={() => isStory && onToggle('recruiter')}
        className={`text-xs font-medium px-2 py-1 rounded-full ${
          !isStory
            ? 'bg-[#59A96A] text-white'
            : isDark
            ? 'text-[#ECF3F7]'
            : 'text-[#3B413C]'
        }`}
        title={copy.tooltip}
      >
        {copy.recruiter}
      </button>
      <button
        type="button"
        onClick={onThemeToggle}
        className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs font-medium transition-colors ${
          isDark
            ? 'border-white/15 bg-white/8 text-[#ECF3F7] hover:bg-white/16'
            : 'border-black/10 bg-black/5 text-[#3B413C] hover:bg-black/10'
        }`}
        aria-label="Toggle dark mode"
      >
        {isDark ? <FaMoon className="h-3 w-3" /> : <FaSun className="h-3 w-3" />}
        {isDark ? 'Dark' : 'Light'}
      </button>
    </div>
  )
}
