import { useEffect } from 'react';
import listenForTaskChanges from '../firebase/listenForTaskChanges';
import Task from './Task';

const TasksList = ({
  tasks,
  userId,
  onClick,
  removeTask,
  onStatusChange,
  setTasks,
  filter,
}) => {
  useEffect(() => {
    const formattedFilter = filter.toLowerCase();
    const unsubscribe = listenForTaskChanges(userId, formattedFilter, setTasks);

    return () => unsubscribe();
  }, [filter, setTasks, userId]);

  if (!tasks) {
    return <div>Loading...</div>;
  }

  const availableTasks = tasks.map(({ id, title, description, status }) => (
    <Task
      key={id}
      id={id}
      title={title}
      description={description}
      status={status}
      onClick={onClick}
      removeTask={removeTask}
      onStatusChange={onStatusChange}
    />
  ));

  return (
    <ul className="flex flex-col gap-4 md:gap-6">
      {availableTasks.length === 0 ? 'No tasks' : availableTasks}
    </ul>
  );
};

export default TasksList;
