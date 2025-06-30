import Stack from "@mui/material/Stack"

import Filters from "./Filter"
import Search from "./Search"
import ViewMenu from "./ViewMenu"

const TableHeader = ({ table, setSearchQuery }) => {
  return (
    <Stack spacing={2}>
      <Filters />
      <Stack direction="row" justifyContent="space-between">
        <Search placeholder="Search products..." setSearchQuery={setSearchQuery} />
        <ViewMenu table={table} />
      </Stack>
    </Stack>
  )
}
export default TableHeader
