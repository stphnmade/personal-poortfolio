import { cn } from '@/app/components/ui/utils'

interface AuroraTextProps {
  text: string
  className?: string
}

export function AuroraText({ text, className }: AuroraTextProps) {
  return <span className={cn('magic-aurora-text', className)}>{text}</span>
}
