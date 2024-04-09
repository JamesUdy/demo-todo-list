import { Navigate, Route, Routes } from "react-router-dom"
import ToDoFormPage from "../pages/ToDoFormPage"
import TaskRepoPage from "../pages/TaskRepoPage"

export const Routers = () => {
    return (
        <Routes>
          <Route path='/' element={<Navigate to='/todo-form' />} />
          <Route path='/todo-form' element={<ToDoFormPage />} />  
          <Route path='/task-repo' element={<TaskRepoPage />} />         
        </Routes>
      )
}