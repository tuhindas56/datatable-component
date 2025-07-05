import { useEffect, useRef, useState } from "react"
import Button from "@mui/material/Button"
import Popover from "@mui/material/Popover"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

import Input from "../../../Input"
import TriggerComponent from "../TriggerComponent"

const Range = ({ column, label, filterValues = [] }) => {
  const [range, setRange] = useState({ from: "", to: "" })
  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)

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
    const timeout = setTimeout(() => {
      if (range.from >= 0 && range.to > 0) {
        const filterValue = [range.from, range.to]
        column.setFilterValue(filterValue)
      }
    }, 600)

    return () => clearTimeout(timeout)
  }, [range, column])

  return (
    <>
      <TriggerComponent onClick={handleClick} label={label} filterValues={filterValues} ref={anchorRef} type="range" />

      <Popover
        anchorEl={anchorRef.current}
        open={open}
        onClose={handleClose}
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
