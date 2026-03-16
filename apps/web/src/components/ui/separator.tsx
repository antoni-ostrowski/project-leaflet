import { cn } from "@/lib/utils"
import { Divider, DividerProps } from "@mui/material"

interface SeparatorProps extends Omit<DividerProps, "orientation"> {
  orientation?: "horizontal" | "vertical"
}

function Separator({ className, orientation = "horizontal", ...props }: SeparatorProps) {
  return (
    <Divider
      data-slot="separator"
      orientation={orientation}
      className={cn(
        "shrink-0",
        orientation === "horizontal" && "w-full",
        orientation === "vertical" && "self-stretch",
        className
      )}
      {...props}
    />
  )
}

export { Separator }