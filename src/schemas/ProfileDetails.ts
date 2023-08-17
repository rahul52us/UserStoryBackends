import mongoose, { Schema, Document } from "mongoose";


interface addressInfo  {
  address?:string;
  country?:string;
  state?:string;
  city?:string;
  pinCode?:string
}

interface linkInfo {

}

interface ProfileDetailsI extends Document {
  user: mongoose.Schema.Types.ObjectId;
  nickName?: string;
  fatherName?: string;
  motherName?: string;
  sibling?: number;
  mobileNo?: string;
  language?: String[];
  emergencyNo?: String;
  address1?: string;
  address2?: string;
  country?: string;
  state?: string;
  city?: string;
  pinCode?: string;
  linkedInLink?: string;
  githubLink?: string;
  websiteLink?: string;
  addressInfo?:addressInfo[]
}

const ProfileDetailsSchema = new mongoose.Schema<ProfileDetailsI>({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: "User",
  },
  nickName: {
    type: String,
    trim: true,
  },
  fatherName: {
    type: String,
    trim: true,
  },
  motherName: {
    type: String,
    trim: true,
  },
  sibling: {
    type: Number,
  },
  language: {
    type: Array,
    default: [],
  },
  mobileNo: {
    type: String,
    trim: true,
  },
  emergencyNo: {
    type: String,
    trim: true,
  },
  addressInfo: {
    type: [{
      address : String,
      country: String,
      state:String,
      city: String,
      pinCode: String
    }],
    default: [],
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
