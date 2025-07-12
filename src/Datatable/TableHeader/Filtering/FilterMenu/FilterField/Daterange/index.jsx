import Stack from "@mui/material/Stack"
import { DayPicker } from "react-day-picker"
import classNames from "react-day-picker/style.module.css"

import Input from "../../../../../Input"

const Daterange = ({ filter, dateRanges, setDateRanges }) => {
  const currentFrom = (dateRanges[filter.id] && dateRanges[filter.id]["from"]) ?? ""
  const currentTo = (dateRanges[filter.id] && dateRanges[filter.id]["to"]) ?? ""

  const handleChange = ({ from, to }) => {
    setDateRanges(prev => ({
      ...prev,
      [filter.id]: {
        ...prev[filter.id],
        from: from ?? prev[filter.id]?.from ?? "",
        to: to ?? prev[filter.id]?.to ?? "",
      },
    }))
  }

  return (
    <Stack direction="row" gap={2}>
      <Input type="date" onChange={e => handleChange({ from: e.target.value })} value={currentFrom} max={currentTo} />
      <Input type="date" onChange={e => handleChange({ to: e.target.value })} value={currentTo} min={currentFrom} />

      {/* <Button onClick={handleClick} className="rows-per-page-menu-trigger" ref={anchorRef}>
        {!filterValues.length > 0 ? (
          <Typography variant="body2" sx={{ color: "darkgray" }} noWrap>
            Select options...
          </Typography>
        ) : (
          <Chip label={`${filterValues.length} selected`} />
        )}
      </Button> */}
      {/* <DayPicker classNames={classNames} /> */}
    </Stack>
  )
}
export default Daterange
