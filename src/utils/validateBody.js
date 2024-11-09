import createHttpError from "http-errors";

export const validateBody = (shema) => {
  const func = (req, res, next) => {
    const { error } = shema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return next(createHttpError(400, error.message));
    }
    next();
  };
  return func;
};
