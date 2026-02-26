import { FaMoon, FaSun } from 'react-icons/fa'
import { cn } from '@/app/components/ui/utils'

interface ThemeTogglerProps {
  theme: 'dark' | 'light'
  onToggle: () => void
  className?: string
}

export function ThemeToggler({
  theme,
  onToggle,
  className,
}: ThemeTogglerProps) {
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label="Toggle dark mode"
      className={cn(
        'relative inline-flex h-8 w-[4.25rem] items-center rounded-full border px-1 transition-colors',
        isDark
          ? 'border-white/15 bg-white/8 text-[#ECF3F7]'
          : 'border-black/10 bg-black/5 text-[#3B413C]',
        className,
      )}
    >
      <span className="pointer-events-none relative z-10 grid w-full grid-cols-2">
        <span
          className={cn(
            'inline-flex items-center justify-center transition-opacity',
            isDark ? 'opacity-55' : 'opacity-100',
          )}
        >
          <FaSun className="h-3 w-3" />
        </span>
        <span
          className={cn(
            'inline-flex items-center justify-center transition-opacity',
            isDark ? 'opacity-100' : 'opacity-55',
          )}
        >
          <FaMoon className="h-3 w-3" />
        </span>
      </span>
      <span
        aria-hidden="true"
        className={cn(
          'absolute top-1 h-6 w-7 rounded-full shadow-sm transition-all duration-300',
          isDark
            ? 'left-[calc(100%-2rem)] z-0 bg-[#16222C] shadow-[0_0_0_1px_rgba(255,255,255,0.08)]'
            : 'left-1 z-0 bg-white shadow-[0_1px_8px_rgba(0,0,0,0.12)]',
        )}
      />
    </button>
  )
}
