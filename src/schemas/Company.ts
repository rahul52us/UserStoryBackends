import mongoose, { Schema, Document } from "mongoose";

interface CompanyI extends Document {
  company_name: string;
  position_types: any;
  verified_email_allowed: boolean;
  is_active?:boolean,
  logo?: string;
  mobileNo?: string;
  workNo?: string;
  facebookLink?: string;
  instagramLink?: string;
  linkedInLink?: string;
  twitterLink?: string;
  githubLink?: string;
  telegramLink?: string;
  webLink?: string;
  country?: string;
  state?: string;
  city?: string;
}

const companySchema = new mongoose.Schema<CompanyI>({
  company_name: {
    type: String,
    unique: true,
    index: true,
    trim: true,
  },
  is_active : {
    type : Boolean,
    default : true
  },
  position_types: {
    type: Array,
    default: [
      "website_designer",
      "fullstack developer",
      "tester",
      "QA",
      "Block Chain developer",
      "software developer",
    ],
  },
  verified_email_allowed: {
    type: Boolean,
    default: false,
  },
  logo: {
    type: String,
  },
  mobileNo: {
    type: String,
  },
  workNo: {
    type: String,
  },
  facebookLink: {
    type: String,
  },
  instagramLink: {
    type: String,
  },
  twitterLink: {
    type: String,
  },
  githubLink: {
    type: String,
  },
  telegramLink: {
    type: String,
  },
  linkedInLink: {
    type: String,
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
},{timestamps : true});

export default mongoose.model<CompanyI>("Company", companySchema);
