import { ThemeProvider } from "@mui/material/styles"

import DatatableBase from "./DatatableBase"
import theme from "./theme"

const Datatable = props => {
  return (
    <ThemeProvider theme={theme}>
      <DatatableBase {...props} />
    </ThemeProvider>
  )
}

export default Datatable
