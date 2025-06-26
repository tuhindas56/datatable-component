import { useState } from "react"
import { Button, Menu, MenuItem } from "@mui/material"
import PushPinIcon from "@mui/icons-material/PushPin"
import { ChevronUp, ChevronDown } from "react-feather"
import MoreVertIcon from "@mui/icons-material/MoreVert"

const ColumnHeaderMenu = ({ buttonLabel = "Menu Button", options = [], isSorted = false, isPinned = false }) => {
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
      <Button size="small" onClick={handleClick} endIcon={<MoreVertIcon />}>
        {buttonLabel}
        {isSorted === "asc" && <ChevronUp />}
        {isSorted === "desc" && <ChevronDown />}
        {isPinned && <PushPinIcon fontSize="small" sx={{ transform: "rotate(40deg)" }} />}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        {options.map((option, index) => (
          <MenuItem key={index} onClick={e => handleMenuItemClick(e, option.onClick)} disabled={option.disabled}>
            {option.icon}
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default ColumnHeaderMenu
