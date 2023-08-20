import mongoose, { Document } from "mongoose";

interface TestimonialI extends Document {
  name: string;
  user: mongoose.Schema.Types.ObjectId;
  profession:string;
  organisation: mongoose.Schema.Types.ObjectId;
  image: mongoose.Schema.Types.ObjectId;
  description: string;
}

const TestimonialSchema = new mongoose.Schema<TestimonialI>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    organisation : {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Company',
      required: [true, "Organisation is required"],
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    profession:{
      type : String,
      required : true,
      trim:true
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<TestimonialI>("Testimonial", TestimonialSchema);
