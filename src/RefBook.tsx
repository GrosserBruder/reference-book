import { DataItem, DataTable, DataTableProps, SortingColumnOrder, AllFilterData } from "@grossb/react-data-table"
import { memo, ReactNode, useCallback, useMemo, useState } from "react"
import RefBookLayout from "./RefBookLayout"

export type FormProps = {
  selectedData: DataItem[]
  filterData?: AllFilterData
  sortingColumnOrder?: SortingColumnOrder
  onClose?: () => void
}

export type ToolbarProps = {
  selectedData: DataItem[];
  filterData?: AllFilterData;
  sortingColumnOrder?: SortingColumnOrder;
}

export type Toolbar = (props: ToolbarProps) => ReactNode
export type RefBookForm = (props: FormProps) => ReactNode

export type RefBookProps = DataTableProps & {
  form?: RefBookForm
  toolbar?: Toolbar
  formOpen?: boolean
  onCloseForm?: () => void,
}

const MemoDataTable = memo(DataTable)

export default function RefBook(props: RefBookProps) {
  const {
    form, onSortChange, onFilterChange, onCloseForm,
    onSelectChange, toolbar, formOpen, ...otherProps
  } = props;

  const [sortingColumnOrder, setSortingColumnOrder] = useState<SortingColumnOrder | undefined>()
  const [filterData, setFilterData] = useState<AllFilterData | undefined>()
  const [selectedData, setSelectedData] = useState<Array<DataItem>>([])

  const onSortChangeHandler = useCallback((sortingColumnOrder?: SortingColumnOrder) => {
    setSortingColumnOrder(sortingColumnOrder)
    onSortChange?.(sortingColumnOrder)
  }, [onSortChange])

  const onFilterChangeHandler = useCallback((filterData?: AllFilterData) => {
    setFilterData(filterData)
    onFilterChange?.(filterData)
  }, [onFilterChange])

  const onSelectChangeHandler = useCallback((selectedItems: Array<DataItem>) => {
    setSelectedData(selectedItems)
    onSelectChange?.(selectedItems)
  }, [onSelectChange])

  const memoToolbar = useMemo(() => {
    const props: ToolbarProps = {
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
    dataTable={
      <MemoDataTable
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