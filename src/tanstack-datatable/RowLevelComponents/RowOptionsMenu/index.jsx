import { useState } from "react"
import Stack from "@mui/material/Stack"
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap"
import MoreVertIcon from "@mui/icons-material/MoreVert"

import styles from "./styles.module.css"

const RowOptionsMenu = ({ rowID = "", options = [] }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => setIsOpen(prevState => !prevState)

  return (
    <Stack alignItems="center" className="row-level-options">
      <Dropdown isOpen={isOpen} toggle={toggleDropdown}>
        <DropdownToggle className={styles["dropdown-icon-toggle"]}>
          <MoreVertIcon />
        </DropdownToggle>
        <DropdownMenu className={styles["dropdown-menu"]}>
          {options.map(option => (
            <DropdownItem
              key={`${option?.label}-${rowID}`}
              onClick={option?.onClick}
              className={styles["dropdown-item"]}
            >
              {option?.icon} {option?.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </Stack>
  )
}

export default RowOptionsMenu
