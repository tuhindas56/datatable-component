import { useEffect, useState } from "react"
import { Input } from "reactstrap"

import styles from "./styles.module.css"

const Search = ({ placeholder, setSearchQuery }) => {
  const [search, setSearch] = useState("")

  const handleInputChange = e => setSearch(e.target.value)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchQuery(search)
    }, 900)

    return () => clearTimeout(timeout)
  }, [search])

  return (
    <Input
      type="text"
      value={search}
      onChange={handleInputChange}
      placeholder={placeholder}
      className={styles["table-search-input"]}
    />
  )
}
export default Search
