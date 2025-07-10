import Stack from "@mui/material/Stack"

import FilterMenu from "./FilterMenu"
import DynamicFilters from "./DynamicFilters"
import Search from "./Search"
import SortMenu from "./SortMenu"
import ViewMenu from "./ViewMenu"

const TableHeader = ({ table, setSearchQuery, setColumnFilters }) => {
  return (
    <Stack direction="row" justifyContent="space-between" gap={2} flexWrap="wrap" useFlexGap>
      <Stack direction="row" gap={2} flexWrap="wrap" useFlexGap>
        <Search placeholder="Search..." setSearchQuery={setSearchQuery} />
        <DynamicFilters table={table} />
      </Stack>
      <Stack direction="row" gap={2} useFlexGap>
        <FilterMenu table={table} setColumnFilters={setColumnFilters} />
        <SortMenu table={table} direction="right" />
        <ViewMenu table={table} />
      </Stack>
    </Stack>
  )
}
export default TableHeader
