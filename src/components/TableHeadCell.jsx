import PushPinIcon from "@mui/icons-material/PushPin"
import CheckIcon from "@mui/icons-material/Check"
import { ChevronUp, ChevronDown, X, EyeOff, MoreVertical } from "react-feather"

import styles from "../styles.module.css"
import CustomMenu from "./CustomMenu"

const ICON_SIZE = 14

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

const TableHeadCell = ({ header = {}, headerContent = "Header", table, disableMenu = false }) => {
  const canPin = header?.column?.getCanPin()
  const isPinned = canPin && header?.column?.getIsPinned()
  const canSort = header?.column?.getCanSort()
  const isSorted = canSort && header?.column?.getIsSorted()
  const sortState = table.getState().sorting[0]
  const canHide = header?.column?.getCanHide() || false

  const handlePinning = () => {
    if (isPinned) header.column.pin(false)
    else header.column.pin("left")
  }

  const handleSorting = desc => {
    if (sortState?.id !== header.column.id || sortState?.desc !== desc) header.column.toggleSorting(desc, false)
  }

  const handleHide = () => {
    header.column.toggleVisibility(false)
  }

  const handleReset = () => {
    if (isSorted) table.setSorting([])
  }

  const getOptions = () => {
    const options = []

    if (canSort) {
      options.push(
        {
          icon: <ChevronUp size={ICON_SIZE} />,
          label: "Asc",
          onClick: () => handleSorting(false),
          endIcon: isSorted && !sortState?.desc && <CheckIcon sx={{ fontSize: ICON_SIZE }} />,
        },
        {
          icon: <ChevronDown size={ICON_SIZE} />,
          label: "Desc",
          onClick: () => handleSorting(true),
          endIcon: isSorted && sortState?.desc && <CheckIcon sx={{ fontSize: ICON_SIZE }} />,
        },
        {
          icon: <X size={ICON_SIZE} />,
          label: "Reset",
          onClick: handleReset,
          showDivider: canPin || canHide,
        }
      )
    }

    if (canPin) {
      options.push({
        icon: isPinned ? (
          <UnpinIcon size={ICON_SIZE} />
        ) : (
          <PushPinIcon
            sx={{ fontSize: `${ICON_SIZE}px`, color: "var(--ts-dt-icon-color-dark)", transform: "rotate(40deg)" }}
          />
        ),
        label: isPinned ? "Unpin" : "Pin",
        onClick: handlePinning,
      })
    }

    if (canHide) {
      options.push({
        icon: <EyeOff size={ICON_SIZE} />,
        label: "Hide",
        onClick: handleHide,
      })
    }

    return options
  }

  const Trigger = () => (
    <>
      {headerContent}
      {isSorted && !sortState?.desc && <ChevronUp size={ICON_SIZE} />}
      {isSorted && sortState?.desc && <ChevronDown size={ICON_SIZE} />}
      {isPinned && (
        <PushPinIcon
          sx={{ fontSize: `${ICON_SIZE}px`, color: "var(--ts-dt-icon-color-dark)", transform: "rotate(40deg)" }}
        />
      )}
      <MoreVertical size={ICON_SIZE} />
    </>
  )

  return (
    <>
      {disableMenu ? (
        headerContent
      ) : (
        <CustomMenu trigger={<Trigger />} options={getOptions()} buttonProps={{ sx: { outline: "none" } }} />
      )}
    </>
  )
}

export default TableHeadCell
