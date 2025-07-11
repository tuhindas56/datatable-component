import { useEffect, useRef, useState } from "react"
import Button from "@mui/material/Button"
import Popover from "@mui/material/Popover"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

import Input from "../../../Input"
import TriggerComponent from "../TriggerComponent"

const Range = ({ column }) => {
  const label = column.columnDef?.meta?.label ?? ""
  const filterValues = column.getFilterValue() ?? []

  const [open, setOpen] = useState(false)
  const [range, setRange] = useState({ from: "", to: "" })

  const anchorRef = useRef(null)
  const internalUpdate = useRef(false)

  const loadFilterState = () => setRange({ from: filterValues[0] ?? "", to: filterValues[1] ?? "" })

  const clearFilterState = () => {
    internalUpdate.current = true
    setRange({ from: "", to: "" })
  }

  const handleClick = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleChange = ({ from, to }) => {
    if (from) setRange(prev => ({ ...prev, from }))
    if (to) setRange(prev => ({ ...prev, to }))
  }

  const handleClear = () => {
    if (filterValues.length) {
      setRange({ from: "", to: "" })
      column.setFilterValue(undefined)
    }
  }

  useEffect(() => {
    if (internalUpdate.current) {
      internalUpdate.current = false
      return
    }

    const timeout = setTimeout(() => {
      const from = range.from === "" ? null : range.from
      const to = range.to === "" ? null : range.to

      const currentFrom = filterValues[0] ?? null
      const currentTo = filterValues[1] ?? null

      const hasChanged = from !== currentFrom || to !== currentTo

      if (!from && !to) {
        if (filterValues.length) {
          column.setFilterValue(undefined)
        }
        return
      }

      if (hasChanged) {
        column.setFilterValue([from, to])
      }
    }, 300)

    return () => clearTimeout(timeout)
  }, [range.from, range.to, column])

  return (
    <>
      <TriggerComponent onClick={handleClick} label={label} filterValues={filterValues} ref={anchorRef} type="range" />

      <Popover
        anchorEl={anchorRef.current}
        open={open}
        onClose={handleClose}
        onTransitionEnter={loadFilterState}
        onTransitionExited={clearFilterState}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Stack spacing={1.4} useFlexGap className="filter-popover-container">
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            {label}
          </Typography>
          <Stack direction="row" spacing={2} useFlexGap>
            <Input
              type="number"
              min={0}
              value={range.from}
              onChange={e => handleChange({ from: e.target.value })}
              placeholder="min"
              style={{ maxWidth: 96 }}
            />
            <Input
              type="number"
              value={range.to}
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
