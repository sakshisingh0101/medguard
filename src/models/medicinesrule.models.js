import mongoose, { Mongoose } from 'mongoose'
const medicineRuleSchema  = new mongoose.Schema({
    name:{
        type:String
    },
    avoidConditions: [
        {
            type:String
        }
    ],
  avoidWith:[
        {
            type:String
        }
    ],
  foodRule: {
  type: String,
  enum: ["empty", "after", "any"]
},
  maxDurationDays:{
    type:Number
  }
},{timestamps:true})
export const MedicineRule = mongoose.model("MedicineRule" , medicineRuleSchema)