import { TTask } from "./task.interface";
import { Task } from "./task.model";

const createTask = async (payload: TTask) => {
  const result = await Task.create(payload);
  return result;
};

const getAllTasks = async (userId?: string) => {
  const filter = userId ? { assignedTo: userId } : {};
  const result = await Task.find(filter);
  return result;
};

const getSingleTask = async (id: string) => {
  const result = await Task.findById(id);
  return result;
};

const updateTask = async (id: string, payload: Partial<TTask>) => {
  const result = await Task.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteTask = async (id: string) => {
  const result = await Task.findByIdAndDelete(id);
  return result;
};

export const TaskServices = {
  createTask,
  getAllTasks,
  getSingleTask,
  updateTask,
  deleteTask,
};
