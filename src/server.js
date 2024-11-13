import express from "express";
import cors from "cors";
import pino from "pino-http";
import contactsRouter from "./routes/contacts.js";
import authRouter from "./routes/auth.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { env } from "./utils/env.js";

const PORT = Number(env("PORT", "3000"));

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: "pino-pretty",
      },
    }),
  );

  app.use("/contacts", contactsRouter);
  app.use("/auth", authRouter);

  app.use("*", notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running now on port ${PORT}`);
  });
};
