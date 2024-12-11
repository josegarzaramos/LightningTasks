'use client';
import { Nunito } from 'next/font/google';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from './context/AuthContext';
import { LuX } from 'react-icons/lu';
import { v4 as uuidv4 } from 'uuid';
import TaskEditor from './components/TaskEditor';
import TasksList from './components/TasksList';
import TaskToolbar from './components/TaskToolbar';

import {
  addTaskForUser,
  getTasksForUser,
  updateTaskForUser,
  deleteTaskForUser,
  updateTaskStatus,
} from './firebase/taskService';

const nunito = Nunito({
  weight: ['400', '800'],
  subsets: ['latin'],
});

const defaultNewTask = {
  id: uuidv4(),
  title: '',
  description: '',
  status: 'pending',
};

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [taskEditor, setTaskEditor] = useState(defaultNewTask);
  const { user, userId, loading } = useAuthContext();
  const editorContainerRef = useRef();
  const router = useRouter();

  useEffect(() => {
    const fetchTasks = async () => {
      const formattedFilter = selectedFilter.toLowerCase();

      const tasksData = await getTasksForUser(
        userId,
        formattedFilter,
        setTasks
      );
      setTasks(tasksData);
    };

    if (user) {
      fetchTasks();
    }
  }, [user, userId]);

  useEffect(() => {
    const fetchTasksWithFilter = async () => {
      const formattedFilter = selectedFilter.toLowerCase();
      const uid = user.uid;
      await getTasksForUser(uid, formattedFilter, setTasks);
    };

    if (user) {
      fetchTasksWithFilter();
    }
  }, [selectedFilter]);

  function handleFilterChange(filter) {
    setSelectedFilter(filter);
  }

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (!user) {
    return;
  }

  function adjustTaskEditorForMobile() {
    if (window.innerWidth < 1024) {
      editorContainerRef.current.classList.toggle('-translate-x-[120%]');
      editorContainerRef.current.classList.toggle('lg:translate-x-0');
    }
  }

  const handleTaskClick = (id, title, description, status, event) => {
    if (event.target.tagName === 'LI') {
      setTaskEditor({
        id,
        title,
        description,
        status,
        mode: 'edit',
        changed: false,
      });

      adjustTaskEditorForMobile();
    }
  };

  const handleRemoveTask = async (taskId) => {
    await deleteTaskForUser(userId, taskId);
  };

  const handleAddTask = async (userId, taskId, newTask) => {
    await addTaskForUser(userId, taskId, newTask);
    setTaskEditor(newTask);

    setTaskEditor({
      id: uuidv4(),
      title: '',
      description: '',
      status: 'pending',
      mode: 'new',
      changed: false,
    });
  };

  const handleCancelTaskEdit = () => {
    setTaskEditor({
      id: uuidv4(),
      status: 'pending',
      mode: 'new',
      changed: false,
    });

    adjustTaskEditorForMobile();
  };

  const handleSaveTask = async (taskId, updatedTask) => {
    await updateTaskForUser(userId, taskId, updatedTask);

    setTaskEditor({
      id: uuidv4(),
      status: 'pending',
      mode: 'new',
      changed: false,
    });

    adjustTaskEditorForMobile();
  };

  const handleStatusChange = async (taskId, newStatus) => {
    await updateTaskStatus(userId, taskId, newStatus);
  };

  return (
    <main className={nunito.className}>
      <div className="grid grid-cols-1 lg:grid-cols-main h-full p-4 md:p-10 gap-4 md:gap-10 [&>div]:bg-white [&>div]:rounded [&>div]:p-4 md:[&>div]:p-10">
        <div
          className="block absolute overflow-y-auto -translate-x-[120%] lg:translate-x-0 lg:overflow-hidden lg:relative w-[calc(100%-2rem)] md:w-[calc(100%-5rem)] lg:w-full z-10 lg:z-0 top-0 left-0 right-0 bottom-0 m-auto h-[calc(100%-2rem)] md:h-[calc(100%-5rem)] lg:h-full"
          ref={editorContainerRef}
        >
          <div className="flex flex-col h-full w-full relative">
            <div className="flex justify-end p-2 lg:hidden">
              <button
                onClick={() => {
                  adjustTaskEditorForMobile();
                }}
              >
                <LuX className="text-blue " size={'2em'} />
              </button>
            </div>
            <TaskEditor
              maxLength={250}
              id={taskEditor.id}
              title={taskEditor.title}
              description={taskEditor.description}
              mode={taskEditor.mode}
              changed={taskEditor.changed}
              addTask={handleAddTask}
              onCancel={handleCancelTaskEdit}
              onSave={handleSaveTask}
              userId={userId}
            />
          </div>
        </div>
        <div className="overflow-auto">
          <TaskToolbar
            onFilterChange={handleFilterChange}
            selected={selectedFilter}
          />
          <TasksList
            tasks={tasks}
            setTasks={setTasks}
            userId={userId}
            onClick={handleTaskClick}
            removeTask={handleRemoveTask}
            onStatusChange={handleStatusChange}
            filter={selectedFilter}
          />
        </div>
      </div>
    </main>
  );
}
