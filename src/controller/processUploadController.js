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






// import { MedicineRule } from "../models/medicinesrule.models.js";
// import { Prescription } from "../models/prescription.models.js";
// import { generateActionPlan } from "../utils/ruleEngine.service.js";
// import { ApiResponse } from "../utils/ApiResponse.js";
// import { asyncHandler } from "../utils/asyncHandler.js";

// /* ----------------- HELPERS ----------------- */

// const normalizeMedicineName = (name = "") =>
//   name
//     .toLowerCase()
//     .replace(/hydrochloride|hcl|tablet|capsule|mg|ml|ip/g, "")
//     .replace(/\s+/g, " ")
//     .trim();

// const isPrescriptionExpired = (prescription) => {
//   if (!prescription) return true;

//   let maxDays = 0;
//   for (const med of prescription.medicines) {
//     maxDays = Math.max(maxDays, Number(med.durationDays || 0));
//   }

//   const expiryDate =
//     new Date(prescription.prescriptionDate).getTime() +
//     maxDays * 24 * 60 * 60 * 1000;

//   return expiryDate < Date.now();
// };

// /* ----------------- RULE FETCH ----------------- */

// const fetchMedicineRulesMap = async (medicineNames) => {
//   const rules = await MedicineRule.find({
//     name: {
//       $in: medicineNames.map(
//         n => new RegExp(`^${n}$`, "i")
//       )
//     }
//   });

//   const map = new Map();
//   rules.forEach(rule => {
//     map.set(normalizeMedicineName(rule.name), rule);
//   });

//   return map;
// };

// /* ----------------- CORE ENGINE ----------------- */

// const evaluateMedicine = ({
//   medicine,
//   rule,
//   user,
//   hasActivePrescription,
//   isPrescriptionFlow
// }) => {
//   const actionPlan = generateActionPlan(medicine, rule);
//   const warnings = [];

//   if (!hasActivePrescription && !isPrescriptionFlow) {
//     warnings.push({
//       level: "info",
//       message_en: "No active prescription found. Please confirm with doctor.",
//       message_hi: "कोई सक्रिय प्रिस्क्रिप्शन नहीं मिला। डॉक्टर से पुष्टि करें।"
//     });
//   }

//   if (rule?.maxDurationDays && medicine.durationDays > rule.maxDurationDays) {
//     warnings.push({
//       level: "warning",
//       message_en: `Do not take for more than ${rule.maxDurationDays} days without doctor advice`,
//       message_hi: `${rule.maxDurationDays} दिनों से अधिक बिना डॉक्टर की सलाह के न लें`
//     });
//   }

//   if (rule?.avoidConditions?.some(c => user.conditions?.includes(c))) {
//     warnings.push({
//       level: "danger",
//       message_en: isPrescriptionFlow
//         ? "Doctor should be informed about this condition"
//         : "This medicine may not be safe for your condition",
//       message_hi: isPrescriptionFlow
//         ? "डॉक्टर को इस स्थिति के बारे में बताएं"
//         : "यह दवा आपकी स्थिति के लिए सुरक्षित नहीं हो सकती"
//     });

//     actionPlan.riskLevel = isPrescriptionFlow ? "medium" : "high";
//   }

//   return {
//     name: medicine.name,
//     dosage: medicine.dosage,
//     schedule: actionPlan.schedule,
//     purpose: actionPlan.purpose,
//     riskLevel: actionPlan.riskLevel,
//     warnings,
//     hasActivePrescription,
//     isPrescriptionFlow
    
//   };
// };

// /* ----------------- PROCESSOR ----------------- */

// const processMedicines = async ({
//   medicines,
//   user,
//   hasActivePrescription,
//   isPrescriptionFlow
// }) => {
//   const normalizedNames = medicines.map(m =>
//     normalizeMedicineName(m.name)
//   );

//   const ruleMap = await fetchMedicineRulesMap(normalizedNames);

//   return medicines.map(med =>
//     evaluateMedicine({
//       medicine: med,
//       rule: ruleMap.get(normalizeMedicineName(med.name)),
//       user,
//       hasActivePrescription,
//       isPrescriptionFlow
//     })
//   );
// };

// /* ----------------- FLOWS ----------------- */

