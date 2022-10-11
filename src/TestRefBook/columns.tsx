import { Column, SORTING_ORDER } from "@grossb/react-data-table";
import { Item } from "./TableData";

export const columns: Array<Column<Item>> = [
  {
    dataField: "createdDate",
    header: 'Дата создания',
    valueGetter: (row) => new Date(row.createdDate).toLocaleString("ru-RU")
  },
  {
    dataField: "name",
    header: 'Название',
    sortComparator: (first: any, second: any) => {
      if (first.name.toLocaleLowerCase() < second.name.toLocaleLowerCase()) return -1;
      if (first.name.toLocaleLowerCase() > second.name.toLocaleLowerCase()) return 1;
      return 0;
    },
  },
  {
    dataField: "address",
    header: 'Название',
  },
  {
    dataField: "login",
    header: 'Логин',
  },
  {
    dataField: "password",
    header: 'Пароль',
    valueGetter: (row) => "********",
  },
  {
    dataField: "editCount",
    header: 'Количество редактирований',
    sortComparator: function (a, b, sortingOrder) {
      const res = Number(a.id) - Number(b.id)

      if (sortingOrder === SORTING_ORDER.DESC) {
        return res * -1
      }

      return res;
    },
    filterComparator: (row, filter) => {
      if (filter?.search === undefined) return true
      if (row.editCount === +filter.search) return true
      return false;
    },
    // filterComponent: <Filter />,
  },
  {
    dataField: "description",
    header: 'Описание',
  },
  {
    dataField: "isDeleted",
    header: 'Удален',
    valueGetter: (row) => row.isDeleted ? "Да" : "Нет"
  },
]
