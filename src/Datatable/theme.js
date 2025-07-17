import { createTheme } from "@mui/material/styles"

export const themeVars = {
  borderRadius: 6,
  boxShadow: {
    subtle: "0 1px 2px 0 rgba(0,0,0,0.05)",
    strong: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
  },
  iconSize: {
    md: 14,
    lg: 20,
  },
  iconColor: {
    light: "#565656",
  },
  checkedColor: "#171717",
  hoverColor: "#f5f5f5",
  stroke: {
    dark: "#e5e5e5",
    light: "#f2f2f2",
  },
  padding: {
    sm: 4,
    md: 8,
    lg: 16,
  },
  tableCellBg: "#fff",
  rowSelectionColor: "#f7f7f7",
  fontFamily: "var(--ts-dt-font-family, Inter, system-ui)",
  fontSize: 14,
}

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
          marginBlock: `${themeVars.padding.sm}px`,
          margin: themeVars.padding.sm,
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
          boxShadow: themeVars.boxShadow.subtle,
          maxHeight: 32,
          "&.menu-open": {
            backgroundColor: themeVars.hoverColor,
          },
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          gap: themeVars.padding.sm,
          border: `1px solid ${themeVars.stroke.dark}`,
          padding: `${themeVars.padding.lg}px ${themeVars.padding.md}px`,
          cursor: "default",
          "&:hover": {
            backgroundColor: themeVars.hoverColor,
          },

          "&.ts-dt-add-sort-filter-button": {
            background: "black",
            color: "white",
            "&:hover": {
              background: "#2e2e2e",
            },
          },

          "&.ts-dt-add-sort-filter-button:disabled": {
            background: "#8b8b8b",
            color: "#f7f7f7",
          },

          "&.ts-dt-clear-filter-button": {
            width: "100%",
            maxWidth: "unset",
            cursor: "default",
          },

          "&.column-header-menu-trigger": {
            justifyContent: "space-between",
            marginLeft: `-${themeVars.padding.md / 2}px`,
            overflow: "visible",
            boxShadow: "none",
            border: "none",
          },
          "&.rows-per-page-menu-trigger": {
            justifyContent: "space-between",
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
          borderRadius: themeVars.borderRadius,
          maxWidth: "max-content",
          padding: themeVars.padding.md,
          "&.row-options-trigger svg": {
            fontSize: themeVars.iconSize.lg,
          },
          "&:not(.row-options-trigger)": {
            border: `1px solid ${themeVars.stroke.dark}`,
          },
          "&:disabled": {
            border: `1px solid ${themeVars.stroke.light}`,
            boxShadow: "none",
            color: themeVars.iconColor.light,
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
          borderRadius: themeVars.borderRadius,
          color: themeVars.stroke.dark,
          padding: 0,
          "&.Mui-checked, &.MuiCheckbox-indeterminate": {
            color: themeVars.checkedColor,
          },
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: themeVars.borderRadius,
          maxHeight: 20,
        },
        label: {
          padding: "2px 4px",
          fontWeight: 300,
          fontSize: 12,
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
          "& .MuiSvgIcon-root": {
            color: themeVars.iconColor.light,
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
          padding: themeVars.padding.sm,
        },
        paper: {
          boxShadow: themeVars.boxShadow.strong,
        },
      },
    },

    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        paper: {
          boxShadow: themeVars.boxShadow.strong,
        },
      },
    },

    MuiPopover: {
      defaultProps: {
        elevation: 0,
        sx: {
          "&:has(.bottom-anchored)": {
            transform: "translateY(4px)",
          },
          "&:has(.top-anchored)": {
            transform: "translateY(-4px)",
          },
        },
      },
      styleOverrides: {
        paper: {
          boxShadow: themeVars.boxShadow.strong,
        },
      },
    },

    MuiInput: {
      styleOverrides: {
        root: {
          fontSize: themeVars.fontSize,
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
          border: `1px solid ${themeVars.stroke.dark}`,
          borderRadius: themeVars.borderRadius,
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        root: {
          backgroundColor: themeVars.tableCellBg,
          padding: themeVars.padding.md,
          "&.expanded-table-cell": {
            paddingBlock: 0,
          },
          "&.pinned div": {
            boxShadow: themeVars.boxShadow.strong,
            color: "green",
          },
          "& div:not(:has(.column-header-menu-trigger))": {
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          },
        },
      },
    },

    MuiTableRow: {
      styleOverrides: {
        root: {
          "& .row-selected": {
            backgroundColor: themeVars.rowSelectionColor,
          },
        },
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "#ffffff",
          color: "#000000",
          boxShadow: themeVars.boxShadow.strong,
        },
        arrow: {
          color: "#ffffff",
        },
      },
    },

    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: themeVars.iconSize.md,
          transition: "transform .2s ease-out",
          "&.search-icon": {
            marginLeft: `${themeVars.padding.sm}px`,
            color: themeVars.iconColor.light,
          },
          "&.expanded": {
            transform: "rotate(90deg)",
          },
        },
      },
    },

    MuiStack: {
      styleOverrides: {
        root: {
          "&.filter-popover-container, &.sort-popover-container": {
            padding: themeVars.padding.lg,
          },
          "&.dynamic-filter-popover-container": {
            padding: themeVars.padding.lg,
          },
        },
      },
    },
  },

  shape: {
    borderRadius: themeVars.borderRadius,
  },

  typography: {
    fontFamily: themeVars.fontFamily,
    fontSize: themeVars.fontSize,
  },
})

export default theme
