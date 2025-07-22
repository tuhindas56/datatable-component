import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

import RowsPerPage from "./RowsPerPage"
import PageNavigation from "./PageNavigation"

const Pagination = ({ table, rowsPerPageDropdownOptions }) => {
  const totalCount = table.getPageCount()
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
      <Typography variant="body2">
        {table.getSelectedRowModel().rows.length} of {table.getRowModel().rows.length} row(s) selected.
      </Typography>
      <Stack direction="row" justifyContent="flex-end" alignItems="center" gap={2} flexWrap="wrap">
        <RowsPerPage table={table} rowsPerPageDropdownOptions={rowsPerPageDropdownOptions} />
        <Typography fontWeight={500} variant="body2">
          {totalCount ? `Page ${table.getState().pagination.pageIndex + 1} of ${totalCount}` : "No pages available"}
        </Typography>
        <PageNavigation table={table} />
      </Stack>
    </Stack>
  )
}

export default Pagination
