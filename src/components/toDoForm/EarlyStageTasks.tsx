import React from 'react';
import TaskCard from '../taskCard/TaskCard';
import { useMediaQuery } from 'react-responsive';
import TaskLoader from '../../assets/loader/taskLoader/TaskLoader';
import { Link } from 'react-router-dom';
import { ToDoValueProps } from '../../libs/types';
 
interface EarlyStageTasksProps {
  taskData: ToDoValueProps[];
};

const EarlyStageTasks: React.FC<EarlyStageTasksProps> = ({taskData}) => {

  const isLargerScreen = useMediaQuery({
    minWidth: 1440,
  });

  const earlyStageTasks = taskData.filter(
    (    task: { taskProgress: string; }) => task.taskProgress !== "Completed ✅"
  );

  const displayTasks = isLargerScreen ? earlyStageTasks.slice(0, 3) : earlyStageTasks.slice(0, 4);

  return (
    <section className='recentTaskContainer'>
        <span className='recentTaskContainer-title'>🌱 In the Pipeline: Early Stage Tasks</span>
        {displayTasks ? (
          <section className='recentTasks'>
          {displayTasks.map((task: ToDoValueProps) => (
            <TaskCard key={task.taskId} task={task} />
          ))}
          </section>
        )  : (
            <TaskLoader/>
            ) 
        }
        <Link to='/task-repo'>
            <button className='recentTaskContainer-button'>🗂️ Task Repository</button>
        </Link>
    </section>
  );
};

export default EarlyStageTasks;
