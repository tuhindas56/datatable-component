import CheckIcon from "@mui/icons-material/Check"
import TuneIcon from "@mui/icons-material/Tune"

import CustomMenu from "../CustomMenu"

const Trigger = () => (
  <>
    <TuneIcon sx={{ fontSize: 14 }} />
    View
  </>
)

const ViewMenu = ({ table }) => {
  const columns = table.getAllColumns()
  const options = []

  for (let column of columns) {
    if (column.columnDef.meta && column.getCanHide()) {
      options.push({
        label: column.columnDef.meta,
        onClick: () => column.toggleVisibility(!column.getIsVisible()),
        endIcon: column.getIsVisible() && <CheckIcon sx={{ fontSize: 14 }} />,
      })
    }
  }

  return (
    <>
      {options.length > 0 && (
        <CustomMenu
          direction={{ vertical: "bottom", horizontal: "right" }}
          trigger={<Trigger />}
          options={options}
          buttonProps={{
            sx: {
              paddingInline: "14px",
            },
          }}
          searchable={true}
          searchPlaceholder="Search columns..."
        />
      )}
    </>
  )
}

export default ViewMenu
