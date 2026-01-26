export const generateActionPlan = (medicine, userContext) => {
  const plan = {
    medicineId: medicine.name.toLowerCase(),
    schedule: [],
    riskLevel: "low",
    purpose: "unknown"
  };

  if (medicine.frequency === "twice a day") {
    plan.schedule.push(
      { time: "07:00", relation: "after breakfast" },
      { time: "19:00", relation: "after dinner" }
    );
  }

  if (medicine.name.toLowerCase().includes("para")) {
    plan.purpose = "pain/fever";
  }

  if (userContext?.conditions?.includes("bp")) {
    plan.riskLevel = "medium";
  }

  return plan;
};
