import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  user : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User',
    required:true
  },
  organisation : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Company',
    required:true
  },
  class : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Class',
    required:true
  },
  section : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Section',
    required:true
  },
  marksheet : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'MarkSheet'
  }
},{timestamps : true})

export default mongoose.model('Student', studentSchema)