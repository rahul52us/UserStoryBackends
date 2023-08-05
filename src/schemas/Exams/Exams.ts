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

const TestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },

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
        name: {
          type: String,
          required: true,
          trim: true,
        },
        gradingType: {
          type: String,
          enum: ["number", "grades"],
          required: true,
        },
        totalMarks: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Test = mongoose.model("Test", TestSchema);

const semisterSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
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
      name: {
        type: String,
        required: true,
        trim: true,
      },
      gradingType: {
        type: String,
        enum: ["number", "grades"],
        required: true,
      },
      totalMarks: {
        type: Number,
        required: true,
      },
    },
  ],
  noOfTest: [TestSchema],
});

const Semister = mongoose.model("Semister", semisterSchema);

export { Examination, Semister, Test };
