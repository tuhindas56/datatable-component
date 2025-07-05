import { useState, useRef } from "react"
import Button from "@mui/material/Button"
import Chip from "@mui/material/Chip"
import Popover from "@mui/material/Popover"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import SwapVertIcon from "@mui/icons-material/SwapVert"

import SortField from "./SortField"

const SortMenu = ({ table }) => {
  const [open, setOpen] = useState(false)

  const anchorRef = useRef(null)
  const sorting = table.getState().sorting
  const onSortingChange = table.setSorting
  const columns = table.getAllColumns().filter(column => column.getCanSort() && !column.getIsSorted())
  const sortableColumns = table.getAllColumns().filter(column => column.getCanSort())

  const handleClick = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const onSortAdd = () => {
    const firstColumn = columns[0]
    if (!firstColumn) return
    onSortingChange(prev => [...prev, { id: firstColumn.id, desc: false }])
  }

  const onSortReset = () => {
    onSortingChange([])
  }

  const onSortUpdate = (sortId, updates) => {
    onSortingChange(prevSorting => {
      if (!prevSorting) return prevSorting
      return prevSorting.map(sort => (sort.id === sortId ? { ...sort, ...updates } : sort))
    })
  }

  const onSortRemove = sortId => {
    onSortingChange(prevSorting => prevSorting.filter(item => item.id !== sortId))
  }

  return (
    <>
      <Button onClick={handleClick} ref={anchorRef}>
        <SwapVertIcon /> Sort {sorting.length > 0 && <Chip label={sorting.length} sx={{ marginLeft: 0.6 }} />}
      </Button>
      <Popover
        anchorEl={anchorRef.current}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Stack spacing={2} className="sort-popover-container" useFlexGap sx={{ minWidth: 380 }}>
          {!sorting.length && (
            <Stack>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                No sorting applied
              </Typography>
              <Typography variant="body2" sx={{ color: "gray" }}>
                Add sorting to organize your rows.
              </Typography>
            </Stack>
          )}
          {sorting.length > 0 && (
            <>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                Sort by
              </Typography>

              {sorting.map(sort => {
                return (
                  <SortField
                    sort={sort}
                    key={sort.id}
                    sortedColLabel={sortableColumns.find(col => col.id === sort.id).columnDef?.meta?.label}
                    columns={columns}
                    onSortUpdate={onSortUpdate}
                    onSortRemove={onSortRemove}
                  />
                )
              })}
            </>
          )}
          <Stack direction="row" gap={1}>
            <Button className="ts-dt-add-sort-filter-button" onClick={onSortAdd} disabled={columns.length === 0}>
              Add sort
            </Button>
            <Button onClick={onSortReset}>Reset sorting</Button>
          </Stack>
        </Stack>
      </Popover>
    </>
  )
}
export default SortMenu
