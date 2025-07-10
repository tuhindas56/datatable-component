import { useState, useEffect } from "react"
import Stack from "@mui/material/Stack"

import Input from "../../../..//Input"

const convertToUnixTimestamp = date => Math.floor(new Date(date).getTime() / 1000)

const Daterange = ({ filter, setColumnFilters }) => {
  const [selected, setSelected] = useState({ from: "", to: "" })

  const handleChange = ({ from, to }) => {
    if (from) setSelected(prev => ({ ...prev, from }))
    if (to) setSelected(prev => ({ ...prev, to }))
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (selected.from && selected.to) {
        const filterValue = [convertToUnixTimestamp(selected.from), convertToUnixTimestamp(selected.to)]
        setColumnFilters(prev => prev.map(col => (col.id === filter.id ? { ...col, value: filterValue } : col)))
      }
    }, 600)

    return () => clearTimeout(timeout)
  }, [selected])

  return (
    <Stack direction="row" gap={2}>
      <Input type="date" onChange={e => handleChange({ from: e.target.value })} />
      <Input type="date" onChange={e => handleChange({ to: e.target.value })} />
    </Stack>
  )
}
export default Daterange
