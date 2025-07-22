import { useRef, useState } from "react"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import Popover from "@mui/material/Popover"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import HighlightOffIcon from "@mui/icons-material/HighlightOff"

import Input from "@components/tanstack-datatable/Input"

const Range = ({ column, setColumnFilters }) => {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)

  const label = column.columnDef?.meta?.label ?? ""
  const filterValues = column.getFilterValue() ?? {}

  const currentFrom = filterValues.from ?? ""
  const currentTo = filterValues.to ?? ""

  const handleClick = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleChange = ({ from, to }) => {
    setColumnFilters(prev => {
      const prevFilter = prev.find(filter => filter.id === column.id)
      const prevValue = prevFilter?.value ?? { from: "", to: "" }
      const nextValue = {
        from: from ?? prevValue.from ?? "",
        to: to ?? prevValue.to ?? "",
      }

      if (!nextValue.from && !nextValue.to) {
        return prev.filter(filter => filter.id !== column.id)
      }
      const newFilters = prev.filter(filter => filter.id !== column.id)
      newFilters.push({ id: column.id, value: nextValue })
      return newFilters
    })
  }

  const handleClear = (e) => {
    e.stopPropagation()

    if (filterValues.from || filterValues.to) {
      setColumnFilters(prev => prev.filter(filter => filter.id !== column.id))
    }
  }

  return (
    <>
      <Button ref={anchorRef} onClick={handleClick} className='ts-dt-dynamic-filter-trigger'>
        {!currentFrom && !currentTo ? (
          <AddCircleOutlineIcon />
        ) : (
          <HighlightOffIcon className="ts-dt-dynamic-filter-remove-icon" onClick={handleClear} role="button" />
        )}
        {label}
        {(currentFrom || currentTo) && (
          <>
            <Divider orientation="vertical" variant="middle" sx={{ height: 16 }} />
            {currentFrom && currentTo ? (
              <span style={{ textWrap: "nowrap" }}>
                {currentFrom} - {currentTo}
              </span>
            ) : currentFrom ? (
              <span style={{ textWrap: "nowrap" }}>
                {">"} {currentFrom}
              </span>
            ) : currentTo ? (
              <span style={{ textWrap: "nowrap" }}>
                {"<"} {currentTo}
              </span>
            ) : (
              <></>
            )}
          </>
        )}
      </Button>

      <Popover
        anchorEl={anchorRef.current}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Stack spacing={1.4} useFlexGap className="dynamic-filter-popover-container bottom-anchored">
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            {label}
          </Typography>
          <Stack direction="row" spacing={2} useFlexGap>
            <Input
              type="number"
              value={currentFrom}
              min={0}
              onChange={e => handleChange({ from: e.target.value })}
              placeholder="min"
              style={{ maxWidth: 96 }}
            />
            <Input
              type="number"
              value={currentTo}
              onChange={e => handleChange({ to: e.target.value })}
              placeholder="max"
              style={{ maxWidth: 96 }}
            />
          </Stack>
          <Button className="ts-dt-clear-filter-button" onClick={handleClear}>
            Clear
          </Button>
        </Stack>
      </Popover>
    </>
  )
}

export default Range
