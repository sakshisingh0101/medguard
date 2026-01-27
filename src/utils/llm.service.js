// import fetch from "node-fetch";
// import { ApiError } from "./ApiError.js";

// export const structureWithLLM = async (ocrText , imageURL) => {
//   let prompt = `
// You are a medical document parser.

// Classify the document as:
// - PRESCRIPTION
// - MEDICINE
// - UNKNOWN

// Extract structured data strictly in JSON. Do not return anything else.

// - Always try to extract the medicine name even if dosage/frequency/duration is unclear.
// - If a field cannot be found, only then leave it as an empty string.

// Normalize medicine names and remove extra symbols or hyphens.
// Decide confidence as:
//   - "high" → all fields clearly visible
//   - "medium" → some fields unclear
//   - "low" → label unreadable or partially recognized

// Return ONLY valid JSON in this exact format:
// {
//   "type": "PRESCRIPTION | MEDICINE | UNKNOWN",
//   "medicines": [
//     {
//       "name": "",
//       "dosage": "",
//       "frequency": "",
//       "durationDays": ""
//     }
//   ],
//   "confidence": "low | medium | high"
// }

// // Examples:
// // OCR TEXT: "Paracetamol 500mg Tablet, 2 times a day for 5 days"
// // JSON:
// // {
// //   "type": "MEDICINE",
// //   "medicines": [
// //     {
// //       "name": "Paracetamol",
// //       "dosage": "500mg",
// //       "frequency": "2 times a day",
// //       "durationDays": "5"
// //     }
// //   ],
// //   "confidence": "high"
// // }

// // OCR TEXT: "Cough Syrup"
// // JSON:
// // {
// //   "type": "MEDICINE",
// //   "medicines": [
// //     {
// //       "name": "Cough Syrup",
// //       "dosage": "",
// //       "frequency": "",
// //       "durationDays": ""
// //     }
// //   ],
// //   "confidence": "medium"
// // }

// OCR TEXT:
// """${ocrText}"""
// `;
//    if (imageURL) {
//     prompt += `

// OPTIONAL IMAGE CONTEXT:
// URL: ${imageURL}
// Use the image to help identify medicine names if OCR text is unclear.
// `
// }


//   const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//     method: "POST",
//     headers: {
//       "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
//       "Content-Type": "application/json",
//       "HTTP-Referer": "http://localhost", // required by OpenRouter
//       "X-Title": "Medicine Safety Engine"
//     },
//     body: JSON.stringify({
//       model: "meta-llama/llama-3.1-8b-instruct",
//       messages: [
//         { role: "system", content: "You output JSON only." },
//         { role: "user", content: prompt }
//       ],
//       temperature: 0
//     })
//   });

//   const data = await response.json();

//   try {
//     return JSON.parse(data.choices[0].message.content);
//   } catch (err) {
//     throw new ApiError(500, "LLM returned invalid JSON");
//   }
// };




// export const structureWithLLM = async (ocrText, imageURL = null) => {
//   let prompt = `
// You are a medical document parser.

// Classify the document as:
// - PRESCRIPTION
// - MEDICINE
// - UNKNOWN

// Extract structured data strictly in JSON. Do not return anything else.

// - Always try to extract the medicine name even if dosage/frequency/duration is unclear.
// - If a field cannot be found, only then leave it as an empty string.
// - Normalize medicine names and remove extra symbols or hyphens.
// -Try to extract dosage , frequency and duration if it mention in ocr text do not leave empty , leave empty only if you yourself couldn't find it neither from image url  nor from ocr text 
// - Decide confidence as:
//   - "high" → all fields clearly visible
//   - "medium" → some fields unclear
//   - "low" → label unreadable or partially recognized

// Return ONLY valid JSON in this exact format:
// {
//   "type": "PRESCRIPTION | MEDICINE | UNKNOWN",
//   "medicines": [
//     {
//       "name": "",
//       "dosage": "",
//       "frequency": "",
//       "durationDays": ""
//     }
//   ],
//   "confidence": "low | medium | high"
// }
//   Examples:-
// OCR TEXT: "Paracetamol 500mg Tablet, 2 times a day for 5 days"
// JSON:
// {
//   "type": "MEDICINE",
//   "medicines": [
//     {
//       "name": "Paracetamol",
//       "dosage": "500mg",
//       "frequency": "2 times a day",
//       "durationDays": "5"
//     }
//   ],
//   "confidence": "high"
// }

// OCR TEXT: "Epwyw—— ming nate Soom 20 Tab Before Food 7 Days"
// JSON:
// {
//   "type": "PRESCRIPTION",
//   "medicines": [
//     {
//       "name": "Epwyw—— ming nate Soom",
//       "dosage": "20 Tab",
//       "frequency": "Before Food",
//       "durationDays": "7"
//     }
//   ],
//   "confidence": "high"
// }

// OCR TEXT:
// """${ocrText}"""
// `;

//   if (imageURL) {
//     prompt += `

// OPTIONAL IMAGE CONTEXT:
// URL: ${imageURL}
// Use the image to help identify medicine names if OCR text is unclear.
// `;
//   }

//   const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//     method: "POST",
//     headers: {
//       "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
//       "Content-Type": "application/json",
//       "HTTP-Referer": "http://localhost",
//       "X-Title": "Medicine Safety Engine"
//     },
//     body: JSON.stringify({
//       model: "meta-llama/llama-3.1-8b-instruct",
//       messages: [
//         { role: "system", content: "You output JSON only." },
//         { role: "user", content: prompt }
//       ],
//       temperature: 0
//     })
//   });

//   const data = await response.json();

//   try {
//     return JSON.parse(data.choices[0].message.content);
//   } catch (err) {
//     throw new ApiError(500, "LLM returned invalid JSON");
//   }
// };



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