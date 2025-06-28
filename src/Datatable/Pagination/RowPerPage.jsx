import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

import RowsPerPageMenu from "./RowsPerPageMenu"

const RowPerPage = ({ table }) => {
  const rowsPerPage = table.getState().pagination.pageSize
  const rowsPerPageDropdownOptions = [
    { label: "5", value: 5, onClick: () => table.setPageSize(5) },
    { label: "10", value: 10, onClick: () => table.setPageSize(10) },
    { label: "15", value: 15, onClick: () => table.setPageSize(15) },
    { label: "25", value: 25, onClick: () => table.setPageSize(25) },
    { label: "50", value: 50, onClick: () => table.setPageSize(50) },
    { label: "100", value: 100, onClick: () => table.setPageSize(100) },
  ]

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
