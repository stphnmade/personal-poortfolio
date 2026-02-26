import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/app/components/ui/utils'

interface DockItem {
  id: string
  label: string
  href: string
  icon: ReactNode
  download?: boolean
}

interface DockProps {
  items: DockItem[]
  className?: string
  tone?: 'default' | 'sand'
}

export function Dock({ items, className, tone = 'default' }: DockProps) {
  const isSand = tone === 'sand'

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 rounded-2xl border px-2 py-1.5 backdrop-blur',
        isSand
          ? 'border-[#C29A6B]/48 bg-[#E7C499]/80 text-[#4A2E1A] shadow-[0_8px_20px_rgba(122,84,48,0.12)]'
          : 'border-white/12 bg-[#14202A]/80 text-[#ECF3F7]',
        isSand
          ? 'dark:border-[#B88A59]/40 dark:bg-[#4A3323]/82 dark:text-[#FFE9D0]'
          : 'dark:border-white/12 dark:bg-[#14202A]/80 dark:text-[#ECF3F7]',
        className,
      )}
      role="navigation"
      aria-label="Footer links"
    >
      {items.map((item) => (
        <motion.a
          key={item.id}
          href={item.href}
          download={item.download}
          target={item.href.startsWith('http') ? '_blank' : undefined}
          rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
          whileHover={{ y: -4, scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className={cn(
            'group inline-flex items-center gap-2 rounded-xl border px-2.5 py-2 text-xs font-semibold shadow-sm transition-colors',
            isSand
              ? 'border-[#B88A59]/35 bg-white/58 hover:bg-white/82 dark:border-[#B88A59]/30 dark:bg-[#3F2D21]/75 dark:hover:bg-[#513829]/92'
              : 'border-black/8 bg-white/60 hover:bg-white/90 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/12',
          )}
          aria-label={item.label}
          title={item.label}
        >
          <span
            className={cn(
              'inline-flex h-6 w-6 items-center justify-center rounded-lg text-[0.9rem]',
              isSand
                ? 'bg-white/70 text-[#5A341C] dark:bg-[#5D412C]/85 dark:text-[#FFE7CA]'
                : 'bg-white/75 dark:bg-white/10',
            )}
          >
            {item.icon}
          </span>
          <span className="hidden sm:inline">{item.label}</span>
        </motion.a>
      ))}
    </div>
  )
}
