import { useState } from "react"
import Button from "@mui/material/Button"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Stack from "@mui/material/Stack"
import { ChevronUp, ChevronDown, MoreVertical } from "react-feather"
import MoreVertIcon from "@mui/icons-material/MoreVert"

const ColumnHeaderMenu = ({ buttonLabel = "Menu Button", options = [], isSorted = false }) => {
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
      <Button size="small" onClick={handleClick} className={"column-header-menu-trigger" + (open ? " menu-open" : "")}>
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={0.5} useFlexGap>
          {buttonLabel}
          {isSorted === "asc" && <ChevronUp />}
          {isSorted === "desc" && <ChevronDown />}
          <MoreVertIcon />
        </Stack>
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
