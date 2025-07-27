// src/components/TaskItem.tsx
import React from 'react';
import { useAppDispatch } from '../redux/hooks';
import { deleteTask, toggleStatus } from '../redux/taskSlice';

export const TaskItem: React.FC<{ task: any }> = ({ task }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="p-4 bg-white rounded shadow flex justify-between items-center">
      <div>
        <p className={`text-lg ${task.status === 'Done' ? 'line-through text-green-600' : ''}`}>{task.title}</p>
        <small className="text-gray-500">{new Date(task.createdAt).toLocaleString()}</small>
      </div>
      <div className="flex gap-2">
        <select
          className="border rounded p-1"
          value={task.status}
          onChange={(e) => dispatch(toggleStatus({ id: task.id, status: e.target.value }))}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <button onClick={() => dispatch(deleteTask(task.id))} className="text-red-500">Delete</button>
      </div>
    </div>
  );
};