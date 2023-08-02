import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema(
  {
    organisation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "QuizCategory",
      },
    ],
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
    },
    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    thumbnail: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Quiz", QuizSchema);