import { Input as BSInput } from "reactstrap"
import styles from "./styles.module.css"

const Input = props => {
  return (
    <BSInput
      className={`${styles[props.type === "checkbox" ? "ts-dt-checkbox" : "ts-dt-filter-input"]} ${props.className} `}
      {...props}
    />
  )
}
export default Input
