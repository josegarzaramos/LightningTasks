import { GoSignOut } from 'react-icons/go';
import { logoutUser } from '../firebase/authService';
import Image from 'next/image';

const TaskToolbarHeader = () => {
  const handleClick = async () => {
    try {
      await logoutUser();
      console.log('User logged out successfully.');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="flex px-4 pb-4 justify-between w-full relative after:border-b-[1px] after:border-shadow after:content-[''] after:w-[calc(100%-32px)] after:absolute after:left-0 after:right-0 after:bottom-0 after:m-auto">
      <Image
        src="/lightning-tasks-logo.svg"
        width={384}
        height={66}
        alt="Lightning Logo"
        className="h-auto w-32"
      />
      <div className="flex items-center font-black  gap-2">
        <button className="text-blue text-xs" onClick={handleClick}>
          Sign Out
        </button>
        <GoSignOut className="text-blue" size={'1.2rem'} />
      </div>
    </div>
  );
};
export default TaskToolbarHeader;
