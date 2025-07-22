import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"
import { Button } from "reactstrap"

import styles from "./styles.module.css"

const RowExpansionToggle = ({ table = null, row = null }) => {
  if (table)
    return (
      <Button onClick={table.getToggleAllRowsExpandedHandler()} className={styles["row-expansion-toggle"]}>
        {table.getIsAllRowsExpanded() ? (
          <KeyboardDoubleArrowRightIcon className="expanded" />
        ) : (
          <KeyboardDoubleArrowRightIcon />
        )}
      </Button>
    )

  if (row)
    return (
      <Button onClick={row.getToggleExpandedHandler()} className={styles["row-expansion-toggle"]}>
        {row.getIsExpanded() ? <KeyboardArrowRightIcon className="expanded" /> : <KeyboardArrowRightIcon />}
      </Button>
    )
}
export default RowExpansionToggle
