import { useEffect } from "react"
import Pagination from "@mui/material/Pagination"

const PageNavigation = ({ table }) => {
  const currentPage = table.getState().pagination.pageIndex
  const totalPages = table.getPageCount()

  useEffect(() => {
    if (currentPage > totalPages - 1) table.lastPage()
    if (currentPage < 0) table.firstPage()
  }, [currentPage, totalPages, table])

  return (
    <Pagination
      count={totalPages}
      page={currentPage + 1}
      onChange={(_, value) => table.setPageIndex(value - 1)}
      showFirstButton
      showLastButton
    />
  )
}

export default PageNavigation
