import { useRef, useState } from "react"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"

import CheckboxMenuToggleItem from "./CheckboxMenuToggleItem"
import MenuSearchBar from "../../../SearchableMenu/MenuSearchBar"
import NoResultsItem from "../../../SearchableMenu/NoResultsItem"
import TriggerComponent from "../TriggerComponent"

const CheckboxToggleMenu = ({ column }) => {
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

    column.setFilterValue(nextValue)
  }

  return (
    <>
      <TriggerComponent
        onClick={handleClick}
        label={label}
        filterValues={filterValues}
        ref={anchorRef}
        type="multiselect"
      />
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
        disablePortal
      >
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
      </Menu>
    </>
  )
}
export default CheckboxToggleMenu
