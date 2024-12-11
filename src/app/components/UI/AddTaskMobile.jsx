import { PiNotePencilLight } from 'react-icons/pi';

const AddTaskMobile = ({ onClick }) => {
  return (
    <div
      className="absolute bottom-24 right-8 bg-blue p-4 rounded-lg text-white lg:hidden"
      onClick={onClick}
    >
      <PiNotePencilLight size={'2.2rem'} />
    </div>
  );
};
export default AddTaskMobile;
