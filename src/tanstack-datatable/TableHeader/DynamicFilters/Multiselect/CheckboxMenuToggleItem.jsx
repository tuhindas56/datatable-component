import Checkbox from "@mui/material/Checkbox"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

const CheckboxMenuToggleItem = ({ label = "Add a label", checked = false, onChange = () => {}, icon = null }) => {
  return (
    <Stack direction="row" alignItems="center" spacing={1} useFlexGap>
      <Checkbox checked={checked} onChange={onChange} />
      {icon && icon}
      <Typography variant="body2">{label}</Typography>
    </Stack>
  )
}

export default CheckboxMenuToggleItem
