import ToDoForm from '../components/toDoForm/ToDoForm'
import EarlyStageTasks from '../components/toDoForm/EarlyStageTasks'
import { toDoListData } from '../api/dummyArray'
import { useLocalStorage } from 'usehooks-ts'

const ToDoFormPage = () => {

  const [localStorageValue, _] = useLocalStorage(
    "ToDoLists",
    toDoListData
  )
      
  return (
    <>
        <ToDoForm />
    {toDoListData.length > 0 && (
      <EarlyStageTasks taskData={localStorageValue} />
    )}
    </>
  )
}

export default ToDoFormPage