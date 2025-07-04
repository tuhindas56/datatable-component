import { useRef, useState } from "react"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"

import CheckboxMenuToggleItem from "./CheckboxMenuToggleItem"
import TriggerComponent from "../TriggerComponent"

const CheckboxToggleMenu = ({
  column,
  anchorOrigin = { vertical: "bottom", horizontal: "left" },
  label,
  filterValues = [],
}) => {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)

  const filterOptions = column?.columnDef?.meta?.filterOptions

  const transformOrigin = {
    vertical: anchorOrigin.vertical === "bottom" ? "top" : "bottom",
    horizontal: anchorOrigin.horizontal,
  }

  const handleClick = () => setOpen(true)

  const handleClose = () => setOpen(false)

  const handleMenuItemClick = item => {
    let nextValue

    if (!filterValues.includes(item)) {
      nextValue = [...filterValues, item]
    } else if (filterValues.length > 1) {
      nextValue = filterValues.filter(filterItem => filterItem !== item)
    }

    column.setFilterValue(nextValue)
  }

  return (
    <>
      <TriggerComponent onClick={handleClick} label={label} filterValues={filterValues} ref={anchorRef} />
      <Menu
        anchorEl={anchorRef.current}
        open={open}
        onClose={handleClose}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
      >
        {filterOptions.map((item, index) => (
          <MenuItem key={`${item}-${index}`} onClick={() => handleMenuItemClick(item)}>
            <CheckboxMenuToggleItem label={item} checked={filterValues.includes(item)} />
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
export default CheckboxToggleMenu
