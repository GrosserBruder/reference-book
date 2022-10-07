import { FC, ReactNode } from "react"
import classnames from "classnames"
import DefaultFormContainer from "./FormContainer"
import "./styles/RefBookLayout.scss"

export type FormContainerProps = {
  className?: string
  children?: ReactNode
  open: boolean,
  onClose?: () => void,
}

export type RefBookLayoutProps = {
  className?: string
  dataTable?: ReactNode,
  toolbar?: ReactNode
  form?: ReactNode
  formOpen?: boolean,
  onCloseForm?: () => void,
  FormContainer?: FC<FormContainerProps>
}

export default function RefBookLayout(props: RefBookLayoutProps) {
  const { form, dataTable, className, toolbar, formOpen = false, onCloseForm, FormContainer = DefaultFormContainer } = props

  return <div className={classnames("ref-book-layout", className)}>
    <div>
      {toolbar}
    </div>
    <div className="ref-book-layout__data-table">
      {dataTable}
    </div>
    <FormContainer
      className="ref-book-layout__form"
      open={formOpen}
      onClose={onCloseForm}
    >
      {form}
    </FormContainer>
  </div >
}