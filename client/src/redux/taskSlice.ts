import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import api from '../utils/axios';
import type { Task } from '../types/taskTypes';

interface TaskState {
  tasks: Task[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  status: 'idle',
  error: null,
};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const res = await api.get('api/task');
  return res.data;
});

export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (payload: { title: string; description: string; status: string; tags: string[]; dueDate: string }) => {
    const res = await api.post('api/task', payload);
    return res.data;
  }
);

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id: string) => {
  await api.delete(`/api/task/${id}`);
  return id;
});

export const toggleStatus = createAsyncThunk(
  'api/task/toggleStatus',
  async ({ id, status }: { id: string; status: Task['status'] }) => {
    const res = await api.patch(`/api/task/${id}`, { status });
    return res.data;
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks.push(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
      })
      .addCase(toggleStatus.fulfilled, (state, action: PayloadAction<Task>) => {
        const index = state.tasks.findIndex(task => task.id === action.payload.id);
        if (index !== -1) state.tasks[index] = action.payload;
      });
  },
});

export default taskSlice.reducer;
