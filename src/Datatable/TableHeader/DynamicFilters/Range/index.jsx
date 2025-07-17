import { useRef, useState } from "react"
import Button from "@mui/material/Button"
import Popover from "@mui/material/Popover"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

import Input from "../../../Input"
import TriggerComponent from "../../TriggerComponent"

const Range = ({ column, ranges, setRanges }) => {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)

  const label = column.columnDef?.meta?.label ?? ""
  const filterValues = column.getFilterValue() ?? []

  const currentFrom = (ranges[column.id] && ranges[column.id]["from"]) ?? ""
  const currentTo = (ranges[column.id] && ranges[column.id]["to"]) ?? ""

  const handleClick = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleChange = ({ from, to }) => {
    setRanges(prev => ({
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
      setRanges(prev => {
        const newState = { ...prev }
        delete newState[column.id]
        return newState
      })

      column.setFilterValue(undefined)
    }
  }

  return (
    <>
      <TriggerComponent onClick={handleClick} label={label} filterValues={filterValues} ref={anchorRef} type="range" />

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
