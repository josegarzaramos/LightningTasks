'use client';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TaskEditor = ({
  id,
  title = '',
  description = '',
  mode,
  maxLength,
  changed,
  addTask,
  userId,
  onCancel,
  onSave,
}) => {
  const [inputValue, setInputValue] = useState(title);
  const [textareaValue, setTextareaValue] = useState(description);
  const [isTextChanged, setIsTextChanged] = useState(changed);

  useEffect(() => {
    if (inputValue !== title) setInputValue(title);
    if (textareaValue !== description) setTextareaValue(description);
    if (inputValue || isTextChanged) {
      setIsTextChanged(false);
    }
  }, [title, description]);

  useEffect(() => {
    setInputValue(title);
    setTextareaValue(description);
  }, [id]);

  function handleTitleChange(e) {
    setInputValue(e.target.value);
    setIsTextChanged(true);
  }

  function handleTextAreaChange(e) {
    if (e.target.value.length <= maxLength) {
      setTextareaValue(e.target.value);
      setIsTextChanged(e.target.value !== description);
    }
  }

  function handleSubmit() {
    const taskId = uuidv4();

    const newTask = {
      title: inputValue,
      description: textareaValue,
      status: 'pending',
    };

    addTask(userId, taskId, newTask);
  }

  function handleSaveClick() {
    onSave(id, { title: inputValue, description: textareaValue });
  }

  return (
    <div className="flex flex-col gap-5 lg:w-full h-full justify-center  lg:relative">
      <h1 className="font-bold text-center text-xl">
        {mode === 'edit' ? 'Edit Task' : 'Add a New Task'}
      </h1>
      <div className="flex flex-col h-3/6 gap-5">
        <input
          type="text"
          name="title"
          placeholder="Title of your task"
          className="border border-gray rounded-lg px-4 py-3 font-bold focus-visible:outline focus-visible:outline-1 focus-visible:outline-blue"
          value={inputValue}
          onChange={handleTitleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description (ex: Buy groceries)"
          className="border border-gray rounded-lg px-4 py-3 min-h-28 h-full resize-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-blue"
          value={textareaValue}
          onChange={handleTextAreaChange}
          maxLength={maxLength}
          required
        />
      </div>
      <span className="text-sm text-right pr-3 text-zinc-400">
        {textareaValue.length}/{maxLength} characters
      </span>
      <div className="text-center flex flex-col gap-2">
        {mode !== 'edit' && (
          <button
            type="submit"
            className="bg-blue px-10 py-4 w-auto rounded-lg font-bold text-white"
            onClick={handleSubmit}
          >
            Add Task
          </button>
        )}
        {mode === 'edit' && (
          <>
            <button
              type="button"
              className={`bg-blue px-10 py-4 w-auto rounded-lg font-bold text-white ${
                !isTextChanged ? 'bg-gray disabled' : ''
              }`}
              onClick={handleSaveClick}
            >
              Save
            </button>
            <button
              type="button"
              className="border border-gray px-10 py-4 w-auto rounded-lg font-bold text-zinc-500"
              onClick={onCancel}
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskEditor;
