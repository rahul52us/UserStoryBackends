import mongoose, { Document, Schema } from 'mongoose';

interface BlogComment extends Document {
  user: mongoose.Types.ObjectId;
  content: string;
  createdAt: Date;
  replies: mongoose.Types.ObjectId[];
}

const blogCommentSchema = new Schema<BlogComment>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    replies: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'BlogComment',
      },
    ],
  },
  { timestamps: true }
);

const BlogCommentModel = mongoose.model<BlogComment>('BlogComment', blogCommentSchema);

export default BlogCommentModel;
