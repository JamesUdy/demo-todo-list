import { useFormik } from 'formik';
import * as Yup from 'yup';
import ToDoCategory from './ToDoCategory';
import ToDoStatus from './ToDoStatus';
import './ToDoForm.scss';
import toast, { Toaster } from 'react-hot-toast';
import { ToDoValueProps } from '../../libs/types';
import { categories } from './Categories';
import { progressStatus } from './ProgressStatus';
import { useLocalStorage } from "usehooks-ts";
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

const generateRandomId = () => {
  return Math.floor(Math.random() * 1000000); 
};

const ToDoForm = () => {
  
  const [localStorageValue, setLocalStorageValue] = useLocalStorage(
    "ToDoLists",
    toDoListData
  )

  const formikForm = useFormik<ToDoValueProps>({
    initialValues: {
      taskId: generateRandomId(),
      taskTitle: '',
      taskDescription: '',
      taskPriority: categories[0].label,
      taskProgress: progressStatus[0].status,
      taskCreatedAt: "",
      taskDueDate: '',
    },

    validationSchema: validationSchema,

    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);

        await new Promise(resolve => setTimeout(resolve, 2000));

        const newData = {
          taskId: values.taskId,
          taskTitle: values.taskTitle.trim(),
          taskDescription: values.taskDescription.trim(),
          taskPriority: values.taskPriority,
          taskProgress: values.taskProgress,
          taskCreatedAt: new Date().toLocaleDateString(),
          taskDueDate: values.taskDueDate,
        }

        const updatedData = [newData, ...localStorageValue]

        await setLocalStorageValue(updatedData)

        toast.success('Task created successfully');

        formikForm.resetForm();
      } catch (error) {
        toast.error('An error occurred while adding the task');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <section className='todoform-container'>
      <Toaster toastOptions={{ className: '', style: { marginTop: '32px' } }} position="bottom-right" />
      <span className='todoform-container-title'>🎯 Add a Quest</span>
      <form onSubmit={formikForm.handleSubmit} className='todo-form'>
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
        <button
          type='submit'
        >
          {formikForm.isSubmitting ? (
            <div className="dark-submission-button-loader"></div>
          ) : (
            <span>Add</span>
          )}
        </button>
      </form>
    </section>
  );
};

export default ToDoForm;
