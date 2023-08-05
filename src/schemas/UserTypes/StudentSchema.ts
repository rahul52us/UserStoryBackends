import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  userId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User'
  },
  organisationId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Company'
  },
  class : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Class'
  },
  section : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Section'
  },
  marksheet : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'MarkSheet'
  }
},{timestamps : true})

module.exports = mongoose.model('Student', studentSchema)