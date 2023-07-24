import mongoose, { Schema, Document } from "mongoose";

interface ProfileDetailsI extends Document {
  user: mongoose.Schema.Types.ObjectId;
  nickName:string;
  mobileNo?: string;
  country?: string;
  state?: string;
  city?: string;
  linkedInLink?: string;
  githubLink?: string;
  websiteLink?: string;
}

const ProfileDetailsSchema = new mongoose.Schema<ProfileDetailsI>({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: "User",
  },
  nickName:{
    type:String,
    trim:true
  },
  mobileNo: {
    type: String,
    trim: true,
  },
  country: {
    type: String,
    trim: true,
  },
  state: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  },
  linkedInLink: {
    type: String,
    trim: true,
  },
  githubLink: {
    type: String,
    trim: true,
  },
  websiteLink: {
    type: Array,
    default: [],
  },
});

export default mongoose.model<ProfileDetailsI>(
  "ProfileDetails",
  ProfileDetailsSchema
);
