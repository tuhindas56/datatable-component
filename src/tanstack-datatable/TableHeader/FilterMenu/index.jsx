import { useRef, useState } from "react"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import Popover from "@mui/material/Popover"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined"
import Chip from "@mui/material/Chip"

import FilterField from "./FilterField"

import styles from "./styles.module.css"

const FilterMenu = ({ table, setColumnFilters }) => {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)

  const filters = table.getState().columnFilters
  const allColumns = table.getAllColumns()
  const filterableColumns = allColumns.filter(column => column.getCanFilter())
  const columns = filterableColumns.filter(column => !column.getIsFiltered())
  const filterValues = filterableColumns.filter(col => col.getIsFiltered() && col.getFilterValue())

  const handleClick = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const onFilterAdd = () => {
    const firstColumn = columns[0]
    if (!firstColumn) return
    setColumnFilters(prev => [...prev, { id: firstColumn.id, value: undefined }])
  }

  const onFilterReset = () => table.resetColumnFilters()

  return (
    <>
      <Button ref={anchorRef} sx={{ minWidth: "max-content" }} onClick={handleClick}>
        <FilterListOutlinedIcon />
        Filter
        {filterValues?.length > 0 && (
          <>
            <Divider orientation="vertical" variant="middle" sx={{ height: 16 }} />
            <Chip label={`${filterValues.length} active`} />
          </>
        )}
      </Button>

      <Popover
        anchorEl={anchorRef.current}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Stack
          gap={2}
          useFlexGap
          className="filter-popover-container bottom-anchored"
          sx={{
            minWidth: 380,
          }}
        >
          {filters && !filters.length && (
            <Stack gap={0.2}>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                No filters applied
              </Typography>
              <Typography variant="body2" sx={{ color: "gray" }}>
                Add filters to refine your rows.
              </Typography>
            </Stack>
          )}

          {filters && filters.length > 0 && (
            <>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                Filters
              </Typography>

              <div className={styles["ts-dt-filter-menu-field-container"]}>
                {filters.map(filter => {
                  return (
                    <FilterField
                      filter={filter}
                      filteredColumn={filterableColumns.find(column => column.id === filter.id)}
                      key={filter.id}
                      columns={columns}
                      setColumnFilters={setColumnFilters}
                    />
                  )
                })}
              </div>
            </>
          )}
          <Stack direction="row" gap={1}>
            <Button className="ts-dt-add-sort-filter-button" onClick={onFilterAdd} disabled={columns.length === 0}>
              Add filter
            </Button>
            {filters && filters.length !== 0 && <Button onClick={onFilterReset}>Reset filters</Button>}
          </Stack>
        </Stack>
      </Popover>
    </>
  )
}

export default FilterMenu
