import { Fragment, useState, useEffect } from "react"
import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import TableContainer from "@mui/material/TableContainer"
import { Table } from "reactstrap"

import TableHeader from "./TableHeader"
import Pagination from "./Pagination"

import styles from "./styles.module.css"

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
    <Table className={styles["ts-dt"]}>
      <thead className={styles["thead"]}>
        {subRowsTable.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id} className={styles["tr"]}>
            {headerGroup.headers.map(header => (
              <th key={header.id} colSpan={header.colSpan} className={styles["th"]}>
                <div style={{ width: header.column.getSize() }}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className={styles["tbody"]}>
        {subRowsTable.getRowModel().rows.map(row => (
          <tr key={row.id} className={styles["tr"]}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id} className={styles["td"]}>
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
  columnFilters,
  setColumnFilters,
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
    right: [],
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
      columnFilters,
      columnPinning,
      columnVisibility,
      expanded,
      pagination,
      sorting,
      rowSelection,
    },
    manualFiltering: true,
    onColumnFiltersChange: setColumnFilters,
    enableColumnPinning: true,
    onColumnPinningChange: setColumnPinning,
    enableHiding: true,
    onColumnVisibilityChange: setColumnVisibility,
    manualPagination: true,
    onPaginationChange: setPagination,
    pageCount: totalPages,
    manualSorting: true,
    enableSorting: true,
    enableMultiSort: true,
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
      <TableHeader table={table} setSearchQuery={setSearchQuery} setColumnFilters={setColumnFilters} />

      <TableContainer>
        <Table className={styles["ts-dt"]}>
          <thead className={styles["thead"]}>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className={styles["tr"]}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className={styles["th"]}
                    style={{
                      position: header.column.getIsPinned() ? "sticky" : "static",
                      left: header.column.getIsPinned() && header.column.getStart("left"),
                      right: header.column.getIsPinned() && header.column.getStart("right"),
                      zIndex: header.column.getIsPinned() ? 4 : 1,
                    }}
                  >
                    <div
                      style={{
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
          <tbody className={styles["tbody"]}>
            {loading ? (
              <tr className={styles["tr"]}>
                <td colSpan={table.getHeaderGroups()[0].headers.length}>
                  <div style={{ textAlign: "center" }}>Loading...</div>
                </td>
              </tr>
            ) : data?.length === 0 ? (
              <tr className={styles["tr"]}>
                <td colSpan={table.getHeaderGroups()[0].headers.length} align="center">
                  No data found.
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map(row => (
                <Fragment key={row.id}>
                  <tr className={styles["tr"]}>
                    {row.getVisibleCells().map(cell => (
                      <td
                        key={cell.id}
                        className={`${styles["td"]} ${row.getIsSelected() ? "row-selected" : ""}`}
                        style={{
                          position: cell.column.getIsPinned() ? "sticky" : "static",
                          left: cell.column.getIsPinned() && cell.column.getStart("left"),
                          right: cell.column.getIsPinned() && cell.column.getStart("right"),
                          zIndex: cell.column.getIsPinned() ? 1 : 0,
                        }}
                      >
                        <div
                          style={{
                            width: cell.column.getSize(),
                            textAlign: cell.column.columnDef.meta?.align ?? "left",
                          }}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {enableSubRows && row.getCanExpand() && row.getIsExpanded() && (
                    <tr className={styles["tr"]}>
                      <td colSpan={table.getHeaderGroups()[0].headers.length} className={styles["expanded-table-cell"]}>
                        <SubRowTable subRowsColumns={subRowsColumns} data={row.original?.children} />
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))
            )}
          </tbody>
        </Table>
      </TableContainer>

      <Pagination table={table} />
    </Stack>
  )
}

export default DatatableBase
