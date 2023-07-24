import mongoose from "mongoose";
import { VideoI, VideoSchema } from "./Videos";

interface VideoCategoryI {
  company: mongoose.Schema.Types.ObjectId;
  createdBy: mongoose.Schema.Types.ObjectId;
  title: string;
  thumbnail: string;
  details: string;
  description: string;
  discountPrice: string;
  originalPrice: string;
  pricingType: string;
  amountType: string;
  rating: string;
  videos: VideoI[];
}

const VideoCategorySchema = new mongoose.Schema<VideoCategoryI>(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    thumbnail: {
      type: String,
      trim: true,
    },

    details: {
      type: String,
      required: true
    },

    videos: {
      type: [VideoSchema],
    },

    discountPrice: {
      type: String,
      trim: true,
    },

    originalPrice: {
      type: String,
      trim: true,
    },

    rating: {
      type: String,
      trim: true,
      default:'2'
    },

    amountType: {
      type: String,
      trim: true,
      default:'Rs'
    },

    pricingType: {
      type: String,
      enum: ["paid", "free"],
      default: "free",
    },

  },
  { timestamps: true }
);

export default mongoose.model<VideoCategoryI>("VideoCategory", VideoCategorySchema);