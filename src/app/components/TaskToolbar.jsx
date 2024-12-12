'use client';
import FilterButton from './FilterButton';
import { CiFilter, CiCircleList, CiGrid2H } from 'react-icons/ci';
import FilterDropdown from './UI/FilterDropdown';
import TaskToolbarHeader from './TaskToolbarHeader';
import { useState } from 'react';

const TaskToolbar = ({ selected, onFilterChange, onModeChange }) => {
  const filters = ['All', 'Pending', 'Completed'];
  const [selectedTaskModeIcon, setSelectedTaskModeIcon] = useState('default');

  function handleFilterChange(filter) {
    onFilterChange(filter);
  }

  function handleDefaultMode() {
    onModeChange('default');
    setSelectedTaskModeIcon('default');
  }

  function handleCompactMode() {
    onModeChange('compact');
    setSelectedTaskModeIcon('compact');
  }

  return (
    <div className="flex flex-col items-center justify-between md:justify-between p-3 gap-4 lg:gap-4">
      <TaskToolbarHeader />
      <div className="flex flex-row items-center justify-between md:justify-between pb-3 w-full">
        <div className="flex gap-1">
          <button onClick={handleDefaultMode}>
            <CiGrid2H
              size={'1.75rem'}
              className={
                selectedTaskModeIcon == 'default' ? 'fill-blue' : 'fill-shadow'
              }
            />
          </button>

          <button onClick={handleCompactMode}>
            <CiCircleList
              size={'1.75rem'}
              className={
                selectedTaskModeIcon == 'compact' ? 'fill-blue' : 'fill-shadow'
              }
            />
          </button>
        </div>

        <div className="flex gap-3 items-center md:flex">
          <CiFilter size={'1.75rem'} className="fill-blue" />
          <div className="hidden md:flex [&>button]:py-3 [&>button]:px-6 bg-cloud-gray rounded-lg [&>button]:rounded-lg [&>button]:font-bold">
            {filters.map((filter) => (
              <FilterButton
                key={filter}
                label={filter}
                isSelected={selected === filter}
                onClick={handleFilterChange}
              />
            ))}
          </div>
          <FilterDropdown
            onFilterChange={handleFilterChange}
            selected={selected}
            filters={filters}
          />
        </div>
      </div>
    </div>
  );
};
export default TaskToolbar;
