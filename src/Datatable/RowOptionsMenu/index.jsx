import React from "react"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"

import Dropdown from "react-bootstrap/Dropdown"
import Stack from "react-bootstrap/Stack"

const RowOptionsMenu = React.memo(({ options = [] }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle className={`row-options-trigger ${open ? "menu-open" : ""}`}>
        <MoreHorizIcon />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {options.map((option, index) => (
          <Dropdown.Item key={index} onClick={option?.onClick}>
            <Stack direction="horizontal" gap={1}>
              {option.icon}
              <span>{option.label}</span>
            </Stack>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )
})

RowOptionsMenu.displayName = "RowOptionsMenu"

export default RowOptionsMenu
