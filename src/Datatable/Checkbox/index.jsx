import { Input } from "reactstrap"

import styles from "./styles.module.css"

const Checkbox = ({ className, ...props }) => {
  return <Input type="checkbox" className={`${styles["ts-dt-checkbox"]} ${className}`} {...props} />
}

export default Checkbox
