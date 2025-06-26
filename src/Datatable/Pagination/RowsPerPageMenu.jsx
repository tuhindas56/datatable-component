import { useState } from "react"
import { Button, Menu, MenuItem } from "@mui/material"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"

const RowsPerPageMenu = ({ value, options = [], onChange, anchorOrigin = { vertical: "top", horizontal: "left" } }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = event => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  const handleMenuItemClick = (e, onClick = () => {}) => {
    onClick(e)
    handleClose()
  }

  return (
    <>
      <Button onClick={handleClick}>
        {value}
        <KeyboardArrowDownIcon />
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose} anchorOrigin={anchorOrigin}>
        {options.map((option, index) => (
          <MenuItem key={index} onClick={e => handleMenuItemClick(e, option.onClick)}>
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default RowsPerPageMenu
