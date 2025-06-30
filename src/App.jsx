import { useMemo } from "react"

import useData from "./hooks/useData"

import Datatable from "./Datatable"

const App = () => {
  const columns = useMemo(
    () => [
      {
        accessorFn: row => row.product,
        header: "Product",
      },
      {
        accessorFn: row => row.price,
        header: "Price",
      },
      {
        accessorFn: row => row.material,
        header: "Material",
      },
      {
        accessorFn: row => row.department,
        header: "Department",
      },
      {
        accessorFn: row => row.title,
        header: "Title",
      },
      {
        accessorFn: row => row.author,
        header: "Author",
      },
      {
        accessorFn: row => row.publisher,
        header: "Publisher",
      },
      {
        accessorFn: row => row.genre,
        header: "Genre",
      },
    ],
    []
  )

  const { loading, error, data } = useData({
    rowsPerPage: 100,
  })

  return (
    <div style={{ padding: "20px" }}>
      <Datatable columns={columns} loading={loading} data={data?.data} error={error} />
    </div>
  )
}
export default App
