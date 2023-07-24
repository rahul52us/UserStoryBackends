import mongoose, { Schema, Document } from "mongoose";

interface IReaction extends Document {
  user_id: mongoose.Schema.Types.ObjectId;
  emoji: string;
}

interface IThread extends Document {
  user_id: mongoose.Schema.Types.ObjectId;
  content: string;
  created_at: Date;
}

export interface IMessage extends Document {
  room_id: mongoose.Schema.Types.ObjectId;
  user_id: mongoose.Schema.Types.ObjectId;
  content: string;
  created_at: Date;
  read_by: mongoose.Schema.Types.ObjectId[];
  reactions: IReaction[];
  threads: IThread[];
}

export interface IChatRoom extends Document {
  name: string;
  members: mongoose.Schema.Types.ObjectId[];
  created_by: mongoose.Schema.Types.ObjectId;
  created_at: Date;
  messages: IMessage[];
}

const reactionSchema = new Schema<IReaction>({
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
  emoji: { type: String, required: true },
});

const threadSchema = new Schema<IThread>({
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
  content: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

const messageSchema = new Schema<IMessage>({
  room_id: { type: Schema.Types.ObjectId, ref: "ChatRoom" },
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
  content: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  read_by: [{ type: Schema.Types.ObjectId, ref: "User" }],
  reactions: [reactionSchema],
  threads: [threadSchema],
});

const chatRoomSchema = new Schema<IChatRoom>({
  name: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  created_by: { type: Schema.Types.ObjectId, ref: "User" },
  created_at: { type: Date, default: Date.now },
  messages: [messageSchema],
});

export const ChatRoom = mongoose.model<IChatRoom>("ChatRoom", chatRoomSchema);
export const chatMessage = mongoose.model<IMessage>("ChatMessage", messageSchema)