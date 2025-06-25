import { Stack } from "@mui/material"

import CustomMenu from "../CustomMenu"
import ViewMenu from "./ViewMenu"

const TableHeader = ({ table }) => {
  return (
    <Stack direction="row" justifyContent="space-between" marginBottom={1}>
      <CustomMenu direction={{ vertical: "bottom", horizontal: "right" }} />
      <CustomMenu direction={{ vertical: "bottom", horizontal: "right" }} />
      <ViewMenu table={table} />
    </Stack>
  )
}
export default TableHeader
