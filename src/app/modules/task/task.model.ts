import { model, Schema } from "mongoose";
import { TTask } from "./task.interface";

const taskSchema = new Schema<TTask>({
  title: { type: String, required: true },
  details: { type: String, required: true },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Complete"],
    default: "Pending",
  },
  assignTo: { type: Schema.Types.ObjectId, ref: "Auth", required: true },
});

export const Task = model<TTask>("Task", taskSchema);
