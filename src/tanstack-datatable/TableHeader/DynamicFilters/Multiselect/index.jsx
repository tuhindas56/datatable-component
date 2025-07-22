import { useRef, useState } from "react"
import Button from "@mui/material/Button"
import Chip from "@mui/material/Chip"
import Divider from "@mui/material/Divider"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import HighlightOffIcon from "@mui/icons-material/HighlightOff"

import CheckboxMenuToggleItem from "./CheckboxMenuToggleItem"
import MenuSearchBar from "@components/tanstack-datatable/SearchableMenu/MenuSearchBar"
import NoResultsItem from "@components/tanstack-datatable/SearchableMenu/NoResultsItem"

const Multiselect = ({ column, setColumnFilters }) => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const anchorRef = useRef(null)

  const filterOptions = column?.columnDef?.meta?.filter?.options ?? []
  const label = column.columnDef?.meta?.label ?? ""
  const filterValues = column.getFilterValue() ?? []

  const visibleItems = search
    ? filterOptions.filter(item => item.label?.toLowerCase().includes(search.toLowerCase()))
    : filterOptions

  const handleClick = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleMenuItemClick = value => {
    let nextValue

    if (!filterValues.includes(value)) {
      nextValue = [...filterValues, value]
    } else if (filterValues.length > 1) {
      nextValue = filterValues.filter(filterItem => filterItem !== value)
    }

    setColumnFilters(prev => {
      const newFilters = prev.filter(filter => filter.id !== column.id)
      if (nextValue && nextValue.length) {
        newFilters.push({ id: column.id, value: nextValue })
      }
      return newFilters
    })
  }

  const handleReset = e => {
    e.stopPropagation()
    setColumnFilters(prev => prev.filter(col => col.id !== column.id))
  }

  return (
    <>
      <Button ref={anchorRef} onClick={handleClick} className="ts-dt-dynamic-filter-trigger">
        {!filterValues.length > 0 ? (
          <AddCircleOutlineIcon />
        ) : (
          <HighlightOffIcon className="ts-dt-dynamic-filter-remove-icon" onClick={handleReset} role="button" />
        )}
        {label}
        {filterValues.length > 0 && (
          <>
            <Divider orientation="vertical" variant="middle" sx={{ height: 16 }} />
            <Chip label={`${filterValues?.length} selected`} />
          </>
        )}
      </Button>

      <Menu
        anchorEl={anchorRef.current}
        open={open}
        onClose={handleClose}
        onTransitionExited={() => setSearch("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <div className="bottom-anchored">
          <MenuSearchBar placeholder="Search.." value={search} setSearch={setSearch} />
          {visibleItems.length > 0 ? (
            visibleItems.map((item, index) => (
              <MenuItem key={`${item?.label}-${index}`} onClick={() => handleMenuItemClick(item?.value)}>
                <CheckboxMenuToggleItem label={item?.label} checked={filterValues.includes(item?.value)} />
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
