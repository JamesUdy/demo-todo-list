import React, { useState } from 'react';
import { Delete, Edit } from '../../assets';
import toast from 'react-hot-toast';
import "./TaskCard.scss"
import UpdateDoc from './UpdateDoc';
import DueDate from './DueDate';
import { categories } from '../toDoForm/Categories';
import { ToDoValueProps } from '../../libs/types';
import { useLocalStorage } from 'usehooks-ts';
import { toDoListData } from '../../api/dummyArray';

export const FormatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
  
    return `${day}.${month}.${year}`;
};

const TaskCard: React.FC<{task: ToDoValueProps}> = ({task}) => {
  const formattedDate = FormatDate(task.taskCreatedAt);
  const [isOpen, setIsOpen] = useState(false);

  const [localStorageValue, setLocalStorageValue] = useLocalStorage(
    "ToDoLists",
    toDoListData
  )

  const category = categories.find(category => category.label === task.taskPriority);
  const backgroundColor = category?.colors;

  const handleDeleteTask = (taskId: number, taskProgress: string) => {
    let confirmationMessage = "❗️ Are you sure you want to permanently delete this task? This action cannot be undone.";

    switch (taskProgress) {
        case 'Yet to start ⏳':
            confirmationMessage = "⚠️ This task has not started yet. Are you sure you want to delete it?";
            break;
        case 'In Progress 🚧':
            confirmationMessage = "⚠️ This task is currently in progress. Are you sure you want to delete it?";
            break;
        case 'Completed ✅':
            confirmationMessage = "✅ This task has been completed. You can safely delete it now. Are you sure?";
            break;
        default:
            break;
    }

    const isConfirmed = window.confirm(confirmationMessage);

    if (isConfirmed) {
        const updatedData = localStorageValue.filter((item) => item.taskId !== taskId)

        setLocalStorageValue(updatedData);

        toast.success('Task successfully deleted!');
    } else {
        toast.error('Task deletion cancelled.');
    }
  };

   return (
    <section className='card' key={task.taskId}>
        <div className='card-content'>
            <div className='card-operations'>
                <span style={{background: backgroundColor}} className="tag">{task.taskPriority}</span>
                <div className='flex space-x-2'>
                    <span onClick={() => setIsOpen(true)}>
                        <Edit/>
                    </span>
                    <UpdateDoc task={task} isOpen={isOpen} setIsOpen={setIsOpen} />
                    <span onClick={() => handleDeleteTask(task.taskId, task.taskProgress)}>
                        <Delete/>
                    </span>
                </div>
            </div>
            <div className='card-body'>
                <div>
                    <span className={`card-title ${task.taskProgress === 'Completed ✅' ? 'completed' : ''}`}>{task.taskTitle}</span>
                    <span className={`task-progress-dot ${task.taskProgress === 'In Progress 🚧' ? 'in-progress' : task.taskProgress === 'Completed ✅' ? 'completed' : 'yet-to-start'}`}></span>
                </div>
                <span className='card-description'>{task.taskDescription}</span>
            </div>
        </div>
        <div className='card-footer'>
            {task.taskDueDate && <DueDate task={task} />}
            <span className='date'>{formattedDate}</span>
        </div>
    </section>
  );
};

export default TaskCard;
