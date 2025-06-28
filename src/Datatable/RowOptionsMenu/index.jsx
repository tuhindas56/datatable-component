import React, { useState } from "react"
import IconButton from "@mui/material/IconButton"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Stack from "@mui/material/Stack"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import Typography from "@mui/material/Typography"

const RowOptionsMenu = React.memo(({ options = [] }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = event => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  return (
    <>
      <IconButton onClick={handleClick} className={`row-options-trigger ${open ? "menu-open" : ""}`}>
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="row-options-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={index}
            onClick={e => {
              option.onClick?.(e)
              handleClose()
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center" useFlexGap>
              {option.icon}
              <Typography variant="body2">{option.label}</Typography>
            </Stack>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
})

RowOptionsMenu.displayName = "RowOptionsMenu"

export default RowOptionsMenu
