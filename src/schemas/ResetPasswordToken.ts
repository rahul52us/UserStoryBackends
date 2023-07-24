import mongoose, { Schema, Document } from 'mongoose';

export interface IResetToken extends Document {
  userId: mongoose.Types.ObjectId;
  token: string;
  createdAt: Date;
}

const ResetPasswordToken: Schema<IResetToken> = new Schema({
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

const ResetToken = mongoose.model<IResetToken>('ResetPasswordToken', ResetPasswordToken);

export default ResetToken;
