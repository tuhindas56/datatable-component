// import { TimePicker } from "@mui/x-date-pickers"
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"

import Input from "../Input"
// import { themeVars } from "../theme"

const Timepicker = props => (
  //   <LocalizationProvider dateAdapter={AdapterDateFns}>
  //     <TimePicker
  //       slotProps={{
  //         actionBar: {
  //           sx: {
  //             display: "none",
  //           },
  //         },
  //         desktopPaper: {
  //           elevation: 0,
  //           sx: {
  //             boxShadow: themeVars.boxShadow.strong,
  //             "& .MuiMenuItem-root": {
  //               minWidth: "unset",
  //               fontSize: themeVars.fontSize,
  //             },
  //             "& .MuiDialogActions-root": {
  //               justifyContent: "center",
  //             },
  //           },
  //         },
  //         textField: {
  //           size: "small",
  //           error: false,
  //           sx: {
  //             "& .MuiPickersInputBase-root": {
  //               fontSize: themeVars.fontSize,
  //               height: 32,
  //               width: 160,
  //               boxShadow: themeVars.boxShadow.strong,
  //               border: "none !important",
  //             },
  //             "& .MuiPickersInputBase-root fieldset": {
  //               border: "none !important",
  //             },
  //             "& .MuiPickersInputBase-root.Mui-focused fieldset": {
  //               boxShadow: themeVars.boxShadow.subtle,
  //               border: "none !important",
  //             },
  //             "& .MuiButtonBase-root": {
  //               boxShadow: "unset !important",
  //               border: "unset !important",
  //               cursor: "default",
  //             },
  //           },
  //         },
  //       }}
  //       {...props}
  //     />
  //   </LocalizationProvider>
  <Input type="time" {...props} />
)

export default Timepicker
