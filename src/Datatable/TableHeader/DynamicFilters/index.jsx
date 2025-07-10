import Button from "@mui/material/Button"
import CloseIcon from "@mui/icons-material/Close"

import CheckboxToggleMenu from "./CheckboxToggleMenu"
import Datepicker from "./Datepicker"
import Range from "./Range"

const generateFilter = column => {
  const canFilter = column.getCanFilter()
  const type = canFilter && column.columnDef?.meta?.filter?.type
  const label = canFilter && column.columnDef?.meta?.label
  const filterValues = canFilter && column.getFilterValue()

  switch (type) {
    case "multiselect":
      return (
        <CheckboxToggleMenu
          key={`${column.id}-dynamic-multiselect-filter`}
          column={column}
          label={label}
          filterValues={filterValues}
        />
      )
    case "daterange":
      return (
        <Datepicker
          key={`${column.id}-dynamic-daterange-filter`}
          column={column}
          label={label}
          filterValues={filterValues}
        />
      )
    case "range":
      return (
        <Range key={`${column.id}-dynamic-range-filter`} column={column} label={label} filterValues={filterValues} />
      )
    default:
      return null
  }
}

const DynamicFilters = ({ table }) => {
  const filterableColumns = table.getAllColumns().filter(column => column.getCanFilter())

  const handleReset = () => {
    table.resetColumnFilters()
  }

  return (
    <>
      {filterableColumns.map(column => generateFilter(column))}
      {table.getState().columnFilters.some(item => item.value) && (
        <Button onClick={handleReset}>
          <CloseIcon /> Reset
        </Button>
      )}
    </>
  )
}

export default DynamicFilters
