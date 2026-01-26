import fetch from "node-fetch";
import { ApiError } from "./ApiError.js";

export const structureWithLLM = async (ocrText) => {
  const prompt = `
You are a medical document parser.

Classify the document as:
- PRESCRIPTION
- MEDICINE
- UNKNOWN

Extract structured data strictly.

Return ONLY valid JSON in this exact format:
{
  "type": "PRESCRIPTION | MEDICINE | UNKNOWN",
  "medicines": [
    {
      "name": "",
      "dosage": "",
      "frequency": "",
      "durationDays": ""
    }
  ],
  "confidence": "low | medium | high"
}

OCR TEXT:
"""${ocrText}"""
`;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "http://localhost", // required by OpenRouter
      "X-Title": "Medicine Safety Engine"
    },
    body: JSON.stringify({
      model: "meta-llama/llama-3.1-8b-instruct",
      messages: [
        { role: "system", content: "You output JSON only." },
        { role: "user", content: prompt }
      ],
      temperature: 0
    })
  });

  const data = await response.json();

  try {
    return JSON.parse(data.choices[0].message.content);
  } catch (err) {
    throw new ApiError(500, "LLM returned invalid JSON");
  }
};


