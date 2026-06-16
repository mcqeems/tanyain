import { cn } from '../../lib/utils'
import { motion, type HTMLMotionProps } from 'motion/react'

interface CardProps extends HTMLMotionProps<"div"> {
  dark?: boolean
}

export const Card = ({ className, dark = false, ...props }: CardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "rounded-none border border-hairline p-6 lg:p-8",
        dark ? "bg-surface-dark text-on-primary border-transparent" : "bg-canvas text-ink",
        className
      )}
      {...props}
    />
  )
}
