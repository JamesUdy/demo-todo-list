import { ChangeEvent, useEffect, useState } from 'react';
import SearchTask from './SearchTask';
import './TaskRepositories.scss';
import { Toaster } from 'react-hot-toast';
import TaskRepoHeader from './TaskRepoHeader';
import { toDoListData } from '../../api/dummyArray';
import TaskCard from '../taskCard/TaskCard';
import { categories } from '../toDoForm/Categories';
import { progressStatus } from '../toDoForm/ProgressStatus';
import { ClearKeywordTask } from '../../assets';
import { useLocalStorage } from 'usehooks-ts';
import TaskDropdown from './TaskDropdown';

const TaskRepositories = () => {
  const [localStorageValue, setLocalStorageValue] = useLocalStorage(
    "ToDoLists",
    toDoListData
  );
  const [keyword, setKeyword] = useState<string>('');
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const handleKeywordChanges = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const clearKeyword = () => {
    setKeyword('');
  };
  
  const clearSelectedKey = (item: string) => {
    const updatedSelectedKeys = selectedKeys.filter(key => key !== item);
    setSelectedKeys(updatedSelectedKeys);
  };

  const filteredTasks = localStorageValue.filter(task => {
    const matchesKeyword = task.taskTitle.toLowerCase().includes(keyword.toLowerCase());

    const prioritySelected = selectedKeys.includes(task.taskPriority);
    const progressSelected = selectedKeys.includes(task.taskProgress);

    const matchesSelectedKeys =
      selectedKeys.length === 0 ||
      (prioritySelected && progressSelected) ||
      (!prioritySelected && progressSelected) ||
      (prioritySelected && !progressSelected);

    return matchesKeyword && matchesSelectedKeys;
  });

  useEffect(() => {
    console.log(selectedKeys);
  }, [selectedKeys]);

  return (
    <section className='taskrepo-container'>
      <Toaster toastOptions={{
        className: '', 
        style: {
          marginTop: '32px',
        }
      }} position="bottom-right" />
      <TaskRepoHeader />
      <SearchTask keyword={keyword} handleKeywordChanges={handleKeywordChanges} clearKeyword={clearKeyword} />
      {selectedKeys !== null && (
        <section className='selectedKeys-container'>
          <div className='selectedKeys'>
            {selectedKeys && selectedKeys.map((item, index) => (
              <span key={index} className='selectedKey' onClick={() => clearSelectedKey(item)}>
                <span>{item}</span>
                <div className='cursor-pointer' >
                  <ClearKeywordTask/>
                </div>
              </span>
            ))}
          </div>
        </section>
      )}
      <section className='taskDropdownContainer'>
        <TaskDropdown selectedKeys={selectedKeys} setSelectedKeys={setSelectedKeys} selectField={categories} />
        <TaskDropdown selectedKeys={selectedKeys} setSelectedKeys={setSelectedKeys} selectField={progressStatus} />
      </section>
      <section className={`taskCollection overflow-y-scroll scroll-bar`}>
        <div className='tasksContainer'>
          {filteredTasks.length > 0 ? (
            <div className='tasks'>
              {filteredTasks.map((task) => (
                <TaskCard key={task.taskId} task={task} />
              ))}
            </div>
          ) : (
            <p>No tasks found</p>
          )}
        </div>
      </section>
    </section>
  );
};

export default TaskRepositories;
