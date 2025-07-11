import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

import RowsPerPage from "./RowsPerPage"
import PageNavigation from "./PageNavigation"

const Pagination = ({ table, rowsPerPageDropdownOptions }) => {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Typography variant="body2">
        {table.getSelectedRowModel().rows.length} of {table.getRowModel().rows.length} row(s) selected.
      </Typography>
      <Stack direction="row" justifyContent="flex-end" alignItems="center" gap={2} flexWrap="wrap">
        <RowsPerPage table={table} rowsPerPageDropdownOptions={rowsPerPageDropdownOptions} />
        <Typography fontWeight={500} variant="body2">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </Typography>
        <PageNavigation table={table} />
      </Stack>
    </Stack>
  )
}

export default Pagination
