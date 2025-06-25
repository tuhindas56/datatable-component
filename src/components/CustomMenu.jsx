import { useId, useState } from "react"
import { Button, Checkbox, Divider, Input, Menu, MenuItem, Stack } from "@mui/material"
import { Search } from "react-feather"

const MENU_ITEM_PADDING = "6px 8px"
const MIN_MENU_WIDTH = 100

const baseButtonStyles = {
  backgroundColor: "transparent",
  borderRadius: "var(--ts-dt-radius)",
  textTransform: "none",
  fontFamily: "system-ui",
  gap: "4px",
  outline: "var(--ts-dt-stroke)",
  cursor: "default",
  "*": { color: "#000" },
  "&:hover, &[aria-expanded='true']": {
    backgroundColor: "var(--ts-dt-alt-hover)",
  },
}

const baseMenuStyles = {
  "*": {
    fontSize: 14,
    fontFamily: "system-ui",
    color: "#000",
  },
  "& .MuiList-root": {
    padding: "4px",
  },
  "& .MuiMenuItem-root": {
    padding: MENU_ITEM_PADDING,
    minWidth: MIN_MENU_WIDTH,
    cursor: "default",
  },
}

const menuPaperStyles = {
  elevation: 0,
  sx: {
    boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
    color: "#000",
  },
}

const CustomMenu = ({
  trigger = "Menu Button",
  options = [{ label: "Add options array" }],
  menuProps = {},
  buttonProps: { sx: buttonSx, ...buttonProps } = {},
  direction = {
    vertical: "bottom",
    horizontal: "left",
  },
  searchable = false,
  searchPlaceholder = "Search...",
}) => {
  const [search, setSearch] = useState("")
  const [anchorEl, setAnchorEl] = useState(null)

  const open = Boolean(anchorEl)
  const id = useId() // mention why this was used
  const triggerId = `dropdown-menu-trigger-${id}`

  const visibleOptions =
    searchable && search
      ? options.filter(option => option?.label?.toLowerCase().includes(search.toLowerCase()))
      : options

  const transformOrigin = {
    vertical: direction.vertical === "bottom" ? "top" : "bottom",
    horizontal: direction.horizontal,
  }

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleMenuItemClick = (e, onClick = () => {}) => {
    onClick(e)
    handleClose()
  }

  return (
    <>
      <Button
        id={triggerId}
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        size="small"
        color="#000"
        sx={{
          minWidth: "unset",
          ...baseButtonStyles,
          ...buttonSx,
        }}
        disableRipple
        {...buttonProps}
      >
        {trigger}
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: { "aria-labelledby": triggerId },
          paper: menuPaperStyles,
        }}
        anchorOrigin={direction}
        transformOrigin={transformOrigin}
        sx={baseMenuStyles}
        {...menuProps}
      >
        {searchable && (
          <div>
            <Stack direction="row" spacing={1.2} alignItems="center" useFlexGap paddingInline="8px">
              <Search size={14} color="#848484" />
              <Input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                disableUnderline
                sx={{
                  fontSize: 14,
                  fontFamily: "system-ui",
                  maxWidth: "126px",
                }}
                placeholder={searchPlaceholder}
              />
            </Stack>
            <Divider sx={{ my: 0.4 }} />
          </div>
        )}

        {visibleOptions.length > 0 ? (
          visibleOptions.map((option, index) => (
            <div key={index}>
              <MenuItem
                disableRipple
                onClick={e => handleMenuItemClick(e, option?.onClick)}
                disabled={option?.disabled}
              >
                <Stack direction="row" spacing={1} alignItems="center" useFlexGap>
                  {option?.toggleable && (
                    <Checkbox
                      checked={option?.checked || false}
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 14 }, padding: "2px 0 0 0 ", margin: 0 }}
                      disableFocusRipple
                      disableTouchRipple
                      disableRipple
                    />
                  )}
                  {option?.icon}
                  {option?.label}
                </Stack>
                {option?.endIcon && <span style={{ marginLeft: "auto" }}>{option.endIcon}</span>}
              </MenuItem>
              {option?.showDivider && <Divider />}
            </div>
          ))
        ) : (
          <MenuItem sx={{ fontSize: 14, fontFamily: "system-ui", pointerEvents: "none" }}>No matches found.</MenuItem>
        )}
      </Menu>
    </>
  )
}

export default CustomMenu
