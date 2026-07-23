import * as React from "react"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", ...props }, ref) => {
    const base = "inline-flex items-center justify-center rounded-xl text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer";
    
    let variantStyles = "bg-accent text-accent-foreground hover:bg-accent/90 shadow-md";
    if (variant === "outline") {
      variantStyles = "border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground";
    } else if (variant === "ghost") {
      variantStyles = "hover:bg-accent/10 hover:text-accent";
    } else if (variant === "link") {
      variantStyles = "text-primary underline-offset-4 hover:underline";
    }

    let sizeStyles = "h-11 px-6 py-2.5";
    if (size === "sm") {
      sizeStyles = "h-9 px-4 py-1.5 text-xs";
    } else if (size === "lg") {
      sizeStyles = "h-12 px-8 py-3 text-base";
    } else if (size === "icon") {
      sizeStyles = "h-10 w-10 p-0";
    }

    return (
      <button
        ref={ref}
        className={`${base} ${variantStyles} ${sizeStyles} ${className}`}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
