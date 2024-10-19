import * as React from 'react'

import { cn } from '@/shared/lib/utils'
import { Label } from '@/shared/components/ui/label'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  action?: React.ReactNode
  label?: string
  icon?: React.ReactNode
  widthMain?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, error, widthMain, icon, action, label, ...props },
    ref,
  ) => {
    return (
      <div className={cn(widthMain || 'w-full', 'flex flex-col gap-2')}>
        {label && (
          <Label asChild>
            <p className="text-base" />
          </Label>
        )}

        <span className="flex relative items-center">
          {icon && <div className="absolute left-0 px-3 py-1">{icon}</div>}
          <input
            type={type}
            className={cn(
              error ? 'border-red-700' : 'border-muted-foreground',
              'flex h-9 w-full rounded-[10px] border bg-transparent px-3 py-1 text-sm  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
              className,
            )}
            ref={ref}
            {...props}
          />
          {action && <div className="absolute right-0 px-3 py-1">{action}</div>}
        </span>
        {error && <p className="text-red-700 text-sm">{error}</p>}
      </div>
    )
  },
)
Input.displayName = 'Input'

export { Input }
