import CheckIcon from "@mui/icons-material/Check"
import { ChevronUp, ChevronDown, X, EyeOff } from "react-feather"

import ColumnHeaderMenu from "./ColumnHeaderMenu"

const ColumnHeader = ({ column, title = "Header" }) => {
  const canSort = column?.getCanSort()
  const isSorted = canSort && column?.getIsSorted()
  const canHide = column?.getCanHide() || false

  if (!canHide && !canSort) {
    return <div>{title}</div>
  }

  const handleSorting = desc => {
    column.toggleSorting(desc, false)
  }

  const handleHide = () => {
    column.toggleVisibility(false)
  }

  const handleReset = () => {
    if (isSorted) column.clearSorting()
  }

  const getOptions = () => {
    const options = []

    if (canSort) {
      options.push(
        {
          icon: <ChevronUp />,
          label: "Asc",
          onClick: () => handleSorting(false),
          endIcon: isSorted === "asc" && <CheckIcon />,
        },
        {
          icon: <ChevronDown />,
          label: "Desc",
          onClick: () => handleSorting(true),
          endIcon: isSorted === "desc" && <CheckIcon />,
        },
        {
          icon: <X />,
          label: "Reset",
          onClick: handleReset,
          showDivider: canHide,
        }
      )
    }

    if (canHide) {
      options.push({
        icon: <EyeOff />,
        label: "Hide",
        onClick: handleHide,
      })
    }

    return options
  }

  return <ColumnHeaderMenu buttonLabel={title} options={getOptions()} isSorted={isSorted} />
}

export default ColumnHeader
