import Stack from "@mui/material/Stack"

import Timepicker from "@components/tanstack-datatable/Timepicker"

const Timerange = ({ column, setColumnFilters }) => {
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
    <Stack direction="row" gap={2}>
      <Timepicker value={currentFrom} onChange={e => handleChange({ from: e.target.value })} />
      <Timepicker value={currentTo} onChange={e => handleChange({ to: e.target.value })} />
    </Stack>
  )
}
export default Timerange