// const handleMedicineUpload = async (structured, user) => {
//   const lastPrescription = await Prescription.findOne({ user: user._id })
//     .sort({ createdAt: -1 });

//   return {
//     type: "medicine_to_actionable_plan",
//     confidence: structured.confidence,
//     medicines: await processMedicines({
//       medicines: structured.medicines,
//       user,
//       hasActivePrescription: !isPrescriptionExpired(lastPrescription),
//       isPrescriptionFlow: false
//     })
//   };
// };

// const handlePrescriptionUpload = async (structured, user) => {
//   const lastPrescription = await Prescription.findOne({ user: user._id })
//     .sort({ createdAt: -1 });

//   await Prescription.create({
//     user: user._id,
//     prescriptionDate: new Date(),
//     medicines: structured.medicines
//   });

//   return {
//     type: "prescription_to_actionable_plan",
//     confidence: structured.confidence,
//     medicines: await processMedicines({
//       medicines: structured.medicines,
//       user,
//       hasActivePrescription: !isPrescriptionExpired(lastPrescription),
//       isPrescriptionFlow: true
//     })
//   };
// };

// /* ----------------- CONTROLLER ----------------- */

// export const processStructuredResultController = asyncHandler(async (req, res) => {
//   const { userContext, document } = req.body;

//   if (!req.user || !document?.type) {
//     return res
//       .status(400)
//       .json(new ApiResponse(400, "Invalid request", null));
//   }

//   const enrichedUser = {
//     ...req.user.toObject(),
//     ...userContext
//   };

//   const result =
//     document.type === "MEDICINE"
//       ? await handleMedicineUpload(document, enrichedUser)
//       : document.type === "PRESCRIPTION"
//       ? await handlePrescriptionUpload(document, enrichedUser)
//       : null;

//   if (!result) {
//     return res
//       .status(400)
//       .json(new ApiResponse(400, "Unknown structured type", null));
//   }

//   res
//     .status(201)
//     .json(new ApiResponse(201, "Structured data processed successfully", result));
// });
// import { MedicineRule } from "../models/medicinesrule.models.js";
// import { Prescription } from "../models/prescription.models.js";
// import { generateActionPlan } from "../utils/ruleEngine.service.js";
// import { ApiResponse } from "../utils/ApiResponse.js";
// import { asyncHandler } from "../utils/asyncHandler.js";

// /* ----------------- HELPERS ----------------- */

// const normalizeMedicineName = (name = "") =>
//   name
//     .toLowerCase()
//     .replace(/hydrochloride|hcl|tablet|capsule|mg|ml|ip/g, "")
//     .replace(/\s+/g, " ")
//     .trim();

// const isPrescriptionExpired = (prescription) => {
//   if (!prescription) return true;

//   let maxDays = 0;
//   for (const med of prescription.medicines) {
//     maxDays = Math.max(maxDays, Number(med.durationDays || 0));
//   }

//   const expiryDate =
//     new Date(prescription.prescriptionDate).getTime() +
//     maxDays * 24 * 60 * 60 * 1000;

//   return expiryDate < Date.now();
// };

// /* ----------------- RULE FETCH (FUZZY) ----------------- */

// const fetchMedicineRulesMap = async (medicineNames) => {
//   const rules = await MedicineRule.find({});
//   const map = new Map();

//   for (const rawName of medicineNames) {
//     const normalizedInput = normalizeMedicineName(rawName);

//     const matchedRule = rules.find(rule => {
//       const normalizedRule = normalizeMedicineName(rule.name);
//       return normalizedInput.includes(normalizedRule);
//     });

//     if (matchedRule) {
//       map.set(normalizedInput, matchedRule);
//     }
//   }

//   return map;
// };

// /* ----------------- CONFIDENCE ----------------- */

// const calculateConfidence = ({
//   ruleMatched,
//   hasActivePrescription,
//   medicine,
//   ocrConfidence = 1
// }) => {
//   let score = 0.15;

//   if (ruleMatched) score += 0.35;
//   if (hasActivePrescription) score += 0.25;
//   if (medicine.dosage && medicine.frequency) score += 0.15;

//   score *= ocrConfidence;

