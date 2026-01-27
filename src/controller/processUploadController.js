// import { MedicineRule } from "../models/medicinesrule.models.js";
// import { Prescription } from "../models/prescription.models.js";
// import { generateActionPlan } from "../utils/ruleEngine.service.js";
// import { ApiResponse } from "../utils/ApiResponse.js";
// import { asyncHandler } from "../utils/asyncHandler.js";


// /**
//  * Check if last prescription is expired
//  */
// const isPrescriptionExpired = (prescription) => {
//   if (!prescription) return true;

//   let maxDays = 0;

//   for (const med of prescription.medicines) {
//     const days = Number(med.durationDays || 0);
//     if (days > maxDays) maxDays = days;
//   }

//   const expiryDate = new Date(
//     new Date(prescription.prescriptionDate).getTime() +
//       maxDays * 24 * 60 * 60 * 1000
//   );

//   return expiryDate < new Date();
// };

// /**
//  * MEDICINE upload flow
//  * → check rules
//  * → check prescription continuity
//  */
// const handleMedicineUpload = async (structured, user) => {
//   const resultMedicines = [];

//   const lastPrescription = await Prescription.findOne({ user: user._id })
//     .sort({ createdAt: -1 });

//   const isOldPrescription = isPrescriptionExpired(lastPrescription);

//   for (const med of structured.medicines) {
//     const rule = await MedicineRule.findOne({
//       name: new RegExp(`^${med.name}$`, "i")
//     });

//     const actionPlan = generateActionPlan(med, user);
//     const warnings = [];

//     // 🔹 No active prescription
//     if (isOldPrescription) {
//       warnings.push({
//         level: "info",
//         message_en: "No active prescription found. Please confirm with doctor.",
//         message_hi: "कोई सक्रिय प्रिस्क्रिप्शन नहीं मिला। डॉक्टर से पुष्टि करें।"
//       });
//     }

//     // 🔹 Duration rule
//     if (rule?.maxDurationDays && med.durationDays > rule.maxDurationDays) {
//       warnings.push({
//         level: "warning",
//         message_en: `Do not take for more than ${rule.maxDurationDays} days without doctor advice`,
//         message_hi: `${rule.maxDurationDays} दिनों से अधिक बिना डॉक्टर की सलाह के न लें`
//       });
//     }

//     // 🔹 Condition conflict
//     if (rule?.avoidConditions?.some(c => user.conditions?.includes(c))) {
//       warnings.push({
//         level: "danger",
//         message_en: "This medicine may not be safe for your condition",
//         message_hi: "यह दवा आपकी स्थिति के लिए सुरक्षित नहीं हो सकती"
//       });
//       actionPlan.riskLevel = "high";
//     }

//     resultMedicines.push({
//       name: med.name,
//       dosage: med.dosage,
//       schedule: actionPlan.schedule,
//       purpose: actionPlan.purpose,
//       riskLevel: actionPlan.riskLevel,
//       warnings
//     });
//   }

//   return {
//     type: "medicine_to_actionable_plan",
//     confidence: structured.confidence,
//     medicines: resultMedicines
//   };
// };

// /**
//  * PRESCRIPTION upload flow
//  * → save prescription
//  * → generate actionable plan
//  */
// const handlePrescriptionUpload = async (structured, user) => {
//   const resultMedicines = [];

//   const lastPrescription = await Prescription.findOne({ user: user._id })
//     .sort({ createdAt: -1 });

//   const isOldPrescription = isPrescriptionExpired(lastPrescription);

//   // 🔹 Save new prescription as ground truth
//   await Prescription.create({
//     user: user._id,
//     prescriptionDate: new Date(),
//     medicines: structured.medicines
//   });

//   for (const med of structured.medicines) {
//     const rule = await MedicineRule.findOne({
//       name: new RegExp(`^${med.name}$`, "i")
//     });

//     const actionPlan = generateActionPlan(med, user);
//     const warnings = [];

