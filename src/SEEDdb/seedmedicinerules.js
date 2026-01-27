import mongoose from "mongoose";
import dotenv from "dotenv";
import { MedicineRule } from "../models/medicinesrule.models.js";
import { db_name } from "../constants.js";

dotenv.config();

await mongoose.connect(`${process.env.MONGODB_URL}/${db_name}`);
const data = [
  {
    name: "Paracetamol",
    avoidConditions: ["severe liver disease"],
    avoidWith: ["alcohol"],
    foodRule: { type: "any", items: [] },
    timingRules: { morning: true, night: true, intervalHours: 6 },
    commonSideEffects: ["nausea"],
    missedDoseRule: "Take when remembered unless close to next dose",
    riskLevel: "low",
    maxDurationDays: 5
  },
  {
    name: "Ibuprofen",
    avoidConditions: ["gastritis", "kidney disease"],
    avoidWith: ["aspirin", "alcohol"],
    foodRule: { type: "required", items: ["food"] },
    timingRules: { morning: true, night: true, intervalHours: 8 },
    commonSideEffects: ["stomach pain", "heartburn"],
    missedDoseRule: "Skip if close to next dose",
    riskLevel: "medium",
    maxDurationDays: 7
  },
  {
    name: "Amoxicillin",
    avoidConditions: ["penicillin allergy"],
    avoidWith: ["methotrexate"],
    foodRule: { type: "any", items: [] },
    timingRules: { morning: true, night: true, intervalHours: 8 },
    commonSideEffects: ["diarrhea", "rash"],
    missedDoseRule: "Take as soon as remembered",
    riskLevel: "medium",
    maxDurationDays: 10
  },
  {
    name: "Cetirizine",
    avoidConditions: ["severe kidney disease"],
    avoidWith: ["alcohol"],
    foodRule: { type: "any", items: [] },
    timingRules: { morning: false, night: true, intervalHours: 24 },
    commonSideEffects: ["drowsiness", "dry mouth"],
    missedDoseRule: "Skip missed dose",
    riskLevel: "low",
    maxDurationDays: 10
  },
  {
    name: "Azithromycin",
    avoidConditions: ["heart rhythm disorder"],
    avoidWith: ["antacids"],
    foodRule: { type: "any", items: [] },
    timingRules: { morning: true, night: false, intervalHours: 24 },
    commonSideEffects: ["nausea", "diarrhea"],
    missedDoseRule: "Take as soon as remembered",
    riskLevel: "medium",
    maxDurationDays: 5
  },
  {
    name: "Doxycycline",
    avoidConditions: ["pregnancy", "children under 8"],
    avoidWith: ["milk", "antacids"],
    foodRule: { type: "avoid", items: ["milk"] },
    timingRules: { morning: true, night: false, intervalHours: 12 },
    commonSideEffects: ["nausea", "photosensitivity"],
    missedDoseRule: "Skip if close to next dose",
    riskLevel: "medium",
    maxDurationDays: 14
  },
  {
    name: "Omeprazole",
    avoidConditions: ["osteoporosis"],
    avoidWith: ["clopidogrel"],
    foodRule: { type: "required", items: ["empty stomach"] },
    timingRules: { morning: true, night: false, intervalHours: 24 },
    commonSideEffects: ["headache", "abdominal pain"],
    missedDoseRule: "Skip missed dose",
    riskLevel: "low",
    maxDurationDays: 14
  },
  {
    name: "Pantoprazole",
    avoidConditions: ["osteoporosis"],
    avoidWith: ["atazanavir"],
    foodRule: { type: "required", items: ["empty stomach"] },
    timingRules: { morning: true, night: false, intervalHours: 24 },
    commonSideEffects: ["headache"],
    missedDoseRule: "Skip missed dose",
    riskLevel: "low",
    maxDurationDays: 14
  },
  {
    name: "Atorvastatin",
    avoidConditions: ["liver disease"],
    avoidWith: ["grapefruit"],
    foodRule: { type: "any", items: [] },
    timingRules: { morning: false, night: true, intervalHours: 24 },
    commonSideEffects: ["muscle pain"],
    missedDoseRule: "Take when remembered",
    riskLevel: "medium",
    maxDurationDays: 30
  },
  {
    name: "Metformin",
    avoidConditions: ["kidney disease"],
    avoidWith: ["alcohol"],
    foodRule: { type: "required", items: ["food"] },
    timingRules: { morning: true, night: true, intervalHours: 12 },
    commonSideEffects: ["diarrhea", "bloating"],
    missedDoseRule: "Skip missed dose",
    riskLevel: "medium",
    maxDurationDays: 30
  },
  {
  name: "Acetaminophen",
  avoidConditions: ["liver disease"],
  avoidWith: ["alcohol"],
  foodRule: { type: "any", items: [] },
  timingRules: { morning: true, night: true, intervalHours: 6 },
  commonSideEffects: ["nausea"],
  missedDoseRule: "Take when remembered unless close to next dose",
  riskLevel: "low",
  maxDurationDays: 5
},
{
  name: "Naproxen",
  avoidConditions: ["kidney disease", "ulcer"],
  avoidWith: ["aspirin", "alcohol"],
  foodRule: { type: "required", items: ["food"] },
  timingRules: { morning: true, night: true, intervalHours: 12 },
  commonSideEffects: ["stomach pain"],
  missedDoseRule: "Skip if close to next dose",
  riskLevel: "medium",
  maxDurationDays: 7
},
{
  name: "Aceclofenac",
  avoidConditions: ["heart disease"],
  avoidWith: ["alcohol"],
  foodRule: { type: "required", items: ["food"] },
  timingRules: { morning: true, night: true, intervalHours: 12 },
  commonSideEffects: ["gastric irritation"],
  missedDoseRule: "Skip missed dose",
  riskLevel: "medium",
  maxDurationDays: 5
},
{
  name: "Chlorpheniramine",
  avoidConditions: ["glaucoma"],
  avoidWith: ["alcohol"],
  foodRule: { type: "any", items: [] },
  timingRules: { morning: false, night: true, intervalHours: 24 },
  commonSideEffects: ["drowsiness"],
  missedDoseRule: "Skip missed dose",
  riskLevel: "low",
  maxDurationDays: 5
},
{
  name: "Dextromethorphan",
  avoidConditions: ["asthma"],
  avoidWith: ["antidepressants"],
  foodRule: { type: "any", items: [] },
  timingRules: { morning: true, night: true, intervalHours: 8 },
  commonSideEffects: ["dizziness"],
  missedDoseRule: "Skip if close to next dose",
  riskLevel: "low",
  maxDurationDays: 5
},
{
  name: "Ambroxol",
  avoidConditions: [],
  avoidWith: [],
  foodRule: { type: "any", items: [] },
  timingRules: { morning: true, night: true, intervalHours: 12 },
  commonSideEffects: ["nausea"],
  missedDoseRule: "Take when remembered",
  riskLevel: "low",
  maxDurationDays: 7
},
{
  name: "Ranitidine",
  avoidConditions: ["kidney disease"],
  avoidWith: [],
  foodRule: { type: "any", items: [] },
  timingRules: { morning: true, night: true, intervalHours: 12 },
  commonSideEffects: ["headache"],
  missedDoseRule: "Skip missed dose",
  riskLevel: "low",
  maxDurationDays: 14
},
{
  name: "Domperidone",
  avoidConditions: ["heart rhythm disorder"],
  avoidWith: ["antifungals"],
  foodRule: { type: "required", items: ["before food"] },
  timingRules: { morning: true, night: false, intervalHours: 24 },
  commonSideEffects: ["dry mouth"],
  missedDoseRule: "Skip missed dose",
  riskLevel: "medium",
  maxDurationDays: 7
},
{
  name: "Sucralfate",
  avoidConditions: ["kidney disease"],
  avoidWith: ["antacids"],
  foodRule: { type: "required", items: ["empty stomach"] },
  timingRules: { morning: true, night: true, intervalHours: 12 },
  commonSideEffects: ["constipation"],
  missedDoseRule: "Skip missed dose",
  riskLevel: "low",
  maxDurationDays: 14
},
{
  name: "Amlodipine",
  avoidConditions: ["severe hypotension"],
  avoidWith: ["grapefruit"],
  foodRule: { type: "any", items: [] },
  timingRules: { morning: true, night: false, intervalHours: 24 },
  commonSideEffects: ["ankle swelling"],
  missedDoseRule: "Skip if close to next dose",
  riskLevel: "medium",
  maxDurationDays: 30
},
{
  name: "Enalapril",
  avoidConditions: ["pregnancy"],
  avoidWith: ["potassium supplements"],
  foodRule: { type: "any", items: [] },
  timingRules: { morning: true, night: true, intervalHours: 12 },
  commonSideEffects: ["dry cough"],
  missedDoseRule: "Skip missed dose",
  riskLevel: "medium",
  maxDurationDays: 30
},
{
  name: "Glimepiride",
  avoidConditions: ["severe liver disease"],
  avoidWith: ["alcohol"],
  foodRule: { type: "required", items: ["food"] },
  timingRules: { morning: true, night: false, intervalHours: 24 },
  commonSideEffects: ["hypoglycemia"],
  missedDoseRule: "Skip missed dose",
  riskLevel: "high",
  maxDurationDays: 30
},
{
  name: "Sitagliptin",
  avoidConditions: ["kidney disease"],
  avoidWith: [],
  foodRule: { type: "any", items: [] },
  timingRules: { morning: true, night: false, intervalHours: 24 },
  commonSideEffects: ["headache"],
  missedDoseRule: "Skip missed dose",
  riskLevel: "medium",
  maxDurationDays: 30
},
{
  name: "Ciprofloxacin",
  avoidConditions: ["tendon disorders"],
  avoidWith: ["antacids", "milk"],
  foodRule: { type: "avoid", items: ["milk"] },
  timingRules: { morning: true, night: true, intervalHours: 12 },
  commonSideEffects: ["diarrhea"],
  missedDoseRule: "Skip if close to next dose",
  riskLevel: "high",
  maxDurationDays: 7
},
{
  name: "Cefixime",
  avoidConditions: ["cephalosporin allergy"],
  avoidWith: [],
  foodRule: { type: "any", items: [] },
  timingRules: { morning: true, night: false, intervalHours: 24 },
  commonSideEffects: ["loose stools"],
  missedDoseRule: "Take when remembered",
  riskLevel: "medium",
  maxDurationDays: 7
},
{
  name: "Folic Acid",
  avoidConditions: [],
  avoidWith: [],
  foodRule: { type: "any", items: [] },
  timingRules: { morning: true, night: false, intervalHours: 24 },
  commonSideEffects: ["nausea"],
  missedDoseRule: "Take when remembered",
  riskLevel: "low",
  maxDurationDays: 90
},
{
  name: "Iron Supplement",
  avoidConditions: ["hemochromatosis"],
  avoidWith: ["calcium supplements"],
  foodRule: { type: "avoid", items: ["milk"] },
  timingRules: { morning: true, night: false, intervalHours: 24 },
  commonSideEffects: ["constipation"],
  missedDoseRule: "Skip missed dose",
  riskLevel: "low",
  maxDurationDays: 90
},
{
  name: "Calcium Carbonate",
  avoidConditions: ["kidney stones"],
  avoidWith: ["iron supplements"],
  foodRule: { type: "required", items: ["food"] },
  timingRules: { morning: true, night: false, intervalHours: 24 },
  commonSideEffects: ["bloating"],
  missedDoseRule: "Skip missed dose",
  riskLevel: "low",
  maxDurationDays: 90
},
{
  name: "Salbutamol",
  avoidConditions: ["heart rhythm disorder"],
  avoidWith: [],
  foodRule: { type: "any", items: [] },
  timingRules: { morning: true, night: true, intervalHours: 6 },
  commonSideEffects: ["tremor", "palpitations"],
  missedDoseRule: "Use when needed",
  riskLevel: "medium",
  maxDurationDays: 30
},
{
  name: "Montelukast",
  avoidConditions: ["depression"],
  avoidWith: [],
  foodRule: { type: "any", items: [] },
  timingRules: { morning: false, night: true, intervalHours: 24 },
  commonSideEffects: ["headache"],
  missedDoseRule: "Skip missed dose",
  riskLevel: "medium",
  maxDurationDays: 30
},
{
  name: "Levothyroxine",
  avoidConditions: ["untreated adrenal disorder"],
  avoidWith: ["iron supplements", "calcium supplements"],
  foodRule: { type: "required", items: ["empty stomach"] },
  timingRules: { morning: true, night: false, intervalHours: 24 },
  commonSideEffects: ["palpitations"],
  missedDoseRule: "Skip missed dose",
  riskLevel: "medium",
  maxDurationDays: 90
},
{
  name: "Ondansetron",
  avoidConditions: ["heart rhythm disorder"],
  avoidWith: ["antidepressants"],
  foodRule: { type: "any", items: [] },
  timingRules: { morning: true, night: true, intervalHours: 8 },
  commonSideEffects: ["constipation"],
  missedDoseRule: "Skip if close to next dose",
  riskLevel: "medium",
  maxDurationDays: 5
},
{
  name: "Clonazepam",
  avoidConditions: ["sleep apnea"],
  avoidWith: ["alcohol"],
  foodRule: { type: "any", items: [] },
  timingRules: { morning: false, night: true, intervalHours: 24 },
  commonSideEffects: ["drowsiness"],
  missedDoseRule: "Do not double dose",
  riskLevel: "high",
  maxDurationDays: 7
},
{
  name: "Escitalopram",
  avoidConditions: ["bipolar disorder"],
  avoidWith: ["MAO inhibitors"],
  foodRule: { type: "any", items: [] },
  timingRules: { morning: true, night: false, intervalHours: 24 },
  commonSideEffects: ["nausea"],
  missedDoseRule: "Skip missed dose",
  riskLevel: "medium",
  maxDurationDays: 30
},
{
  name: "Nitrofurantoin",
  avoidConditions: ["kidney disease"],
  avoidWith: ["antacids"],
  foodRule: { type: "required", items: ["food"] },
  timingRules: { morning: true, night: true, intervalHours: 12 },
  commonSideEffects: ["nausea"],
  missedDoseRule: "Take when remembered",
  riskLevel: "medium",
  maxDurationDays: 7
},
{
  name: "Vitamin D3",
  avoidConditions: ["hypercalcemia"],
  avoidWith: [],
  foodRule: { type: "required", items: ["food"] },
  timingRules: { morning: true, night: false, intervalHours: 24 },
  commonSideEffects: ["nausea"],
  missedDoseRule: "Skip missed dose",
  riskLevel: "low",
  maxDurationDays: 90
},
{
  name: "Vitamin B12",
  avoidConditions: [],
  avoidWith: [],
  foodRule: { type: "any", items: [] },
  timingRules: { morning: true, night: false, intervalHours: 24 },
  commonSideEffects: ["headache"],
  missedDoseRule: "Take when remembered",
  riskLevel: "low",
  maxDurationDays: 90
},
{
  name: "Vitamin C",
  avoidConditions: ["kidney stones"],
  avoidWith: [],
  foodRule: { type: "any", items: [] },
  timingRules: { morning: true, night: false, intervalHours: 24 },
  commonSideEffects: ["stomach upset"],
  missedDoseRule: "Skip missed dose",
  riskLevel: "low",
  maxDurationDays: 30
},
{
  name: "Multivitamin",
  avoidConditions: [],
  avoidWith: ["iron supplements"],
  foodRule: { type: "required", items: ["food"] },
  timingRules: { morning: true, night: false, intervalHours: 24 },
  commonSideEffects: ["nausea"],
  missedDoseRule: "Skip missed dose",
  riskLevel: "low",
  maxDurationDays: 90
},
{
  name: "Zinc Sulfate",
  avoidConditions: [],
  avoidWith: ["antibiotics"],
  foodRule: { type: "required", items: ["food"] },
  timingRules: { morning: true, night: false, intervalHours: 24 },
  commonSideEffects: ["metallic taste"],
  missedDoseRule: "Skip missed dose",
  riskLevel: "low",
  maxDurationDays: 14
},
{
  name: "Magnesium",
  avoidConditions: ["kidney disease"],
  avoidWith: [],
  foodRule: { type: "any", items: [] },
  timingRules: { morning: false, night: true, intervalHours: 24 },
  commonSideEffects: ["diarrhea"],
  missedDoseRule: "Skip missed dose",
  riskLevel: "low",
  maxDurationDays: 30
},
{
  name: "Omega 3 Fatty Acids",
  avoidConditions: ["bleeding disorder"],
  avoidWith: ["blood thinners"],
  foodRule: { type: "required", items: ["food"] },
  timingRules: { morning: true, night: false, intervalHours: 24 },
  commonSideEffects: ["fishy burps"],
  missedDoseRule: "Skip missed dose",
  riskLevel: "low",
  maxDurationDays: 90
},
{
  name: "Calcium + Vitamin D",
  avoidConditions: ["kidney stones"],
  avoidWith: ["iron supplements"],
  foodRule: { type: "required", items: ["food"] },
  timingRules: { morning: true, night: false, intervalHours: 24 },
  commonSideEffects: ["constipation"],
  missedDoseRule: "Skip missed dose",
  riskLevel: "low",
  maxDurationDays: 90
},
{
  name: "Biotin",
  avoidConditions: [],
  avoidWith: [],
  foodRule: { type: "any", items: [] },
  timingRules: { morning: true, night: false, intervalHours: 24 },
  commonSideEffects: ["acne"],
  missedDoseRule: "Skip missed dose",
  riskLevel: "low",
  maxDurationDays: 60
},
{
  name: "Probiotic",
  avoidConditions: ["severely immunocompromised"],
  avoidWith: [],
  foodRule: { type: "any", items: [] },
  timingRules: { morning: true, night: false, intervalHours: 24 },
  commonSideEffects: ["bloating"],
  missedDoseRule: "Skip missed dose",
  riskLevel: "low",
  maxDurationDays: 14
},
{
  name: "Carbimazole",
  avoidConditions: ["liver disease"],
  avoidWith: [],
  foodRule: { type: "any", items: [] },
  timingRules: { morning: true, night: true, intervalHours: 12 },
  commonSideEffects: ["rash"],
  missedDoseRule: "Take when remembered",
  riskLevel: "high",
  maxDurationDays: 60
},
{
  name: "Methimazole",
  avoidConditions: ["pregnancy (first trimester)"],
  avoidWith: [],
  foodRule: { type: "any", items: [] },
  timingRules: { morning: true, night: true, intervalHours: 12 },
  commonSideEffects: ["itching"],
  missedDoseRule: "Skip missed dose",
  riskLevel: "high",
  maxDurationDays: 60
},
{
  name: "Propylthiouracil",
  avoidConditions: ["liver disease"],
  avoidWith: [],
  foodRule: { type: "any", items: [] },
  timingRules: { morning: true, night: true, intervalHours: 8 },
  commonSideEffects: ["nausea"],
  missedDoseRule: "Skip missed dose",
  riskLevel: "high",
  maxDurationDays: 60
},
{
  name: "Iodine Supplement",
  avoidConditions: ["hyperthyroidism"],
  avoidWith: [],
  foodRule: { type: "any", items: [] },
  timingRules: { morning: true, night: false, intervalHours: 24 },
  commonSideEffects: ["metallic taste"],
  missedDoseRule: "Skip missed dose",
  riskLevel: "medium",
  maxDurationDays: 30
},
{
  name: "Selenium",
  avoidConditions: [],
  avoidWith: [],
  foodRule: { type: "any", items: [] },
  timingRules: { morning: true, night: false, intervalHours: 24 },
  commonSideEffects: ["hair loss (excess use)"],
  missedDoseRule: "Skip missed dose",
  riskLevel: "low",
  maxDurationDays: 60
},
{
  name: "Liothyronine",
  avoidConditions: ["heart disease"],
  avoidWith: ["beta blockers"],
  foodRule: { type: "required", items: ["empty stomach"] },
  timingRules: { morning: true, night: false, intervalHours: 24 },
  commonSideEffects: ["palpitations"],
  missedDoseRule: "Skip missed dose",
  riskLevel: "high",
  maxDurationDays: 30
}















];



await MedicineRule.insertMany(data);
console.log("Medicine rules seeded");

process.exit();
