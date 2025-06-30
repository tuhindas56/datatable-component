// import { ThemeProvider } from "@mui/material/styles"

// import DatatableBase from "./DatatableBase"
import DatatableBase from "./DatatableBootstrap"
// import theme from "./theme"

const Datatable = props => {
  return (
    // <ThemeProvider theme={theme}>
    <DatatableBase {...props} />
    // </ThemeProvider>
  )
}

export default Datatable
