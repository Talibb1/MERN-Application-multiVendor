import * as React from "react";
import { cn } from "@/lib/Helper/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isInvalid?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, isInvalid, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "block w-full rounded-md border px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",
          "dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:placeholder-gray-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400",
          isInvalid ? "border-red-500" : "border-gray-300",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
