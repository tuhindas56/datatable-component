import { useEffect } from "react"
import { Button, Stack } from "@mui/material"
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
      <Button size="small" variant="outlined" onClick={() => table.firstPage()} disabled={!table.getCanPreviousPage()}>
        <KeyboardDoubleArrowLeftIcon fontSize="small" />
      </Button>
      <Button
        size="small"
        variant="outlined"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <KeyboardArrowLeftIcon fontSize="small" />
      </Button>
      <Button size="small" variant="outlined" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
        <KeyboardArrowRightIcon fontSize="small" />
      </Button>
      <Button size="small" variant="outlined" onClick={() => table.lastPage()} disabled={!table.getCanNextPage()}>
        <KeyboardDoubleArrowRightIcon fontSize="small" />
      </Button>
    </Stack>
  )
}

export default PageNavigation
