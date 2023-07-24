import mongoose, { Document, Schema } from "mongoose";

interface TaskI extends Document {
  project: mongoose.Schema.Types.ObjectId;
  title: string;
  description?: string;
  assignee?: mongoose.Schema.Types.ObjectId[];
  assigner: mongoose.Schema.Types.ObjectId;
  status: string;
  duedate?: Date;
  startDate?: Date;
  endDate?: Date;
  attach_files?: any;
  approval?: string;
}

const AttachFiles = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    title: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    file: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const TaskSchema = new Schema<TaskI>(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    assignee: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [],
    },
    assigner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["Backlog", "To Do", "In Progress", "Done"],
      default: "Backlog",
    },
    duedate: {
      type: Date,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    approval: {
      type: String,
      enum: ["Satisfactory", "Unsatisfactory"],
    },
    attach_files: [AttachFiles],
  },
  { timestamps: true }
);

export default mongoose.model<TaskI>("Task", TaskSchema);
