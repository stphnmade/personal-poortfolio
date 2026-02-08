import type React from 'react'

interface SupplyCrateProps {
  title: string
  accentColor: string
  note: string
  theme?: 'dark' | 'light'
  className?: string
  onClick?: () => void
}

export function SupplyCrate({
  title,
  accentColor,
  note,
  theme = 'dark',
  className,
  onClick,
}: SupplyCrateProps) {
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        group relative h-52 w-64 cursor-pointer border-0 bg-transparent p-0
        transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]
        [perspective:1000px]
        ${className ?? ''}
      `}
    >
      <div
        className={`pointer-events-none absolute left-6 right-2 top-3 h-9 [transform:skewX(-34deg)] rounded-t-md border ${
          isDark ? 'border-black/30 bg-[#5A432C]' : 'border-[#8A6A44]/50 bg-[#C49B6A]'
        }`}
      />
      <div
        className={`pointer-events-none absolute bottom-3 left-1 top-10 w-8 [transform:skewY(-36deg)] rounded-l-md border ${
          isDark ? 'border-black/30 bg-[#402E1D]' : 'border-[#8A6A44]/50 bg-[#A97D50]'
        }`}
      />

      <div
        className={`relative ml-8 mt-10 flex h-[74%] w-[86%] flex-col items-center justify-center rounded-md border-2 ${
          isDark
            ? 'border-[#2A1E13] bg-[linear-gradient(180deg,#6C4F33_0%,#5A422C_44%,#4A3522_100%)]'
            : 'border-[#8A6A44] bg-[linear-gradient(180deg,#D0A878_0%,#C09461_44%,#A97D50_100%)]'
        } shadow-[14px_16px_26px_rgba(0,0,0,0.28)]`}
      >
        <div className={`absolute inset-3 border ${isDark ? 'border-[#EADBC8]/14' : 'border-white/30'}`} />
        <div className={`absolute inset-x-3 top-[44%] h-px ${isDark ? 'bg-[#2A1E13]/65' : 'bg-[#8A6A44]/55'}`} />
        <h3
          className="relative z-10 font-sans text-3xl font-black tracking-tight"
          style={{ color: accentColor }}
        >
          {title}
        </h3>

        <div className={`absolute left-2 top-1/2 h-11 w-2 -translate-y-1/2 rounded-sm ${isDark ? 'bg-[#2A1E13]/80' : 'bg-[#8A6A44]/75'}`} />
        <div className={`absolute right-2 top-1/2 h-11 w-2 -translate-y-1/2 rounded-sm ${isDark ? 'bg-[#2A1E13]/80' : 'bg-[#8A6A44]/75'}`} />
      </div>

      <span
        className={`absolute -bottom-2 right-0 rotate-2 px-2 py-1 text-sm font-normal shadow-sm ${
          isDark ? 'bg-[#F2E7D9] text-[#AF3A34]' : 'bg-white text-[#DD403A]'
        }`}
      >
        {note}
      </span>
    </button>
  )
}
