import Task from '../models/Task.js';
import { AppError } from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const createTask = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    throw new AppError('Task title is required', 400);
  }

  const task = await Task.create({
    title,
    description,
    user: req.user._id
  });

  res.status(201).json({
    status: 'success',
    task
  });
});

export const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });

  res.status(200).json({
    status: 'success',
    count: tasks.length,
    tasks
  });
});

export const getTask = asyncHandler(async (req, res) => {
  const task = await Task.findOne({
    _id: req.params.id,
    user: req.user._id
  });

  if (!task) {
    throw new AppError('Task not found', 404);
  }

  res.status(200).json({
    status: 'success',
    task
  });
});

export const updateTask = asyncHandler(async (req, res) => {
  const allowedUpdates = ['title', 'description', 'completed'];
  const updates = {};

  allowedUpdates.forEach((field) => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });

  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    updates,
    { new: true, runValidators: true }
  );

  if (!task) {
    throw new AppError('Task not found', 404);
  }

  res.status(200).json({
    status: 'success',
    task
  });
});

export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id
  });

  if (!task) {
    throw new AppError('Task not found', 404);
  }

  res.status(200).json({
    status: 'success',
    message: 'Task deleted successfully'
  });
});
