import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { cn } from "@/lib/utils"

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
const DropdownMenuContent = DropdownMenuPrimitive.Content
const DropdownMenuItem = DropdownMenuPrimitive.Item
const DropdownMenuLabel = DropdownMenuPrimitive.Label
const DropdownMenuSeparator = DropdownMenuPrimitive.Separator
const DropdownMenuCheckboxItem = DropdownMenuPrimitive.CheckboxItem

export {
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
}

export const DropdownMenu = DropdownMenuPrimitive.Root

export const DropdownMenuTriggerStyled = React.forwardRef<
  React.ElementRef<typeof DropdownMenuTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuTrigger>
>(({ className, ...props }, ref) => (
  <DropdownMenuTrigger
    ref={ref}
    className={cn("inline-flex items-center", className)}
    {...props}
  />
))

DropdownMenuTriggerStyled.displayName = "DropdownMenuTrigger"

export const DropdownMenuContentStyled = React.forwardRef<
  React.ElementRef<typeof DropdownMenuContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] rounded-md border border-muted bg-background p-2 shadow-md",
      className
    )}
    {...props}
  />
))

DropdownMenuContentStyled.displayName = "DropdownMenuContent"
