import * as React from 'react'

const buttonClassName = 'inline-flex items-center justify-center whitespace-nowrap rounded text-base font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'

const buttonVariants = {
    default: 'bg-primary text-primary-foreground hover:text-accent-foreground hover:bg-accent/80',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    ghost: 'hover:bg-card hover:text-accent-foreground text-gray-900',
    link: 'text-gray-900 items-start justify-start hover:text-secondary',
    outline: 'border border-border bg-background hover:bg-card hover:text-accent-foreground',
    secondary: 'bg-accent text-accent-foreground hover:bg-primary/80 hover:text-primary-foreground',
}

const buttonSizes = {
    clear: '',
    default: 'h-10 px-4 py-2',
    icon: 'h-10 w-10',
    lg: 'h-11 rounded px-8',
    sm: 'h-9 rounded px-3',
    full: 'h-11 rounded px-8 w-full'
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'destructive' | 'ghost' | 'link' | 'outline' | 'secondary' | null;
    size?: 'clear' | 'default' | 'icon' | 'lg' | 'sm' | 'full';
    ref?: React.Ref<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  size,
  children,
  ref,
  ...props
}) => {
  return (
    <button
        className={`
            ${buttonClassName}
            ${variant ? buttonVariants[variant] : null}
            ${size ? buttonSizes[size] : null}
        `}
        ref={ref ? ref : null}
        {...props}
    >
        {children}
    </button>
  )
}

export { Button, buttonVariants }
