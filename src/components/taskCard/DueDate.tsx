import React from 'react';
import { Tooltip } from 'react-tooltip';
import { ToDoValueProps } from '../../libs/types';

interface DueDateProps{
    task: ToDoValueProps;
};

const DueDate: React.FC<DueDateProps> = ({task}) => {
  
  const currentDate = new Date();  
  const DueDate = new Date(task.taskDueDate);  
  const diffMillisecond = DueDate.getTime() - currentDate.getTime();  
  const diffDate = diffMillisecond / (1000 * 60 * 60 * 24);

  const tooltipStyles: Record<string, { backgroundColor: string; color: string; }> = {
    dark: {
      backgroundColor: '#334155',
      color: '#fff',
    },
    default: {
      backgroundColor: '#334155',
      color: '#fff',
    },
  };

  return (
    <>
        <span className='due-date-container'>
    <span className={`${Number(diffDate.toFixed(0)) > 6 ? "hidden" : Number(diffDate.toFixed(0)) > 3 ? "diffGreaterThanThree" : Number(diffDate.toFixed(0)) < 0 ? "diffLessThanZero" : "diffGreaterThanZero"}`} 
          data-tip={true}
          data-tooltip-id='dueDateTooltip' 
          data-tooltip-html={Number(diffDate.toFixed(0)) > 6
              ? `Due in more than 6 days (${task.taskDueDate})`
              : Number(diffDate.toFixed(0)) > 3
              ? `Due within (${diffDate.toFixed(0)}) days (${task.taskDueDate})`
              : Number(diffDate.toFixed(0)) < 0
              ? `Overdue by (${Math.abs(Number(diffDate.toFixed(0)))}) days (${task.taskDueDate})`
              : `Due within (${diffDate.toFixed(0)}) days (${task.taskDueDate})`}>
        Due
    </span>
    <Tooltip id='dueDateTooltip' place='top' style={tooltipStyles["dark" || 'default']}>                
    </Tooltip>
</span>
    </>
  );
};

export default DueDate;
