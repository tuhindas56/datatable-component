import Stack from "@mui/material/Stack"

import Filters from "./Filtering"
import SortMenu from "./SortMenu"
import ViewMenu from "./ViewMenu"

const TableHeader = ({ table, setSearchQuery, setColumnFilters }) => {
  return (
    <Stack direction="row" justifyContent="space-between" gap={2} flexWrap="wrap" useFlexGap>
      <Filters table={table} setSearchQuery={setSearchQuery} setColumnFilters={setColumnFilters} />
      {/* <Stack direction="row" gap={2} useFlexGap> */}
      {/* <SortMenu table={table} direction="right" /> */}
      {/* <ViewMenu table={table} /> */}
      {/* </Stack> */}
    </Stack>
  )
}
export default TableHeader
