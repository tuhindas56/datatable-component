import { useState } from "react"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Typography from "@mui/material/Typography"
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined"
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore"

import styles from "../styles.module.css"

import Daterange from "./Daterange"
import Multiselect from "./Multiselect"
import Range from "./Range"
import Timerange from "../Timerange"

const generateFilter = ({
  filteredColumn,
  filter,
  setColumnFilters,
  ranges,
  setRanges,
  dateRanges,
  setDateRanges,
  timeRanges,
  setTimeRanges,
}) => {
  const type = filteredColumn.columnDef?.meta?.filter?.type

  switch (type) {
    case "multiselect":
      return <Multiselect filteredColumn={filteredColumn} filter={filter} setColumnFilters={setColumnFilters} />
    case "daterange":
      return <Daterange filter={filter} dateRanges={dateRanges} setDateRanges={setDateRanges} />
    case "timerange":
      return <Timerange filter={filter} timeRanges={timeRanges} setTimeRanges={setTimeRanges} />
    case "range":
      return <Range filter={filter} ranges={ranges} setRanges={setRanges} />
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
    setColumnFilters(prev => prev.map(col => (col.id === filteredColumn.id ? { id: column.id } : col)))
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

const FilterField = ({
  filter,
  filteredColumn,
  columns,
  setColumnFilters,
  ranges,
  setRanges,
  dateRanges,
  setDateRanges,
  timeRanges,
  setTimeRanges,
}) => {
  const onFilterRemove = id => {
    const type = filteredColumn.columnDef?.meta?.filter?.type

    switch (type) {
      case "multiselect":
        setColumnFilters(prev => prev.filter(column => column.id !== id))
        break

      case "daterange":
        setColumnFilters(prev => prev.filter(column => column.id !== id))
        setDateRanges(prev => {
          const newState = { ...prev }
          delete newState[filteredColumn.id]
          return newState
        })
        break

      case "timerange":
        setColumnFilters(prev => prev.filter(column => column.id !== id))
        setTimeRanges(prev => {
          const newState = { ...prev }
          delete newState[filteredColumn.id]
          return newState
        })
        break

      case "range":
        setColumnFilters(prev => prev.filter(column => column.id !== id))
        setRanges(prev => {
          const newState = { ...prev }
          delete newState[filteredColumn.id]
          return newState
        })
        break

      default:
        return null
    }
  }

  return (
    <div className={styles["ts-dt-filter-menu-filter-field"]}>
      <ColumnMenu columns={columns} filteredColumn={filteredColumn} setColumnFilters={setColumnFilters} />
      {generateFilter({
        filteredColumn,
        filter,
        setColumnFilters,
        ranges,
        setRanges,
        dateRanges,
        setDateRanges,
        timeRanges,
        setTimeRanges,
      })}
      <IconButton sx={{ border: "4px solid red" }} onClick={() => onFilterRemove(filter.id)}>
        <DeleteOutlinedIcon sx={{ fontSize: 16 }} />
      </IconButton>
    </div>
  )
}
export default FilterField
