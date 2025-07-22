import Input from "@components/tanstack-datatable/Input"

const Search = ({ searchQuery, setSearchQuery, ...props }) => {
  const onSearchChange = e => setSearchQuery(e.target.value)
  return <Input type="search" value={searchQuery} onChange={onSearchChange} {...props} />
}
export default Search
