import { SUBSTANCE } from '@/constants/substance'
import { ThemeToggler } from '@/app/components/magic/ThemeToggler'

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
      className={`fixed left-1/2 top-4 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full border px-2.5 py-2 shadow-md backdrop-blur transition-all ${
        isDark
          ? 'border-white/15 bg-[#0E151B]/85 text-[#ECF3F7]'
          : 'border-black/10 bg-white/85 text-[#3B413C]'
      }`}
    >
      <button
        type="button"
        onClick={() => !isStory && onToggle('story')}
        className={`rounded-full px-2 py-1 text-xs font-medium ${
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
      <span className="text-[10px] text-muted-foreground/70">/</span>
      <button
        type="button"
        onClick={() => isStory && onToggle('recruiter')}
        className={`rounded-full px-2 py-1 text-xs font-medium ${
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
      <ThemeToggler theme={theme} onToggle={onThemeToggle} />
    </div>
  )
}
