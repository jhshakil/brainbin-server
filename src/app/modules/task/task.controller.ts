import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { TaskServices } from "./task.service";

const createTask = catchAsync(async (req, res) => {
  const result = await TaskServices.createTask(req.body);
  sendResponse(res, {
    message: "Task created successfully",
    data: result,
  });
});
const getAllTasks = catchAsync(async (req, res) => {
  const result = await TaskServices.getAllTasks();
  sendResponse(res, {
    message: "Tasks retrieved successfully",
    data: result,
  });
});

const getSingleTask = catchAsync(async (req, res) => {
  const result = await TaskServices.getSingleTask(req.params.id);
  sendResponse(res, {
    message: "Task retrieved successfully",
    data: result,
  });
});
const updateTask = catchAsync(async (req, res) => {
  const result = await TaskServices.updateTask(req.params.id, req.body);
  sendResponse(res, {
    message: "Task updated successfully",
    data: result,
  });
});
const deleteTask = catchAsync(async (req, res) => {
  const result = await TaskServices.deleteTask(req.params.id);
  sendResponse(res, {
    message: "Task deleted successfully",
    data: result,
  });
});

export const TaskControllers = {
  createTask,
  getAllTasks,
  getSingleTask,
  updateTask,
  deleteTask,
};
