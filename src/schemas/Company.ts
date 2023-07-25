import mongoose, { Schema, Document } from "mongoose";

interface CompanyI extends Document {
  organisation_name: string;
  verified_email_allowed: boolean;
  is_active?: boolean;
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
  address1?: string;
  address2?: string;
  pinCode?: string;
  country?: string;
  state?: string;
  city?: string;
}

const companySchema = new mongoose.Schema<CompanyI>(
  {
    organisation_name: {
      type: String,
      unique: true,
      index: true,
      trim: true,
    },
    is_active: {
      type: Boolean,
      default: true,
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
    address1: {
      type: String,
      trim: true,
    },
    address2: {
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
    pinCode: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<CompanyI>("Company", companySchema);