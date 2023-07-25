import mongoose from "mongoose";

export const sectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      requird: true,
    },

    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },

    examination : {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Examination'
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    mediumType: {
      type: String,
      default: "english",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

  },
  { timestamps: true }
);

export default mongoose.model("Section", sectionSchema);
