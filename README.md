🩺 MedGuard Backend

OCR + LLM + Rule Engine powered Medicine Safety System

📌 Overview

The MedGuard Backend is responsible for transforming unstructured prescription or medicine images into structured, validated, and actionable medicine plans.

It implements a multi-stage processing pipeline involving:

User authentication

OCR extraction

LLM-based structured data generation

Rule-engine–based medicine safety analysis

The backend acts as the single source of truth for medicine logic, validation, and risk assessment.

🧠 Core Backend Pipeline (High-Level)
Authenticated User
      ↓
Image Upload (Prescription / Medicine)
      ↓
OCR Extraction (Raw Text)
      ↓
LLM → Structured JSON
      ↓
Rule Engine (User Context + OCR JSON)
      ↓
Final Actionable Medicine Plan (API Response)

🔐 Authentication Module

User Signup & Login

Session / token-based authentication

All medicine processing APIs are protected

Ensures user-specific and secure processing

📷 OCR + LLM Pipeline (Stage 1)
Purpose

Convert uploaded images into structured medicine data.

Steps

OCR extracts raw text from the uploaded image

LLM processes OCR text and returns structured JSON

Confidence level assigned based on extraction quality

Structured OCR Output Example
{
  "type": "PRESCRIPTION",
  "medicines": [
    {
      "name": "Paracetamol",
      "dosage": "500mg",
      "frequency": "3 times a day",
      "durationDays": "5"
    }
  ],
  "confidence": "medium"
}


This output is passed to the Rule Engine.

⚙️ Rule Engine Pipeline (Stage 2)
Input Payload
{
  "userContext": {
    "age": 30,
    "conditions": ["diabetes"],
    "foodState": "after",
    "time": "morning"
  },
  "document": { /* OCR + LLM structured JSON */ }
}

Responsibilities

Validate medicine safety

Generate dosage schedules

Assign risk levels (low / medium / high)

Detect prescription availability

Add warnings and fallback messages

Provide confidence score

📤 Final API Response
{
  "statusCode": 201,
  "message": "Structured data processed successfully",
  "data": {
    "type": "medicine_to_actionable_plan",
    "confidence": "low",
    "medicines": [
      {
        "name": "Acetaminophen",
        "dosage": "1500 mg",
        "schedule": [
          {
            "time": "08:00",
            "relation": "after food",
            "message_en": "Take Acetaminophen at 08:00 (after food)",
            "message_hi": "Acetaminophen 08:00 बजे लें (after food)"
          }
        ],
        "purpose": ["Pain relief and fever reduction"],
        "riskLevel": "low",
        "confidence": "medium",
        "ruleMatched": true,
        "fallbackReason": null,
        "warnings": [
          {
            "level": "info",
            "message_en": "No confirmed active prescription. Please consult a doctor.",
            "message_hi": "कोई सक्रिय प्रिस्क्रिप्शन नहीं मिला। डॉक्टर से पुष्टि करें।"
          }
        ],
        "hasActivePrescription": false,
        "isPrescriptionFlow": false
      }
    ]
  },
  "success": true
}

🚧 Known Limitations

OCR accuracy depends on image quality

LLM confidence may be low for handwritten prescriptions

No external doctor verification yet

Reminder/notification system not implemented

🚀 Future Enhancements

Doctor verification APIs

SMS / Push notification reminders

Prescription history tracking

Multi-language expansion

Caregiver access support

🧾 Backend Summary (One Line)

The MedGuard backend converts unstructured prescription images into safe, validated, and personalized medicine plans using OCR, LLM processing, and a rule-based engine.
