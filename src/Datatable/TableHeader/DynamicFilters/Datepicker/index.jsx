import { useRef, useState } from "react"
import Menu from "@mui/material/Menu"

import TriggerComponent from "../TriggerComponent"

const convertToUnixTimestamp = date => Math.floor(new Date(date).getTime() / 1000)

const Datepicker = ({ column, label, filterValues = [] }) => {
  const [selected, setSelected] = useState({ from: null, to: null })
  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)

  const handleClick = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleSubmit = e => {
    e.preventDefault()
    if (selected.from && selected.to) {
      const filterValue = [convertToUnixTimestamp(selected.from), convertToUnixTimestamp(selected.to)]
      column.setFilterValue(filterValue)
      handleClose()
    }
  }

  return (
    <>
      <TriggerComponent onClick={handleClick} label={label} filterValues={filterValues} ref={anchorRef} />
      <Menu anchorEl={anchorRef.current} open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <label>
            Start date
            <input
              type="date"
              required
              placeholder="Start date"
              onChange={e => setSelected(prev => ({ ...prev, from: e.target.value }))}
              value={selected.from}
              max="2025-01-01"
            />
          </label>
          <label>
            End date
            <input
              type="date"
              required
              placeholder="End date"
              onChange={e => setSelected(prev => ({ ...prev, to: e.target.value }))}
              value={selected.to}
              max="2025-01-01"
            />
          </label>
          <button>Submit</button>
        </form>
      </Menu>
    </>
  )
}

export default Datepicker
