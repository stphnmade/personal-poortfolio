import { SUBSTANCE } from '@/constants/substance'

interface ModeToggleProps {
  mode: 'story' | 'recruiter'
  onToggle: (next: 'story' | 'recruiter') => void
}

export function ModeToggle({ mode, onToggle }: ModeToggleProps) {
  const copy = SUBSTANCE.story.globalUI.modeToggle
  const isStory = mode === 'story'
  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 shadow-md backdrop-blur">
      <button
        type="button"
        onClick={() => !isStory && onToggle('story')}
        className={`text-xs font-medium px-2 py-1 rounded-full ${
          isStory ? 'bg-[#59A96A] text-white' : 'text-[#3B413C]'
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
          !isStory ? 'bg-[#59A96A] text-white' : 'text-[#3B413C]'
        }`}
        title={copy.tooltip}
      >
        {copy.recruiter}
      </button>
    </div>
  )
}
