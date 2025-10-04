import { Types } from "mongoose";

export type TTask = {
  _id?: Types.ObjectId;
  title: string;
  details: string;
  status: "Pending" | "In Progress" | "Complete";
  assignTo: Types.ObjectId;
  dueDate: string;
};
