// import { useState } from "react"
// import IconButton from "@mui/material/IconButton"
// import Menu from "@mui/material/Menu"
// import MenuItem from "@mui/material/MenuItem"
// import Stack from "@mui/material/Stack"
// import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
// import Typography from "@mui/material/Typography"

// const RowOptionsMenu = ({ rowID = "", options = [] }) => {
//   const [anchorEl, setAnchorEl] = useState(null)
//   const open = Boolean(anchorEl)

//   const handleClick = event => setAnchorEl(event.currentTarget)
//   const handleClose = () => setAnchorEl(null)

//   return (
//     <>
//       <IconButton onClick={handleClick} className={`row-options-trigger ${open ? "menu-open" : ""}`}>
//         <MoreHorizIcon />
//       </IconButton>
//       <Menu
//         id="row-options-menu"
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//         transformOrigin={{ vertical: "top", horizontal: "right" }}
//       >
//         {options.map((option, index) => (
//           <MenuItem
//             key={`${option?.label}-${rowID}`}
//             onClick={e => {
//               option.onClick?.(e)
//               handleClose()
//             }}
//           >
//             <Stack direction="row" spacing={1} alignItems="center" useFlexGap>
//               {option.icon}
//               <Typography variant="body2">{option.label}</Typography>
//             </Stack>
//           </MenuItem>
//         ))}
//       </Menu>
//     </>
//   )
// }

// export default RowOptionsMenu

import { useState } from "react"
import Stack from "@mui/material/Stack"
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"

import styles from "../../styles.module.css"

const RowOptionsMenu = ({ rowID = "", options = [] }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => setIsOpen(prevState => !prevState)

  return (
    <Stack alignItems="center" className="row-level-options">
      <Dropdown isOpen={isOpen} toggle={toggleDropdown}>
        <DropdownToggle className={styles["dropdown-icon-toggle"]}>
          <MoreHorizIcon />
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