//   return Math.min(1, Number(score.toFixed(2)));
// };

// /* ----------------- CORE ENGINE ----------------- */

// const evaluateMedicine = ({
//   medicine,
//   rule,
//   user,
//   hasActivePrescription,
//   isPrescriptionFlow,
//   ocrConfidence
// }) => {
//   const ruleMatched = Boolean(rule);
//   const actionPlan = generateActionPlan(medicine, rule);

//   const warnings = [];
//   let fallbackReason = null;

//   if (!ruleMatched) {
//     fallbackReason = "NO_DB_RULE_MATCH";
//     warnings.push({
//       level: "info",
//       message_en: "Medicine not found in database. General guidance applied.",
//       message_hi: "दवा डेटाबेस में नहीं मिली। सामान्य मार्गदर्शन लागू किया गया।"
//     });
//   }

//   if (!hasActivePrescription && !isPrescriptionFlow) {
//     warnings.push({
//       level: "info",
//       message_en: "No active prescription found. Please confirm with doctor.",
//       message_hi: "कोई सक्रिय प्रिस्क्रिप्शन नहीं मिला। डॉक्टर से पुष्टि करें।"
//     });
//   }

//   if (rule?.avoidConditions?.some(c => user.conditions?.includes(c))) {
//     warnings.push({
//       level: "danger",
//       message_en: "This medicine may not be safe for your condition.",
//       message_hi: "यह दवा आपकी स्थिति के लिए सुरक्षित नहीं हो सकती।"
//     });

//     actionPlan.riskLevel = "high";
//   }

//   return {
//     name: medicine.name,
//     dosage: medicine.dosage,
//     schedule: actionPlan.schedule,

//     purpose: rule?.purpose || "general",
//     riskLevel: actionPlan.riskLevel,

//     confidence: calculateConfidence({
//       ruleMatched,
//       hasActivePrescription,
//       medicine,
//       ocrConfidence
//     }),

//     ruleMatched,
//     fallbackReason,
//     warnings,
//     hasActivePrescription,
//     isPrescriptionFlow
//   };
// };

// /* ----------------- PROCESSOR ----------------- */

// const processMedicines = async ({
//   medicines,
//   user,
//   hasActivePrescription,
//   isPrescriptionFlow,
//   ocrConfidence
// }) => {
//   const normalizedNames = medicines.map(m =>
//     normalizeMedicineName(m.name)
//   );

//   const ruleMap = await fetchMedicineRulesMap(normalizedNames);

//   return medicines.map(med =>
//     evaluateMedicine({
//       medicine: med,
//       rule: ruleMap.get(normalizeMedicineName(med.name)),
//       user,
//       hasActivePrescription,
//       isPrescriptionFlow,
//       ocrConfidence
//     })
//   );
// };

// /* ----------------- FLOWS ----------------- */

// const handleMedicineUpload = async (structured, user) => {
//   const lastPrescription = await Prescription.findOne({ user: user._id })
//     .sort({ createdAt: -1 });

//   return {
//     type: "medicine_to_actionable_plan",
//     confidence: structured.confidence,
//     medicines: await processMedicines({
//       medicines: structured.medicines,
//       user,
//       hasActivePrescription: !isPrescriptionExpired(lastPrescription),
//       isPrescriptionFlow: false,
//       ocrConfidence: structured.confidence
//     })
//   };
// };

// const handlePrescriptionUpload = async (structured, user) => {
//   const lastPrescription = await Prescription.findOne({ user: user._id })
//     .sort({ createdAt: -1 });

//   await Prescription.create({
//     user: user._id,
//     prescriptionDate: new Date(),
//     medicines: structured.medicines
//   });

//   return {
//     type: "prescription_to_actionable_plan",
//     confidence: structured.confidence,
//     medicines: await processMedicines({
//       medicines: structured.medicines,
//       user,
//       hasActivePrescription: !isPrescriptionExpired(lastPrescription),
//       isPrescriptionFlow: true,
//       ocrConfidence: structured.confidence
//     })
//   };
// };

// /* ----------------- CONTROLLER ----------------- */

// export const processStructuredResultController = asyncHandler(async (req, res) => {
//   const { userContext, document } = req.body;

