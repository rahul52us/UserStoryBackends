import mongoose, { Schema, Document } from "mongoose";

interface ProfileDetailsI extends Document {
  user: mongoose.Schema.Types.ObjectId;
  nickName?:string;
  mobileNo?: string;
  language?:String;
  emergencyNo?:String;
  address1?:string;
  address2?:string;
  country?: string;
  state?: string;
  city?: string;
  pinCode?:string;
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
  language:{
    type : String,
    trim : true
  },
  mobileNo: {
    type: String,
    trim: true,
  },
  emergencyNo:{
    type : String,
    trim : true
  },
  address1: {
    type : String,
    trim : true
  },
  address2:{
    type : String,
    trim : true
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
  pinCode:{
    type : String,
    trim : true
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