import { forwardRef } from "react"
import Button from "@mui/material/Button"
import Chip from "@mui/material/Chip"
import Divider from "@mui/material/Divider"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"

const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "medium",
}).format

const renderFilterIndicator = (type, filterValues) => {
  if (filterValues.length === 0) return null

  switch (type) {
    case "multiselect":
      return <Chip label={`${filterValues.length} selected`} />

    case "range":
      const [min, max] = filterValues
      if (min && max)
        return (
          <span style={{ textWrap: "nowrap" }}>
            {min} - {max}
          </span>
        )

      if (min)
        return (
          <span style={{ textWrap: "nowrap" }}>
            {">"} {min}
          </span>
        )

      if (max)
        return (
          <span style={{ textWrap: "nowrap" }}>
            {"<"} {max}
          </span>
        )

    case "daterange":
      const [start, end] = filterValues

      if (start && end)
        return (
          <span style={{ textWrap: "nowrap" }}>
            {dateFormatter(new Date(start * 1000))} - {dateFormatter(new Date(end * 1000))}
          </span>
        )

      if (start)
        return (
          <span style={{ textWrap: "nowrap" }}>
            {">"} {dateFormatter(new Date(start * 1000))}
          </span>
        )

      if (end)
        return (
          <span style={{ textWrap: "nowrap" }}>
            {"<"} {dateFormatter(new Date(end * 1000))}
          </span>
        )

    case "filtermenu":
      return <Chip label={`${filterValues.length} active`} />

    default:
      return null
  }
}

const TriggerComponent = forwardRef(
  ({ label = "Add a label", filterValues = [], type = "multiselect", icon, ...props }, ref) => {
    return (
      <Button ref={ref} {...props}>
        {icon || <AddCircleOutlineIcon />}
        {label}
        {filterValues.length > 0 && (
          <>
            <Divider orientation="vertical" variant="middle" sx={{ height: 16 }} />
            {renderFilterIndicator(type, filterValues)}
          </>
        )}
      </Button>
    )
  }
)

export default TriggerComponent
