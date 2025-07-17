import { useRef, useState } from "react"
import Button from "@mui/material/Button"
import Popover from "@mui/material/Popover"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

import Timepicker from "../../../Timepicker"
import TriggerComponent from "../../TriggerComponent"

const Timerange = ({ column, timeRanges, setTimeRanges }) => {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)

  const label = column.columnDef?.meta?.label ?? ""
  const filterValues = column.getFilterValue() ?? []

  const currentFrom = (timeRanges[column.id] && timeRanges[column.id]["from"]) ?? null
  const currentTo = (timeRanges[column.id] && timeRanges[column.id]["to"]) ?? null

  const handleClick = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleChange = ({ from, to }) => {
    setTimeRanges(prev => ({
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
      setTimeRanges(prev => {
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
        type="timerange"
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
            <Timepicker value={currentFrom} onChange={date => handleChange({ from: date })} />
            <Timepicker value={currentTo} onChange={date => handleChange({ to: date })} />
          </Stack>
          <Button className="ts-dt-clear-filter-button" onClick={handleClear}>
            Clear
          </Button>
        </Stack>
      </Popover>
    </>
  )
}
export default Timerange