//   if (!req.user || !document?.type) {
//     return res
//       .status(400)
//       .json(new ApiResponse(400, "Invalid request", null));
//   }

//   const enrichedUser = {
//     ...req.user.toObject(),
//     ...userContext
//   };

//   const result =
//     document.type === "MEDICINE"
//       ? await handleMedicineUpload(document, enrichedUser)
//       : document.type === "PRESCRIPTION"
//       ? await handlePrescriptionUpload(document, enrichedUser)
//       : null;

//   if (!result) {
//     return res
//       .status(400)
//       .json(new ApiResponse(400, "Unknown structured type", null));
//   }

//   res
//     .status(201)
//     .json(new ApiResponse(201, "Structured data processed successfully", result));
// });



// import { MedicineRule } from "../models/medicinesrule.models.js";
// import { Prescription } from "../models/prescription.models.js";
// import { generateActionPlan } from "../utils/ruleEngine.service.js";
// import { ApiResponse } from "../utils/ApiResponse.js";
// import { asyncHandler } from "../utils/asyncHandler.js";

// /* ----------------- HELPERS ----------------- */

// const normalizeMedicineName = (name = "") =>
//   name
//     .toLowerCase()
//     .replace(/hydrochloride|hcl|tablet|capsule|mg|ml|ip/g, "")
//     .replace(/\s+/g, " ")
//     .trim();

// /* 
// Truthful expiry logic:
// - If duration missing → expiry UNKNOWN (not expired)
// - Never fake precision
// */
// const getPrescriptionStatus = (prescription) => {
//   if (!prescription) return "NONE";

//   let maxDays = 0;
//   let hasDuration = false;

//   for (const med of prescription.medicines) {
//     if (med.durationDays) {
//       hasDuration = true;
//       maxDays = Math.max(maxDays, Number(med.durationDays));
//     }
//   }

//   if (!hasDuration) return "UNKNOWN";

//   const expiryDate =
//     new Date(prescription.prescriptionDate).getTime() +
//     maxDays * 24 * 60 * 60 * 1000;

//   return expiryDate < Date.now() ? "EXPIRED" : "ACTIVE";
// };

// /* ----------------- FUZZY RULE FETCH ----------------- */

// const fetchMedicineRulesMap = async (medicineNames) => {
//   const rules = await MedicineRule.find({});
//   const map = new Map();

//   for (const raw of medicineNames) {
//     const input = normalizeMedicineName(raw);

//     const matched = rules.find(rule => {
//       const ruleName = normalizeMedicineName(rule.name);
//       return input.includes(ruleName) || ruleName.includes(input);
//     });

//     if (matched) {
//       map.set(input, matched);
//     }
//   }

//   return map;
// };

// /* ----------------- CONFIDENCE ----------------- */

// const calculateConfidence = ({
//   ruleMatched,
//   prescriptionStatus,
//   medicine,
//   ocrConfidence = 1
// }) => {
//   let score = 0.2;

//   if (ruleMatched) score += 0.35;
//   if (prescriptionStatus === "ACTIVE") score += 0.25;
//   if (medicine.dosage) score += 0.1;

//   score *= ocrConfidence;

//   return Math.min(1, Number(score.toFixed(2)));
// };

// /* ----------------- CORE ENGINE ----------------- */

// const evaluateMedicine = ({
//   medicine,
//   rule,
//   user,
//   prescriptionStatus,
//   isPrescriptionFlow,
//   ocrConfidence
// }) => {
//   const ruleMatched = Boolean(rule);
//   const actionPlan = generateActionPlan(medicine, rule);

//   const warnings = [];
//   let fallbackReason = null;

//   if (!ruleMatched) {
//     fallbackReason = "NO_DB_RULE_MATCH";
//     warnings.push({
//       level: "info",
//       message_en: "Medicine not found in database. General guidance applied.",
//       message_hi: "दवा डेटाबेस में नहीं मिली। सामान्य मार्गदर्शन लागू किया गया।"
//     });
//   }

//   if (prescriptionStatus !== "ACTIVE" && !isPrescriptionFlow) {
//     warnings.push({
//       level: "info",
//       message_en: "No confirmed active prescription. Please consult a doctor.",
//       message_hi: "कोई सक्रिय प्रिस्क्रिप्शन नहीं मिला। डॉक्टर से पुष्टि करें।"
//     });
//   }

