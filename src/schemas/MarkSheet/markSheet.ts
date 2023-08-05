import mongoose from "mongoose";

const markSheetSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    organisationId: {
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

module.exports = mongoose.model("MarkSheet", markSheetSchema);
