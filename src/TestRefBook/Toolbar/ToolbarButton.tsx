import Chip, { ChipProps } from "@mui/material/Chip"
import "./styles/ToolbarButton.scss"
// import classnames from "classnames"

export type ToolbarButtonProps = Omit<ChipProps, "clickable"> & {
  show?: boolean,
}

export function ToolbarButton({ show = true, ...props }: ToolbarButtonProps) {
  // const className = classnames("refbook-toolbar-button", props.className, {
  //   "refbook-toolbar-button --showing": show,
  // })

  if (!show) return <></>

  return <Chip
    variant="outlined"
    color="primary"
    size="small"
    {...props}
    // className={className}
    clickable
  />
}

export default ToolbarButton