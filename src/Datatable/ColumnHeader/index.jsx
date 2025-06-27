import CheckIcon from "@mui/icons-material/Check"
import CloseIcon from "@mui/icons-material/Close"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"

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
          icon: <KeyboardArrowUpIcon />,
          label: "Asc",
          onClick: () => handleSorting(false),
          endIcon: isSorted === "asc" && <CheckIcon />,
        },
        {
          icon: <KeyboardArrowDownIcon />,
          label: "Desc",
          onClick: () => handleSorting(true),
          endIcon: isSorted === "desc" && <CheckIcon />,
        },
        {
          icon: <CloseIcon />,
          label: "Reset",
          onClick: handleReset,
          showDivider: canHide,
        }
      )
    }

    if (canHide) {
      options.push({
        icon: <VisibilityOffIcon />,
        label: "Hide",
        onClick: handleHide,
      })
    }

    return options
  }

  return <ColumnHeaderMenu buttonLabel={title} options={getOptions()} isSorted={isSorted} />
}

export default ColumnHeader
