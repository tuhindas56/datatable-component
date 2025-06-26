import { Stack } from "@mui/material"

import Search from "./Search"
import ViewMenu from "./ViewMenu"

const TableHeader = ({ table, setSearchQuery }) => {
  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between">
        <Search placeholder="Search products..." setSearchQuery={setSearchQuery} />
        <ViewMenu table={table} />
      </Stack>
    </Stack>
  )
}
export default TableHeader
