import z from "zod";

const createTaskValidation = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    details: z.string().min(1, "Details is required"),
    assignTo: z.string(),
    status: z.enum(["Pending", "In Progress", "Complete"]).optional(),
  }),
});
const updateTaskValidation = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required").optional(),
    details: z.string().min(1, "Details is required").optional(),
    assignTo: z.string().optional(),
    status: z.enum(["Pending", "In Progress", "Complete"]).optional(),
  }),
});

const updateTaskStatus = z.object({
  body: z.object({
    status: z.enum(["Pending", "In Progress", "Complete"]),
  }),
});

export const TaskValidations = {
  createTaskValidation,
  updateTaskValidation,
  updateTaskStatus,
};
