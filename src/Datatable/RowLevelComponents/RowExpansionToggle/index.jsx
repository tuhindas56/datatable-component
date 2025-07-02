import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown"
import { Button } from "reactstrap"

const RowExpansionToggle = ({ table = null, row = null }) => {
  if (table)
    return (
      <Button onClick={table.getToggleAllRowsExpandedHandler()}>
        {table.getIsAllRowsExpanded() ? (
          <KeyboardDoubleArrowDownIcon className="rotate-180" />
        ) : table.getIsSomeRowsExpanded() ? (
          <KeyboardDoubleArrowDownIcon className="rotate-90" />
        ) : (
          <KeyboardDoubleArrowDownIcon />
        )}
      </Button>
    )

  if (row)
    return (
      <Button onClick={row.getToggleExpandedHandler()}>
        {row.getIsExpanded() ? <ExpandMoreIcon className="rotate-180" /> : <ExpandMoreIcon />}
      </Button>
    )
}
export default RowExpansionToggle
