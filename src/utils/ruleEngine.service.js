// export const generateActionPlan = (medicine, userContext) => {
//   const plan = {
//     medicineId: medicine.name.toLowerCase(),
//     schedule: [],
//     riskLevel: "low",
//     purpose: "unknown"
//   };

//   if (medicine.frequency === "twice a day") {
//     plan.schedule.push(
//       { time: "07:00", relation: "after breakfast" },
//       { time: "19:00", relation: "after dinner" }
//     );
//   }

//   if (medicine.name.toLowerCase().includes("para")) {
//     plan.purpose = "pain/fever";
//   }

//   if (userContext?.conditions?.includes("bp")) {
//     plan.riskLevel = "medium";
//   }

//   return plan;
// };


// export const generateActionPlan = (medicine, rule) => {
//   const plan = {
//     medicineId: medicine.name.toLowerCase(),
//     schedule: [],
//     purpose: medicine.purpose || "general",
//     riskLevel: rule?.riskLevel || "low"
//   };

//   // ---------- TIMING LOGIC ----------
//   const times = [];

//   if (rule?.timingRules?.morning) {
//     times.push("08:00");
//   }

//   if (rule?.timingRules?.night) {
//     times.push("20:00");
//   }

//   // Fallback using intervalHours
//   if (times.length === 0 && rule?.timingRules?.intervalHours) {
//     const interval = rule.timingRules.intervalHours;
//     let start = 8;

//     while (start < 24) {
//       times.push(`${String(start).padStart(2, "0")}:00`);
//       start += interval;
//     }
//   }

//   // ---------- FOOD RULE ----------
//   // let relation = "after food";

//   // if (rule?.foodRule?.type === "required") {
//   //   relation = rule.foodRule.items.join(", ");
//   // }

//   // // if (rule?.foodRule?.type === "empty") {
//   // //   relation = "empty stomach";
//   // // }

//   // if (rule?.foodRule?.type === "avoid") {
//   //   relation = `avoid ${rule.foodRule.items.join(", ")}`;
//   // }
// let relation = "after food";

// if (rule?.foodRule?.type === "required") {
//   if (rule.foodRule.items && rule.foodRule.items.length > 0) {
//     relation = rule.foodRule.items.join(", ");
//   } else {
//     // fallback default for required
//     relation = "empty stomach";
//   }
// }

// if (rule?.foodRule?.type === "avoid") {
//   if (rule.foodRule.items && rule.foodRule.items.length > 0) {
//     relation = `avoid ${rule.foodRule.items.join(", ")}`;
//   } else {
//     relation = "avoid specific foods";
//   }
// }

//   // ---------- BUILD SCHEDULE ----------
//   times.forEach(time => {
//     plan.schedule.push({
//       time,
//       relation,
//       message_en: `Take ${medicine.name} at ${time} (${relation})`,
//       message_hi: `${medicine.name} ${time} बजे लें (${relation})`
//     });
//   });

//   // ---------- SAFETY FALLBACK ----------
//   if (plan.schedule.length === 0) {
//     plan.schedule.push({
//       time: "as prescribed",
//       relation: "doctor instruction",
//       message_en: "Follow doctor instructions carefully",
//       message_hi: "डॉक्टर की सलाह के अनुसार लें"
//     });
//   }

//   return plan;
// };


// export const generateActionPlan = (medicine, rule) => {
//   const plan = {
//     medicineId: medicine.name.toLowerCase(),
//     schedule: [],
//     purpose: medicine.purpose || "general",
//     riskLevel: rule?.riskLevel || "low"
//   };

//   const times = [];

//   // Priority 1: intervalHours
//   if (rule?.timingRules?.intervalHours) {
//     let hour = 8;
//     while (hour < 24) {
//       times.push(`${String(hour).padStart(2, "0")}:00`);
//       hour += rule.timingRules.intervalHours;
//     }
//   } else {
//     if (rule?.timingRules?.morning) times.push("08:00");
//     if (rule?.timingRules?.night) times.push("20:00");
//   }

//   let relation = "after food";

//   if (rule?.foodRule?.type === "required") {
//     relation =
//       rule.foodRule.items?.length > 0
//         ? rule.foodRule.items.join(", ")
//         : "empty stomach";
//   }

//   if (rule?.foodRule?.type === "avoid") {
//     relation =
//       rule.foodRule.items?.length > 0
//         ? `avoid ${rule.foodRule.items.join(", ")}`
//         : "avoid specific foods";
//   }

//   times.forEach(time => {
//     plan.schedule.push({
//       time,
//       relation,
//       message_en: `Take ${medicine.name} at ${time} (${relation})`,
//       message_hi: `${medicine.name} ${time} बजे लें (${relation})`
//     });
//   });

//   if (plan.schedule.length === 0) {
//     plan.schedule.push({
//       time: "as prescribed",
//       relation: "doctor instruction",
//       message_en: "Follow doctor instructions carefully",
//       message_hi: "डॉक्टर की सलाह के अनुसार लें"
//     });
//   }

//   return plan;
// };
export const generateActionPlan = (medicine, rule) => {
  const plan = {
    schedule: [],
    purpose: rule?.purpose || "general",
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


// utils/ruleEngine.service.js

// export const generateActionPlan = (medicine, rule) => {
//   const schedule = [];
//   const frequency = Number(medicine.frequency || 1);

//   const defaultTimes = ["08:00", "14:00", "20:00"];

//   for (let i = 0; i < frequency; i++) {
//     schedule.push({
//       time: defaultTimes[i] || "08:00",
//       instruction_en: `Take ${medicine.name} after food`,
//       instruction_hi: `${medicine.name} भोजन के बाद लें`
//     });
//   }

//   return {
//     schedule,
//     purpose: rule?.purpose ?? "general",
//     riskLevel: rule?.riskLevel ?? "low"
//   };
// };
