import mongoose from "mongoose";

const ClassSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required : true
    },

    startYear: {
      type: Date,
      required:true
    },

    endYear: {
      type: Date,
      required:true
    },

    medium : {
      type : String,
      default:'english'
    },

    organisation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    sections: [{
      type : mongoose.Schema.Types.ObjectId,
      ref :'Section'
    }],

    isActive : {
      type : Boolean,
      default : true
    }
  },

  { timestamps: true }

);

export default mongoose.model("Class", ClassSchema);