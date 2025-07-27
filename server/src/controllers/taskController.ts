import { Request, Response } from 'express';
import Task from '../models/Task';

// Create a new task
export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, status, tags } = req.body;
    const task = await Task.create({
      title,
      description,
      status,
      tags,
      userId: req.userId,
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all tasks for the logged-in user
export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find({ userId: req.userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get a single task by ID
export const getTaskById = async (req: Request, res: Response) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.userId });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update a task by ID
export const updateTask = async (req: Request, res: Response) => {
  try {
    const { title, description, status, tags } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { title, description, status, tags },
      { new: true }
    );
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete a task by ID
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}
