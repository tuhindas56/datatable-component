import Input from "../../../Input"

const Search = ({ placeholder, search, onChange }) => {
  return <Input type="search" value={search} onChange={onChange} placeholder={placeholder} />
}
export default Search
