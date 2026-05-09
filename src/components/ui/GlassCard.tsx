import { motion } from 'framer-motion'
import { cn } from '@/core/utils/cn'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hoverEffect?: boolean
}

export function GlassCard({ children, className, hoverEffect = true }: GlassCardProps) {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -4, transition: { duration: 0.3 } } : undefined}
      className={cn(
        'glass-card',
        'bg-surface/80 backdrop-blur-md border border-white/20 rounded-2xl shadow-glass',
        'transition-all duration-300',
        className
      )}
    >
      {children}
    </motion.div>
  )
}