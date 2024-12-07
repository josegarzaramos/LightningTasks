import Task from './Task';

const TasksList = ({ tasks }) => {
  const availableTasks = tasks.map(({ id, title, description, status }) => {
    return (
      <Task
        key={id}
        id={id}
        title={title}
        description={description}
        status={status}
      />
    );
  });

  return <ul className="flex flex-col gap-4 md:gap-6">{availableTasks}</ul>;
};
export default TasksList;
