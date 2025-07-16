import { forwardRef } from "react"
import Button from "@mui/material/Button"
import Chip from "@mui/material/Chip"
import Divider from "@mui/material/Divider"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"

import { dateFormatter, timeFormatter } from "../../../utils"

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
      const [startDate, endDate] = filterValues

      if (startDate && endDate)
        return (
          <span style={{ textWrap: "nowrap" }}>
            {dateFormatter(new Date(startDate * 1000))} - {dateFormatter(new Date(endDate * 1000))}
          </span>
        )

      if (startDate)
        return (
          <span style={{ textWrap: "nowrap" }}>
            {">"} {dateFormatter(new Date(startDate * 1000))}
          </span>
        )

      if (endDate)
        return (
          <span style={{ textWrap: "nowrap" }}>
            {"<"} {dateFormatter(new Date(endDate * 1000))}
          </span>
        )

    case "timerange":
      const [startTime, endTime] = filterValues

      if (startTime && endTime)
        return (
          <span style={{ textWrap: "nowrap" }}>
            {timeFormatter(new Date(startTime * 1000))} - {timeFormatter(new Date(endTime * 1000))}
          </span>
        )

      if (startTime)
        return (
          <span style={{ textWrap: "nowrap" }}>
            {">"} {timeFormatter(new Date(startTime * 1000))}
          </span>
        )

      if (endTime)
        return (
          <span style={{ textWrap: "nowrap" }}>
            {"<"} {timeFormatter(new Date(endTime * 1000))}
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
      <Button ref={ref} sx={{ minWidth: "max-content" }} {...props}>
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
