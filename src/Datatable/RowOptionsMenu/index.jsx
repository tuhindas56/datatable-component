import React, { useState } from "react"
import { IconButton, Menu, MenuItem, Stack } from "@mui/material"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"

const RowOptionsMenu = React.memo(({ options = [] }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = event => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  return (
    <Stack alignItems="center">
      <IconButton onClick={handleClick}>
        <MoreHorizIcon />
      </IconButton>
      <Menu id="row-options-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
        {options.map((option, index) => (
          <MenuItem
            key={index}
            onClick={e => {
              option.onClick?.(e)
              handleClose()
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              {option.icon}
              {option.label}
            </Stack>
          </MenuItem>
        ))}
      </Menu>
    </Stack>
  )
})

RowOptionsMenu.displayName = "RowOptionsMenu"

export default RowOptionsMenu
