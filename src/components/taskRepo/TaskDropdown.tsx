import { ChangeEvent, useState } from 'react';
import { DownArrow, UpArrow } from '../../assets';
import "./TaskDropdown.scss"

type Props = {
  selectedKeys: string[],
  setSelectedKeys: (selectedKeys: string[]) => void,
  selectField: any[]
}

const TaskDropdown = ({ selectedKeys, setSelectedKeys, selectField }: Props) => {
  const isCategory = selectField.some((item: any) => 'label' in item);

  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false)

  const handleSelectionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
    const updatedData = [selectedOptions[0], ...selectedKeys]
    setSelectedKeys(updatedData);
  };

  const toggleDropDown = () => {
    setIsDropDownOpen((prevState) => !prevState)
  }

  return (
    <section className='dropdown-section'>
      <div className='dropdown-title' onClick={toggleDropDown}><span>{isCategory ? 'Category' : 'Progress'}</span>
          {isDropDownOpen ? <UpArrow /> : <DownArrow/>}</div>
      {isDropDownOpen && (
        <select className='dropdown-select hide-scrollbar' multiple onChange={handleSelectionChange} value={selectedKeys}>
        
        {selectField.map((item: any, index) => {
          const keyValue = isCategory ? item.label : item.status;
          return (
            <option className='dropdown-option' key={index} value={keyValue}>{keyValue}</option>
          );
        })}
      </select>
      )}
    </section>
  );
};

export default TaskDropdown;
