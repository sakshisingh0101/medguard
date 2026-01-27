import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";

import { ocrTextExtraction } from "../controller/ocr.controller.js";

const ocrRouter=Router();
ocrRouter.route("/ocrTextExtraction").post(upload.single("image"),ocrTextExtraction)

export default ocrRouter;