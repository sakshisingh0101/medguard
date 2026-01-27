import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
// import { extractText } from "./ocr.js";
import { structureWithLLM } from "../utils/llm.service.js";
import Tesseract from "tesseract.js";

const cleanOCRText = (text) => {
  return text
    .replace(/\n+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};
const extractText = async (imagePath) => {
  const { data } = await Tesseract.recognize(imagePath, "eng");
  return data.text;
};
export const ocrTextExtraction = asyncHandler(async (req, res) => {
  if (!req.file?.path) {
    throw new ApiError(400, "Image file not received");
  }

  // 1️⃣ Raw OCR
  const rawText = await extractText(req.file.path);

  if (!rawText || rawText.length < 20) {
    throw new ApiError(422, "OCR failed or unreadable image");
  }

  // 2️⃣ Clean OCR noise
  const cleanText = cleanOCRText(rawText);

  // 3️⃣ LLM → structured JSON
  const structuredResult = await structureWithLLM(cleanText);

  // 4️⃣ Send back (frontend stores silently)
  return res.status(200).json({
    success: true,
    data: structuredResult
  });
});


// import { ApiError } from "../utils/ApiError.js";
// import { asyncHandler } from "../utils/asyncHandler.js";
// import Tesseract from "tesseract.js";
// import { structureWithLLM } from "../utils/llm.service.js";
// import { uploadOnCloudinary } from "../utils/cloudinary.js";
// import fs from "fs";

// // Clean OCR text
// const cleanOCRText = (text) =>
//   text.replace(/\n+/g, " ").replace(/\s+/g, " ").trim();

// // OCR extraction
// const extractText = async (imagePath) => {
//   const { data } = await Tesseract.recognize(imagePath, "eng");
//   return data.text;
// };

// // Controller
// export const ocrTextExtraction = asyncHandler(async (req, res) => {
//   if (!req.file?.path) {
//     throw new ApiError(400, "Image file not received");
//   }

//   const localPath = req.file.path;
//   let cloudData = null;

//   try {
//      // 2️⃣ OCR extraction
//     const rawText = await extractText(localPath); // file might already be deleted by cloudinary, optional
//     if (!rawText || rawText.length < 5) {
//       throw new ApiError(422, "OCR failed or unreadable image");
//     }

//     // 3️⃣ Clean OCR text
//     const cleanText = cleanOCRText(rawText);
//     // 1️⃣ Upload image to Cloudinary
//     cloudData = await uploadOnCloudinary(localPath); // auto deletes local file
//     const cloudURL = cloudData?.url || null;

    
//     // 4️⃣ LLM parsing → structured JSON
//     const structuredResult = await structureWithLLM(cleanText);

//     // 5️⃣ Return structured data
//     return res.status(200).json({
//       success: true,
//       data: structuredResult
//     });

//   } catch (err) {
//     // Ensure local file is removed if cloud upload failed before deletion
//     if (fs.existsSync(localPath)) fs.unlinkSync(localPath);

//     throw err;
//   }
// });
