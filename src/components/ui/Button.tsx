import { motion, type HTMLMotionProps } from 'motion/react'
import { cn } from '../../lib/utils'

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'tab'
}

export const Button = ({ className, variant = 'primary', ...props }: ButtonProps) => {
  const baseStyles = "inline-flex items-center justify-center rounded-sm px-5 py-2 font-medium text-[16px] leading-[2] transition-colors disabled:opacity-50 disabled:pointer-events-none"
  
  const variants = {
    primary: "bg-primary text-on-primary hover:bg-ink-deep",
    secondary: "bg-canvas text-ink border border-hairline-strong hover:bg-surface-soft",
    tab: "bg-transparent text-mute hover:text-ink hover:bg-surface-soft",
  }

  return (
    <motion.button 
      whileTap={{ scale: 0.98 }}
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    />
  )
}
