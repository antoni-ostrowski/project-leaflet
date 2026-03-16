"use client"

import { cn } from "@/lib/utils"
import { FormLabel, FormLabelProps } from "@mui/material"
import { forwardRef } from "react"

interface LabelProps extends FormLabelProps {}

const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <FormLabel
        ref={ref}
        data-slot="label"
        className={cn(
          "flex items-center gap-2 text-xs/relaxed leading-none font-medium select-none",
          className
        )}
        sx={{
          fontSize: "inherit",
          lineHeight: "inherit",
        }}
        {...props}
      />
    )
  }
)

Label.displayName = "Label"

export { Label }