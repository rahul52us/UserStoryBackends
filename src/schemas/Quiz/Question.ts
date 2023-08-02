import mongoose from "mongoose";

export const AnswerSchema = new mongoose.Schema({
  answerType: {
    type: String,
    enum: ["text", "img", "video"],
  },
  answer: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  correct: {
    type: Boolean,
    default:false,
    required : true
  },
});

export const Answer = mongoose.model("Answer", AnswerSchema);

export const QuestionSchema = new mongoose.Schema(
  {
    organisation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QuizCategory",
    },
    questionType: {
      type: String,
      enum: ["text", "img", "video"],
      default: "text",
    },
    question: {
      type: String,
      trim: true,
    },
    answers: [{
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Answer'
    }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Question", QuestionSchema);
