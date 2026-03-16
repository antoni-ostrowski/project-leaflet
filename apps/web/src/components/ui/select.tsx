import {
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
  MenuItem,
  MenuItemProps,
} from "@mui/material"
import { forwardRef } from "react"

interface SelectProps extends Omit<MuiSelectProps, "variant"> {}

const Select = forwardRef<HTMLButtonElement, SelectProps>(
  ({ children, ...props }, ref) => {
    return (
      <MuiSelect
        ref={ref}
        data-slot="select"
        variant="outlined"
        size="small"
        {...props}
      >
        {children}
      </MuiSelect>
    )
  }
)

Select.displayName = "Select"

const SelectItem = forwardRef<HTMLLIElement, MenuItemProps>(
  ({ children, ...props }, ref) => {
    return (
      <MenuItem ref={ref} {...props}>
        {children}
      </MenuItem>
    )
  }
)

SelectItem.displayName = "SelectItem"

export { Select, SelectItem }