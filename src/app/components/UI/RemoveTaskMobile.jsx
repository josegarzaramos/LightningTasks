import { BsTrash3Fill } from 'react-icons/bs';

const RemoveTaskMobile = ({ onRemoveMobile }) => {
  return (
    <button
      type="button"
      className="px-10 py-3 w-auto rounded-lg font-bold text-red-400"
      onClick={onRemoveMobile}
    >
      <BsTrash3Fill size={'1.5em'} />
    </button>
  );
};
export default RemoveTaskMobile;
