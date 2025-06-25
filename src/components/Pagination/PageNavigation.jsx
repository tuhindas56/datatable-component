import { useEffect } from "react"
import { Button, Stack } from "@mui/material"
import { ChevronsLeft, ChevronLeft, ChevronsRight, ChevronRight } from "react-feather"

const sx = {
  height: "32px",
  width: "32px",
  minWidth: "32px",
  padding: 0,
  border: "var(--ts-dt-stroke)",
  borderRadius: "var(--ts-dt-radius)",
  backgroundColor: "var(--ts-dt-background-light)",
  cursor: "default",
  transition: "background-color var(--ts-dt-duration) ease-in-out",
  display: "grid",
  placeContent: "center",
  "& svg": {
    color: "var(--ts-dt-icon-color-dark)",
  },
  "&:hover": {
    backgroundColor: "var(--ts-dt-hover)",
  },
  "&:disabled": {
    backgroundColor: "var(--ts-dt-hover)",
    cursor: "not-allowed",
    "& svg": {
      color: "var(--ts-dt-icon-color-light)",
    },
  },
}

const PageNavigation = ({ table }) => {
  const currentPage = table.getState().pagination.pageIndex
  const totalPages = table.getPageCount()

  useEffect(() => {
    if (currentPage > totalPages - 1) table.lastPage()
    if (currentPage < 0) table.firstPage()
  }, [currentPage, totalPages, table])

  return (
    <Stack direction="row" spacing={1}>
      <Button sx={sx} onClick={table.firstPage} disabled={!table.getCanPreviousPage()} disableRipple>
        <ChevronsLeft size={14} />
      </Button>

      <Button sx={sx} onClick={table.previousPage} disabled={table.getState().pagination.pageIndex === 0} disableRipple>
        <ChevronLeft size={14} />
      </Button>

      <Button
        sx={sx}
        onClick={table.nextPage}
        disabled={table.getState().pagination.pageIndex === table.getPageCount() - 1}
        disableRipple
      >
        <ChevronRight size={14} />
      </Button>

      <Button sx={sx} onClick={table.lastPage} disabled={!table.getCanNextPage()} disableRipple>
        <ChevronsRight size={14} />
      </Button>
    </Stack>
  )
}

export default PageNavigation
