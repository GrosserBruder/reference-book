import { DataItem } from "@grossb/react-data-table"
import {
  RefBook,
  RefBookProps,
} from "@grossb/reference-book"


export type TestRefBookProps<T extends DataItem = DataItem> = RefBookProps<T>

export function TestRefBook<T extends DataItem = DataItem>(props: TestRefBookProps<T>) {
  return <RefBook
    sortable
    filterable
    selectable
    striped
    {...props}
  />
}

export default TestRefBook