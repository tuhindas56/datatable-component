import { useEffect, useState } from "react"
import Divider from "@mui/material/Divider"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import Slide from "@mui/material/Slide"
import Stack from "@mui/material/Stack"
import Tooltip from "@mui/material/Tooltip"
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined"
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined"
import HighlightOffIcon from "@mui/icons-material/HighlightOff"

import { themeVars } from "../theme"

const RowSelectionActions = ({
  table,
  setRowSelection,
  onSelectedRowsExport = () => {},
  onSelectedRowsDelete = () => {},
}) => {
  const [open, setOpen] = useState(false)
  const [lastCount, setLastCount] = useState(0)

  const length = table.getSelectedRowModel().rows.length

  const resetRowSelection = () => setRowSelection({})

  useEffect(() => {
    if (length > 0) {
      setLastCount(length)
      setOpen(true)
    } else {
      setOpen(false)
    }
  }, [length])

  return (
    <Stack position="fixed" left="50%" bottom={24} zIndex={1300} sx={{ transform: "translateX(-50%)" }}>
      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        <Stack
          direction="row"
          gap={1}
          alignItems="center"
          justifyContent="space-between"
          sx={{
            borderRadius: themeVars.borderRadius / 2,
            background: "white",
            padding: `${themeVars.padding.md}px`,
            boxShadow: themeVars.boxShadow.strong,
            width: "max-content",
          }}
        >
          <Stack direction="row" gap={1} alignItems="center">
            <Tooltip title="Clear selection" arrow>
              <Button onClick={resetRowSelection} sx={{ fontWeight: 400, fontSize: 12 }}>
                {lastCount} row(s) selected
                <Divider orientation="vertical" variant="middle" sx={{ height: 14 }} />
                <HighlightOffIcon sx={{ fontSize: 14 }} />
              </Button>
            </Tooltip>
          </Stack>
          <Divider orientation="vertical" variant="middle" sx={{ height: 24 }} />
          <Stack direction="row" gap={1}>
            <Tooltip title="Export selected rows" arrow>
              <IconButton onClick={onSelectedRowsExport} sx={{ padding: "6px" }}>
                <FileDownloadOutlinedIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete selected rows" arrow>
              <IconButton onClick={onSelectedRowsDelete} sx={{ padding: "6px" }}>
                <DeleteOutlinedIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </Slide>
    </Stack>
  )
}

export default RowSelectionActions
