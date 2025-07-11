import { useState } from "react"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined"
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore"

import styles from "../styles.module.css"

import Daterange from "./Daterange"
import Multiselect from "./Multiselect"
import Range from "./Range"

const generateFilter = (filteredColumn, filter, setColumnFilters) => {
  const type = filteredColumn.columnDef?.meta?.filter?.type

  switch (type) {
    case "multiselect":
      return <Multiselect filteredColumn={filteredColumn} filter={filter} setColumnFilters={setColumnFilters} />
    case "daterange":
      return <Daterange filter={filter} setColumnFilters={setColumnFilters} />
    case "range":
      return <Range filter={filter} setColumnFilters={setColumnFilters} />
    default:
      return null
  }
}

const ColumnMenu = ({ columns = [], filteredColumn, setColumnFilters }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const label = filteredColumn?.columnDef?.meta?.label

  const handleClick = event => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  const handleMenuItemClick = column => {
    setColumnFilters(prev => prev.map(col => (col.id === filteredColumn.id ? { ...col, id: column.id } : col)))
  }

  return (
    <>
      <Button onClick={handleClick} className="rows-per-page-menu-trigger">
        <Typography variant="body2">{label}</Typography>
        <UnfoldMoreIcon />
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {columns.length > 0 ? (
          columns.map((column, index) => (
            <MenuItem key={`${column.id}-${index}-filter-menu`} onClick={() => handleMenuItemClick(column)}>
              <Typography variant="body2">{column.columnDef?.meta?.label}</Typography>
            </MenuItem>
          ))
        ) : (
          <MenuItem
            sx={{
              "&:hover": {
                background: "transparent",
              },
            }}
          >
            <Typography variant="body2">No other filterable columns</Typography>
          </MenuItem>
        )}
      </Menu>
    </>
  )
}

const FilterField = ({ filter, filteredColumn, columns, setColumnFilters, onFilterRemove }) => {
  return (
    <div className={styles["ts-dt-filter-menu-filter-field"]}>
      <ColumnMenu columns={columns} filteredColumn={filteredColumn} setColumnFilters={setColumnFilters} />
      {generateFilter(filteredColumn, filter, setColumnFilters)}
      <IconButton sx={{ border: "4px solid red" }} onClick={() => onFilterRemove(filter.id)}>
        <DeleteOutlinedIcon sx={{ fontSize: 16 }} />
      </IconButton>
    </div>
  )
}
export default FilterField
