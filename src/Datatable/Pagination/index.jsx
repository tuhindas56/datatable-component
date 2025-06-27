import Typography from "@mui/material/Typography"

import RowPerPage from "./RowPerPage"
import PageNavigation from "./PageNavigation"

const Pagination = ({ table, rowsPerPageDropdownOptions }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: "2rem",
        flexWrap: "wrap",
        paddingBlock: 8,
      }}
    >
      <RowPerPage table={table} rowsPerPageDropdownOptions={rowsPerPageDropdownOptions} />
      <Typography fontWeight={500} variant="body2">
        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}{" "}
      </Typography>
      <PageNavigation table={table} />
    </div>
  )
}

export default Pagination
