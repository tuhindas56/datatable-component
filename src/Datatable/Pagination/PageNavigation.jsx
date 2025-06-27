import { useEffect } from "react"
import IconButton from "@mui/material/IconButton"
import Stack from "@mui/material/Stack"
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft"
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft"
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"

const PageNavigation = ({ table }) => {
  const currentPage = table.getState().pagination.pageIndex
  const totalPages = table.getPageCount()

  useEffect(() => {
    if (currentPage > totalPages - 1) table.lastPage()
    if (currentPage < 0) table.firstPage()
  }, [currentPage, totalPages, table])

  return (
    <Stack direction="row" spacing={1}>
      <IconButton
        className="pagination-trigger"
        variant="outlined"
        onClick={() => table.firstPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <KeyboardDoubleArrowLeftIcon fontSize="small" />
      </IconButton>
      <IconButton
        className="pagination-trigger"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <KeyboardArrowLeftIcon fontSize="small" />
      </IconButton>
      <IconButton className="pagination-trigger" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
        <KeyboardArrowRightIcon fontSize="small" />
      </IconButton>
      <IconButton className="pagination-trigger" onClick={() => table.lastPage()} disabled={!table.getCanNextPage()}>
        <KeyboardDoubleArrowRightIcon fontSize="small" />
      </IconButton>
    </Stack>
  )
}

export default PageNavigation
