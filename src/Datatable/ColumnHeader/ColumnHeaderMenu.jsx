import { useState } from "react"
import Button from "@mui/material/Button"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Stack from "@mui/material/Stack"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import Typography from "@mui/material/Typography"

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
        {buttonLabel}
        <Stack direction="row" alignItems="center" justifyContent="space-between" useFlexGap>
          {isSorted === "asc" && <KeyboardArrowUpIcon />}
          {isSorted === "desc" && <KeyboardArrowDownIcon />}
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
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1} useFlexGap>
              {option?.icon}
              <Typography variant="body2">{option?.label}</Typography>
            </Stack>
            <span className="end-icon">{option?.endIcon}</span>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default ColumnHeaderMenu
