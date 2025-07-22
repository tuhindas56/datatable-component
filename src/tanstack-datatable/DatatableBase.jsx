import { Fragment, useEffect, useState } from "react"
import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import Skeleton from "@mui/material/Skeleton"
import Stack from "@mui/material/Stack"
import TableContainer from "@mui/material/TableContainer"
import { Table } from "reactstrap"

import Pagination from "./Pagination"
import RowSelectionActions from "./RowSelectionActions"
import TableHeader from "./TableHeader"

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
  data = [],
  totalPages,
  columnFilters,
  setColumnFilters,
  pagination,
  setPagination,
  sorting,
  setSorting,
  setSelectedRows,
  searchQuery,
  setSearchQuery,
  enableSubRows = false,
  getSubRows = () => [],
  subRowsColumns = [],
  noDataComponent,
  rowSelectionOptions = [],
  enableSearch = false,
  enableMultiSort = false,
}) => {
  const [columnPinning, setColumnPinning] = useState({
    left: loading ? [] : ["expand", "select"],
    right: [],
  })
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState({})
  const [expanded, setExpanded] = useState([])

  const table = useReactTable({
    columns,
    data: data,
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
    enableMultiSort,
    enableSortingRemoval: true,
    onSortingChange: setSorting,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onExpandedChange: setExpanded,
    enableExpanding: enableSubRows,
  })

  if (error) return <h1>Uh oh! {error.message}.</h1>

  useEffect(() => {
    if (setSelectedRows) {
      const parentRows = table.getSelectedRowModel().rows.filter(row => row.depth === 0)
      setSelectedRows(parentRows)
    }
  }, [rowSelection])

  return (
    <Stack spacing={2}>
      <TableHeader
        table={table}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setColumnFilters={setColumnFilters}
        enableMultiSort={enableMultiSort}
      />

      <TableContainer className={styles["ts-dt"]}>
        <Table>
          <thead className={styles["thead"]}>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className={styles["tr"]}>
                {headerGroup.headers.map(header => {
                  const isPinned = header.column.getIsPinned()
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className={styles["th"]}
                      style={{
                        position: isPinned ? "sticky" : "static",
                        left: isPinned && header.column.getStart("left"),
                        right: isPinned && header.column.getStart("right"),
                        zIndex: isPinned ? 4 : 1,
                      }}
                    >
                      {loading ? (
                        <Skeleton width={100} />
                      ) : (
                        <div
                          style={{
                            width: header.column.getSize(),
                            textAlign: header.column.columnDef.meta?.align ?? "left",
                          }}
                        >
                          {flexRender(header.column.columnDef.header, {
                            ...header.getContext(),
                            column: header.column,
                          })}
                        </div>
                      )}
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>

          <tbody className={styles["tbody"]}>
            {loading ? (
              [...Array(pagination.pageSize)].map(() => (
                <tr className={styles["tr"]}>
                  {table.getHeaderGroups()[0].headers.map(cell => (
                    <td
                      className={styles["td"]}
                      style={{
                        position: cell.column.getIsPinned() ? "sticky" : "static",
                        left: cell.column.getIsPinned() && cell.column.getStart("left"),
                        right: cell.column.getIsPinned() && cell.column.getStart("right"),
                        zIndex: cell.column.getIsPinned() ? 1 : 0,
                      }}
                    >
                      <Skeleton width={Math.max(100 * Math.random(), 50)} />
                    </td>
                  ))}
                </tr>
              ))
            ) : data?.length === 0 ? (
              <tr className={styles["tr"]}>
                <td colSpan={table.getHeaderGroups()[0].headers.length} align='center'>
                  {noDataComponent ? noDataComponent : 'No data found.'}
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

                  {enableSubRows && subRowsColumns && row.getCanExpand() && row.getIsExpanded() && (
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

      <RowSelectionActions setRowSelection={setRowSelection} table={table} options={rowSelectionOptions} />
    </Stack>
  )
}

export default DatatableBase
