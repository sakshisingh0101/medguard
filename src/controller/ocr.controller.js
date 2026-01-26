import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
// import { extractText } from "./ocr.js";
import { structureWithLLM } from "../utils/llm.service.js";

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
