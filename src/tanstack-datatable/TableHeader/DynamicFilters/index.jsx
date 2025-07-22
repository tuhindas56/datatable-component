import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import CloseIcon from "@mui/icons-material/Close"

import Multiselect from "./Multiselect"
import Daterange from "./Daterange"
import Range from "./Range"
import Timerange from "./Timerange"

const DynamicFilters = ({ table, setColumnFilters }) => {
  const filterableColumns = table.getAllColumns().filter(column => column.getCanFilter())
  const handleReset = () => table.resetColumnFilters()

  return (
    <>
      <Stack direction='row' gap={2} flexWrap='wrap'>
        {filterableColumns.map(column => {
          const type = column.columnDef?.meta?.filter?.type
          switch (type) {
            case "multiselect":
              return (
                <Multiselect
                  key={`${column.id}-dynamic-multiselect-filter`}
                  column={column}
                  setColumnFilters={setColumnFilters}
                />
              )
            case "daterange":
              return (
                <Daterange
                  key={`${column.id}-dynamic-daterange-filter`}
                  column={column}
                  setColumnFilters={setColumnFilters}
                />
              )
            case "timerange":
              return (
                <Timerange
                  key={`${column.id}-dynamic-timerange-filter`}
                  column={column}
                  setColumnFilters={setColumnFilters}
                />
              )
            case "range":
              return (
                <Range key={`${column.id}-dynamic-range-filter`} column={column} setColumnFilters={setColumnFilters} />
              )
            default:
              return null
          }
        })}
        {table.getState().columnFilters && table.getState().columnFilters.some(item => item.value) && (
          <Button onClick={handleReset}>
            <CloseIcon /> Reset
          </Button>
        )}
      </Stack>
    </>
  )
}

export default DynamicFilters
