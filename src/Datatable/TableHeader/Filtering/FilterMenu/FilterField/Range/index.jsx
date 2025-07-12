import Stack from "@mui/material/Stack"

import Input from "../../../../../Input"

const Range = ({ filter, ranges, setRanges }) => {
  const currentFrom = (ranges[filter.id] && ranges[filter.id]["from"]) ?? ""
  const currentTo = (ranges[filter.id] && ranges[filter.id]["to"]) ?? ""

  const handleChange = ({ from, to }) => {
    setRanges(prev => ({
      ...prev,
      [filter.id]: {
        ...prev[filter.id],
        from: from ?? prev[filter.id]?.from ?? "",
        to: to ?? prev[filter.id]?.to ?? "",
      },
    }))
  }

  return (
    <Stack direction="row" gap={1.6}>
      <Input
        type="number"
        onChange={e => handleChange({ from: e.target.value })}
        placeholder="min"
        value={currentFrom}
      />
      <Input type="number" onChange={e => handleChange({ to: e.target.value })} placeholder="max" value={currentTo} />
    </Stack>
  )
}
export default Range
