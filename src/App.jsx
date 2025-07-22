import { useEffect, useState } from "react"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"

import useData from "./hooks/useData"
import { dateFormatter, timeFormatter } from "@tanstack-datatable/utils"

import ColumnHeader from "@tanstack-datatable/ColumnHeader"
import Datatable from "@tanstack-datatable"
import IndeterminateCheckbox from "@tanstack-datatable/RowLevelComponents/IndeterminateCheckbox"
import RowExpansionToggle from "@tanstack-datatable/RowLevelComponents/RowExpansionToggle"
import RowOptionsMenu from "@tanstack-datatable/RowLevelComponents/RowOptionsMenu"

const columns = [
  {
    id: "expand",
    header: ({ table }) => <RowExpansionToggle table={table} />,
    cell: info => <RowExpansionToggle row={info.row} />,
    meta: {
      align: "center",
    },
    size: 32,
    enableHiding: false,
  },
  {
    id: "select",
    header: ({ table }) => (
      <IndeterminateCheckbox
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={table.getIsSomePageRowsSelected()}
        onChange={table.getToggleAllPageRowsSelectedHandler()}
      />
    ),
    cell: info => (
      <IndeterminateCheckbox checked={info.row.getIsSelected()} onChange={info.row.getToggleSelectedHandler()} />
    ),
    size: 24,
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
    enableColumnFilter: false,
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
      filter: {
        type: "range",
      },
    },
  },
  {
    accessorFn: row => row.material,
    id: "material",
    header: ({ column }) => <ColumnHeader column={column} title="Material" />,
    meta: {
      label: "Material",
      filter: {
        type: "multiselect",
        options: [
          { label: "Marble", value: "Marble" },
          { label: "Bronze", value: "Bronze" },
          { label: "Plastic", value: "Plastic" },
        ],
      },
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
      filter: {
        type: "multiselect",
        options: [
          { label: "Games", value: "Games" },
          { label: "Health", value: "Health" },
          { label: "Grocery", value: "Grocery" },
          { label: "Jewelry", value: "Jewelry" },
          { label: "Electronics", value: "Electronics" },
          { label: "Sports", value: "Sports" },
        ],
      },
    },
  },
  {
    accessorFn: row => row.date_unix,
    id: "date_unix",
    header: ({ column }) => <ColumnHeader column={column} title="Date" />,
    cell: info => dateFormatter(new Date(info.getValue() * 1000)),
    meta: {
      label: "Date",
      filter: { type: "daterange" },
    },
  },
  {
    accessorFn: row => row.time_unix,
    id: "time_unix",
    header: ({ column }) => <ColumnHeader column={column} title="Time" />,
    cell: info => timeFormatter(new Date(info.getValue() * 1000)),
    meta: {
      label: "Time",
      filter: { type: "timerange" },
    },
  },
  {
    accessorFn: row => row.title,
    id: "title",
    header: ({ column }) => <ColumnHeader column={column} title="Title" />,
    enableColumnFilter: false,
    meta: {
      label: "Title",
    },
  },
  {
    accessorFn: row => row.author,
    id: "author",
    header: ({ column }) => <ColumnHeader column={column} title="Author" />,
    enableColumnFilter: false,
    meta: {
      label: "Author",
    },
  },
  {
    accessorFn: row => row.publisher,
    id: "publisher",
    header: ({ column }) => <ColumnHeader column={column} title="Publisher" />,
    enableColumnFilter: false,
    meta: {
      label: "Publisher",
    },
  },
  {
    accessorFn: row => row.genre,
    id: "genre",
    header: ({ column }) => <ColumnHeader column={column} title="Genre" />,
    enableColumnFilter: false,
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
  const [selectedRows, setSelectedRows] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 15,
  })

  const { loading, error, data } = useData({
    currentPage: pagination.pageIndex,
    rowsPerPage: pagination.pageSize,
    sorts: sorting,
    searchQuery,
    filters: columnFilters,
  })

  return (
    <div style={{ padding: 32 }}>
      <Datatable
        columns={columns}
        loading={loading}
        error={error}
        data={data?.data}
        pagination={pagination}
        setPagination={setPagination}
        sorting={sorting}
        setSorting={setSorting}
        setSearchQuery={setSearchQuery}
        totalPages={data?.total}
        enableSubRows={true}
        getSubRows={row => row.children}
        subRowsColumns={subRowsColumns}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        rowSelectionOptions={[
          {
            icon: <DeleteOutlineIcon />,
            tooltipText: "Delete",
            onClick: () => alert("deleted"),
          },
        ]}
      />
    </div>
  )
}
export default App
