'use client';
import { Nunito } from 'next/font/google';
import TasksList from './components/TasksList';
import TaskToolbar from './components/TaskToolbar';
import NewTask from './components/NewTask';
import { useEffect, useState } from 'react';

const nunito = Nunito({
  weight: ['400', '800'],
  subsets: ['latin'],
});

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

export default function Home() {
  const [tasks, setTasks] = useState(DUMMY_TASKS);
  const [selectedFilter, setSelectedFilter] = useState('All');

  useEffect(() => {
    const filteredTasks = DUMMY_TASKS.filter((task) => {
      if (selectedFilter === 'All') {
        return true;
      }
      return task.status === selectedFilter.toLowerCase();
    });
    setTasks(filteredTasks);
  }, [selectedFilter]);

  function handleFilterChange(filter) {
    setSelectedFilter(filter);
  }

  return (
    <main className={nunito.className}>
      <div className="grid grid-cols-1 lg:grid-cols-main h-full p-4 md:p-10 gap-4 md:gap-10 [&>div]:bg-white [&>div]:rounded [&>div]:p-4 md:[&>div]:p-10">
        <div className="hidden lg:block">
          <NewTask maxLength={250} />
        </div>
        <div className="overflow-auto">
          <TaskToolbar onFilterChange={handleFilterChange} />
          <TasksList tasks={tasks} />
        </div>
      </div>
    </main>
  );
}
