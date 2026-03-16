import { cn } from "@/lib/utils"
import { TextField, TextFieldProps } from "@mui/material"
import { forwardRef } from "react"

interface InputProps extends Omit<TextFieldProps, "variant"> {
  type?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <TextField
        inputRef={ref}
        type={type}
        data-slot="input"
        variant="outlined"
        size="small"
        className={cn("", className)}
        slotProps={{
          input: {
            className: "h-7 text-sm",
          },
        }}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"

export { Input }