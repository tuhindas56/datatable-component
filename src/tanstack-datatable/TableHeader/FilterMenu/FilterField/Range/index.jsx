import Stack from "@mui/material/Stack"

import Input from "@components/tanstack-datatable/Input"

const Range = ({ column, setColumnFilters }) => {
  const filterValues = column.getFilterValue() ?? {}
  const currentFrom = filterValues.from ?? ""
  const currentTo = filterValues.to ?? ""

  const handleChange = ({ from, to }) => {
    setColumnFilters(prev => {
      const prevFilter = prev.find(filter => filter.id === column.id)
      const prevValue = prevFilter?.value ?? { from: "", to: "" }
      const nextValue = {
        from: from ?? prevValue.from ?? "",
        to: to ?? prevValue.to ?? "",
      }

      if (!nextValue.from && !nextValue.to) {
        return prev.filter(filter => filter.id !== column.id)
      }
      const newFilters = prev.filter(filter => filter.id !== column.id)
      newFilters.push({ id: column.id, value: nextValue })
      return newFilters
    })
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
