import createHttpError from "http-errors";

import { register, login } from "../services/auth.js";

export const registerController = async (req, res) => {
  const data = await register(req.body);

  res.status(201).json({
    status: 201,
    message: "Successfully registered user",
  });
};

export const loginController = async (req, res) => {
  const { _id, accessToken, refreshToken, refreshTokenValidUntil } =
    await login(req.body);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    expires: refreshTokenValidUntil,
  });

  res.cookie("sessionId", _id, {
    httpOnly: true,
    expires: refreshTokenValidUntil,
  });

  res.json({
    status: 200,
    message: "Successfully login user",
    data: {
      accessToken: accessToken,
    },
  });
};
