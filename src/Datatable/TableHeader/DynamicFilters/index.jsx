import Button from "@mui/material/Button"
import CloseIcon from "@mui/icons-material/Close"

import CheckboxToggleMenu from "./CheckboxToggleMenu"
import Datepicker from "./Datepicker"

const generateFilter = column => {
  const canFilter = column.getCanFilter()
  const type = canFilter && column.columnDef?.meta?.filterType
  const label = canFilter && column.columnDef?.meta?.label
  const filterValues = canFilter && column.getFilterValue()

  switch (type) {
    case "multiselect":
      return (
        <CheckboxToggleMenu
          key={`${column.id}-dynamic-filter`}
          column={column}
          label={label}
          filterValues={filterValues}
        />
      )
    case "daterange":
      return (
        <Datepicker key={`${column.id}-dynamic-filter`} column={column} label={label} filterValues={filterValues} />
      )
    case "timerange":
      return <></>
    case "range":
      return <></>
    default:
      return <></>
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
      {table.getState().columnFilters.length > 0 && (
        <Button onClick={handleReset}>
          <CloseIcon /> Reset
        </Button>
      )}
    </>
  )
}

export default DynamicFilters
