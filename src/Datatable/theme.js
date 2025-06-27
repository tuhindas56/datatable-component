import { createTheme } from "@mui/material/styles"

const borderRadius = 4
const boxShadowSubtle = "0 1px 2px 0 rgba(0,0,0,0.05)"
const boxShadowStrong = "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px"
const iconSizeSm = 12
const iconSizeMd = 16
const iconSizeLg = 20
const iconColorLight = "#999999"
const checkedColor = "#171717"
const hoverColor = "#f5f5f5"
const strokeDark = "#e5e5e5"
const strokeLight = "#f2f2f2"
const paddingSm = 4
const paddingMd = 8
const tableCellBg = "#fff"

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    text: {
      primary: "#000000",
    },
  },

  components: {
    MuiDivider: {
      styleOverrides: {
        root: {
          marginBlock: "4px",
        },
      },
    },

    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          cursor: "default",
          boxShadow: boxShadowSubtle,
          maxHeight: 32,
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          gap: "8px",
          border: `1px solid ${strokeDark}`,
          "&:hover": {
            backgroundColor: hoverColor,
          },

          "&.column-header-menu-trigger": {
            marginLeft: `-${paddingMd / 2}px`,
            overflow: "visible",
            boxShadow: "none",
            border: "none",
          },
          "&.rows-per-page-menu-trigger": {
            justifyContent: "space-between",
            height: "auto",
          },
          "&.menu-open": {
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
          "&.pagination-trigger": {
            padding: paddingMd,
          },
          "&.row-options-trigger svg": {
            fontSize: iconSizeLg,
          },
          "&:not(.row-options-trigger)": {
            border: `1px solid ${strokeDark}`,
          },
          "&:disabled": {
            border: `1px solid ${strokeLight}`,
          },
          "&:disabled svg": {
            color: iconColorLight,
          },
        },
      },
    },

    MuiCheckbox: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          borderRadius,
          color: "#e5e5e5",
          padding: 0,
          "& svg": {
            fontSize: iconSizeLg,
          },
          "&.Mui-checked, &.MuiCheckbox-indeterminate": {
            color: checkedColor,
          },
        },
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          minWidth: 100,
          padding: "6px 8px",
          "& .end-icon": {
            marginLeft: "auto",
          },
        },
      },
    },

    MuiMenu: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        list: {
          padding: paddingSm,
        },
        paper: {
          boxShadow: boxShadowStrong,
        },
      },
    },

    MuiInput: {
      styleOverrides: {
        root: {
          fontSize: 14,
          color: "black",
          "&.menu-search-bar": {
            width: "126px",
          },
        },
      },
    },

    MuiTableContainer: {
      styleOverrides: {
        root: {
          maxHeight: "480px",
          border: `1px solid ${strokeDark}`,
          borderRadius,
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: paddingMd,
          backgroundColor: tableCellBg,
          "& div:not(:has(.column-header-menu-trigger))": {
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
          fontSize: iconSizeMd,
          "&.search-icon": {
            marginLeft: "4px",
            color: iconColorLight,
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
