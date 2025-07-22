import { useEffect, useRef } from "react"
// import Checkbox from "@mui/material/Checkbox"
import Stack from "@mui/material/Stack"

import Input from "@components/tanstack-datatable/Input"

const IndeterminateCheckbox = ({ indeterminate, ...props }) => {
  const checkboxRef = useRef(null)

  useEffect(() => {
    checkboxRef.current.indeterminate = indeterminate
  }, [indeterminate])

  return (
    <Stack justifyContent='center'>
      <Input type="checkbox" innerRef={checkboxRef} {...props} />
      {/* <Checkbox indeterminate={indeterminate} {...props} /> */}
    </Stack>
  )
}

export default IndeterminateCheckbox
