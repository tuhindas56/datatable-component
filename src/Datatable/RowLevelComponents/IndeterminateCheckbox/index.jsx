import { useEffect, useRef } from "react"
import Stack from "@mui/material/Stack"

import Checkbox from "../../Checkbox"

const IndeterminateCheckbox = ({ indeterminate, ...props }) => {
  const checkboxRef = useRef(null)

  useEffect(() => {
    checkboxRef.current.indeterminate = indeterminate
  }, [indeterminate])

  return (
    <Stack>
      <Checkbox innerRef={checkboxRef} {...props} />
    </Stack>
  )
}

export default IndeterminateCheckbox
