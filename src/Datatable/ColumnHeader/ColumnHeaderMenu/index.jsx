import { useState } from "react"
import Button from "@mui/material/Button"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Stack from "@mui/material/Stack"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import PushPinIcon from "@mui/icons-material/PushPin"
import Typography from "@mui/material/Typography"
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore"

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
      <Button size="small" onClick={handleClick} className={`column-header-menu-trigger ${open ? "menu-open" : ""}`}>
        <Stack direction="row" alignItems="center" spacing={0.5} useFlexGap>
          <Typography variant="body2" fontWeight={500}>
            {buttonLabel}
          </Typography>
          <Stack direction="row" alignItems="center" justifyContent="space-between" useFlexGap>
            {isSorted === "asc" && <KeyboardArrowUpIcon />}
            {isSorted === "desc" && <KeyboardArrowDownIcon />}
            {isPinned && <PushPinIcon sx={{ transform: "rotateZ(45deg)" }} />}
          </Stack>
          <UnfoldMoreIcon />
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
