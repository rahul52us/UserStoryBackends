import mongoose from "mongoose";
import Notes, { NotesI, NotesSchema } from "./Notes";

interface NotesCategoryInterface extends Document {
  user: mongoose.Schema.Types.ObjectId;
  company: mongoose.Schema.Types.ObjectId;
  thumbnail: string;
  title: string;
  details: string;
  description: string;
  createdBy: mongoose.Schema.Types.ObjectId;
  rating: string;
  discountPrice: string;
  originalPrice: string;
  pricingType: string;
  amountType: string;
  notes: NotesI[];
}

const NotesCategorySchema = new mongoose.Schema<NotesCategoryInterface>(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    thumbnail: {
      type: String,
      trim: true,
    },

    title: {
      type: String,
      trim: true,
      required: true,
      index: true,
    },

    description: {
      type: String,
      trim: true,
      required: true,
    },

    details: {
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
      default:'2'
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

    notes: [NotesSchema],
  },
  { timestamps: true }
);

export default mongoose.model("NotesCategory", NotesCategorySchema);