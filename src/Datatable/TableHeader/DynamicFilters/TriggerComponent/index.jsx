import { forwardRef } from "react"
import Button from "@mui/material/Button"
import Chip from "@mui/material/Chip"
import Divider from "@mui/material/Divider"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"

const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "short",
}).format

const TriggerComponent = forwardRef(
  ({ label = "Add a label", filterValues = [], type = "multiselect", ...props }, ref) => {
    return (
      <Button ref={ref} {...props}>
        <AddCircleOutlineIcon /> {label}
        {filterValues.length > 0 && (
          <>
            <Divider orientation="vertical" variant="middle" sx={{ height: 16 }} />
            {type === "multiselect" ? (
              <Chip label={`${filterValues.length} selected`} />
            ) : type === "range" ? (
              <span style={{ textWrap: "nowrap" }}>
                {filterValues[0]} - {filterValues[1]}
              </span>
            ) : (
              type === "daterange" && (
                <span style={{ textWrap: "nowrap" }}>
                  {dateFormatter(new Date(filterValues[0] * 1000))} - {dateFormatter(new Date(filterValues[1] * 1000))}
                </span>
              )
            )}
          </>
        )}
      </Button>
    )
  }
)

export default TriggerComponent
