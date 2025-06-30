import { useId, useState } from "react"
import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Typography from "@mui/material/Typography"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

import MenuSearchBar from "./MenuSearchBar"
import NoResultsItem from "./NoResultsItem"

const DefaultTrigger = props => (
  <Button {...props}>
    <ExpandMoreIcon /> Menu
  </Button>
)

const SearchableMenu = ({
  triggerComponent: TriggerComponent = DefaultTrigger,
  menuItems = [],
  anchorOrigin = { vertical: "bottom", horizontal: "left" },
  searchPlaceholder = "Search...",
  checkboxes = false,
}) => {
  const [search, setSearch] = useState("")
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const id = useId()
  const triggerId = `searchable-menu-${id}`

  const visibleItems = search
    ? menuItems.filter(item => item.label?.toLowerCase().includes(search.toLowerCase()))
    : menuItems

  const transformOrigin = {
    vertical: anchorOrigin.vertical === "bottom" ? "top" : "bottom",
    horizontal: anchorOrigin.horizontal,
  }

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setSearch("")
  }

  const handleMenuItemClick = (e, onClick = () => {}) => {
    onClick(e)
    handleClose()
  }

  return (
    <>
      <TriggerComponent onClick={handleClick} open={open} id={triggerId} />

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
      >
        <MenuSearchBar value={search} setSearch={setSearch} placeholder={searchPlaceholder} />

        {visibleItems.length > 0 ? (
          visibleItems.map((item, index) => (
            <MenuItem key={index} onClick={e => handleMenuItemClick(e, item?.onClick)} disabled={item?.disabled}>
              {checkboxes && <Checkbox onChange={() => {}} />}
              {item.icon && <span>{item.icon}</span>}
              <Typography variant="body2">{item?.label}</Typography>
              {item.endIcon && <span style={{ marginLeft: "auto" }}>{item.endIcon}</span>}
            </MenuItem>
          ))
        ) : (
          <NoResultsItem />
        )}
      </Menu>
    </>
  )
}

export default SearchableMenu
