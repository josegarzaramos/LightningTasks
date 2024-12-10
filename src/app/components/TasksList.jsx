import { useEffect } from 'react';
import listenForTaskChanges from '../firebase/listenForTaskChanges';
import Task from './Task';

const TasksList = ({
  tasks,
  userId,
  onClick,
  removeTask,
  setTasks,
  filter,
}) => {
  useEffect(() => {
    const unsubscribe = listenForTaskChanges(userId, filter, (tasks) => {
      setTasks(tasks);
    });

    return () => unsubscribe();
  }, [userId, filter]);

  const availableTasks = tasks.map(({ id, title, description, status }) => {
    return (
      <Task
        key={id}
        id={id}
        title={title}
        description={description}
        status={status}
        onClick={onClick}
        removeTask={removeTask}
      />
    );
  });

  return (
    <ul className="flex flex-col gap-4 md:gap-6">
      {availableTasks.length === 0 ? 'No tasks' : availableTasks}
    </ul>
  );
};
export default TasksList;
