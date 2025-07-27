import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchTasks } from '../redux/taskSlice';
import { TaskForm } from '../components/TaskForm';
import { TaskList } from '../components/TaskList';

export const TaskPage = () => {
  const dispatch = useAppDispatch();
  const { tasks, status, error } = useAppSelector(state => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400">
      <div className="flex flex-col items-center w-full max-w-4xl">
        <h1 className="text-4xl font-extrabold text-center mb-10 mt-4 text-white drop-shadow-[0_2px_20px_rgba(255,255,255,0.7)] tracking-widest font-mono">
          Task Manager
        </h1>
        <div className="w-full flex justify-center mb-8">
          <div className="backdrop-blur-md bg-white/20 border border-white/30 rounded-2xl shadow-2xl p-10 flex flex-col items-center w-full ">
            <TaskForm />
          </div>
        </div>
        <div className="w-full flex justify-center">
          <div className="backdrop-blur-md bg-white/30 border border-white/40 rounded-2xl shadow-xl p-8 w-full ">
            {status === 'loading' && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <TaskList tasks={tasks} />
          </div>
        </div>
      </div>
    </div>
  );
};