import { createTheme } from "@mui/material/styles"

const theme = createTheme({
  custom: {
    iconSize: "14px",
    activeBackground: "#f5f5f5",
  },

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
          styles: {
            borderRadius: "4px",
          },
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
        },
      },
    },

    MuiMenu: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        list: {
          padding: "4px",
        },
        paper: {
          boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
        },
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          padding: "6px 8px",
          minWidth: "100px",
          cursor: "default",
        },
      },
    },
  },

  shape: {
    borderRadius: "4px",
  },

  typography: {
    fontFamily: "system-ui",
    fontSize: 14,
  },
})

export default theme
