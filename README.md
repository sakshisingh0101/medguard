# 🧠 MedGuard Backend  
**AI-Powered Medicine Safety & Decision Engine**

---

## 📌 Overview

The **MedGuard Backend** is the core intelligence layer of the system.  
It handles authentication, OCR extraction, LLM-based structuring, rule-engine validation, and generation of personalized medicine safety responses.

The backend transforms **raw prescription images + user context** into **actionable, safe, and explainable medicine guidance**.

---

## 🧩 High-Level Backend Flow


User Authentication
↓
Image Upload (Prescription / Medicine)
↓
OCR Extraction
↓
LLM-Based Structured Data Generation
↓
User Context + OCR JSON Payload
↓
Rule Engine (Safety Validation)
↓
Final Actionable Safety Response


---

## 🔐 Authentication Module

- User authentication is mandatory
- Secure APIs protected using auth middleware
- Each request is mapped to a **specific user**
- Ensures:
  - Data isolation
  - Personalized recommendations
  - Secure history tracking

---

## 📷 OCR + LLM Pipeline (Core Feature)

### Step 1: OCR Extraction
- Accepts image input (medicine strip or prescription)
- Extracts raw text using OCR service
- Handles:
  - Low-quality images
  - Partial medicine names
  - Dosage patterns

### Step 2: LLM Structuring
- Raw OCR text is passed to an LLM
- LLM converts unstructured text into **structured JSON**, including:
  - Medicine name
  - Dosage
  - Frequency
  - Purpose
  - Instructions

This pipeline is the **first and most critical backend component**.

---

## 🧠 Rule Engine Processing

The structured OCR output is combined with **user health context** and passed to the Rule Engine.

### Inputs:
- OCR-generated structured medicine JSON
- User context:
  - Age
  - Existing conditions
  - Food state
  - Time of intake
  - Other constraints

### Rule Engine Responsibilities:
- Safety checks
- Risk categorization
- Dosage validation
- Timing conflicts
- Food interaction rules
- Prescription requirement validation

---

## 📤 Backend Response

The final API response contains:

- Overall confidence level
- Medicine-wise analysis
- Risk levels (Low / Medium / High)
- Safe intake schedule
- Warnings & alerts
- English & Hindi instructions
- Prescription requirement notes

This response is **directly consumed by the frontend UI**.

---

## 🧠 API Design Philosophy

- Backend-driven UI
- Minimal frontend logic
- Consistent structure across responses
- Predictable error formats

---

## ⚠️ Error Handling

- OCR failure handling
- LLM confidence checks
- Rule conflicts resolution
- Safe fallbacks for incomplete data
- Clear error messages for frontend rendering

---

## 🛠️ Environment Setup

Create a `.env` file:

```env
PORT=xxxx
OCR_API_KEY=xxxx
LLM_API_KEY=xxxx
JWT_SECRET=xxxx


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
