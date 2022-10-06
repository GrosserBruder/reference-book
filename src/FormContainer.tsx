import { Dialog, DialogContent } from "@mui/material";
import { FormContainerProps } from "./RefBookLayout";

export function FormContainer(props: FormContainerProps) {
  const { open, children, onClose, className } = props;

  return <Dialog
    open={open}
    onClose={onClose}
    className={className}
    fullWidth
  >
    <DialogContent>
      {children}
    </DialogContent>
  </Dialog>
}

export default FormContainer;