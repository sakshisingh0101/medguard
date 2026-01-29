import mongoose, { Mongoose } from 'mongoose'
const MedicineRuleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  purpose:[String],

  avoidConditions: [String],
  avoidWith: [String],

  foodRule: {
    type: {
      type: String,
      enum: ["avoid", "required", "any"],
      default: "any"
    },
    items: [String]
  },

  timingRules: {
    morning: Boolean,
    night: Boolean,
    intervalHours: Number
  },

  commonSideEffects: [String],

  missedDoseRule: String,

  riskLevel: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "low"
  },

  maxDurationDays: Number
} , {timestamps:true});

export const MedicineRule = mongoose.model("MedicineRule" , MedicineRuleSchema)