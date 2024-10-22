import * as React from "react";
import { cn } from "@/lib/Helper/utils";

interface ButtonProps {
  className?: string;
  variant?: 'default' | 'outline' | 'ghost' | 'primary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  [key: string]: any;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          variant === "default" && "bg-primary text-white hover:bg-primary-dark dark:bg-primary-dark dark:text-gray-900 dark:hover:bg-primary",
          variant === "outline" && "border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700",
          variant === "ghost" && "bg-transparent border-none hover:bg-gray-100 dark:hover:bg-gray-700",
          variant === "primary" && "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700",
          size === "sm" && "h-8 px-3 text-xs",
          size === "md" && "h-12 px-4 text-sm",
          size === "lg" && "h-14 px-5 text-md",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
