import { Router } from "express";

import { verifyJwt } from "../middleware/auth.middleware.js";
import { getCurrentUser, login, logoutUser, registeration } from "../controller/user.controller.js";
const userRouter=Router();
userRouter.route("/register").post(registeration)
userRouter.route("/login").post(login)
userRouter.route("/logout").post(verifyJwt,logoutUser)
userRouter.route("/me").get(verifyJwt,getCurrentUser)

export default userRouter;