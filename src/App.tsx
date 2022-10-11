import { useCallback, useState } from 'react';
import Form from './TestRefBook/Form/Form';
import { FORM_STATUS } from './TestRefBook/constants/const';
import { useFormApi } from './TestRefBook/hooks';
import TestRefBook from './TestRefBook/TestRefBook';
import { Toolbar } from './TestRefBook/Toolbar';
import { columns } from './TestRefBook/columns';
import { getDataFormTable, Item } from './TestRefBook/TableData';

function App() {
  const [data, setData] = useState<Array<any>>(getDataFormTable());
  const [selectedItem, setSelectedItem] = useState<Item | undefined>(undefined)

  const { formStatus, closeForm, openForm } = useFormApi()

  const onRowClickHandler = useCallback((event: any, dataItem: Item) => {
    setSelectedItem(dataItem)
    openForm(FORM_STATUS.UPDATE)
  }, [setSelectedItem, openForm])

  const onCloseFormHandler = useCallback(() => {
    closeForm()
    setSelectedItem(undefined)
  }, [closeForm])

  const onToolbarCreateClick = useCallback(() => {
    openForm(FORM_STATUS.CREATE)
  }, [openForm])

  const onToolbarUpdateClick = useCallback((event: any, selectedData: Array<Item>) => {
    const firstOrUndefined = selectedData.length > 0 ? selectedData[0] : undefined

    setSelectedItem(firstOrUndefined)
    openForm(FORM_STATUS.UPDATE)
  }, [openForm])

  const onToolbarDeleteClick = useCallback(() => {
    openForm(FORM_STATUS.DELETE)
  }, [openForm])

  const onSubmit = useCallback((data: any) => {

    if (formStatus === FORM_STATUS.UPDATE) {
      setData((prev) => {
        const index = prev.findIndex((prevItem) => prevItem.id === data.id)
        const newArray = [...prev]
        newArray[index] = data
        return newArray
      })
      closeForm()
      return
    }
    if (formStatus === FORM_STATUS.CREATE) {
      setData((prev) => {
        const newArray = [...prev, data]
        return newArray
      })
      closeForm()
      return
    }
    //ToDO: decide on the implementation
    if (formStatus === FORM_STATUS.DELETE) {
      setData((prev) => {
        return prev.filter((prevItem) => prevItem.id !== data.id)
      })
      closeForm()
      return
    }
  }, [formStatus, closeForm])

  return (
    <div className="App">
      <TestRefBook<Item>
        data={data}
        columns={columns}
        Form={(props) => <Form
          initialValues={selectedItem}
          onSubmit={onSubmit}
          onClose={props.onClose}
        />}
        Toolbar={(props) => <Toolbar
          multipleDelete
          {...props}
          onCreateClick={onToolbarCreateClick}
          onUpdateClick={onToolbarUpdateClick}
          onDeleteClick={onToolbarDeleteClick}
        />
        }
        formOpen={formStatus !== FORM_STATUS.CLOSE}
        onRowClick={onRowClickHandler}
        onCloseForm={onCloseFormHandler}
      />
    </div>
  );
}

export default App;
