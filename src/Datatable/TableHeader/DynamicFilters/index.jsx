import Button from "@mui/material/Button"
import Chip from "@mui/material/Chip"
import Divider from "@mui/material/Divider"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import CloseIcon from "@mui/icons-material/Close"

import CheckboxToggleMenu from "./CheckboxToggleMenu"

const Trigger = ({ label = "Add a label", selectedOptions = [], ...props }) => {
  return (
    <Button {...props}>
      <AddCircleOutlineIcon /> {label}
      {selectedOptions.length > 0 && (
        <>
          <Divider orientation="vertical" variant="middle" />
          <Chip label={`${selectedOptions.length} selected`} />
        </>
      )}
    </Button>
  )
}

const generateFilter = column => {
  const canFilter = column.getCanFilter()
  const type = canFilter && column.columnDef?.meta?.filterType
  const label = canFilter && column.columnDef?.meta?.label
  const selectedOptions = canFilter && column.getFilterValue()

  switch (type) {
    case "multiselect":
      return (
        <CheckboxToggleMenu
          triggerComponent={props => <Trigger label={label} selectedOptions={selectedOptions} {...props} />}
          column={column}
          key={`${column.id}-dynamic-filter`}
        />
      )
    case "daterange":
      return <></>
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
      {filterableColumns.map(column => generateFilter(column))}{" "}
      {table.getState().columnFilters.length > 0 && (
        <Button onClick={handleReset}>
          <CloseIcon /> Reset
        </Button>
      )}
    </>
  )
}

export default DynamicFilters
