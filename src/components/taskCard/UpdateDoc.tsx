import React, { Fragment } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Dialog, Transition } from '@headlessui/react';
import toast from 'react-hot-toast';
import { ToDoValueProps } from '../../libs/types';
import ToDoCategory from '../toDoForm/ToDoCategory';
import ToDoStatus from '../toDoForm/ToDoStatus';
import "./EditForm.scss"
import "../toDoForm/ToDoForm.scss"
import { useLocalStorage } from 'usehooks-ts';
import { toDoListData } from '../../api/dummyArray';

const validationSchema = Yup.object({
    taskTitle: Yup.string()
      .transform((_, originalValue) => originalValue.trim())
      .required('Please enter your task title')
      .min(2, 'Title should have at least 2 letters')
      .max(100, 'Title cannot have more than 100 letters'),
      taskDescription: Yup.string()
      .transform((_, originalValue) => originalValue.trim())
      .required('Please enter your task description')
      .min(2, 'Description should have at least 2 characters')
      .max(125, 'Description cannot have more than 125 characters'),
  });

interface UpdateDocProps {
    task: any;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const UpdateDoc: React.FC<UpdateDocProps> = ({task, isOpen, setIsOpen}) => {

  const [localStorageValue, setLocalStorageValue] = useLocalStorage(
    "ToDoLists",
    toDoListData
  )

  const formikForm = useFormik<ToDoValueProps>({
    initialValues: {
        taskId: task.taskId,
      taskTitle: task.taskTitle,
      taskDescription: task.taskDescription,
      taskPriority: task.taskPriority,
      taskProgress: task.taskProgress,
      taskCreatedAt: task.taskCreatedAt,
      taskDueDate: task.taskDueDate,
    },

    validationSchema: validationSchema,

    onSubmit:async (values, { setSubmitting }) => {
      const taskId = task.taskId;
      
        try {
          setSubmitting(true);

          await new Promise(resolve => setTimeout(resolve, 2000));

          const newData = {
            taskTitle: values.taskTitle.trim(),
            taskDescription: values.taskDescription.trim(),
            taskPriority: values.taskPriority,
            taskProgress: values.taskProgress,
            taskDueDate: values.taskDueDate,
          };

          const index = localStorageValue.findIndex((item) => item.taskId === taskId);
  
          if(index !== -1) {
            const updatedData = [...localStorageValue]; 
            updatedData[index] = {
                ...updatedData[index], 
                ...newData,
            };

            setLocalStorageValue(updatedData)
          }
          
          setIsOpen(false);

          toast.success('Task updated successfully ✅');
        } catch (error) {
            toast.error('An error occurred while updating the task');
        } finally {
          setSubmitting(false);
        }
    },
  });

  const isFormDirty = formikForm.dirty;

  return (
    <Transition appear show={isOpen} as={Fragment}>
        <Dialog className='editDialog-container' as="div" open={isOpen} onClose={() => setIsOpen(false)}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="editDialog" />
            </Transition.Child>
            <div className="fixedDialog">
                <div className="fixedDialogInnerContainer">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Dialog.Panel className="dialogPanel">
                    <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6"
                    >
                        Edit Task 📝
                    </Dialog.Title>
                    <div className="my-4">
                        <p className="text-sm text-gray-500">
                        🔄 Tailor your tasks with our seamless editing feature. Make updates, stay organized, and achieve more, effortlessly!
                        </p>
                    </div>
                    <section className='todoform-container editDialogForm hide-scrollbar'>
                    <form onSubmit={formikForm.handleSubmit} className='todo-form edit-form'>
        <section className='taskTitleContainer'>
          <label htmlFor="taskTitle">Task Title<span className="requiredContent">*</span></label>
          <div className='inputContainer'>
            <input
              id='taskTitle'
              name='taskTitle'
              onChange={formikForm.handleChange}
              onBlur={formikForm.handleBlur}
              value={formikForm.values.taskTitle}
              placeholder='E.g., Test preparation'
              autoComplete='off'
              type='text'
            />
            {formikForm.touched.taskTitle && formikForm.errors.taskTitle && (
              <p className='errorMessage'>
                {formikForm.errors.taskTitle}
              </p>
            )}
          </div>
        </section>
        <section className='taskDescriptionContainer'>
          <label htmlFor="taskDescription">Describe your task<span className="requiredContent">*</span></label>
          <div className='textAreaContainer'>
            <textarea
              id='taskDescription'
              name='taskDescription'
              onChange={formikForm.handleChange}
              onBlur={formikForm.handleBlur}
              value={formikForm.values.taskDescription}
              placeholder='E.g., Complete the book and take notes'
            ></textarea>
            {formikForm.touched.taskDescription && formikForm.errors.taskDescription && (
              <p className='errorMessage'>
                {formikForm.errors.taskDescription}
              </p>
            )}
          </div>
        </section>
        <ToDoCategory formikForm={formikForm} />
        <ToDoStatus formikForm={formikForm} showComplete={false} />
        <div className='taskDueDateContainer'>
          <label htmlFor="taskDueDate">⏰ Due Date</label>
          <input
            id='taskDueDate'
            name='taskDueDate'
            onChange={formikForm.handleChange}
            onChangeCapture={formikForm.handleChange}
            onBlur={formikForm.handleBlur}
            value={formikForm.values.taskDueDate}
            type='date'
          />
        </div>
        <div></div>
            <div className='editFormFooter'>
                <button
                                type="button"
                                className="cancelButton"
                                onClick={() => setIsOpen(false)}
                                >
                                Cancel
                                </button>
                                <button type='submit'disabled={!isFormDirty || formikForm.isSubmitting} className={`${!isFormDirty ? 'cursor-not-allowed' : 'cursor-pointer'} py-1 px-2 sm:py-2 sm:px-3 text-md font-bold bg-blue-500 text-slate-100 dark:text-slate-950 rounded-md shadow-lg shadow-slate-900 hover:scale-105 ease-in duration-200`}>{formikForm.isSubmitting ? (
                                <div className="dark-submission-button-loader"></div>
                                ) : (
                                <span>Save</span>
                                )}</button>
                            </div>
      </form>
                        </section>
                    </Dialog.Panel>
                </Transition.Child>
                </div>
            </div>
        </Dialog>
    </Transition>
  );
};

export default UpdateDoc;
