import React, { useState } from "react"
import Checkbox from "@mui/material/Checkbox"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import IconButton from "@mui/material/IconButton"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown"
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp"
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight"

import useData from "./hooks/useData"

import ColumnHeader from "./Datatable/ColumnHeader"
import Datatable from "./Datatable"
import RowOptionsMenu from "./Datatable/RowOptionsMenu"

const columns = [
  {
    id: "expand",
    header: ({ table }) => (
      <IconButton onClick={table.getToggleAllRowsExpandedHandler()}>
        {table.getIsAllRowsExpanded() ? (
          <KeyboardDoubleArrowUpIcon />
        ) : table.getIsSomeRowsExpanded() ? (
          <KeyboardDoubleArrowUpIcon className="rotate90" />
        ) : (
          <KeyboardDoubleArrowUpIcon className="rotate180" />
        )}
      </IconButton>
    ),
    cell: info => (
      <IconButton onClick={info.row.getToggleExpandedHandler()}>
        {info.row.getIsExpanded() ? <ExpandMoreIcon className="rotate180" /> : <ExpandMoreIcon />}
      </IconButton>
    ),
    size: 40,
    enableHiding: false,
  },
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
    cell: info => (
      <Checkbox
        type="checkbox"
        checked={info.row.getIsSelected()}
        onChange={info.row.getToggleSelectedHandler()}
        disableRipple
        disableFocusRipple
        disableTouchRipple
      />
    ),
    size: 40,
    enableHiding: false,
    meta: {
      align: "center",
    },
  },
  {
    accessorFn: row => row.product,
    id: "product",
    header: ({ column }) => <ColumnHeader column={column} title="Product" />,
    minSize: 200,
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
    size: 64,
    meta: {
      label: "Options",
      align: "center",
    },
  },
]

const subRowsColumns = [
  {
    accessorFn: row => row.name,
    id: "name",
    header: ({ column }) => <ColumnHeader column={column} title="Name" child />,
  },
  {
    accessorFn: row => row.age,
    id: "age",
    header: ({ column }) => <ColumnHeader column={column} title="Age" child />,
  },
  {
    accessorFn: row => row.occupation,
    id: "occupation",
    header: ({ column }) => <ColumnHeader column={column} title="Occupation" child />,
  },
  {
    accessorFn: row => row.location,
    id: "location",
    header: ({ column }) => <ColumnHeader column={column} title="Location" child />,
  },
  {
    accessorFn: row => row.isActive,
    id: "isActive",
    header: ({ column }) => <ColumnHeader column={column} title="Active" child />,
    cell: info => (info.getValue() ? "Yes" : "No"),
  },
  {
    accessorFn: row => row.salary,
    id: "salary",
    header: ({ column }) => <ColumnHeader column={column} title="Salary" child />,
    cell: info => `₹ ${info.getValue().toLocaleString()}`,
  },
  {
    accessorFn: row => row.department,
    id: "department",
    header: ({ column }) => <ColumnHeader column={column} title="Department" child />,
  },
  {
    accessorFn: row => row.joinDate,
    id: "joinDate",
    header: ({ column }) => <ColumnHeader column={column} title="Join Date" child />,
    cell: info => new Date(info.getValue()).toLocaleDateString(),
  },
  {
    accessorFn: row => row.experience,
    id: "experience",
    header: ({ column }) => <ColumnHeader column={column} title="Experience (yrs)" child />,
  },
  {
    accessorFn: row => row.rating,
    id: "rating",
    header: ({ column }) => <ColumnHeader column={column} title="Rating" child />,
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
        enableSubRows={true}
        getSubRows={row => row.children}
        subRowsColumns={subRowsColumns}
      />
    </div>
  )
}
export default App
