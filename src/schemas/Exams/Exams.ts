import mongoose from "mongoose";

const ExaminationSchema = new mongoose.Schema(
  {
    semister: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Semister",
      },
    ],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    organisation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
  },

  { timestamps: true }
);

const Examination = mongoose.model("Examination", ExaminationSchema);

const semisterSchema = new mongoose.Schema(
  {
    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    subjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
      },
    ],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    noOfTest: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Test",
      },
    ],
  },
  { timestamps: true }
);

const Semister = mongoose.model("Semister", semisterSchema);

const TestSchema = new mongoose.Schema(
  {
    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    subjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
      },
    ],
  },
  { timestamps: true }
);

const Test = mongoose.model("Test", TestSchema);

export { Examination, Semister, Test };
