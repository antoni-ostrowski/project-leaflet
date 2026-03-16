import { cn } from "@/lib/utils"
import {
  Dialog as MuiDialog,
  DialogProps as MuiDialogProps,
  DialogTitle as MuiDialogTitle,
  DialogContent as MuiDialogContent,
} from "@mui/material"
import { forwardRef, ReactNode } from "react"

interface DialogProps extends Omit<MuiDialogProps, "open"> {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

function Dialog({ open, onOpenChange, ...props }: DialogProps) {
  return <MuiDialog open={open ?? false} onClose={() => onOpenChange?.(false)} {...props} />
}

interface DialogTriggerProps {
  children: ReactNode
}

function DialogTrigger({ children }: DialogTriggerProps) {
  return <>{children}</>
}

interface DialogContentProps extends React.ComponentProps<typeof MuiDialogContent> {}

const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <MuiDialogContent
        ref={ref}
        data-slot="dialog-content"
        className={cn("p-4", className)}
        {...props}
      >
        {children}
      </MuiDialogContent>
    )
  }
)

DialogContent.displayName = "DialogContent"

interface DialogHeaderProps extends React.ComponentProps<"div"> {}

const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="dialog-header"
        className={cn("mb-4 flex flex-col gap-1", className)}
        {...props}
      />
    )
  }
)

DialogHeader.displayName = "DialogHeader"

interface DialogFooterProps extends React.ComponentProps<"div"> {}

const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="dialog-footer"
        className={cn("mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
        {...props}
      />
    )
  }
)

DialogFooter.displayName = "DialogFooter"

const DialogTitle = forwardRef<HTMLHeadingElement, React.ComponentProps<typeof MuiDialogTitle>>(
  ({ className, ...props }, ref) => {
    return (
      <MuiDialogTitle
        ref={ref}
        data-slot="dialog-title"
        className={cn("text-sm font-medium", className)}
        {...props}
      />
    )
  }
)

DialogTitle.displayName = "DialogTitle"

interface DialogDescriptionProps extends React.ComponentProps<"p"> {}

const DialogDescription = forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  ({ className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        data-slot="dialog-description"
        className={cn("text-xs text-muted-foreground", className)}
        {...props}
      />
    )
  }
)

DialogDescription.displayName = "DialogDescription"

function DialogClose({ children }: { children?: ReactNode }) {
  return <>{children}</>
}

function DialogOverlay() {
  return null
}

function DialogPortal() {
  return null
}

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogOverlay,
  DialogPortal,
}