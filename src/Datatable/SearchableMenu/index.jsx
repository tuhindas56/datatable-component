import { useId, useState } from "react"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Divider from "@mui/material/Divider"
import Stack from "@mui/material/Stack"
import Input from "@mui/material/Input"
import SearchIcon from "@mui/icons-material/Search"

function MenuSearchBar({ value, setSearch, placeholder }) {
  const handleInputChange = e => {
    setSearch(e.target.value)
  }

  const handleKeyDown = e => {
    e.stopPropagation()
  }

  return (
    <div>
      <Stack direction="row">
        <SearchIcon />
        <Input
          type="text"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disableUnderline
          placeholder={placeholder}
          autoFocus
        />
      </Stack>
      <Divider />
    </div>
  )
}

function NoResultsItem() {
  return <MenuItem sx={{ pointerEvents: "none" }}>No matches found.</MenuItem>
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
              {item.label}
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
