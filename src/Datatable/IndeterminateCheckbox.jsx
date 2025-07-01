import { useEffect, useRef } from "react"
import { Input } from "reactstrap"

const IndeterminateCheckbox = ({ indeterminate, ...props }) => {
  const checkboxRef = useRef(null)

  useEffect(() => {
    checkboxRef.current.indeterminate = indeterminate
  }, [indeterminate])

  return <Input type="checkbox" innerRef={checkboxRef} {...props} />
}

export default IndeterminateCheckbox
