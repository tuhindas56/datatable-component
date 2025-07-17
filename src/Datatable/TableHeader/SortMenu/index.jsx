import { useState, useRef } from "react"
import Button from "@mui/material/Button"
import Chip from "@mui/material/Chip"
import Popover from "@mui/material/Popover"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import SwapVertIcon from "@mui/icons-material/SwapVert"

import styles from "./styles.module.css"

import SortField from "./SortField"

const SortMenu = ({ table, direction = "left" }) => {
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

  const onSortReset = () => onSortingChange([])

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
        anchorOrigin={{ vertical: "bottom", horizontal: direction }}
        transformOrigin={{ vertical: "top", horizontal: direction }}
      >
        <Stack gap={2} sx={{ minWidth: 380 }} className="sort-popover-container bottom-anchored">
          {!sorting.length && (
            <Stack gap={0.2}>
              <Typography variant="body1" sx={{ fontWeight: 500, margin: 0 }}>
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
              <Stack gap={1.4}>
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
              </Stack>
            </>
          )}
          <Stack direction="row" gap={1.4}>
            <Button className="ts-dt-add-sort-filter-button" onClick={onSortAdd} disabled={columns.length === 0}>
              Add sort
            </Button>
            {sorting.length !== 0 && <Button onClick={onSortReset}>Reset sorting</Button>}
          </Stack>
        </Stack>
      </Popover>
    </>
  )
}
export default SortMenu
