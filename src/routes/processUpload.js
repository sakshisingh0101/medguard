import { Router } from "express";

import { verifyJwt } from "../middleware/auth.middleware.js";
import { processStructuredResultController } from "../controller/processUploadController.js";



const ruleEngineRouter=Router();
ruleEngineRouter.route("/ruleEngine").post(verifyJwt , processStructuredResultController)

export default ruleEngineRouter;