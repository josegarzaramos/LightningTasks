import { LuListX } from 'react-icons/lu';

const NoTasksAvailable = ({ title }) => {
  return (
    <div className="flex flex-col text-blue items-center">
      <LuListX size={'2.75rem'} className="animate-pulse" />
      <p className="text-bold text-center">{title}</p>
    </div>
  );
};
export default NoTasksAvailable;
