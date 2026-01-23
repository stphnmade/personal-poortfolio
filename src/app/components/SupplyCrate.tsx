import type React from 'react'

interface SupplyCrateProps {
  title: string
  accentColor: string
  note: string
  className?: string
  onClick?: () => void
}

export function SupplyCrate({
  title,
  accentColor,
  note,
  className,
  onClick,
}: SupplyCrateProps) {
  return (
    <div
      onClick={onClick}
      className={`
        relative h-48 w-64 cursor-pointer border-4 border-[#3B413C] bg-[#3B413C]
        flex flex-col items-center justify-center
        shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]
        transition-transform hover:scale-105 active:scale-95
        ${className ?? ''}
      `}
    >
      {/* Structural reinforcement */}
      <div className="pointer-events-none absolute inset-2 border-2 border-dashed border-[#F5F5F5]/20" />

      {/* Label */}
      <h3
        className="font-sans text-3xl font-black tracking-tight"
        style={{ color: accentColor }}
      >
        {title}
      </h3>

      {/* Side handles */}
      <div className="absolute -left-2 top-1/2 h-10 w-2 -translate-y-1/2 rounded-sm bg-[#3B413C]" />
      <div className="absolute -right-2 top-1/2 h-10 w-2 -translate-y-1/2 rounded-sm bg-[#3B413C]" />

      {/* Script annotation */}
      <span className="absolute -bottom-4 -right-2 rotate-3 bg-white px-2 py-1 text-sm font-normal text-[#DD403A] shadow-sm">
        {note}
      </span>
    </div>
  )
}

