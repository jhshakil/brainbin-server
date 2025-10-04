import { TTask } from "./task.interface";
import { Task } from "./task.model";

const createTask = async (payload: TTask) => {
  const result = await Task.create(payload);
  return result;
};

const getAllTasks = async (
  userId?: string,
  search?: string,
  status?: string,
  page: number = 1,
  per_page: number = 10
) => {
  const filter: Record<string, any> = {};

  // filter by user
  if (userId) {
    filter.assignTo = userId;
  }

  // filter by status
  if (status) {
    filter.status = status;
  }

  // search by title (case-insensitive)
  if (search) {
    filter.title = { $regex: search, $options: "i" };
  }

  // pagination
  const skip = (page - 1) * per_page;

  const [tasks, total] = await Promise.all([
    Task.find(filter).skip(skip).limit(per_page).sort({ createdAt: -1 }),
    Task.countDocuments(filter),
  ]);

  return {
    data: tasks,
    meta: {
      total,
      page,
      per_page,
      totalPages: Math.ceil(total / per_page),
    },
  };
};

const getSingleTask = async (id: string) => {
  const result = await Task.findById(id);
  return result;
};

const updateTask = async (id: string, payload: Partial<TTask>) => {
  const result = await Task.findByIdAndUpdate(id, payload, { new: true });
  return result;
};
const updateTaskStatus = async (id: string, status: string) => {
  const result = await Task.findByIdAndUpdate(id, { status }, { new: true });
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
  updateTaskStatus,
  deleteTask,
};
