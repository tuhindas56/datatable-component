import Divider from "@mui/material/Divider"
import Stack from "@mui/material/Stack"
import Input from "@mui/material/Input"
import SearchIcon from "@mui/icons-material/Search"

const MenuSearchBar = ({ value, setSearch, placeholder }) => {
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

export default MenuSearchBar
