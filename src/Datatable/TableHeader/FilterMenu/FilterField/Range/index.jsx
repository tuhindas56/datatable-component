import { useState, useEffect } from "react"
import Stack from "@mui/material/Stack"

import Input from "../../../..//Input"

const Range = ({ filter, setColumnFilters }) => {
  const [range, setRange] = useState({ from: "", to: "" })

  const handleChange = ({ from, to }) => {
    if (from) setRange(prev => ({ ...prev, from }))
    if (to) setRange(prev => ({ ...prev, to }))
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (range.from >= 0 && range.to > 0) {
        const filterValue = [range.from, range.to]
        setColumnFilters(prev => prev.map(col => (col.id === filter.id ? { ...col, value: filterValue } : col)))
      }
    }, 600)

    return () => clearTimeout(timeout)
  }, [range])

  return (
    <Stack direction="row" gap={1.6}>
      <Input
        type="number"
        onChange={e => handleChange({ from: e.target.value })}
        placeholder="min"
        value={range.from}
      />
      <Input type="number" onChange={e => handleChange({ to: e.target.value })} placeholder="max" value={range.to} />
    </Stack>
  )
}
export default Range
