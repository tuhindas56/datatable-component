import { useState, useEffect } from "react"
import Stack from "@mui/material/Stack"

import DynamicFilters from "./DynamicFilters"
import FilterMenu from "./FilterMenu"
import Search from "./Search"
import SortMenu from "./SortMenu"
import ViewMenu from "./ViewMenu"

import { convertToUnixTimestamp, mergeFilters } from "../utils"

const TableHeader = ({ table, setSearchQuery, setColumnFilters }) => {
  const [search, setSearch] = useState("")
  const [ranges, setRanges] = useState({})
  const [dateRanges, setDateRanges] = useState({})
  const [timeRanges, setTimeRanges] = useState({})
  const [multiSelects, setMultiSelects] = useState({})

  const onSearchChange = e => setSearch(e.target.value)

  // Search input debouncing effect
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchQuery(search)
    }, 900)

    return () => clearTimeout(timeout)
  }, [search])

  // Date filter debouncing effect
  useEffect(() => {
    if (!Object.values(dateRanges).length) return

    const timeout = setTimeout(() => {
      const dateFilters = []

      for (const [id, range] of Object.entries(dateRanges)) {
        const from = range.from ? convertToUnixTimestamp(range.from) : null
        const to = range.to ? convertToUnixTimestamp(range.to) : null
        if (from || to) dateFilters.push({ id, value: [from, to] })
      }

      setColumnFilters(prevFilters => mergeFilters(prevFilters, dateFilters))
    }, 600)

    return () => clearTimeout(timeout)
  }, [dateRanges])

  // Time filter debouncing effect
  useEffect(() => {
    if (!Object.values(timeRanges).length) return

    const timeout = setTimeout(() => {
      const timeFilters = []

      for (const [id, range] of Object.entries(timeRanges)) {
        const from = range.from ? convertToUnixTimestamp(range.from) : null
        const to = range.to ? convertToUnixTimestamp(range.to) : null
        if (from || to) timeFilters.push({ id, value: [from, to] })
      }

      setColumnFilters(prevFilters => mergeFilters(prevFilters, timeFilters))
    }, 600)

    return () => clearTimeout(timeout)
  }, [timeRanges])

  // Range filter debouncing effect
  useEffect(() => {
    if (!Object.values(ranges).length) return

    const timeout = setTimeout(() => {
      const rangeFilters = []

      for (const [id, range] of Object.entries(ranges)) {
        const from = range.from ?? null
        const to = range.to ?? null
        if (from != null || to != null) rangeFilters.push({ id, value: [from, to] })
      }

      setColumnFilters(prevFilters => mergeFilters(prevFilters, rangeFilters))
    }, 600)

    return () => clearTimeout(timeout)
  }, [ranges])

  // Multi-select filter debouncing effect
  useEffect(() => {
    if (!Object.values(multiSelects).length) return

    const timeout = setTimeout(() => {
      const filters = []

      for (const [id, values] of Object.entries(multiSelects)) {
        if (values?.length) filters.push({ id, value: values })
      }

      setColumnFilters(prevFilters => mergeFilters(prevFilters, filters))
    }, 600)

    return () => clearTimeout(timeout)
  }, [multiSelects])

  return (
    <Stack direction="row" justifyContent="space-between" gap={2} sx={{ flex: 1 }} flexWrap="wrap">
      <Stack direction="row" gap={2} useFlexGap flexWrap="wrap">
        <Search placeholder="Search..." search={search} onChange={onSearchChange} />
        <DynamicFilters
          table={table}
          multiSelects={multiSelects}
          setMultiSelects={setMultiSelects}
          ranges={ranges}
          setRanges={setRanges}
          dateRanges={dateRanges}
          setDateRanges={setDateRanges}
          timeRanges={timeRanges}
          setTimeRanges={setTimeRanges}
        />
      </Stack>
      <Stack direction="row" gap={2} useFlexGap>
        <FilterMenu
          table={table}
          setColumnFilters={setColumnFilters}
          multiSelects={multiSelects}
          setMultiSelects={setMultiSelects}
          ranges={ranges}
          setRanges={setRanges}
          dateRanges={dateRanges}
          setDateRanges={setDateRanges}
          timeRanges={timeRanges}
          setTimeRanges={setTimeRanges}
        />
        <SortMenu table={table} direction="right" />
        <ViewMenu table={table} />
      </Stack>
    </Stack>
  )
}

export default TableHeader
