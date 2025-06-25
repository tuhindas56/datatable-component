import { useMemo, useState } from "react"
import { Edit2, Trash2 } from "react-feather"

import useData from "./hooks/useData"

import DataTable from "./components/DataTable"
import RowOptions from "./components/RowOptions"

const App = () => {
  const [sorting, setSorting] = useState([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const { loading, error, data } = useData({
    currentPage: pagination.pageIndex,
    rowsPerPage: pagination.pageSize,
    sortBy: sorting[0] && sorting[0].id,
    sortOrder: sorting[0] && !sorting[0].desc,
  })

  const columns = useMemo(
    () => [
      {
        accessorFn: row => row.id,
        id: "id",
        header: "ID",
        disableColumnMenu: true,
        meta: "ID",
      },
      {
        accessorFn: row => row.product,
        id: "product",
        header: "Product",
        disableSorting: true,
        disableHiding: true,
        meta: "Product",
      },
      {
        accessorFn: row => row.price,
        id: "price",
        header: "Price",
        cell: info => <span>₹ {info.getValue()}</span>,
        disablePinning: true,
        meta: "Price",
      },
      {
        accessorFn: row => row.material,
        id: "material",
        header: "Material",
        meta: "Material",
      },
      {
        accessorFn: row => row.department,
        id: "department",
        header: "Department",
        meta: "Department",
      },
      {
        accessorFn: row => row.title,
        id: "title",
        header: "Title",
        meta: "Title",
      },
      {
        accessorFn: row => row.author,
        id: "author",
        header: "Author",
        meta: "Author",
      },
      {
        accessorFn: row => row.publisher,
        id: "publisher",
        header: "Publisher",
        meta: "Publisher",
      },
      {
        accessorFn: row => row.genre,
        id: "genre",
        header: "Genre",
        meta: "Genre",
      },
      {
        id: "options",
        header: () => <div style={{ textAlign: "center" }}>Options</div>,
        cell: info => (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <RowOptions
              options={[
                {
                  label: "Edit",
                  icon: <Edit2 size={14} />,
                  onClick: () => alert(`Edited ${info.row.original.product}!`),
                },
                {
                  label: "Delete",
                  icon: <Trash2 size={14} />,
                  onClick: () => confirm("This won't do anything, but are you sure?"),
                },
              ]}
            />
          </div>
        ),
        disableColumnMenu: true,
        enableHiding: false,
        meta: "Options",
        size: 100,
      },
    ],
    []
  )

  return (
    <div style={{ padding: 32 }}>
      <DataTable
        columns={columns}
        loading={loading}
        error={error}
        data={data}
        pagination={pagination}
        setPagination={setPagination}
        sorting={sorting}
        setSorting={setSorting}
        totalPages={data?.total}
      />
    </div>
  )
}
export default App
