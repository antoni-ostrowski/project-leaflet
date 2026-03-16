import { cn } from "@/lib/utils"
import {
  Card as MuiCard,
  CardProps as MuiCardProps,
  CardContent as MuiCardContent,
  CardContentProps,
  CardActions,
  CardActionsProps,
} from "@mui/material"
import { Box } from "@mui/material"
import { forwardRef } from "react"

interface CardProps extends MuiCardProps {
  size?: "default" | "sm"
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, size = "default", ...props }, ref) => {
    return (
      <MuiCard
        ref={ref}
        data-slot="card"
        data-size={size}
        elevation={0}
        className={cn(
          "flex flex-col gap-4 overflow-hidden rounded-lg py-4 ring-1 ring-foreground/10",
          size === "sm" && "gap-3 py-3",
          className
        )}
        {...props}
      />
    )
  }
)

Card.displayName = "Card"

interface CardHeaderProps extends React.ComponentProps<"div"> {}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        data-slot="card-header"
        className={cn("flex flex-col gap-1 px-4", className)}
        {...props}
      />
    )
  }
)

CardHeader.displayName = "CardHeader"

interface CardTitleProps extends React.ComponentProps<"div"> {}

const CardTitle = forwardRef<HTMLDivElement, CardTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="card-title"
        className={cn("text-sm font-medium", className)}
        {...props}
      />
    )
  }
)

CardTitle.displayName = "CardTitle"

interface CardDescriptionProps extends React.ComponentProps<"div"> {}

const CardDescription = forwardRef<HTMLDivElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="card-description"
        className={cn("text-xs text-muted-foreground", className)}
        {...props}
      />
    )
  }
)

CardDescription.displayName = "CardDescription"

interface CardActionProps extends React.ComponentProps<"div"> {}

const CardAction = forwardRef<HTMLDivElement, CardActionProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="card-action"
        className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
        {...props}
      />
    )
  }
)

CardAction.displayName = "CardAction"

interface CardContentPropsExt extends CardContentProps {}

const CardContent = forwardRef<HTMLDivElement, CardContentPropsExt>(
  ({ className, ...props }, ref) => {
    return (
      <MuiCardContent
        ref={ref}
        data-slot="card-content"
        className={cn("px-4 last:pb-4", className)}
        {...props}
      />
    )
  }
)

CardContent.displayName = "CardContent"

interface CardFooterProps extends CardActionsProps {}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <CardActions
        ref={ref}
        data-slot="card-footer"
        className={cn("flex items-center px-4", className)}
        {...props}
      />
    )
  }
)

CardFooter.displayName = "CardFooter"

export { Card }
export { CardHeader }
export { CardTitle }
export { CardDescription }
export { CardAction }
export { CardContent }
export { CardFooter }