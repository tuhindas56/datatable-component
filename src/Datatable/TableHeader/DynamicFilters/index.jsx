import Button from "@mui/material/Button"
import CloseIcon from "@mui/icons-material/Close"

import CheckboxToggleMenu from "./CheckboxToggleMenu"
import Datepicker from "./Datepicker"
import Range from "./Range"

const DynamicFilters = ({ table }) => {
  const filterableColumns = table.getAllColumns().filter(column => column.getCanFilter())
  const handleReset = () => table.resetColumnFilters()

  return (
    <>
      {filterableColumns.map(column => {
        const type = column.columnDef?.meta?.filter?.type
        switch (type) {
          case "multiselect":
            return <CheckboxToggleMenu key={`${column.id}-dynamic-multiselect-filter`} column={column} />
          case "daterange":
            return <Datepicker key={`${column.id}-dynamic-daterange-filter`} column={column} />
          case "range":
            return <Range key={`${column.id}-dynamic-range-filter`} column={column} />
          default:
            return null
        }
      })}
      {table.getState().columnFilters.some(item => item.value) && (
        <Button onClick={handleReset}>
          <CloseIcon /> Reset
        </Button>
      )}
    </>
  )
}

export default DynamicFilters
