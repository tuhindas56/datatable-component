import Button from "@mui/material/Button"
import Menu from "@mui/material/Menu"

// string filters: contains, does not contain, is, is not, is empty, is not empty
// numeric filters: is, is not, is less than, is less than or equal to, is greater than, is greater than or equal to, is between, is empty, is not empty
// fixed option filters: has any of, has none of, is empty, is not empty
// date filters: is, is not, is before, is after, is on or before, is on or after, is between, is relative to today, is empty, is not empty

const FILTER_TYPES = {
  STRING: ["contains", "does not contain", "is", "is not", "is empty", "is not empty"],
  NUMERIC: [
    "is",
    "is not",
    "is less than",
    "is less than or equal to",
    "is greater than",
    "is greater than or equal to",
    "is between",
    "is empty",
    "is not empty",
  ],
  FIXED_OPTION: ["has any of", "has none of", "is empty", "is not empty"],
  DATE: [
    "is",
    "is not",
    "is before",
    "is after",
    "is on or before",
    "is on or after",
    "is between",
    "is relative to today",
    "is empty",
    "is not empty",
  ],
  TIME: [
    "is",
    "is not",
    "is before",
    "is after",
    "is on or before",
    "is on or after",
    "is between",
    "is relative to today",
    "is empty",
    "is not empty",
  ],
}

const generateFilter = type => {
  switch (type) {
    case FILTER_TYPES.STRING:
      return <div>String</div>
    case FILTER_TYPES.NUMERIC:
      return <div>Numeric</div>
    case FILTER_TYPES.FIXED_OPTION:
      return <div>Fixed Option</div>
    case FILTER_TYPES.DATE:
      return <div>Date</div>
    case FILTER_TYPES.TIME:
      return <div>Time</div>
    default:
      return null
  }
}

const Filters = ({ filterableColumns }) => {
  return (
    <div>
      <Button>Filter</Button>
      <Menu>
        {filterableColumns.map(column => (
          <MenuItem key={column.id}>{column.id}</MenuItem>
        ))}
      </Menu>
    </div>
  )
}
export default Filters
