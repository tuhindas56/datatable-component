import { useEffect, useState } from "react"
import Input from "@mui/material/Input"

const Search = ({ placeholder, setSearchQuery }) => {
  const [search, setSearch] = useState("")

  const handleInputChange = e => setSearch(e.target.value)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchQuery(search)
    }, 900)

    return () => clearTimeout(timeout)
  }, [search])

  return <Input type="text" value={search} onChange={handleInputChange} placeholder={placeholder} />
}
export default Search
