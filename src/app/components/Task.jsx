'use client';
import { useState, useCallback } from 'react';
import { LuCheck } from 'react-icons/lu';

const Task = ({ id, title, description, status }) => {
  const [isCompleted, setIsCompleted] = useState(status === 'completed');

  const handleStatusChange = useCallback(
    (e) => {
      const newStatus = e.target.checked ? 'completed' : 'pending';
      setIsCompleted(e.target.checked);

      // TODO: Add database functionality to update task status
      console.log(`Task ${id} updated to ${newStatus}`);
    },
    [id]
  );

  return (
    <li className="flex items-center p-6 md:p-8 border border-gray rounded">
      <div className="flex items-center mr-4 mb-2 relative">
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
      </div>

      <div className="flex flex-col gap-1">
        <h2 className="font-extrabold">{title}</h2>
        <p>{description}</p>
      </div>
    </li>
  );
};
export default Task;
