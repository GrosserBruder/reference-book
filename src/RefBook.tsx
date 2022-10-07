import { DataItem, DataTable, DataTableProps, SortingColumnOrder, AllFilterData } from "@grossb/react-data-table"
import { memo, ReactNode, useCallback, useMemo, useState } from "react"
import RefBookLayout, { RefBookLayoutProps } from "./RefBookLayout"
import "./styles/RefBook.scss"

export type FormProps = {
  selectedData: DataItem[]
  filterData?: AllFilterData
  sortingColumnOrder?: any
  onClose?: () => void
}

export type ToolbarProps<T extends DataItem = DataItem> = {
  selectedData: T[];
  filterData?: AllFilterData;
  sortingColumnOrder?: any;
}

export type Toolbar<T extends DataItem = DataItem> = (props: ToolbarProps<T>) => ReactNode
export type RefBookForm = (props: FormProps) => ReactNode

export type RefBookProps<T extends DataItem = DataItem> = DataTableProps<T> & Pick<RefBookLayoutProps, "FormContainer"> & {
  form?: RefBookForm
  toolbar?: Toolbar<T>
  formOpen?: boolean
  onCloseForm?: () => void,
}

const MemoDataTable = memo(DataTable) as typeof DataTable

export default function RefBook<T extends DataItem = DataItem>(props: RefBookProps<T>) {
  const {
    form, onSortChange, onFilterChange, onCloseForm, FormContainer,
    onSelectChange, toolbar, formOpen, ...otherProps
  } = props;

  const [sortingColumnOrder, setSortingColumnOrder] = useState<SortingColumnOrder<T> | undefined>()
  const [filterData, setFilterData] = useState<AllFilterData | undefined>()
  const [selectedData, setSelectedData] = useState<Array<T>>([])

  const onSortChangeHandler = useCallback((sortingColumnOrder?: SortingColumnOrder<T>) => {
    setSortingColumnOrder(sortingColumnOrder)
    onSortChange?.(sortingColumnOrder)
  }, [onSortChange])

  const onFilterChangeHandler = useCallback((filterData?: AllFilterData) => {
    setFilterData(filterData)
    onFilterChange?.(filterData)
  }, [onFilterChange])

  const onSelectChangeHandler = useCallback((selectedItems: Array<T>) => {
    setSelectedData(selectedItems)
    onSelectChange?.(selectedItems)
  }, [onSelectChange])

  const memoToolbar = useMemo(() => {
    const props: ToolbarProps<T> = {
      selectedData,
      filterData,
      sortingColumnOrder,
    }
    return toolbar?.(props)
  }, [
    toolbar,
    selectedData,
    filterData,
    sortingColumnOrder
  ])

  const memoForm = useMemo(() => {
    const props: FormProps = {
      selectedData,
      filterData,
      sortingColumnOrder,
      onClose: onCloseForm,
    }

    return form?.(props)
  }, [
    form,
    onCloseForm,
    selectedData,
    filterData,
    sortingColumnOrder
  ])

  return <RefBookLayout
    className="ref-book"
    toolbar={memoToolbar}
    form={memoForm}
    formOpen={formOpen}
    onCloseForm={onCloseForm}
    FormContainer={FormContainer}
    dataTable={
      <MemoDataTable<T>
        fixedTopTitle
        sortable
        onSortChange={onSortChangeHandler}
        onFilterChange={onFilterChangeHandler}
        onSelectChange={onSelectChangeHandler}
        {...otherProps}
      />
    }
  />
}