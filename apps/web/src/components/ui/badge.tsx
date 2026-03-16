import { cn } from "@/lib/utils"
import { Chip, ChipProps } from "@mui/material"
import { cva, type VariantProps } from "class-variance-authority"
import { forwardRef, ReactNode } from "react"

const badgeVariants = cva(
  "inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border px-2 py-0.5 text-[0.625rem] font-medium whitespace-nowrap transition-colors",
  {
    variants: {
      variant: {
        default: "",
        secondary: "",
        destructive: "",
        outline: "",
        ghost: "",
        link: ""
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

type BadgeVariant = "default" | "secondary" | "destructive" | "outline" | "ghost" | "link"

const variantToMuiColor = (variant: BadgeVariant): ChipProps["color"] => {
  switch (variant) {
    case "destructive":
      return "error"
    case "secondary":
      return "secondary"
    default:
      return "primary"
  }
}

const variantToMuiVariant = (variant: BadgeVariant): ChipProps["variant"] => {
  switch (variant) {
    case "outline":
      return "outlined"
    case "ghost":
      return "outlined"
    default:
      return "filled"
  }
}

interface BadgeProps extends Omit<ChipProps, "variant" | "color" | "children">, VariantProps<typeof badgeVariants> {
  variant?: BadgeVariant
  children?: ReactNode
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const muiColor = variantToMuiColor(variant)
    const muiVariant = variantToMuiVariant(variant)

    return (
      <Chip
        ref={ref}
        data-slot="badge"
        color={muiColor}
        variant={muiVariant}
        size="small"
        label={<span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>{children}</span>}
        className={cn(badgeVariants({ variant }), className)}
        sx={{
          height: "auto",
          minHeight: "1.25rem",
          fontSize: "0.625rem",
          fontWeight: 500,
        }}
        {...props}
      />
    )
  }
)

Badge.displayName = "Badge"

export { Badge, badgeVariants }