//   if (rule?.avoidConditions?.some(c => user.conditions?.includes(c))) {
//     warnings.push({
//       level: "danger",
//       message_en: "This medicine may be unsafe for your condition.",
//       message_hi: "यह दवा आपकी स्थिति के लिए सुरक्षित नहीं हो सकती।"
//     });
//     actionPlan.riskLevel = "high";
//   }

//   return {
//     name: medicine.name,
//     dosage: medicine.dosage,
//     schedule: actionPlan.schedule,

//     purpose: rule?.purpose || "general",
//     riskLevel: actionPlan.riskLevel,

//     confidence: calculateConfidence({
//       ruleMatched,
//       prescriptionStatus,
//       medicine,
//       ocrConfidence
//     }),

//     ruleMatched,
//     fallbackReason,
//     warnings,

//     hasActivePrescription: prescriptionStatus === "ACTIVE",
//     isPrescriptionFlow
//   };
// };

// /* ----------------- PROCESSOR ----------------- */

// const processMedicines = async ({
//   medicines,
//   user,
//   prescriptionStatus,
//   isPrescriptionFlow,
//   ocrConfidence
// }) => {
//   const names = medicines.map(m => normalizeMedicineName(m.name));
//   const ruleMap = await fetchMedicineRulesMap(names);

//   return medicines.map(med =>
//     evaluateMedicine({
//       medicine: med,
//       rule: ruleMap.get(normalizeMedicineName(med.name)),
//       user,
//       prescriptionStatus,
//       isPrescriptionFlow,
//       ocrConfidence
//     })
//   );
// };

// /* ----------------- FLOWS ----------------- */

// const handleMedicineUpload = async (structured, user) => {
//   const lastPrescription = await Prescription.findOne({ user: user._id })
//     .sort({ createdAt: -1 });

//   const prescriptionStatus = getPrescriptionStatus(lastPrescription);

//   return {
//     type: "medicine_to_actionable_plan",
//     confidence: structured.confidence,
//     medicines: await processMedicines({
//       medicines: structured.medicines,
//       user,
//       prescriptionStatus,
//       isPrescriptionFlow: false,
//       ocrConfidence: structured.confidence
//     })
//   };
// };

// const handlePrescriptionUpload = async (structured, user) => {
//   await Prescription.create({
//     user: user._id,
//     prescriptionDate: new Date(),
//     medicines: structured.medicines
//   });

//   return {
//     type: "prescription_to_actionable_plan",
//     confidence: structured.confidence,
//     medicines: await processMedicines({
//       medicines: structured.medicines,
//       user,
//       prescriptionStatus: "ACTIVE",
//       isPrescriptionFlow: true,
//       ocrConfidence: structured.confidence
//     })
//   };
// };

// /* ----------------- CONTROLLER ----------------- */

// export const processStructuredResultController = asyncHandler(async (req, res) => {
//   const { userContext, document } = req.body;

//   if (!req.user || !document?.type) {
//     return res
//       .status(400)
//       .json(new ApiResponse(400, "Invalid request", null));
//   }

//   const enrichedUser = {
//     ...req.user.toObject(),
//     ...userContext
//   };

//   const result =
//     document.type === "MEDICINE"
//       ? await handleMedicineUpload(document, enrichedUser)
//       : document.type === "PRESCRIPTION"
//       ? await handlePrescriptionUpload(document, enrichedUser)
//       : null;

//   if (!result) {
//     return res
//       .status(400)
//       .json(new ApiResponse(400, "Unknown structured type", null));
//   }

//   res
//     .status(201)
//     .json(new ApiResponse(201, "Structured data processed successfully", result));
// });




import mongoose from "mongoose";
import { MedicineRule } from "../models/medicinesrule.models.js";
import { Prescription } from "../models/prescription.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/* -------------------- HELPERS -------------------- */

const normalizeMedicineName = (name = "") =>
  name
    .toLowerCase()
    .replace(/hydrochloride|hcl|tablet|capsule|mg|ml|ip/g, "")
    .replace(/\s+/g, " ")
    .trim();

