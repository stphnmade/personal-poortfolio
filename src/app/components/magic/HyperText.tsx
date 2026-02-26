import { motion } from 'motion/react'
import { cn } from '@/app/components/ui/utils'

interface HyperTextProps {
  text: string
  className?: string
}

export function HyperText({ text, className }: HyperTextProps) {
  return (
    <span className={cn('inline-flex flex-wrap', className)} aria-label={text}>
      {Array.from(text).map((char, index) => (
        <motion.span
          key={`${char}-${index}-${text.length}`}
          initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.28, delay: index * 0.018, ease: 'easeOut' }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}
