import { motion } from 'motion/react'
import type { CSSProperties } from 'react'
import { cn } from '@/app/components/ui/utils'

interface HyperTextProps {
  text: string
  className?: string
}

export function HyperText({ text, className }: HyperTextProps) {
  return (
    <span className={cn('inline-flex flex-wrap', className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline-flex flex-wrap">
        {Array.from(text).map((char, index) => (
          <motion.span
            key={`${char}-${index}-${text.length}`}
            initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.28, delay: index * 0.018, ease: 'easeOut' }}
            className="hyper-text-char inline-block"
            style={{
              '--hyper-text-char': JSON.stringify(char === ' ' ? '\u00A0' : char),
            } as CSSProperties}
          />
        ))}
      </span>
    </span>
  )
}
