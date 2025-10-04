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
  const { userId, status, search, page, per_page } = req.query;
  const result = await TaskServices.getAllTasks(
    userId as string,
    search as string,
    status as string,
    Number(page) || 1,
    Number(per_page) || 10
  );
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

const updateTaskStatus = catchAsync(async (req, res) => {
  const result = await TaskServices.updateTaskStatus(
    req.params.id,
    req.body.status
  );
  sendResponse(res, {
    message: "Task status updated successfully",
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
  updateTaskStatus,
  deleteTask,
};
