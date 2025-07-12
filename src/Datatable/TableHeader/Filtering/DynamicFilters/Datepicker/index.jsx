import { useRef, useState } from "react"
import Button from "@mui/material/Button"
import Popover from "@mui/material/Popover"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { DayPicker } from "react-day-picker"
import classNames from "react-day-picker/style.module.css"

import Input from "../../../../Input"
import TriggerComponent from "../../TriggerComponent"

const Datepicker = ({ column, dateRanges, setDateRanges }) => {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)

  const label = column.columnDef?.meta?.label ?? ""
  const filterValues = column.getFilterValue() ?? []

  const currentFrom = (dateRanges[column.id] && dateRanges[column.id]["from"]) ?? ""
  const currentTo = (dateRanges[column.id] && dateRanges[column.id]["to"]) ?? ""

  const handleClick = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleChange = ({ from, to }) => {
    setDateRanges(prev => ({
      ...prev,
      [column.id]: {
        ...prev[column.id],
        from: from ?? prev[column.id]?.from ?? "",
        to: to ?? prev[column.id]?.to ?? "",
      },
    }))
  }

  const handleClear = () => {
    if (filterValues.length) {
      setDateRanges(prev => {
        const newState = { ...prev }
        delete newState[column.id]
        return newState
      })

      column.setFilterValue(undefined)
    }
  }

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
              value={currentFrom}
              max={currentTo}
            />
            <Input
              type="date"
              required
              placeholder="End date"
              onChange={e => handleChange({ to: e.target.value })}
              value={currentTo}
              min={currentFrom}
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
