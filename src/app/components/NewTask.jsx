'use client';
import { useState } from 'react';

const NewTask = ({ maxLength }) => {
  const [currentLength, setCurrentLength] = useState(0);

  function handleTextAreaChange(e) {
    if (currentLength >= maxLength) return;

    const length = e.target.value.length;
    setCurrentLength(length);
  }

  return (
    <div className="flex flex-col gap-5 h-full justify-center">
      <h1 className="font-bold text-center text-xl">Add a new task</h1>
      <div className="flex flex-col h-3/6 gap-5">
        <input
          type="text"
          name="title"
          placeholder="Title of your task"
          className="border border-gray rounded-lg px-4 py-3 font-bold focus-visible:outline focus-visible:outline-1 focus-visible:outline-blue"
          required
        />
        <textarea
          type="text"
          name="description"
          placeholder="Description (ex: Buy groceries)"
          className="border border-gray rounded-lg px-4 py-3 min-h-28 h-full resize-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-blue"
          onChange={handleTextAreaChange}
          maxLength={maxLength}
          required
        />
      </div>
      <span className="text-sm text-right pr-3 text-zinc-400">
        {currentLength}/{maxLength} characters
      </span>
      <div className="text-center">
        <button
          type="submit"
          className="bg-blue px-10 py-4 w-auto rounded-lg font-bold text-white"
        >
          Add task
        </button>
      </div>
    </div>
  );
};
export default NewTask;
