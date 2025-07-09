import * as React from "react"

import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"

interface ConfirmDialogProps {
  title: string
  text: string
  isOpen: boolean
  onCancel: () => void
  onOk: () => void
}

export const ConfirmDialog = ({ title, text, isOpen, onCancel, onOk }: ConfirmDialogProps) => {
  return (
    <Dialog open={isOpen} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Отмена</Button>
        <Button onClick={onOk} autoFocus>
          Подтвердить
        </Button>
      </DialogActions>
    </Dialog>
  )
}
