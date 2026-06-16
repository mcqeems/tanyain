import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-sm border border-hairline bg-surface-soft px-3 py-2 text-[16px] text-ink placeholder:text-mute focus:bg-canvas focus:border-ink focus:outline-none transition-colors disabled:opacity-50",
          className
        )}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'
