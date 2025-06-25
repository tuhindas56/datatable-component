import { useState } from "react"
import { IconButton, Menu, MenuItem, useTheme } from "@mui/material"
import { MoreVertical } from "react-feather"

const RowOptionsMenu = ({ options = [] }) => {
  const theme = useTheme()
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = event => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  return (
    <>
      <IconButton
        size="small"
        onClick={handleClick}
        sx={{ backgroundColor: open ? theme?.custom?.activeBackground : "" }}
      >
        <MoreVertical size={theme?.custom?.iconSize} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {options.length > 0 ? (
          options.map((option, index) => (
            <MenuItem
              key={index}
              onClick={e => {
                option?.onClick?.(e)
                handleClose()
              }}
              disabled={option?.disabled}
            >
              <span style={{ marginRight: "6px" }}>{option?.icon}</span>
              {option?.label}
            </MenuItem>
          ))
        ) : (
          <MenuItem sx={{ pointerEvents: "none" }}>No options provided.</MenuItem>
        )}
      </Menu>
    </>
  )
}

export default RowOptionsMenu
