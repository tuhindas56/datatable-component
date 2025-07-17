import Stack from "@mui/material/Stack"

import Datepicker from "../../../../Datepicker"

const Daterange = ({ filter, dateRanges, setDateRanges }) => {
  const currentFrom = (dateRanges[filter.id] && dateRanges[filter.id]["from"]) ?? null
  const currentTo = (dateRanges[filter.id] && dateRanges[filter.id]["to"]) ?? null

  const handleChange = ({ from, to }) => {
    setDateRanges(prev => ({
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
  )
}
export default Daterange
