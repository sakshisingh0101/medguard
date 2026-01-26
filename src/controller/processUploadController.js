import { MedicineRule } from "../models/medicineRule.model.js";
import { Prescription } from "../models/prescription.model.js";
import { generateActionPlan } from "../utils/generateActionPlan.js";

/**
 * Check if last prescription is expired
 */
const isPrescriptionExpired = (prescription) => {
  if (!prescription) return true;

  let maxDays = 0;

  for (const med of prescription.medicines) {
    const days = Number(med.durationDays || 0);
    if (days > maxDays) maxDays = days;
  }

  const expiryDate = new Date(
    new Date(prescription.prescriptionDate).getTime() +
      maxDays * 24 * 60 * 60 * 1000
  );

  return expiryDate < new Date();
};

/**
 * MEDICINE upload flow
 * → check rules
 * → check prescription continuity
 */
const handleMedicineUpload = async (structured, user) => {
  const resultMedicines = [];

  const lastPrescription = await Prescription.findOne({ user: user._id })
    .sort({ createdAt: -1 });

  const isOldPrescription = isPrescriptionExpired(lastPrescription);

  for (const med of structured.medicines) {
    const rule = await MedicineRule.findOne({
      name: new RegExp(`^${med.name}$`, "i")
    });

    const actionPlan = generateActionPlan(med, user);
    const warnings = [];

    // 🔹 No active prescription
    if (isOldPrescription) {
      warnings.push({
        level: "info",
        message_en: "No active prescription found. Please confirm with doctor.",
        message_hi: "कोई सक्रिय प्रिस्क्रिप्शन नहीं मिला। डॉक्टर से पुष्टि करें।"
      });
    }

    // 🔹 Duration rule
    if (rule?.maxDurationDays && med.durationDays > rule.maxDurationDays) {
      warnings.push({
        level: "warning",
        message_en: `Do not take for more than ${rule.maxDurationDays} days without doctor advice`,
        message_hi: `${rule.maxDurationDays} दिनों से अधिक बिना डॉक्टर की सलाह के न लें`
      });
    }

    // 🔹 Condition conflict
    if (rule?.avoidConditions?.some(c => user.conditions?.includes(c))) {
      warnings.push({
        level: "danger",
        message_en: "This medicine may not be safe for your condition",
        message_hi: "यह दवा आपकी स्थिति के लिए सुरक्षित नहीं हो सकती"
      });
      actionPlan.riskLevel = "high";
    }

    resultMedicines.push({
      name: med.name,
      dosage: med.dosage,
      schedule: actionPlan.schedule,
      purpose: actionPlan.purpose,
      riskLevel: actionPlan.riskLevel,
      warnings
    });
  }

  return {
    type: "medicine_to_actionable_plan",
    confidence: structured.confidence,
    medicines: resultMedicines
  };
};

/**
 * PRESCRIPTION upload flow
 * → save prescription
 * → generate actionable plan
 */
const handlePrescriptionUpload = async (structured, user) => {
  const resultMedicines = [];

  const lastPrescription = await Prescription.findOne({ user: user._id })
    .sort({ createdAt: -1 });

  const isOldPrescription = isPrescriptionExpired(lastPrescription);

  // 🔹 Save new prescription as ground truth
  await Prescription.create({
    user: user._id,
    prescriptionDate: new Date(),
    medicines: structured.medicines
  });

  for (const med of structured.medicines) {
    const rule = await MedicineRule.findOne({
      name: new RegExp(`^${med.name}$`, "i")
    });

    const actionPlan = generateActionPlan(med, user);
    const warnings = [];

    // 🔹 Overwriting previous prescription
    if (!isOldPrescription && lastPrescription) {
      warnings.push({
        level: "info",
        message_en: "This prescription replaces your previous one",
        message_hi: "यह प्रिस्क्रिप्शन आपकी पिछली प्रिस्क्रिप्शन को बदल देता है"
      });
    }

    // 🔹 Condition awareness
    if (rule?.avoidConditions?.some(c => user.conditions?.includes(c))) {
      warnings.push({
        level: "danger",
        message_en: "Doctor should be informed about this condition",
        message_hi: "डॉक्टर को इस स्थिति के बारे में बताएं"
      });
      actionPlan.riskLevel = "medium";
    }

    // 🔹 Food rule
    if (rule?.foodRule === "empty") {
      actionPlan.schedule.forEach(s => {
        s.message_en = "Take this medicine on an empty stomach";
        s.message_hi = "यह दवा खाली पेट लें";
      });
    }

    resultMedicines.push({
      name: med.name,
      dosage: med.dosage,
      schedule: actionPlan.schedule,
      purpose: actionPlan.purpose,
      riskLevel: actionPlan.riskLevel,
      warnings
    });
  }

  return {
    type: "prescription_to_actionable_plan",
    confidence: structured.confidence,
    medicines: resultMedicines
  };
};

/**
 * MAIN entry
 */
export const processStructuredResult = async (structured, user) => {
  if (!structured || !structured.type) {
    throw new Error("Invalid structured data");
  }

  if (structured.type === "MEDICINE") {
    return await handleMedicineUpload(structured, user);
  }

  if (structured.type === "PRESCRIPTION") {
    return await handlePrescriptionUpload(structured, user);
  }

  return {
    type: "unknown",
    confidence: "low",
    medicines: []
  };
};
