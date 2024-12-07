import { useState } from 'react';

const FilterDropdown = ({ onFilterChange, selected, filters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const animationClass = isOpen
    ? 'top-12 visible opacity-1'
    : 'top-3 invisible opacity-0';

  function handleStatusChange(filter) {
    onFilterChange(filter);
    setIsOpen(false);
  }

  return (
    <div className="relative block md:hidden">
      <button
        className={`flex md:hidden transition-all hover:text-blue bg-white text-blue border border-gray py-3 px-6 rounded-2xl font-bold`}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {selected}
      </button>

      <div
        className={`flex flex-row transition-all duration-300 w-auto absolute bg-blue backdrop-blur-lg right-0 p-6 mt-5 rounded items-end [&>button]:font-bold [&>button]:py-3 [&>button]:px-4 [&>button]:text-xs [&>button]:border [&>button]:rounded-lg gap-3 z-10 ${animationClass}`}
      >
        <span className="absolute w-6 h-6 bg-blue -top-2 right-7 rotate-45 rounded-[4px]" />
        {filters.map((filter) => (
          <button
            key={filter}
            className={`font-bold py-3 px-4 text-xs border rounded-lg ${
              selected === filter ? 'text-white' : 'text-light-blue'
            }`}
            onClick={() => handleStatusChange(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};
export default FilterDropdown;
