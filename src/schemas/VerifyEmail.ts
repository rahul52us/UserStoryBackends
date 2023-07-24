import mongoose, { Schema, Document } from 'mongoose';

export interface IVerifyEmailToken extends Document {
  userId: mongoose.Types.ObjectId;
  token: string;
  createdAt: Date;
}

const VerifyEmailToken : Schema<IVerifyEmailToken> = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '1h', // Expiration time (1 hour)
  },
});

export default mongoose.model<IVerifyEmailToken>('VerifyEmailToken', VerifyEmailToken);


