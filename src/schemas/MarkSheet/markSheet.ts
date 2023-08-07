import mongoose from "mongoose";

const markSheetSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    organisation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
    marks: {
      type: mongoose.Schema.Types.Mixed, // Allows for dynamic structure
      trim: true,
    },
    status: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("MarkSheet", markSheetSchema);
