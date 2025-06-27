import { createTheme } from "@mui/material/styles"

const borderRadius = 4
const iconSize = 16
const iconColor = "#666666"
const checkedColor = "#171717"
const hoverColor = "#f5f5f5"
const strokeDark = "#e5e5e5"
const strokeLight = "#f2f2f2"
const paddingSm = 4
const paddingLg = 8
const tableCellBg = "#fff"

const theme = createTheme({
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          cursor: "default",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: hoverColor,
          },
          "&.column-header-menu-trigger": {
            // marginLeft: `-${Math.floor(paddingLg / 2)}px`,
          },
          '&[data-menu-open="true"]': {
            backgroundColor: hoverColor,
          },
        },
        endIcon: {
          margin: 0,
        },
        textPrimary: {
          color: "black",
          textTransform: "none",
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius,
          padding: paddingSm,
          "&:not(.row-options-trigger)": {
            border: `1px solid ${strokeDark}`,
          },
          "&:disabled": {
            border: `1px solid ${strokeLight}`,
          },
        },
      },
    },

    MuiCheckbox: {
      defaultProps: {
        size: "small",
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          padding: 0,
          borderRadius,
          color: "#e5e5e5",

          "&.Mui-checked, &.MuiCheckbox-indeterminate": {
            color: checkedColor,
          },
        },
      },
    },

    MuiTableContainer: {
      styleOverrides: {
        root: {
          maxHeight: "480px",
          border: `1px solid ${strokeDark}`,
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: paddingLg,
          backgroundColor: tableCellBg,
          "& div": {
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          },
        },
      },
    },

    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: iconSize,
          color: iconColor,
          "& path": {
            // fill: iconColor,
          },
        },
      },
    },
  },

  shape: {
    borderRadius,
  },

  typography: {
    fontFamily: "system-ui",
    fontSize: 14,
  },
})

export default theme
