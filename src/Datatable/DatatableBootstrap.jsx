import { Fragment, useState } from "react"
import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import Stack from "@mui/material/Stack"
import TableContainer from "@mui/material/TableContainer"
import Table from "react-bootstrap/Table"

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
      <thead>
        {subRowsTable.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id} colSpan={header.colSpan}>
                <div style={{ width: header.column.getSize() }}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {subRowsTable.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>
                <div>{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
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
  })

  if (error) return <h1>Uh oh! {error.message}.</h1>

  return (
    <Stack spacing={2}>
      <TableHeader table={table} setSearchQuery={setSearchQuery} />

      <div style={{ overflowX: "auto", maxHeight: 500 }}>
        <Table bordered>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
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
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={table.getHeaderGroups()[0].headers.length}>
                  <div style={{ textAlign: "center" }}>Loading...</div>
                </td>
              </tr>
            ) : data?.data?.length === 0 ? (
              <tr>
                <td colSpan={table.getHeaderGroups()[0].headers.length} align="center">
                  No data found.
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map(row => (
                <Fragment key={row.id}>
                  <tr>
                    {row.getVisibleCells().map(cell => (
                      <td
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
                      </td>
                    ))}
                  </tr>

                  {enableSubRows && row.getCanExpand() && row.getIsExpanded() && (
                    <tr>
                      <td colSpan={table.getHeaderGroups()[0].headers.length} className="expanded-table-cell">
                        <SubRowTable subRowsColumns={subRowsColumns} data={row.original?.children} />
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))
            )}
          </tbody>
        </Table>
      </div>

      <Pagination table={table} />
    </Stack>
  )
}

export default DatatableBase
