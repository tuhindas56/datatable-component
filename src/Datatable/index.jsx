import { useState } from "react"
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { Table } from "reactstrap"

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
      <Table hover className={styles["ts-dt-table"]}>
        <thead>
          {table.getHeaderGroups().map(headerGroup => {
            return (
              <tr key={headerGroup.id} className={styles["tr"]}>
                {headerGroup.headers.map(header => {
                  return (
                    <th key={header.id} className={styles["th"]} style={{ width: header.column.getSize() }}>
                      <div
                        style={{
                          display: "grid",
                          placeContent: `center ${header.column.columnDef?.meta?.align || "left"}`,
                          textAlign: header.column.columnDef?.meta?.align || "left",
                        }}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </div>
                    </th>
                  )
                })}
              </tr>
            )
          })}
        </thead>

        <tbody className={styles["tbody"]}>
          {loading ? (
            <tr className={styles["tr"]}>
              <td colSpan={colCount} className={styles["td"]}>
                <p className={styles["message"]}>Loading...</p>
              </td>
            </tr>
          ) : error ? (
            <tr className={styles["tr"]}>
              <td colSpan={colCount} className={styles["td"]}>
                <p className={styles["message"]}>
                  There was an error. <br />
                  {error.message}
                </p>
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map(row => {
              return (
                <tr key={row.id} className={`${styles["tr"]} ${row.getIsSelected() && "row-selected"}`}>
                  {row.getVisibleCells().map(cell => {
                    return (
                      <td key={cell.id} className={styles["td"]} style={{ width: cell.column.getSize() }}>
                        <div
                          style={{
                            display: "grid",
                            placeContent: `center ${cell.column.columnDef?.meta?.align || "left"}`,
                            textAlign: cell.column.columnDef?.meta?.align || "left",
                          }}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </div>
                      </td>
                    )
                  })}
                </tr>
              )
            })
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default Datatable