//     // 🔹 Overwriting previous prescription
//     if (!isOldPrescription && lastPrescription) {
//       warnings.push({
//         level: "info",
//         message_en: "This prescription replaces your previous one",
//         message_hi: "यह प्रिस्क्रिप्शन आपकी पिछली प्रिस्क्रिप्शन को बदल देता है"
//       });
//     }

//     // 🔹 Condition awareness
//     if (rule?.avoidConditions?.some(c => user.conditions?.includes(c))) {
//       warnings.push({
//         level: "danger",
//         message_en: "Doctor should be informed about this condition",
//         message_hi: "डॉक्टर को इस स्थिति के बारे में बताएं"
//       });
//       actionPlan.riskLevel = "medium";
//     }

//     // 🔹 Food rule
//     if (rule?.foodRule === "empty") {
//       actionPlan.schedule.forEach(s => {
//         s.message_en = "Take this medicine on an empty stomach";
//         s.message_hi = "यह दवा खाली पेट लें";
//       });
//     }

//     resultMedicines.push({
//       name: med.name,
//       dosage: med.dosage,
//       schedule: actionPlan.schedule,
//       purpose: actionPlan.purpose,
//       riskLevel: actionPlan.riskLevel,
//       warnings
//     });
//   }

//   return {
//     type: "prescription_to_actionable_plan",
//     confidence: structured.confidence,
//     medicines: resultMedicines
//   };
// };

// /**
//  * MAIN entry
//  */
// export const processStructuredResultController = asyncHandler(async (req, res) => {
//   const user = req.user; //  get user from JWT middleware
//   const { userContext, document } = req.body;

//   if (!user) {
//     return res.status(401).json(new ApiResponse(401, "User not authenticated", null));
//   }

//   if (!document || !document.type) {
//     return res.status(400).json(new ApiResponse(400, "Invalid structured data", null));
//   }

//   // Merge frontend userContext into DB user for Rule Engine
//   const enrichedUser = {
//     ...user.toObject(),
//     ...userContext
//   };

//   let result;

//   if (document.type === "MEDICINE") {
//     result = await handleMedicineUpload(document, enrichedUser);
//   } else if (document.type === "PRESCRIPTION") {
//     result = await handlePrescriptionUpload(document, enrichedUser);
//   } else {
//     return res.status(400).json(new ApiResponse(400, "Unknown structured type", null));
//   }

//   // Return structured response same as your other routes
//   return res.status(201).json(new ApiResponse(201, "Structured data processed successfully", result));
// });






import { MedicineRule } from "../models/medicinesrule.models.js";
import { Prescription } from "../models/prescription.models.js";
import { generateActionPlan } from "../utils/ruleEngine.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/* ----------------- HELPERS ----------------- */

const normalizeMedicineName = (name = "") =>
  name
    .toLowerCase()
    .replace(/hydrochloride|hcl|tablet|capsule|mg|ml|ip/g, "")
    .replace(/\s+/g, " ")
    .trim();

const isPrescriptionExpired = (prescription) => {
  if (!prescription) return true;

  let maxDays = 0;
  for (const med of prescription.medicines) {
    maxDays = Math.max(maxDays, Number(med.durationDays || 0));
  }

  const expiryDate =
    new Date(prescription.prescriptionDate).getTime() +
    maxDays * 24 * 60 * 60 * 1000;

  return expiryDate < Date.now();
};

/* ----------------- RULE FETCH ----------------- */

const fetchMedicineRulesMap = async (medicineNames) => {
  const rules = await MedicineRule.find({
    name: {
      $in: medicineNames.map(
        n => new RegExp(`^${n}$`, "i")
      )
    }
  });

  const map = new Map();
  rules.forEach(rule => {
    map.set(normalizeMedicineName(rule.name), rule);
  });

  return map;
};

/* ----------------- CORE ENGINE ----------------- */

