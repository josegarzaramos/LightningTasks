'use client';
import { useState } from 'react';
import { LuCheck, LuTrash } from 'react-icons/lu';

const Task = ({
  id,
  title,
  description,
  status,
  onClick,
  removeTask,
  onStatusChange,
}) => {
  const [isCompleted, setIsCompleted] = useState(status === 'completed');

  const handleStatusChange = (e) => {
    const newStatus = e.target.checked ? 'completed' : 'pending';
    setIsCompleted(e.target.checked);
    onStatusChange(id, newStatus);
  };

  return (
    <li
      className="flex items-center p-6 md:p-8 border border-gray rounded justify-between hover:border-blue transition-all duration-300 hover:cursor-pointer"
      onClick={(e) => onClick(id, title, description, status, e)}
    >
      <div className="flex items-center mr-4 mb-2 relative gap-2 md:gap-4">
        <input
          type="checkbox"
          id={id}
          name={id}
          value={status}
          className="opacity-0 absolute cursor-pointer"
          checked={isCompleted}
          onChange={handleStatusChange}
        />
        <div className="bg-white border rounded-xl border-blue w-8 h-8 md:w-10 md:h-10 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue">
          <LuCheck className="hidden text-blue" size={'1.4em'} />
        </div>
        <label
          htmlFor={id}
          className="select-none absolute pl-8 pr-7 md:pl-10 md:pr-7 py-10 -left-3 cursor-pointer"
        />
        <div className="flex flex-col gap-1">
          <h2 className="font-extrabold">{title}</h2>
          <p>{description}</p>
        </div>
      </div>

      <div className="hidden md:flex text-slate-400 px-2 gap-2 [&>div]:p-4">
        <button onClick={() => removeTask(id)}>
          <LuTrash size={'1.25em'} className="hover:text-blue" />
        </button>
      </div>
    </li>
  );
};
export default Task;
