import MenuItem from "@mui/material/MenuItem"
import Typography from "@mui/material/Typography"

const NoResultsItem = () => {
  return (
    <MenuItem sx={{ pointerEvents: "none" }}>
      <Typography variant="body2">No matches found.</Typography>
    </MenuItem>
  )
}

export default NoResultsItem
