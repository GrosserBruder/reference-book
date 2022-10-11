import { DataItem, DataTable, DataTableProps, SortingColumnOrder, AllFilterData } from "@grossb/react-data-table"
import { FC, memo, useCallback, useState } from "react"
import DefaultRefBookLayout, { FormContainerProps, RefBookLayoutProps } from "./RefBookLayout"
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

export type RefBookProps<T extends DataItem = DataItem> = DataTableProps<T> & {
  Form?: FC<FormProps>
  Toolbar?: FC<ToolbarProps<T>>
  RefBookLayout?: FC<RefBookLayoutProps>
  formOpen?: boolean
  onCloseForm?: () => void,
  FormContainer?: FC<FormContainerProps>
}

const MemoDataTable = memo(DataTable) as typeof DataTable

export default function RefBook<T extends DataItem = DataItem>(props: RefBookProps<T>) {
  const {
    Form, onSortChange, onFilterChange, onCloseForm, RefBookLayout = DefaultRefBookLayout,
    onSelectChange, Toolbar, formOpen, FormContainer, ...otherProps
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

  return <div className="ref-book">
    <RefBookLayout
      formOpen={formOpen}
      onCloseForm={onCloseForm}
      FormContainer={FormContainer}
      toolbar={Toolbar
        ? <Toolbar
          selectedData={selectedData}
          filterData={filterData}
          sortingColumnOrder={sortingColumnOrder}
        />
        : undefined}
      form={Form
        ? <Form
          selectedData={selectedData}
          filterData={filterData}
          sortingColumnOrder={sortingColumnOrder}
          onClose={onCloseForm}
        /> : undefined
      }
      dataTable={
        <MemoDataTable<T>
          onSortChange={onSortChangeHandler}
          onFilterChange={onFilterChangeHandler}
          onSelectChange={onSelectChangeHandler}
          {...otherProps}
        />
      }
    />
  </div>
}