import { Drawer } from "@mui/material";
import classnames from "classnames";
import { FormContainerProps } from "./RefBookLayout";
import "./styles/ModalFormContainer.scss"

export function ModalFormContainer(props: FormContainerProps) {
  const { open, children, onClose, className } = props;

  return <Drawer
    anchor="right"
    open={open}
    onClose={onClose}
    className={classnames("modal-form-container", className)}
  >
    {children}
  </Drawer>
}

export default ModalFormContainer;