/* -------------------- PRESCRIPTION STATUS -------------------- */

const getPrescriptionStatus = prescription => {
  if (!prescription) return "NONE";

  let maxDays = 0;
  let hasDuration = false;

  for (const med of prescription.medicines) {
    if (med.durationDays) {
      hasDuration = true;
      maxDays = Math.max(maxDays, Number(med.durationDays));
    }
  }

  if (!hasDuration) return "UNKNOWN";

  const expiry =
    new Date(prescription.prescriptionDate).getTime() +
    maxDays * 24 * 60 * 60 * 1000;

  return expiry < Date.now() ? "EXPIRED" : "ACTIVE";
};

/* -------------------- FUZZY RULE MATCH -------------------- */

const fetchMedicineRulesMap = async medicineNames => {
  const rules = await MedicineRule.find({});
  const map = new Map();

  for (const raw of medicineNames) {
    const input = normalizeMedicineName(raw);

    const matched = rules.find(rule => {
      const ruleName = normalizeMedicineName(rule.name);
      return input.includes(ruleName) || ruleName.includes(input);
    });

    if (matched) map.set(input, matched);
  }

  return map;
};

/* -------------------- CONFIDENCE ENGINE -------------------- */

const confidenceScoreToLabel = score => {
  if (score >= 0.75) return "high";
  if (score >= 0.45) return "medium";
  return "low";
};

const calculateMedicineConfidence = ({
  ruleMatched,
  prescriptionStatus,
  hasDosage,
  ocrConfidence
}) => {
  let score = 0.2;

  if (ruleMatched) score += 0.35;
  if (prescriptionStatus === "ACTIVE") score += 0.25;
  if (hasDosage) score += 0.1;

  score *= ocrConfidence ?? 0.7;

  return confidenceScoreToLabel(score);
};

/* -------------------- ACTION PLAN (SEPARATE) -------------------- */

export const generateActionPlan = (medicine, rule) => {
  const plan = {
    schedule: [],
    purpose: rule?.purpose || ["general"],
    riskLevel: rule?.riskLevel || "low"
  };

  const times = [];

  if (rule?.timingRules?.intervalHours) {
    let hour = 8;
    while (hour < 24) {
      times.push(`${String(hour).padStart(2, "0")}:00`);
      hour += rule.timingRules.intervalHours;
    }
  } else {
    if (rule?.timingRules?.morning) times.push("08:00");
    if (rule?.timingRules?.night) times.push("20:00");
  }

  let relation = "after food";

  if (rule?.foodRule?.type === "required") {
    relation =
      rule.foodRule.items?.length > 0
        ? rule.foodRule.items.join(", ")
        : "empty stomach";
  }

  if (rule?.foodRule?.type === "avoid") {
    relation =
      rule.foodRule.items?.length > 0
        ? `avoid ${rule.foodRule.items.join(", ")}`
        : "avoid specific foods";
  }

  times.forEach(time => {
    plan.schedule.push({
      time,
      relation,
      message_en: `Take ${medicine.name} at ${time} (${relation})`,
      message_hi: `${medicine.name} ${time} बजे लें (${relation})`
    });
  });

  if (plan.schedule.length === 0) {
    plan.schedule.push({
      time: "as prescribed",
      relation: "doctor instruction",
      message_en: "Follow doctor instructions carefully",
      message_hi: "डॉक्टर की सलाह के अनुसार लें"
    });
  }

  return plan;
};

/* -------------------- CORE MEDICINE EVALUATION -------------------- */

