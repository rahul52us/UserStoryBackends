import mongoose, { Document, Schema } from "mongoose";

interface Reaction {
  user: mongoose.Schema.Types.ObjectId;
  type: string;
}

interface Blog extends Document {
  title: string;
  coverImage: string;
  content: string;
  createdBy: mongoose.Types.ObjectId;
  organisation: mongoose.Types.ObjectId;
  tags: string[]; // Array of tags
  reactions: Reaction[];
  status:string;
  comments: mongoose.Types.ObjectId[];
}

const blogSchema = new Schema<Blog>(
  {
    title: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    tags: [String], // Tags array
    status:{
      type : String,
      enum : ['draft','published'],
      default : 'draft'
    },
    reactions: [
      {
        user: {
          type: mongoose.Types.ObjectId,
          ref: "User",
          required: true,
        },
        type: {
          type: String,
          required: true,
        },
      },
    ],
    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "BlogComment",
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
      required: true,
    },
  },
  { timestamps: true }
);

const BlogModel = mongoose.model<Blog>("Blog", blogSchema);

export default BlogModel;
