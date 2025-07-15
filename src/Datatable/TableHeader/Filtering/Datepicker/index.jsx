import { DatePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"

import { themeVars } from "../../../theme"

const Datepicker = props => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        slotProps={{
          textField: {
            size: "small",
            error: false,
            sx: {
              "& .MuiPickersInputBase-root": {
                fontSize: themeVars.fontSize,
                height: 32,
                width: 160,
                boxShadow: themeVars.boxShadow.strong,
                border: "none !important",
              },
              "& .MuiPickersInputBase-root fieldset": {
                border: "none !important",
              },
              "& .MuiPickersInputBase-root.Mui-focused fieldset": {
                boxShadow: themeVars.boxShadow.subtle,
                border: "none !important",
              },
              "& .MuiButtonBase-root": {
                boxShadow: "unset !important",
                border: "unset !important",
                cursor: "default",
              },
            },
          },
          desktopPaper: {
            elevation: 0,
            sx: {
              boxShadow: themeVars.boxShadow.strong,
              "& .MuiPickersArrowSwitcher-root": {
                gap: 0.6,
              },
              "& .MuiButtonBase-root": {
                border: "none",
                cursor: "default",
                boxShadow: "unset",
              },
              "& .MuiButtonBase-root.MuiPickersDay-root": {
                borderRadius: `${themeVars.borderRadius}px`,
              },
              "& .MuiButtonBase-root": {
                boxShadow: "unset !important",
                border: "unset !important",
                cursor: "default",
              },
            },
          },
        }}
        {...props}
      />
    </LocalizationProvider>
  )
}
export default Datepicker
