import { useId, useState } from "react"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Divider from "@mui/material/Divider"
import Stack from "@mui/material/Stack"
import Input from "@mui/material/Input"
import SearchIcon from "@mui/icons-material/Search"
import Typography from "@mui/material/Typography"

function MenuSearchBar({ value, setSearch, placeholder }) {
  const handleInputChange = e => {
    setSearch(e.target.value)
  }

  const handleKeyDown = e => {
    e.stopPropagation()
  }

  return (
    <Stack>
      <Stack direction="row" spacing={1} alignItems="center">
        <SearchIcon className="search-icon" />
        <Input
          type="text"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="menu-search-bar"
          disableUnderline
          autoFocus
        />
      </Stack>
      <Divider />
    </Stack>
  )
}

function NoResultsItem() {
  return (
    <MenuItem sx={{ pointerEvents: "none" }}>
      <Typography variant="body2">No matches found.</Typography>
    </MenuItem>
  )
}

const SearchableMenu = ({
  triggerComponent: TriggerComponent,
  menuItems = [],
  anchorOrigin = { vertical: "bottom", horizontal: "left" },
  searchPlaceholder = "Search...",
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
      {TriggerComponent && <TriggerComponent onClick={handleClick} open={open} id={triggerId} />}
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
            <MenuItem key={index} onClick={e => handleMenuItemClick(e, item?.onClick)} disabled={item.disabled}>
              {item.icon && <span>{item.icon}</span>}
              <Typography variant="body2">{item.label}</Typography>
              {item?.endIcon && <span style={{ marginLeft: "auto" }}>{item.endIcon}</span>}
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
