const FilterButton = ({ label, isSelected, onClick }) => {
  return (
    <button
      className={`transition-all hover:text-blue ${
        isSelected
          ? 'bg-white text-blue border border-gray'
          : 'text-smoke border border-transparent'
      } py-3 px-6 rounded-lg font-bold`}
      onClick={() => onClick(label)}
    >
      {label}
    </button>
  );
};
export default FilterButton;
