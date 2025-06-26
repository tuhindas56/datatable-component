import { useState } from "react"
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { styled } from "@mui/material/styles"

import TableHeader from "./TableHeader"
import Pagination from "./Pagination"
import TableHeadCell from "./TableHeadCell"

import styles from "../styles.module.css"

const StyledTableCell = styled(TableCell, {
  shouldForwardProp: prop => prop !== "isMenu",
})(({ isMenu }) => ({
  paddingBlock: "8px",
  paddingInline: isMenu ? 0 : "5px",
  fontFamily: "system-ui",
}))

const DataTable = ({ columns, loading, error, data, pagination, setPagination, sorting, setSorting, totalPages }) => {
  const [columnPinning, setColumnPinning] = useState({
    left: [],
    right: [],
  })
  const [columnVisibility, setColumnVisibility] = useState({})
  const [columnFilters, setColumnFilters] = useState([])

  const table = useReactTable({
    columns,
    getCoreRowModel: getCoreRowModel(),
    data: data?.data ?? [],
    state: {
      columnFilters,
      columnPinning,
      columnVisibility,
      pagination,
      sorting,
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
    enableSortingRemoval: true,
    onSortingChange: setSorting,
    enableRowSelection: true,
  })

  const rowsPerPageDropdownOptions = [
    { label: "5", value: 5, onClick: () => table.setPageSize(5) },
    { label: "10", value: 10, onClick: () => table.setPageSize(10) },
    { label: "15", value: 15, onClick: () => table.setPageSize(15) },
    { label: "25", value: 25, onClick: () => table.setPageSize(25) },
    { label: "50", value: 50, onClick: () => table.setPageSize(50) },
    { label: "100", value: 100, onClick: () => table.setPageSize(100) },
  ]

  if (loading) return <h1>Loading...</h1>

  if (error) return <h1>Uh oh! {error.message}.</h1>

  if (data?.data?.length > 0)
    return (
      <div className={styles.datatable} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <TableHeader table={table} />

        <TableContainer sx={{ border: "var(--ts-dt-stroke)", borderRadius: "var(--ts-dt-radius)" }}>
          <Table className={styles.table}>
            <TableHead>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow className={styles.tr} key={headerGroup.id}>
                  <StyledTableCell className={styles.th}>
                    <Checkbox
                      checked={table.getIsAllPageRowsSelected()}
                      indeterminate={table.getIsSomePageRowsSelected()}
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 14 }, margin: 0 }}
                      onChange={table.getToggleAllPageRowsSelectedHandler()}
                      disableFocusRipple
                      disableTouchRipple
                      disableRipple
                    />
                  </StyledTableCell>
                  {headerGroup.headers.map(header => (
                    <StyledTableCell
                      key={header.id}
                      className={styles.th}
                      colSpan={header.colSpan}
                      style={{
                        position: header.column.getIsPinned() ? "sticky" : "static",
                        left: header.column.getStart("left"),
                        zIndex: "1",
                      }}
                    >
                      <div
                        style={{
                          width: header.getSize(),
                        }}
                      >
                        <TableHeadCell
                          table={table}
                          header={header}
                          headerContent={flexRender(header.column.columnDef.header, header.getContext())}
                          disableMenu={header.column.columnDef?.disableColumnMenu}
                        />
                      </div>
                    </StyledTableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {table.getCoreRowModel().rows.map(row => (
                <TableRow key={row.id} className={styles.tr}>
                  <StyledTableCell className={styles.td} padding="checkbox">
                    <Checkbox
                      checked={row.getIsSelected()}
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 14 }, margin: 0 }}
                      onChange={row.getToggleSelectedHandler()}
                      disableFocusRipple
                      disableTouchRipple
                      disableRipple
                    />
                  </StyledTableCell>
                  {row.getVisibleCells().map(cell => (
                    <StyledTableCell
                      key={cell.id}
                      className={styles.td}
                      style={{
                        position: cell.column.getIsPinned() ? "sticky" : "static",
                        left: cell.column.getIsPinned() ? cell.column.getStart("left") : 0,
                        zIndex: "1",
                      }}
                      onClick={() => row.toggleSelected(!row.getIsSelected())}
                    >
                      <div
                        style={{
                          textWrap: "nowrap",
                        }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </div>
                    </StyledTableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Pagination table={table} rowsPerPageDropdownOptions={rowsPerPageDropdownOptions} />
      </div>
    )
}

export default DataTable
