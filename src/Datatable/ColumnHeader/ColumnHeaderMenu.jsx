import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import PushPinIcon from "@mui/icons-material/PushPin"
import Typography from "@mui/material/Typography"
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore"

import Dropdown from "react-bootstrap/Dropdown"
import Stack from "react-bootstrap/Stack"

const ColumnHeaderMenu = ({ buttonLabel = "Menu Button", options = [], isSorted = false, isPinned = false }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="outline-dark" className={`column-header-menu-trigger ${open ? "menu-open" : ""}`}>
        <Stack direction="horizontal" gap={0.5}>
          <span>{buttonLabel}</span>
          <Stack direction="borizontal">
            {isSorted === "asc" && <KeyboardArrowUpIcon />}
            {isSorted === "desc" && <KeyboardArrowDownIcon />}
            {isPinned && <PushPinIcon sx={{ transform: "rotateZ(45deg)" }} />}
          </Stack>
          <UnfoldMoreIcon />
        </Stack>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {options.map((option, index) => (
          <Dropdown.Item key={index} onClick={option?.onClick} disabled={option?.disabled}>
            <Stack direction="borizontal" gap={1}>
              {option?.icon}
              <Typography variant="body2">{option?.label}</Typography>
            </Stack>
            <span className="end-icon">{option?.endIcon}</span>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default ColumnHeaderMenu
