import { useEffect } from 'react';
import listenForTaskChanges from '../firebase/listenForTaskChanges';
import Task from './Task';
import NoTasksAvailable from './NoTasksAvailable';

const TasksList = ({
  tasks,
  userId,
  onClick,
  removeTask,
  onStatusChange,
  setTasks,
  filter,
  mode,
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
      mode={mode}
      onClick={onClick}
      removeTask={removeTask}
      onStatusChange={onStatusChange}
    />
  ));

  const containerTaskModeStyle =
    mode === 'compact' ? 'gap-1 md:gap-2' : 'gap-4 md:gap-6';

  return (
    <ul className={`flex flex-col ${containerTaskModeStyle}`}>
      {availableTasks.length === 0 ? (
        <NoTasksAvailable title="Looks like you don’t have any tasks yet. Create your first task to get started!" />
      ) : (
        availableTasks
      )}
    </ul>
  );
};

export default TasksList;
