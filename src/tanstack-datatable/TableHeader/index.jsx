import Stack from "@mui/material/Stack"

import DynamicFilters from "./DynamicFilters"
import FilterMenu from "./FilterMenu"
import Search from "./Search"
import SortMenu from "./SortMenu"
import ViewMenu from "./ViewMenu"

const TableHeader = ({ table, searchQuery, setSearchQuery, setColumnFilters, enableMultiSort }) => {
  return (
    <Stack gap={2}>
      <Stack direction="row" justifyContent="space-between" gap={2} sx={{ flex: 1 }} flexWrap="wrap">
        <Stack direction="row" gap={2} useFlexGap flexWrap="wrap">
          <Search placeholder="Search..." searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </Stack>
        <Stack direction="row" gap={2} useFlexGap flexWrap='wrap'>
          <FilterMenu table={table} setColumnFilters={setColumnFilters} />
          <SortMenu table={table} direction="right" enableMultiSort={enableMultiSort} />
          <ViewMenu table={table} />
        </Stack>
      </Stack>
      <DynamicFilters table={table} setColumnFilters={setColumnFilters} />
    </Stack>
  )
}

export default TableHeader
