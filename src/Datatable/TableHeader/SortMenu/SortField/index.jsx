import { useState } from "react"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Typography from "@mui/material/Typography"
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined"
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore"

const SortColumnMenu = ({ columns, sort, sortedColLabel, onSortUpdate }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = event => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  const handleMenuItemClick = column => {
    onSortUpdate(sort.id, { id: column.id })
  }

  return (
    <>
      <Button onClick={handleClick} className="rows-per-page-menu-trigger" sx={{ width: "100%", maxWidth: "unset" }}>
        <Typography variant="body2">{sortedColLabel}</Typography>
        <UnfoldMoreIcon />
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {columns.length > 0 ? (
          columns.map((column, index) => (
            <MenuItem key={`${column.id}-${index}-sort-menu`} onClick={() => handleMenuItemClick(column)}>
              <Typography variant="body2">{column.columnDef?.meta?.label}</Typography>
            </MenuItem>
          ))
        ) : (
          <MenuItem
            sx={{
              "&:hover": {
                background: "transparent",
              },
            }}
          >
            <Typography variant="body2">No other sortable columns</Typography>
          </MenuItem>
        )}
      </Menu>
    </>
  )
}

const SortOrderMenu = ({ sort, onSortUpdate }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = event => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  const handleMenuItemClick = desc => {
    if (sort.desc !== desc) onSortUpdate(sort.id, { desc })
    setAnchorEl(null)
  }

  return (
    <>
      <Button onClick={handleClick} className="rows-per-page-menu-trigger" sx={{ width: "100%", maxWidth: "unset" }}>
        <Typography variant="body2">{sort.desc ? "Desc" : "Asc"}</Typography>
        <UnfoldMoreIcon />
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => handleMenuItemClick(false)}>
          <Typography variant="body2">Asc</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick(true)}>
          <Typography variant="body2">Desc</Typography>
        </MenuItem>
      </Menu>
    </>
  )
}

const SortField = ({ sort, sortedColLabel, columns, onSortUpdate, onSortRemove }) => {
  return (
    <div
      style={{
        display: "grid",
        gridAutoFlow: "column",
        gridTemplateColumns: "3fr 2fr",
        columnGap: 16,
      }}
    >
      <SortColumnMenu sort={sort} sortedColLabel={sortedColLabel} columns={columns} onSortUpdate={onSortUpdate} />
      <SortOrderMenu sort={sort} onSortUpdate={onSortUpdate} />
      <IconButton onClick={() => onSortRemove(sort.id)} sx={{ justifySelf: "end" }}>
        <DeleteOutlinedIcon sx={{ fontSize: 16 }} />
      </IconButton>
    </div>
  )
}

export default SortField
