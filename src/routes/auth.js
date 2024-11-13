import { Router } from "express";
import { registerController, loginController } from "../controllers/auth.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../utils/validateBody.js";
import { authRegisterSchema, authLoginSchema } from "../validation/auth.js";

const authRouter = Router();
authRouter.post(
  "/register",
  validateBody(authRegisterSchema),
  ctrlWrapper(registerController),
);

authRouter.post(
  "/login",
  validateBody(authLoginSchema),
  ctrlWrapper(loginController),
);

export default authRouter;
