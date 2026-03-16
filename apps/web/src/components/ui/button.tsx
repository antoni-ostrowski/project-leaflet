import { cn } from "@/lib/utils"
import { Button as MuiButton, ButtonProps as MuiButtonProps } from "@mui/material"
import { cva, type VariantProps } from "class-variance-authority"
import { forwardRef } from "react"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-md text-xs/relaxed font-medium whitespace-nowrap transition-all outline-none select-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        outline: "",
        secondary: "",
        ghost: "",
        destructive: "",
        link: ""
      },
      size: {
        default: "h-7 gap-1 px-2 [&_svg:not([class*='size-'])]:size-3.5",
        xs: "h-5 gap-1 rounded-sm px-2 text-[0.625rem] [&_svg:not([class*='size-'])]:size-2.5",
        sm: "h-6 gap-1 px-2 [&_svg:not([class*='size-'])]:size-3",
        lg: "h-8 gap-1 px-2.5 [&_svg:not([class*='size-'])]:size-4",
        icon: "size-7 [&_svg:not([class*='size-'])]:size-3.5",
        "icon-xs": "size-5 rounded-sm [&_svg:not([class*='size-'])]:size-2.5",
        "icon-sm": "size-6 [&_svg:not([class*='size-'])]:size-3",
        "icon-lg": "size-8 [&_svg:not([class*='size-'])]:size-4"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)

type ButtonVariant = "default" | "outline" | "secondary" | "ghost" | "destructive" | "link"
type ButtonSize = "default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"

const variantToMuiColor = (variant: ButtonVariant): MuiButtonProps["color"] => {
  switch (variant) {
    case "destructive":
      return "error"
    case "secondary":
      return "secondary"
    default:
      return "primary"
  }
}

const variantToMuiVariant = (variant: ButtonVariant): MuiButtonProps["variant"] => {
  switch (variant) {
    case "outline":
      return "outlined"
    case "ghost":
      return "text"
    case "link":
      return "text"
    default:
      return "contained"
  }
}

interface ButtonProps extends Omit<MuiButtonProps, "variant" | "size">, VariantProps<typeof buttonVariants> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const muiColor = variantToMuiColor(variant)
    const muiVariant = variantToMuiVariant(variant)

    const isLink = variant === "link"
    const isIconButton = size?.startsWith("icon")

    return (
      <MuiButton
        ref={ref}
        data-slot="button"
        color={muiColor}
        variant={muiVariant}
        className={cn(
          buttonVariants({ variant, size }),
          isLink && "underline-offset-4 hover:underline normal-case",
          className
        )}
        sx={{
          ...(isIconButton && {
            minWidth: "auto",
            padding: 0,
          }),
          textTransform: "none",
          fontSize: "inherit",
          fontWeight: "inherit",
        }}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }