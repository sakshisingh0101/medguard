import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    prescriptionDate:
    {
        type:Date
    },
     medicines: [
    {
      name:String,
      dosage:String,
      frequency:String,
      durationDays:String
    }
  ]
},{timestamps:true})
export const Prescription= mongoose.model("Prescription" , prescriptionSchema)