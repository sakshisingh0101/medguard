import mongoose from "mongoose";
import dotenv from "dotenv";
import { MedicineRule } from "../models/medicinesrule.models.js";
import { db_name } from "../constants.js";

dotenv.config();

await mongoose.connect(`${process.env.MONGODB_URL}/${db_name}`);
const data = [
  {
  name: "Paracetamol",
  purpose: "Pain relief and fever reduction",
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
  purpose: "Pain, inflammation, and fever relief",
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
  purpose: "Treatment of bacterial infections",
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
  purpose: "Relief of allergy symptoms",
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
  purpose: "Treatment of bacterial infections",
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
  purpose: "Treatment of bacterial and acne-related infections",
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
  purpose: "Reduction of stomach acid and treatment of GERD",
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
  purpose: "Reduction of stomach acid and ulcer treatment",
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
  purpose: "Lowering cholesterol levels",
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
  purpose: "Control of blood sugar in type 2 diabetes",
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
  purpose: "Pain relief and fever reduction",
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
  purpose: "Pain and inflammation relief",
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
  purpose: "Pain and inflammation relief",
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
  purpose: "Relief of allergy and cold symptoms",
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
  purpose: "Suppression of dry cough",
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
  purpose: "Mucus thinning and cough relief",
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
  purpose: "Reduction of stomach acid",
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
  purpose: "Relief from nausea and vomiting",
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
  purpose: "Treatment of stomach and duodenal ulcers",
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
  purpose: "Treatment of high blood pressure",
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
  purpose: "Treatment of high blood pressure and heart failure",
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
  purpose: "Control of blood sugar in type 2 diabetes",
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
  purpose: "Blood sugar control in type 2 diabetes",
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
  purpose: "Treatment of bacterial infections",
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
  purpose: "Treatment of bacterial infections",
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
  purpose: "Prevention and treatment of folate deficiency",
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
  purpose: "Treatment of iron deficiency anemia",
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
  purpose: "Calcium supplementation for bone health",
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
  purpose: "Relief of bronchospasm in asthma",
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
  purpose: "Prevention of asthma and allergy symptoms",
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
  purpose: "Treatment of hypothyroidism",
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
  purpose: "Prevention of nausea and vomiting",
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
  purpose: "Treatment of anxiety and seizure disorders",
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
  purpose: "Treatment of depression and anxiety disorders",
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
  purpose: "Treatment of urinary tract infections",
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
  purpose: "Vitamin D supplementation for bone health",
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
  purpose: "Treatment of vitamin B12 deficiency",
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
  purpose: "Vitamin C supplementation and immune support",
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
  purpose: "General vitamin and mineral supplementation",
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
  purpose: "Zinc supplementation and immune support",
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
  purpose: "Magnesium supplementation and muscle support",
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
  purpose: "Heart and brain health support",
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
  purpose: "Bone strength and osteoporosis prevention",
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
  purpose: "Support for hair, skin, and nail health",
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
  purpose: "Gut health and digestion support",
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
  purpose: "Treatment of hyperthyroidism",
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
  purpose: "Treatment of hyperthyroidism",
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
  purpose: "Treatment of hyperthyroidism",
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
  purpose: "Support of thyroid hormone production",
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
  purpose: "Antioxidant and thyroid support",
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
  purpose: "Treatment of hypothyroidism",
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
