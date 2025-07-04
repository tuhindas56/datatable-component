import { useEffect, useRef } from "react"
import Stack from "@mui/material/Stack"

import Input from "../../Input"

const IndeterminateCheckbox = ({ indeterminate, ...props }) => {
  const checkboxRef = useRef(null)

  useEffect(() => {
    checkboxRef.current.indeterminate = indeterminate
  }, [indeterminate])

  return (
    <Stack>
      <Input type="checkbox" innerRef={checkboxRef} {...props} />
    </Stack>
  )
}

export default IndeterminateCheckbox
