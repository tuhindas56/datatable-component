import React, { useState } from "react"
import Checkbox from "@mui/material/Checkbox"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"

import useData from "./hooks/useData"

import ColumnHeader from "./Datatable/ColumnHeader"
import Datatable from "./Datatable"
import RowOptionsMenu from "./Datatable/RowOptionsMenu"

const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        type="checkbox"
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={table.getIsSomePageRowsSelected()}
        onChange={table.getToggleAllPageRowsSelectedHandler()}
        disableRipple
        disableFocusRipple
        disableTouchRipple
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        type="checkbox"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
        disableRipple
        disableFocusRipple
        disableTouchRipple
      />
    ),
    size: 32,
    enableHiding: false,
    meta: {
      align: "center",
    },
  },
  {
    accessorFn: row => row.product,
    id: "product",
    header: ({ column }) => <ColumnHeader column={column} title="Product" />,
    meta: {
      label: "Product",
    },
  },
  {
    accessorFn: row => row.price,
    id: "price",
    header: ({ column }) => <ColumnHeader column={column} title="Price" />,
    cell: info => <span>₹ {info.getValue()}</span>,
    enablePinning: true,
    meta: {
      label: "Price",
    },
  },
  {
    accessorFn: row => row.material,
    id: "material",
    header: ({ column }) => <ColumnHeader column={column} title="Material" />,
    meta: {
      label: "Material",
    },
    enablePinning: false,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorFn: row => row.department,
    id: "department",
    header: ({ column }) => <ColumnHeader column={column} title="Department" />,
    meta: {
      label: "Department",
    },
  },
  {
    accessorFn: row => row.title,
    id: "title",
    header: ({ column }) => <ColumnHeader column={column} title="Title" />,
    meta: {
      label: "Title",
    },
  },
  {
    accessorFn: row => row.author,
    id: "author",
    header: ({ column }) => <ColumnHeader column={column} title="Author" />,
    meta: {
      label: "Author",
    },
  },
  {
    accessorFn: row => row.publisher,
    id: "publisher",
    header: ({ column }) => <ColumnHeader column={column} title="Publisher" />,
    meta: {
      label: "Publisher",
    },
  },
  {
    accessorFn: row => row.genre,
    id: "genre",
    header: ({ column }) => <ColumnHeader column={column} title="Genre" />,
    meta: {
      label: "Genre",
    },
  },
  {
    id: "options",
    header: "Options",
    cell: info => (
      <RowOptionsMenu
        options={[
          {
            label: "Edit",
            icon: <EditOutlinedIcon fontSize="small" />,
            onClick: () => alert(`Edited ${info.row.original.product}!`),
          },
          {
            label: "Delete",
            icon: <DeleteOutlineIcon fontSize="small" />,
            onClick: () => confirm("This won't do anything, but are you sure?"),
          },
        ]}
        key={info.row.original.product}
      />
    ),
    disableColumnMenu: true,
    enableHiding: false,
    meta: {
      label: "Options",
      align: "center",
    },
  },
]

const App = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [sorting, setSorting] = useState([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 50,
  })

  const { loading, error, data } = useData({
    currentPage: pagination.pageIndex,
    rowsPerPage: pagination.pageSize,
    sortBy: sorting[0] && sorting[0].id,
    sortOrder: sorting[0] && !sorting[0].desc,
    searchQuery,
  })

  return (
    <div style={{ padding: 32 }}>
      <Datatable
        columns={columns}
        loading={loading}
        error={error}
        data={data}
        pagination={pagination}
        setPagination={setPagination}
        sorting={sorting}
        setSorting={setSorting}
        setSearchQuery={setSearchQuery}
        totalPages={data?.total}
      />
    </div>
  )
}
export default App
