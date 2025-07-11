import { useEffect, useRef, useState } from "react"
import Button from "@mui/material/Button"
import Popover from "@mui/material/Popover"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { DayPicker } from "react-day-picker"
import classNames from "react-day-picker/style.module.css"

import Input from "../../../Input"
import TriggerComponent from "../TriggerComponent"
import { convertFromUnixTimestamp, convertToUnixTimestamp } from "../../../utils"

const Datepicker = ({ column }) => {
  const [selected, setSelected] = useState({ from: "", to: "" })
  const [open, setOpen] = useState(false)

  const anchorRef = useRef(null)
  const internalUpdate = useRef(false)

  const label = column.columnDef?.meta?.label ?? ""
  const filterValues = column.getFilterValue() ?? []

  const syncFilterState = () => {
    setSelected({
      from: (filterValues[0] && convertFromUnixTimestamp(filterValues[0])) || "",
      to: (filterValues[1] && convertFromUnixTimestamp(filterValues[1])) || "",
    })
  }

  const clearFilterState = () => {
    internalUpdate.current = true
    setSelected({ from: "", to: "" })
  }

  const handleClick = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleChange = ({ from, to }) => setSelected(prev => ({ from: from ? from : prev.from, to: to ? to : prev.to }))

  const handleClear = () => {
    if (filterValues.length) {
      setSelected({ from: "", to: "" })
      column.setFilterValue(undefined)
    }
  }

  useEffect(() => {
    if (internalUpdate.current) {
      internalUpdate.current = false
      return
    }

    const timeout = setTimeout(() => {
      const fromTimestamp = selected.from && convertToUnixTimestamp(selected.from)
      const toTimestamp = selected.to && convertToUnixTimestamp(selected.to)

      if (fromTimestamp !== filterValues[0] || toTimestamp !== filterValues[1]) {
        if (fromTimestamp || toTimestamp) {
          column.setFilterValue([fromTimestamp, toTimestamp])
        }
      }
    }, 300)

    return () => clearTimeout(timeout)
  }, [selected.from, selected.to, column])

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
        onTransitionEnter={syncFilterState}
        onTransitionExited={clearFilterState}
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
