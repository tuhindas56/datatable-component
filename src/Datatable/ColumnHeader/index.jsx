import CheckIcon from "@mui/icons-material/Check"
import CloseIcon from "@mui/icons-material/Close"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import PushPinIcon from "@mui/icons-material/PushPin"

import ColumnHeaderMenu from "./ColumnHeaderMenu"

const ColumnHeader = ({ column, title = "Header", child = false }) => {
  const canPin = column?.getCanPin() || false
  const isPinned = canPin && column?.getIsPinned()
  const canSort = column?.getCanSort() || false
  const isSorted = canSort && column?.getIsSorted()
  const canHide = column?.getCanHide() || false

  if (!canHide && !canPin && !canSort) {
    return title
  }

  const handleSorting = desc => {
    column.toggleSorting(desc, true)
  }

  const handleHide = () => {
    column.toggleVisibility(false)
  }

  const handlePin = () => {
    column.pin(!child && (isPinned ? false : "left"))
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

    if (canPin) {
      options.push({
        icon: <PushPinIcon sx={{ transform: "rotateZ(45deg)" }} />,
        label: isPinned ? "Unpin" : "Pin",
        onClick: handlePin,
      })
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

  return <ColumnHeaderMenu buttonLabel={title} options={getOptions()} isSorted={isSorted} isPinned={isPinned} />
}

export default ColumnHeader
