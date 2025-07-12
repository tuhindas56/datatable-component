import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Input from "../../../../Input"

const CheckboxMenuToggleItem = ({ label = "Add a label", checked = false, onChange = () => {}, icon = null }) => {
  return (
    <Stack direction="row" alignItems="center" spacing={1} useFlexGap>
      <Input type="checkbox" checked={checked} onChange={onChange} />
      {icon && icon}
      <Typography variant="body2">{label}</Typography>
    </Stack>
  )
}

export default CheckboxMenuToggleItem
