import { useEffect, useRef, useState } from "react"
import Button from "@mui/material/Button"
import Popover from "@mui/material/Popover"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

import Input from "../../../Input"
import TriggerComponent from "../TriggerComponent"

const convertToUnixTimestamp = date => Math.floor(new Date(date).getTime() / 1000)

const Datepicker = ({ column, label, filterValues = [] }) => {
  const [selected, setSelected] = useState({ from: "", to: "" })
  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)

  const handleClick = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleChange = ({ from, to }) => {
    if (from) setSelected(prev => ({ ...prev, from }))
    if (to) setSelected(prev => ({ ...prev, to }))
  }

  const handleClear = () => {
    if (filterValues.length) {
      setSelected({ from: "", to: "" })
      column.setFilterValue(undefined)
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (selected.from && selected.to) {
        const filterValue = [convertToUnixTimestamp(selected.from), convertToUnixTimestamp(selected.to)]
        column.setFilterValue(filterValue)
      }
    }, 600)

    return () => clearTimeout(timeout)
  }, [selected, column])

  return (
    <>
      <TriggerComponent
        onClick={handleClick}
        label={label}
        filterValues={filterValues}
        ref={anchorRef}
        type="daterange"
      />
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
              type="date"
              required
              placeholder="Start date"
              onChange={e => handleChange({ from: e.target.value })}
              value={selected.from}
            />
            <Input
              type="date"
              required
              placeholder="End date"
              onChange={e => handleChange({ to: e.target.value })}
              value={selected.to}
              min={selected.from}
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

export default Datepicker
