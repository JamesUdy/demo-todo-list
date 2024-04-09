import React from 'react';
import { progressStatus } from './ProgressStatus';
import { useFormik } from 'formik';
import { ToDoValueProps } from '../../libs/types';
import { Listbox } from '@headlessui/react';
import "./FormListBox.scss"

interface ToDoStatusProps {
  formikForm: ReturnType<typeof useFormik<ToDoValueProps>>,
  showComplete: boolean,
};

const ToDoStatus: React.FC<ToDoStatusProps> = ({ formikForm, showComplete }) => {
  return (
    <section className='listBoxContainer'>    
        <span className='listBoxContainer-title'>🔄️ Select Task Status</span>
        <Listbox value={formikForm.values.taskProgress} onChange={(value: string) => formikForm.setFieldValue('taskProgress', value)}>
          {({}) => (
            <div className='dropdown'>
              <Listbox.Button
                as="button"
                className='dropdown-menu'
              >
                {formikForm.values.taskProgress}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  />
                </svg>
              </Listbox.Button>
              <Listbox.Options
                className="dropdown-options"
              >
                {progressStatus.map((progress) => (
                   (showComplete || progress.status !== 'Completed ✅') &&
                    <Listbox.Option key={progress.id} value={progress.status}>
                        {({active, selected}) => (
                        <div
                            className={`${
                              active ? 'dropdown-active-option' : 'dropdown-inactive-option'
                            } dropdown-option`}
                        >
                            {progress.status}
                            {selected && (
                            <span
                            className={`dropdown-selected ${
                              active ? 'active' : ''
                            }`}
                          ></span>
                            )}
                        </div>
                        )}
                    </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          )}
        </Listbox>
    </section>
  );
};

export default ToDoStatus;
