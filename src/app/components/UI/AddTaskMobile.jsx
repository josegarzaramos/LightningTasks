import { PiNotePencilLight } from 'react-icons/pi';

const AddTaskMobile = ({ onClick }) => {
  return (
    <div
      className="absolute bottom-1/3 right-4 md:right-10 bg-blue p-4 rounded-[18px_4px_4px_18px] text-white lg:hidden"
      onClick={onClick}
    >
      <PiNotePencilLight size={'2.2rem'} className="animate-pulse" />
    </div>
  );
};
export default AddTaskMobile;
