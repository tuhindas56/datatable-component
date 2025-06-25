import { Stack } from "@mui/material"
import { ChevronDown } from "react-feather"

import CustomMenu from "../CustomMenu"

const buttonSx = {
  height: "32px",
  minWidth: "72px",
  padding: "0 12px",
  border: "var(--ts-dt-stroke)",
  borderRadius: "var(--ts-dt-radius)",
  backgroundColor: "var(--ts-dt-background-light)",
  transition: "background-color var(--ts-dt-duration) ease-in-out",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "4px",
  color: "#000",
  outline: "none",
  "& svg": {
    color: "var(--ts-dt-icon-color-dark)",
  },
  "&:hover": {
    backgroundColor: "var(--ts-dt-hover)",
  },
}

const RowPerPage = ({ table, rowsPerPageDropdownOptions = [{ label: 10, value: 10 }] }) => {
  const rowsPerPage = table.getState().pagination.pageSize

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <span>Rows per page</span>
      <CustomMenu
        trigger={
          <>
            {rowsPerPage}
            <ChevronDown size={14} />
          </>
        }
        options={rowsPerPageDropdownOptions}
        buttonProps={{
          sx: buttonSx,
          disableRipple: true,
        }}
        direction={{
          vertical: "top",
          horizontal: "left",
        }}
      />
    </Stack>
  )
}

export default RowPerPage
