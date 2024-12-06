import Task from './Task';

const DUMMY_TASKS = [
  {
    id: 'task_0',
    title: 'Start building todo app',
    description: 'Start app as soon as possible',
    status: 'completed',
  },
  {
    id: 'task_1',
    title: 'Finish todo app',
    description: 'I need to finish this app by Thursday',
    status: 'pending',
  },
  {
    id: 'task_2',
    title: 'Deploy finished app',
    description: 'Deploy project and share link',
    status: 'pending',
  },
  {
    id: 'task_3',
    title: 'Send completion email',
    description: 'Send email when the deployed app is ready',
    status: 'pending',
  },
  {
    id: 'task_4',
    title: 'Just a looooooooooong title',
    description:
      'A looooooooooooooong description for testing purposes, the purpose is to test the capability of the task component to handle looooooooooooong descriptions',
    status: 'completed',
  },
];

const availableTasks = DUMMY_TASKS.map(({ id, title, description, status }) => {
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

const TasksList = () => {
  return <ul className="flex flex-col gap-4 md:gap-6">{availableTasks}</ul>;
};
export default TasksList;
