import Stack from "@mui/material/Stack"

import DynamicFilters from "./DynamicFilters"
import Search from "./Search"
import SortMenu from "./SortMenu"
import ViewMenu from "./ViewMenu"

const TableHeader = ({ table, setSearchQuery }) => {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Stack direction="row" gap={2} useFlexGap flexWrap="wrap">
        <Search placeholder="Search..." setSearchQuery={setSearchQuery} />
        <DynamicFilters table={table} />
      </Stack>
      <Stack direction="row" gap={2} useFlexGap>
        <SortMenu table={table} />
        <ViewMenu table={table} />
      </Stack>
    </Stack>
  )
}
export default TableHeader
