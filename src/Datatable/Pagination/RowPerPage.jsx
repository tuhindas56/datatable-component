import { Stack } from "@mui/material"

import RowsPerPageMenu from "./RowsPerPageMenu"

const RowPerPage = ({ table, rowsPerPageDropdownOptions = [{ label: 10, value: 10 }] }) => {
  const rowsPerPage = table.getState().pagination.pageSize

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <span>Rows per page</span>
      <RowsPerPageMenu
        value={rowsPerPage}
        options={rowsPerPageDropdownOptions}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      />
    </Stack>
  )
}

export default RowPerPage
