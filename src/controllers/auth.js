import createHttpError from "http-errors";

import { register } from "../services/auth.js";

export const registerController = async (req, res) => {
  const data = await register(req.body);

  res.status(201).json({
    status: 201,
    message: "Successfully registered user",
  });
};

export const loginController = async (req, res) => {
  const session = await register(req.body);
  console.log(session);
};
