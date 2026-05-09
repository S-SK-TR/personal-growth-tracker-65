import { cn } from '@/core/utils/cn'

interface BentoGridProps {
  children: React.ReactNode
  className?: string
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div className={cn(
      'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
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
      'bg-surface/80 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-glass',
      'transition-all duration-300',
      className
    )}>
      {children}
    </div>
  )
}