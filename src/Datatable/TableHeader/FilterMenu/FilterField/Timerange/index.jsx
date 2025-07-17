import Stack from "@mui/material/Stack"

import Timepicker from "../../../../Timepicker"

const Timerange = ({ filter, timeRanges, setTimeRanges }) => {
  const currentFrom = (timeRanges[filter.id] && timeRanges[filter.id]["from"]) ?? null
  const currentTo = (timeRanges[filter.id] && timeRanges[filter.id]["to"]) ?? null

  const handleChange = ({ from, to }) => {
    setTimeRanges(prev => ({
      ...prev,
      [filter.id]: {
        ...prev[filter.id],
        from: from ?? prev[filter.id]?.from ?? null,
        to: to ?? prev[filter.id]?.to ?? null,
      },
    }))
  }

  return (
    <Stack direction="row" gap={2}>
      <Timepicker value={currentFrom} onChange={date => handleChange({ from: date })} />
      <Timepicker value={currentTo} onChange={date => handleChange({ to: date })} />
    </Stack>
  )
}
export default Timerange
