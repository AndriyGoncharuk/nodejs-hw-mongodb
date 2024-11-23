import { Router } from "express";
import {
  registerController,
  loginController,
  refreshController,
  logoutController,
  requestResetEmailController,
} from "../controllers/auth.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../utils/validateBody.js";
import {
  authRegisterSchema,
  authLoginSchema,
  requestResetEmailSchema,
} from "../validation/auth.js";

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

authRouter.post("/refresh", ctrlWrapper(refreshController));

authRouter.post("/logout", ctrlWrapper(logoutController));

authRouter.post(
  "/request-reset-email",
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);

export default authRouter;
