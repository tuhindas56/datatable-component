import { useState } from "react"
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"

import styles from "./styles.module.css"

const Datatable = ({ loading = false, error = null, data = [], columns = [] }) => {
  const [rowSelection, setRowSelection] = useState({})
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: row => row.id,
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
  })
  const colCount = table.getHeaderGroups()[0].headers.length

  return (
    <div className={styles["ts-dt-table-container"]}>
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => {
            return (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return <th key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</th>
                })}
                {}
              </tr>
            )
          })}
        </thead>

        <tbody>
          {table.getCoreRowModel().rows.map(row => {
            if (loading)
              return (
                <tr>
                  <td colSpan={colCount}>Loading..</td>
                </tr>
              )

            if (error)
              return (
                <tr>
                  <td colSpan={colCount}>There was an error.</td>
                </tr>
              )

            return (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => {
                  return <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Datatable
