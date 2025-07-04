import { forwardRef } from "react"
import Button from "@mui/material/Button"
import Chip from "@mui/material/Chip"
import Divider from "@mui/material/Divider"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"

const TriggerComponent = forwardRef(({ label = "Add a label", filterValues = [], ...props }, ref) => {
  return (
    <Button ref={ref} {...props}>
      <AddCircleOutlineIcon /> {label}
      {filterValues.length > 0 && (
        <>
          <Divider orientation="vertical" variant="middle" sx={{ height: 16 }} />
          <Chip label={`${filterValues.length} selected`} />
        </>
      )}
    </Button>
  )
})

export default TriggerComponent
