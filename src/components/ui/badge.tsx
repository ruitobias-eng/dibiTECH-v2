import * as React from "react"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant?: "default" | "secondary" | "outline";
}

function Badge({ className = "", variant = "default", ...props }: BadgeProps) {
  let variantStyles = "bg-accent text-accent-foreground font-bold"
  if (variant === "secondary") {
    variantStyles = "bg-secondary text-secondary-foreground"
  } else if (variant === "outline") {
    variantStyles = "border border-accent text-accent"
  }

  return (
    <div
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variantStyles} ${className}`}
      {...props}
    />
  )
}

export { Badge }
