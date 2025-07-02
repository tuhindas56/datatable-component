import { useEffect, useRef } from "react"
import { Input } from "reactstrap"

import styles from "./styles.module.css"

const IndeterminateCheckbox = ({ indeterminate, className = "", ...props }) => {
  const checkboxRef = useRef(null)

  useEffect(() => {
    checkboxRef.current.indeterminate = indeterminate
  }, [indeterminate])

  return (
    <div className={styles["indeterminate-checkbox-container"]}>
      <Input
        type="checkbox"
        innerRef={checkboxRef}
        className={`${styles["indeterminate-checkbox"]} ${className}`}
        {...props}
      />
    </div>
  )
}

export default IndeterminateCheckbox
