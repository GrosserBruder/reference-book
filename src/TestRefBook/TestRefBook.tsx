import { DataItem } from "@grossb/react-data-table"
import React from "react"
import {
  RefBook,
  RefBookProps,
} from "../ReferenceBook"


export type TestRefBookProps<T extends DataItem = DataItem> = RefBookProps<T>

export function TestRefBook<T extends DataItem = DataItem>(props: TestRefBookProps<T>) {
  return <RefBook
    sortable
    filterable
    selectable
    striped
    fixedTopTitle
    {...props}
  />
}

export default TestRefBook