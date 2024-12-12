'use client';
import { useReducer, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import RemoveTaskMobile from './UI/RemoveTaskMobile';
import TextInput from './UI/TextInput';
import TextareaInput from './UI/TextAreaInput';

function editorReducer(state, action) {
  switch (action.type) {
    case 'SET_TITLE':
      return { ...state, title: action.payload, isTextChanged: true };
    case 'SET_DESCRIPTION':
      return { ...state, description: action.payload, isTextChanged: true };
    case 'RESET_STATE':
      return {
        ...state,
        title: action.payload.title,
        description: action.payload.description,
        isTextChanged: false,
      };
    case 'MARK_UNCHANGED':
      return { ...state, isTextChanged: false };
    default:
      return state;
  }
}

const TaskEditor = ({
  id,
  title = '',
  description = '',
  mode,
  maxLength,
  addTask,
  userId,
  onCancel,
  onSave,
  onRemoveMobile,
}) => {
  const [state, dispatch] = useReducer(editorReducer, {
    title,
    description,
    isTextChanged: false,
  });

  useEffect(() => {
    dispatch({ type: 'RESET_STATE', payload: { title, description } });
  }, [id, title, description]);

  const handleTitleChange = (e) => {
    dispatch({ type: 'SET_TITLE', payload: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    if (e.target.value.length <= maxLength) {
      dispatch({ type: 'SET_DESCRIPTION', payload: e.target.value });
    }
  };

  const handleSubmit = () => {
    const taskId = uuidv4();
    const newTask = {
      title: state.title,
      description: state.description,
      status: 'pending',
    };
    addTask(userId, taskId, newTask);
  };

  const handleSaveClick = () => {
    onSave(id, { title: state.title, description: state.description });
  };

  const isSaveDisabled = !state.isTextChanged;

  return (
    <div className="flex flex-col gap-5 lg:w-full h-full justify-center lg:relative">
      <h1 className="font-bold text-center text-xl">
        {mode === 'edit' ? 'Edit Task' : 'Add a New Task'}
      </h1>

      <div className="flex flex-col h-3/6 gap-5">
        <TextInput
          value={state.title}
          onChange={handleTitleChange}
          placeholder="Title of your task"
          required={true}
          maxLength={50}
          fontBold={true}
        />
        <TextareaInput
          value={state.description}
          onChange={handleDescriptionChange}
          placeholder="Description (ex: Buy groceries)"
          maxLength={maxLength}
          required={true}
        />
      </div>

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
              className={`px-10 py-4 w-auto rounded-lg font-bold text-white ${
                isSaveDisabled ? 'bg-gray disabled' : 'bg-blue'
              }`}
              onClick={handleSaveClick}
              disabled={isSaveDisabled}
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
            <div>
              <RemoveTaskMobile onRemoveMobile={onRemoveMobile} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskEditor;
