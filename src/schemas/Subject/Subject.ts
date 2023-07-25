import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    gradingType: {
      type: String,
      enum: ["number", "grades", "other"],
      required: true,
    },

    totalMarks: {
      type: Number,
    },

    grades: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Subject", subjectSchema);

