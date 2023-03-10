import { validationResult } from "express-validator";

const bodyErrorHandler = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: false,
        message: "Invalid inputs",
        errors: errors.array().map(({ msg, param }) => {
          return {
            msg,
            param,
          };
        }),
      });
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      message: "Internal server error!",
    });
  }
};

export default bodyErrorHandler;
