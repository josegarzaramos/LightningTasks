'use client';
import FilterButton from './FilterButton';
import { CiFilter, CiCircleList, CiGrid2H } from 'react-icons/ci';
import FilterDropdown from './UI/FilterDropdown';

const TaskToolbar = ({ onFilterChange, selected }) => {
  const filters = ['All', 'Pending', 'Completed'];

  function handleFilterChange(filter) {
    onFilterChange(filter);
  }

  return (
    <div className="flex flex-row items-center justify-between md:justify-between pb-3 mb-3">
      <div className="flex">
        <CiGrid2H size={'1.5em'} className="fill-blue" />
        <CiCircleList size={'1.5em'} className="fill-shadow" />
      </div>

      <div className="flex gap-3 items-center md:flex">
        <CiFilter size={'1.5em'} className="fill-blue" />
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
  );
};
export default TaskToolbar;
