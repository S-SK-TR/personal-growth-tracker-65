import { cn } from '@/core/utils/cn'

interface BentoGridProps {
  children: React.ReactNode
  className?: string
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div className={cn(
      'bento-grid',
      className
    )}>
      {children}
    </div>
  )
}

interface BentoCardProps {
  children: React.ReactNode
  className?: string
}

export function BentoCard({ children, className }: BentoCardProps) {
  return (
    <div className={cn(
      'bento-card',
      'glass-card rounded-2xl p-6',
      'transition-all duration-300',
      className
    )}>
      {children}
    </div>
  )
}