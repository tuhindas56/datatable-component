import { useRef, useState } from "react"
import Button from "@mui/material/Button"
import Popover from "@mui/material/Popover"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

import Datepicker from "../../../Datepicker"
import TriggerComponent from "../../TriggerComponent"

const Daterange = ({ column, dateRanges, setDateRanges }) => {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)

  const label = column.columnDef?.meta?.label ?? ""
  const filterValues = column.getFilterValue() ?? []

  const currentFrom = (dateRanges[column.id] && dateRanges[column.id]["from"]) ?? null
  const currentTo = (dateRanges[column.id] && dateRanges[column.id]["to"]) ?? null

  const handleClick = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleChange = ({ from, to }) => {
    setDateRanges(prev => ({
      ...prev,
      [column.id]: {
        ...prev[column.id],
        from: from ?? prev[column.id]?.from ?? null,
        to: to ?? prev[column.id]?.to ?? null,
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
        <Stack spacing={1.4} useFlexGap className="dynamic-filter-popover-container bottom-anchored">
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            {label}
          </Typography>
          <Stack spacing={2} direction="row" useFlexGap>
            <Datepicker
              value={currentFrom}
              format="dd/MM/yyyy"
              onChange={date => handleChange({ from: date })}
              maxDate={currentTo}
            />
            <Datepicker
              value={currentTo}
              format="dd/MM/yyyy"
              onChange={date => handleChange({ to: date })}
              minDate={currentFrom}
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

export default Daterange
