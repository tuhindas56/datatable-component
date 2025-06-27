import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient("https://serttcbgdvcdujcrnusw.supabase.co/", import.meta.env.VITE_SUPABASE_API_KEY)

const useData = ({ currentPage = 0, rowsPerPage = 10, sortBy = null, sortOrder = true, searchQuery = "" }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  const getData = async () => {
    setLoading(true)
    setError(null)

    try {
      const from = currentPage * rowsPerPage
      const to = from + rowsPerPage - 1

      let query = supabase.from("mockdata").select("*", {
        count: "exact",
      })

      if (searchQuery) {
        query = query.ilike("product", `%${searchQuery}%`)
      }

      if (sortBy) {
        query = query.order(sortBy, { ascending: sortOrder })
      }

      query = query.range(from, to)

      const response = await query

      if (response.error) throw new Error(response.error.message)

      response?.data?.forEach(item => {
        item.children = [
          {
            id: crypto.randomUUID(),
            name: "John",
            age: 25,
            occupation: "Accountant",
            location: "New York",
            isActive: true,
            salary: 55000,
            department: "Finance",
            joinDate: "2021-04-15",
            experience: 2,
            rating: 4.3,
          },
          {
            id: crypto.randomUUID(),
            name: "Jane",
            age: 50,
            occupation: "Baker",
            location: "Chicago",
            isActive: false,
            salary: 42000,
            department: "Culinary",
            joinDate: "2022-11-01",
            experience: 1,
            rating: 3.9,
          },
        ]
      })

      setData({
        ...response,
        total: Math.ceil(response.count / rowsPerPage),
        currentPage,
        rowsPerPage,
      })
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [currentPage, rowsPerPage, sortBy, sortOrder, searchQuery])

  return { loading, error, data }
}

export default useData
