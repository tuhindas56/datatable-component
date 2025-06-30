import { Fragment, useState } from "react"
import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import Stack from "@mui/material/Stack"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"

import TableHeader from "./TableHeader"
import Pagination from "./Pagination"

const SubRowTable = ({ subRowsColumns = [], data = [] }) => {
  const subRowsTable = useReactTable({
    columns: subRowsColumns,
    data: data ?? [],
    getRowId: row => row.id,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableHiding: false,
    enableColumnPinning: false,
  })

  return (
    <Table>
      <TableHead>
        {subRowsTable.getHeaderGroups().map(headerGroup => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <TableCell key={header.id} colSpan={header.colSpan}>
                <div style={{ width: header.column.getSize() }}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </div>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {subRowsTable.getRowModel().rows.map(row => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map(cell => (
              <TableCell key={cell.id}>
                <div>{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

const DatatableBase = ({
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
  enableSubRows = false,
  getSubRows = () => [],
  subRowsColumns = [],
}) => {
  const [columnPinning, setColumnPinning] = useState({
    left: ["expand", "select"],
    right: ["options"],
  })
  const [columnVisibility, setColumnVisibility] = useState({})
  const [rowSelection, setRowSelection] = useState({})
  const [expanded, setExpanded] = useState([])

  const table = useReactTable({
    columns,
    data: data ?? [],
    getRowId: row => row.id,
    getCoreRowModel: getCoreRowModel(),
    getSubRows: enableSubRows ? getSubRows : undefined,
    state: {
      columnPinning,
      columnVisibility,
      expanded,
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
    onExpandedChange: setExpanded,
    enableExpanding: enableSubRows,
    debugTable: true,
    debugRows: true,
  })

  if (error) return <h1>Uh oh! {error.message}.</h1>

  return (
    <Stack spacing={2}>
      <TableHeader table={table} setSearchQuery={setSearchQuery} />

      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableCell
                    key={header.id}
                    colSpan={header.colSpan}
                    sx={{
                      left: header.column.getIsPinned() && header.column.getStart("left"),
                      right: header.column.getIsPinned() && header.column.getStart("right"),
                      zIndex: header.column.getIsPinned() ? 2 : 1,
                    }}
                  >
                    <div
                      style={{
                        display: "grid",
                        placeContent: `center ${header.column.columnDef.meta?.align}` ?? "center left",
                        width: header.column.getSize(),
                        textAlign: header.column.columnDef.meta?.align ?? "left",
                      }}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </div>
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
                <Fragment key={row.id}>
                  <TableRow>
                    {row.getVisibleCells().map(cell => (
                      <TableCell
                        key={cell.id}
                        className={`${row.getIsSelected() ? "row-selected" : ""}`}
                        sx={{
                          position: cell.column.getIsPinned() ? "sticky" : "static",
                          left: cell.column.getIsPinned() && cell.column.getStart("left"),
                          right: cell.column.getIsPinned() && cell.column.getStart("right"),
                          zIndex: cell.column.getIsPinned() ? 1 : 0,
                        }}
                      >
                        <div
                          style={{
                            width: cell.column.getSize(),
                            display: "grid",
                            placeContent: `center ${cell.column.columnDef.meta?.align}` ?? "center left",
                            textAlign: cell.column.columnDef.meta?.align ?? "left",
                          }}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>

                  {enableSubRows && row.getCanExpand() && row.getIsExpanded() && (
                    <TableRow>
                      <TableCell colSpan={table.getHeaderGroups()[0].headers.length} className="expanded-table-cell">
                        <SubRowTable subRowsColumns={subRowsColumns} data={row.original?.children} />
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination table={table} />
    </Stack>
  )
}

export default DatatableBase
