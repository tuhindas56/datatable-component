import Input from "../../../Input"

const Search = ({ placeholder, search, onChange, ...props }) => {
  return <Input type="search" value={search} onChange={onChange} placeholder={placeholder} {...props} />
}
export default Search