const evaluateMedicine = ({
  medicine,
  rule,
  user,
  hasActivePrescription,
  isPrescriptionFlow
}) => {
  const actionPlan = generateActionPlan(medicine, rule);
  const warnings = [];

  if (!hasActivePrescription && !isPrescriptionFlow) {
    warnings.push({
      level: "info",
      message_en: "No active prescription found. Please confirm with doctor.",
      message_hi: "कोई सक्रिय प्रिस्क्रिप्शन नहीं मिला। डॉक्टर से पुष्टि करें।"
    });
  }

  if (rule?.maxDurationDays && medicine.durationDays > rule.maxDurationDays) {
    warnings.push({
      level: "warning",
      message_en: `Do not take for more than ${rule.maxDurationDays} days without doctor advice`,
      message_hi: `${rule.maxDurationDays} दिनों से अधिक बिना डॉक्टर की सलाह के न लें`
    });
  }

  if (rule?.avoidConditions?.some(c => user.conditions?.includes(c))) {
    warnings.push({
      level: "danger",
      message_en: isPrescriptionFlow
        ? "Doctor should be informed about this condition"
        : "This medicine may not be safe for your condition",
      message_hi: isPrescriptionFlow
        ? "डॉक्टर को इस स्थिति के बारे में बताएं"
        : "यह दवा आपकी स्थिति के लिए सुरक्षित नहीं हो सकती"
    });

    actionPlan.riskLevel = isPrescriptionFlow ? "medium" : "high";
  }

  return {
    name: medicine.name,
    dosage: medicine.dosage,
    schedule: actionPlan.schedule,
    purpose: actionPlan.purpose,
    riskLevel: actionPlan.riskLevel,
    warnings
  };
};

/* ----------------- PROCESSOR ----------------- */

const processMedicines = async ({
  medicines,
  user,
  hasActivePrescription,
  isPrescriptionFlow
}) => {
  const normalizedNames = medicines.map(m =>
    normalizeMedicineName(m.name)
  );

  const ruleMap = await fetchMedicineRulesMap(normalizedNames);

  return medicines.map(med =>
    evaluateMedicine({
      medicine: med,
      rule: ruleMap.get(normalizeMedicineName(med.name)),
      user,
      hasActivePrescription,
      isPrescriptionFlow
    })
  );
};

/* ----------------- FLOWS ----------------- */

const handleMedicineUpload = async (structured, user) => {
  const lastPrescription = await Prescription.findOne({ user: user._id })
    .sort({ createdAt: -1 });

  return {
    type: "medicine_to_actionable_plan",
    confidence: structured.confidence,
    medicines: await processMedicines({
      medicines: structured.medicines,
      user,
      hasActivePrescription: !isPrescriptionExpired(lastPrescription),
      isPrescriptionFlow: false
    })
  };
};

const handlePrescriptionUpload = async (structured, user) => {
  const lastPrescription = await Prescription.findOne({ user: user._id })
    .sort({ createdAt: -1 });

  await Prescription.create({
    user: user._id,
    prescriptionDate: new Date(),
    medicines: structured.medicines
  });

  return {
    type: "prescription_to_actionable_plan",
    confidence: structured.confidence,
    medicines: await processMedicines({
      medicines: structured.medicines,
      user,
      hasActivePrescription: !isPrescriptionExpired(lastPrescription),
      isPrescriptionFlow: true
    })
  };
};

/* ----------------- CONTROLLER ----------------- */

export const processStructuredResultController = asyncHandler(async (req, res) => {
  const { userContext, document } = req.body;

  if (!req.user || !document?.type) {
    return res
      .status(400)
      .json(new ApiResponse(400, "Invalid request", null));
  }

  const enrichedUser = {
    ...req.user.toObject(),
    ...userContext
  };

  const result =
    document.type === "MEDICINE"
      ? await handleMedicineUpload(document, enrichedUser)
      : document.type === "PRESCRIPTION"
      ? await handlePrescriptionUpload(document, enrichedUser)
      : null;

  if (!result) {
    return res
      .status(400)
      .json(new ApiResponse(400, "Unknown structured type", null));
  }

  res
    .status(201)
    .json(new ApiResponse(201, "Structured data processed successfully", result));
});
