import { useId, useState } from "react"
import Button from "@mui/material/Button"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"

import Checkbox from "../../../Checkbox"

const DefaultTrigger = ({ label = "Add a label", ...props }) => {
  return (
    <Button {...props}>
      <AddCircleOutlineIcon /> {label}
    </Button>
  )
}

const CheckboxMenuToggleItem = ({ label = "Add a label", checked = false, onChange = () => {}, icon = null }) => {
  return (
    <Stack direction="row" alignItems="center" spacing={1} useFlexGap>
      <Checkbox checked={checked} onChange={onChange} />
      {icon && icon}
      <Typography variant="body2">{label}</Typography>
    </Stack>
  )
}

const CheckboxToggleMenu = ({
  triggerComponent: TriggerComponent = DefaultTrigger,
  column,
  anchorOrigin = { vertical: "bottom", horizontal: "left" },
}) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const open = Boolean(anchorEl)
  const id = useId()
  const triggerId = `filter-menu-${id}`
  const filterOptions = column?.columnDef?.meta?.filterOptions
  const filterValue = column.getFilterValue() ?? []

  const transformOrigin = {
    vertical: anchorOrigin.vertical === "bottom" ? "top" : "bottom",
    horizontal: anchorOrigin.horizontal,
  }

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleMenuItemClick = item => {
    const nextValue = filterValue.includes(item)
      ? filterValue.length > 1
        ? filterValue.filter(filterItem => filterItem !== item)
        : undefined
      : [...filterValue, item]

    column.setFilterValue(nextValue)

    handleClose()
  }

  return (
    <>
      <TriggerComponent onClick={handleClick} open={open} id={triggerId} />
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
      >
        {filterOptions.map((item, index) => (
          <MenuItem key={`${item}-${index}`} onClick={() => handleMenuItemClick(item)} disabled={item?.disabled}>
            <CheckboxMenuToggleItem label={item} checked={filterValue.includes(item)} />
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
export default CheckboxToggleMenu
