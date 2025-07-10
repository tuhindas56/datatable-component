import { useRef, useState } from "react"
import Button from "@mui/material/Button"
import Popover from "@mui/material/Popover"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined"

import FilterField from "./FilterField"
import TriggerComponent from "../DynamicFilters/TriggerComponent"

const FilterMenu = ({ table, setColumnFilters }) => {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)

  const filters = table.getState().columnFilters
  const allColumns = table.getAllColumns()
  const columns = allColumns.filter(column => column.getCanFilter() && !column.getIsFiltered())
  const filterableColumns = allColumns.filter(column => column.getCanFilter())

  const handleClick = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const onFilterAdd = () => {
    const firstColumn = columns[0]
    if (!firstColumn) return
    setColumnFilters(prev => [...prev, { id: firstColumn.id }])
  }

  const onFilterReset = () => table.resetColumnFilters()

  const onFilterRemove = filterId => setColumnFilters(prev => prev.filter(column => column.id !== filterId))

  return (
    <>
      <TriggerComponent
        onClick={handleClick}
        label="Filter"
        icon={<FilterListOutlinedIcon />}
        ref={anchorRef}
        type="range"
      />

      <Popover
        anchorEl={anchorRef.current}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Stack
          spacing={1.4}
          useFlexGap
          className="filter-popover-container"
          sx={{
            minWidth: 380,
          }}
        >
          {!filters.length && (
            <Stack>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                No filters applied
              </Typography>
              <Typography variant="body2" sx={{ color: "gray" }}>
                Add filters to refine your rows.
              </Typography>
            </Stack>
          )}

          {filters.length > 0 && (
            <>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                Filters
              </Typography>

              {filters.map(filter => {
                return (
                  <FilterField
                    filter={filter}
                    filteredColumn={filterableColumns.find(column => column.id === filter.id)}
                    key={filter.id}
                    columns={columns}
                    setColumnFilters={setColumnFilters}
                    onFilterRemove={onFilterRemove}
                  />
                )
              })}
            </>
          )}
          <Stack direction="row" gap={1}>
            <Button className="ts-dt-add-sort-filter-button" onClick={onFilterAdd} disabled={columns.length === 0}>
              Add filter
            </Button>
            {filters.length !== 0 && <Button onClick={onFilterReset}>Reset filters</Button>}
          </Stack>
        </Stack>
      </Popover>
    </>
  )
}

export default FilterMenu
