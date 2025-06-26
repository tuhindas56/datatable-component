import { useState, useMemo } from "react"
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"

import TableHeader from "./TableHeader"
import Pagination from "./Pagination"

const Datatable = ({
  columns,
  loading,
  error,
  data,
  pagination,
  setPagination,
  sorting,
  setSorting,
  setSearchQuery,
  totalPages,
}) => {
  const [columnPinning, setColumnPinning] = useState({
    left: [],
    right: [],
  })
  const [columnVisibility, setColumnVisibility] = useState({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    columns,
    getCoreRowModel: getCoreRowModel(),
    data: data?.data ?? [],
    getRowId: row => row.id,
    state: {
      columnPinning,
      columnVisibility,
      pagination,
      sorting,
      rowSelection,
    },
    enableColumnPinning: true,
    onColumnPinningChange: setColumnPinning,
    enableHiding: true,
    onColumnVisibilityChange: setColumnVisibility,
    manualPagination: true,
    onPaginationChange: setPagination,
    pageCount: totalPages,
    manualSorting: true,
    enableSorting: true,
    enableSortingRemoval: true,
    onSortingChange: setSorting,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
  })

  const rowsPerPageDropdownOptions = useMemo(
    () => [
      { label: "5", value: 5, onClick: () => table.setPageSize(5) },
      { label: "10", value: 10, onClick: () => table.setPageSize(10) },
      { label: "15", value: 15, onClick: () => table.setPageSize(15) },
      { label: "25", value: 25, onClick: () => table.setPageSize(25) },
      { label: "50", value: 50, onClick: () => table.setPageSize(50) },
      { label: "100", value: 100, onClick: () => table.setPageSize(100) },
    ],
    []
  )

  if (error) return <h1>Uh oh! {error.message}.</h1>

  return (
    <>
      <TableHeader table={table} setSearchQuery={setSearchQuery} />

      <TableContainer component={Paper} sx={{ maxHeight: "500px" }}>
        <Table stickyHeader>
          <TableHead>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableCell
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{
                      // position: header.column.getIsPinned() ? "sticky" : "static",
                      left: header.column.getStart("left"),
                      zIndex: "1",
                    }}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={table.getHeaderGroups()[0].headers.length}>
                  <div style={{ textAlign: "center" }}>Loading...</div>
                </TableCell>
              </TableRow>
            ) : data?.data?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={table.getHeaderGroups()[0].headers.length} align="center">
                  No data found.
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell
                      key={cell.id}
                      style={{
                        position: cell.column.getIsPinned() ? "sticky" : "static",
                        left: cell.column.getIsPinned() ? cell.column.getStart("left") : 0,
                        zIndex: "1",
                      }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination table={table} rowsPerPageDropdownOptions={rowsPerPageDropdownOptions} />
    </>
  )
}

export default Datatable
