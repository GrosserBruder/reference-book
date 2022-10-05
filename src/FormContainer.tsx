import { Dialog, DialogContent } from "@mui/material";
import { ReactNode } from "react";

export type FormContainerProps = {
  className?: string
  children?: ReactNode
  open: boolean,
  onClose?: () => void,
}

export function FormContainer(props: FormContainerProps) {
  const { open, children, onClose, className } = props;

  return <Dialog
    open={open}
    onClose={onClose}
    className={className}
  >
    <DialogContent>
      {children}
    </DialogContent>
  </Dialog>
}

export default FormContainer;