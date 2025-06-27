import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

import RowsPerPageMenu from "./RowsPerPageMenu"

const RowPerPage = ({ table, rowsPerPageDropdownOptions = [{ label: 10, value: 10 }] }) => {
  const rowsPerPage = table.getState().pagination.pageSize

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Typography fontWeight={500} variant="body2">
        Rows per page
      </Typography>
      <RowsPerPageMenu
        value={rowsPerPage}
        options={rowsPerPageDropdownOptions}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      />
    </Stack>
  )
}

export default RowPerPage
