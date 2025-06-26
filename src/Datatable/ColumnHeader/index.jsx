import PushPinIcon from "@mui/icons-material/PushPin"
import CheckIcon from "@mui/icons-material/Check"
import { ChevronUp, ChevronDown, X, EyeOff } from "react-feather"

import ColumnHeaderMenu from "./ColumnHeaderMenu"

const UnpinIcon = ({ size = 12, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 17v5" />
    <path d="M15 9.34V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H7.89" />
    <path d="m2 2 20 20" />
    <path d="M9 9v1.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h11" />
  </svg>
)

const ColumnHeader = ({ column, title = "Header" }) => {
  const canPin = column?.getCanPin()
  const isPinned = canPin && column?.getIsPinned()
  const canSort = column?.getCanSort()
  const isSorted = canSort && column?.getIsSorted()
  const canHide = column?.getCanHide() || false

  if (!canHide && !canPin && !canSort) {
    return <div>{title}</div>
  }

  const handlePinning = () => {
    if (isPinned) column.pin(false)
    else column.pin("left")
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
          showDivider: canPin || canHide,
        }
      )
    }

    if (canPin) {
      options.push({
        icon: isPinned ? <UnpinIcon /> : <PushPinIcon sx={{ transform: "rotate(40deg)" }} />,
        label: isPinned ? "Unpin" : "Pin",
        onClick: handlePinning,
      })
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

  return <ColumnHeaderMenu buttonLabel={title} options={getOptions()} isSorted={isSorted} isPinned={isPinned} />
}

export default ColumnHeader
