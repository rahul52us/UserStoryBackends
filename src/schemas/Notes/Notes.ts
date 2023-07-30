import mongoose from "mongoose";

export interface NotesI extends Document {
  title: string;
  organisation: mongoose.Schema.Types.ObjectId;
  category: mongoose.Schema.Types.ObjectId;
  description: string;
  pdf: string;
  thumbnail: string;
  createdBy: mongoose.Schema.Types.ObjectId;
  pricingType: string;
  discountPrice: string;
  originalPrice: string;
  rating: string;
  amountType: string;
}

export const NotesSchema = new mongoose.Schema<NotesI>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    organisation: {
      type: String,
      ref: "Organisation",
      required: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NotesCategory",
      required: true,
    },

    description: {
      type: String,
      trim: true,
    },

    thumbnail: {
      type: String,
      trim: true,
    },

    pdf: {
      type: String,
      trim: true,
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
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    amountType: {
      type: String,
      trim: true,
    },

    pricingType: {
      type: String,
      enum: ["paid", "free"],
      default: "free",
    },

  },
  { timestamps: true }
);

export default mongoose.model<NotesI>("Notes", NotesSchema);