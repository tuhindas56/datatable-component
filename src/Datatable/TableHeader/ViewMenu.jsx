import CheckIcon from "@mui/icons-material/Check"
import TuneIcon from "@mui/icons-material/Tune"
import Button from "@mui/material/Button"

import SearchableMenu from "../SearchableMenu"

const Trigger = props => {
  return (
    <Button {...props}>
      <TuneIcon /> View
    </Button>
  )
}

const ViewMenu = ({ table }) => {
  const columns = table.getAllColumns()
  const options = []

  for (let column of columns) {
    const meta = column.columnDef.meta
    if (meta && column.getCanHide()) {
      options.push({
        label: meta?.label || column?.id,
        onClick: () => column.toggleVisibility(!column.getIsVisible()),
        endIcon: column.getIsVisible() && <CheckIcon />,
      })
    }
  }

  return (
    <>
      {options.length > 0 && (
        <SearchableMenu
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          triggerComponent={Trigger}
          menuItems={options}
          enableSearch={true}
          searchInputPlaceholder="Search columns..."
        />
      )}
    </>
  )
}

export default ViewMenu
