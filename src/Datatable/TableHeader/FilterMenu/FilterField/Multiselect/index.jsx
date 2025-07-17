import { useRef, useState } from "react"
import Button from "@mui/material/Button"
import Chip from "@mui/material/Chip"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Typography from "@mui/material/Typography"
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore"

import CheckboxMenuToggleItem from "../../../DynamicFilters/CheckboxToggleMenu/CheckboxMenuToggleItem"
import MenuSearchBar from "../../../../SearchableMenu/MenuSearchBar"
import NoResultsItem from "../../../../SearchableMenu/NoResultsItem"

const Multiselect = ({
  filteredColumn,
  anchorOrigin = { vertical: "bottom", horizontal: "left" },
  filter = {},
  setColumnFilters,
}) => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const anchorRef = useRef(null)

  const filterValues = filter.value ?? []
  const filterOptions = filteredColumn?.columnDef?.meta?.filter?.options ?? []

  const visibleItems = search
    ? filterOptions.filter(item => item.label?.toLowerCase().includes(search.toLowerCase()))
    : filterOptions

  const transformOrigin = {
    vertical: anchorOrigin.vertical === "bottom" ? "top" : "bottom",
    horizontal: anchorOrigin.horizontal,
  }

  const handleClick = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleMenuItemClick = value => {
    let nextValue

    if (!filterValues.includes(value)) {
      nextValue = [...filterValues, value]
    } else if (filterValues.length > 1) {
      nextValue = filterValues.filter(filterItem => filterItem !== value)
    }

    setColumnFilters(prev => prev.map(item => (item.id === filter.id ? { id: filter.id, value: nextValue } : item)))
  }

  return (
    <>
      <Button onClick={handleClick} className="rows-per-page-menu-trigger" ref={anchorRef}>
        {!filterValues.length > 0 ? (
          <Typography variant="body2" sx={{ color: "darkgray" }} noWrap>
            Select options...
          </Typography>
        ) : (
          <Chip label={`${filterValues.length} selected`} />
        )}

        <UnfoldMoreIcon />
      </Button>

      <Menu
        anchorEl={anchorRef.current}
        open={open}
        onClose={handleClose}
        onTransitionExited={() => setSearch("")}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
      >
        <div className="bottom-anchored">
          <MenuSearchBar placeholder="Search.." value={search} setSearch={setSearch} />
          {visibleItems.length > 0 ? (
            visibleItems.map((item, index) => (
              <MenuItem key={`${item?.label}-${index}`} onClick={() => handleMenuItemClick(item?.value)}>
                <CheckboxMenuToggleItem label={item?.label} checked={filterValues?.includes(item?.value)} />
              </MenuItem>
            ))
          ) : (
            <NoResultsItem />
          )}
        </div>
      </Menu>
    </>
  )
}
export default Multiselect
