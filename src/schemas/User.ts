import mongoose, { Schema, Document } from "mongoose";

export interface UserInterface extends Document {
  name: string;
  username: string;
  pic: string;
  position?: string[];
  organisation: Schema.Types.ObjectId;
  profile_details: Schema.Types.ObjectId;
  is_active: boolean;
  role: string;
  password: string;
}

const UserSchema: Schema<UserInterface> = new Schema<UserInterface>(
  {
    name: { type: String, trim: true },
    username: { type: String, required: true, index: true, trim: true },
    pic: { type: String, trim: true },
    position: {
      type: Array,
      default: ["web designer"],
    },
    organisation: { type: Schema.Types.ObjectId, ref: "Company" },
    profile_details: { type: Schema.Types.ObjectId, ref: "ProfileDetails" },
    is_active: { type: Boolean, default: false },
    role: {
      type: String,
      enum: ["user", "admin", "superadmin", "manager", "customer", "support"],
      default: "user",
    },
    password: { type: String, trim: true },
  },
  { timestamps: true }
);

const UserModel = mongoose.model<UserInterface>("User", UserSchema);

export default UserModel;