const evaluateMedicine = ({
  medicine,
  rule,
  user,
  prescriptionStatus,
  isPrescriptionFlow,
  ocrConfidence
}) => {
  const ruleMatched = Boolean(rule);
  const actionPlan = generateActionPlan(medicine, rule);

  const warnings = [];
  let fallbackReason = null;

  if (!ruleMatched) {
    fallbackReason = "NO_DB_RULE_MATCH";
    warnings.push({
      level: "info",
      message_en: "Medicine not found in database. General guidance applied.",
      message_hi: "दवा डेटाबेस में नहीं मिली। सामान्य मार्गदर्शन लागू किया गया।"
    });
  }

  if (prescriptionStatus !== "ACTIVE" && !isPrescriptionFlow) {
    warnings.push({
      level: "info",
      message_en: "No confirmed active prescription. Please consult a doctor.",
      message_hi: "कोई सक्रिय प्रिस्क्रिप्शन नहीं मिला। डॉक्टर से पुष्टि करें।"
    });
  }

  if (rule?.avoidConditions?.some(c => user.conditions?.includes(c))) {
    warnings.push({
      level: "danger",
      message_en: "This medicine may be unsafe for your condition.",
      message_hi: "यह दवा आपकी स्थिति के लिए सुरक्षित नहीं हो सकती।"
    });
    actionPlan.riskLevel = "high";
  }

  const medicineConfidence = calculateMedicineConfidence({
    ruleMatched,
    prescriptionStatus,
    hasDosage: Boolean(medicine.dosage),
    ocrConfidence
  });

  return {
    name: medicine.name,
    dosage: medicine.dosage,
    schedule: actionPlan.schedule,

    purpose: actionPlan.purpose,
    riskLevel: actionPlan.riskLevel,

    confidence: medicineConfidence,

    ruleMatched,
    fallbackReason,
    warnings,

    hasActivePrescription: prescriptionStatus === "ACTIVE",
    isPrescriptionFlow
  };
};

/* -------------------- PROCESSOR -------------------- */

const processMedicines = async ({
  medicines,
  user,
  prescriptionStatus,
  isPrescriptionFlow,
  ocrConfidence
}) => {
  const names = medicines.map(m => normalizeMedicineName(m.name));
  const ruleMap = await fetchMedicineRulesMap(names);

  return medicines.map(med =>
    evaluateMedicine({
      medicine: med,
      rule: ruleMap.get(normalizeMedicineName(med.name)),
      user,
      prescriptionStatus,
      isPrescriptionFlow,
      ocrConfidence
    })
  );
};

/* -------------------- FLOWS -------------------- */

const handleMedicineUpload = async (structured, user) => {
  const lastPrescription = await Prescription.findOne({ user: user._id })
    .sort({ createdAt: -1 });

  const prescriptionStatus = getPrescriptionStatus(lastPrescription);

  return {
    type: "medicine_to_actionable_plan",
    confidence: structured.confidence,
    medicines: await processMedicines({
      medicines: structured.medicines,
      user,
      prescriptionStatus,
      isPrescriptionFlow: false,
      ocrConfidence: structured.confidence === "high" ? 1 : 0.7
    })
  };
};

const handlePrescriptionUpload = async (structured, user) => {
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
      prescriptionStatus: "ACTIVE",
      isPrescriptionFlow: true,
      ocrConfidence: structured.confidence === "high" ? 1 : 0.7
    })
  };
};

/* -------------------- CONTROLLER -------------------- */

export const processStructuredResultController = asyncHandler(async (req, res) => {
  // const { userContext, document } = req.body;

  // if (!req.user || !document?.type) {
  //   return res
  //     .status(400)
  //     .json(new ApiResponse(400, "Invalid request", null));
  // }
const { userContext, document } = req.body;

if (!req.user || !document) {
  return res
    .status(400)
    .json(new ApiResponse(400, "Invalid request", null));
}

// 🔥 NORMALIZE TYPE (THIS FIXES YOUR BUG)
const normalizedType = document.type?.toUpperCase() || "MEDICINE";
document.type = normalizedType;

  const enrichedUser = {
    ...req.user.toObject(),
    ...userContext
  };

  // const result =
  //   document.type === "MEDICINE"
  //     ? await handleMedicineUpload(document, enrichedUser)
  //     : document.type === "PRESCRIPTION"
  //     ? await handlePrescriptionUpload(document, enrichedUser)
  //     : null;
   

      let result;

if (document.type === "PRESCRIPTION") {
  result = await handlePrescriptionUpload(document, enrichedUser);
} else {
  // default safe fallback
  result = await handleMedicineUpload(document, enrichedUser);
}

  if (!result) {
    return res
      .status(400)
      .json(new ApiResponse(400, "Unknown structured type", null));
  }

  res
    .status(201)
    .json(new ApiResponse(201, "Structured data processed successfully", result));
});
